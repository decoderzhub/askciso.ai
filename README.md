# vCISO AI Platform

A modern, cybersecurity-focused AI platform website for Virtual CISO services targeting SMBs, MSPs, and regulated startups. Built with advanced design aesthetics, company-aware AI integration, and comprehensive compliance management features.

## Features

### 🤖 AI-Powered Virtual CISO
- **Company-aware AI conversations** with Claude Sonnet 4 integration
- **Framework-specific guidance** for NIST, SOC2, ISO27001, CMMC
- **Document-aware responses** based on uploaded company policies
- **Real-time team collaboration** with shared conversations

### 🏢 Multi-Tenant Architecture
- **Company profiles** with compliance framework selection
- **Team management** with role-based permissions
- **MSP client management** for service providers
- **Enterprise-grade security** with Row Level Security

### 📋 Compliance Management
- **Gap analysis** and control mapping
- **Framework dashboards** with implementation tracking
- **Evidence management** with document linking
- **Audit trail** for compliance reporting

### 🎨 Advanced Design System
- **Cyberpunk-inspired UI** with glassmorphism and neomorphism
- **Golden ratio layouts** with Fibonacci-based spacing
- **Terminal interfaces** and neural network animations
- **Responsive design** optimized for all devices

## Technology Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS with custom design system
- **Animations**: Framer Motion
- **Database**: Supabase PostgreSQL with real-time subscriptions
- **Authentication**: Supabase Auth with Azure SSO support
- **AI Backend**: FastAPI proxy to Anthropic Claude API
- **Icons**: Lucide React

## Getting Started

### Prerequisites
- Node.js 18+ 
- Supabase account
- FastAPI server for AI integration

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd vciso-ai-platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Fill in your Supabase and API configuration
   ```

4. **Set up Supabase**
   - Create a new Supabase project
   - Run the migration file: `supabase/migrations/create_tables.sql`
   - Configure authentication providers (email/password + Azure SSO)
   - Set up Row Level Security policies

5. **Start development server**
   ```bash
   npm run dev
   ```

### Supabase Setup

1. **Database Schema**
   - Run the migration file to create all required tables
   - Enable Row Level Security for multi-tenant data isolation
   - Configure real-time subscriptions for chat features

2. **Authentication**
   - Enable email/password authentication
   - Configure Azure SSO for enterprise customers
   - Set up MFA with OTP for enhanced security

3. **Storage**
   - Create buckets for document storage
   - Configure file upload policies
   - Set up CDN for optimal performance

### FastAPI Backend

The frontend connects to a FastAPI server that handles:
- Anthropic Claude API integration
- Company context injection
- Conversation persistence
- Document analysis

Ensure your FastAPI server is running at the configured `VITE_API_BASE_URL`.

## Database Schema

### Core Tables
- `company_profiles` - Multi-tenant company data
- `user_profiles` - Extended user information with company context
- `team_members` - Role-based team collaboration
- `conversations` - AI chat conversations with company context
- `messages` - Chat messages with AI metadata
- `documents` - Document management with AI analysis
- `compliance_assessments` - Framework control tracking

### Security Features
- Row Level Security (RLS) for data isolation
- Company-based access controls
- Team permission validation
- Audit logging for compliance

## Key Features Implementation

### 1. Company-Aware AI Chat
```typescript
// AI context is built from company data
const aiContext = {
  company_context: {
    industry: company.industry,
    frameworks: companyFrameworks,
    relevant_documents: companyDocuments
  },
  user_role: user.compliance_role
};
```

### 2. Real-time Collaboration
```typescript
// Real-time message synchronization
const subscription = supabase
  .channel('messages')
  .on('postgres_changes', { /* ... */ }, handleNewMessage)
  .subscribe();
```

### 3. Multi-tenant Security
```sql
-- RLS policy example
CREATE POLICY "Users can view company documents" ON documents 
  FOR SELECT USING (
    company_id IN (
      SELECT company_id FROM user_profiles WHERE id = auth.uid()
    )
  );
```

## Design System

### Golden Ratio Layouts
- Components sized using 1.618 ratio
- Fibonacci sequence spacing (8px, 16px, 24px, 40px, 64px)
- Mathematical precision in visual hierarchy

### Cyberpunk Aesthetic
- Dark theme with neon accents
- Terminal-inspired interfaces
- Neural network animations
- Glassmorphism effects

### Advanced Animations
- Particle network backgrounds
- Holographic dashboard elements
- Morphing icons and micro-interactions
- Smooth page transitions

## Compliance Features

### Framework Support
- **NIST Cybersecurity Framework** - 5 functions with sub-controls
- **SOC2 Type II** - Trust criteria with evidence tracking
- **ISO 27001** - Control families with implementation status
- **CMMC** - Level-based requirements with maturity scoring

### Gap Analysis
- Automated control mapping
- Risk level assessment
- Implementation progress tracking
- AI-powered recommendations

## API Integration

### FastAPI Endpoints
```
POST /api/chat - Send message to AI with company context
GET /api/health - Health check
POST /api/analyze-document - Document analysis
```

### Error Handling
- Network connectivity fallbacks
- Graceful API degradation
- User-friendly error messages
- Retry mechanisms with exponential backoff

## Security Considerations

- **End-to-end encryption** for sensitive data
- **Zero-trust architecture** with JWT validation
- **SOC2 Type II compliance** ready
- **MFA enforcement** for critical operations
- **Audit logging** for compliance tracking

## Deployment

### Production Setup
1. Configure production Supabase project
2. Set up FastAPI server with proper SSL
3. Configure environment variables
4. Enable monitoring and logging
5. Set up backup procedures

### Environment Variables
```bash
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_API_BASE_URL=https://your-api-server.com
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Follow the established design patterns
4. Ensure security best practices
5. Add tests for new features
6. Submit a pull request

## License

This project is proprietary software. All rights reserved.

## Support

For technical support or questions:
- Email: support@vciso-ai.com
- Documentation: [link to docs]
- Status Page: [link to status page]