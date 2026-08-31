import React, { useState } from 'react';
import {
  Globe2,
  Award,
  DollarSign,
  GraduationCap,
  Calendar,
  Sparkles,
  ChevronRight,
  BookOpen,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import { CrestLogo } from './CrestLogo';
import { useWebsite } from '../context/WebsiteContext';
import { StudyDestination } from '../types';

interface StudyDestinationsProps {
  onSelectDestination?: (dest: StudyDestination) => void;
}

export const StudyDestinations: React.FC<StudyDestinationsProps> = ({ onSelectDestination }) => {
  const { data } = useWebsite();
  const destinations = data.destinations;

  const [selectedCountryId, setSelectedCountryId] = useState<string>(destinations[0]?.id || 'italy');
  const [activeTab, setActiveTab] = useState<'overview' | 'scholarships' | 'universities'>('overview');

  const selectedDest =
    destinations.find((d) => d.id === selectedCountryId) || destinations[0];

  return (
    <section id="destinations" className="py-16 sm:py-24 bg-[#5A1226] text-white relative overflow-hidden border-t border-[#E5A823]/20">
      {/* Background Subtle Gradient & Light effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#5A1226] via-[#4A0E1F] to-[#5A1226] pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#E5A823]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Header matching Slide 6 */}
        <div className="flex flex-col items-start space-y-4 mb-14">
          <CrestLogo variant="light" />
          
          <div className="space-y-2 max-w-4xl">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
              Our <span className="text-[#E5A823]">Study Destinations</span>
            </h2>
            
            {/* Exact lead paragraph from Slide 6 */}
            <p className="text-slate-200 text-base sm:text-lg leading-relaxed pt-2">
              Our agency provides streamlined pathways to some of the world's most dynamic and accessible academic pathways. We specialize in matching your scholarly profile with top-tier universities in Italy, China, Malaysia, and Thailand.
            </p>
          </div>
        </div>

        {/* 4 Country Cards matching Slide 6 Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((dest) => {
            const isSelected = dest.id === selectedCountryId;

            return (
              <div
                key={dest.id}
                id={`destination-card-${dest.id}`}
                onClick={() => setSelectedCountryId(dest.id)}
                className={`rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 border-2 cursor-pointer relative overflow-hidden group ${
                  isSelected
                    ? 'bg-gradient-to-b from-white/20 to-white/10 border-[#E5A823] shadow-2xl scale-[1.02] ring-2 ring-[#E5A823]/50'
                    : 'bg-white/5 hover:bg-white/10 border-white/15 hover:border-[#E5A823]/50'
                }`}
              >
                {/* Flag Display matching Slide 6 Graphic Flag Rounded Rectangles */}
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <div className="w-16 h-11 rounded-xl shadow-md border-2 border-white/40 overflow-hidden flex items-center justify-center bg-slate-900">
                      {/* Flag Visual Representation */}
                      {dest.id === 'italy' && (
                        <div className="w-full h-full flex">
                          <div className="w-1/3 h-full bg-[#008C45]" />
                          <div className="w-1/3 h-full bg-white" />
                          <div className="w-1/3 h-full bg-[#CD212A]" />
                        </div>
                      )}
                      {dest.id === 'thailand' && (
                        <div className="w-full h-full flex flex-col">
                          <div className="h-[16.6%] bg-[#A51931]" />
                          <div className="h-[16.6%] bg-white" />
                          <div className="h-[33.4%] bg-[#2D2A4A]" />
                          <div className="h-[16.6%] bg-white" />
                          <div className="h-[16.6%] bg-[#A51931]" />
                        </div>
                      )}
                      {dest.id === 'china' && (
                        <div className="w-full h-full bg-[#DE2910] flex items-center justify-center text-yellow-300 font-bold text-lg">
                          ★
                        </div>
                      )}
                      {dest.id === 'malaysia' && (
                        <div className="w-full h-full bg-[#010066] flex flex-col relative overflow-hidden">
                          <div className="w-1/2 h-1/2 bg-[#010066] z-10 flex items-center justify-center text-yellow-400 text-xs">
                            ☪
                          </div>
                          <div className="absolute inset-0 flex flex-col justify-between">
                            <div className="h-[14%] bg-red-600" />
                            <div className="h-[14%] bg-white" />
                            <div className="h-[14%] bg-red-600" />
                            <div className="h-[14%] bg-white" />
                            <div className="h-[14%] bg-red-600" />
                            <div className="h-[14%] bg-white" />
                            <div className="h-[14%] bg-red-600" />
                          </div>
                        </div>
                      )}
                      {!['italy', 'thailand', 'china', 'malaysia'].includes(dest.id) && (
                        <span className="text-xl">{dest.flagEmoji || '🎓'}</span>
                      )}
                    </div>

                    <span className="text-2xl">{dest.flagEmoji}</span>
                  </div>

                  {/* Country Name */}
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-[#E5A823]">
                    {dest.country}
                  </h3>

                  {/* Exact Text from Slide 6 */}
                  <p className="text-slate-200 text-sm leading-relaxed min-h-[96px]">
                    {dest.description}
                  </p>
                </div>

                {/* Bottom Selection Indicator */}
                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-300">
                    {dest.highlightBadge?.split('•')[0] || dest.country}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors ${
                      isSelected ? 'bg-[#E5A823] text-[#5A1226]' : 'bg-white/10 text-white'
                    }`}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Destination Deep-Dive Panel */}
        {selectedDest && (
          <div className="mt-12 bg-white text-slate-900 rounded-3xl p-6 sm:p-10 shadow-2xl border-2 border-[#E5A823] animate-in fade-in duration-300">
            
            {/* Top Bar of active country */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200">
              <div className="flex items-center gap-3">
                <span className="text-4xl">{selectedDest.flagEmoji}</span>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-[#5A1226]">
                      Study in {selectedDest.country}
                    </h3>
                    <span className="bg-[#E5A823]/20 text-[#5A1226] text-xs font-bold px-3 py-1 rounded-full">
                      {selectedDest.code} Pathway
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600">{selectedDest.tagline}</p>
                </div>
              </div>

              {/* Quick tabs */}
              <div className="flex items-center gap-1.5 bg-[#FAF8F5] p-1.5 rounded-2xl border border-stone-200">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === 'overview'
                      ? 'bg-[#5A1226] text-white shadow-xs'
                      : 'text-slate-600 hover:text-[#5A1226]'
                  }`}
                >
                  Overview & Cost
                </button>
                <button
                  onClick={() => setActiveTab('scholarships')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === 'scholarships'
                      ? 'bg-[#5A1226] text-white shadow-xs'
                      : 'text-slate-600 hover:text-[#5A1226]'
                  }`}
                >
                  Scholarships
                </button>
                <button
                  onClick={() => setActiveTab('universities')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === 'universities'
                      ? 'bg-[#5A1226] text-white shadow-xs'
                      : 'text-slate-600 hover:text-[#5A1226]'
                  }`}
                >
                  Universities & Programs
                </button>
              </div>
            </div>

            {/* Tab 1: Overview & Cost */}
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 animate-in fade-in duration-200">
                <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-stone-200 space-y-2">
                  <div className="flex items-center gap-2 text-[#5A1226] font-bold text-xs uppercase tracking-wider">
                    <DollarSign className="w-4 h-4 text-[#E5A823]" />
                    Estimated Tuition & Fees
                  </div>
                  <p className="text-xl font-extrabold text-[#5A1226]">{selectedDest.avgTuition}</p>
                  <p className="text-xs text-slate-600">Depending on university and scholarship standing.</p>
                </div>

                <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-stone-200 space-y-2">
                  <div className="flex items-center gap-2 text-[#5A1226] font-bold text-xs uppercase tracking-wider">
                    <Globe2 className="w-4 h-4 text-[#E5A823]" />
                    Estimated Living Cost
                  </div>
                  <p className="text-xl font-extrabold text-[#5A1226]">{selectedDest.livingCost}</p>
                  <p className="text-xs text-slate-600">Includes student dormitory, meals, and transit.</p>
                </div>

                <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-stone-200 space-y-2">
                  <div className="flex items-center gap-2 text-[#5A1226] font-bold text-xs uppercase tracking-wider">
                    <Calendar className="w-4 h-4 text-[#E5A823]" />
                    Major Intakes
                  </div>
                  <div className="space-y-1">
                    {selectedDest.intakes?.map((intake, i) => (
                      <div key={i} className="text-xs font-semibold text-slate-800 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#E5A823]" />
                        <span>{intake}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Scholarships */}
            {activeTab === 'scholarships' && (
              <div className="pt-6 space-y-4 animate-in fade-in duration-200">
                <div className="bg-gradient-to-r from-[#FAF8F5] to-amber-50/50 p-6 rounded-2xl border border-[#E5A823]/50 flex items-start gap-4">
                  <Award className="w-8 h-8 text-[#E5A823] flex-shrink-0 mt-1" />
                  <div className="space-y-2">
                    <h4 className="text-lg font-bold text-[#5A1226]">
                      Scholarship Opportunities in {selectedDest.country}
                    </h4>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      {selectedDest.scholarshipInfo}
                    </p>
                    <div className="flex flex-wrap gap-2 pt-2">
                      <span className="text-xs font-bold bg-[#5A1226] text-white px-3 py-1 rounded-full">
                        Zero Hidden Fees Guarantee
                      </span>
                      <span className="text-xs font-bold bg-white text-[#5A1226] border border-stone-300 px-3 py-1 rounded-full">
                        Full SOP & Document Review by U Education
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 3: Universities & Programs */}
            {activeTab === 'universities' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 animate-in fade-in duration-200">
                <div className="space-y-3">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-[#5A1226] flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-[#E5A823]" />
                    Top Partner & Accredited Universities
                  </h4>
                  <div className="space-y-2">
                    {selectedDest.topUniversities?.map((uni, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs font-medium text-slate-700 bg-[#FAF8F5] p-2.5 rounded-xl border border-stone-200">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#E5A823] flex-shrink-0" />
                        <span>{uni}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-[#5A1226] flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-[#E5A823]" />
                    Popular Majors & Fields of Study
                  </h4>
                  <div className="space-y-2">
                    {selectedDest.popularPrograms?.map((prog, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs font-medium text-slate-700 bg-[#FAF8F5] p-2.5 rounded-xl border border-stone-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#5A1226]" />
                        <span>{prog}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Action footer */}
            <div className="mt-8 pt-6 border-t border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="text-xs text-slate-600">
                Language Requirements:{' '}
                <strong className="text-slate-900">{selectedDest.languageReq}</strong>
              </div>

              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#5A1226] hover:bg-[#721832] text-white font-bold text-xs uppercase tracking-wider transition-all shadow hover:scale-105"
              >
                <span>Apply for {selectedDest.country} Intake</span>
                <ArrowRight className="w-4 h-4 text-[#E5A823]" />
              </a>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};

