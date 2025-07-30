import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Users, 
  FileText, 
  Activity,
  BarChart3,
  Target,
  Zap,
  Lock
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useCompanyContext } from '../contexts/CompanyContext';
import { supabase } from '../lib/supabase';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import type { ComplianceAssessment, Notification } from '../types';

export const DashboardPage: React.FC = () => {
  const { user, company } = useAuth();
  const { complianceStatus, complianceAssessments } = useCompanyContext();
  const [recentNotifications, setRecentNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.id) {
      loadDashboardData();
    }
  }, [user?.id]);

  const loadDashboardData = async () => {
    try {
      // Load recent notifications
      const { data: notifications } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', user!.id)
        .order('created_at', { ascending: false })
        .limit(5);

      if (notifications) {
        setRecentNotifications(notifications);
      }
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateOverallScore = () => {
    const frameworks = Object.keys(complianceStatus);
    if (frameworks.length === 0) return 0;
    
    const totalScore = frameworks.reduce((acc, framework) => {
      const status = complianceStatus[framework];
      return acc + (status.implemented / status.total) * 100;
    }, 0);
    
    return Math.round(totalScore / frameworks.length);
  };

  const getHighRiskControls = () => {
    return complianceAssessments.filter(
      assessment => assessment.risk_level === 'high' || assessment.risk_level === 'critical'
    ).length;
  };

  const getOverdueControls = () => {
    const today = new Date();
    return complianceAssessments.filter(
      assessment => assessment.due_date && new Date(assessment.due_date) < today
    ).length;
  };

  const overallScore = calculateOverallScore();
  const highRiskControls = getHighRiskControls();
  const overdueControls = getOverdueControls();

  const dashboardMetrics = [
    {
      title: 'Security Score',
      value: `${overallScore}%`,
      change: '+5%',
      trend: 'up',
      icon: Shield,
      color: 'text-green-400',
      bgColor: 'bg-green-500/20'
    },
    {
      title: 'High Risk Controls',
      value: highRiskControls.toString(),
      change: '-2',
      trend: 'down',
      icon: AlertTriangle,
      color: 'text-red-400',
      bgColor: 'bg-red-500/20'
    },
    {
      title: 'Compliance Rate',
      value: `${Math.round((complianceAssessments.filter(a => a.implementation_status === 'implemented').length / Math.max(complianceAssessments.length, 1)) * 100)}%`,
      change: '+12%',
      trend: 'up',
      icon: CheckCircle,
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-500/20'
    },
    {
      title: 'Overdue Items',
      value: overdueControls.toString(),
      change: '0',
      trend: 'neutral',
      icon: Clock,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/20'
    }
  ];

  const frameworkProgress = Object.entries(complianceStatus).map(([framework, status]) => ({
    name: framework,
    implemented: status.implemented,
    total: status.total,
    percentage: Math.round((status.implemented / status.total) * 100),
    highRisk: status.high_risk
  }));

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/10 to-slate-900 pt-16 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-400">Loading security dashboard...</p>
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
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-2">Security Dashboard</h1>
          <p className="text-slate-400">
            Real-time security posture and compliance overview for {company?.name}
          </p>
        </motion.div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {dashboardMetrics.map((metric, index) => (
            <motion.div
              key={metric.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card variant="neural" className="h-full">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl ${metric.bgColor} border border-current/30`}>
                    <metric.icon className={`w-6 h-6 ${metric.color}`} />
                  </div>
                  <div className={`text-sm flex items-center gap-1 ${
                    metric.trend === 'up' ? 'text-green-400' : 
                    metric.trend === 'down' ? 'text-red-400' : 'text-slate-400'
                  }`}>
                    {metric.trend === 'up' && <TrendingUp className="w-4 h-4" />}
                    {metric.trend === 'down' && <TrendingUp className="w-4 h-4 rotate-180" />}
                    {metric.change}
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white mb-1">{metric.value}</div>
                  <div className="text-slate-400 text-sm">{metric.title}</div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Framework Progress */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card variant="cyberpunk">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-cyan-400" />
                    Compliance Framework Progress
                  </h3>
                  <Button variant="glassmorphism" size="sm">
                    View Details
                  </Button>
                </div>
                
                <div className="space-y-6">
                  {frameworkProgress.map((framework) => (
                    <div key={framework.name}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white font-medium">{framework.name}</span>
                        <div className="flex items-center gap-4">
                          {framework.highRisk > 0 && (
                            <span className="text-red-400 text-sm flex items-center gap-1">
                              <AlertTriangle className="w-3 h-3" />
                              {framework.highRisk} high risk
                            </span>
                          )}
                          <span className="text-cyan-400 font-mono">
                            {framework.implemented}/{framework.total}
                          </span>
                        </div>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${framework.percentage}%` }}
                          transition={{ duration: 1, delay: 0.5 }}
                        />
                      </div>
                      <div className="text-right text-sm text-slate-400 mt-1">
                        {framework.percentage}% complete
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Recent Activity */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Card variant="glassmorphism">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <Activity className="w-5 h-5 text-cyan-400" />
                    Recent Alerts
                  </h3>
                </div>
                
                <div className="space-y-4">
                  {recentNotifications.length > 0 ? (
                    recentNotifications.map((notification) => (
                      <div key={notification.id} className="flex items-start gap-3 p-3 bg-slate-800/50 rounded-lg">
                        <div className={`p-1 rounded-full ${
                          notification.priority === 'urgent' ? 'bg-red-500/20' :
                          notification.priority === 'high' ? 'bg-yellow-500/20' :
                          'bg-cyan-500/20'
                        }`}>
                          <div className={`w-2 h-2 rounded-full ${
                            notification.priority === 'urgent' ? 'bg-red-400' :
                            notification.priority === 'high' ? 'bg-yellow-400' :
                            'bg-cyan-400'
                          }`} />
                        </div>
                        <div className="flex-1">
                          <div className="text-white text-sm font-medium mb-1">
                            {notification.title}
                          </div>
                          <div className="text-slate-400 text-xs">
                            {new Date(notification.created_at).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-3" />
                      <p className="text-slate-400">No recent alerts</p>
                      <p className="text-slate-500 text-sm">Your security posture is looking good!</p>
                    </div>
                  )}
                </div>
              </Card>
            </motion.div>
          </div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-8"
        >
          <Card variant="neural">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Zap className="w-5 h-5 text-cyan-400" />
              Quick Actions
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="cyberpunk" className="justify-start p-4 h-auto">
                <div className="flex items-center gap-3">
                  <Target className="w-5 h-5 text-cyan-400" />
                  <div className="text-left">
                    <div className="font-semibold">Run Gap Analysis</div>
                    <div className="text-sm text-slate-400">Identify compliance gaps</div>
                  </div>
                </div>
              </Button>
              
              <Button variant="cyberpunk" className="justify-start p-4 h-auto">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-purple-400" />
                  <div className="text-left">
                    <div className="font-semibold">Generate Report</div>
                    <div className="text-sm text-slate-400">Export compliance status</div>
                  </div>
                </div>
              </Button>
              
              <Button variant="cyberpunk" className="justify-start p-4 h-auto">
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-green-400" />
                  <div className="text-left">
                    <div className="font-semibold">Schedule Review</div>
                    <div className="text-sm text-slate-400">Book security assessment</div>
                  </div>
                </div>
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};