import React, { useState, useEffect } from 'react';
import {
  DollarSign,
  GraduationCap,
  Calendar,
  ChevronRight,
  BookOpen,
  CheckCircle2,
  Building2,
  Sparkles,
  Award,
} from 'lucide-react';
import { CrestLogo } from '../components/CrestLogo';
import { CountryFlag } from '../components/CountryFlag';
import { useWebsite } from '../context/WebsiteContext';

interface DestinationsPageProps {
  onOpenConsultationModal?: () => void;
}

export const DestinationsPage: React.FC<DestinationsPageProps> = ({ onOpenConsultationModal }) => {
  const { data, setActivePage, selectedDestinationId, setSelectedDestinationId } = useWebsite();
  const destinations = data.destinations;

  const [selectedCountryId, setSelectedCountryId] = useState<string>(() => {
    if (selectedDestinationId && destinations.some((d) => d.id === selectedDestinationId)) {
      return selectedDestinationId;
    }
    return destinations[0]?.id || 'italy';
  });
  const [activeTab, setActiveTab] = useState<'overview' | 'scholarships' | 'universities' | 'costs'>('overview');

  // Synchronize when navigated with a specific destinationId
  useEffect(() => {
    if (selectedDestinationId && destinations.some((d) => d.id === selectedDestinationId)) {
      setSelectedCountryId(selectedDestinationId);
      // Smoothly scroll to the detail view if coming from external click
      const el = document.getElementById('country-detail-view');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [selectedDestinationId, destinations]);

  const handleSelectCountry = (id: string) => {
    setSelectedCountryId(id);
    setSelectedDestinationId(id);
  };

  const selectedDest =
    destinations.find((d) => d.id === selectedCountryId) || destinations[0];

  const getCountryTheme = (id: string) => {
    switch (id) {
      case 'italy':
        return {
          bgBadge: 'bg-emerald-50 text-emerald-800 border-emerald-200',
          borderActive: 'border-emerald-600 bg-emerald-50/40 text-emerald-900 ring-2 ring-emerald-500/30',
          headerGradient: 'from-emerald-800 via-teal-900 to-slate-900',
          accent: 'text-emerald-700',
          accentBg: 'bg-emerald-600',
        };
      case 'thailand':
        return {
          bgBadge: 'bg-rose-50 text-rose-800 border-rose-200',
          borderActive: 'border-rose-600 bg-rose-50/40 text-rose-900 ring-2 ring-rose-500/30',
          headerGradient: 'from-rose-800 via-red-900 to-slate-900',
          accent: 'text-rose-700',
          accentBg: 'bg-rose-600',
        };
      case 'china':
        return {
          bgBadge: 'bg-amber-50 text-amber-900 border-amber-200',
          borderActive: 'border-amber-600 bg-amber-50/40 text-amber-900 ring-2 ring-amber-500/30',
          headerGradient: 'from-amber-800 via-red-950 to-slate-900',
          accent: 'text-amber-700',
          accentBg: 'bg-amber-600',
        };
      case 'malaysia':
        return {
          bgBadge: 'bg-blue-50 text-blue-900 border-blue-200',
          borderActive: 'border-blue-600 bg-blue-50/40 text-blue-900 ring-2 ring-blue-500/30',
          headerGradient: 'from-blue-900 via-indigo-950 to-slate-900',
          accent: 'text-blue-700',
          accentBg: 'bg-blue-600',
        };
      case 'cambodia':
      default:
        return {
          bgBadge: 'bg-indigo-50 text-indigo-900 border-indigo-200',
          borderActive: 'border-indigo-600 bg-indigo-50/40 text-indigo-900 ring-2 ring-indigo-500/30',
          headerGradient: 'from-indigo-800 via-blue-950 to-slate-900',
          accent: 'text-indigo-700',
          accentBg: 'bg-indigo-600',
        };
    }
  };

  const currentTheme = getCountryTheme(selectedDest.id);

  return (
    <div className="bg-[#FAF8F5] min-h-screen">
      {/* 1. Bright Modern Page Header */}
      <section className="relative py-14 sm:py-20 bg-gradient-to-b from-white via-[#F9F6F0] to-[#FAF8F5] border-b border-stone-200 overflow-hidden">
        {/* Subtle Decorative Accents */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#E5A823]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#5A1226]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col items-start max-w-3xl space-y-4">
            <div className="flex items-center gap-3">
              <CrestLogo variant="full" />
              <div className="h-6 w-px bg-stone-300 hidden sm:block" />
              <span className="text-xs font-bold uppercase tracking-widest text-[#5A1226] bg-[#5A1226]/5 px-3 py-1 rounded-full border border-[#5A1226]/15">
                5 Global Study Portfolios
              </span>
            </div>

            <div className="space-y-2">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#5A1226] leading-tight">
                Our Study <span className="text-[#E5A823]">Destinations</span>
              </h1>
              <div className="w-20 h-1.5 bg-[#E5A823] rounded-full" />
            </div>

            <p className="text-slate-700 text-base sm:text-lg leading-relaxed pt-1">
              Explore specialized pathways across <strong>Italy</strong>, <strong>Thailand</strong>, <strong>China</strong>, <strong>Malaysia</strong>, and <strong>Cambodia</strong>. From European public research institutes with 100% regional scholarships to prestigious British/Australian branch campuses and local ASEAN liaison support.
            </p>
          </div>

          {/* 5 Country Selection Cards Grid (Modern, Colorful & Clean) */}
          <div className="mt-10 pt-6 border-t border-stone-200 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4">
            {destinations.map((dest) => {
              const isSelected = dest.id === selectedCountryId;
              const theme = getCountryTheme(dest.id);

              return (
                <button
                  key={dest.id}
                  id={`dest-nav-btn-${dest.id}`}
                  onClick={() => handleSelectCountry(dest.id)}
                  className={`p-4 sm:p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between cursor-pointer text-left shadow-xs hover:shadow-md ${
                    isSelected
                      ? `${theme.borderActive} bg-white shadow-lg scale-[1.02]`
                      : 'bg-white hover:bg-stone-50 text-slate-800 border-stone-200'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CountryFlag country={dest.country} code={dest.code} size="md" />
                        <span className="text-xl filter drop-shadow-xs">{dest.flagEmoji}</span>
                      </div>
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-stone-100 text-slate-700 border border-stone-200">
                        {dest.code}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-base sm:text-lg font-black text-slate-900 leading-snug">
                        {dest.country}
                      </h3>
                      <p className="text-[11px] text-slate-500 font-medium line-clamp-1 mt-0.5">
                        {dest.highlightBadge.split('•')[0]}
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 mt-3 border-t border-stone-100 flex items-center justify-between text-[11px] font-bold">
                    <span className={isSelected ? theme.accent : 'text-slate-500'}>
                      {isSelected ? 'Viewing Guide' : 'Explore'}
                    </span>
                    <ChevronRight
                      className={`w-4 h-4 transition-transform ${
                        isSelected ? `translate-x-1 ${theme.accent}` : 'text-slate-400'
                      }`}
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 2. Detailed Country View (Clean, Colorful & Engaging) */}
      <section id="country-detail-view" className="py-12 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-20">
        <div className="bg-white rounded-3xl border border-stone-200 shadow-xl overflow-hidden">
          
          {/* Country Top Banner with High-Res Visual */}
          <div className="relative p-8 sm:p-12 text-white overflow-hidden">
            {/* Background Country Photo */}
            <div className="absolute inset-0 z-0">
              <img
                src={
                  selectedDest.imageUrl ||
                  'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=1200&auto=format&fit=crop'
                }
                alt={`Study in ${selectedDest.country}`}
                className="w-full h-full object-cover object-center filter brightness-[0.4] saturate-[1.15]"
                referrerPolicy="no-referrer"
              />
              <div className={`absolute inset-0 bg-gradient-to-r ${currentTheme.headerGradient} opacity-90`} />
            </div>

            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              <div className="space-y-4 max-w-2xl">
                <div className="flex flex-wrap items-center gap-2.5">
                  <CountryFlag country={selectedDest.country} code={selectedDest.code} size="xl" />
                  <span className="text-2xl filter drop-shadow-md">{selectedDest.flagEmoji}</span>
                  <span className="px-3 py-1 rounded-md bg-[#E5A823] text-[#5A1226] text-xs font-black uppercase tracking-wider shadow-sm">
                    {selectedDest.code} • {selectedDest.highlightBadge}
                  </span>
                </div>

                <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                  Study in {selectedDest.country}
                </h2>

                <p className="text-slate-100 text-sm sm:text-base leading-relaxed font-medium">
                  {selectedDest.tagline}
                </p>

                <p className="text-slate-200 text-xs sm:text-sm leading-relaxed">
                  {selectedDest.description}
                </p>
              </div>

              {/* Top Quick Stats & Apply Button */}
              <div className="flex flex-col sm:flex-row lg:flex-col gap-3 flex-shrink-0">
                <button
                  onClick={() => {
                    if (onOpenConsultationModal) {
                      onOpenConsultationModal();
                    } else {
                      setActivePage('contact');
                    }
                  }}
                  className="px-8 py-4 rounded-full bg-[#E5A823] hover:bg-[#d49515] text-[#5A1226] font-black text-sm shadow-xl transition-all hover:scale-105 cursor-pointer whitespace-nowrap text-center"
                >
                  Apply for {selectedDest.country} 2026/27
                </button>

                <div className="p-4 rounded-2xl bg-black/40 backdrop-blur-md border border-white/20 text-xs space-y-1.5">
                  <div className="flex justify-between gap-4">
                    <span className="text-slate-300">Avg. Tuition:</span>
                    <span className="font-bold text-white">{selectedDest.avgTuition.split('(')[0]}</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-slate-300">Living Cost:</span>
                    <span className="font-bold text-amber-300">{selectedDest.livingCost}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sub-Tabs for Country Details */}
          <div className="border-b border-stone-200 bg-stone-50 px-6 sm:px-12 flex flex-wrap gap-2 pt-3">
            {[
              { id: 'overview', label: 'Overview & Key Facts', icon: BookOpen },
              { id: 'scholarships', label: 'Scholarships & Grants', icon: Award },
              { id: 'universities', label: 'Top Universities & Majors', icon: Building2 },
              { id: 'costs', label: 'Tuition & Living Costs', icon: DollarSign },
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={`px-5 py-3 text-xs sm:text-sm font-bold border-b-2 flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'border-[#5A1226] text-[#5A1226] bg-white rounded-t-xl shadow-xs'
                      : 'border-transparent text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab Content Panels */}
          <div className="p-6 sm:p-12">
            
            {/* 1. Overview */}
            {activeTab === 'overview' && (
              <div className="space-y-8 animate-in fade-in duration-200">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  
                  <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-stone-200 space-y-2">
                    <div className="flex items-center gap-2 text-[#5A1226] font-bold text-sm">
                      <Calendar className="w-4 h-4 text-[#E5A823]" />
                      <span>Intake Periods</span>
                    </div>
                    <ul className="space-y-1 text-xs text-slate-700">
                      {selectedDest.intakes.map((intake, i) => (
                        <li key={i} className="flex items-center gap-1.5 font-medium">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#E5A823]" />
                          <span>{intake}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-stone-200 space-y-2">
                    <div className="flex items-center gap-2 text-[#5A1226] font-bold text-sm">
                      <Sparkles className="w-4 h-4 text-[#E5A823]" />
                      <span>Language Requirements</span>
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed font-medium">
                      {selectedDest.languageReq}
                    </p>
                  </div>

                  <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-stone-200 space-y-2">
                    <div className="flex items-center gap-2 text-[#5A1226] font-bold text-sm">
                      <Award className="w-4 h-4 text-[#E5A823]" />
                      <span>Scholarship Coverage</span>
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed font-medium">
                      {selectedDest.highlightBadge}
                    </p>
                  </div>

                </div>

                {/* Popular Majors */}
                <div className="space-y-3">
                  <h4 className="text-base font-bold text-[#5A1226] flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-[#E5A823]" />
                    <span>In-Demand Programs for International Students</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {selectedDest.popularPrograms.map((program, pIdx) => (
                      <div
                        key={pIdx}
                        className="p-3.5 rounded-xl bg-white border border-stone-200 text-xs font-semibold text-slate-800 flex items-center gap-2 shadow-2xs hover:border-[#E5A823]"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                        <span>{program}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* In-Country Office Hub Spotlight */}
                <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-50/60 to-stone-50 border border-amber-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{selectedDest.flagEmoji}</span>
                      <h4 className="text-sm font-black text-[#5A1226]">
                        Direct Student Welfare & Liaison Support in {selectedDest.country}
                      </h4>
                    </div>
                    <p className="text-xs text-slate-600">
                      Our in-country liaison team provides airport reception, verified student housing, and orientation assistance.
                    </p>
                  </div>
                  <button
                    onClick={() => setActivePage('offices')}
                    className="px-5 py-2.5 rounded-full bg-[#5A1226] hover:bg-[#721832] text-white font-bold text-xs shadow-xs transition-colors whitespace-nowrap cursor-pointer"
                  >
                    View Local Office
                  </button>
                </div>

              </div>
            )}

            {/* 2. Scholarships */}
            {activeTab === 'scholarships' && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="p-6 rounded-2xl bg-amber-50/50 border border-amber-200 space-y-3">
                  <div className="flex items-center gap-2 text-[#5A1226] font-bold text-base">
                    <Award className="w-5 h-5 text-[#E5A823]" />
                    <span>Official Scholarship Framework: {selectedDest.country}</span>
                  </div>
                  <p className="text-slate-700 text-sm leading-relaxed">
                    {selectedDest.scholarshipInfo}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
                    <h5 className="font-bold text-xs uppercase tracking-wider text-[#5A1226]">
                      Eligibility Assessment
                    </h5>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Evaluated on high school/bachelor GPA, English proficiency, and family economic background (for regional DSU grants).
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
                    <h5 className="font-bold text-xs uppercase tracking-wider text-[#5A1226]">
                      Application Assistance
                    </h5>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Complete support for SOP drafting, official translations, financial declaration legalization, and portal filing.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* 3. Top Universities */}
            {activeTab === 'universities' && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <h4 className="text-base font-bold text-[#5A1226]">
                  Premier University Network in {selectedDest.country}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {selectedDest.topUniversities.map((uni, uIdx) => (
                    <div
                      key={uIdx}
                      className="p-5 rounded-2xl bg-[#FAF8F5] border border-stone-200 hover:border-[#E5A823] transition-all flex items-start gap-3.5 shadow-2xs"
                    >
                      <div className="p-2.5 rounded-xl bg-[#5A1226]/5 text-[#5A1226] flex-shrink-0">
                        <Building2 className="w-5 h-5 text-[#E5A823]" />
                      </div>
                      <div className="space-y-1">
                        <h5 className="font-bold text-slate-900 text-sm">{uni}</h5>
                        <p className="text-xs text-slate-500">
                          Accredited Degrees • English-Taught Programs
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 4. Costs */}
            {activeTab === 'costs' && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200 space-y-4">
                    <h4 className="font-bold text-[#5A1226] text-base">Annual Tuition Overview</h4>
                    <div className="text-2xl font-black text-slate-900">{selectedDest.avgTuition}</div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Institutions in {selectedDest.country} offer high return on educational investment. With regional or merit scholarships, tuition can be reduced up to 100%.
                    </p>
                  </div>

                  <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200 space-y-4">
                    <h4 className="font-bold text-[#5A1226] text-base">Estimated Monthly Living Cost</h4>
                    <div className="text-2xl font-black text-slate-900">{selectedDest.livingCost}</div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Includes student dormitory accommodation, food, local transport, SIM card, and daily expenses.
                    </p>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </section>

      {/* 3. Bottom Free Consultation Banner */}
      <section className="py-16 bg-gradient-to-r from-[#5A1226] via-[#721832] to-[#5A1226] text-white border-t border-stone-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <CrestLogo variant="light" />
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Need Help Choosing Your Study Destination?
          </h2>
          <p className="text-slate-200 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Schedule a confidential 1-on-1 profile evaluation with our counselors in Yangon, Mandalay, Bangkok, Phnom Penh, or online.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <button
              onClick={() => {
                if (onOpenConsultationModal) {
                  onOpenConsultationModal();
                } else {
                  setActivePage('contact');
                }
              }}
              className="px-8 py-3.5 rounded-full bg-[#E5A823] hover:bg-[#d49515] text-[#5A1226] font-black text-sm shadow-xl transition-all cursor-pointer"
            >
              Book Destination Counseling
            </button>
            <button
              onClick={() => setActivePage('blog')}
              className="px-8 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 transition-all cursor-pointer"
            >
              Read Destination Guides
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
