import React, { useState, useEffect } from 'react';
import {
  Compass,
  PhoneCall,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Calculator,
} from 'lucide-react';
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
      className="relative min-h-[560px] lg:min-h-[640px] flex flex-col justify-center overflow-hidden bg-[#FAF8F5] text-slate-900 border-b border-stone-200"
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
      <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex-1 flex flex-col justify-center w-full">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Main Left Editorial Typography */}
          <div key={currentSlide.id} className="lg:col-span-8 space-y-5 animate-in fade-in duration-500">

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

            {/* Action Call to Action Buttons: Clean Executive Dock */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 pt-1">
              {/* Primary CTA: Navigates directly to dedicated Study Pathway page */}
              <button
                id="hero-cta-find-study-pathway"
                onClick={() => setActivePage('pathway', { pathwayTab: 'why' })}
                className="inline-flex items-center justify-center gap-2 px-5 sm:px-7 py-3 rounded-xl bg-[#5A1226] hover:bg-[#721832] text-white font-extrabold text-xs sm:text-sm tracking-wide shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5 active:translate-y-0 border border-[#E5A823]/40 cursor-pointer group"
              >
                <Compass className="w-4 h-4 text-[#E5A823] group-hover:rotate-45 transition-transform" />
                <span>Find Your Ideal Study Pathway</span>
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

              {/* Dynamic Contextual Action based on current slide */}
              <button
                id="hero-cta-slide-action"
                onClick={() => handleAction(currentSlide.ctaPrimaryAction)}
                className="hidden xl:inline-flex items-center justify-center gap-1.5 px-3.5 py-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-slate-800 font-bold text-xs border border-stone-200 shadow-2xs transition-all cursor-pointer"
              >
                <span>{currentSlide.ctaPrimaryText}</span>
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

            {/* Minimal Compact Indicator Dots Bar (as requested in notes) */}
            <div className="pt-2 flex items-center gap-3">
              <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-stone-200/90 shadow-2xs">
                {/* Prev & Next arrows */}
                <button
                  onClick={goToPrevSlide}
                  aria-label="Previous slide"
                  className="p-1 rounded-full hover:bg-stone-100 text-slate-600 hover:text-[#5A1226] transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>

                {/* Minimal Dots */}
                <div className="flex items-center gap-2 px-1">
                  {HERO_SLIDES.map((slide, sIdx) => {
                    const isActive = sIdx === currentSlideIndex;
                    return (
                      <button
                        key={slide.id}
                        onClick={() => setCurrentSlideIndex(sIdx)}
                        title={slide.tabLabel}
                        className={`transition-all duration-300 rounded-full cursor-pointer ${
                          isActive
                            ? 'w-6 h-2 bg-[#5A1226]'
                            : 'w-2 h-2 bg-stone-300 hover:bg-stone-400'
                        }`}
                      />
                    );
                  })}
                </div>

                <button
                  onClick={goToNextSlide}
                  aria-label="Next slide"
                  className="p-1 rounded-full hover:bg-stone-100 text-slate-600 hover:text-[#5A1226] transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>

                <span className="text-[10px] font-bold text-slate-400 pl-1 border-l border-stone-200">
                  {`0${currentSlideIndex + 1} / 0${HERO_SLIDES.length}`}
                </span>
              </div>

              {/* Active Category Tag Pill */}
              <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${currentSlide.badgeColor}`}>
                {currentSlide.category}
              </span>
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
