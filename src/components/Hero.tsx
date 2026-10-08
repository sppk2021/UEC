import React, { useState, useEffect } from 'react';
import {
  Compass,
  PhoneCall,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Calculator,
} from 'lucide-react';
import { CountryFlag } from './CountryFlag';
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
    ctaSecondaryText: 'Explore Study Destinations',
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

  const [touchStart, setTouchStart] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    if (diff > 50) {
      goToNextSlide();
    } else if (diff < -50) {
      goToPrevSlide();
    }
    setTouchStart(null);
  };

  return (
    <section
      id="hero-section"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative min-h-[560px] lg:min-h-[640px] flex flex-col justify-center overflow-hidden bg-[#FAF8F5] text-slate-900 group/hero"
    >
      {/* Discreet Edge Slide Navigation: Keeps moving slides controllable without any bar */}
      <button
        type="button"
        onClick={goToPrevSlide}
        aria-label="Previous slide"
        className="hidden sm:flex absolute left-3 md:left-5 top-1/2 -translate-y-1/2 z-35 p-2.5 rounded-full bg-white/75 hover:bg-white text-slate-700 hover:text-[#5A1226] backdrop-blur-md shadow-md border border-stone-200/90 transition-all opacity-40 group-hover/hero:opacity-100 hover:scale-105 active:scale-95 cursor-pointer"
      >
        <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>

      <button
        type="button"
        onClick={goToNextSlide}
        aria-label="Next slide"
        className="hidden sm:flex absolute right-3 md:right-5 top-1/2 -translate-y-1/2 z-35 p-2.5 rounded-full bg-white/75 hover:bg-white text-slate-700 hover:text-[#5A1226] backdrop-blur-md shadow-md border border-stone-200/90 transition-all opacity-40 group-hover/hero:opacity-100 hover:scale-105 active:scale-95 cursor-pointer"
      >
        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>

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

        {/* Soft, Light & Warm Gradient Overlays */}
        <div className="absolute inset-0 z-20 bg-gradient-to-r from-[#FAF8F5] via-[#FAF8F5]/85 to-[#FAF8F5]/25 lg:from-[#FAF8F5]/98 lg:via-[#FAF8F5]/70 lg:to-transparent" />
        <div className="absolute inset-0 z-20 bg-gradient-to-t from-[#FAF8F5]/90 via-transparent to-[#FAF8F5]/30" />
      </div>

      {/* 2. Main Hero Content Container */}
      <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex-1 flex flex-col justify-center w-full">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Main Left Editorial Typography */}
          <div key={currentSlide.id} className="lg:col-span-8 space-y-4 sm:space-y-5 animate-in fade-in duration-500">

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

            {/* Country flags for intakes slide, rendered cleanly without any pill or bar container */}
            {currentSlide.id === 'intakes-2026' && (
              <div className="flex items-center gap-2.5 pt-1">
                <CountryFlag country="italy" size="sm" />
                <CountryFlag country="thailand" size="sm" />
                <CountryFlag country="china" size="sm" />
                <CountryFlag country="malaysia" size="sm" />
                <CountryFlag country="cambodia" size="sm" />
              </div>
            )}

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

            {/* Action Call to Action Buttons */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 pt-2">
              {/* Dynamic Primary CTA based on slide */}
              <button
                id="hero-cta-slide-action"
                onClick={() => handleAction(currentSlide.ctaPrimaryAction)}
                className="inline-flex items-center justify-center gap-2 px-5 sm:px-7 py-3 rounded-xl bg-[#5A1226] hover:bg-[#721832] text-white font-extrabold text-xs sm:text-sm tracking-wide shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5 active:translate-y-0 border border-[#E5A823]/40 cursor-pointer group"
              >
                <Compass className="w-4 h-4 text-[#E5A823] group-hover:rotate-45 transition-transform" />
                <span>{currentSlide.ctaPrimaryText}</span>
                <ChevronRight className="w-4 h-4 text-[#E5A823] group-hover:translate-x-0.5 transition-transform" />
              </button>

              {/* Calculator CTA: Direct access to Budget & Living Cost Calculator */}
              <button
                id="hero-cta-budget-calculator"
                onClick={() => setActivePage('pathway', { pathwayTab: 'budget' })}
                className="inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-3 rounded-xl bg-white hover:bg-stone-50 text-slate-800 hover:text-[#5A1226] font-bold text-xs sm:text-sm border border-stone-300 hover:border-[#E5A823] shadow-2xs transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer group"
              >
                <Calculator className="w-4 h-4 text-[#E5A823]" />
                <span>Budget & Cost Calculator</span>
              </button>

              {/* Direct Telephone Inquiry Link */}
              <a
                id="hero-full-carousel-cta-phone"
                href={`tel:${agencyInfo.cleanPhone}`}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-[#5A1226] transition-colors py-2 px-2.5 rounded-lg hover:bg-stone-100/80"
              >
                <PhoneCall className="w-3.5 h-3.5 text-[#E5A823]" />
                <span>{agencyInfo.phone}</span>
              </a>
            </div>

          </div>

          {/* Right Column: Latest Announcements & Stories from Blogs */}
          <div className="lg:col-span-4 hidden lg:flex flex-col space-y-4">
            
            <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-5 sm:p-6 border-2 border-stone-200 shadow-xl space-y-4">
              
              <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#E5A823] animate-pulse" />
                  <span className="text-xs font-black uppercase tracking-wider text-[#5A1226]">
                    Announcements & Stories
                  </span>
                </div>
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 border border-amber-200">
                  Blogs & News
                </span>
              </div>

              {/* List of 3 Latest Blog Announcements */}
              <div className="space-y-3">
                {(data.blogPosts || []).slice(0, 3).map((post) => (
                  <div
                    key={post.id}
                    onClick={() => setActivePage('blog', { articleSlug: post.slug })}
                    className="p-3 rounded-2xl bg-[#FAF8F5] hover:bg-white border border-stone-200 hover:border-[#E5A823] transition-all cursor-pointer group shadow-2xs"
                  >
                    <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                      <span className="px-2 py-0.2 rounded font-bold bg-[#5A1226]/8 text-[#5A1226]">
                        {post.category}
                      </span>
                      <span>{post.publishedDate}</span>
                    </div>

                    <h4 className="text-xs font-bold text-slate-900 group-hover:text-[#5A1226] transition-colors line-clamp-2 leading-snug">
                      {post.title}
                    </h4>

                    <p className="text-[11px] text-slate-500 mt-1 line-clamp-1">
                      {post.subtitle || post.summary}
                    </p>
                  </div>
                ))}
              </div>

              {/* Direct Link to Blogs & Stories Page */}
              <button
                onClick={() => setActivePage('blog')}
                className="w-full py-2.5 rounded-xl bg-[#5A1226] hover:bg-[#721832] text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-xs cursor-pointer"
              >
                <span>View All Announcements & Stories</span>
                <ChevronRight className="w-3.5 h-3.5 text-[#E5A823]" />
              </button>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
