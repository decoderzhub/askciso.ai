import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Linkedin, Twitter, Github, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-8 h-8 text-cyan-400" />
              <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                vCISO AI
              </span>
            </div>
            <p className="text-slate-400 mb-6 max-w-md">
              Neural Security Intelligence for the Modern Enterprise. AI-powered Virtual CISO 
              that adapts to your environment and thinks like your security team.
            </p>
            <div className="flex gap-4">
              <a href="https://linkedin.com" className="text-slate-400 hover:text-cyan-400 transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="https://twitter.com" className="text-slate-400 hover:text-cyan-400 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="https://github.com" className="text-slate-400 hover:text-cyan-400 transition-colors">
                <Github size={20} />
              </a>
              <a href="mailto:contact@vciso-ai.com" className="text-slate-400 hover:text-cyan-400 transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              <li><Link to="/features" className="text-slate-400 hover:text-cyan-400 transition-colors">Features</Link></li>
              <li><Link to="/solutions" className="text-slate-400 hover:text-cyan-400 transition-colors">Solutions</Link></li>
              <li><Link to="/pricing" className="text-slate-400 hover:text-cyan-400 transition-colors">Pricing</Link></li>
              <li><Link to="/integrations" className="text-slate-400 hover:text-cyan-400 transition-colors">Integrations</Link></li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-slate-400 hover:text-cyan-400 transition-colors">About</Link></li>
              <li><Link to="/contact" className="text-slate-400 hover:text-cyan-400 transition-colors">Contact</Link></li>
              <li><Link to="/careers" className="text-slate-400 hover:text-cyan-400 transition-colors">Careers</Link></li>
              <li><Link to="/blog" className="text-slate-400 hover:text-cyan-400 transition-colors">Blog</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-400 text-sm">
            © 2025 vCISO AI. All rights reserved.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-slate-400 hover:text-cyan-400 text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-slate-400 hover:text-cyan-400 text-sm transition-colors">
              Terms of Service
            </Link>
            <Link to="/security" className="text-slate-400 hover:text-cyan-400 text-sm transition-colors">
              Security
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};