import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, 
  Upload, 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Edit, 
  Trash2, 
  Plus,
  BookOpen,
  Shield,
  AlertCircle,
  CheckCircle,
  Clock
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import type { Document } from '../types';

export const DocumentsPage: React.FC = () => {
  const { user, company } = useAuth();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [showUploadModal, setShowUploadModal] = useState(false);

  const documentTypes = [
    { value: 'all', label: 'All Types' },
    { value: 'policy', label: 'Policies' },
    { value: 'procedure', label: 'Procedures' },
    { value: 'audit_report', label: 'Audit Reports' },
    { value: 'risk_assessment', label: 'Risk Assessments' }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'draft', label: 'Draft' },
    { value: 'review', label: 'Under Review' },
    { value: 'approved', label: 'Approved' },
    { value: 'archived', label: 'Archived' }
  ];

  useEffect(() => {
    if (company?.id) {
      loadDocuments();
    }
  }, [company?.id]);

  const loadDocuments = async () => {
    try {
      const { data, error } = await supabase
        .from('documents')
        .select('*')
        .eq('company_id', company!.id)
        .order('updated_at', { ascending: false });

      if (error) throw error;
      setDocuments(data || []);
    } catch (error) {
      console.error('Error loading documents:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.content?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || doc.document_type === selectedType;
    const matchesStatus = selectedStatus === 'all' || doc.status === selectedStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'draft': return <Edit className="w-4 h-4 text-yellow-400" />;
      case 'review': return <Clock className="w-4 h-4 text-blue-400" />;
      case 'approved': return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'archived': return <AlertCircle className="w-4 h-4 text-slate-400" />;
      default: return <FileText className="w-4 h-4 text-slate-400" />;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'policy': return <Shield className="w-4 h-4 text-cyan-400" />;
      case 'procedure': return <BookOpen className="w-4 h-4 text-purple-400" />;
      case 'audit_report': return <FileText className="w-4 h-4 text-green-400" />;
      case 'risk_assessment': return <AlertCircle className="w-4 h-4 text-red-400" />;
      default: return <FileText className="w-4 h-4 text-slate-400" />;
    }
  };

  const UploadModal = () => (
    <AnimatePresence>
      {showUploadModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowUploadModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <Card variant="cyberpunk">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Upload Document</h3>
                <Button
                  variant="glassmorphism"
                  size="sm"
                  onClick={() => setShowUploadModal(false)}
                >
                  ×
                </Button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Document Title
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    placeholder="Enter document title"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Document Type
                  </label>
                  <select className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500">
                    <option value="policy">Policy</option>
                    <option value="procedure">Procedure</option>
                    <option value="audit_report">Audit Report</option>
                    <option value="risk_assessment">Risk Assessment</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Upload File
                  </label>
                  <div className="border-2 border-dashed border-slate-600 rounded-lg p-8 text-center hover:border-cyan-500/50 transition-colors">
                    <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                    <p className="text-slate-400 mb-2">Drop files here or click to browse</p>
                    <p className="text-slate-500 text-sm">Supports PDF, DOC, DOCX up to 10MB</p>
                  </div>
                </div>
                
                <div className="flex gap-3 pt-4">
                  <Button variant="primary" className="flex-1">
                    Upload & Analyze
                  </Button>
                  <Button 
                    variant="secondary" 
                    onClick={() => setShowUploadModal(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/10 to-slate-900 pt-16 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-400">Loading documents...</p>
        </div>
      </div>
    );
  }

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
            <h1 className="text-4xl font-bold text-white mb-2">Document Management</h1>
            <p className="text-slate-400">
              AI-powered document analysis and compliance mapping for {company?.name}
            </p>
          </div>
          <Button
            variant="primary"
            icon={Plus}
            onClick={() => setShowUploadModal(true)}
          >
            Upload Document
          </Button>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <Card variant="glassmorphism">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    placeholder="Search documents..."
                  />
                </div>
              </div>
              
              <div className="flex gap-3">
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                >
                  {documentTypes.map(type => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
                
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                >
                  {statusOptions.map(status => (
                    <option key={status.value} value={status.value}>{status.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Documents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDocuments.map((document, index) => (
            <motion.div
              key={document.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card variant="neural" className="h-full group hover:border-cyan-500/50">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {getTypeIcon(document.document_type)}
                    <div>
                      <h3 className="font-semibold text-white group-hover:text-cyan-300 transition-colors">
                        {document.title}
                      </h3>
                      <p className="text-sm text-slate-400 capitalize">
                        {document.document_type?.replace('_', ' ')}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    {getStatusIcon(document.status)}
                    <span className="text-xs text-slate-400 capitalize">
                      {document.status}
                    </span>
                  </div>
                </div>

                {document.ai_summary && (
                  <p className="text-sm text-slate-300 mb-4 line-clamp-3">
                    {document.ai_summary}
                  </p>
                )}

                {document.framework_tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-4">
                    {document.framework_tags.slice(0, 3).map(tag => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-cyan-500/20 text-cyan-400 text-xs rounded"
                      >
                        {tag}
                      </span>
                    ))}
                    {document.framework_tags.length > 3 && (
                      <span className="px-2 py-1 bg-slate-700 text-slate-400 text-xs rounded">
                        +{document.framework_tags.length - 3}
                      </span>
                    )}
                  </div>
                )}

                <div className="flex items-center justify-between text-xs text-slate-400 mb-4">
                  <span>v{document.version}</span>
                  <span>{new Date(document.updated_at).toLocaleDateString()}</span>
                </div>

                <div className="flex gap-2">
                  <Button variant="glassmorphism" size="sm" icon={Eye} className="flex-1">
                    View
                  </Button>
                  <Button variant="glassmorphism" size="sm" icon={Download}>
                    <span className="sr-only">Download</span>
                  </Button>
                  <Button variant="glassmorphism" size="sm" icon={Edit}>
                    <span className="sr-only">Edit</span>
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredDocuments.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <FileText className="w-16 h-16 text-slate-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No documents found</h3>
            <p className="text-slate-400 mb-6">
              {searchTerm || selectedType !== 'all' || selectedStatus !== 'all'
                ? 'Try adjusting your search criteria'
                : 'Upload your first document to get started with AI-powered analysis'
              }
            </p>
            {!searchTerm && selectedType === 'all' && selectedStatus === 'all' && (
              <Button
                variant="primary"
                icon={Plus}
                onClick={() => setShowUploadModal(true)}
              >
                Upload First Document
              </Button>
            )}
          </motion.div>
        )}

        <UploadModal />
      </div>
    </div>
  );
};