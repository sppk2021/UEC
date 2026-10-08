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
  Globe,
  MapPin,
  Phone,
  Clock,
  ArrowRight,
} from 'lucide-react';
import { CrestLogo } from '../components/CrestLogo';
import { CountryFlag } from '../components/CountryFlag';
import { useWebsite } from '../context/WebsiteContext';

interface DestinationsPageProps {
  onOpenConsultationModal?: () => void;
  initialTab?: 'destinations' | 'offices';
}

export const DestinationsPage: React.FC<DestinationsPageProps> = ({
  onOpenConsultationModal,
  initialTab = 'destinations',
}) => {
  const { data, setActivePage, selectedDestinationId, setSelectedDestinationId } = useWebsite();
  const destinations = data.destinations;
  const offices = data.offices;
  const agencyInfo = data.agencyInfo;

  // Main combined switcher: 'destinations' | 'offices'
  const [mainTab, setMainTab] = useState<'destinations' | 'offices'>(initialTab);

  // Selected country in Study Destinations
  const [selectedCountryId, setSelectedCountryId] = useState<string>(() => {
    if (selectedDestinationId && destinations.some((d) => d.id === selectedDestinationId)) {
      return selectedDestinationId;
    }
    return destinations[0]?.id || 'italy';
  });

  // Country detail subtabs
  const [activeCountryTab, setActiveCountryTab] = useState<'overview' | 'scholarships' | 'universities' | 'costs'>('overview');

  // Selected office in Offices
  const [activeOfficeId, setActiveOfficeId] = useState<string>(offices[0]?.id || 'yangon');

  // Synchronize when initialTab prop updates
  useEffect(() => {
    if (initialTab) {
      setMainTab(initialTab);
    }
  }, [initialTab]);

  // Synchronize with URL hash or destinationId
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.toLowerCase();
      if (hash.includes('office')) {
        setMainTab('offices');
      } else if (hash.includes('destination')) {
        setMainTab('destinations');
      }
    }
  }, []);

  useEffect(() => {
    if (selectedDestinationId && destinations.some((d) => d.id === selectedDestinationId)) {
      setSelectedCountryId(selectedDestinationId);
      const el = document.getElementById('country-detail-view');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [selectedDestinationId, destinations]);

  const handleSelectCountry = (id: string) => {
    setSelectedCountryId(id);
    setSelectedDestinationId(id);
    setMainTab('destinations');
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

  const getOfficeTheme = (id: string) => {
    switch (id) {
      case 'yangon':
        return {
          flagEmoji: '🇲🇲',
          countryCode: 'MM',
          badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
          accent: 'text-emerald-700',
          accentBg: 'bg-emerald-600',
          cardBorder: 'hover:border-emerald-500',
          selectedBorder: 'border-emerald-600 ring-2 ring-emerald-500/20',
        };
      case 'mandalay':
        return {
          flagEmoji: '🇲🇲',
          countryCode: 'MM',
          badgeColor: 'bg-amber-50 text-amber-900 border-amber-200',
          accent: 'text-amber-700',
          accentBg: 'bg-amber-600',
          cardBorder: 'hover:border-amber-500',
          selectedBorder: 'border-amber-600 ring-2 ring-amber-500/20',
        };
      case 'bangkok':
        return {
          flagEmoji: '🇹🇭',
          countryCode: 'TH',
          badgeColor: 'bg-rose-50 text-rose-800 border-rose-200',
          accent: 'text-rose-700',
          accentBg: 'bg-rose-600',
          cardBorder: 'hover:border-rose-500',
          selectedBorder: 'border-rose-600 ring-2 ring-rose-500/20',
        };
      case 'cambodia':
        return {
          flagEmoji: '🇰🇭',
          countryCode: 'KH',
          badgeColor: 'bg-indigo-50 text-indigo-900 border-indigo-200',
          accent: 'text-indigo-700',
          accentBg: 'bg-indigo-600',
          cardBorder: 'hover:border-indigo-500',
          selectedBorder: 'border-indigo-600 ring-2 ring-indigo-500/20',
        };
      case 'messina':
      default:
        return {
          flagEmoji: '🇮🇹',
          countryCode: 'IT',
          badgeColor: 'bg-[#5A1226]/5 text-[#5A1226] border-[#5A1226]/20',
          accent: 'text-[#5A1226]',
          accentBg: 'bg-[#5A1226]',
          cardBorder: 'hover:border-[#5A1226]',
          selectedBorder: 'border-[#5A1226] ring-2 ring-[#5A1226]/20',
        };
    }
  };

  const currentCountryTheme = getCountryTheme(selectedDest.id);

  // Link a country to its corresponding office hub
  const getLinkedOfficeIdForCountry = (countryId: string): string => {
    switch (countryId) {
      case 'italy':
        return 'messina';
      case 'thailand':
        return 'bangkok';
      case 'cambodia':
        return 'cambodia';
      default:
        return 'yangon';
    }
  };

  // Link an office hub to corresponding study destination
  const getLinkedCountryIdForOffice = (officeId: string): string => {
    switch (officeId) {
      case 'messina':
        return 'italy';
      case 'bangkok':
        return 'thailand';
      case 'cambodia':
        return 'cambodia';
      default:
        return 'italy';
    }
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen">
      {/* 1. Bright Modern Combined Page Header */}
      <section className="relative py-12 sm:py-16 bg-gradient-to-b from-white via-[#F9F6F0] to-[#FAF8F5] border-b border-stone-200 overflow-hidden">
        {/* Subtle Decorative Accents */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#E5A823]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#5A1226]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col items-start max-w-3xl space-y-4">
            <div className="flex items-center gap-3">
              <CrestLogo variant="full" />
              <div className="h-6 w-px bg-stone-300 hidden sm:block" />
              <span className="text-xs font-bold uppercase tracking-widest text-[#5A1226] bg-[#5A1226]/5 px-3 py-1 rounded-full border border-[#5A1226]/15">
                5 Study Portfolios • 5 Global Centers
              </span>
            </div>

            <div className="space-y-2">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#5A1226] leading-tight">
                Destinations & <span className="text-[#E5A823]">Offices</span>
              </h1>
              <div className="w-20 h-1.5 bg-[#E5A823] rounded-full" />
            </div>

            <p className="text-slate-700 text-base sm:text-lg leading-relaxed pt-1">
              Explore accredited global study pathways across <strong>Italy</strong>, <strong>Thailand</strong>, <strong>China</strong>, <strong>Malaysia</strong>, and <strong>Cambodia</strong>, backed by our dual-shore support network with counseling centers in <strong>Yangon</strong>, <strong>Mandalay</strong>, <strong>Bangkok</strong>, <strong>Phnom Penh</strong>, and <strong>Messina</strong>.
            </p>
          </div>

          {/* Combined Top Toggle Switcher: Destinations & Offices */}
          <div className="mt-8 pt-6 border-t border-stone-200/80 flex flex-wrap items-center justify-between gap-4">
            <div className="inline-flex p-1.5 bg-stone-200/80 rounded-2xl border border-stone-300/80 shadow-inner">
              <button
                id="btn-switch-study-destinations"
                onClick={() => setMainTab('destinations')}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center gap-2 cursor-pointer ${
                  mainTab === 'destinations'
                    ? 'bg-white text-[#5A1226] shadow-md border border-stone-200/80 scale-[1.01]'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Globe className="w-4 h-4 text-[#E5A823]" />
                <span>Study Destinations (5 Countries)</span>
              </button>

              <button
                id="btn-switch-office-network"
                onClick={() => setMainTab('offices')}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center gap-2 cursor-pointer ${
                  mainTab === 'offices'
                    ? 'bg-white text-[#5A1226] shadow-md border border-stone-200/80 scale-[1.01]'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Building2 className="w-4 h-4 text-[#E5A823]" />
                <span>Global Office Network (5 Centers)</span>
              </button>
            </div>

            <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>
                {mainTab === 'destinations'
                  ? 'Official 2026/27 Intakes Open • 100% Scholarship Support'
                  : 'All In-Country Centers Open For Consultations'}
              </span>
            </div>
          </div>

          {/* Quick Selectors Bar depending on active section */}
          {mainTab === 'destinations' ? (
            /* 5 Country Selection Cards Grid (Clean Flags Only, No Extra Letters/Emojis) */
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4">
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
                      <div className="flex items-center">
                        <CountryFlag country={dest.country} code={dest.code} size="md" />
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
          ) : (
            /* 5 Office Centers Selection Cards (Real Flags including corrected Myanmar flag) */
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4">
              {offices.map((office) => {
                const isSelected = office.id === activeOfficeId;
                const theme = getOfficeTheme(office.id);

                return (
                  <button
                    key={office.id}
                    id={`office-nav-btn-${office.id}`}
                    onClick={() => setActiveOfficeId(office.id)}
                    className={`p-4 rounded-2xl border transition-all duration-300 flex items-center justify-between cursor-pointer text-left shadow-xs hover:shadow-md ${
                      isSelected
                        ? `${theme.selectedBorder} bg-white shadow-md font-bold scale-[1.02]`
                        : 'bg-white hover:bg-stone-50 text-slate-800 border-stone-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <CountryFlag country={office.country} code={theme.countryCode} size="md" />
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 block">
                          {office.country}
                        </span>
                        <span className="text-sm font-black leading-tight text-slate-900">
                          {office.city}
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* 2. MAIN SECTION CONTENT */}
      {mainTab === 'destinations' ? (
        /* ======================== STUDY DESTINATIONS VIEW ======================== */
        <section id="country-detail-view" className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-20">
          <div className="bg-white rounded-3xl border border-stone-200 shadow-xl overflow-hidden">
            {/* Country Top Banner with High-Res Visual */}
            <div className="relative p-8 sm:p-12 text-white overflow-hidden">
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
                <div className={`absolute inset-0 bg-gradient-to-r ${currentCountryTheme.headerGradient} opacity-90`} />
              </div>

              <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                <div className="space-y-4 max-w-2xl">
                  {/* Clean Flag without any extra text or emojis beside it */}
                  <div className="flex flex-wrap items-center gap-2.5">
                    <CountryFlag country={selectedDest.country} code={selectedDest.code} size="xl" />
                    <span className="px-3 py-1 rounded-md bg-[#E5A823] text-[#5A1226] text-xs font-black uppercase tracking-wider shadow-sm">
                      {selectedDest.highlightBadge}
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
                const isActive = activeCountryTab === tab.id;
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveCountryTab(tab.id as typeof activeCountryTab)}
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
              {activeCountryTab === 'overview' && (
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

                  {/* Dual-Shore Office Spotlight: Switch seamlessly to Offices */}
                  <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-50/70 to-stone-50 border border-amber-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <CountryFlag country={selectedDest.country} code={selectedDest.code} size="sm" />
                        <h4 className="text-sm font-black text-[#5A1226]">
                          Local Support & In-Person Counseling for {selectedDest.country}
                        </h4>
                      </div>
                      <p className="text-xs text-slate-600">
                        Our dual-shore office network provides pre-departure visa vetting in Myanmar & ASEAN and ground liaison reception upon arrival.
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        const targetOffice = getLinkedOfficeIdForCountry(selectedDest.id);
                        setActiveOfficeId(targetOffice);
                        setMainTab('offices');
                        const el = document.getElementById(`office-card-${targetOffice}`);
                        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                      }}
                      className="px-5 py-2.5 rounded-full bg-[#5A1226] hover:bg-[#721832] text-white font-bold text-xs shadow-xs transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5"
                    >
                      <span>View In-Country Office Hub</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#E5A823]" />
                    </button>
                  </div>
                </div>
              )}

              {/* 2. Scholarships */}
              {activeCountryTab === 'scholarships' && (
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
                        Evaluated on high school/bachelor GPA, English proficiency, and family economic background (for regional grants such as DSU Italy).
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
              {activeCountryTab === 'universities' && (
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
              {activeCountryTab === 'costs' && (
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
                        Includes student dormitory accommodation, food, local transport, SIM card, and daily living expenses.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      ) : (
        /* ======================== GLOBAL OFFICES VIEW ======================== */
        <section id="offices-detail-view" className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {offices.map((office) => {
              const theme = getOfficeTheme(office.id);
              const isSelected = office.id === activeOfficeId;

              return (
                <div
                  key={office.id}
                  id={`office-card-${office.id}`}
                  onClick={() => setActiveOfficeId(office.id)}
                  className={`rounded-3xl bg-white border-2 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between cursor-pointer group ${
                    isSelected ? `${theme.selectedBorder} shadow-lg` : 'border-stone-200 hover:border-[#E5A823]'
                  }`}
                >
                  <div>
                    {/* Landmark Photo Banner with Clean Country Flag & Status */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
                      <img
                        src={office.landmarkImage}
                        alt={`${office.city} - ${office.landmark}`}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                      {/* Top Badges: Clean Flag + Country Name + Status */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-xs font-black text-slate-900 shadow-sm border border-stone-200">
                          <CountryFlag country={office.country} code={theme.countryCode} size="sm" />
                          <span>{office.country}</span>
                        </span>

                        <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-bold text-[#E5A823] border border-white/20">
                          {office.statusBadge.split('•')[0]}
                        </span>
                      </div>

                      {/* Bottom Landmark & City Title */}
                      <div className="absolute bottom-3 left-4 right-4 text-white">
                        <span className="text-[11px] font-bold text-[#E5A823] uppercase tracking-wider block">
                          {office.landmark}
                        </span>
                        <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">
                          {office.city} Counseling Hub
                        </h3>
                      </div>
                    </div>

                    {/* Card Body Information */}
                    <div className="p-6 space-y-4">
                      {/* Role / Summary */}
                      <p className="text-xs text-slate-600 font-medium leading-relaxed">
                        {office.role}
                      </p>

                      {/* Address */}
                      <div className="flex items-start gap-2.5 text-xs text-slate-700 pt-3 border-t border-stone-100">
                        <MapPin className="w-4 h-4 text-[#5A1226] flex-shrink-0 mt-0.5" />
                        <span className="font-semibold leading-relaxed">{office.address}</span>
                      </div>

                      {/* Hours */}
                      <div className="flex items-center gap-2.5 text-xs text-slate-600">
                        <Clock className="w-4 h-4 text-[#E5A823] flex-shrink-0" />
                        <span>{office.hours}</span>
                      </div>

                      {/* Direct Phone */}
                      <div className="flex items-center gap-2.5 text-xs text-slate-700">
                        <Phone className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                        <a
                          href={`tel:${office.phone || agencyInfo.cleanPhone}`}
                          onClick={(e) => e.stopPropagation()}
                          className="font-bold hover:text-[#5A1226] transition-colors"
                        >
                          {office.phone}
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Card Bottom Actions */}
                  <div className="p-6 pt-0 space-y-2.5">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (onOpenConsultationModal) {
                          onOpenConsultationModal();
                        } else {
                          setActivePage('contact');
                        }
                      }}
                      className="w-full py-3 px-4 rounded-xl bg-[#5A1226] hover:bg-[#721832] text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Calendar className="w-3.5 h-3.5 text-[#E5A823]" />
                      <span>Book In-Person Appointment</span>
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        const linkedCountry = getLinkedCountryIdForOffice(office.id);
                        handleSelectCountry(linkedCountry);
                        setMainTab('destinations');
                        const el = document.getElementById('country-detail-view');
                        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }}
                      className="w-full py-2 px-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-slate-700 text-[11px] font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>Explore Destination Programs</span>
                      <ArrowRight className="w-3 h-3 text-[#5A1226]" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* 3. Bottom Free Consultation Banner */}
      <section className="py-16 bg-gradient-to-r from-[#5A1226] via-[#721832] to-[#5A1226] text-white border-t border-stone-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <CrestLogo variant="light" />
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Plan Your International Higher Education With Us
          </h2>
          <p className="text-slate-200 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Schedule a confidential 1-on-1 profile evaluation with our counselors in Yangon, Mandalay, Bangkok, Phnom Penh, Messina, or online.
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
              Book 1-on-1 Consultation
            </button>
            <button
              onClick={() => setActivePage('pathway')}
              className="px-8 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 transition-all cursor-pointer"
            >
              Study Pathway & Budget Calculator
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
