import React from 'react';
import { CrestLogo } from '../components/CrestLogo';
import { ContactSection } from '../components/ContactSection';
import { TestimonialsFaq } from '../components/TestimonialsFaq';

interface ContactPageProps {
  onOpenConsultationModal?: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = () => {
  return (
    <div className="bg-[#FAF8F5]">
      {/* 1. Page Header */}
      <section className="relative py-16 sm:py-24 bg-[#5A1226] text-white overflow-hidden border-b border-[#E5A823]/20">
        <div className="absolute inset-0 bg-gradient-to-b from-[#5A1226] via-[#4A0E1F] to-[#5A1226] pointer-events-none" />
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#E5A823]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex flex-col items-start max-w-3xl space-y-4">
            <CrestLogo variant="light" />
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-[#E5A823]">
                Free Student Evaluation & Inquiries
              </span>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                Contact <span className="text-[#E5A823]">Our Counselors</span>
              </h1>
            </div>
            <p className="text-slate-200 text-base sm:text-lg leading-relaxed pt-2">
              Schedule your complimentary 1-on-1 profile evaluation with our admissions specialists. We provide transparent assessments, scholarship eligibility screening, and university shortlist recommendations.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Main Contact Form & Section (Slide 8) */}
      <ContactSection />

      {/* 3. Comprehensive FAQs */}
      <TestimonialsFaq />
    </div>
  );
};
