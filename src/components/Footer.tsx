import React from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Globe,
  ArrowUp,
  ShieldCheck,
  Building,
  Heart,
} from 'lucide-react';
import { CrestLogo } from './CrestLogo';
import { useWebsite } from '../context/WebsiteContext';

export const Footer: React.FC = () => {
  const { data } = useWebsite();
  const agencyInfo = data.agencyInfo;
  const offices = data.offices;
  const destinations = data.destinations;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const yangon = offices.find((o) => o.id === 'yangon') || offices[0];
  const mandalay = offices.find((o) => o.id === 'mandalay') || offices[1] || offices[0];

  return (
    <footer className="bg-[#3D0A18] text-white border-t-4 border-[#E5A823] relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#E5A823]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand & Mission Column */}
          <div className="lg:col-span-4 space-y-4">
            <CrestLogo variant="light" />
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Premier international education consultancy dedicated to bridging ambitious students with world-class universities in Italy, Thailand, China, and Malaysia.
            </p>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <div className="flex items-center gap-2 text-[#E5A823] text-xs font-bold uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                <span>Zero Hidden Markup Guarantee</span>
              </div>
              <p className="text-[11px] text-slate-300 leading-snug">
                Transparent university applications, official fee structures, and dedicated post-visa arrival care.
              </p>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#E5A823]">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <a href="#introduction" className="hover:text-[#E5A823] transition-colors">
                  About UECA
                </a>
              </li>
              <li>
                <a href="#partners" className="hover:text-[#E5A823] transition-colors">
                  Group & Partners
                </a>
              </li>
              <li>
                <a href="#vision-mission" className="hover:text-[#E5A823] transition-colors">
                  Vision & Mission
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#E5A823] transition-colors">
                  Core Services
                </a>
              </li>
              <li>
                <a href="#destinations" className="hover:text-[#E5A823] transition-colors">
                  Study Destinations
                </a>
              </li>
              <li>
                <a href="#offices" className="hover:text-[#E5A823] transition-colors">
                  Office Locations
                </a>
              </li>
              <li>
                <a href="#assessment-tool" className="hover:text-[#E5A823] transition-colors">
                  Pathway Profiler
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#E5A823] transition-colors">
                  Book Consultation
                </a>
              </li>
            </ul>
          </div>

          {/* Study Destinations */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#E5A823]">
              Destinations
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              {destinations.map((dest) => (
                <li key={dest.id}>
                  <a
                    href="#destinations"
                    className="hover:text-[#E5A823] transition-colors flex items-center gap-1.5"
                  >
                    <span>{dest.flagEmoji}</span>
                    <span>{dest.country} Programs</span>
                  </a>
                </li>
              ))}
              <li className="pt-2">
                <span className="text-[11px] text-[#E5A823] block font-semibold">
                  Key Corporate Network:
                </span>
                <span className="text-[11px] text-slate-400">
                  MTKN Thailand & DIR Myanmar
                </span>
              </li>
            </ul>
          </div>

          {/* Office Contact Info */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#E5A823]">
              Official Offices & Hotline
            </h4>

            <div className="space-y-3 text-xs text-slate-300">
              {/* Phone */}
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#E5A823] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-400 text-[10px] block uppercase">Direct Hotline</span>
                  <a
                    href={`tel:${agencyInfo.cleanPhone}`}
                    className="font-bold text-white hover:text-[#E5A823] transition-colors text-sm"
                  >
                    {agencyInfo.phone}
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-[#E5A823] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-400 text-[10px] block uppercase">Official Email</span>
                  <a
                    href={`mailto:${agencyInfo.email}`}
                    className="font-semibold text-white hover:text-[#E5A823] transition-colors break-all"
                  >
                    {agencyInfo.email}
                  </a>
                </div>
              </div>

              {/* Yangon */}
              {yangon && (
                <div className="flex items-start gap-2.5 pt-1">
                  <MapPin className="w-4 h-4 text-[#E5A823] flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">{yangon.city} Center:</strong>
                    <span>{yangon.address}</span>
                  </div>
                </div>
              )}

              {/* Mandalay */}
              {mandalay && (
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#E5A823] flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">{mandalay.city} Center:</strong>
                    <span>{mandalay.address}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Bottom Bar with Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} {agencyInfo.name}. All rights reserved.
          </div>

          <div className="flex items-center gap-4">
            <span className="text-slate-500">
              In Partnership with MTKN Thailand Group & Digital Information Resources
            </span>
            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-full bg-white/10 hover:bg-[#E5A823] hover:text-[#5A1226] text-white transition-all cursor-pointer"
              title="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};

