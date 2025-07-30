# vCISO AI FastAPI Backend

This is the FastAPI backend server for the vCISO AI platform, providing AI-powered cybersecurity guidance through Anthropic's Claude API.

## Features

- **AI Chat Integration**: Anthropic Claude 3 Sonnet for expert cybersecurity guidance
- **Company Context Awareness**: Tailored responses based on company profile and compliance frameworks
- **Document Analysis**: AI-powered analysis of security documents and policies
- **Supabase Integration**: Real-time database operations and authentication
- **JWT Authentication**: Secure API endpoints with Supabase Auth
- **Compliance Framework Support**: NIST, SOC2, ISO27001, CMMC, and more

## Setup

### Prerequisites

- Python 3.9+
- Anthropic API key
- Supabase project with service role key

### Installation

1. **Clone and navigate to backend directory**
   ```bash
   cd fastapi-backend
   ```

2. **Create virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your actual API keys and configuration
   ```

5. **Run the server**
   ```bash
   uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```

## Environment Variables

```bash
# Required
ANTHROPIC_API_KEY=your_anthropic_api_key
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Optional
ENVIRONMENT=development
LOG_LEVEL=INFO
ALLOWED_ORIGINS=http://localhost:5173
```

## API Endpoints

### Health Check
```
GET /api/health
```

### Chat with AI
```
POST /api/chat
Content-Type: application/json
Authorization: Bearer <jwt_token>

{
  "message": "Help me create a NIST cybersecurity framework implementation plan",
  "user_id": "user-uuid",
  "company_id": "company-uuid",
  "conversation_id": "conversation-uuid", // optional
  "context": {
    "company_context": {
      "industry": "Technology",
      "frameworks": ["NIST", "SOC2"],
      "relevant_documents": [...]
    },
    "compliance_status": {...},
    "user_role": "CISO"
  }
}
```

### Document Analysis
```
POST /api/analyze-document
Content-Type: application/json
Authorization: Bearer <jwt_token>

{
  "document_content": "Document text content...",
  "document_type": "policy",
  "company_id": "company-uuid",
  "frameworks": ["NIST", "SOC2"]
}
```

## AI Context System

The backend provides intelligent, context-aware responses by:

1. **Company Profile Integration**: Industry, size, and compliance frameworks
2. **Document Awareness**: References to uploaded company documents
3. **Compliance Status**: Current implementation progress across frameworks
4. **Role-Based Responses**: Tailored to user's compliance role (CISO, IT Admin, etc.)

## Framework Support

- **NIST Cybersecurity Framework**: Identify, Protect, Detect, Respond, Recover
- **SOC 2 Type II**: Trust service criteria and controls
- **ISO 27001**: Information security management systems
- **CMMC**: Cybersecurity Maturity Model Certification
- **GDPR**: General Data Protection Regulation
- **HIPAA**: Health Insurance Portability and Accountability Act
- **PCI DSS**: Payment Card Industry Data Security Standard

## Security Features

- **JWT Authentication**: Validates Supabase auth tokens
- **CORS Protection**: Configurable allowed origins
- **Input Validation**: Pydantic models for request validation
- **Error Handling**: Comprehensive error responses
- **Logging**: Structured logging for monitoring

## Development

### Running in Development
```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### API Documentation
Visit `http://localhost:8000/docs` for interactive API documentation.

### Testing
```bash
# Install test dependencies
pip install pytest pytest-asyncio httpx

# Run tests
pytest
```

## Deployment

### Docker Deployment
```dockerfile
FROM python:3.9-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .
EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

### Environment Configuration
- Set `ENVIRONMENT=production`
- Configure proper `ALLOWED_ORIGINS`
- Use secure secrets management
- Enable HTTPS in production

## Monitoring

The backend includes:
- Health check endpoint for uptime monitoring
- Structured logging for error tracking
- Request/response logging for debugging
- Performance metrics collection

## Contributing

1. Follow PEP 8 style guidelines
2. Add type hints to all functions
3. Include docstrings for public methods
4. Write tests for new features
5. Update API documentation

## License

This project is proprietary software. All rights reserved.