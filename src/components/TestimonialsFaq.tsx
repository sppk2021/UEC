import React, { useState } from 'react';
import {
  ChevronDown,
  HelpCircle,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  FileCheck,
  Plane,
  GraduationCap,
} from 'lucide-react';
import { useWebsite } from '../context/WebsiteContext';

export const TestimonialsFaq: React.FC = () => {
  const { data } = useWebsite();
  const faqs = data.faqs;
  const agencyInfo = data.agencyInfo;

  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const steps = [
    {
      number: '01',
      title: 'Free Profile Appraisal',
      desc: 'Evaluate transcripts, GPA, budget, and recommend matched countries (Italy, Thailand, China, Malaysia).',
      icon: GraduationCap,
    },
    {
      number: '02',
      title: 'University & SOP Preparation',
      desc: 'Manage application portals, polish Statements of Purpose, CV, and submit scholarship nominations.',
      icon: FileCheck,
    },
    {
      number: '03',
      title: 'Visa & Immigration Clearance',
      desc: 'Comprehensive document audit, financial proof guidance, and mock embassy interview training.',
      icon: ShieldCheck,
    },
    {
      number: '04',
      title: 'Dorm Check-In & Onboarding',
      desc: 'Arrival flight coordination, secure dorm check-in, SIM card setup, and first lesson start care.',
      icon: Plane,
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-white border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Student Roadmap */}
        <div className="mb-20">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF8F5] border border-[#E5A823]/50">
              <Sparkles className="w-4 h-4 text-[#E5A823]" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#5A1226]">
                Seamless 4-Step Process
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#5A1226] tracking-tight">
              Your Journey from Myanmar to World-Class Campus
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Transparent, structured, and stress-free guidance from your first consultation until you settle into your overseas dorm.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div
                  key={idx}
                  className="bg-[#FAF8F5] p-6 rounded-3xl border border-stone-200 hover:border-[#E5A823] hover:shadow-lg transition-all space-y-4 relative group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-extrabold text-[#E5A823]/80 group-hover:text-[#E5A823] transition-colors">
                      {step.number}
                    </span>
                    <div className="p-2.5 rounded-xl bg-[#5A1226] text-[#E5A823]">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-[#5A1226]">{step.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* FAQs */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10 space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#5A1226]/5 text-[#5A1226] text-xs font-bold uppercase tracking-wider">
              <HelpCircle className="w-3.5 h-3.5 text-[#E5A823]" />
              <span>Questions & Answers</span>
            </div>
            <h3 className="text-2xl sm:text-4xl font-extrabold text-[#5A1226]">
              Frequently Asked Questions
            </h3>
            <p className="text-slate-600 text-xs sm:text-sm">
              Clear answers to common questions about studying in Italy, Thailand, China, and Malaysia.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={faq.id || index}
                  className="rounded-2xl border border-stone-200 bg-[#FAF8F5] overflow-hidden transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-stone-100/60 transition-colors"
                  >
                    <span className="font-bold text-sm sm:text-base text-[#5A1226]">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#E5A823] flex-shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 pt-1 text-slate-700 text-xs sm:text-sm leading-relaxed border-t border-stone-200/60 animate-in fade-in duration-200">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Prompt quick connect */}
          <div className="mt-8 text-center bg-[#FAF8F5] p-6 rounded-2xl border border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-left">
              <p className="text-xs font-bold uppercase tracking-wider text-[#5A1226]">
                Have a specific question about your profile?
              </p>
              <p className="text-xs text-slate-600">
                Our education counselors are ready to help via phone or in-person.
              </p>
            </div>
            <a
              href={`tel:${agencyInfo.cleanPhone}`}
              className="px-5 py-2.5 rounded-full bg-[#5A1226] text-white font-bold text-xs hover:bg-[#721832] transition-colors flex items-center gap-2"
            >
              <span>Call {agencyInfo.phone}</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#E5A823]" />
            </a>
          </div>

        </div>

      </div>
    </section>
  );
};

