import { Target, Eye, ShieldCheck, Award, Sparkles, Building, Briefcase, GraduationCap, Trophy } from 'lucide-react';

interface AboutViewProps {
  setActiveTab: (tab: string) => void;
}

export default function AboutView({ setActiveTab }: AboutViewProps) {
  // Category Skills lists
  const skillCategories = [
    {
      category: 'Performance Marketing',
      skills: ['Meta Ads Manager', 'Google Ads (Search & Display)', 'LinkedIn Campaign Manager', 'Performance Attribution', 'PPC Optimization', 'Lead Generation Funnels']
    },
    {
      category: 'Technical Development',
      skills: ['React & Next.js', 'Node.js & Express', 'Tailwind CSS', 'API Proxy & Integration', 'SEO Technical Restructuring', 'Mobile-First Responsive UI']
    },
    {
      category: 'Creative Brand Systems',
      skills: ['Corporate Brand Guidelines', 'Minimalist Logo Systems', 'Tactile Packaging Concepts', 'Typography Alignment', 'Style Guide Authoring', 'Sleek Presentation Design']
    },
    {
      category: 'Storytelling & Content',
      skills: ['Bilingual Copywriting (Amharic & English)', 'FPV Drone & Cinematic Video', 'Vertical Video Content Reels', 'Micro-Influencer Alignment', 'Interactive Social Triggers', 'Media Asset Kits']
    }
  ];

  const valuesAndPhilosophy = [
    {
      title: 'Performance Attribution',
      desc: 'We focus purely on raw business outcomes—booking requests, direct customer acquisitions, and cost-per-acquisition reductions.',
      icon: <Target className="w-5 h-5 text-orange-500" />
    },
    {
      title: 'Technical Precision',
      desc: 'Your brand assets must load instantaneously and run flawlessly on low-bandwidth networks, ensuring absolute accessibility.',
      icon: <ShieldCheck className="w-5 h-5 text-orange-500" />
    }
  ];

  return (
    <div id="about-view" className="space-y-24 pt-32 pb-20">
      {/* SECTION 1: WHO WE ARE (INTRODUCTION) */}
      <section id="about-who-we-are" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-orange-700 text-xs font-semibold tracking-wider uppercase">
              <Building className="w-4 h-4" /> Who We Are
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-sans font-extrabold text-slate-950 tracking-tight leading-tight">
              Siltawi Digital Marketing
            </h1>
            <p className="text-slate-600 text-base leading-relaxed">
              Founded in <span className="font-semibold text-slate-900">2023</span> in the heart of Addis Ababa, Ethiopia, Siltawi Digital Marketing is a premium, results-first digital marketing agency. We combine world-class technical web development with sophisticated ad performance marketing to elevate East African enterprises.
            </p>
            <p className="text-slate-600 text-base leading-relaxed">
              We do not believe in superficial vanity metrics like "likes" or simple page clicks. Instead, we build integrated ad campaigns, lightning-fast web systems, and iconic brand strategies that lower customer acquisition costs and accelerate compound revenue growth.
            </p>
            <div className="pt-4 flex flex-wrap gap-4">
              <button
                onClick={() => setActiveTab('contact')}
                className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-lg shadow-md transition-all text-sm"
              >
                Discuss a Partnership
              </button>
              <button
                onClick={() => setActiveTab('portfolio')}
                className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-lg shadow-md transition-all text-sm"
              >
                View Handcrafted Case Studies
              </button>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border-4 border-white">
              <img
                src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=800&q=80"
                alt="Siltawi Digital creative team workspace in Addis Ababa"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: EXPERIENCE & OUR HISTORY */}
      <section id="about-experience" className="bg-slate-50 py-16 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-orange-700 text-xs font-semibold tracking-wider uppercase">
              <Briefcase className="w-4 h-4" /> Our Experience
            </div>
            <h2 className="text-2xl sm:text-3xl font-sans font-extrabold text-slate-950">
              Years of Localized Implementation
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Since our establishment in early 2023, Siltawi Digital has actively spearheaded the digital transformation of premium Ethiopian brands. Our team consists of seasoned software engineers, performance ad buying directors, and highly creative bilingual copywriters who possess deep insights into regional consumer psychology.
            </p>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              We have partnered across tourism, hospitality, beverage, transport, and upscale wellness spaces, engineering durable systems that allow companies to transition away from high commission-based platforms toward fully-owned direct booking pipelines.
            </p>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-orange-50 rounded-lg text-orange-500">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-950 text-base">Local Capability</h3>
              </div>
              <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                Hosting specialized technical digital marketing workshops and bootcamps to mentor and foster world-class creative talent based directly in Addis Ababa.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-orange-50 rounded-lg text-orange-500">
                  <Eye className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-950 text-base">Aesthetic Vision</h3>
              </div>
              <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                A relentless standard of layout perfection, balanced negative space, and premium font selection that stands shoulder-to-shoulder with global standards.
              </p>
            </div>

            {valuesAndPhilosophy.map((v, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 sm:col-span-2 flex gap-4">
                <div className="p-3 bg-orange-50 rounded-xl text-orange-500 h-11 w-11 flex items-center justify-center flex-shrink-0">
                  {v.icon}
                </div>
                <div className="space-y-1.5">
                  <h3 className="font-bold text-slate-950 text-base">{v.title}</h3>
                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: SKILLS PORTFOLIO (tags, chips, buttons only - NO percentages!) */}
      <section id="about-skills" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <h2 className="text-xs font-bold tracking-widest text-orange-500 uppercase">Expert Capabilities</h2>
          <h3 className="text-2xl sm:text-3xl font-sans font-extrabold text-slate-950">Our Core Skills Portfolio</h3>
          <div className="h-1 w-12 bg-orange-500 mx-auto rounded-full"></div>
          <p className="text-slate-600 text-sm sm:text-base">
            We deliver highly targeted competencies across four major pillars. Instead of arbitrary percentage sliders, we demonstrate our skills through continuous technological development and actual campaign execution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillCategories.map((group) => (
            <div key={group.category} className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-5">
              <h4 className="font-sans font-bold text-slate-950 text-lg border-b border-slate-100 pb-2.5 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-orange-500" />
                {group.category}
              </h4>
              <div className="flex flex-wrap gap-2 pt-1.5">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3.5 py-2 bg-slate-50 hover:bg-orange-50 hover:text-orange-600 border border-slate-200 hover:border-orange-200 text-slate-700 text-xs font-bold rounded-lg cursor-default transition-all"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 4: EXPERTISE & ACHIEVEMENTS */}
      <section id="about-achievements" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-950 text-white rounded-3xl p-8 sm:p-12 md:p-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-orange-600 rounded-full filter blur-3xl opacity-10 -z-10"></div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-orange-400 text-xs font-bold uppercase tracking-wider">
                <Trophy className="w-4 h-4" /> Achievements & Expertise
              </div>
              <h3 className="text-2xl sm:text-3xl font-sans font-bold text-white leading-tight">
                Proven Milestones & Enterprise Milestones
              </h3>
              <p className="text-slate-300 text-base leading-relaxed">
                Our operations are certified, optimized, and held to the highest standards. In less than three years, we have achieved notable milestones across East Africa:
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="flex gap-2.5">
                  <Award className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-white text-sm">Google Ads Certified</h5>
                    <p className="text-xs text-slate-400">Our ad managers are officially certified partners, ensuring optimal PPC spend.</p>
                  </div>
                </div>

                <div className="flex gap-2.5">
                  <Award className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-white text-sm">18+ Premium Relaunches</h5>
                    <p className="text-xs text-slate-400">Successfully engineered and launched 18 custom-tailored web products and social campaigns.</p>
                  </div>
                </div>

                <div className="flex gap-2.5">
                  <Award className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-white text-sm">Direct Bookings Domination</h5>
                    <p className="text-xs text-slate-400">Drove client partners to bypass commission rates, achieving 300% direct client bookings growth.</p>
                  </div>
                </div>

                <div className="flex gap-2.5">
                  <Award className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-white text-sm">Localized Bilingual Storytelling</h5>
                    <p className="text-xs text-slate-400">Pioneered standard high-definition creative vertical promos in Amharic & English.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="aspect-video rounded-xl overflow-hidden shadow-2xl border border-slate-800">
                <img
                  src="https://images.unsplash.com/photo-1531538606174-0f90ff5dce83?auto=format&fit=crop&w=800&q=80"
                  alt="Siltawi Digital workshop and celebration"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
