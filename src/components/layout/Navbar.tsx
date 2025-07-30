import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, 
  Menu, 
  X, 
  Bell, 
  User, 
  LogOut, 
  Settings,
  MessageSquare,
  FileText,
  BarChart3,
  Users
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useNotifications } from '../../hooks/useNotifications';
import { Button } from '../ui/Button';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, company, signOut } = useAuth();
  const { unreadCount } = useNotifications();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const publicNavItems = [
    { name: 'Features', href: '/features' },
    { name: 'Solutions', href: '/solutions' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' }
  ];

  const protectedNavItems = [
    { name: 'Dashboard', href: '/dashboard', icon: BarChart3 },
    { name: 'Ask CISO AI', href: '/chat', icon: MessageSquare },
    { name: 'Documents', href: '/documents', icon: FileText },
    { name: 'Compliance', href: '/compliance', icon: Shield },
    { name: 'Team', href: '/team', icon: Users }
  ];

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-xl border-b border-cyan-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <Shield className="w-8 h-8 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
              <div className="absolute inset-0 bg-cyan-400/20 blur-xl rounded-full group-hover:bg-cyan-300/30 transition-colors" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              AskCiso.AI
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {user ? (
              // Protected Navigation
              <>
                {protectedNavItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive(item.href)
                        ? 'text-cyan-400 bg-cyan-500/10 border border-cyan-500/30'
                        : 'text-slate-300 hover:text-cyan-300 hover:bg-slate-800/50'
                    }`}
                  >
                    <item.icon size={16} />
                    {item.name}
                  </Link>
                ))}
              </>
            ) : (
              // Public Navigation
              <>
                {publicNavItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`text-sm font-medium transition-colors ${
                      isActive(item.href)
                        ? 'text-cyan-400'
                        : 'text-slate-300 hover:text-cyan-300'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </>
            )}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            {user ? (
              // Authenticated User Menu
              <>
                {/* Notifications */}
                <Button
                  variant="glassmorphism"
                  size="sm"
                  icon={Bell}
                  className="relative"
                  onClick={() => navigate('/notifications')}
                >
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </Button>

                {/* Profile Dropdown */}
                <div className="relative">
                  <Button
                    variant="glassmorphism"
                    size="sm"
                    icon={User}
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                  >
                    {user.full_name?.split(' ')[0] || 'User'}
                  </Button>
                  
                  <AnimatePresence>
                    {isProfileOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute right-0 mt-2 w-56 bg-slate-800 border border-slate-700 rounded-lg shadow-xl"
                      >
                        <div className="p-4 border-b border-slate-700">
                          <p className="font-semibold text-white">{user.full_name}</p>
                          <p className="text-sm text-slate-400">{user.email}</p>
                          {company && (
                            <p className="text-xs text-cyan-400 mt-1">{company.name}</p>
                          )}
                        </div>
                        <div className="p-2">
                          <button
                            onClick={() => { navigate('/profile'); setIsProfileOpen(false); }}
                            className="flex items-center gap-2 w-full px-3 py-2 text-left text-slate-300 hover:bg-slate-700 rounded-md"
                          >
                            <Settings size={16} />
                            Profile Settings
                          </button>
                          <button
                            onClick={handleSignOut}
                            className="flex items-center gap-2 w-full px-3 py-2 text-left text-red-400 hover:bg-slate-700 rounded-md"
                          >
                            <LogOut size={16} />
                            Sign Out
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            ) : (
              // Public User Actions
              <div className="flex items-center gap-3">
                <Link to="/login">
                  <Button variant="secondary" size="sm">
                    Sign In
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="primary" size="sm">
                    Get Started
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="glassmorphism"
              size="sm"
              icon={isMenuOpen ? X : Menu}
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            />
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-slate-700 mt-4 pt-4 pb-6"
            >
              <div className="flex flex-col gap-2">
                {(user ? protectedNavItems : publicNavItems).map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive(item.href)
                        ? 'text-cyan-400 bg-cyan-500/10'
                        : 'text-slate-300 hover:text-cyan-300 hover:bg-slate-800/50'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {'icon' in item && <item.icon size={16} />}
                    {item.name}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};