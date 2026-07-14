import { useState } from 'react';
import { servicesData } from '../data/agencyData';
import { ServiceItem } from '../types';
import { Megaphone, Code, Palette, Video, Search, CheckCircle2, ArrowRight, X } from 'lucide-react';

interface ServicesViewProps {
  setActiveTab: (tab: string) => void;
  selectedService: ServiceItem | null;
  setSelectedService: (service: ServiceItem | null) => void;
}

export default function ServicesView({ setActiveTab, selectedService, setSelectedService }: ServicesViewProps) {
  const [activeDetail, setActiveDetail] = useState<ServiceItem | null>(selectedService || servicesData[0]);

  const getIcon = (name: string, css: string) => {
    switch (name) {
      case 'Megaphone': return <Megaphone className={css} />;
      case 'Code': return <Code className={css} />;
      case 'Palette': return <Palette className={css} />;
      case 'Video': return <Video className={css} />;
      case 'Search': return <Search className={css} />;
      default: return <Megaphone className={css} />;
    }
  };

  const handleSelectService = (service: ServiceItem) => {
    setActiveDetail(service);
    setSelectedService(service);
    // Smooth scroll to the details tab
    const el = document.getElementById('service-details-anchor');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div id="services-view" className="space-y-24 pt-32 pb-20">
      {/* 1. SERVICES DIRECTORY */}
      <section id="services-directory-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <h2 className="text-xs font-bold tracking-widest text-orange-500 uppercase">What We Offer</h2>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-sans font-extrabold text-slate-950 tracking-tight leading-none">
            Tailored Digital Capabilities
          </h1>
          <div className="h-1 w-12 bg-orange-500 mx-auto rounded-full"></div>
          <p className="text-slate-600 text-sm sm:text-base">
            Select a service to explore our comprehensive implementation details, features, and case studies.
          </p>
        </div>

        {/* Dynamic Service Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {servicesData.map((service) => {
            const isSelected = activeDetail?.id === service.id;
            return (
              <div
                key={service.id}
                id={`service-select-${service.id}`}
                onClick={() => handleSelectService(service)}
                className={`cursor-pointer p-6 rounded-2xl border text-center transition-all flex flex-col items-center gap-4 ${
                  isSelected
                    ? 'bg-slate-950 text-white border-slate-950 shadow-lg scale-102'
                    : 'bg-white text-slate-800 border-slate-100 hover:border-slate-200 shadow-sm hover:scale-101'
                }`}
              >
                <div className={`p-4.5 rounded-xl ${isSelected ? 'bg-orange-500 text-white' : 'bg-orange-50 text-orange-500'}`}>
                  {getIcon(service.iconName, 'w-7 h-7')}
                </div>
                <h3 className="font-bold text-sm tracking-tight">{service.title}</h3>
                <p className={`text-xs ${isSelected ? 'text-slate-400' : 'text-slate-500'} line-clamp-2`}>
                  {service.shortDesc}
                </p>
                <span className={`text-xs font-bold mt-auto ${isSelected ? 'text-orange-400' : 'text-orange-600'}`}>
                  Explore details
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Anchor point */}
      <div id="service-details-anchor"></div>

      {/* 2. SERVICES DETAIL SECTION */}
      {activeDetail && (
        <section id="service-detail-display" className="bg-slate-50 py-16 border-y border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-md grid grid-cols-1 lg:grid-cols-12">
              
              {/* Left visual accent column */}
              <div className="lg:col-span-5 bg-slate-950 text-white p-8 sm:p-12 flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500 rounded-full filter blur-3xl opacity-20 -z-10"></div>
                
                <div className="space-y-6">
                  <div className="p-4 bg-orange-500 rounded-xl text-white inline-block">
                    {getIcon(activeDetail.iconName, 'w-8 h-8')}
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-sans font-extrabold text-white">
                    {activeDetail.title} Showcase
                  </h3>
                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                    Our {activeDetail.title.toLowerCase()} service incorporates advanced technology, high-fidelity visual assets, and metrics-driven optimization pipelines designed for East Africa.
                  </p>
                </div>

                <div className="pt-8 border-t border-slate-800 space-y-4 text-xs text-slate-400">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                    <span>100% Client satisfaction tracking</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                    <span>Transparent weekly reports</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                    <span>Custom platform optimization</span>
                  </div>
                </div>
              </div>

              {/* Right content column */}
              <div className="lg:col-span-7 p-8 sm:p-12 space-y-8">
                <div className="space-y-4">
                  <span className="text-xs font-bold text-orange-500 tracking-wider uppercase">Comprehensive Solution</span>
                  <h4 className="text-2xl font-bold text-slate-950 font-sans">{activeDetail.title}</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {activeDetail.fullDesc}
                  </p>
                </div>

                <div className="space-y-4">
                  <h5 className="font-bold text-slate-950 text-sm uppercase tracking-wide">Key Features & Deliverables:</h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {activeDetail.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-700 text-sm leading-relaxed">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Call to action inside details */}
                <div className="pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-4">
                  <button
                    onClick={() => setActiveTab('contact')}
                    className="w-full sm:w-auto px-6 py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl shadow-md transition-all text-sm flex items-center justify-center gap-2"
                  >
                    Discuss This Service <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setActiveTab('portfolio')}
                    className="w-full sm:w-auto px-6 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl transition-all text-sm"
                  >
                    View Related Case Studies
                  </button>
                </div>

              </div>
            </div>
          </div>
        </section>
      )}

      {/* 3. TECHNOLOGY STATS STACK */}
      <section id="tech-stack-showcase" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <h2 className="text-xs font-bold tracking-widest text-orange-500 uppercase">Engineered for Performance</h2>
          <h3 className="text-2xl sm:text-3xl font-sans font-extrabold text-slate-950">Our Digital Tooling Ecosystem</h3>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-6 text-center">
          {[
            { name: 'Google Ads & Analytics', desc: 'Enterprise Marketing' },
            { name: 'Meta Business Suite', desc: 'Campaign Funnels' },
            { name: 'React / Next.js', desc: 'Frontend Framework' },
            { name: 'Node.js / Express', desc: 'Backend Architecture' },
            { name: 'Tailwind CSS', desc: 'Sleek Layout' },
            { name: 'PostgreSQL / Mongo', desc: 'Secure Database' }
          ].map((tech) => (
            <div key={tech.name} className="p-5 bg-white border border-slate-100 rounded-xl shadow-sm space-y-2">
              <div className="font-bold text-slate-950 text-sm tracking-tight">{tech.name}</div>
              <div className="text-slate-500 text-xs">{tech.desc}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
