import { Target, Eye, ShieldCheck, Heart, Award, Sparkles, Building, Coffee } from 'lucide-react';

interface AboutViewProps {
  setActiveTab: (tab: string) => void;
}

export default function AboutView({ setActiveTab }: AboutViewProps) {
  const coreValues = [
    {
      title: 'Innovation',
      desc: 'Constantly testing and deploying cutting-edge technologies and creative methodologies to keep clients ahead.',
      icon: <Sparkles className="w-6 h-6 text-orange-500" />
    },
    {
      title: 'Creativity',
      desc: 'Crafting visually iconic and narrative-driven assets that bypass general market saturation and hook customers.',
      icon: <Heart className="w-6 h-6 text-orange-500" />
    },
    {
      title: 'Transparency',
      desc: 'Strict performance attribution. No inflated statistics, no complex jargon, just raw business results.',
      icon: <ShieldCheck className="w-6 h-6 text-orange-500" />
    },
    {
      title: 'Excellence',
      desc: 'Relentless execution, thorough code quality, pixel-perfect layouts, and highly robust marketing setups.',
      icon: <Award className="w-6 h-6 text-orange-500" />
    }
  ];

  return (
    <div id="about-view" className="space-y-24 pt-32 pb-20">
      {/* 1. BRAND STORY / COMPANY OVERVIEW */}
      <section id="about-intro-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-orange-700 text-xs font-semibold tracking-wider uppercase">
              <Building className="w-4 h-4" /> About Siltawi Digital
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-sans font-extrabold text-slate-950 tracking-tight leading-tight">
              Forging the Future of Digital Marketing in East Africa
            </h1>
            <p className="text-slate-600 text-base leading-relaxed">
              Founded in <span className="font-semibold text-slate-900">2023</span> in the heart of Addis Ababa, Ethiopia, Siltawi Digital Marketing was established to bridge the gap between world-class technical marketing performance and the fast-evolving digital landscapes of Africa.
            </p>
            <p className="text-slate-600 text-base leading-relaxed">
              We recognized that traditional methods were no longer sufficient in a world driven by social media saturation, mobile accessibility, and interactive web experiences. By uniting world-class developer talent with veteran copywriters and ad strategists, we build systems that generate compounding growth, rather than temporary spikes.
            </p>
            <div className="pt-4 flex gap-4">
              <button
                onClick={() => setActiveTab('contact')}
                className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-lg shadow-md transition-all text-sm"
              >
                Connect With Us
              </button>
              <button
                onClick={() => setActiveTab('menu')}
                className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-lg shadow-md transition-all flex items-center gap-2 text-sm"
              >
                <Coffee className="w-4 h-4 text-orange-500" /> Explore Menu System Demo
              </button>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border-4 border-white">
              <img
                src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=800&q=80"
                alt="Siltawi modern creative agency office Addis Ababa"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. MISSION & VISION BENTO */}
      <section id="mission-vision-section" className="bg-slate-50 py-16 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Mission Card */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex gap-6">
            <div className="p-3 bg-orange-50 rounded-xl text-orange-500 h-12 w-12 flex items-center justify-center flex-shrink-0">
              <Target className="w-6 h-6" />
            </div>
            <div className="space-y-3">
              <h3 className="text-xl font-bold text-slate-950">Our Mission</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Empower businesses in Ethiopia and across the continent with custom, innovative, and highly transparent digital marketing strategies and state-of-the-art web tools that consistently drive engagement, loyalty, and actual revenue growth.
              </p>
            </div>
          </div>

          {/* Vision Card */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex gap-6">
            <div className="p-3 bg-orange-50 rounded-xl text-orange-500 h-12 w-12 flex items-center justify-center flex-shrink-0">
              <Eye className="w-6 h-6" />
            </div>
            <div className="space-y-3">
              <h3 className="text-xl font-bold text-slate-950">Our Vision</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                To stand at the absolute vanguard of Africa’s digital transformation, serving as a catalyst for brands seeking global visibility, and setting the standard for technical excellence, creative integrity, and engineering craftsmanship.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CORE VALUES GRID */}
      <section id="core-values-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <h2 className="text-xs font-bold tracking-widest text-orange-500 uppercase">What Guides Us</h2>
          <h3 className="text-2xl sm:text-3xl font-sans font-extrabold text-slate-950">Our Unwavering Core Values</h3>
          <div className="h-1 w-12 bg-orange-500 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {coreValues.map((val) => (
            <div key={val.title} className="p-6 bg-white border border-slate-100 rounded-xl shadow-sm space-y-4 hover:-translate-y-1 transition-all">
              <div className="p-3 bg-orange-50 rounded-lg w-12 h-12 flex items-center justify-center">
                {val.icon}
              </div>
              <h4 className="font-bold text-slate-950 text-lg">{val.title}</h4>
              <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">{val.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. WORK CULTURE / REGIONAL COMMITMENT */}
      <section id="culture-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-slate-950 text-white rounded-3xl p-8 sm:p-12 md:p-16 relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-2xl sm:text-3xl font-sans font-bold text-orange-500">Addis Ababa & Global Tech Convergence</h3>
            <p className="text-slate-300 text-base leading-relaxed">
              Siltawi is proud to be headquartered in Addis Ababa. We have committed ourselves to fostering exceptional local tech talent, running intensive web engineering bootcamps, and providing a modern, supportive, high-creativity workspace.
            </p>
            <p className="text-slate-300 text-base leading-relaxed">
              We believe African organizations shouldn't have to look outside the continent for world-class solutions. From high-performing e-commerce backends to custom-tailored mobile applications and digital menus, we build with precision, keeping all data flows secure and fast.
            </p>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="aspect-video rounded-xl overflow-hidden shadow-2xl border border-slate-800">
              <img
                src="https://images.unsplash.com/photo-1531538606174-0f90ff5dce83?auto=format&fit=crop&w=800&q=80"
                alt="Siltawi workshop session"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
