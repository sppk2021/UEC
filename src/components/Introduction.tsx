import React from 'react';
import {
  Compass,
  Award,
  Users,
  CheckCircle,
  FileCheck,
  Plane,
  HeartHandshake,
} from 'lucide-react';
import { CrestLogo } from './CrestLogo';
import { useWebsite } from '../context/WebsiteContext';

export const Introduction: React.FC = () => {
  const { data } = useWebsite();
  const { introContent, agencyInfo } = data;

  const values = [
    {
      icon: Compass,
      title: 'Academic Career Counseling',
      desc: 'One-on-one evaluations to align your strengths, GPA, and aspirations with top global institutions.',
    },
    {
      icon: Award,
      title: 'University Placement',
      desc: 'Strategic application management with premier universities in Italy, Thailand, China, and Malaysia.',
    },
    {
      icon: FileCheck,
      title: 'Visa & Legal Documentation',
      desc: 'Flawless document compilation and mock interview preparation for seamless embassy clearance.',
    },
    {
      icon: Plane,
      title: 'Pre-Departure Care',
      desc: 'Comprehensive guidance from flight coordination to secure dorm check-in and class onboarding.',
    },
  ];

  return (
    <section id="introduction" className="relative py-16 sm:py-24 bg-white overflow-hidden">
      {/* Dot pattern accent in top right */}
      <div className="absolute top-6 right-8 w-48 h-48 bg-dot-pattern opacity-30 pointer-events-none hidden md:block" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Logo */}
        <div className="flex flex-col items-start space-y-3 mb-12">
          <CrestLogo variant="full" />
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#5A1226] tracking-tight">
            Introduction
          </h2>
          <div className="w-20 h-1 bg-[#E5A823] rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Text Content matching exact words from Slide 2 */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-[#FAF8F5] border-l-4 border-[#E5A823] p-6 rounded-r-2xl shadow-xs">
              <p className="text-slate-800 text-lg sm:text-xl font-normal leading-relaxed">
                <strong className="text-[#5A1226] font-bold">
                  {agencyInfo.name}
                </strong>{' '}
                {introContent.leadText}
              </p>
            </div>

            <div className="bg-[#FAF8F5] p-6 rounded-2xl border border-stone-200 shadow-xs">
              <p className="text-slate-700 text-base sm:text-lg leading-relaxed">
                {introContent.supportingText}
              </p>
            </div>

            {/* Core Value Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {values.map((v, i) => {
                const Icon = v.icon;
                return (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-4 rounded-xl border border-stone-200 bg-white hover:border-[#E5A823] hover:shadow-xs transition-all"
                  >
                    <div className="p-2.5 rounded-lg bg-[#5A1226]/5 text-[#5A1226] flex-shrink-0">
                      <Icon className="w-5 h-5 text-[#E5A823]" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-[#5A1226]">{v.title}</h3>
                      <p className="text-xs text-slate-600 mt-1 leading-snug">{v.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

          {/* Right Visual Image Card matching Slide 2 aesthetic */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-[#FAF8F5] bg-stone-900 group">
              <img
                src={introContent.imageUrl || "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1000&auto=format&fit=crop"}
                alt="Graduate holding diploma at commencement ceremony"
                className="w-full h-[460px] object-cover object-center group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />

              {/* Overlay with student affirmation */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#5A1226]/90 via-transparent to-transparent" />

              <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E5A823] text-[#5A1226] text-xs font-bold uppercase tracking-wider">
                  <HeartHandshake className="w-3.5 h-3.5" />
                  <span>Student-Centric Promise</span>
                </div>
                <p className="text-sm font-medium text-slate-100 leading-snug">
                  {introContent.affirmationText}
                </p>
              </div>
            </div>

            {/* Dot Accent Pattern below photo */}
            <div className="absolute -bottom-4 -left-4 w-28 h-28 bg-dot-pattern-burgundy opacity-30 -z-10 rounded-2xl" />
          </div>

        </div>

      </div>
    </section>
  );
};

