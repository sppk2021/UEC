import React, { Suspense, lazy } from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Award, Calculator } from 'lucide-react';
import { CrestLogo } from '../components/CrestLogo';
import { useWebsite } from '../context/WebsiteContext';

const InteractiveAssessmentTool = lazy(() =>
  import('../components/InteractiveAssessmentTool').then((m) => ({
    default: m.InteractiveAssessmentTool,
  }))
);

interface PathwayPageProps {
  onOpenConsultationModal?: () => void;
}

export const PathwayPage: React.FC<PathwayPageProps> = ({ onOpenConsultationModal }) => {
  const { setActivePage, pathwayTab, setPathwayTab } = useWebsite();

  return (
    <div className="bg-[#FAF8F5] min-h-screen">
      {/* 1. Page Landing Banner with Clean Educational Imagery */}
      <section className="relative py-12 sm:py-16 bg-[#5A1226] text-white overflow-hidden border-b border-[#E5A823]/25">
        <div className="absolute inset-0 bg-gradient-to-r from-[#5A1226] via-[#6B172F] to-[#450C1D] pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#E5A823]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-4">
              <CrestLogo variant="light" />
              <div className="space-y-2">
                <span className="text-xs font-black uppercase tracking-widest text-[#E5A823] bg-white/10 px-3.5 py-1 rounded-full border border-white/15 inline-block">
                  Unified Academic Profiling & Financial Estimator
                </span>
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
                  Study Pathway & <span className="text-[#E5A823]">Budget Calculator</span>
                </h1>
              </div>

              <p className="text-slate-200 text-sm sm:text-base leading-relaxed max-w-2xl font-medium">
                Unified destination matcher, scholarship feasibility forecaster, and interactive budget calculator tailored for <strong>Italy, Thailand, China, Malaysia, and Cambodia</strong>.
              </p>

              {/* Quick Pillars Mode Switcher */}
              <div className="flex flex-wrap gap-2.5 pt-2 text-xs">
                <button
                  type="button"
                  onClick={() => setPathwayTab('why')}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border transition-all cursor-pointer font-bold ${
                    pathwayTab === 'why' || pathwayTab === 'suggestions' || pathwayTab === 'universities'
                      ? 'bg-[#E5A823] text-[#5A1226] border-[#E5A823] shadow-md'
                      : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
                  }`}
                >
                  <Award className="w-4 h-4 text-current" />
                  <span>1. Pathway Profiler</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPathwayTab('budget')}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border transition-all cursor-pointer font-bold ${
                    pathwayTab === 'budget'
                      ? 'bg-[#E5A823] text-[#5A1226] border-[#E5A823] shadow-md'
                      : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
                  }`}
                >
                  <Calculator className="w-4 h-4 text-current" />
                  <span>2. Interactive Budget & Cost Calculator</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPathwayTab('comparison')}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border transition-all cursor-pointer font-bold ${
                    pathwayTab === 'comparison'
                      ? 'bg-[#E5A823] text-[#5A1226] border-[#E5A823] shadow-md'
                      : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
                  }`}
                >
                  <ShieldCheck className="w-4 h-4 text-current" />
                  <span>3. Side-by-Side Dual Country Comparison</span>
                </button>
              </div>
            </div>

            {/* Right Visual Badge Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20 bg-stone-900 group aspect-[16/10]">
                <img
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1200&auto=format&fit=crop"
                  alt="Students consulting on international university pathway"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 filter contrast-[1.03]"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#5A1226]/90 via-[#5A1226]/30 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#E5A823] text-[#5A1226] text-[10px] font-black uppercase">
                    <Sparkles className="w-3 h-3" />
                    <span>Algorithmic Matching Engine</span>
                  </div>
                  <p className="text-xs text-slate-100 font-medium">
                    Personalized according to your academic qualifications, GPA, and family financial goals.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Full Interactive Pathway & Budget Calculator Component */}
      <section className="py-6 sm:py-10">
        <Suspense
          fallback={
            <div className="max-w-7xl mx-auto px-4 py-16 text-center">
              <div className="inline-flex items-center gap-3 p-4 rounded-2xl bg-white border border-stone-200 shadow-md text-sm font-bold text-[#5A1226]">
                <div className="w-5 h-5 rounded-full border-2 border-[#5A1226] border-t-[#E5A823] animate-spin" />
                <span>Loading Study Pathway Engine & Budget Calculator...</span>
              </div>
            </div>
          }
        >
          <InteractiveAssessmentTool initialTab={pathwayTab} />
        </Suspense>
      </section>

      {/* 3. Bottom Consultation Call-to-Action */}
      <section className="py-16 bg-[#5A1226] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
            Have Questions About Your Pathway Results?
          </h2>
          <p className="text-slate-200 text-xs sm:text-sm max-w-xl mx-auto">
            Book a complimentary 1-on-1 counseling session with our certified education advisors in Yangon, Mandalay, Bangkok, or online.
          </p>
          <button
            onClick={() => {
              if (onOpenConsultationModal) {
                onOpenConsultationModal();
              } else {
                setActivePage('contact');
              }
            }}
            className="px-8 py-3.5 rounded-full bg-[#E5A823] hover:bg-[#d49515] text-[#5A1226] font-black text-xs sm:text-sm shadow-xl transition-all cursor-pointer hover:scale-105 inline-flex items-center gap-2"
          >
            <span>Book Free 1-on-1 Advising</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};
