import React from 'react';
import {
  Eye,
  Target,
  Handshake,
  ShieldAlert,
  Sparkles,
  CheckCircle,
  Award,
} from 'lucide-react';
import { ChevronDeco } from './ChevronDeco';
import { CrestLogo } from './CrestLogo';
import { useWebsite } from '../context/WebsiteContext';

export const VisionMission: React.FC = () => {
  const { data } = useWebsite();
  const { pillars, agencyInfo } = data;

  return (
    <section id="vision-mission" className="relative py-16 sm:py-24 bg-white overflow-hidden">
      {/* Background Graduation Cap Sky Concept */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FAF8F5]/60 via-white to-[#FAF8F5] pointer-events-none" />

      {/* Decorative Dot Matrix */}
      <div className="absolute top-10 left-6 w-36 h-36 bg-dot-pattern opacity-30 pointer-events-none hidden md:block" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Header matching Slide 4 */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-14 border-b border-stone-200 pb-8">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <CrestLogo variant="compact" />
              <span className="text-xs font-bold uppercase tracking-widest text-[#E5A823]">
                Guiding Principles
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#5A1226] tracking-tight">
              Vision for <span className="text-[#E5A823]">the Future</span>
            </h2>
          </div>

          <div className="hidden sm:block">
            <ChevronDeco count={4} size="lg" color="#E5A823" />
          </div>
        </div>

        {/* 3 Pillars Grid matching Slide 4 cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Pillar 1: Vision (Deep Burgundy Theme) */}
          <div className="bg-[#5A1226] text-white rounded-3xl p-8 sm:p-9 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between relative overflow-hidden group border border-[#5A1226]">
            
            {/* Top Icon Badge */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-2xl bg-[#E5A823] flex items-center justify-center text-[#5A1226] shadow-md group-hover:scale-110 transition-transform">
                  <Eye className="w-7 h-7" />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#E5A823] bg-white/10 px-3 py-1 rounded-full">
                  {pillars.vision.tag || 'Vision'}
                </span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
                  {pillars.vision.title}
                </h3>
                <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
                  {pillars.vision.description}
                </p>
              </div>
            </div>

            <div className="pt-8 border-t border-white/10 mt-6 flex items-center gap-2 text-xs text-[#E5A823] font-semibold">
              <Sparkles className="w-4 h-4" />
              <span>Next-Gen Global Leaders</span>
            </div>
          </div>

          {/* Pillar 2: Mission (Warm Gold Bordered Theme) */}
          <div className="bg-white rounded-3xl p-8 sm:p-9 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between relative overflow-hidden group border-2 border-[#E5A823]">
            
            {/* Top Icon Badge */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-2xl bg-[#5A1226] flex items-center justify-center text-[#E5A823] shadow-md group-hover:scale-110 transition-transform">
                  <Target className="w-7 h-7" />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#5A1226] bg-[#5A1226]/10 px-3 py-1 rounded-full">
                  {pillars.mission.tag || 'Mission'}
                </span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#5A1226] mb-4">
                  {pillars.mission.title}
                </h3>
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                  {pillars.mission.description}
                </p>
              </div>
            </div>

            <div className="pt-8 border-t border-stone-200 mt-6 flex items-center gap-2 text-xs text-[#5A1226] font-semibold">
              <CheckCircle className="w-4 h-4 text-[#E5A823]" />
              <span>Transparent & Personalized</span>
            </div>
          </div>

          {/* Pillar 3: Commitment (Warm Amber/Burgundy Accent Theme) */}
          <div className="bg-[#FAF8F5] rounded-3xl p-8 sm:p-9 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between relative overflow-hidden group border-2 border-stone-300 hover:border-[#E5A823]">
            
            {/* Top Icon Badge */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-2xl bg-[#E5A823] flex items-center justify-center text-[#5A1226] shadow-md group-hover:scale-110 transition-transform">
                  <Handshake className="w-7 h-7" />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#E5A823] bg-stone-900 text-white px-3 py-1 rounded-full">
                  {pillars.commitment.tag || 'Commitment'}
                </span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#5A1226] mb-4">
                  {pillars.commitment.title}
                </h3>
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                  {pillars.commitment.description}
                </p>
              </div>
            </div>

            <div className="pt-8 border-t border-stone-200 mt-6 flex items-center gap-2 text-xs text-slate-800 font-semibold">
              <Award className="w-4 h-4 text-[#E5A823]" />
              <span>Care Beyond Offer Letters</span>
            </div>
          </div>

        </div>

        {/* Ethical Guarantee Callout Banner matching Slide 4 note */}
        <div className="mt-12 bg-gradient-to-r from-[#5A1226] via-[#66142C] to-[#5A1226] text-white p-6 sm:p-8 rounded-2xl border-2 border-[#E5A823]/60 shadow-xl">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="p-3.5 bg-[#E5A823] text-[#5A1226] rounded-2xl flex-shrink-0 shadow-md">
              <ShieldAlert className="w-8 h-8" />
            </div>
            <div className="space-y-1 text-center md:text-left flex-1">
              <p className="text-xs font-bold uppercase tracking-wider text-[#E5A823]">
                Our Uncompromising Ethical Pledge
              </p>
              <p className="text-base sm:text-lg font-medium text-slate-100 leading-relaxed">
                "{agencyInfo.ethicalPledge}"
              </p>
            </div>
            <a
              href="#contact"
              className="flex-shrink-0 px-5 py-2.5 rounded-full bg-[#E5A823] hover:bg-[#D49515] text-[#5A1226] font-bold text-xs uppercase tracking-wider transition-all shadow-md hover:scale-105"
            >
              Verify Your Profile
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};

