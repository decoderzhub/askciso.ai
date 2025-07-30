import React, { createContext, useContext, useEffect, useState } from 'react';
import { User as SupabaseUser, Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import type { User, Company, TeamMember } from '../types';

interface AuthContextType {
  user: User | null;
  company: Company | null;
  teamRole: TeamMember | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, userData: Partial<User>) => Promise<any>;
  signIn: (email: string, password: string) => Promise<any>;
  signOut: () => Promise<void>;
  loadUserProfile: (userId: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [company, setCompany] = useState<Company | null>(null);
  const [teamRole, setTeamRole] = useState<TeamMember | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  const loadUserProfile = async (userId: string) => {
    try {
      // Load user profile first
      const { data: profile, error: profileError } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (profileError) throw profileError;

      // Load company separately if user has company_id
      let companyData = null;
      if (profile?.company_id) {
        const { data: company } = await supabase
          .from('company_profiles')
          .select('*')
          .eq('id', profile.company_id)
          .single();
        companyData = company;
      }

      // Load team role separately if user has company_id
      let teamRoleData = null;
      if (profile?.company_id) {
        const { data: teamRole } = await supabase
          .from('team_members')
          .select('*')
          .eq('user_id', userId)
          .single();
        teamRoleData = teamRole;
      }

      setUser(profile);
      setCompany(companyData);
      setTeamRole(teamRoleData);
    } catch (error) {
      console.error('Error loading user profile:', error);
      // Set basic user info even if profile loading fails
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser({
          id: user.id,
          email: user.email || '',
          full_name: user.user_metadata?.full_name,
          company_id: null,
          compliance_role: null,
          security_clearance: null,
          mfa_enabled: false
        });
      }
    }
  };

  const signUp = async (email: string, password: string, userData: Partial<User>) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData
      }
    });

    if (data.user && !error) {
      // Create user profile
      await supabase.from('user_profiles').insert({
        id: data.user.id,
        email: data.user.email,
        full_name: userData.full_name,
        compliance_role: userData.compliance_role,
        mfa_enabled: false
      });
    }

    return { data, error };
  };

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (data.user && !error) {
      // Profile will be loaded by the auth state change listener
      return { data, error };
    }
    
    return { data, error };
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      setUser(null);
      setCompany(null);
      setTeamRole(null);
      setSession(null);
    }
  };

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user) {
        loadUserProfile(session.user.id);
      }
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        if (session?.user) {
          loadUserProfile(session.user.id).catch(console.error);
        } else {
          setUser(null);
          setCompany(null);
          setTeamRole(null);
        }
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const value = {
    user,
    company,
    teamRole,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    loadUserProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};