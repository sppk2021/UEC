import React, { useState } from 'react';
import {
  Compass,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  RotateCcw,
  GraduationCap,
  Award,
  Globe2,
  DollarSign,
} from 'lucide-react';
import { useWebsite } from '../context/WebsiteContext';

export const InteractiveAssessmentTool: React.FC = () => {
  const { data } = useWebsite();
  const destinations = data.destinations;
  const agencyInfo = data.agencyInfo;

  const [educationLevel, setEducationLevel] = useState<string>('high_school');
  const [budgetTier, setBudgetTier] = useState<string>('scholarship');
  const [fieldOfInterest, setFieldOfInterest] = useState<string>('engineering');
  const [englishStatus, setEnglishStatus] = useState<string>('planning_ielts');
  const [showResult, setShowResult] = useState<boolean>(false);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setShowResult(true);
    // Smooth scroll to result
    setTimeout(() => {
      document.querySelector('#assessment-results-card')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleReset = () => {
    setShowResult(false);
  };

  // Determine top destination based on criteria
  const getRecommendation = () => {
    const italy = destinations.find((d) => d.id === 'italy') || destinations[0];
    const china = destinations.find((d) => d.id === 'china') || destinations[1] || destinations[0];
    const thailand = destinations.find((d) => d.id === 'thailand') || destinations[2] || destinations[0];
    const malaysia = destinations.find((d) => d.id === 'malaysia') || destinations[3] || destinations[0];

    if (budgetTier === 'scholarship') {
      return {
        primary: italy,
        secondary: china,
        scholarshipChance: 'High (85%–95%) for regional DSU or CSC scholarships',
        advice:
          'Italy and China offer the highest volume of public and full-ride scholarships with tuition waivers and living allowances. Perfect for students seeking world-class degrees on merit or economic assistance.',
      };
    } else if (budgetTier === 'affordable') {
      return {
        primary: thailand,
        secondary: malaysia,
        scholarshipChance: 'Moderate (25%–50% merit tuition bursary)',
        advice:
          'Thailand and Malaysia deliver prestigious international curricula and dual-degree British/Australian programs with affordable living costs and fast visa processing close to home.',
      };
    } else {
      return {
        primary: malaysia,
        secondary: italy,
        scholarshipChance: 'High (Dean’s awards & branch campus bursaries)',
        advice:
          'Malaysia’s top-tier UK/Australian branch campuses (Monash, Nottingham, Southampton) offer accredited Western degrees at a third of the onshore cost.',
      };
    }
  };

  const rec = getRecommendation();

  return (
    <section id="assessment-tool" className="py-16 sm:py-24 bg-[#FAF8F5] border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E5A823]/50 shadow-2xs">
            <Compass className="w-4 h-4 text-[#E5A823]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#5A1226]">
              Interactive Student Profiler
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#5A1226] tracking-tight">
            Find Your Ideal Study Pathway
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Select your academic profile, budget, and field of interest to explore customized study destinations in Italy, Thailand, China, and Malaysia.
          </p>
        </div>

        {/* Assessment Card Grid */}
        <div className="max-w-4xl mx-auto bg-white rounded-3xl p-6 sm:p-10 border-2 border-stone-200 shadow-xl">
          
          <form onSubmit={handleCalculate} className="space-y-8">
            
            {/* Step 1: Education Level */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-[#5A1226] flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#5A1226] text-white flex items-center justify-center text-[10px]">
                  1
                </span>
                Current Education Level
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { id: 'high_school', label: 'High School / Grade 12' },
                  { id: 'igcse', label: 'IGCSE / GED / A-Level' },
                  { id: 'bachelor', label: "Bachelor's Degree Graduate" },
                  { id: 'master', label: "Master's / Postgrad" },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setEducationLevel(item.id)}
                    className={`p-3.5 rounded-2xl text-xs font-bold text-left transition-all border cursor-pointer ${
                      educationLevel === item.id
                        ? 'bg-[#5A1226] text-white border-[#5A1226] shadow-sm'
                        : 'bg-[#FAF8F5] text-slate-700 border-stone-200 hover:border-[#E5A823]'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Budget & Scholarship Goal */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-[#5A1226] flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#5A1226] text-white flex items-center justify-center text-[10px]">
                  2
                </span>
                Budget & Scholarship Priority
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  {
                    id: 'scholarship',
                    label: 'Seeking Full / Regional Scholarship',
                    desc: 'Prioritize tuition waivers & stipends (Italy DSU / China CSC)',
                  },
                  {
                    id: 'affordable',
                    label: 'Affordable / Sustainable Tuition',
                    desc: '$2,500 – $6,500/year (Thailand / China / Malaysia)',
                  },
                  {
                    id: 'branch_campus',
                    label: 'Western Branch Campus & Dual Degrees',
                    desc: 'British/Australian degrees in Malaysia & Italy',
                  },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setBudgetTier(item.id)}
                    className={`p-4 rounded-2xl text-left transition-all border cursor-pointer ${
                      budgetTier === item.id
                        ? 'bg-[#5A1226] text-white border-[#5A1226] shadow-sm'
                        : 'bg-[#FAF8F5] text-slate-700 border-stone-200 hover:border-[#E5A823]'
                    }`}
                  >
                    <p className="text-xs font-bold">{item.label}</p>
                    <p className={`text-[11px] mt-1 ${budgetTier === item.id ? 'text-slate-200' : 'text-slate-500'}`}>
                      {item.desc}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Desired Major */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-[#5A1226] flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#5A1226] text-white flex items-center justify-center text-[10px]">
                  3
                </span>
                Intended Field of Study
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { id: 'engineering', label: 'Engineering & IT / AI' },
                  { id: 'business', label: 'Business, Finance & Trade' },
                  { id: 'medicine', label: 'Medicine & Health (MBBS)' },
                  { id: 'arts', label: 'Design, Architecture & Arts' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setFieldOfInterest(item.id)}
                    className={`p-3.5 rounded-2xl text-xs font-bold text-left transition-all border cursor-pointer ${
                      fieldOfInterest === item.id
                        ? 'bg-[#5A1226] text-white border-[#5A1226] shadow-sm'
                        : 'bg-[#FAF8F5] text-slate-700 border-stone-200 hover:border-[#E5A823]'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 4: English Language Status */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-[#5A1226] flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#5A1226] text-white flex items-center justify-center text-[10px]">
                  4
                </span>
                Language Proficiency Status
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: 'have_score', label: 'Have IELTS / Duolingo Score' },
                  { id: 'planning_ielts', label: 'Planning to Take IELTS / Duolingo' },
                  { id: 'need_coaching', label: 'Need Test Prep Coaching at UECA' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setEnglishStatus(item.id)}
                    className={`p-3 rounded-2xl text-xs font-bold text-left transition-all border cursor-pointer ${
                      englishStatus === item.id
                        ? 'bg-[#5A1226] text-white border-[#5A1226] shadow-sm'
                        : 'bg-[#FAF8F5] text-slate-700 border-stone-200 hover:border-[#E5A823]'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Calculate Button */}
            <div className="pt-4 flex flex-wrap items-center justify-between gap-4">
              <button
                type="submit"
                id="assessment-submit-btn"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#5A1226] hover:bg-[#721832] text-white font-bold text-sm tracking-wide shadow-lg transition-all hover:scale-105 active:scale-95 border border-[#E5A823]/40 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#E5A823]" />
                <span>Generate Recommended Study Pathway</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {showResult && (
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-[#5A1226] cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Form</span>
                </button>
              )}
            </div>

          </form>

          {/* Result Card */}
          {showResult && (
            <div
              id="assessment-results-card"
              className="mt-10 pt-8 border-t-2 border-[#E5A823] space-y-6 animate-in fade-in slide-in-from-top-6 duration-300"
            >
              <div className="bg-gradient-to-r from-[#5A1226] to-[#721832] text-white p-6 sm:p-8 rounded-3xl shadow-xl space-y-4">
                
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E5A823] text-[#5A1226] text-xs font-extrabold uppercase tracking-wider">
                    <Award className="w-3.5 h-3.5" />
                    <span>Top Matched Destination</span>
                  </div>
                  <span className="text-xs text-slate-300">
                    Scholarship Potential: <strong className="text-[#E5A823]">{rec.scholarshipChance}</strong>
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-5xl">{rec.primary.flagEmoji}</span>
                  <div>
                    <h3 className="text-3xl font-extrabold text-[#E5A823]">
                      {rec.primary.country}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-200">
                      {rec.primary.tagline}
                    </p>
                  </div>
                </div>

                <p className="text-sm text-slate-100 leading-relaxed bg-white/10 p-4 rounded-xl border border-white/10">
                  {rec.advice}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <div className="bg-black/20 p-3 rounded-xl">
                    <span className="text-[11px] text-[#E5A823] font-bold block uppercase">
                      Estimated Tuition
                    </span>
                    <span className="text-sm font-bold text-white">{rec.primary.avgTuition}</span>
                  </div>

                  <div className="bg-black/20 p-3 rounded-xl">
                    <span className="text-[11px] text-[#E5A823] font-bold block uppercase">
                      Living Cost
                    </span>
                    <span className="text-sm font-bold text-white">{rec.primary.livingCost}</span>
                  </div>

                  <div className="bg-black/20 p-3 rounded-xl">
                    <span className="text-[11px] text-[#E5A823] font-bold block uppercase">
                      Alternative Option
                    </span>
                    <span className="text-sm font-bold text-white">
                      {rec.secondary.flagEmoji} {rec.secondary.country}
                    </span>
                  </div>
                </div>

                {/* Consultation Forwarding */}
                <div className="pt-4 border-t border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="text-xs text-slate-200">
                    Ready to start your profiling? Connect with our senior counselor.
                  </div>

                  <a
                    href={`https://wa.me/${agencyInfo.whatsappNumber}?text=Hello%20U%20Education,%20my%20profiler%20result%20is%20${rec.primary.country}%20for%20${fieldOfInterest}.%20I%20would%20like%20to%20book%20a%20free%20assessment.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#E5A823] hover:bg-[#D49515] text-[#5A1226] font-bold text-xs uppercase tracking-wider transition-all shadow hover:scale-105"
                  >
                    <span>Submit Profile via WhatsApp</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>

              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};

