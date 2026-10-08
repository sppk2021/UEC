import React, { useState } from 'react';
import {
  History,
  ShieldCheck,
  Award,
  Globe2,
  CheckCircle2,
  Building2,
  MapPin,
  TrendingUp,
  HeartHandshake,
  Check,
  X as CloseIcon,
  BookOpen,
} from 'lucide-react';
import { CrestLogo } from '../components/CrestLogo';
import { useWebsite } from '../context/WebsiteContext';
import { VisionMission } from '../components/VisionMission';
import { PartnersGroup } from '../components/PartnersGroup';

interface AboutPageProps {
  onOpenConsultationModal?: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenConsultationModal }) => {
  const { setActivePage } = useWebsite();
  const [activeTab, setActiveTab] = useState<'history' | 'values' | 'unique'>('history');

  const milestones = [
    {
      year: '2019',
      title: 'Foundation & Academic Vision',
      desc: 'Established to dismantle predatory middleman fees and provide genuine, student-focused academic counseling for European and Asian higher education.',
      badge: 'Inception',
      icon: BookOpen,
    },
    {
      year: '2021',
      title: 'European Ground Support in Messina, Italy',
      desc: 'Pioneered on-the-ground assistance by establishing our liaison hub in Messina, providing arriving students with real housing, residency, and university onboarding.',
      badge: 'European Hub',
      icon: MapPin,
    },
    {
      year: '2023',
      title: 'Regional Hubs in Yangon, Mandalay & Bangkok',
      desc: 'Expanded physical operations across Myanmar and Thailand to provide in-person counseling, document legalizations, and language preparation.',
      badge: 'Expansion',
      icon: Building2,
    },
    {
      year: '2025–2026',
      title: '1,500+ Successes & $3.2M+ in Scholarships',
      desc: 'Achieved a 98.4% visa approval rate across Italy, Thailand, China, and Malaysia, helping students access tuition-free regional grants and top academic rankings.',
      badge: 'Milestone',
      icon: TrendingUp,
    },
  ];

  const coreValues = [
    {
      id: 'transparency',
      title: 'Radical Transparency',
      subtitle: 'Zero Hidden Markups',
      desc: 'Every fee, deadline, and university criterion is stated with 100% clarity upfront. We never inflate university tuition, invent secret paperwork surcharges, or promise unrealistic admissions.',
      color: 'border-amber-400 bg-amber-50/50',
      icon: ShieldCheck,
      points: [
        'Direct university invoice verification',
        'Official embassy fee schedules published',
        'Transparent refund and service commitments',
      ],
    },
    {
      id: 'empathy',
      title: 'Student-First Empathy',
      subtitle: 'Holistic Individual Profiling',
      desc: 'We do not push students into partner quotas. We take the time to deeply understand your financial background, intellectual passion, and career dreams to find your genuine match.',
      color: 'border-[#5A1226]/30 bg-rose-50/40',
      icon: HeartHandshake,
      points: [
        'Tailored budget-aligned destination mapping',
        'Personalized Statement of Purpose (SOP) coaching',
        'Parental consultation & financial planning',
      ],
    },
    {
      id: 'excellence',
      title: 'Academic & Legal Rigor',
      subtitle: 'Flawless Dossier Preparation',
      desc: 'Our legal and admissions specialists verify every single transcript, DOV, CIMEA comparability certificate, and bank endorsement with meticulous attention to detail.',
      color: 'border-emerald-500/30 bg-emerald-50/40',
      icon: Award,
      points: [
        '98.4% verified visa approval track record',
        'Certified DOV and CIMEA documentation pipeline',
        'Embossed translation and embassy compliance audits',
      ],
    },
    {
      id: 'continuity',
      title: 'Ground Continuity',
      subtitle: 'Support That Follows You Abroad',
      desc: 'Our work does not end when your visa is stamped. Through our permanent liaison hub in Messina and Bangkok, we guide you through dorm check-in, residency permits, and student life.',
      color: 'border-cyan-500/30 bg-cyan-50/40',
      icon: Globe2,
      points: [
        'On-site student representative in Sicily, Italy',
        'Direct airport greeting & housing placement',
        'Permesso di Soggiorno & Italian tax code (Codice Fiscale) support',
      ],
    },
  ];

  const differentiators = [
    {
      feature: 'Fee Structure & Transparency',
      traditional: 'Inflated university fees, hidden document markups, commission-driven push',
      ueca: 'Zero hidden agency markups, direct transparent billing, unbiased recommendations',
    },
    {
      feature: 'European Ground Support',
      traditional: 'Disappears after airport departure; student left on their own',
      ueca: 'Dedicated Messina (Italy) European hub for housing, SIM, bank & residency permit',
    },
    {
      feature: 'Scholarship Expertise',
      traditional: 'Merit-only focus or vague promises without financial aid strategies',
      ueca: 'Regional DSU/EDISU grant mastery (€6K–€8K/yr living stipends + 100% tuition waivers)',
    },
    {
      feature: 'Document & Legal Accuracy',
      traditional: 'Generic templates resulting in frequent visa and DOV rejections',
      ueca: 'Strict CIMEA/DOV audit, certified legal translations, customized SOP reviews',
    },
    {
      feature: 'Counseling & Mentorship',
      traditional: 'Sales-quota agents with limited knowledge of overseas curriculums',
      ueca: 'Certified educational advisors & alumni with first-hand European & Asian academic experience',
    },
  ];

  return (
    <div className="bg-[#FAF8F5]">
      {/* 1. Page Header */}
      <section className="relative py-16 sm:py-24 bg-[#5A1226] text-white overflow-hidden border-b border-[#E5A823]/20">
        <div className="absolute inset-0 bg-gradient-to-b from-[#5A1226] via-[#4A0E1F] to-[#5A1226] pointer-events-none" />
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#E5A823]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-7 flex flex-col items-start space-y-4">
              <CrestLogo variant="light" />
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-widest text-[#E5A823]">
                  Heritage, Ethos & Distinction
                </span>
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                  About <span className="text-[#E5A823]">U Education</span>
                </h1>
              </div>
              <p className="text-slate-200 text-base sm:text-lg leading-relaxed pt-2">
                Founded on the bedrock of radical transparency and genuine student advocacy, U Education Consultant Agency bridges ambitious scholars with world-class academic opportunities across Europe and Asia.
              </p>
            </div>

            {/* Landing Headline Hero Image */}
            <div className="lg:col-span-5 relative mt-4 lg:mt-0">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-[#E5A823]/30 group">
                <img
                  src="/src/assets/images/about_us_headline_1791445385165.jpg"
                  alt="U Education academic counseling mentors and university students"
                  referrerPolicy="no-referrer"
                  className="w-full h-64 sm:h-72 lg:h-80 object-cover transform transition-transform duration-700 group-hover:scale-105"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-3 right-3 p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 text-white flex items-center justify-between">
                  <div>
                    <p className="text-[11px] font-bold text-[#E5A823] uppercase tracking-wider">Heritage & Campus Mentorship</p>
                    <p className="text-xs text-white/95 font-medium">Guiding Scholars Since 2019</p>
                  </div>
                  <div className="px-2.5 py-1 rounded-full bg-[#E5A823] text-[#5A1226] text-[11px] font-black shadow-sm">
                    1,500+ Alumni
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tab Controls */}
          <div className="mt-10 pt-6 border-t border-white/10 flex flex-wrap items-center gap-3">
            <button
              onClick={() => setActiveTab('history')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'history'
                  ? 'bg-[#E5A823] text-[#5A1226] shadow-md'
                  : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
            >
              Our History & Milestones
            </button>
            <button
              onClick={() => setActiveTab('values')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'values'
                  ? 'bg-[#E5A823] text-[#5A1226] shadow-md'
                  : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
            >
              Core Values & Ethos
            </button>
            <button
              onClick={() => setActiveTab('unique')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'unique'
                  ? 'bg-[#E5A823] text-[#5A1226] shadow-md'
                  : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
            >
              What Makes Us Unique
            </button>
          </div>
        </div>
      </section>

      {/* 2. Dynamic Content Area based on Tab */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {activeTab === 'history' && (
          <div className="space-y-16 animate-in fade-in duration-300">
            {/* Story narrative */}
            <div className="bg-white rounded-3xl p-8 sm:p-12 border border-stone-200 shadow-sm space-y-6">
              <div className="flex items-center gap-2 text-xs font-bold text-[#5A1226] uppercase tracking-wider">
                <History className="w-4 h-4 text-[#E5A823]" />
                <span>Our Founding Story</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold text-[#5A1226] leading-tight">
                Born to Transform International Education Consulting
              </h2>
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
                U Education Consultant Agency was established in 2019 by a collective of European alumni and international educators who witnessed first-hand the systemic challenges faced by students: exorbitant hidden broker markups, misinformation regarding foreign university admission requirements, and complete abandonment after visa approval.
              </p>
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
                We pioneered a new consulting model centered on total transparency, realistic budget-aligned pathway design, and dual-shore continuity. By establishing our European ground support hub in Messina (Sicily, Italy) alongside our regional counseling offices in Yangon and Mandalay, and our Southeast Asian corporate liaison in Bangkok through MTKN Thailand Group, we ensure students have an advocate by their side from their first diagnostic interview all the way to their first lecture hall.
              </p>
            </div>

            {/* Timeline Milestones */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-[#5A1226]">Key Agency Milestones</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {milestones.map((m, idx) => {
                  const Icon = m.icon;
                  return (
                    <div
                      key={idx}
                      className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                    >
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-2xl font-extrabold text-[#5A1226]">{m.year}</span>
                          <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-[#5A1226]/10 text-[#5A1226]">
                            {m.badge}
                          </span>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-amber-50 text-[#5A1226] flex items-center justify-center">
                          <Icon className="w-5 h-5 text-[#5A1226]" />
                        </div>
                        <h4 className="text-lg font-bold text-slate-900 leading-snug">{m.title}</h4>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{m.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'values' && (
          <div className="space-y-10 animate-in fade-in duration-300">
            <div className="max-w-3xl space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-[#5A1226]">
                Our Guiding Principles
              </span>
              <h2 className="text-2xl sm:text-4xl font-bold text-[#5A1226]">
                The Four Pillars of U Education Integrity
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                These core commitments govern every recommendation we provide, ensuring honest assessments and unmatched student welfare.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {coreValues.map((val) => {
                const Icon = val.icon;
                return (
                  <div
                    key={val.id}
                    className={`rounded-3xl p-8 border ${val.color} shadow-sm space-y-5 bg-white flex flex-col justify-between`}
                  >
                    <div className="space-y-4">
                      <div className="w-12 h-12 rounded-2xl bg-[#5A1226] text-[#E5A823] flex items-center justify-center">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-[#5A1226] uppercase tracking-wider">
                          {val.subtitle}
                        </span>
                        <h3 className="text-xl sm:text-2xl font-bold text-slate-900">{val.title}</h3>
                      </div>
                      <p className="text-slate-600 text-sm sm:text-base leading-relaxed">{val.desc}</p>
                    </div>

                    <div className="pt-4 border-t border-stone-200/80 space-y-2">
                      {val.points.map((pt, pidx) => (
                        <div key={pidx} className="flex items-center gap-2 text-xs sm:text-sm text-slate-700 font-medium">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                          <span>{pt}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'unique' && (
          <div className="space-y-10 animate-in fade-in duration-300">
            <div className="max-w-3xl space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-[#5A1226]">
                Comparison & Distinction
              </span>
              <h2 className="text-2xl sm:text-4xl font-bold text-[#5A1226]">
                Why Ambitious Families Choose U Education
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                See how our student-centric model compares directly against traditional commission-driven agents.
              </p>
            </div>

            <div className="bg-white rounded-3xl border border-stone-200 shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#5A1226] text-white text-xs sm:text-sm uppercase tracking-wider">
                      <th className="p-4 sm:p-6 font-bold">Evaluation Criteria</th>
                      <th className="p-4 sm:p-6 font-bold text-slate-300">Traditional Agency Model</th>
                      <th className="p-4 sm:p-6 font-bold text-[#E5A823]">U Education Consultant Agency</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-200 text-xs sm:text-sm">
                    {differentiators.map((diff, index) => (
                      <tr key={index} className="hover:bg-stone-50 transition-colors">
                        <td className="p-4 sm:p-6 font-bold text-[#5A1226] align-top w-1/4">
                          {diff.feature}
                        </td>
                        <td className="p-4 sm:p-6 text-slate-600 align-top w-3/8 bg-rose-50/20">
                          <div className="flex items-start gap-2">
                            <CloseIcon className="w-4 h-4 text-rose-500 flex-shrink-0 mt-0.5" />
                            <span>{diff.traditional}</span>
                          </div>
                        </td>
                        <td className="p-4 sm:p-6 text-slate-900 font-semibold align-top w-3/8 bg-emerald-50/20">
                          <div className="flex items-start gap-2">
                            <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                            <span>{diff.ueca}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* 3. Vision, Mission & Ethical Commitment (Slide 4) */}
      <VisionMission />

      {/* 4. Delegated Partners & Corporate Group (Slide 3) */}
      <PartnersGroup />

      {/* 5. Bottom Consultation Banner */}
      <section className="py-16 bg-[#5A1226] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Experience the U Education Difference Firsthand
          </h2>
          <p className="text-slate-200 text-sm sm:text-base max-w-xl mx-auto">
            Book a complimentary 1-on-1 counseling session at our Yangon, Mandalay, or Bangkok centers.
          </p>
          <div className="pt-2 flex justify-center gap-4">
            <button
              onClick={() => {
                if (onOpenConsultationModal) {
                  onOpenConsultationModal();
                } else {
                  setActivePage('contact');
                }
              }}
              className="px-8 py-3.5 rounded-full bg-[#E5A823] hover:bg-[#d49515] text-[#5A1226] font-bold text-sm shadow-xl transition-all cursor-pointer"
            >
              Book Free Assessment
            </button>
            <button
              onClick={() => setActivePage('services')}
              className="px-8 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 transition-all cursor-pointer"
            >
              Explore Our Services
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
