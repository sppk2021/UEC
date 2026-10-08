import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Clock,
  Mail,
  Calendar,
  ShieldCheck,
} from 'lucide-react';
import { CrestLogo } from '../components/CrestLogo';
import { CountryFlag } from '../components/CountryFlag';
import { useWebsite } from '../context/WebsiteContext';

interface OfficesPageProps {
  onOpenConsultationModal?: () => void;
}

export const OfficesPage: React.FC<OfficesPageProps> = ({ onOpenConsultationModal }) => {
  const { data, setActivePage } = useWebsite();
  const offices = data.offices;
  const agencyInfo = data.agencyInfo;

  const [activeOfficeId, setActiveOfficeId] = useState<string>(offices[0]?.id || 'yangon');

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

  return (
    <div className="bg-[#FAF8F5] min-h-screen">
      {/* 1. Modern Bright Page Header */}
      <section className="relative py-14 sm:py-20 bg-gradient-to-b from-white via-[#F9F6F0] to-[#FAF8F5] border-b border-stone-200 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#E5A823]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#5A1226]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col items-start max-w-3xl space-y-4">
            <div className="flex items-center gap-3">
              <CrestLogo variant="full" />
              <div className="h-6 w-px bg-stone-300 hidden sm:block" />
              <span className="text-xs font-bold uppercase tracking-widest text-[#5A1226] bg-[#5A1226]/5 px-3 py-1 rounded-full border border-[#5A1226]/15">
                5 Global Office Centers
              </span>
            </div>

            <div className="space-y-2">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#5A1226] leading-tight">
                Our Office <span className="text-[#E5A823]">Network</span>
              </h1>
              <div className="w-20 h-1.5 bg-[#E5A823] rounded-full" />
            </div>

            <p className="text-slate-700 text-base sm:text-lg leading-relaxed pt-1">
              With full counseling centers across <strong>Myanmar</strong> (Yangon & Mandalay), regional liaison hubs in <strong>Bangkok (Thailand)</strong> and <strong>Phnom Penh (Cambodia)</strong>, and dedicated ground welfare support in <strong>Messina (Sicily, Italy)</strong>.
            </p>
          </div>

          {/* Office Quick Selectors with Real Flags and Country Badges */}
          <div className="mt-10 pt-6 border-t border-stone-200 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4">
            {offices.map((office) => {
              const isSelected = office.id === activeOfficeId;
              const theme = getOfficeTheme(office.id);

              return (
                <button
                  key={office.id}
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
        </div>
      </section>

      {/* 2. Office Cards Grid with Real Country Flags and High-Res Landmark Photos */}
      <section className="py-12 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                  {/* Photo Banner with Flag Badge & Landmark Image */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
                    <img
                      src={office.landmarkImage}
                      alt={`${office.city} - ${office.landmark}`}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                    {/* Top Badges: Flag + Country Name + Status */}
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
                        href={`tel:${agencyInfo.cleanPhone}`}
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
                    className="w-full py-3 rounded-xl bg-[#5A1226] hover:bg-[#721832] text-white font-bold text-xs shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Calendar className="w-4 h-4 text-[#E5A823]" />
                    <span>Book Appointment in {office.city}</span>
                  </button>

                  <a
                    href={`mailto:${office.email}?subject=Inquiry%20for%20${encodeURIComponent(office.city)}%20Office`}
                    className="w-full py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-slate-800 font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer text-center"
                  >
                    <Mail className="w-3.5 h-3.5 text-slate-600" />
                    <span>Send Official Email</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Global Welfare Assurance Banner */}
        <div className="bg-gradient-to-r from-stone-900 via-slate-900 to-stone-900 rounded-3xl p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden">
          <div className="max-w-3xl space-y-4 relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-xs font-bold text-[#E5A823] border border-white/15">
              <ShieldCheck className="w-4 h-4" />
              <span>Unbroken Care from Myanmar to Europe & Asia</span>
            </div>

            <h3 className="text-2xl sm:text-4xl font-extrabold text-white">
              Dual-Shore Student Welfare System
            </h3>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Unlike traditional agencies that stop once your visa is stamped, our overseas coordinators in Messina, Bangkok, and Phnom Penh physically meet you at the airport, assist with dormitory check-in, and guide you through local residency permits and banking until day one of class.
            </p>

            <div className="pt-2 flex flex-wrap gap-3">
              <button
                onClick={() => setActivePage('services')}
                className="px-6 py-3 rounded-full bg-[#E5A823] hover:bg-[#d49515] text-[#5A1226] font-black text-xs sm:text-sm shadow-md transition-all cursor-pointer"
              >
                Explore Full 5-Stage Services
              </button>
              <button
                onClick={() => {
                  if (onOpenConsultationModal) {
                    onOpenConsultationModal();
                  } else {
                    setActivePage('contact');
                  }
                }}
                className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm border border-white/20 transition-all cursor-pointer"
              >
                Book Free Consultation
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
