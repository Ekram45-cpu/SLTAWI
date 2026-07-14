import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, ArrowRight } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

export default function Footer({ setActiveTab }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const handleLinkClick = (id: string) => {
    setActiveTab(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="main-footer" className="bg-slate-950 text-slate-400 pt-16 pb-8 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Brief */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 cursor-pointer" onClick={() => handleLinkClick('home')}>
              <img
                src="https://workshop.siltawi.com/siltawi_logo_normal_eng_v2.svg"
                alt="Siltawi Digital Marketing"
                className="h-10 w-auto brightness-200"
                referrerPolicy="no-referrer"
              />
              <span className="font-sans font-bold tracking-tight text-white text-lg">
                Siltawi <span className="text-orange-500">Digital</span>
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Empowering businesses across East Africa and beyond with elite digital marketing, premium web applications, branding, and content creation. Driven by results and engineered for impact.
            </p>
            <div className="flex items-center space-x-3.5 pt-2">
              <a href="#" className="p-2 rounded-full bg-slate-900 text-slate-400 hover:text-orange-500 hover:bg-slate-800 transition-all">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-full bg-slate-900 text-slate-400 hover:text-orange-500 hover:bg-slate-800 transition-all">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-full bg-slate-900 text-slate-400 hover:text-orange-500 hover:bg-slate-800 transition-all">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-full bg-slate-900 text-slate-400 hover:text-orange-500 hover:bg-slate-800 transition-all">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="space-y-4">
            <h3 className="text-white font-sans font-semibold tracking-wide uppercase text-sm">Quick Links</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => handleLinkClick('about')} className="hover:text-orange-500 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-orange-500" /> About Agency
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('services')} className="hover:text-orange-500 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-orange-500" /> Our Services
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('portfolio')} className="hover:text-orange-500 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-orange-500" /> Case Studies
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('team')} className="hover:text-orange-500 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-orange-500" /> Expert Team
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('menu')} className="hover:text-orange-500 transition-colors flex items-center gap-1.5 text-orange-400 font-medium">
                  <ArrowRight className="w-3.5 h-3.5 text-orange-500" /> Digital Menu Demo
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-4">
            <h3 className="text-white font-sans font-semibold tracking-wide uppercase text-sm">Get In Touch</h3>
            <ul className="space-y-3.5 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                <span>4th Floor, Bole Road, Next to Edna Mall, Addis Ababa, Ethiopia</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-orange-500 flex-shrink-0" />
                <span>+251 911 234 567 / +251 116 789 012</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-orange-500 flex-shrink-0" />
                <span>info@siltawi.com / business@siltawi.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter Subscribe */}
          <div className="space-y-4">
            <h3 className="text-white font-sans font-semibold tracking-wide uppercase text-sm">Join Our Newsletter</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Stay ahead of digital trends. Subscribe for insights, digital marketing strategies, and local industry case studies.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full px-4 py-2.5 rounded-l-lg bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-orange-500 transition-all"
                required
              />
              <button
                type="submit"
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 rounded-r-lg text-sm font-semibold transition-all"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-900 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© {currentYear} Siltawi Digital Marketing. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
