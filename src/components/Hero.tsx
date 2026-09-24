import React, { useState, useEffect } from 'react';
import {
  GraduationCap,
  ShieldCheck,
  Globe2,
  Compass,
  PhoneCall,
  Calendar,
  Sparkles,
  Award,
  Home,
  Layers,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
} from 'lucide-react';
import { CrestLogo } from './CrestLogo';
import { useWebsite } from '../context/WebsiteContext';

interface HeroProps {
  onOpenConsultation?: () => void;
}

interface HeroSlide {
  id: string;
  category: string;
  categoryType: 'intake' | 'event' | 'scholarship' | 'arrival';
  badgeColor: string;
  brandHeadingGold: string;
  brandHeadingBurgundy: string;
  taglinePill: string;
  description: string;
  highlights: string[];
  ctaPrimaryText: string;
  ctaPrimaryAction: 'consultation' | 'destinations' | 'services' | 'about';
  ctaSecondaryText: string;
  ctaSecondaryAction: 'destinations' | 'services' | 'offices' | 'blog' | 'about';
  backgroundImage: string;
  sceneTitle: string;
  tabLabel: string;
  tabSub: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'intakes-2026',
    category: 'Accepting Intakes 2026–2027',
    categoryType: 'intake',
    badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-300',
    brandHeadingGold: 'U Education',
    brandHeadingBurgundy: 'Consultant Agency',
    taglinePill: 'Study in Italy, Thailand, China, Malaysia & Cambodia',
    description:
      'Premier international education consultancy providing end-to-end guidance from academic profiling and university placement to visa legal processing and pre-departure preparation across Europe and Asia.',
    highlights: [
      '100% Direct Official Tuition Fees',
      'Zero Hidden Middleman Charges',
      '1,500+ Successful Global Placements',
    ],
    ctaPrimaryText: 'Book Free Student Assessment',
    ctaPrimaryAction: 'consultation',
    ctaSecondaryText: 'Find Your Ideal Study Pathway',
    ctaSecondaryAction: 'destinations',
    backgroundImage:
      'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2000&auto=format&fit=crop',
    sceneTitle: 'University Quadrangle & Campus Lawns',
    tabLabel: '01. Intakes 2026/27',
    tabSub: 'Italy • Thailand • China • Malaysia • Cambodia',
  },
  {
    id: 'education-fair',
    category: 'Upcoming Global Event • Live Sessions',
    categoryType: 'event',
    badgeColor: 'bg-amber-50 text-amber-900 border-amber-300',
    brandHeadingGold: 'Meet University',
    brandHeadingBurgundy: 'Admissions Deans',
    taglinePill: 'Yangon • Mandalay • Bangkok • Phnom Penh • Online Live',
    description:
      'Join our interactive Higher Education Fairs and exclusive 1-on-1 counseling sessions with official university representatives from Italy, Thailand, and Malaysia with on-the-spot profile reviews and interview waivers.',
    highlights: [
      'Direct Faculty & Counselor Meets',
      'Instant Admission Eligibility Review',
      'Spot Scholarship Pre-Evaluation',
    ],
    ctaPrimaryText: 'Register for Counseling Fair',
    ctaPrimaryAction: 'consultation',
    ctaSecondaryText: 'View Global Office Hubs',
    ctaSecondaryAction: 'offices',
    backgroundImage:
      'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2000&auto=format&fit=crop',
    sceneTitle: 'International Student Advising Hub',
    tabLabel: '02. Global Ed Fair',
    tabSub: 'Direct University Representative Sessions',
  },
  {
    id: 'scholarships-grants',
    category: 'Scholarship Announcement • 100% Funding',
    categoryType: 'scholarship',
    badgeColor: 'bg-rose-50 text-[#5A1226] border-rose-200',
    brandHeadingGold: 'Fully-Funded European',
    brandHeadingBurgundy: '& CSC Scholarships',
    taglinePill: 'Tuition Waiver + Free Housing + Annual Living Allowance',
    description:
      'Unlock prestigious European DSU grants offering complete tuition waivers, complimentary student accommodation, and €6,000–€8,000 yearly living stipends, alongside comprehensive Chinese Government (CSC) full-ride scholarships.',
    highlights: [
      'Regional Italian DSU (€6k–€8k/yr Stipend)',
      'Chinese CSC Full Government Grants',
      'ASEAN & High-Achiever Merit Rebates',
    ],
    ctaPrimaryText: 'Evaluate Scholarship Eligibility',
    ctaPrimaryAction: 'consultation',
    ctaSecondaryText: 'Read Destination Guides',
    ctaSecondaryAction: 'blog',
    backgroundImage:
      'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?q=80&w=2000&auto=format&fit=crop',
    sceneTitle: 'European & Asian Research University Hall',
    tabLabel: '03. 100% Scholarships',
    tabSub: 'DSU Regional Grants & CSC Fellowships',
  },
  {
    id: 'on-arrival-dorm',
    category: 'Dual-Shore Protection • Messina & SE Asia Hubs',
    categoryType: 'arrival',
    badgeColor: 'bg-indigo-50 text-indigo-900 border-indigo-200',
    brandHeadingGold: 'Airport Reception to',
    brandHeadingBurgundy: 'Overseas Dorm Check-In',
    taglinePill: 'Care & Welfare Continuous Until Your First Day of Class',
    description:
      'Our support does not end when your visa is approved. Full-time U Education welfare officers in Messina (Sicily), Bangkok (Thailand), and Phnom Penh (Cambodia) meet you at the airport, guide you to your dorm, and assist with residence permits.',
    highlights: [
      'Guaranteed Secure Student Dormitory',
      'Airport Meet & Greet Logistics',
      'Local Banking, SIM & Permesso Support',
    ],
    ctaPrimaryText: 'Explore Our 5 Core Services',
    ctaPrimaryAction: 'services',
    ctaSecondaryText: 'Learn About Our Agency',
    ctaSecondaryAction: 'about',
    backgroundImage:
      'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=2000&auto=format&fit=crop',
    sceneTitle: 'Overseas Student Housing & Campus Living',
    tabLabel: '04. Overseas Dorm Care',
    tabSub: 'Ground Assistance in Italy & SE Asia',
  },
];

export const Hero: React.FC<HeroProps> = ({ onOpenConsultation }) => {
  const { data, setActivePage } = useWebsite();
  const { agencyInfo } = data;

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  const SLIDE_DURATION = 5000; // 5 seconds per slide for lively auto show

  // Parallax Scroll Tracking: Subtle, smooth vertical translation as user scrolls
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Subtle parallax translation: moves background image at ~32% speed of foreground scroll
  const parallaxOffset = Math.min(scrollY * 0.32, 240);

  // Smooth scroll to Featured Study Destinations Spotlight Section
  const scrollToFeaturedDestinations = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    const targetElement =
      document.getElementById('featured-study-destinations') ||
      document.getElementById('study-destinations');
    
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      setActivePage('home');
      setTimeout(() => {
        const el = document.getElementById('featured-study-destinations');
        el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 150);
    }
  };

  // Continuous Auto-Show Timer: Automatically advances to next slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, SLIDE_DURATION);

    return () => clearInterval(timer);
  }, [currentSlideIndex]);

  const goToNextSlide = () => {
    setCurrentSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const goToPrevSlide = () => {
    setCurrentSlideIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const currentSlide = HERO_SLIDES[currentSlideIndex];

  const handleAction = (action: 'consultation' | 'destinations' | 'services' | 'about' | 'offices' | 'blog') => {
    if (action === 'consultation') {
      if (onOpenConsultation) {
        onOpenConsultation();
      } else {
        setActivePage('contact');
      }
    } else if (action === 'destinations') {
      scrollToFeaturedDestinations();
    } else {
      setActivePage(action);
    }
  };

  return (
    <section
      id="hero-section"
      className="relative min-h-[640px] lg:min-h-[760px] flex flex-col justify-center overflow-hidden bg-[#FAF8F5] text-slate-900 border-b border-stone-200"
    >
      {/* 1. Full-Bleed Background Carousel Images with Subtle Parallax & Light Aesthetic */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Parallax Layer with Headroom Translation */}
        <div
          className="absolute -top-[12%] -bottom-[12%] -left-[2%] -right-[2%] will-change-transform"
          style={{
            transform: `translate3d(0, ${parallaxOffset}px, 0)`,
          }}
        >
          {HERO_SLIDES.map((slide, idx) => {
            const isActive = idx === currentSlideIndex;
            return (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  isActive ? 'opacity-85 z-10 scale-100' : 'opacity-0 z-0 scale-105 pointer-events-none'
                } transform transition-transform duration-7000`}
              >
                <img
                  src={slide.backgroundImage}
                  alt={slide.tabLabel}
                  className="w-full h-full object-cover object-center filter saturate-[1.12] contrast-[1.04]"
                  referrerPolicy="no-referrer"
                />
              </div>
            );
          })}
        </div>

        {/* Soft, Light & Warm Gradient Overlays:
            Ensures text contrast on the left while allowing the vibrant campus architecture to be clearly visible on the right */}
        <div className="absolute inset-0 z-20 bg-gradient-to-r from-[#FAF8F5] via-[#FAF8F5]/85 to-[#FAF8F5]/25 lg:from-[#FAF8F5]/98 lg:via-[#FAF8F5]/70 lg:to-transparent" />
        <div className="absolute inset-0 z-20 bg-gradient-to-t from-[#FAF8F5]/90 via-transparent to-[#FAF8F5]/30" />
      </div>

      {/* 2. Main Hero Content Container */}
      <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 flex-1 flex flex-col justify-center w-full">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Main Left Editorial Typography */}
          <div key={currentSlide.id} className="lg:col-span-8 space-y-6 animate-in fade-in duration-500">
            
            {/* Top Emblem & Brand Stamp & Dynamic Category Badge & Scene Locator */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
              <CrestLogo variant="full" />
              <div className="h-6 w-px bg-stone-300 hidden sm:block" />
              <span className="text-xs font-black uppercase tracking-widest text-[#5A1226] bg-[#5A1226]/8 px-3.5 py-1 rounded-full border border-[#5A1226]/20">
                Official Educational Consultancy
              </span>

              <div
                className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-extrabold shadow-2xs border ${currentSlide.badgeColor}`}
              >
                {currentSlide.categoryType === 'intake' && <Calendar className="w-3.5 h-3.5" />}
                {currentSlide.categoryType === 'event' && <Sparkles className="w-3.5 h-3.5" />}
                {currentSlide.categoryType === 'scholarship' && <Award className="w-3.5 h-3.5" />}
                {currentSlide.categoryType === 'arrival' && <Home className="w-3.5 h-3.5" />}
                <span>{currentSlide.category}</span>
              </div>

              {/* Campus Background Indicator Badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-stone-200/90 text-[11px] font-bold text-slate-700 shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-[#E5A823]" />
                <span className="truncate max-w-[200px] sm:max-w-none">📍 Campus: {currentSlide.sceneTitle}</span>
              </div>
            </div>

            {/* Main Headline with Dynamic Dual-Tone Typography */}
            <div className="space-y-1">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight leading-[1.08] sm:leading-[1.06]">
                <span className="text-[#C2850A] block drop-shadow-2xs">
                  {currentSlide.brandHeadingGold}
                </span>
                <span className="text-[#5A1226] block drop-shadow-2xs">
                  {currentSlide.brandHeadingBurgundy}
                </span>
              </h1>
            </div>

            {/* Pill Tagline */}
            <div className="inline-flex items-center self-start bg-gradient-to-r from-[#5A1226] via-[#721832] to-[#5A1226] text-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-full shadow-md border border-[#E5A823]/40">
              <span className="text-xs sm:text-sm md:text-base font-bold tracking-wide">
                {currentSlide.taglinePill}
              </span>
            </div>

            {/* Descriptive Summary */}
            <p className="text-slate-700 text-xs sm:text-base md:text-lg leading-relaxed max-w-2xl font-medium">
              {currentSlide.description}
            </p>

            {/* Key Assurance Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-2.5 pt-1 max-w-2xl">
              {currentSlide.highlights.map((highlight, hIdx) => (
                <div
                  key={hIdx}
                  className="flex items-center gap-2 bg-white/95 px-3 py-2 rounded-xl border border-stone-200/90 text-xs text-slate-800 font-bold shadow-2xs"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span className="truncate">{highlight}</span>
                </div>
              ))}
            </div>

            {/* Action Call to Action Buttons: Clean 2-Button Executive Dock */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 pt-2">
              {/* Primary CTA: Find Your Ideal Study Pathway (triggers smooth scroll to featured destinations) */}
              <button
                id="hero-cta-find-study-pathway"
                onClick={scrollToFeaturedDestinations}
                className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3.5 rounded-xl bg-[#5A1226] hover:bg-[#721832] text-white font-extrabold text-sm tracking-wide shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5 active:translate-y-0 border border-[#E5A823]/40 cursor-pointer group"
              >
                <Compass className="w-4 h-4 text-[#E5A823] group-hover:rotate-45 transition-transform" />
                <span>Find Your Ideal Study Pathway</span>
                <ChevronDown className="w-4 h-4 text-[#E5A823] group-hover:translate-y-0.5 transition-transform" />
              </button>

              {/* Dynamic Contextual Action based on current slide */}
              <button
                id="hero-cta-slide-action"
                onClick={() => handleAction(currentSlide.ctaPrimaryAction)}
                className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3.5 rounded-xl bg-white hover:bg-stone-50 text-slate-800 hover:text-[#5A1226] font-bold text-sm border border-stone-300 hover:border-[#5A1226] shadow-2xs transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer group"
              >
                <GraduationCap className="w-4 h-4 text-[#5A1226]" />
                <span>{currentSlide.ctaPrimaryText}</span>
              </button>

              {/* Direct Telephone Inquiry Link */}
              <a
                id="hero-full-carousel-cta-phone"
                href={`tel:${agencyInfo.cleanPhone}`}
                className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-[#5A1226] transition-colors py-2 px-3 rounded-lg hover:bg-stone-100/80"
              >
                <PhoneCall className="w-3.5 h-3.5 text-[#E5A823]" />
                <span>Call: {agencyInfo.phone}</span>
              </a>
            </div>

            {/* Unified Sleek Slide Segment Bar */}
            <div className="pt-2 max-w-2xl">
              <div className="bg-white/95 backdrop-blur-md rounded-2xl p-2 sm:p-2.5 border border-stone-200 shadow-sm">
                <div className="flex items-center gap-2">
                  
                  {/* Minimal Previous / Next Slide Controls */}
                  <div className="flex items-center gap-1 pr-2 border-r border-stone-200">
                    <button
                      onClick={goToPrevSlide}
                      aria-label="Previous slide"
                      className="p-1.5 rounded-lg hover:bg-stone-100 text-slate-600 hover:text-[#5A1226] transition-colors cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={goToNextSlide}
                      aria-label="Next slide"
                      className="p-1.5 rounded-lg hover:bg-stone-100 text-slate-600 hover:text-[#5A1226] transition-colors cursor-pointer"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                  {/* 4 Segmented Slide Progress Items */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-2 flex-1">
                    {HERO_SLIDES.map((slide, sIdx) => {
                      const isActive = sIdx === currentSlideIndex;
                      return (
                        <button
                          key={slide.id}
                          onClick={() => setCurrentSlideIndex(sIdx)}
                          className={`text-left p-1.5 sm:p-2 rounded-xl transition-all cursor-pointer group ${
                            isActive
                              ? 'bg-stone-50 border border-stone-200/80 shadow-2xs'
                              : 'hover:bg-stone-50/70 border border-transparent'
                          }`}
                        >
                          {/* Segment Progress Line */}
                          <div className="w-full h-1 bg-stone-200 rounded-full overflow-hidden mb-1.5">
                            {isActive ? (
                              <div
                                key={`progress-${sIdx}-${currentSlideIndex}`}
                                className="h-full bg-gradient-to-r from-[#5A1226] to-[#E5A823] animate-hero-progress"
                              />
                            ) : (
                              <div className="h-full w-0" />
                            )}
                          </div>

                          {/* Slide Number & Title */}
                          <div className="flex items-center gap-1.5">
                            <span
                              className={`text-[10px] font-black uppercase tracking-wider ${
                                isActive ? 'text-[#C2850A]' : 'text-slate-400'
                              }`}
                            >
                              {`0${sIdx + 1}`}
                            </span>
                            <span
                              className={`text-xs font-bold truncate ${
                                isActive
                                  ? 'text-[#5A1226]'
                                  : 'text-slate-600 group-hover:text-slate-900'
                              }`}
                            >
                              {slide.tabLabel.replace(/^\d+\.\s*/, '')}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                </div>
              </div>
            </div>

          </div>

          {/* Right Column: 3 Core Assurances Dock & Quick Overview */}
          <div className="lg:col-span-4 hidden lg:flex flex-col space-y-4">
            
            <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 border-2 border-stone-200 shadow-xl space-y-5">
              
              <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-black uppercase tracking-wider text-[#5A1226]">
                    Agency Assurances
                  </span>
                </div>
                <span className="text-[11px] font-bold text-slate-500">
                  {currentSlideIndex + 1} of {HERO_SLIDES.length}
                </span>
              </div>

              {/* 3 Value Pillars */}
              <div className="space-y-3 text-xs">
                <div className="flex items-start gap-3 p-3 rounded-2xl bg-[#FAF8F5] border border-stone-200/90 hover:border-[#5A1226]/40 transition-colors">
                  <div className="p-2 rounded-xl bg-[#5A1226]/10 text-[#5A1226]">
                    <Globe2 className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-sm">5 Global Hubs</p>
                    <p className="text-slate-600 text-xs">Italy, Thailand, China, Malaysia & Cambodia</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-2xl bg-[#FAF8F5] border border-stone-200/90 hover:border-[#5A1226]/40 transition-colors">
                  <div className="p-2 rounded-xl bg-[#5A1226]/10 text-[#5A1226]">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-sm">Zero Markups</p>
                    <p className="text-slate-600 text-xs">100% Direct Official Institution Fees</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-2xl bg-[#FAF8F5] border border-stone-200/90 hover:border-[#5A1226]/40 transition-colors">
                  <div className="p-2 rounded-xl bg-[#5A1226]/10 text-[#5A1226]">
                    <Compass className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-sm">Full Transition</p>
                    <p className="text-slate-600 text-xs">Safe Care from Landing to Dorm Check-In</p>
                  </div>
                </div>
              </div>

              {/* Quick Prompt Button to Services */}
              <button
                onClick={() => setActivePage('services')}
                className="w-full py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-[#5A1226] font-bold text-xs flex items-center justify-center gap-1.5 transition-colors border border-stone-200 cursor-pointer"
              >
                <Layers className="w-3.5 h-3.5 text-[#E5A823]" />
                <span>Explore Full Service Breakdown</span>
              </button>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
