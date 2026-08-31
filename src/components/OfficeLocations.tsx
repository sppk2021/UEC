import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ExternalLink,
  Navigation,
  CheckCircle2,
  Building,
  Sparkles,
} from 'lucide-react';
import { ChevronDeco } from './ChevronDeco';
import { CrestLogo } from './CrestLogo';
import { useWebsite } from '../context/WebsiteContext';
import { OfficeLocation } from '../types';

export const OfficeLocations: React.FC = () => {
  const { data } = useWebsite();
  const offices = data.offices;
  const agencyInfo = data.agencyInfo;

  const [activeOfficeId, setActiveOfficeId] = useState<string>(offices[0]?.id || 'yangon');

  const activeOffice =
    offices.find((o) => o.id === activeOfficeId) || offices[0];

  // Card themes matching the 4 color cards in Slide 7:
  // Yangon: Rich Teal/Cyan-Gold
  // Mandalay: Golden Amber
  // Bangkok: Warm Orange/Brown
  // Messina: Deep Royal Burgundy
  const officeStyles: Record<string, { headerBg: string; textAccent: string; border: string }> = {
    yangon: {
      headerBg: 'bg-[#0E7490]',
      textAccent: 'text-[#0E7490]',
      border: 'border-[#0E7490]',
    },
    mandalay: {
      headerBg: 'bg-[#D97706]',
      textAccent: 'text-[#D97706]',
      border: 'border-[#D97706]',
    },
    bangkok: {
      headerBg: 'bg-[#C2410C]',
      textAccent: 'text-[#C2410C]',
      border: 'border-[#C2410C]',
    },
    messina: {
      headerBg: 'bg-[#5A1226]',
      textAccent: 'text-[#5A1226]',
      border: 'border-[#5A1226]',
    },
  };

  return (
    <section id="offices" className="py-16 sm:py-24 bg-white relative overflow-hidden">
      {/* Dot accent pattern */}
      <div className="absolute top-12 right-10 w-44 h-44 bg-dot-pattern opacity-25 pointer-events-none hidden md:block" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Header matching Slide 7 */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <CrestLogo variant="compact" />
              <span className="text-xs font-bold uppercase tracking-widest text-[#E5A823]">
                Global & Local Presence
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#5A1226] tracking-tight">
              Our Office <span className="text-[#E5A823]">Locations</span>
            </h2>
          </div>

          <div className="hidden sm:block">
            <ChevronDeco count={4} size="lg" color="#E5A823" />
          </div>
        </div>

        {/* Subtitle tag matching Slide 7 footer note */}
        <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-stone-200 text-center mb-12 shadow-2xs">
          <p className="text-slate-800 text-sm sm:text-base font-semibold">
            "Our offices exist in the heart of study destinations to be able to fully support our students"
          </p>
        </div>

        {/* 4 Landmark Photo Cards matching Slide 7 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {offices.map((office) => {
            const isSelected = office.id === activeOfficeId;
            const style = officeStyles[office.id] || officeStyles.yangon;

            return (
              <div
                key={office.id}
                id={`office-card-${office.id}`}
                onClick={() => setActiveOfficeId(office.id)}
                className={`rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border-2 cursor-pointer flex flex-col justify-between group ${
                  isSelected
                    ? `${style.border} scale-[1.03] ring-2 ring-[#E5A823]`
                    : 'border-stone-200 hover:border-stone-400'
                }`}
              >
                <div>
                  {/* Photo Container matching Slide 7 Landmark Images */}
                  <div className="relative h-48 w-full overflow-hidden bg-slate-900">
                    <img
                      src={office.landmarkImage}
                      alt={`${office.city} - ${office.landmark}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-xs text-white text-[11px] font-semibold px-2.5 py-1 rounded-full border border-white/20">
                      {office.landmark}
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <p className="text-2xl font-extrabold tracking-tight">{office.city}</p>
                      <p className="text-xs font-semibold text-amber-300">{office.country}</p>
                    </div>
                  </div>

                  {/* Body Content with Address */}
                  <div className="p-5 space-y-3">
                    <div className="flex items-start gap-2">
                      <MapPin className={`w-4 h-4 mt-0.5 flex-shrink-0 ${style.textAccent}`} />
                      <p className="text-xs font-medium text-slate-800 leading-snug">
                        {office.address}
                      </p>
                    </div>

                    <div className="text-[11px] text-slate-500 line-clamp-2">
                      {office.role}
                    </div>
                  </div>
                </div>

                {/* Bottom Card Color Block matching Slide 7 Color Tabs */}
                <div className={`${style.headerBg} text-white px-5 py-3 flex items-center justify-between text-xs font-bold`}>
                  <span>{office.city}, {office.country}</span>
                  <span className="text-white/80 group-hover:translate-x-1 transition-transform">
                    {isSelected ? 'Selected' : 'Details →'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Deep Dive Office Card with Full Information & Quick Contact */}
        {activeOffice && (
          <div className="mt-12 bg-[#FAF8F5] rounded-3xl p-6 sm:p-10 border-2 border-stone-300 shadow-md">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-7 space-y-5">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#5A1226]/10 text-[#5A1226] text-xs font-bold uppercase tracking-wider">
                    <Building className="w-3.5 h-3.5" />
                    <span>{activeOffice.statusBadge}</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-[#5A1226]">
                    {activeOffice.title}
                  </h3>
                  <p className="text-sm font-semibold text-[#E5A823]">
                    {activeOffice.city}, {activeOffice.country}
                  </p>
                </div>

                {/* Exact Address Highlight */}
                <div className="bg-white p-4 rounded-2xl border border-stone-200 space-y-2">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-[#E5A823] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                        Official Address
                      </p>
                      <p className="text-sm sm:text-base font-bold text-slate-900 mt-0.5">
                        {activeOffice.address}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Working Hours & Scope */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="bg-white p-3.5 rounded-xl border border-stone-200 flex items-start gap-2.5">
                    <Clock className="w-4 h-4 text-[#E5A823] flex-shrink-0 mt-0.5" />
                    <div className="text-xs">
                      <span className="font-bold text-slate-700 block">Working Hours</span>
                      <span className="text-slate-600">{activeOffice.hours}</span>
                    </div>
                  </div>

                  <div className="bg-white p-3.5 rounded-xl border border-stone-200 flex items-start gap-2.5">
                    <Phone className="w-4 h-4 text-[#E5A823] flex-shrink-0 mt-0.5" />
                    <div className="text-xs">
                      <span className="font-bold text-slate-700 block">Hotline & Inquiries</span>
                      <a
                        href={`tel:${agencyInfo.cleanPhone}`}
                        className="text-[#5A1226] font-bold hover:underline"
                      >
                        {activeOffice.phone}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="text-xs text-slate-600">
                  <strong>Center Role:</strong> {activeOffice.role}
                </div>
              </div>

              {/* Right Action Box */}
              <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-sm space-y-4 text-center">
                <div className="w-12 h-12 rounded-full bg-[#5A1226]/10 text-[#5A1226] flex items-center justify-center mx-auto">
                  <Navigation className="w-6 h-6 text-[#E5A823]" />
                </div>
                <h4 className="text-lg font-bold text-[#5A1226]">
                  Visit {activeOffice.city} Counseling Center
                </h4>
                <p className="text-xs text-slate-600">
                  Book a personalized session with our senior education counselor in {activeOffice.city} or schedule an online zoom evaluation.
                </p>

                <div className="pt-2 space-y-2.5">
                  <a
                    href={`tel:${agencyInfo.cleanPhone}`}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#5A1226] hover:bg-[#721832] text-white font-bold text-xs uppercase tracking-wider transition-all shadow"
                  >
                    <Phone className="w-4 h-4 text-[#E5A823]" />
                    <span>Call {activeOffice.city} Desk</span>
                  </a>

                  <a
                    href={`https://wa.me/${agencyInfo.whatsappNumber}?text=Hello%20U%20Education,%20I%20would%20like%20to%20visit%20the%20${activeOffice.city}%20office.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-white hover:bg-stone-50 text-[#5A1226] font-bold text-xs border border-stone-300 transition-all"
                  >
                    <Sparkles className="w-4 h-4 text-[#E5A823]" />
                    <span>Message on WhatsApp / Viber</span>
                  </a>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};

