import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { CompanyProvider } from './contexts/CompanyContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ProtectedRoute } from './components/routes/ProtectedRoute';

// Pages
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';
import { ChatPage } from './pages/chat/ChatPage';
import { DashboardPage } from './pages/DashboardPage';
import { DocumentsPage } from './pages/DocumentsPage';
import { CompliancePage } from './pages/CompliancePage';
import { TeamPage } from './pages/TeamPage';
import { FeaturesPage } from './pages/FeaturesPage';
import { SolutionsPage } from './pages/SolutionsPage';
import { PricingPage } from './pages/PricingPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';

function App() {
  return (
    <AuthProvider>
      <CompanyProvider>
        <Router>
          <div className="min-h-screen bg-slate-900 text-white">
            <Navbar />
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              
              {/* Protected Routes */}
              <Route 
                path="/chat" 
                element={
                  <ProtectedRoute>
                    <ChatPage />
                  </ProtectedRoute>
                } 
              />
              
              {/* Placeholder routes for future implementation */}
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/documents" 
                element={
                  <ProtectedRoute>
                    <DocumentsPage />
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/compliance" 
                element={
                  <ProtectedRoute>
                    <CompliancePage />
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/team" 
                element={
                  <ProtectedRoute>
                    <TeamPage />
                  </ProtectedRoute>
                } 
              />

              {/* Public content pages */}
              <Route 
                path="/features" 
                element={<FeaturesPage />} 
              />
              
              <Route 
                path="/solutions" 
                element={<SolutionsPage />} 
              />
              
              <Route 
                path="/pricing" 
                element={<PricingPage />} 
              />
              
              <Route 
                path="/about" 
                element={<AboutPage />} 
              />
              
              <Route 
                path="/contact" 
                element={<ContactPage />} 
              />
            </Routes>
            <Footer />
          </div>
        </Router>
      </CompanyProvider>
    </AuthProvider>
  );
}

export default App;