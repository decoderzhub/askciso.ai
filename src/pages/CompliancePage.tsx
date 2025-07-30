import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  CheckCircle, 
  AlertTriangle, 
  Clock, 
  Target, 
  BarChart3,
  FileText,
  Users,
  Calendar,
  TrendingUp,
  Filter,
  Download
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useCompanyContext } from '../contexts/CompanyContext';
import { supabase } from '../lib/supabase';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import type { ComplianceAssessment } from '../types';

export const CompliancePage: React.FC = () => {
  const { user, company } = useAuth();
  const { complianceStatus, complianceAssessments } = useCompanyContext();
  const [selectedFramework, setSelectedFramework] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [loading, setLoading] = useState(false);

  const frameworks = [
    { value: 'all', label: 'All Frameworks' },
    { value: 'NIST', label: 'NIST Cybersecurity Framework' },
    { value: 'SOC2', label: 'SOC 2 Type II' },
    { value: 'ISO27001', label: 'ISO 27001' },
    { value: 'CMMC', label: 'CMMC' }
  ];

  const statusFilters = [
    { value: 'all', label: 'All Status' },
    { value: 'not_started', label: 'Not Started' },
    { value: 'in_progress', label: 'In Progress' },
    { value: 'implemented', label: 'Implemented' },
    { value: 'not_applicable', label: 'Not Applicable' }
  ];

  const riskLevels = [
    { value: 'low', label: 'Low', color: 'text-green-400', bgColor: 'bg-green-500/20' },
    { value: 'medium', label: 'Medium', color: 'text-yellow-400', bgColor: 'bg-yellow-500/20' },
    { value: 'high', label: 'High', color: 'text-red-400', bgColor: 'bg-red-500/20' },
    { value: 'critical', label: 'Critical', color: 'text-red-500', bgColor: 'bg-red-600/20' }
  ];

  const filteredAssessments = complianceAssessments.filter(assessment => {
    const matchesFramework = selectedFramework === 'all' || assessment.framework === selectedFramework;
    const matchesStatus = selectedStatus === 'all' || assessment.implementation_status === selectedStatus;
    return matchesFramework && matchesStatus;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'implemented': return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'in_progress': return <Clock className="w-4 h-4 text-yellow-400" />;
      case 'not_started': return <AlertTriangle className="w-4 h-4 text-red-400" />;
      case 'not_applicable': return <Target className="w-4 h-4 text-slate-400" />;
      default: return <Clock className="w-4 h-4 text-slate-400" />;
    }
  };

  const getRiskColor = (risk: string) => {
    const riskLevel = riskLevels.find(r => r.value === risk);
    return riskLevel ? { color: riskLevel.color, bgColor: riskLevel.bgColor } : 
           { color: 'text-slate-400', bgColor: 'bg-slate-500/20' };
  };

  const calculateFrameworkStats = (framework: string) => {
    const frameworkAssessments = complianceAssessments.filter(a => a.framework === framework);
    const total = frameworkAssessments.length;
    const implemented = frameworkAssessments.filter(a => a.implementation_status === 'implemented').length;
    const inProgress = frameworkAssessments.filter(a => a.implementation_status === 'in_progress').length;
    const highRisk = frameworkAssessments.filter(a => a.risk_level === 'high' || a.risk_level === 'critical').length;
    
    return {
      total,
      implemented,
      inProgress,
      highRisk,
      percentage: total > 0 ? Math.round((implemented / total) * 100) : 0
    };
  };

  const frameworkOverview = Object.keys(complianceStatus).map(framework => ({
    name: framework,
    ...calculateFrameworkStats(framework)
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/10 to-slate-900 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Compliance Management</h1>
            <p className="text-slate-400">
              Framework implementation tracking and gap analysis for {company?.name}
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="glassmorphism" icon={Download}>
              Export Report
            </Button>
            <Button variant="primary" icon={Target}>
              Run Gap Analysis
            </Button>
          </div>
        </motion.div>

        {/* Framework Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {frameworkOverview.map((framework, index) => (
            <motion.div
              key={framework.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card variant="neural">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-cyan-400" />
                    <h3 className="font-semibold text-white">{framework.name}</h3>
                  </div>
                  <div className="text-2xl font-bold text-cyan-400">
                    {framework.percentage}%
                  </div>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Progress</span>
                    <span className="text-white">{framework.implemented}/{framework.total}</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-cyan-400 to-purple-400 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${framework.percentage}%` }}
                    />
                  </div>
                </div>
                
                <div className="flex justify-between text-xs text-slate-400">
                  <span>{framework.inProgress} in progress</span>
                  {framework.highRisk > 0 && (
                    <span className="text-red-400">{framework.highRisk} high risk</span>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <Card variant="glassmorphism">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-cyan-400" />
                <span className="text-white font-medium">Filters:</span>
              </div>
              
              <div className="flex gap-3 flex-1">
                <select
                  value={selectedFramework}
                  onChange={(e) => setSelectedFramework(e.target.value)}
                  className="px-4 py-2 bg-slate-800/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                >
                  {frameworks.map(framework => (
                    <option key={framework.value} value={framework.value}>
                      {framework.label}
                    </option>
                  ))}
                </select>
                
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="px-4 py-2 bg-slate-800/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                >
                  {statusFilters.map(status => (
                    <option key={status.value} value={status.value}>
                      {status.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="text-sm text-slate-400">
                Showing {filteredAssessments.length} of {complianceAssessments.length} controls
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Controls List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card variant="cyberpunk">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-cyan-400" />
                Compliance Controls
              </h3>
            </div>
            
            <div className="space-y-4">
              {filteredAssessments.map((assessment, index) => (
                <motion.div
                  key={assessment.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="p-4 bg-slate-800/30 rounded-lg border border-slate-700 hover:border-cyan-500/30 transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="px-2 py-1 bg-cyan-500/20 text-cyan-400 text-xs rounded font-mono">
                          {assessment.framework}
                        </span>
                        <span className="px-2 py-1 bg-purple-500/20 text-purple-400 text-xs rounded font-mono">
                          {assessment.control_id}
                        </span>
                        <div className={`px-2 py-1 text-xs rounded ${getRiskColor(assessment.risk_level).bgColor} ${getRiskColor(assessment.risk_level).color}`}>
                          {assessment.risk_level?.toUpperCase()}
                        </div>
                      </div>
                      
                      <h4 className="text-white font-medium mb-2">
                        {assessment.control_description}
                      </h4>
                      
                      {assessment.ai_recommendations && (
                        <p className="text-slate-300 text-sm mb-3">
                          {assessment.ai_recommendations}
                        </p>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2 ml-4">
                      {getStatusIcon(assessment.implementation_status)}
                      <span className="text-sm text-slate-400 capitalize">
                        {assessment.implementation_status?.replace('_', ' ')}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-slate-400">
                    <div className="flex items-center gap-4">
                      {assessment.assigned_to && (
                        <div className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          <span>Assigned</span>
                        </div>
                      )}
                      {assessment.due_date && (
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>Due {new Date(assessment.due_date).toLocaleDateString()}</span>
                        </div>
                      )}
                      {assessment.evidence_documents.length > 0 && (
                        <div className="flex items-center gap-1">
                          <FileText className="w-3 h-3" />
                          <span>{assessment.evidence_documents.length} evidence</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex gap-2">
                      <Button variant="glassmorphism" size="sm">
                        View Details
                      </Button>
                      <Button variant="glassmorphism" size="sm">
                        Update Status
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {filteredAssessments.length === 0 && (
              <div className="text-center py-12">
                <Target className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">No controls found</h3>
                <p className="text-slate-400 mb-6">
                  Try adjusting your filters or run a gap analysis to identify controls.
                </p>
                <Button variant="primary" icon={Target}>
                  Run Gap Analysis
                </Button>
              </div>
            )}
          </Card>
        </motion.div>
      </div>
    </div>
  );
};