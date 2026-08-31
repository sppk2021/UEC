import React from 'react';
import {
  GraduationCap,
  ArrowRight,
  ShieldCheck,
  Globe2,
  Compass,
  CheckCircle2,
  PhoneCall,
} from 'lucide-react';
import { CrestLogo } from './CrestLogo';
import { ChevronDeco } from './ChevronDeco';
import { useWebsite } from '../context/WebsiteContext';

interface HeroProps {
  onOpenConsultation?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenConsultation }) => {
  const { data } = useWebsite();
  const { heroContent, agencyInfo } = data;

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FAF8F5] via-[#F4EFEB] to-[#ECE6DE] pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-stone-200">
      {/* Decorative Dot Matrix in top right & left */}
      <div className="absolute top-4 right-4 w-40 h-40 bg-dot-pattern opacity-40 pointer-events-none hidden md:block" />
      <div className="absolute bottom-10 left-6 w-32 h-32 bg-dot-pattern-burgundy opacity-20 pointer-events-none hidden lg:block" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Visual Brand Typography matching Slide 1 */}
          <div className="lg:col-span-7 flex flex-col space-y-6">
            
            {/* Top Emblem & Brand Stamp */}
            <div className="flex items-center gap-3">
              <CrestLogo variant="full" />
              <div className="h-8 w-px bg-stone-300 mx-1 hidden sm:block" />
              <span className="hidden sm:inline-flex items-center text-xs font-semibold text-stone-600 tracking-wider uppercase bg-white/80 px-3 py-1 rounded-full border border-stone-200 shadow-xs">
                Official Educational Consultancy
              </span>
            </div>

            {/* Main Title matching Slide 1: U Education in Gold, Consultant Agency in Burgundy */}
            <div className="space-y-1">
              <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight leading-[1.08]">
                <span className="text-[#E5A823] block drop-shadow-xs">
                  {heroContent.brandLine1}
                </span>
                <span className="text-[#5A1226] block">
                  {heroContent.brandLine2}
                </span>
              </h1>
            </div>

            {/* Tagline Badge matching Slide 1 Pill */}
            <div className="inline-flex items-center self-start max-w-2xl bg-gradient-to-r from-[#23415F] to-[#162D42] text-white px-5 py-2.5 rounded-full shadow-md border border-cyan-800/40">
              <span className="text-sm sm:text-base font-medium tracking-wide">
                {heroContent.pillTagline}
              </span>
            </div>

            {/* Supporting Summary */}
            <p className="text-slate-700 text-base sm:text-lg leading-relaxed max-w-xl">
              {heroContent.summaryText}
            </p>

            {/* Key Assurance Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="flex items-center gap-2.5 bg-white/90 p-3 rounded-xl border border-stone-200 shadow-2xs">
                <Globe2 className="w-5 h-5 text-[#E5A823] flex-shrink-0" />
                <div className="text-xs">
                  <p className="font-bold text-[#5A1226]">4 Global Hubs</p>
                  <p className="text-slate-600 text-[11px]">Italy, Thailand, China, Malaysia</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 bg-white/90 p-3 rounded-xl border border-stone-200 shadow-2xs">
                <ShieldCheck className="w-5 h-5 text-[#E5A823] flex-shrink-0" />
                <div className="text-xs">
                  <p className="font-bold text-[#5A1226]">Zero Markups</p>
                  <p className="text-slate-600 text-[11px]">100% Direct Official Fees</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 bg-white/90 p-3 rounded-xl border border-stone-200 shadow-2xs">
                <Compass className="w-5 h-5 text-[#E5A823] flex-shrink-0" />
                <div className="text-xs">
                  <p className="font-bold text-[#5A1226]">Full Transition</p>
                  <p className="text-slate-600 text-[11px]">Care Until Dorm Check-In</p>
                </div>
              </div>
            </div>

            {/* Call to Actions */}
            <div className="flex flex-wrap items-center gap-3.5 pt-4">
              <button
                id="hero-cta-assessment"
                onClick={() => {
                  if (onOpenConsultation) {
                    onOpenConsultation();
                  } else {
                    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#5A1226] hover:bg-[#721832] text-white font-bold text-sm tracking-wide shadow-md transition-all hover:scale-[1.02] active:scale-95 border border-[#E5A823]/40 cursor-pointer group"
              >
                <GraduationCap className="w-5 h-5 text-[#E5A823]" />
                <span>Book Free Student Assessment</span>
                <ArrowRight className="w-4 h-4 text-[#E5A823] transition-transform group-hover:translate-x-1" />
              </button>

              <a
                id="hero-cta-destinations"
                href="#destinations"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white hover:bg-stone-100 text-[#5A1226] font-bold text-sm border border-stone-300 shadow-2xs transition-all hover:border-[#E5A823]"
              >
                <span>Explore Destinations</span>
              </a>

              <a
                id="hero-cta-call"
                href={`tel:${agencyInfo.cleanPhone}`}
                className="inline-flex items-center gap-1.5 px-4 py-3.5 rounded-full text-slate-700 hover:text-[#5A1226] font-semibold text-xs transition-colors"
              >
                <PhoneCall className="w-4 h-4 text-[#E5A823]" />
                <span>{agencyInfo.phone}</span>
              </a>
            </div>

          </div>

          {/* Right Column: Hero Visual Frame matching Slide 1 Aesthetic with graduate & chevrons */}
          <div className="lg:col-span-5 relative">
            
            {/* Top Chevron Ornament from Slide 1 */}
            <div className="absolute -top-6 right-6 z-20">
              <ChevronDeco count={4} size="lg" color="#E5A823" />
            </div>

            {/* Main Visual Image Card with Rounded Architectural Shape */}
            <div className="relative mx-auto max-w-md lg:max-w-none rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-stone-900">
              
              {/* Graduate on stairs photo */}
              <div className="relative h-[420px] sm:h-[480px] w-full overflow-hidden">
                <img
                  src={heroContent.imageUrl || "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1200&auto=format&fit=crop"}
                  alt="U Education graduate stepping towards global academic opportunities"
                  className="w-full h-full object-cover object-center transform scale-105 hover:scale-100 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                
                {/* Elegant overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#5A1226]/90 via-[#5A1226]/30 to-transparent" />
                
                {/* Floating Bottom Card */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md rounded-2xl p-4 border border-stone-200/80 shadow-lg">
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">
                          {heroContent.acceptingIntakesText}
                        </span>
                      </div>
                      <p className="text-xs font-bold text-[#5A1226]">
                        Italy • Thailand • China • Malaysia
                      </p>
                      <p className="text-[11px] text-slate-600">
                        Full scholarship applications & visa preparation open
                      </p>
                    </div>

                    <a
                      href="#assessment-tool"
                      className="flex-shrink-0 p-2.5 rounded-xl bg-[#5A1226] text-white hover:bg-[#721832] transition-colors"
                      title="Try Assessment Tool"
                    >
                      <ArrowRight className="w-4 h-4 text-[#E5A823]" />
                    </a>
                  </div>
                </div>

                {/* Top Badge on image */}
                <div className="absolute top-4 left-4 bg-[#5A1226]/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 border border-[#E5A823]/40">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#E5A823]" />
                  <span>Licensed Education Consultant</span>
                </div>

              </div>

            </div>

            {/* Bottom 3 Dots Accent from Slide 1 & 8 */}
            <div className="flex justify-end gap-2 mt-4 pr-6">
              <span className="w-3 h-3 rounded-full bg-[#E5A823]" />
              <span className="w-3 h-3 rounded-full bg-[#E5A823]/60" />
              <span className="w-3 h-3 rounded-full bg-[#E5A823]/30" />
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

