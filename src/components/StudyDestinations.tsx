import React, { useState } from 'react';
import {
  DollarSign,
  Calendar,
  ChevronRight,
  ArrowRight,
  Award,
  Building2,
  Sparkles,
} from 'lucide-react';
import { CrestLogo } from './CrestLogo';
import { useWebsite } from '../context/WebsiteContext';

export const StudyDestinations: React.FC = () => {
  const { data, setActivePage } = useWebsite();
  const destinations = data.destinations;

  const [selectedCountryId, setSelectedCountryId] = useState<string>(destinations[0]?.id || 'italy');
  const [activeTab, setActiveTab] = useState<'overview' | 'scholarships' | 'universities'>('overview');

  const selectedDest =
    destinations.find((d) => d.id === selectedCountryId) || destinations[0];

  const getCountryTheme = (id: string) => {
    switch (id) {
      case 'italy':
        return {
          bgBadge: 'bg-emerald-50 text-emerald-800 border-emerald-200',
          borderActive: 'border-emerald-600 bg-white ring-2 ring-emerald-500/30',
          accent: 'text-emerald-700',
          accentBg: 'bg-emerald-600',
          topGlow: 'from-emerald-500/20 to-transparent',
        };
      case 'thailand':
        return {
          bgBadge: 'bg-rose-50 text-rose-800 border-rose-200',
          borderActive: 'border-rose-600 bg-white ring-2 ring-rose-500/30',
          accent: 'text-rose-700',
          accentBg: 'bg-rose-600',
          topGlow: 'from-rose-500/20 to-transparent',
        };
      case 'china':
        return {
          bgBadge: 'bg-amber-50 text-amber-900 border-amber-200',
          borderActive: 'border-amber-600 bg-white ring-2 ring-amber-500/30',
          accent: 'text-amber-700',
          accentBg: 'bg-amber-600',
          topGlow: 'from-amber-500/20 to-transparent',
        };
      case 'malaysia':
        return {
          bgBadge: 'bg-blue-50 text-blue-900 border-blue-200',
          borderActive: 'border-blue-600 bg-white ring-2 ring-blue-500/30',
          accent: 'text-blue-700',
          accentBg: 'bg-blue-600',
          topGlow: 'from-blue-500/20 to-transparent',
        };
      case 'cambodia':
      default:
        return {
          bgBadge: 'bg-indigo-50 text-indigo-900 border-indigo-200',
          borderActive: 'border-indigo-600 bg-white ring-2 ring-indigo-500/30',
          accent: 'text-indigo-700',
          accentBg: 'bg-indigo-600',
          topGlow: 'from-indigo-500/20 to-transparent',
        };
    }
  };

  return (
    <section id="destinations" className="py-16 sm:py-24 bg-[#FAF8F5] relative overflow-hidden border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Modern Clean Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-3xl">
            <div className="flex items-center gap-3">
              <CrestLogo variant="compact" />
              <span className="text-xs font-bold uppercase tracking-widest text-[#5A1226] bg-[#5A1226]/5 px-3 py-1 rounded-full border border-[#5A1226]/15">
                5 Global Study Portfolios
              </span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-[#5A1226] tracking-tight">
              Our Study <span className="text-[#E5A823]">Destinations</span>
            </h2>
            <div className="w-20 h-1.5 bg-[#E5A823] rounded-full" />
            
            <p className="text-slate-700 text-sm sm:text-base leading-relaxed pt-1">
              Streamlined pathways to premier universities in <strong>Italy</strong>, <strong>Thailand</strong>, <strong>China</strong>, <strong>Malaysia</strong>, and <strong>Cambodia</strong> with comprehensive scholarship advisory and verified in-country liaison support.
            </p>
          </div>

          <button
            onClick={() => setActivePage('destinations')}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#5A1226] hover:bg-[#721832] text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer whitespace-nowrap self-start md:self-auto"
          >
            <span>Explore All 5 Destinations</span>
            <ArrowRight className="w-4 h-4 text-[#E5A823]" />
          </button>
        </div>

        {/* 5 Country Cards Grid - Modern, Bright & Colorful */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 mb-12">
          {destinations.map((dest) => {
            const isSelected = dest.id === selectedCountryId;
            const theme = getCountryTheme(dest.id);

            return (
              <div
                key={dest.id}
                id={`destination-card-${dest.id}`}
                onClick={() => setSelectedCountryId(dest.id)}
                className={`rounded-3xl p-5 flex flex-col justify-between transition-all duration-300 border-2 cursor-pointer relative overflow-hidden shadow-xs hover:shadow-xl ${
                  isSelected
                    ? `${theme.borderActive} shadow-lg scale-[1.02]`
                    : 'bg-white hover:bg-stone-50 border-stone-200'
                }`}
              >
                {/* Top Colorful Accent Glow */}
                <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${theme.topGlow}`} />

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl filter drop-shadow-xs">{dest.flagEmoji}</span>
                    <span className="px-2.5 py-0.5 rounded-md text-[11px] font-black uppercase tracking-wider bg-stone-100 text-slate-800 border border-stone-200">
                      {dest.code}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-black text-slate-900 flex items-center gap-1.5">
                      <span>{dest.country}</span>
                    </h3>
                    <p className="text-xs text-slate-500 font-medium line-clamp-2 mt-1">
                      {dest.tagline}
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-stone-50 border border-stone-200/80 space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Tuition:</span>
                      <span className="font-bold text-slate-900">{dest.avgTuition.split('(')[0]}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Grants:</span>
                      <span className="font-bold text-[#5A1226]">{dest.highlightBadge.split('•')[0]}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-bold">
                  <span className={isSelected ? theme.accent : 'text-slate-600'}>
                    {isSelected ? 'Selected Guide' : 'View Guide'}
                  </span>
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                      isSelected ? `${theme.accentBg} text-white` : 'bg-stone-100 text-slate-600'
                    }`}
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Country Interactive Showcase */}
        {selectedDest && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-xl space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-stone-200">
              <div className="space-y-2 max-w-2xl">
                <div className="flex items-center gap-3">
                  <span className="text-4xl">{selectedDest.flagEmoji}</span>
                  <div>
                    <span className="text-xs font-black uppercase tracking-wider text-[#5A1226] block">
                      {selectedDest.code} • {selectedDest.highlightBadge}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
                      Study in {selectedDest.country}
                    </h3>
                  </div>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed font-medium">
                  {selectedDest.description}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setActivePage('contact')}
                  className="px-6 py-3 rounded-full bg-[#E5A823] hover:bg-[#d49515] text-[#5A1226] font-black text-xs sm:text-sm shadow-md transition-all cursor-pointer whitespace-nowrap"
                >
                  Apply for {selectedDest.country}
                </button>
                <button
                  onClick={() => setActivePage('destinations')}
                  className="px-6 py-3 rounded-full bg-stone-100 hover:bg-stone-200 text-slate-800 font-bold text-xs sm:text-sm transition-all cursor-pointer whitespace-nowrap"
                >
                  Full Country Portfolio
                </button>
              </div>
            </div>

            {/* Sub-Tabs */}
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'overview', label: 'Key Facts & Programs' },
                { id: 'scholarships', label: 'Scholarships' },
                { id: 'universities', label: 'Top Universities' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    activeTab === tab.id
                      ? 'bg-[#5A1226] text-white shadow-sm'
                      : 'bg-stone-100 text-slate-600 hover:bg-stone-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-stone-200 space-y-2">
                  <div className="flex items-center gap-2 text-[#5A1226] font-bold text-xs uppercase tracking-wider">
                    <Calendar className="w-4 h-4 text-[#E5A823]" />
                    <span>Intakes</span>
                  </div>
                  <ul className="text-xs text-slate-700 space-y-1">
                    {selectedDest.intakes.map((intake, i) => (
                      <li key={i} className="flex items-center gap-1.5 font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#E5A823]" />
                        <span>{intake}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-stone-200 space-y-2">
                  <div className="flex items-center gap-2 text-[#5A1226] font-bold text-xs uppercase tracking-wider">
                    <Sparkles className="w-4 h-4 text-[#E5A823]" />
                    <span>Language Requirement</span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed font-medium">
                    {selectedDest.languageReq}
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-stone-200 space-y-2">
                  <div className="flex items-center gap-2 text-[#5A1226] font-bold text-xs uppercase tracking-wider">
                    <DollarSign className="w-4 h-4 text-[#E5A823]" />
                    <span>Cost Estimation</span>
                  </div>
                  <p className="text-xs text-slate-700 font-medium">
                    Tuition: <strong className="text-slate-900">{selectedDest.avgTuition}</strong>
                  </p>
                  <p className="text-xs text-slate-700 font-medium">
                    Living: <strong className="text-slate-900">{selectedDest.livingCost}</strong>
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'scholarships' && (
              <div className="p-6 rounded-2xl bg-amber-50/50 border border-amber-200 space-y-2">
                <div className="flex items-center gap-2 text-[#5A1226] font-bold text-sm">
                  <Award className="w-4 h-4 text-[#E5A823]" />
                  <span>Scholarship Opportunities</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {selectedDest.scholarshipInfo}
                </p>
              </div>
            )}

            {activeTab === 'universities' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {selectedDest.topUniversities.map((uni, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-stone-50 border border-stone-200 flex items-center gap-2.5 text-xs font-semibold text-slate-800"
                  >
                    <Building2 className="w-4 h-4 text-[#5A1226] flex-shrink-0" />
                    <span>{uni}</span>
                  </div>
                ))}
              </div>
            )}

          </div>
        )}

      </div>
    </section>
  );
};
