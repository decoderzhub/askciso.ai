export interface User {
  id: string;
  email: string;
  full_name?: string;
  company_id?: string;
  compliance_role?: 'CISO' | 'IT Admin' | 'Compliance Officer' | 'Auditor';
  security_clearance?: 'Public Trust' | 'Secret' | 'Top Secret';
  mfa_enabled: boolean;
}

export interface Company {
  id: string;
  name: string;
  industry?: string;
  company_size?: 'SMB' | 'Mid-market' | 'Enterprise';
  compliance_frameworks: string[];
  subscription_tier: 'starter' | 'professional' | 'enterprise';
  created_at: string;
}

export interface TeamMember {
  id: string;
  company_id: string;
  user_id: string;
  role: 'owner' | 'admin' | 'member' | 'viewer';
  permissions: string[];
  status: 'active' | 'inactive' | 'pending';
  user: User;
}

export interface Conversation {
  id: string;
  user_id: string;
  company_id: string;
  title?: string;
  category?: 'policy' | 'compliance' | 'risk' | 'incident' | 'general';
  framework_context: string[];
  shared_with: string[];
  created_at: string;
  updated_at: string;
  messages?: Message[];
}

export interface Message {
  id: string;
  conversation_id: string;
  user_id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  ai_confidence?: number;
  framework_references: string[];
  source_documents: string[];
  created_at: string;
}

export interface Document {
  id: string;
  company_id: string;
  user_id: string;
  document_type: 'policy' | 'procedure' | 'audit_report' | 'risk_assessment';
  title: string;
  content?: string;
  file_url?: string;
  framework_tags: string[];
  ai_summary?: string;
  status: 'draft' | 'review' | 'approved' | 'archived';
  version: number;
  created_at: string;
  updated_at: string;
}

export interface ComplianceAssessment {
  id: string;
  company_id: string;
  framework: string;
  control_id: string;
  control_description: string;
  implementation_status: 'not_started' | 'in_progress' | 'implemented' | 'not_applicable';
  evidence_documents: string[];
  risk_level: 'low' | 'medium' | 'high' | 'critical';
  assigned_to?: string;
  due_date?: string;
  last_reviewed?: string;
  ai_recommendations?: string;
  created_at: string;
  updated_at: string;
}

export interface Notification {
  id: string;
  user_id: string;
  company_id: string;
  type: 'compliance_deadline' | 'security_alert' | 'system_update' | 'team_invite';
  title: string;
  message: string;
  action_url?: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  read: boolean;
  created_at: string;
}