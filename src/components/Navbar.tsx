import React, { useState, useEffect } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Menu,
  X,
  GraduationCap,
  MessageCircle,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Sliders,
  Lock,
} from 'lucide-react';
import { CrestLogo } from './CrestLogo';
import { useWebsite } from '../context/WebsiteContext';

interface NavbarProps {
  onOpenConsultationModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenConsultationModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { data, setIsAdminOpen, isAdminAuthenticated } = useWebsite();
  const { agencyInfo } = data;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Introduction', href: '#introduction' },
    { name: 'Partners & Group', href: '#partners' },
    { name: 'Vision & Mission', href: '#vision-mission' },
    { name: 'Core Services', href: '#services' },
    { name: 'Destinations', href: '#destinations' },
    { name: 'Offices', href: '#offices' },
    { name: 'Assessment Tool', href: '#assessment-tool' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      {/* Top Bar: Contact & Global Presence */}
      <div className="bg-[#5A1226] text-white text-xs border-b border-[#E5A823]/25 px-4 sm:px-6 lg:px-8 py-2">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-y-1.5 gap-x-4">
          <div className="flex items-center flex-wrap gap-4 sm:gap-6 text-slate-200">
            {/* Phone Hotline */}
            <a
              id="top-bar-phone"
              href={`tel:${agencyInfo.cleanPhone}`}
              className="flex items-center gap-1.5 hover:text-[#E5A823] transition-colors font-medium tracking-wide"
            >
              <Phone className="w-3.5 h-3.5 text-[#E5A823]" />
              <span>{agencyInfo.phone}</span>
            </a>

            {/* Email */}
            <a
              id="top-bar-email"
              href={`mailto:${agencyInfo.email}`}
              className="flex items-center gap-1.5 hover:text-[#E5A823] transition-colors hidden sm:flex font-medium"
            >
              <Mail className="w-3.5 h-3.5 text-[#E5A823]" />
              <span>{agencyInfo.email}</span>
            </a>
          </div>

          <div className="flex items-center gap-3 sm:gap-5 text-xs text-slate-200 ml-auto">
            {/* Hubs indicator */}
            <div className="flex items-center gap-1 text-slate-300 hidden md:flex">
              <MapPin className="w-3.5 h-3.5 text-[#E5A823]" />
              <span>Offices in Yangon • Mandalay • Bangkok • Messina</span>
            </div>

            {/* WhatsApp Quick Connect */}
            <a
              id="top-bar-whatsapp"
              href={`https://wa.me/${agencyInfo.whatsappNumber}?text=Hello%20U%20Education%20Consultant%20Agency,%20I%20would%20like%20to%20inquire%20about%20studying%20abroad.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[#E5A823] hover:text-white font-medium transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>

            {/* Admin Panel Quick Trigger in top bar */}
            <button
              type="button"
              onClick={() => setIsAdminOpen(true)}
              className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/10 hover:bg-[#E5A823] hover:text-[#5A1226] text-[11px] font-bold text-amber-200 transition-colors border border-amber-300/30 cursor-pointer"
              title="Open Admin Panel to edit whole website"
            >
              <Sliders className="w-3 h-3 text-[#E5A823]" />
              <span>Admin Edit</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Nav Header */}
      <nav
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FAF8F5]/95 backdrop-blur-md shadow-md py-3'
            : 'bg-[#FAF8F5] py-4 border-b border-stone-200'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <a
            id="brand-logo-link"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center group cursor-pointer"
          >
            <CrestLogo />
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-5 xl:gap-7">
            {navLinks.map((link) => (
              <a
                key={link.name}
                id={`nav-link-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-sm font-semibold text-slate-750 hover:text-[#5A1226] hover:border-b-2 hover:border-[#E5A823] pb-1 transition-all"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Action Button & Mobile Menu Toggle */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              id="nav-cta-consultation"
              onClick={() => {
                if (onOpenConsultationModal) {
                  onOpenConsultationModal();
                } else {
                  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
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
            <div className="flex flex-col space-y-2 pt-2 border-t border-stone-100">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  id={`mobile-nav-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="flex items-center justify-between px-3 py-2.5 rounded-lg text-slate-800 hover:bg-[#5A1226]/5 hover:text-[#5A1226] font-semibold text-sm transition-colors"
                >
                  <span>{link.name}</span>
                  <ChevronRight className="w-4 h-4 text-[#E5A823]" />
                </a>
              ))}
            </div>

            <div className="pt-3 border-t border-stone-200 flex flex-col gap-2.5">
              <button
                id="mobile-nav-book-button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenConsultationModal) {
                    onOpenConsultationModal();
                  } else {
                    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#5A1226] text-white font-bold text-sm shadow cursor-pointer"
              >
                <GraduationCap className="w-4 h-4 text-[#E5A823]" />
                <span>Book Free Student Assessment</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsAdminOpen(true);
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-stone-100 text-[#5A1226] font-bold text-xs border border-dashed border-[#E5A823] cursor-pointer"
              >
                <Sliders className="w-3.5 h-3.5 text-[#E5A823]" />
                <span>Open Admin Portal (Edit Site)</span>
              </button>

              <div className="flex gap-2">
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

