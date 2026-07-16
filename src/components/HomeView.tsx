import { useState, useEffect } from 'react';
import { ArrowRight, CheckCircle, Flame, Users, Briefcase, BarChart3, TrendingUp, Sparkles } from 'lucide-react';
import { servicesData, testimonialsData, portfolioData } from '../data/agencyData';
import { ServiceItem, TestimonialItem } from '../types';

interface HomeViewProps {
  setActiveTab: (tab: string) => void;
  setSelectedService: (service: ServiceItem | null) => void;
}

export default function HomeView({ setActiveTab, setSelectedService }: HomeViewProps) {
  // Counters for statistics
  const [stats, setStats] = useState({ projects: 0, growth: 0, experience: 0, experts: 0 });

  useEffect(() => {
    const duration = 2000; // ms
    const steps = 50;
    const stepTime = duration / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      setStats({
        projects: Math.min(Math.floor((18 / steps) * currentStep), 18),
        growth: Math.min(Math.floor((45 / steps) * currentStep), 45),
        experience: Math.min(Math.floor((3 / steps) * currentStep), 3),
        experts: Math.min(Math.floor((5 / steps) * currentStep), 5),
      });

      if (currentStep >= steps) {
        clearInterval(timer);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, []);

  const handleServiceClick = (service: ServiceItem) => {
    setSelectedService(service);
    setActiveTab('services');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div id="home-view" className="space-y-24 pb-20">
      {/* 1. HERO SECTION */}
      <section id="hero-section" className="relative pt-32 pb-24 md:pt-40 md:pb-36 bg-gradient-to-b from-orange-50/50 via-white to-white overflow-hidden">
        {/* Subtle decorative background shapes */}
        <div className="absolute top-20 right-0 w-72 h-72 bg-orange-100 rounded-full filter blur-3xl opacity-40 -z-10"></div>
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-slate-100 rounded-full filter blur-3xl opacity-60 -z-10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-orange-700 text-xs font-semibold tracking-wide uppercase">
                <Sparkles className="w-4.5 h-4.5 text-orange-500 animate-pulse" />
                <span>#1 Creative Digital Agency in Addis Ababa</span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-sans font-extrabold text-slate-950 tracking-tight leading-[1.1]">
                Empowering Brands with <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500">Innovative</span> Digital Marketing
              </h1>

              <p className="text-lg md:text-xl text-slate-600 font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Siltawi Digital Marketing crafts premium digital campaigns, high-performance web applications, and iconic brand strategies that lower acquisition costs and accelerate compound growth across East Africa.
              </p>

              <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
                <button
                  id="hero-cta-contact"
                  onClick={() => setActiveTab('contact')}
                  className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl shadow-lg shadow-orange-500/20 hover:shadow-orange-500/35 transition-all flex items-center justify-center gap-2 group text-base"
                >
                  Book Your Free Audit
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
                </button>
                <button
                  id="hero-cta-portfolio"
                  onClick={() => setActiveTab('portfolio')}
                  className="px-8 py-4 bg-white hover:bg-slate-50 text-slate-900 border-2 border-slate-200 hover:border-slate-300 font-bold rounded-xl transition-all flex items-center justify-center gap-2 text-base"
                >
                  View Case Studies
                </button>
              </div>

              {/* Dynamic trust signals */}
              <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center justify-center lg:justify-start gap-x-8 gap-y-4 text-slate-500 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4.5 h-4.5 text-green-500" />
                  <span>Google Certified Partners</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4.5 h-4.5 text-green-500" />
                  <span>Transparent Attribution</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4.5 h-4.5 text-green-500" />
                  <span>Real-time Analytics reporting</span>
                </div>
              </div>
            </div>

            {/* Right Visual Column */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Visual Frame */}
                <div className="aspect-[4/3] rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-400 p-1.5 shadow-2xl shadow-slate-900/10">
                  <img
                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
                    alt="Digital marketing strategy session Addis Ababa"
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>

                {/* Overlap Widgets for high visual polish */}
                <div className="absolute -bottom-6 -left-6 bg-white p-4.5 rounded-xl shadow-xl border border-slate-100 flex items-center gap-3.5 max-w-[210px] animate-bounce-slow">
                  <div className="p-3 bg-orange-50 rounded-lg text-orange-500">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xl font-extrabold text-slate-950">+45%</div>
                    <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Direct Bookings Growth</div>
                  </div>
                </div>

                <div className="absolute -top-6 -right-6 bg-slate-900 text-white p-4.5 rounded-xl shadow-xl flex items-center gap-3.5 max-w-[220px]">
                  <div className="p-3 bg-slate-800 rounded-lg text-amber-400">
                    <Flame className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-lg font-bold">18+ Relaunches</div>
                    <div className="text-xs text-slate-400">Bespoke case projects</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SERVICES OVERVIEW */}
      <section id="services-overview-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-bold tracking-widest text-orange-500 uppercase">What We Do Best</h2>
          <p className="text-3xl sm:text-4xl font-sans font-extrabold text-slate-950 tracking-tight">
            Premium Marketing Services Engineered for Scaling Brands
          </p>
          <div className="h-1 w-12 bg-orange-500 mx-auto rounded-full"></div>
          <p className="text-slate-600 text-base">
            We do not believe in standardized packages. We build tailored visual systems and optimized acquisition campaigns that align directly with your growth objectives.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service) => (
            <div
              key={service.id}
              id={`service-card-${service.id}`}
              className="bg-white border border-slate-100 p-8 rounded-2xl shadow-sm hover:shadow-md hover:border-slate-200 transition-all group flex flex-col justify-between"
            >
              <div className="space-y-5">
                <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center font-bold group-hover:bg-orange-500 group-hover:text-white transition-colors">
                  <span className="text-lg font-bold">★</span>
                </div>
                <h3 className="text-xl font-bold text-slate-950">{service.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{service.shortDesc}</p>
              </div>
              <button
                onClick={() => handleServiceClick(service)}
                className="mt-6 flex items-center gap-1.5 text-sm font-bold text-orange-600 hover:text-orange-700 transition-all self-start"
              >
                Learn More <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 3. DYNAMIC COMPANY STATISTICS */}
      <section id="stats-section" className="bg-slate-950 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-4xl sm:text-5xl font-extrabold text-orange-500 font-sans tracking-tight">
                {stats.projects}+
              </div>
              <div className="text-xs sm:text-sm font-medium tracking-wide uppercase text-slate-400">Projects Delivered</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl sm:text-5xl font-extrabold text-orange-500 font-sans tracking-tight">
                {stats.growth}%
              </div>
              <div className="text-xs sm:text-sm font-medium tracking-wide uppercase text-slate-400">Average ROI Growth</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl sm:text-5xl font-extrabold text-orange-500 font-sans tracking-tight">
                {stats.experience}+
              </div>
              <div className="text-xs sm:text-sm font-medium tracking-wide uppercase text-slate-400">Years of Innovation</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl sm:text-5xl font-extrabold text-orange-500 font-sans tracking-tight">
                {stats.experts}+
              </div>
              <div className="text-xs sm:text-sm font-medium tracking-wide uppercase text-slate-400">Creative Experts</div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. WHY CHOOSE US */}
      <section id="why-choose-us-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6 space-y-6">
          <h2 className="text-xs font-bold tracking-widest text-orange-500 uppercase">The Siltawi Edge</h2>
          <h3 className="text-3xl sm:text-4xl font-sans font-extrabold text-slate-950 tracking-tight leading-tight">
            We Don't Sell Clicks. We Engineer Exponential Business Success.
          </h3>
          <p className="text-slate-600 text-base leading-relaxed">
            Most digital agencies report surface-level metrics like impressions, clicks, and page likes. At Siltawi, we connect your advertising spend directly to solid business outcomes, revenue channels, and lifetime value.
          </p>

          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-orange-50 rounded-lg text-orange-500 mt-0.5">
                <BarChart3 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-950 text-lg">Hyper-Targeted East African Mapping</h4>
                <p className="text-slate-600 text-sm leading-relaxed">We understand language nuances, regional platforms (Telegram, TikTok), and localized payment methods inside out.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-2 bg-orange-50 rounded-lg text-orange-500 mt-0.5">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-950 text-lg">Agile Co-Creation Studio</h4>
                <p className="text-slate-600 text-sm leading-relaxed">We operate as an extension of your company, offering transparent progress updates, weekly insights, and direct collaborative access.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-2 bg-orange-50 rounded-lg text-orange-500 mt-0.5">
                <Briefcase className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-950 text-lg">Clean, Light Web Engineering</h4>
                <p className="text-slate-600 text-sm leading-relaxed">Our sites are optimized to load smoothly even on basic mobile networks and older devices, guaranteeing zero dropped leads.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 relative">
          <div className="aspect-video lg:aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
              alt="Creative team workspace at Siltawi"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* 5. TESTIMONIALS PREVIEW */}
      <section id="testimonials-preview-section" className="bg-slate-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 max-w-2xl mx-auto mb-12">
            <h2 className="text-xs font-bold tracking-widest text-orange-500 uppercase">Success Stories</h2>
            <h3 className="text-2xl sm:text-3xl font-sans font-extrabold text-slate-950">Trusted by Ethiopia’s Most Dynamic Brands</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonialsData.map((t: TestimonialItem) => (
              <div key={t.id} className="bg-white p-8 rounded-xl border border-slate-100 shadow-sm flex flex-col justify-between">
                <p className="text-slate-700 italic text-sm leading-relaxed mb-6">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <img src={t.avatar} alt={t.author} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <h4 className="font-bold text-slate-950 text-sm">{t.author}</h4>
                    <p className="text-slate-500 text-xs">{t.role}, {t.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <button
              onClick={() => setActiveTab('testimonials')}
              className="inline-flex items-center gap-1.5 font-bold text-orange-600 hover:text-orange-700 transition-colors text-sm"
            >
              Read all verified client feedback <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 6. CALL TO ACTION CONTAINER */}
      <section id="cta-container" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-3xl p-8 sm:p-12 md:p-16 text-center text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent -z-10"></div>
          <div className="max-w-3xl mx-auto space-y-6">
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-sans font-extrabold tracking-tight">
              Ready to Accelerate Your Compound Digital Growth?
            </h3>
            <p className="text-white/90 text-base md:text-lg max-w-2xl mx-auto">
              Schedule a complimentary 30-minute digital audit with our senior advisors. We'll analyze your current campaigns, find leaks, and provide a clear plan.
            </p>
            <button
              onClick={() => setActiveTab('contact')}
              className="px-8 py-4 bg-slate-950 text-white font-bold rounded-xl hover:bg-slate-900 shadow-lg hover:shadow-slate-950/20 transition-all text-base"
            >
              Book My Free Strategy Audit
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
