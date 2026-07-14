import { useState, useEffect } from 'react';
import { Menu, X, ShieldAlert, Coffee } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isAdminLoggedIn: boolean;
  onLogout: () => void;
}

export default function Navbar({ activeTab, setActiveTab, isAdminLoggedIn, onLogout }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        isScrolled || setIsScrolled(true);
      } else {
        !isScrolled || setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isScrolled]);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'services', label: 'Services' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'team', label: 'Our Team' },
    { id: 'testimonials', label: 'Client Feedback' },
    { id: 'contact', label: 'Contact Us' },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md py-3 text-slate-900 border-b border-slate-100'
          : 'bg-white/80 backdrop-blur-sm py-4 text-slate-900'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => handleNavClick('home')}>
            <img
              src="https://workshop.siltawi.com/siltawi_logo_normal_eng_v2.svg"
              alt="Siltawi Digital Marketing Logo"
              className="h-10 w-auto"
              referrerPolicy="no-referrer"
            />
            <span className="ml-2.5 font-sans font-bold tracking-tight text-lg text-slate-950 hidden sm:block">
              Siltawi <span className="text-orange-500 font-medium">Digital</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                id={`nav-link-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all ${
                  activeTab === item.id
                    ? 'text-orange-600 bg-orange-50'
                    : 'text-slate-700 hover:text-orange-600 hover:bg-slate-50'
                }`}
              >
                {item.label}
              </button>
            ))}

            <div className="h-6 w-px bg-slate-200 mx-2"></div>

            {/* Showcase & Admin Tabs */}
            <button
              id="nav-link-menu"
              onClick={() => handleNavClick('menu')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold border transition-all ${
                activeTab === 'menu'
                  ? 'text-white bg-slate-900 border-slate-900'
                  : 'text-slate-800 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <Coffee className="w-4 h-4 text-orange-500" />
              Digital Menu
            </button>

            <button
              id="nav-link-admin"
              onClick={() => handleNavClick('admin')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'admin'
                  ? 'bg-orange-500 text-white hover:bg-orange-600'
                  : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
              }`}
            >
              <ShieldAlert className="w-4 h-4" />
              {isAdminLoggedIn ? 'Admin Panel' : 'Admin Portal'}
            </button>

            {isAdminLoggedIn && (
              <button
                id="nav-logout-btn"
                onClick={onLogout}
                className="px-3.5 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-all"
              >
                Logout
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden items-center space-x-2">
            <button
              id="nav-link-menu-mobile"
              onClick={() => handleNavClick('menu')}
              className={`p-2 rounded-lg border flex items-center gap-1 ${
                activeTab === 'menu' ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-800 border-slate-200'
              }`}
            >
              <Coffee className="w-4 h-4 text-orange-500" />
              <span className="text-xs font-semibold">Menu</span>
            </button>

            <button
              id="nav-mobile-menu-toggle"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div id="mobile-menu" className="lg:hidden bg-white border-t border-slate-100 shadow-inner px-4 py-3 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              id={`nav-link-mobile-${item.id}`}
              onClick={() => handleNavClick(item.id)}
              className={`block w-full text-left px-4 py-2.5 rounded-lg text-base font-semibold transition-all ${
                activeTab === item.id
                  ? 'text-orange-600 bg-orange-50'
                  : 'text-slate-700 hover:text-orange-600 hover:bg-slate-50'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="border-t border-slate-100 my-2 pt-2 space-y-2">
            <button
              id="nav-link-mobile-menu"
              onClick={() => handleNavClick('menu')}
              className={`flex items-center gap-2 w-full px-4 py-2.5 rounded-lg text-base font-semibold border transition-all ${
                activeTab === 'menu'
                  ? 'text-white bg-slate-900 border-slate-900'
                  : 'text-slate-800 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <Coffee className="w-5 h-5 text-orange-500" />
              Digital Menu Showcase
            </button>

            <button
              id="nav-link-mobile-admin"
              onClick={() => handleNavClick('admin')}
              className={`flex items-center gap-2 w-full px-4 py-2.5 rounded-lg text-base font-semibold transition-all ${
                activeTab === 'admin'
                  ? 'bg-orange-500 text-white'
                  : 'bg-slate-100 text-slate-800'
              }`}
            >
              <ShieldAlert className="w-5 h-5" />
              {isAdminLoggedIn ? 'Admin Control Center' : 'Admin Portal'}
            </button>

            {isAdminLoggedIn && (
              <button
                id="nav-mobile-logout"
                onClick={() => {
                  onLogout();
                  setIsOpen(false);
                }}
                className="block w-full text-left px-4 py-2.5 rounded-lg text-base font-semibold text-red-600 hover:bg-red-50"
              >
                Logout Account
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
