from fastapi import FastAPI, HTTPException, Depends, Header
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel
from typing import Optional, List, Dict, Any
import os
import asyncio
import json
from datetime import datetime
import httpx
from supabase import create_client, Client
import logging
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize FastAPI app
app = FastAPI(
    title="vCISO AI Backend",
    description="AI-powered Virtual CISO backend with Anthropic Claude integration",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure this properly for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Environment variables
ANTHROPIC_API_KEY = os.getenv("ANTHROPIC_API_KEY")
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_SERVICE_ROLE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY")

if not ANTHROPIC_API_KEY:
    raise ValueError("ANTHROPIC_API_KEY environment variable is required")
if not SUPABASE_URL or not SUPABASE_SERVICE_ROLE_KEY:
    raise ValueError("Supabase environment variables are required")

# Initialize Supabase client
supabase: Client = create_client(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

# Security
security = HTTPBearer()

# Pydantic models
class ChatRequest(BaseModel):
    message: str
    conversation_id: Optional[str] = None
    user_id: str
    company_id: Optional[str] = None
    context: Optional[Dict[str, Any]] = None

class ChatResponse(BaseModel):
    response: str
    confidence: float
    referenced_frameworks: List[str]
    referenced_documents: List[str]
    conversation_id: str

class DocumentAnalysisRequest(BaseModel):
    document_content: str
    document_type: str
    company_id: str
    frameworks: List[str]

class HealthResponse(BaseModel):
    status: str
    timestamp: str
    version: str

# Dependency to verify JWT token
async def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)):
    try:
        # Verify the JWT token with Supabase
        response = supabase.auth.get_user(credentials.credentials)
        if response.user:
            return response.user
        else:
            raise HTTPException(status_code=401, detail="Invalid token")
    except Exception as e:
        logger.error(f"Token verification failed: {e}")
        raise HTTPException(status_code=401, detail="Invalid token")

# System prompts for different contexts
SYSTEM_PROMPTS = {
    "general": """You are a Virtual CISO (Chief Information Security Officer) AI assistant with deep expertise in cybersecurity, compliance, and risk management. You provide expert-level guidance on:

- Cybersecurity frameworks (NIST, ISO 27001, SOC 2, CMMC)
- Risk assessment and management
- Compliance requirements and gap analysis
- Security policy development
- Incident response planning
- Third-party risk management
- Security architecture and controls

Always provide practical, actionable advice tailored to the organization's context. Be concise but comprehensive, and cite relevant frameworks when applicable.""",
    
    "compliance": """You are a compliance-focused Virtual CISO specializing in regulatory frameworks and standards. Your expertise includes:

- NIST Cybersecurity Framework implementation
- SOC 2 Type II compliance requirements
- ISO 27001 certification processes
- CMMC compliance for defense contractors
- GDPR and privacy regulations
- Industry-specific compliance (HIPAA, PCI DSS, etc.)

Provide specific control recommendations, implementation guidance, and gap analysis insights.""",
    
    "risk": """You are a risk management expert Virtual CISO focused on:

- Enterprise risk assessment methodologies
- Third-party vendor risk management
- Business continuity and disaster recovery
- Threat modeling and vulnerability management
- Risk quantification and reporting
- Security metrics and KPIs

Provide data-driven risk insights and mitigation strategies."""
}

def build_context_prompt(context: Dict[str, Any]) -> str:
    """Build a context-aware prompt based on company information."""
    prompt_parts = []
    
    if context.get("company_context"):
        company = context["company_context"]
        prompt_parts.append(f"Company Context:")
        
        if company.get("industry"):
            prompt_parts.append(f"- Industry: {company['industry']}")
        
        if company.get("frameworks"):
            prompt_parts.append(f"- Active Compliance Frameworks: {', '.join(company['frameworks'])}")
        
        if company.get("relevant_documents"):
            prompt_parts.append(f"- Available Documents: {len(company['relevant_documents'])} security documents")
            for doc in company["relevant_documents"][:3]:  # Show first 3 documents
                prompt_parts.append(f"  • {doc.get('title', 'Untitled')} ({doc.get('type', 'unknown')})")
    
    if context.get("compliance_status"):
        prompt_parts.append(f"\nCompliance Status:")
        for framework, status in context["compliance_status"].items():
            implemented = status.get("implemented", 0)
            total = status.get("total", 0)
            percentage = (implemented / total * 100) if total > 0 else 0
            prompt_parts.append(f"- {framework}: {implemented}/{total} controls ({percentage:.0f}% complete)")
    
    if context.get("user_role"):
        prompt_parts.append(f"\nUser Role: {context['user_role']}")
    
    return "\n".join(prompt_parts)

async def call_claude_api(message: str, system_prompt: str) -> dict:
    """Call Claude API directly using httpx."""
    headers = {
        "x-api-key": ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
        "Content-Type": "application/json"
    }
    
    body = {
        "model": "claude-3-sonnet-20240229",
        "max_tokens": 2000,
        "temperature": 0.3,
        "system": system_prompt,
        "messages": [{"role": "user", "content": message}]
    }
    
    async with httpx.AsyncClient() as client:
        response = await client.post(
            "https://api.anthropic.com/v1/messages",
            headers=headers,
            json=body,
            timeout=30.0
        )
        
        if response.status_code != 200:
            logger.error(f"Claude API error: {response.status_code} - {response.text}")
            raise HTTPException(status_code=500, detail=f"Claude API error: {response.status_code}")
        
        return response.json()

async def get_ai_response(message: str, context: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
    """Get response from Anthropic Claude with context awareness."""
    try:
        # Determine the appropriate system prompt
        system_prompt = SYSTEM_PROMPTS["general"]
        
        # Build context-aware prompt
        context_prompt = ""
        if context:
            context_prompt = build_context_prompt(context)
        
        # Combine system prompt with context
        full_system_prompt = system_prompt
        if context_prompt:
            full_system_prompt += f"\n\n{context_prompt}\n\nPlease tailor your response to this specific organizational context."
        
        # Call Claude API directly
        claude_response = await call_claude_api(message, full_system_prompt)
        
        # Extract the response text
        ai_response = claude_response["content"][0]["text"]
        
        # Extract framework references (simple keyword matching)
        frameworks = []
        framework_keywords = {
            "NIST": ["nist", "cybersecurity framework", "csf"],
            "SOC2": ["soc 2", "soc2", "service organization control"],
            "ISO27001": ["iso 27001", "iso27001", "information security management"],
            "CMMC": ["cmmc", "cybersecurity maturity model"],
            "GDPR": ["gdpr", "general data protection regulation"],
            "HIPAA": ["hipaa", "health insurance portability"],
            "PCI DSS": ["pci dss", "payment card industry"]
        }
        
        response_lower = ai_response.lower()
        for framework, keywords in framework_keywords.items():
            if any(keyword in response_lower for keyword in keywords):
                frameworks.append(framework)
        
        # Calculate confidence based on response length and context match
        confidence = min(0.95, 0.7 + (len(ai_response) / 2000) * 0.2)
        if context and context.get("company_context"):
            confidence += 0.05  # Boost confidence when we have company context
        
        return {
            "response": ai_response,
            "confidence": confidence,
            "referenced_frameworks": frameworks,
            "referenced_documents": []  # TODO: Implement document matching
        }
        
    except Exception as e:
        logger.error(f"Error getting AI response: {e}")
        raise HTTPException(status_code=500, detail="Failed to get AI response")

# API Routes
@app.get("/api/health", response_model=HealthResponse)
async def health_check():
    """Health check endpoint."""
    return HealthResponse(
        status="healthy",
        timestamp=datetime.utcnow().isoformat(),
        version="1.0.0"
    )

@app.post("/api/chat", response_model=ChatResponse)
async def chat_endpoint(
    request: ChatRequest,
    user = Depends(verify_token)
):
    """Main chat endpoint for AI conversations."""
    try:
        logger.info(f"Chat request from user {request.user_id}: {request.message[:100]}...")
        
        # Get AI response
        ai_result = await get_ai_response(request.message, request.context)
        
        # Save message to database
        conversation_id = request.conversation_id
        if not conversation_id:
            # Create new conversation if none provided
            conversation_result = supabase.table("conversations").insert({
                "user_id": request.user_id,
                "company_id": request.company_id,
                "title": request.message[:50] + "..." if len(request.message) > 50 else request.message,
                "category": "general"
            }).execute()
            
            if conversation_result.data:
                conversation_id = conversation_result.data[0]["id"]
            else:
                raise HTTPException(status_code=500, detail="Failed to create conversation")
        
        # Save AI response to database
        supabase.table("messages").insert({
            "conversation_id": conversation_id,
            "user_id": request.user_id,
            "role": "assistant",
            "content": ai_result["response"],
            "ai_confidence": ai_result["confidence"],
            "framework_references": ai_result["referenced_frameworks"],
            "source_documents": ai_result["referenced_documents"]
        }).execute()
        
        return ChatResponse(
            response=ai_result["response"],
            confidence=ai_result["confidence"],
            referenced_frameworks=ai_result["referenced_frameworks"],
            referenced_documents=ai_result["referenced_documents"],
            conversation_id=conversation_id
        )
        
    except Exception as e:
        logger.error(f"Chat endpoint error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/chat/stream")
async def chat_stream_endpoint(
    request: ChatRequest,
    user = Depends(verify_token)
):
    """Streaming chat endpoint for real-time responses."""
    # TODO: Implement streaming response using Server-Sent Events
    return {"message": "Streaming endpoint not yet implemented"}

@app.post("/api/analyze-document")
async def analyze_document(
    request: DocumentAnalysisRequest,
    user = Depends(verify_token)
):
    """Analyze document content for compliance and security insights."""
    try:
        # Build analysis prompt
        analysis_prompt = f"""Analyze the following {request.document_type} document for cybersecurity and compliance insights:

Document Content:
{request.document_content}

Please provide:
1. A concise summary of the document's security relevance
2. Compliance framework mappings for: {', '.join(request.frameworks)}
3. Identified security controls and requirements
4. Potential gaps or recommendations
5. Risk level assessment

Format your response as structured analysis."""

        # Get AI analysis
        ai_result = await get_ai_response(analysis_prompt)
        
        return {
            "summary": ai_result["response"],
            "confidence": ai_result["confidence"],
            "framework_mappings": ai_result["referenced_frameworks"],
            "recommendations": []  # TODO: Extract specific recommendations
        }
        
    except Exception as e:
        logger.error(f"Document analysis error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)