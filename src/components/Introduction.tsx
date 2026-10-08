import React from 'react';
import {
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

  return (
    <section id="introduction" className="relative py-12 sm:py-16 bg-white overflow-hidden border-b border-stone-200">
      {/* Dot pattern accent in top right */}
      <div className="absolute top-6 right-8 w-40 h-40 bg-dot-pattern opacity-20 pointer-events-none hidden md:block" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-8 sm:mb-10 space-y-2">
          <CrestLogo variant="full" />
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#5A1226] tracking-tight">
            Agency Introduction
          </h2>
          <div className="w-16 h-1 bg-[#E5A823] rounded-full" />
        </div>

        {/* Content Grid: Text & Action Buttons on Left, Image Card on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left Text Content & Two Action Buttons */}
          <div className="lg:col-span-7 space-y-5">
            <div className="bg-[#FAF8F5] border-l-4 border-[#E5A823] p-5 sm:p-6 rounded-r-2xl shadow-xs">
              <p className="text-slate-800 text-sm sm:text-base font-normal leading-relaxed">
                <strong className="text-[#5A1226] font-bold">
                  {agencyInfo.name}
                </strong>{' '}
                {introContent.leadText}
              </p>
            </div>

            <div className="bg-[#FAF8F5] p-5 sm:p-6 rounded-2xl border border-stone-200 shadow-xs">
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                {introContent.supportingText}
              </p>
            </div>

            {/* Replaced 4 boxes with 2 Executive Action Buttons as requested */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <button
                onClick={() => setActivePage('about')}
                id="intro-more-about-us-btn"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#5A1226] hover:bg-[#721832] text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer group border border-[#E5A823]/40"
              >
                <Sparkles className="w-4 h-4 text-[#E5A823]" />
                <span>More About Us</span>
                <ArrowRight className="w-4 h-4 text-[#E5A823] group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                id="explore-our-services-btn"
                onClick={() => setActivePage('services')}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-white hover:bg-stone-50 text-[#5A1226] font-bold text-xs sm:text-sm shadow-xs hover:shadow-md transition-all hover:-translate-y-0.5 active:translate-y-0 border-2 border-[#5A1226]/20 hover:border-[#5A1226] cursor-pointer group"
              >
                <Layers className="w-4 h-4 text-[#5A1226]" />
                <span>Explore Our Services</span>
                <ArrowRight className="w-4 h-4 text-[#5A1226] group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <p className="text-xs text-slate-500 font-medium pt-1">
              Guiding genuine students with transparent, end-to-end consulting from university selection to dormitory check-in.
            </p>
          </div>

          {/* Right Visual Image Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-[#FAF8F5] bg-stone-900 group">
              <img
                src={displayImageUrl}
                alt="Graduate holding diploma at commencement ceremony"
                className="w-full h-[360px] sm:h-[400px] object-cover object-center group-hover:scale-105 transition-transform duration-500 filter contrast-[1.03] brightness-[1.02]"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  if (e.currentTarget.src !== defaultGraduateImage) {
                    e.currentTarget.src = defaultGraduateImage;
                  }
                }}
              />

              {/* Overlay with student affirmation */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#5A1226]/95 via-[#5A1226]/30 to-transparent" />

              <div className="absolute bottom-5 left-5 right-5 text-white space-y-2.5">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#E5A823] text-[#5A1226] text-[11px] font-black uppercase tracking-wider">
                  <HeartHandshake className="w-3.5 h-3.5" />
                  <span>Student-Centric Promise</span>
                </div>
                <p className="text-xs sm:text-sm font-medium text-slate-100 leading-relaxed">
                  {introContent.affirmationText}
                </p>

                <div className="pt-1 flex items-center gap-3">
                  <button
                    onClick={() => setActivePage('about')}
                    className="text-xs font-bold text-[#E5A823] hover:underline inline-flex items-center gap-1 cursor-pointer"
                  >
                    <span>Our Mission & Core Values</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>

            {/* Dot Accent Pattern below photo */}
            <div className="absolute -bottom-3 -left-3 w-24 h-24 bg-dot-pattern-burgundy opacity-25 -z-10 rounded-2xl" />
          </div>

        </div>

      </div>
    </section>
  );
};
