import React from 'react';
import {
  Compass,
  Award,
  FileCheck,
  Plane,
  HeartHandshake,
  ArrowRight,
  Sparkles,
  Layers,
} from 'lucide-react';
import { CrestLogo } from './CrestLogo';
import { useWebsite } from '../context/WebsiteContext';
import defaultGraduateImage from '../assets/images/graduate_student_diploma_1790264190363.jpg';

export const Introduction: React.FC = () => {
  const { data, setActivePage } = useWebsite();
  const { introContent, agencyInfo } = data;

  const isBrokenDefault =
    !introContent.imageUrl ||
    introContent.imageUrl.includes('photo-1523050854058-8df90110c9f1');

  const displayImageUrl = isBrokenDefault
    ? defaultGraduateImage
    : introContent.imageUrl;

  const values = [
    {
      icon: Compass,
      title: 'Academic Career Counseling',
      desc: 'One-on-one evaluations to align your strengths, GPA, and aspirations with top global institutions.',
      tag: 'Step 01',
    },
    {
      icon: Award,
      title: 'University Placement',
      desc: 'Strategic application management with premier universities in Italy, Thailand, China, Malaysia, and Cambodia.',
      tag: 'Step 02',
    },
    {
      icon: FileCheck,
      title: 'Visa & Legal Documentation',
      desc: 'Flawless document compilation, translation support, and mock interview prep for seamless embassy clearance.',
      tag: 'Step 03',
    },
    {
      icon: Plane,
      title: 'Pre-Departure Care & Overseas Dorm',
      desc: 'Comprehensive guidance from flight booking to secure overseas dorm check-in and on-campus onboarding.',
      tag: 'Step 04 • Overseas Dorm',
    },
  ];

  return (
    <section id="introduction" className="relative py-16 sm:py-24 bg-white overflow-hidden">
      {/* Dot pattern accent in top right */}
      <div className="absolute top-6 right-8 w-48 h-48 bg-dot-pattern opacity-30 pointer-events-none hidden md:block" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Logo */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <CrestLogo variant="full" />
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#5A1226] tracking-tight">
              Agency Introduction
            </h2>
            <div className="w-20 h-1 bg-[#E5A823] rounded-full" />
          </div>

          {/* More About Us Button that leads to About Us Page */}
          <button
            onClick={() => setActivePage('about')}
            id="intro-more-about-us-btn"
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-[#5A1226] hover:bg-[#721832] text-white font-bold text-xs sm:text-sm shadow-md transition-all hover:scale-105 cursor-pointer self-start sm:self-auto group"
          >
            <Sparkles className="w-4 h-4 text-[#E5A823]" />
            <span>More About Us</span>
            <ArrowRight className="w-4 h-4 text-[#E5A823] group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Text Content */}
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
              
              {/* Secondary in-text trigger to About Us */}
              <div className="mt-4 pt-4 border-t border-stone-200 flex items-center justify-between">
                <span className="text-xs text-slate-500 font-medium">Want to know our history, core values & team?</span>
                <button
                  onClick={() => setActivePage('about')}
                  className="text-xs font-bold text-[#5A1226] hover:text-[#E5A823] inline-flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <span>Read Full About Us</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Core Value Pillars Grid */}
            <div className="space-y-4 pt-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {values.map((v, i) => {
                  const Icon = v.icon;
                  const isOverseasDorm = i === 3;
                  return (
                    <div
                      key={i}
                      className={`flex flex-col justify-between p-4 rounded-2xl border transition-all ${
                        isOverseasDorm
                          ? 'border-[#E5A823] bg-gradient-to-br from-amber-50/40 to-white shadow-xs'
                          : 'border-stone-200 bg-white hover:border-[#E5A823] hover:shadow-xs'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="p-2.5 rounded-xl bg-[#5A1226]/5 text-[#5A1226] flex-shrink-0">
                          <Icon className="w-5 h-5 text-[#E5A823]" />
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <h3 className="text-sm font-bold text-[#5A1226]">{v.title}</h3>
                          </div>
                          <span className="text-[10px] font-bold text-[#E5A823] uppercase tracking-wider block">
                            {v.tag}
                          </span>
                          <p className="text-xs text-slate-600 leading-relaxed">{v.desc}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Note : Explore our services button centered below overseas dorm */}
              <div className="pt-4 flex flex-col items-center text-center space-y-2">
                <button
                  id="explore-our-services-btn"
                  onClick={() => setActivePage('services')}
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#5A1226] to-[#721832] hover:from-[#721832] hover:to-[#5A1226] text-white font-extrabold text-sm sm:text-base shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] active:scale-95 border-2 border-[#E5A823]/50 cursor-pointer group"
                >
                  <Layers className="w-5 h-5 text-[#E5A823]" />
                  <span>Explore Our Services</span>
                  <ArrowRight className="w-5 h-5 text-[#E5A823] group-hover:translate-x-1.5 transition-transform" />
                </button>
                <p className="text-xs text-slate-500 font-medium">
                  Detailed roadmap covering academic profiling, admissions, visas, scholarships & dorm support
                </p>
              </div>
            </div>

          </div>

          {/* Right Visual Image Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-[#FAF8F5] bg-stone-900 group">
              <img
                src={displayImageUrl}
                alt="Graduate holding diploma at commencement ceremony"
                className="w-full h-[480px] object-cover object-center group-hover:scale-105 transition-transform duration-500 filter contrast-[1.03] brightness-[1.02]"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  if (e.currentTarget.src !== defaultGraduateImage) {
                    e.currentTarget.src = defaultGraduateImage;
                  }
                }}
              />

              {/* Overlay with student affirmation */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#5A1226]/95 via-[#5A1226]/30 to-transparent" />

              <div className="absolute bottom-6 left-6 right-6 text-white space-y-3">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E5A823] text-[#5A1226] text-xs font-bold uppercase tracking-wider">
                  <HeartHandshake className="w-3.5 h-3.5" />
                  <span>Student-Centric Promise</span>
                </div>
                <p className="text-sm font-medium text-slate-100 leading-relaxed">
                  {introContent.affirmationText}
                </p>

                <div className="pt-2 flex items-center gap-3">
                  <button
                    onClick={() => setActivePage('about')}
                    className="text-xs font-bold text-[#E5A823] hover:underline inline-flex items-center gap-1 cursor-pointer"
                  >
                    <span>More About Our Mission</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
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
