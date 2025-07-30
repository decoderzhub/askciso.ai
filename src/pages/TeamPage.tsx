import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  UserPlus, 
  Mail, 
  Shield, 
  Crown, 
  Eye, 
  Settings, 
  MoreVertical,
  Search,
  Filter,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import type { TeamMember, User } from '../types';

export const TeamPage: React.FC = () => {
  const { user, company } = useAuth();
  const [teamMembers, setTeamMembers] = useState<(TeamMember & { user: User })[]>([]);
  const [loading, setLoading] = useState(true);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('all');
  const [inviteForm, setInviteForm] = useState({
    email: '',
    role: 'member' as const,
    permissions: [] as string[]
  });

  const roles = [
    { value: 'all', label: 'All Roles' },
    { value: 'owner', label: 'Owner', icon: Crown, color: 'text-yellow-400' },
    { value: 'admin', label: 'Admin', icon: Shield, color: 'text-red-400' },
    { value: 'member', label: 'Member', icon: Users, color: 'text-cyan-400' },
    { value: 'viewer', label: 'Viewer', icon: Eye, color: 'text-slate-400' }
  ];

  const permissions = [
    'manage_team',
    'manage_documents',
    'manage_compliance',
    'view_reports',
    'export_data'
  ];

  useEffect(() => {
    if (company?.id) {
      loadTeamMembers();
    }
  }, [company?.id]);

  const loadTeamMembers = async () => {
    try {
      const { data, error } = await supabase
        .from('team_members')
        .select(`
          *,
          user:user_profiles(*)
        `)
        .eq('company_id', company!.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTeamMembers(data || []);
    } catch (error) {
      console.error('Error loading team members:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    // Implementation for sending team invitation
    console.log('Inviting user:', inviteForm);
    setShowInviteModal(false);
    setInviteForm({ email: '', role: 'member', permissions: [] });
  };

  const filteredMembers = teamMembers.filter(member => {
    const matchesSearch = member.user.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === 'all' || member.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  const getRoleIcon = (role: string) => {
    const roleConfig = roles.find(r => r.value === role);
    if (!roleConfig) return Users;
    return roleConfig.icon;
  };

  const getRoleColor = (role: string) => {
    const roleConfig = roles.find(r => r.value === role);
    return roleConfig?.color || 'text-slate-400';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'pending': return <Clock className="w-4 h-4 text-yellow-400" />;
      case 'inactive': return <AlertCircle className="w-4 h-4 text-red-400" />;
      default: return <Clock className="w-4 h-4 text-slate-400" />;
    }
  };

  const InviteModal = () => (
    <AnimatePresence>
      {showInviteModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowInviteModal(false)}
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
                <h3 className="text-xl font-bold text-white">Invite Team Member</h3>
                <Button
                  variant="glassmorphism"
                  size="sm"
                  onClick={() => setShowInviteModal(false)}
                >
                  ×
                </Button>
              </div>
              
              <form onSubmit={handleInvite} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={inviteForm.email}
                    onChange={(e) => setInviteForm(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    placeholder="Enter email address"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Role
                  </label>
                  <select
                    value={inviteForm.role}
                    onChange={(e) => setInviteForm(prev => ({ ...prev, role: e.target.value as any }))}
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  >
                    {roles.slice(1).map(role => (
                      <option key={role.value} value={role.value}>
                        {role.label}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Permissions
                  </label>
                  <div className="space-y-2">
                    {permissions.map(permission => (
                      <label key={permission} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={inviteForm.permissions.includes(permission)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setInviteForm(prev => ({
                                ...prev,
                                permissions: [...prev.permissions, permission]
                              }));
                            } else {
                              setInviteForm(prev => ({
                                ...prev,
                                permissions: prev.permissions.filter(p => p !== permission)
                              }));
                            }
                          }}
                          className="w-4 h-4 rounded border-slate-600 bg-slate-800 text-cyan-500 focus:ring-cyan-500"
                        />
                        <span className="text-sm text-slate-300 capitalize">
                          {permission.replace('_', ' ')}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div className="flex gap-3 pt-4">
                  <Button type="submit" variant="primary" className="flex-1">
                    Send Invitation
                  </Button>
                  <Button 
                    type="button"
                    variant="secondary" 
                    onClick={() => setShowInviteModal(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
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
          <p className="text-slate-400">Loading team members...</p>
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
            <h1 className="text-4xl font-bold text-white mb-2">Team Management</h1>
            <p className="text-slate-400">
              Manage team members and permissions for {company?.name}
            </p>
          </div>
          <Button
            variant="primary"
            icon={UserPlus}
            onClick={() => setShowInviteModal(true)}
          >
            Invite Member
          </Button>
        </motion.div>

        {/* Team Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {roles.slice(1).map((role, index) => {
            const count = teamMembers.filter(member => member.role === role.value).length;
            const RoleIcon = role.icon;
            
            return (
              <motion.div
                key={role.value}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card variant="neural">
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`p-2 rounded-lg bg-slate-800 ${role.color}`}>
                      <RoleIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-white">{count}</div>
                      <div className="text-sm text-slate-400">{role.label}s</div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
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
                    placeholder="Search team members..."
                  />
                </div>
              </div>
              
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              >
                {roles.map(role => (
                  <option key={role.value} value={role.value}>{role.label}</option>
                ))}
              </select>
            </div>
          </Card>
        </motion.div>

        {/* Team Members */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card variant="cyberpunk">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Users className="w-5 h-5 text-cyan-400" />
                Team Members ({filteredMembers.length})
              </h3>
            </div>
            
            <div className="space-y-4">
              {filteredMembers.map((member, index) => {
                const RoleIcon = getRoleIcon(member.role);
                
                return (
                  <motion.div
                    key={member.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center justify-between p-4 bg-slate-800/30 rounded-lg border border-slate-700 hover:border-cyan-500/30 transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center text-white font-semibold">
                        {member.user.full_name?.charAt(0) || member.user.email.charAt(0).toUpperCase()}
                      </div>
                      
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <h4 className="text-white font-medium">
                            {member.user.full_name || 'Unnamed User'}
                          </h4>
                          <div className="flex items-center gap-1">
                            <RoleIcon className={`w-4 h-4 ${getRoleColor(member.role)}`} />
                            <span className={`text-sm capitalize ${getRoleColor(member.role)}`}>
                              {member.role}
                            </span>
                          </div>
                          {getStatusIcon(member.status)}
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm text-slate-400">
                          <span>{member.user.email}</span>
                          {member.user.compliance_role && (
                            <span className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded text-xs">
                              {member.user.compliance_role}
                            </span>
                          )}
                          <span>Joined {new Date(member.created_at).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button variant="glassmorphism" size="sm" icon={Settings}>
                        Manage
                      </Button>
                      <Button variant="glassmorphism" size="sm" icon={MoreVertical}>
                        <span className="sr-only">More options</span>
                      </Button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
            
            {filteredMembers.length === 0 && (
              <div className="text-center py-12">
                <Users className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">No team members found</h3>
                <p className="text-slate-400 mb-6">
                  {searchTerm || selectedRole !== 'all'
                    ? 'Try adjusting your search criteria'
                    : 'Invite your first team member to get started'
                  }
                </p>
                {!searchTerm && selectedRole === 'all' && (
                  <Button
                    variant="primary"
                    icon={UserPlus}
                    onClick={() => setShowInviteModal(true)}
                  >
                    Invite First Member
                  </Button>
                )}
              </div>
            )}
          </Card>
        </motion.div>

        <InviteModal />
      </div>
    </div>
  );
};