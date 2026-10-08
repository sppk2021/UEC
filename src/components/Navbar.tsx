import React, { useState, useEffect } from 'react';
import {
  Phone,
  Mail,
  Menu,
  X,
  ChevronRight,
  Sparkles,
  GraduationCap,
} from 'lucide-react';
import { CrestLogo } from './CrestLogo';
import { useWebsite, PageId, PathwayTab } from '../context/WebsiteContext';

interface NavbarProps {
  onOpenConsultationModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenConsultationModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { data, activePage, setActivePage } = useWebsite();
  const { agencyInfo } = data;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { name: string; pageId: PageId; targetTab?: PathwayTab }[] = [
    { name: 'Home', pageId: 'home' },
    { name: 'About Us', pageId: 'about' },
    { name: 'Core Services', pageId: 'services' },
    { name: 'Destinations & Offices', pageId: 'destinations' },
    { name: 'Pathway & Budget Calculator', pageId: 'pathway' },
    { name: 'Blog & Stories', pageId: 'blog' },
    { name: 'Contact', pageId: 'contact' },
  ];

  const handleNavClick = (e: React.MouseEvent, pageId: PageId, targetTab?: PathwayTab) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    setActivePage(pageId, { pathwayTab: targetTab });
  };

  const isLinkActive = (link: (typeof navLinks)[0]) => {
    if (link.pageId === 'destinations') {
      return activePage === 'destinations' || activePage === 'offices';
    }
    return activePage === link.pageId;
  };

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      {/* Main Nav Header */}
      <nav
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FAF8F5]/95 backdrop-blur-md shadow-md py-3'
            : 'bg-[#FAF8F5] py-3.5 border-b border-stone-200'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <a
            id="brand-logo-link"
            href="#home"
            onClick={(e) => handleNavClick(e, 'home')}
            className="flex items-center group cursor-pointer"
          >
            <CrestLogo />
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-2 xl:gap-4 2xl:gap-5">
            {navLinks.map((link) => {
              const active = isLinkActive(link);
              return (
                <button
                  key={link.name}
                  id={`nav-link-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
                  onClick={(e) => handleNavClick(e, link.pageId, link.targetTab)}
                  className={`text-xs xl:text-sm font-semibold transition-all py-1 border-b-2 cursor-pointer whitespace-nowrap ${
                    active
                      ? 'text-[#5A1226] font-bold border-[#E5A823]'
                      : 'text-slate-700 hover:text-[#5A1226] border-transparent hover:border-slate-300'
                  }`}
                >
                  {link.name}
                </button>
              );
            })}
          </div>

          {/* Action Button & Mobile Menu Toggle */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              id="nav-cta-consultation"
              onClick={() => {
                if (onOpenConsultationModal) {
                  onOpenConsultationModal();
                } else {
                  setActivePage('contact');
                }
              }}
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#5A1226] hover:bg-[#721832] text-white text-xs font-bold uppercase tracking-wider shadow-sm transition-all hover:shadow-md hover:scale-[1.02] active:scale-95 border border-[#E5A823]/40 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#E5A823]" />
              <span>Free Consultation</span>
            </button>

            {/* Mobile Hamburger */}
            <button
              id="mobile-menu-toggle-button"
              type="button"
              aria-label="Toggle navigation menu"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl text-[#5A1226] hover:bg-stone-200/60 transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-stone-200 px-5 pt-3 pb-6 shadow-xl space-y-3 animate-in fade-in slide-in-from-top-4 duration-200">
            <div className="flex flex-col space-y-1.5 pt-2 border-t border-stone-100">
              {navLinks.map((link) => {
                const active = isLinkActive(link);
                return (
                  <button
                    key={link.name}
                    id={`mobile-nav-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
                    onClick={(e) => handleNavClick(e, link.pageId, link.targetTab)}
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left font-semibold text-sm transition-colors cursor-pointer ${
                      active
                        ? 'bg-[#5A1226] text-white font-bold'
                        : 'text-slate-800 hover:bg-[#5A1226]/5 hover:text-[#5A1226]'
                    }`}
                  >
                    <span>{link.name}</span>
                    <ChevronRight
                      className={`w-4 h-4 ${active ? 'text-[#E5A823]' : 'text-slate-400'}`}
                    />
                  </button>
                );
              })}
            </div>

            <div className="pt-3 border-t border-stone-200 flex flex-col gap-2.5">
              <button
                id="mobile-nav-book-button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenConsultationModal) {
                    onOpenConsultationModal();
                  } else {
                    setActivePage('contact');
                  }
                }}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#5A1226] text-white font-bold text-sm shadow-md border border-[#E5A823]/40 cursor-pointer"
              >
                <GraduationCap className="w-4 h-4 text-[#E5A823]" />
                <span>Book Free Student Assessment</span>
              </button>

              <div className="grid grid-cols-2 gap-2">
                <a
                  id="mobile-nav-phone-call"
                  href={`tel:${agencyInfo.cleanPhone}`}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-stone-100 text-[#5A1226] font-semibold text-xs border border-stone-300"
                >
                  <Phone className="w-3.5 h-3.5 text-[#E5A823]" />
                  <span>Call Us</span>
                </a>
                <a
                  id="mobile-nav-email-send"
                  href={`mailto:${agencyInfo.email}`}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-stone-100 text-[#5A1226] font-semibold text-xs border border-stone-300"
                >
                  <Mail className="w-3.5 h-3.5 text-[#E5A823]" />
                  <span>Email Us</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

