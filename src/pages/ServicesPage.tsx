import React, { useState, Suspense, lazy } from 'react';
import {
  UserCheck,
  GraduationCap,
  FileCheck2,
  BookOpenCheck,
  PlaneTakeoff,
  CheckCircle2,
  ChevronRight,
  ArrowRight,
  ShieldCheck,
  Award,
} from 'lucide-react';
import { CrestLogo } from '../components/CrestLogo';
import { useWebsite } from '../context/WebsiteContext';

const InteractiveAssessmentTool = lazy(() =>
  import('../components/InteractiveAssessmentTool').then((m) => ({
    default: m.InteractiveAssessmentTool,
  }))
);

interface ServicesPageProps {
  onOpenConsultationModal?: () => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onOpenConsultationModal }) => {
  const { data, setActivePage } = useWebsite();
  const services = data.services;

  const [activeServiceId, setActiveServiceId] = useState<string>(services[0]?.id || 'academic-profiling');

  const iconMap: Record<string, React.ElementType> = {
    UserCheck,
    GraduationCap,
    FileCheck2,
    BookOpenCheck,
    PlaneTakeoff,
  };

  const selectedService = services.find((s) => s.id === activeServiceId) || services[0];
  const IconComponent = iconMap[selectedService.iconName] || UserCheck;

  const workflowSteps = [
    {
      step: '01',
      title: 'Initial Consultation & Academic Profiling',
      desc: 'Evaluate transcripts, GPA, language proficiency, and family financial parameters to match realistic country pathways.',
    },
    {
      step: '02',
      title: 'University Shortlisting & SOP Mentorship',
      desc: 'Curate top 3–5 university programs and guide drafting of compelling Statements of Purpose, CVs, and recommendation letters.',
    },
    {
      step: '03',
      title: 'Admissions Submission & Offer Tracking',
      desc: 'Direct liaison with university international offices to secure official acceptance letters and scholarship nominations.',
    },
    {
      step: '04',
      title: 'DOV / CIMEA Legalization & Visa Dossier',
      desc: 'Complete translation, Ministry of Foreign Affairs legalization, bank endorsement review, and embassy mock interviews.',
    },
    {
      step: '05',
      title: 'Pre-Departure Briefing & Flight Advisory',
      desc: 'Secure verified student housing, budget airline tickets, packing checklists, and local SIM / banking instructions.',
    },
    {
      step: '06',
      title: 'European / Asian On-Arrival Care',
      desc: 'Airport greeting, dormitory check-in, Questura residency permit (Permesso di Soggiorno) filing, and first class attendance.',
    },
  ];

  return (
    <div className="bg-[#FAF8F5]">
      {/* 1. Page Header */}
      <section className="relative py-16 sm:py-24 bg-[#5A1226] text-white overflow-hidden border-b border-[#E5A823]/20">
        <div className="absolute inset-0 bg-gradient-to-b from-[#5A1226] via-[#4A0E1F] to-[#5A1226] pointer-events-none" />
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#E5A823]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-dot-pattern-white opacity-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-7 flex flex-col items-start space-y-4">
              <CrestLogo variant="light" />
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-widest text-[#E5A823]">
                  End-to-End Educational Roadmap
                </span>
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                  Our Core <span className="text-[#E5A823]">Services</span>
                </h1>
              </div>
              <p className="text-slate-200 text-base sm:text-lg leading-relaxed pt-2">
                From your initial diagnostic profile evaluation to dormitory key handover in Messina, Bangkok, Kuala Lumpur, or China, our full-service suite ensures 100% academic compliance, scholarship optimization, and immigration security.
              </p>
            </div>

            {/* Landing Headline Hero Image */}
            <div className="lg:col-span-5 relative mt-4 lg:mt-0">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-[#E5A823]/30 group">
                <img
                  src="/src/assets/images/services_headline_1791445406028.jpg"
                  alt="U Education educational admissions counseling and study roadmap advisory"
                  referrerPolicy="no-referrer"
                  className="w-full h-64 sm:h-72 lg:h-80 object-cover transform transition-transform duration-700 group-hover:scale-105"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-3 right-3 p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 text-white flex items-center justify-between">
                  <div>
                    <p className="text-[11px] font-bold text-[#E5A823] uppercase tracking-wider">End-to-End Advisory</p>
                    <p className="text-xs text-white/95 font-medium">6-Stage Full Lifecycle Care</p>
                  </div>
                  <div className="px-2.5 py-1 rounded-full bg-[#E5A823] text-[#5A1226] text-[11px] font-black shadow-sm">
                    98.4% Visa Rate
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Interactive 5 Core Services Explorer */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Service Selector Buttons */}
          <div className="lg:col-span-5 space-y-3">
            <div className="mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#5A1226]">
                5-Stage Support Pipeline
              </span>
              <h3 className="text-2xl font-bold text-slate-900">Select a Service to Explore</h3>
            </div>

            {services.map((service) => {
              const ServiceIcon = iconMap[service.iconName] || UserCheck;
              const isSelected = service.id === activeServiceId;

              return (
                <button
                  key={service.id}
                  onClick={() => setActiveServiceId(service.id)}
                  className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition-all duration-300 flex items-center justify-between group cursor-pointer ${
                    isSelected
                      ? 'bg-[#5A1226] text-white border-[#5A1226] shadow-xl scale-[1.01]'
                      : 'bg-white hover:bg-stone-50 text-slate-800 border-stone-200 hover:border-[#E5A823]'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm flex-shrink-0 transition-colors ${
                        isSelected
                          ? 'bg-[#E5A823] text-[#5A1226]'
                          : 'bg-stone-100 text-[#5A1226] group-hover:bg-[#5A1226] group-hover:text-[#E5A823]'
                      }`}
                    >
                      <ServiceIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <span
                        className={`text-[11px] font-bold uppercase tracking-wider block ${
                          isSelected ? 'text-[#E5A823]' : 'text-slate-400'
                        }`}
                      >
                        {service.tag}
                      </span>
                      <h4 className="text-base font-bold leading-tight">{service.title}</h4>
                    </div>
                  </div>

                  <ChevronRight
                    className={`w-5 h-5 transition-transform ${
                      isSelected ? 'text-[#E5A823] translate-x-1' : 'text-slate-400 group-hover:translate-x-1'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Right Column: Detailed View of Selected Service */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-stone-200 shadow-xl space-y-8 animate-in fade-in duration-300">
            <div className="flex items-start justify-between gap-4 border-b border-stone-200 pb-6">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-widest text-[#5A1226] bg-[#5A1226]/10 px-3 py-1 rounded-md inline-block">
                  {selectedService.tag}
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#5A1226]">
                  {selectedService.title}
                </h3>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-[#5A1226] text-[#E5A823] flex items-center justify-center flex-shrink-0 shadow-md">
                <IconComponent className="w-7 h-7" />
              </div>
            </div>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              {selectedService.description}
            </p>

            {/* Key Benefits */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#E5A823]" />
                Key Benefits & Service Highlights
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {selectedService.benefits.map((benefit, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 flex items-start gap-2.5"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-slate-700 font-medium leading-tight">
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Concrete Deliverables */}
            <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#5A1226] flex items-center gap-2">
                <Award className="w-4 h-4 text-[#E5A823]" />
                Tangible Student Deliverables
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedService.deliverables.map((deliv, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-lg bg-white border border-amber-200 text-xs font-bold text-slate-800 shadow-sm"
                  >
                    {deliv}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Button */}
            <div className="pt-2 flex items-center gap-4">
              <button
                onClick={() => {
                  if (onOpenConsultationModal) {
                    onOpenConsultationModal();
                  } else {
                    setActivePage('contact');
                  }
                }}
                className="px-6 py-3.5 rounded-full bg-[#5A1226] hover:bg-[#721832] text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer flex items-center gap-2"
              >
                <span>Book This Service</span>
                <ArrowRight className="w-4 h-4 text-[#E5A823]" />
              </button>
              <button
                onClick={() => setActivePage('destinations')}
                className="px-6 py-3.5 rounded-full bg-stone-100 hover:bg-stone-200 text-slate-800 font-bold text-xs sm:text-sm transition-all cursor-pointer"
              >
                Explore Destinations
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. 6-Stage Student Roadmap */}
      <section className="py-16 sm:py-24 bg-white border-t border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-[#5A1226]">
              Structured Journey
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#5A1226]">
              Your 6-Stage Journey from Application to Arrival
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              A transparent, predictable roadmap that eliminates guesswork and ensures total immigration success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workflowSteps.map((step) => (
              <div
                key={step.step}
                className="p-6 rounded-3xl bg-stone-50 border border-stone-200 hover:border-[#E5A823] transition-all space-y-4 relative group"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#5A1226] text-[#E5A823] flex items-center justify-center font-extrabold text-base shadow-sm">
                  {step.step}
                </div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#5A1226] transition-colors">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Embedded Interactive Assessment Profiler */}
      <Suspense fallback={null}>
        <InteractiveAssessmentTool />
      </Suspense>

      {/* 5. Consultation Banner */}
      <section className="py-16 bg-[#5A1226] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Ready for a Personalized Profile Assessment?
          </h2>
          <p className="text-slate-200 text-sm sm:text-base">
            Speak with an authorized admissions counselor today to evaluate your eligibility and scholarship prospects.
          </p>
          <button
            onClick={() => {
              if (onOpenConsultationModal) {
                onOpenConsultationModal();
              } else {
                setActivePage('contact');
              }
            }}
            className="px-8 py-4 rounded-full bg-[#E5A823] hover:bg-[#d49515] text-[#5A1226] font-bold text-sm shadow-xl transition-all cursor-pointer hover:scale-105"
          >
            Start Free Assessment Form
          </button>
        </div>
      </section>
    </div>
  );
};
