/*
  # vCISO AI Platform Database Schema

  1. New Tables
    - `company_profiles` - Multi-tenant company data with compliance frameworks
    - `user_profiles` - Extended user data with company context and roles  
    - `team_members` - Team collaboration with role-based permissions
    - `documents` - Document management with AI analysis metadata
    - `conversations` - AI chat conversations with company context
    - `messages` - Chat messages with AI confidence and framework references
    - `compliance_assessments` - Framework control tracking and gap analysis
    - `notifications` - User notification system
    - `msp_clients` - MSP client management for multi-tenant MSPs
    - `audit_logs` - Compliance audit trail
    - `integrations` - Third-party tool connections

  2. Security
    - Enable RLS on all tables
    - Company-based data isolation
    - User-based access controls
    - Team permission validation

  3. Features
    - Multi-tenant architecture
    - Company-aware AI conversations
    - Compliance framework tracking
    - Team collaboration
    - Document management with AI analysis
    - MSP client management
    - Audit logging for compliance
*/

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "vector";

-- Company profiles for multi-tenant support
CREATE TABLE IF NOT EXISTS company_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  industry text,
  company_size text CHECK (company_size IN ('SMB', 'Mid-market', 'Enterprise')),
  compliance_frameworks text[] DEFAULT '{}',
  subscription_tier text DEFAULT 'starter' CHECK (subscription_tier IN ('starter', 'professional', 'enterprise')),
  created_by uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enhanced user profiles with company context
CREATE TABLE IF NOT EXISTS user_profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  email text,
  full_name text,
  company_id uuid REFERENCES company_profiles(id),
  compliance_role text CHECK (compliance_role IN ('CISO', 'IT Admin', 'Compliance Officer', 'Auditor')),
  security_clearance text CHECK (security_clearance IN ('Public Trust', 'Secret', 'Top Secret')),
  mfa_enabled boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Team collaboration for companies
CREATE TABLE IF NOT EXISTS team_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid REFERENCES company_profiles(id) NOT NULL,
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  role text NOT NULL CHECK (role IN ('owner', 'admin', 'member', 'viewer')),
  permissions text[] DEFAULT '{}',
  invited_by uuid REFERENCES auth.users(id),
  status text DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'pending')),
  created_at timestamptz DEFAULT now(),
  UNIQUE(company_id, user_id)
);

-- Document management system
CREATE TABLE IF NOT EXISTS documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid REFERENCES company_profiles(id) NOT NULL,
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  document_type text CHECK (document_type IN ('policy', 'procedure', 'audit_report', 'risk_assessment')),
  title text NOT NULL,
  content text,
  file_url text,
  framework_tags text[] DEFAULT '{}',
  ai_summary text,
  ai_embedding vector(1536),
  status text DEFAULT 'draft' CHECK (status IN ('draft', 'review', 'approved', 'archived')),
  version integer DEFAULT 1,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enhanced conversations with company context
CREATE TABLE IF NOT EXISTS conversations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  company_id uuid REFERENCES company_profiles(id) NOT NULL,
  title text,
  category text CHECK (category IN ('policy', 'compliance', 'risk', 'incident', 'general')),
  framework_context text[] DEFAULT '{}',
  shared_with uuid[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enhanced messages with AI metadata
CREATE TABLE IF NOT EXISTS messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id uuid REFERENCES conversations(id) NOT NULL,
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  role text NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
  content text NOT NULL,
  ai_confidence numeric(3,2),
  framework_references text[] DEFAULT '{}',
  source_documents uuid[] DEFAULT '{}',
  feedback_rating integer CHECK (feedback_rating >= 1 AND feedback_rating <= 5),
  created_at timestamptz DEFAULT now()
);

-- Compliance tracking and gap analysis
CREATE TABLE IF NOT EXISTS compliance_assessments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid REFERENCES company_profiles(id) NOT NULL,
  framework text NOT NULL,
  control_id text NOT NULL,
  control_description text,
  implementation_status text CHECK (implementation_status IN ('not_started', 'in_progress', 'implemented', 'not_applicable')),
  evidence_documents uuid[] DEFAULT '{}',
  risk_level text CHECK (risk_level IN ('low', 'medium', 'high', 'critical')),
  assigned_to uuid REFERENCES auth.users(id),
  due_date date,
  last_reviewed date,
  ai_recommendations text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Notification system
CREATE TABLE IF NOT EXISTS notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  company_id uuid REFERENCES company_profiles(id) NOT NULL,
  type text CHECK (type IN ('compliance_deadline', 'security_alert', 'system_update', 'team_invite')),
  title text NOT NULL,
  message text,
  action_url text,
  priority text DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  read boolean DEFAULT false,
  expires_at timestamptz,
  created_at timestamptz DEFAULT now()
);

-- MSP client management
CREATE TABLE IF NOT EXISTS msp_clients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  msp_company_id uuid REFERENCES company_profiles(id) NOT NULL,
  client_company_id uuid REFERENCES company_profiles(id) NOT NULL,
  service_level text CHECK (service_level IN ('basic', 'premium', 'enterprise')),
  billing_model text CHECK (billing_model IN ('monthly', 'annual', 'per_user')),
  contract_start date,
  contract_end date,
  status text DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended')),
  created_at timestamptz DEFAULT now()
);

-- Audit logging for compliance
CREATE TABLE IF NOT EXISTS audit_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  company_id uuid REFERENCES company_profiles(id),
  action text NOT NULL,
  resource_type text,
  resource_id uuid,
  details jsonb,
  ip_address inet,
  user_agent text,
  created_at timestamptz DEFAULT now()
);

-- Integration connectors
CREATE TABLE IF NOT EXISTS integrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid REFERENCES company_profiles(id) NOT NULL,
  integration_type text,
  config jsonb,
  status text DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'error')),
  last_sync timestamptz,
  sync_errors text[] DEFAULT '{}',
  created_by uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE company_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE compliance_assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE msp_clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE integrations ENABLE ROW LEVEL SECURITY;

-- RLS Policies for company_profiles
CREATE POLICY "Users can view own company" ON company_profiles 
  FOR SELECT USING (
    auth.uid() IN (
      SELECT user_id FROM team_members WHERE company_id = company_profiles.id
    )
  );

CREATE POLICY "Company owners can update company" ON company_profiles 
  FOR UPDATE USING (
    auth.uid() IN (
      SELECT user_id FROM team_members 
      WHERE company_id = company_profiles.id AND role IN ('owner', 'admin')
    )
  );

-- RLS Policies for user_profiles
CREATE POLICY "Users can view own profile" ON user_profiles 
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON user_profiles 
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON user_profiles 
  FOR INSERT WITH CHECK (auth.uid() = id);

-- RLS Policies for team_members
CREATE POLICY "Users can view team members of their company" ON team_members 
  FOR SELECT USING (
    company_id IN (
      SELECT company_id FROM user_profiles WHERE id = auth.uid()
    )
  );

CREATE POLICY "Company admins can manage team members" ON team_members 
  FOR ALL USING (
    auth.uid() IN (
      SELECT user_id FROM team_members tm2 
      WHERE tm2.company_id = team_members.company_id AND tm2.role IN ('owner', 'admin')
    )
  );

-- RLS Policies for documents
CREATE POLICY "Users can view company documents" ON documents 
  FOR SELECT USING (
    company_id IN (
      SELECT company_id FROM user_profiles WHERE id = auth.uid()
    )
  );

CREATE POLICY "Users can create documents for their company" ON documents 
  FOR INSERT WITH CHECK (
    company_id IN (
      SELECT company_id FROM user_profiles WHERE id = auth.uid()
    ) AND user_id = auth.uid()
  );

CREATE POLICY "Users can update own documents" ON documents 
  FOR UPDATE USING (user_id = auth.uid());

-- RLS Policies for conversations
CREATE POLICY "Users can view own conversations or shared conversations" ON conversations 
  FOR SELECT USING (
    user_id = auth.uid() OR 
    auth.uid() = ANY(shared_with) OR
    company_id IN (
      SELECT company_id FROM user_profiles WHERE id = auth.uid()
    )
  );

CREATE POLICY "Users can create conversations for their company" ON conversations 
  FOR INSERT WITH CHECK (
    user_id = auth.uid() AND
    company_id IN (
      SELECT company_id FROM user_profiles WHERE id = auth.uid()
    )
  );

CREATE POLICY "Users can update own conversations" ON conversations 
  FOR UPDATE USING (user_id = auth.uid());

-- RLS Policies for messages
CREATE POLICY "Users can view messages from accessible conversations" ON messages 
  FOR SELECT USING (
    conversation_id IN (
      SELECT id FROM conversations WHERE 
        user_id = auth.uid() OR 
        auth.uid() = ANY(shared_with) OR
        company_id IN (
          SELECT company_id FROM user_profiles WHERE id = auth.uid()
        )
    )
  );

CREATE POLICY "Users can create messages in accessible conversations" ON messages 
  FOR INSERT WITH CHECK (
    user_id = auth.uid() AND
    conversation_id IN (
      SELECT id FROM conversations WHERE 
        user_id = auth.uid() OR 
        auth.uid() = ANY(shared_with) OR
        company_id IN (
          SELECT company_id FROM user_profiles WHERE id = auth.uid()
        )
    )
  );

-- RLS Policies for compliance_assessments
CREATE POLICY "Users can view company compliance assessments" ON compliance_assessments 
  FOR SELECT USING (
    company_id IN (
      SELECT company_id FROM user_profiles WHERE id = auth.uid()
    )
  );

CREATE POLICY "Users can manage compliance assessments for their company" ON compliance_assessments 
  FOR ALL USING (
    company_id IN (
      SELECT company_id FROM user_profiles WHERE id = auth.uid()
    )
  );

-- RLS Policies for notifications
CREATE POLICY "Users can view own notifications" ON notifications 
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "System can create notifications" ON notifications 
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can update own notifications" ON notifications 
  FOR UPDATE USING (user_id = auth.uid());

-- RLS Policies for audit_logs
CREATE POLICY "Users can view company audit logs" ON audit_logs 
  FOR SELECT USING (
    company_id IN (
      SELECT company_id FROM user_profiles WHERE id = auth.uid()
    )
  );

CREATE POLICY "System can create audit logs" ON audit_logs 
  FOR INSERT WITH CHECK (true);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_user_profiles_company_id ON user_profiles(company_id);
CREATE INDEX IF NOT EXISTS idx_team_members_company_id ON team_members(company_id);
CREATE INDEX IF NOT EXISTS idx_team_members_user_id ON team_members(user_id);
CREATE INDEX IF NOT EXISTS idx_documents_company_id ON documents(company_id);
CREATE INDEX IF NOT EXISTS idx_conversations_user_id ON conversations(user_id);
CREATE INDEX IF NOT EXISTS idx_conversations_company_id ON conversations(company_id);
CREATE INDEX IF NOT EXISTS idx_messages_conversation_id ON messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_compliance_assessments_company_id ON compliance_assessments(company_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_company_id ON audit_logs(company_id);

-- Create functions for updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add updated_at triggers
CREATE TRIGGER update_company_profiles_updated_at BEFORE UPDATE ON company_profiles 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON user_profiles 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_documents_updated_at BEFORE UPDATE ON documents 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_conversations_updated_at BEFORE UPDATE ON conversations 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_compliance_assessments_updated_at BEFORE UPDATE ON compliance_assessments 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();