import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './AuthContext';
import type { ComplianceAssessment, Document } from '../types';

interface CompanyContextType {
  companyFrameworks: string[];
  companyDocuments: Document[];
  complianceStatus: Record<string, any>;
  loadCompanyContext: (companyId: string) => Promise<void>;
  complianceAssessments: ComplianceAssessment[];
}

const CompanyContext = createContext<CompanyContextType | undefined>(undefined);

export const useCompanyContext = () => {
  const context = useContext(CompanyContext);
  if (!context) {
    throw new Error('useCompanyContext must be used within a CompanyProvider');
  }
  return context;
};

export const CompanyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { company } = useAuth();
  const [companyFrameworks, setCompanyFrameworks] = useState<string[]>([]);
  const [companyDocuments, setCompanyDocuments] = useState<Document[]>([]);
  const [complianceStatus, setComplianceStatus] = useState<Record<string, any>>({});
  const [complianceAssessments, setComplianceAssessments] = useState<ComplianceAssessment[]>([]);

  const loadCompanyContext = async (companyId: string) => {
    try {
      // Load company frameworks
      const { data: companyData } = await supabase
        .from('company_profiles')
        .select('compliance_frameworks')
        .eq('id', companyId)
        .single();

      if (companyData) {
        setCompanyFrameworks(companyData.compliance_frameworks || []);
      }

      // Load recent documents for AI context
      const { data: documents } = await supabase
        .from('documents')
        .select('*')
        .eq('company_id', companyId)
        .eq('status', 'approved')
        .order('updated_at', { ascending: false })
        .limit(10);

      if (documents) {
        setCompanyDocuments(documents);
      }

      // Load compliance assessments
      const { data: assessments } = await supabase
        .from('compliance_assessments')
        .select('*')
        .eq('company_id', companyId);

      if (assessments) {
        setComplianceAssessments(assessments);

        // Calculate compliance status summary
        const statusSummary = assessments.reduce((acc: any, assessment) => {
          if (!acc[assessment.framework]) {
            acc[assessment.framework] = { 
              total: 0, 
              implemented: 0, 
              high_risk: 0,
              in_progress: 0 
            };
          }
          acc[assessment.framework].total++;
          
          if (assessment.implementation_status === 'implemented') {
            acc[assessment.framework].implemented++;
          }
          if (assessment.implementation_status === 'in_progress') {
            acc[assessment.framework].in_progress++;
          }
          if (assessment.risk_level === 'high' || assessment.risk_level === 'critical') {
            acc[assessment.framework].high_risk++;
          }
          return acc;
        }, {});

        setComplianceStatus(statusSummary);
      }
    } catch (error) {
      console.error('Error loading company context:', error);
    }
  };

  useEffect(() => {
    if (company?.id) {
      loadCompanyContext(company.id);
    }
  }, [company?.id]);

  const value = {
    companyFrameworks,
    companyDocuments,
    complianceStatus,
    complianceAssessments,
    loadCompanyContext
  };

  return (
    <CompanyContext.Provider value={value}>
      {children}
    </CompanyContext.Provider>
  );
};