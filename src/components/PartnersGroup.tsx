import React from 'react';
import {
  Building2,
  BookOpen,
  Sparkles,
  CheckCircle2,
  Globe,
  Layers,
  GraduationCap,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react';
import { CrestLogo } from './CrestLogo';
import { useWebsite } from '../context/WebsiteContext';

export const PartnersGroup: React.FC = () => {
  const { data } = useWebsite();
  const partners = data.partners;

  return (
    <section id="partners" className="py-16 sm:py-24 bg-[#FAF8F5] border-y border-stone-200 relative overflow-hidden">
      {/* Background Subtle Motifs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#E5A823]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#5A1226]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E5A823]/50 shadow-2xs">
            <Layers className="w-4 h-4 text-[#E5A823]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#5A1226]">
              Corporate Strength & Strategic Network
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#5A1226] tracking-tight">
            Our Group & Strategic Partners
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Backed by international enterprise excellence and rooted in dedicated Myanmar education expertise to offer unmatched student security.
          </p>
        </div>

        {/* Dynamic Partner Cards Grid matching Slide 3 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {partners.map((partner, index) => {
            const isDark = index % 2 === 1;
            return (
              <div
                key={partner.id}
                className={`rounded-3xl p-8 sm:p-10 border-2 shadow-md hover:shadow-xl transition-all flex flex-col justify-between relative overflow-hidden group ${
                  isDark
                    ? 'bg-[#5A1226] text-white border-[#5A1226]'
                    : 'bg-white text-slate-900 border-stone-200/80 hover:border-[#E5A823]'
                }`}
              >
                {/* Top accent banner */}
                <div
                  className={`absolute top-0 left-0 right-0 h-2 ${
                    isDark
                      ? 'bg-gradient-to-r from-[#E5A823] via-amber-300 to-[#E5A823]'
                      : 'bg-gradient-to-r from-[#E5A823] to-[#F59E0B]'
                  }`}
                />

                <div className="space-y-6">
                  {/* Logo / Brand Header */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <div
                        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg font-extrabold text-lg tracking-wider ${
                          isDark ? 'bg-white text-[#5A1226]' : 'bg-slate-900 text-white'
                        }`}
                      >
                        <span className={isDark ? 'text-[#5A1226]' : 'text-[#E5A823]'}>
                          {partner.name.split(' ')[0]}
                        </span>
                        <span
                          className={`text-[10px] uppercase font-medium ${
                            isDark ? 'text-slate-700 font-bold' : 'text-slate-300'
                          }`}
                        >
                          {partner.location.split(',')[0]}
                        </span>
                      </div>
                      <h3
                        className={`text-2xl sm:text-3xl font-extrabold pt-2 ${
                          isDark ? 'text-white' : 'text-[#5A1226]'
                        }`}
                      >
                        {partner.name}
                      </h3>
                      <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#E5A823]">
                        {partner.subtitle}
                      </p>
                    </div>

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${
                        isDark
                          ? 'bg-white/10 text-[#E5A823] border-[#E5A823]/40'
                          : 'bg-[#E5A823]/15 text-[#5A1226] border-[#E5A823]/30'
                      }`}
                    >
                      {partner.badge || 'Official Partner'}
                    </span>
                  </div>

                  {/* Description */}
                  <p
                    className={`text-sm sm:text-base leading-relaxed ${
                      isDark ? 'text-slate-200' : 'text-slate-700'
                    }`}
                  >
                    {partner.description}
                  </p>

                  {/* Key Strategic Services */}
                  <div className="pt-2 space-y-2.5">
                    <p
                      className={`text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                        isDark ? 'text-[#E5A823]' : 'text-slate-800'
                      }`}
                    >
                      <Globe className="w-4 h-4 text-[#E5A823]" />
                      Strategic Role & Capabilities
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {partner.keyServices.map((service, idx) => (
                        <div
                          key={idx}
                          className={`flex items-start gap-2 text-xs p-2.5 rounded-lg border ${
                            isDark
                              ? 'text-slate-200 bg-white/10 border-white/10'
                              : 'text-slate-600 bg-[#FAF8F5] border-stone-200'
                          }`}
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#E5A823] flex-shrink-0 mt-0.5" />
                          <span>{service}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom info */}
                <div
                  className={`mt-8 pt-4 border-t flex items-center justify-between text-xs ${
                    isDark ? 'border-white/10 text-slate-300' : 'border-stone-100 text-slate-600'
                  }`}
                >
                  <span className={`font-semibold ${isDark ? 'text-white' : 'text-[#5A1226]'}`}>
                    Location: {partner.location}
                  </span>
                  <span className="text-[#E5A823] font-bold">
                    {partner.yearEstablished ? `Est. ${partner.yearEstablished}` : 'Verified Partner'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Central Logo Stamp below as shown in Slide 3 */}
        <div className="mt-12 flex flex-col items-center justify-center space-y-2">
          <CrestLogo variant="full" />
          <p className="text-xs text-slate-500 font-medium">
            Bridging Local Aspirations with Global Academic Excellence
          </p>
        </div>

      </div>
    </section>
  );
};

