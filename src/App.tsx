/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomeView from './components/HomeView';
import AboutView from './components/AboutView';
import ServicesView from './components/ServicesView';
import PortfolioView from './components/PortfolioView';
import TeamView from './components/TeamView';
import TestimonialsView from './components/TestimonialsView';
import ContactView from './components/ContactView';
import { ServiceItem } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col justify-between">
      {/* Sticky Header Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
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
      </main>

      {/* Global Footer Navigation */}
      <Footer setActiveTab={setActiveTab} />
    </div>
  );
}
