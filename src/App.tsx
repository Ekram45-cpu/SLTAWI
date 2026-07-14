/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomeView from './components/HomeView';
import AboutView from './components/AboutView';
import ServicesView from './components/ServicesView';
import PortfolioView from './components/PortfolioView';
import TeamView from './components/TeamView';
import TestimonialsView from './components/TestimonialsView';
import ContactView from './components/ContactView';
import MenuView from './components/MenuView';
import AdminView from './components/AdminView';
import { User, ServiceItem } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  // Authentication States
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('siltawi_token'));
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('siltawi_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Check login validation with backend on load
  useEffect(() => {
    const verifyToken = async () => {
      if (!token) return;
      try {
        const res = await fetch('/api/auth/me', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!res.ok) {
          handleLogout();
        }
      } catch (err) {
        console.error('Session verification error:', err);
      }
    };
    verifyToken();
  }, [token]);

  const handleLoginSuccess = (newToken: string, user: User) => {
    setToken(newToken);
    setCurrentUser(user);
    localStorage.setItem('siltawi_token', newToken);
    localStorage.setItem('siltawi_user', JSON.stringify(user));
  };

  const handleLogout = () => {
    setToken(null);
    setCurrentUser(null);
    localStorage.removeItem('siltawi_token');
    localStorage.removeItem('siltawi_user');
    fetch('/api/auth/logout', {
      method: 'POST',
      headers: token ? { 'Authorization': `Bearer ${token}` } : {}
    }).catch(err => console.error('Silent logout error:', err));
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col justify-between">
      {/* Sticky Header Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isAdminLoggedIn={!!token}
        onLogout={handleLogout}
      />

      {/* Primary Dynamic Main Views Router */}
      <main className="flex-grow">
        {activeTab === 'home' && (
          <HomeView
            setActiveTab={setActiveTab}
            setSelectedService={setSelectedService}
          />
        )}
        {activeTab === 'about' && (
          <AboutView
            setActiveTab={setActiveTab}
          />
        )}
        {activeTab === 'services' && (
          <ServicesView
            setActiveTab={setActiveTab}
            selectedService={selectedService}
            setSelectedService={setSelectedService}
          />
        )}
        {activeTab === 'portfolio' && (
          <PortfolioView
            setActiveTab={setActiveTab}
          />
        )}
        {activeTab === 'team' && (
          <TeamView />
        )}
        {activeTab === 'testimonials' && (
          <TestimonialsView />
        )}
        {activeTab === 'contact' && (
          <ContactView />
        )}
        {activeTab === 'menu' && (
          <MenuView />
        )}
        {activeTab === 'admin' && (
          <AdminView
            token={token}
            currentUser={currentUser}
            onLoginSuccess={handleLoginSuccess}
            onLogout={handleLogout}
          />
        )}
      </main>

      {/* Global Footer Navigation */}
      <Footer setActiveTab={setActiveTab} />
    </div>
  );
}
