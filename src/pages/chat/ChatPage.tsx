import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, 
  Bot, 
  User, 
  MessageSquare, 
  Plus, 
  Settings, 
  Share2,
  Download,
  Copy,
  Shield,
  BookOpen,
  AlertTriangle
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useCompanyContext } from '../../contexts/CompanyContext';
import { supabase, API_CONFIG } from '../../lib/supabase';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Terminal, TerminalLine } from '../../components/ui/Terminal';
import type { Conversation, Message } from '../../types';

export const ChatPage: React.FC = () => {
  const { user, company } = useAuth();
  const { companyFrameworks, companyDocuments, complianceStatus } = useCompanyContext();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversation, setCurrentConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [debugInfo, setDebugInfo] = useState('');
  const [error, setError] = useState('');

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (user?.id) {
      loadConversations();
    }
  }, [user?.id]);

  const loadConversations = async () => {
    if (!user?.id) return;

    const { data, error } = await supabase
      .from('conversations')
      .select(`
        *,
        messages (*)
      `)
      .eq('user_id', user.id)
      .order('updated_at', { ascending: false });

    if (data) {
      setConversations(data);
      if (data.length > 0 && !currentConversation) {
        setCurrentConversation(data[0]);
        setMessages(data[0].messages || []);
      }
    }
  };

  const createNewConversation = async () => {
    if (!user?.id || !company?.id) return;

    const { data, error } = await supabase
      .from('conversations')
      .insert({
        user_id: user.id,
        company_id: company.id,
        title: 'New Conversation',
        category: 'general',
        framework_context: companyFrameworks
      })
      .select()
      .single();

    if (data) {
      setConversations(prev => [data, ...prev]);
      setCurrentConversation(data);
      setMessages([]);
    }
  };

  const buildAIContext = () => ({
    company_context: {
      industry: company?.industry,
      frameworks: companyFrameworks,
      relevant_documents: companyDocuments.map(doc => ({
        title: doc.title,
        summary: doc.ai_summary,
        type: doc.document_type
      }))
    },
    compliance_status: complianceStatus,
    user_role: user?.compliance_role
  });

  const sendMessage = async () => {
    console.log('sendMessage called');
    setDebugInfo('sendMessage function called');
    
    // Debug all the validation conditions
    console.log('Validation check:');
    console.log('- inputMessage.trim():', inputMessage.trim());
    console.log('- user?.id:', user?.id);
    console.log('- company?.id:', company?.id);
    console.log('- loading:', loading);
    console.log('- user object:', user);
    console.log('- company object:', company);
    
    if (!inputMessage.trim() || !user?.id || !company?.id || loading) {
      console.log('Validation failed - exiting early');
      return;
    }

    console.log('Validation passed, proceeding with message send');
    console.log('Input message:', inputMessage);
    console.log('User ID:', user?.id);
    console.log('Company ID:', company?.id);
    
    const userMessage = inputMessage.trim();
    setInputMessage('');
    setLoading(true);

    // Add user message to UI immediately
    const tempUserMessage: Message = {
      id: `temp-${Date.now()}`,
      conversation_id: currentConversation?.id || 'temp',
      user_id: user.id,
      role: 'user',
      content: userMessage,
      framework_references: [],
      source_documents: [],
      created_at: new Date().toISOString()
    };
    setMessages(prev => [...prev, tempUserMessage]);

    // Create conversation if none exists
    let conversationId = currentConversation?.id;
    if (!conversationId) {
      console.log('Creating new conversation');
      const { data } = await supabase
        .from('conversations')
        .insert({
          user_id: user.id,
          company_id: company.id,
          title: userMessage.slice(0, 50) + '...',
          category: 'general',
          framework_context: companyFrameworks
        })
        .select()
        .single();
      
      if (data) {
        console.log('New conversation created:', data.id);
        conversationId = data.id;
        setCurrentConversation(data);
        setConversations(prev => [data, ...prev]);
      } else {
        console.error('Failed to create new conversation');
        setLoading(false);
        return;
      }
    }

    // Ensure we have a valid conversation ID before proceeding
    if (!conversationId) {
      console.error('No valid conversation ID available');
      setLoading(false);
      return;
    }

    try {
      console.log('Saving user message to database');
      // Save user message to database
      await supabase.from('messages').insert({
        conversation_id: conversationId,
        user_id: user.id,
        role: 'user',
        content: userMessage
      });

      // Define API URL before first usage
      const apiUrl = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CHAT}`;

      // Debug the token and API call
      const session = await supabase.auth.getSession();
      const token = session.data.session?.access_token;
      console.log('Access Token:', token ? 'Token exists' : 'No token found');
      console.log('Session data:', session.data);
      
      console.log('Final conversationId:', conversationId);
      console.log('About to call fetch...');
      console.log('API URL:', apiUrl);
      console.log('Message payload:', {
        message: userMessage,
        conversation_id: conversationId,
        user_id: user.id,
        company_id: company.id,
        context: buildAIContext()
      });

      console.log('Calling fetch NOW...');
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token || ''}`
        },
        body: JSON.stringify({
          message: userMessage,
          conversation_id: conversationId,
          user_id: user.id,
          company_id: company.id,
          context: buildAIContext()
        })
      });

      console.log('Fetch completed, response received');
      console.log('Response status:', response.status);
      
      if (!response.ok) {
        console.error('API request failed with status:', response.status);
        const errorText = await response.text();
        console.error('API Error:', response.status, errorText);
        throw new Error(`API Error: ${response.status} - ${errorText}`);
      }

      const result = await response.json();
      console.log('API Response:', result);

      // Add AI response to UI
      console.log('Adding AI response to UI');
      const aiMessage: Message = {
        id: `ai-${Date.now()}`,
        conversation_id: conversationId!,
        user_id: user.id,
        role: 'assistant',
        content: result.response,
        ai_confidence: result.confidence,
        framework_references: result.referenced_frameworks || [],
        source_documents: result.referenced_documents || [],
        created_at: new Date().toISOString()
      };
      setMessages(prev => [...prev, aiMessage]);

      // Save AI message to database
      console.log('Saving AI message to database');
      await supabase.from('messages').insert({
        conversation_id: conversationId,
        user_id: user.id,
        role: 'assistant',
        content: result.response,
        ai_confidence: result.confidence,
        framework_references: result.referenced_frameworks || [],
        source_documents: result.referenced_documents || []
      });

    } catch (error) {
      console.error('Error sending message:', error);
      setDebugInfo(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
      
      // Add error message
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        conversation_id: conversationId!,
        user_id: user.id,
        role: 'assistant',
        content: `I apologize, but I'm experiencing connection issues: ${error instanceof Error ? error.message : 'Unknown error'}. Please try again in a moment.`,
        framework_references: [],
        source_documents: [],
        created_at: new Date().toISOString()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
      console.log('sendMessage completed');
    }
  };

  const suggestedQuestions = [
    'Help me create a NIST Cybersecurity Framework implementation plan',
    'What are the key SOC2 Type II controls I should focus on?',
    'Analyze my current security policies for compliance gaps',
    'Create an incident response playbook for my organization',
    'How do I conduct a third-party risk assessment?'
  ];

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted');
    if (inputMessage.trim() && !loading) {
      sendMessage();
    }
  };

  const CompanyContextPanel = () => (
    <Card variant="cyberpunk" className="mb-6">
      <div className="flex items-center gap-3 mb-4">
        <Shield className="w-5 h-5 text-cyan-400" />
        <h3 className="font-semibold text-white">Company Context</h3>
      </div>
      
      <div className="space-y-3 text-sm">
        <div>
          <span className="text-slate-400">Organization:</span>
          <span className="text-white ml-2">{company?.name}</span>
        </div>
        
        <div>
          <span className="text-slate-400">Active Frameworks:</span>
          <div className="flex flex-wrap gap-1 mt-1">
            {companyFrameworks.map(framework => (
              <span key={framework} className="px-2 py-1 bg-cyan-500/20 text-cyan-400 text-xs rounded">
                {framework}
              </span>
            ))}
          </div>
        </div>

        <div>
          <span className="text-slate-400">Documents Available:</span>
          <span className="text-cyan-400 ml-2">{companyDocuments.length}</span>
        </div>

        <div>
          <span className="text-slate-400">Role:</span>
          <span className="text-purple-400 ml-2">{user?.compliance_role}</span>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/10 to-slate-900 pt-16">
      <div className="flex h-[calc(100vh-4rem)]">
        {/* Sidebar */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 320, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              className="bg-slate-900/50 border-r border-slate-700 flex flex-col"
            >
              <div className="p-4 border-b border-slate-700">
                <Button
                  variant="primary"
                  size="sm"
                  icon={Plus}
                  className="w-full"
                  onClick={createNewConversation}
                >
                  New Conversation
                </Button>
              </div>

              <div className="flex-1 overflow-y-auto p-4">
                <CompanyContextPanel />

                <div className="space-y-2">
                  <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wide">
                    Recent Conversations
                  </h3>
                  {conversations.map(conversation => (
                    <button
                      key={conversation.id}
                      onClick={() => {
                        setCurrentConversation(conversation);
                        setMessages(conversation.messages || []);
                      }}
                      className={`w-full text-left p-3 rounded-lg transition-all ${
                        currentConversation?.id === conversation.id
                          ? 'bg-cyan-500/20 border border-cyan-500/30 text-cyan-300'
                          : 'bg-slate-800/50 hover:bg-slate-700/50 text-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <MessageSquare className="w-4 h-4" />
                        <span className="text-sm font-medium truncate">
                          {conversation.title || 'Untitled Conversation'}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400">
                        {new Date(conversation.created_at).toLocaleDateString()}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="bg-slate-900/50 border-b border-slate-700 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                variant="glassmorphism"
                size="sm"
                icon={MessageSquare}
                onClick={() => setSidebarOpen(!sidebarOpen)}
              />
              <div>
                <h1 className="text-xl font-bold text-white">Ask CISO AI</h1>
                <p className="text-sm text-slate-400">
                  AI-powered security guidance for {company?.name}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="glassmorphism" size="sm" icon={Share2} />
              <Button variant="glassmorphism" size="sm" icon={Download} />
              <Button variant="glassmorphism" size="sm" icon={Settings} />
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 pt-32">
            {messages.length === 0 ? (
              <div className="h-full flex items-center justify-center py-16">
                <div className="text-center max-w-2xl">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                  >
                    <div className="mb-8 mt-8">
                      <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center">
                        <Bot className="w-12 h-12 text-white" />
                      </div>
                      <h2 className="text-3xl font-bold text-white mb-4">
                        Welcome to CISO AI Terminal
                      </h2>
                      <p className="text-slate-300 text-lg mb-8">
                        I'm your AI-powered Virtual CISO, ready to help with cybersecurity, 
                        compliance, and risk management for {company?.name}.
                      </p>
                    </div>

                    <div className="mb-8">
                      <Terminal className="max-w-lg mx-auto">
                        <TerminalLine type="success" delay={500}>
                          CISO AI Terminal initialized for {company?.name}
                        </TerminalLine>
                        <TerminalLine type="output" delay={1000}>
                          Loaded {companyFrameworks.length} compliance frameworks
                        </TerminalLine>
                        <TerminalLine type="output" delay={1500}>
                          Analyzing {companyDocuments.length} security documents
                        </TerminalLine>
                        <TerminalLine type="success" delay={2000}>
                          Ready to assist with security guidance
                        </TerminalLine>
                      </Terminal>
                    </div>

                    <div className="grid grid-cols-1 gap-3">
                      <h3 className="text-lg font-semibold text-white mb-2">Try asking:</h3>
                      {suggestedQuestions.map((question, index) => (
                        <motion.button
                          key={question}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          onClick={() => setInputMessage(question)}
                          className="text-left p-4 bg-slate-800/50 hover:bg-slate-700/50 rounded-lg border border-slate-700 hover:border-cyan-500/30 transition-all text-slate-300 hover:text-cyan-300"
                        >
                          <span className="text-cyan-400 mr-2">→</span>
                          {question}
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>
            ) : (
              <div className="space-y-6 max-w-4xl mx-auto">
                {messages.map((message, index) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`flex gap-4 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {message.role === 'assistant' && (
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                        <Bot className="w-5 h-5 text-white" />
                      </div>
                    )}
                    
                    <div className={`flex-1 max-w-3xl ${message.role === 'user' ? 'flex justify-end' : ''}`}>
                      <Card 
                        variant={message.role === 'user' ? 'cyberpunk' : 'glassmorphism'} 
                        className={`${message.role === 'user' ? 'bg-cyan-600/20 border-cyan-500/30' : ''}`}
                      >
                        <div className="prose prose-invert max-w-none">
                          <div className="whitespace-pre-wrap text-slate-200">
                            {message.content}
                          </div>
                        </div>

                        {message.role === 'assistant' && (
                          <div className="mt-4 pt-4 border-t border-slate-700">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4 text-xs text-slate-400">
                                {message.ai_confidence && (
                                  <div className="flex items-center gap-1">
                                    <span>Confidence:</span>
                                    <span className="text-cyan-400">
                                      {Math.round(message.ai_confidence * 100)}%
                                    </span>
                                  </div>
                                )}
                                {message.framework_references.length > 0 && (
                                  <div className="flex items-center gap-1">
                                    <BookOpen className="w-3 h-3" />
                                    <span>References: {message.framework_references.join(', ')}</span>
                                  </div>
                                )}
                              </div>
                              
                              <div className="flex gap-2">
                                <Button variant="glassmorphism" size="sm" icon={Copy}>
                                  Copy
                                </Button>
                                <Button variant="glassmorphism" size="sm" icon={Share2}>
                                  Share
                                </Button>
                              </div>
                            </div>
                          </div>
                        )}
                      </Card>
                    </div>

                    {message.role === 'user' && (
                      <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center flex-shrink-0">
                        <User className="w-5 h-5 text-slate-300" />
                      </div>
                    )}
                  </motion.div>
                ))}
                
                {loading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex gap-4"
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                    <Card variant="glassmorphism">
                      <div className="flex items-center gap-2 text-slate-400">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse delay-75" />
                        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse delay-150" />
                        <span className="ml-2">AI is analyzing your request...</span>
                      </div>
                    </Card>
                  </motion.div>
                )}
                
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="border-t border-slate-700 p-4 bg-slate-900/50">
            <div className="max-w-4xl mx-auto">
              {debugInfo && (
                <div className="mb-2 p-2 bg-yellow-500/20 text-yellow-300 text-xs rounded">{debugInfo}</div>
              )}
              <form 
                onSubmit={handleFormSubmit}
                className="flex gap-3 items-end"
              >
                <div className="flex-1">
                  <textarea
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Ask me about cybersecurity, compliance, risk assessment, or any security-related questions..."
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all resize-none"
                    rows={3}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        console.log('Enter key pressed, preventing default and sending message');
                        e.preventDefault();
                        sendMessage();
                      }
                    }}
                  />
                </div>
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  loading={loading}
                  disabled={!inputMessage.trim() || loading}
                  icon={Send}
                >
                  Send
                </Button>
              </form>
              
              <p className="text-xs text-slate-500 mt-2 text-center">
                AI responses are generated based on your company context and industry best practices. 
                Always verify critical security decisions with qualified professionals.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};