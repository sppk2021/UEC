import React, { useState } from 'react';
import {
  History,
  ShieldCheck,
  Sparkles,
  Award,
  Globe2,
  Users2,
  CheckCircle2,
  Building2,
  MapPin,
  TrendingUp,
  HeartHandshake,
  Check,
  X as CloseIcon,
  ChevronRight,
  BookOpen,
} from 'lucide-react';
import { CrestLogo } from './CrestLogo';
import { useWebsite } from '../context/WebsiteContext';

interface AboutUsProps {
  onOpenConsultationModal?: () => void;
}

export const AboutUs: React.FC<AboutUsProps> = ({ onOpenConsultationModal }) => {
  const { data } = useWebsite();
  const { agencyInfo } = data;
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
      title: 'Radical Transparency',
      subtitle: 'Zero Hidden Costs or False Promises',
      desc: 'We present full, unvarnished details regarding tuition fees, living expenses, embassy requirements, and realistic acceptance chances. What we quote is exactly what you pay.',
      icon: ShieldCheck,
      color: 'border-[#E5A823]',
      points: [
        'Itemized official application fees',
        'Transparent scholarship eligibility criteria',
        'No deceptive visa guarantees',
      ],
    },
    {
      title: 'Student-First Empathy',
      subtitle: 'Bespoke Pathways, Not Quotas',
      desc: 'Every student is unique. We evaluate your personal ambitions, family budget, and career goals to engineer a personalized educational pathway rather than pushing bulk partner programs.',
      icon: HeartHandshake,
      color: 'border-[#5A1226]',
      points: [
        'Tailored university selection based on student profile',
        'Direct consultation with senior education strategists',
        'Empathetic financial planning support',
      ],
    },
    {
      title: 'Academic Excellence',
      subtitle: 'Only Accredited & Recognized Institutions',
      desc: 'We partner exclusively with recognized global universities with rigorous academic standing, ensuring your degree carries international prestige and accredited value worldwide.',
      icon: Award,
      color: 'border-[#E5A823]',
      points: [
        'Verified global rankings & faculty credentials',
        'Programs with recognized credit-transfer systems',
        'Direct links with institutional admissions officers',
      ],
    },
    {
      title: 'Unbroken Continuity',
      subtitle: 'End-to-End Care Past the Visa Stamp',
      desc: 'Our relationship does not end at visa clearance. We escort students through pre-departure packing, airport transfers, dormitory check-in, and local residency legalization.',
      icon: Users2,
      color: 'border-[#5A1226]',
      points: [
        'Pre-departure orientation & survival guides',
        'Permesso di Soggiorno & visa extension support',
        'Active international student community & alumni network',
      ],
    },
  ];

  const uniquenessDifferentiators = [
    {
      title: 'Dual-Shore Ground Support',
      desc: 'Unlike traditional agencies that terminate service at the airport, we operate physical offices in student home cities (Yangon, Mandalay) AND destination hubs (Messina, Bangkok). Our team meets you in-country to handle housing, bank accounts, and residency permits.',
      icon: Globe2,
    },
    {
      title: 'Scholarship & Regional Grant Mastery',
      desc: 'We specialize in unlocking tuition-free education programs, such as Italy’s regional DSU/ERSU scholarships (which cover up to 100% of tuition plus annual living stipends) and bilateral ASEAN/Chinese government grants.',
      icon: Award,
    },
    {
      title: 'Flawless Legal & Embassy Dossier Prep',
      desc: 'Our dedicated legal team manages complex documentation including Declarations of Value (DOV), CIMEA comparability statements, certified apostilles, and intensive 1-on-1 embassy mock interview sessions.',
      icon: ShieldCheck,
    },
    {
      title: 'Ethical, Commission-Free University Matching',
      desc: 'We never funnel students into low-tier colleges for high agent commissions. Your career trajectory, scholarship feasibility, and long-term residency options dictate every recommendation we formulate.',
      icon: Sparkles,
    },
  ];

  const comparisonData = [
    {
      aspect: 'Agency Focus & University Matching',
      traditional: 'Pushes high-commission private colleges regardless of student fit',
      ueca: 'Curates top-tier accredited public & private universities tailored to student career aspirations',
    },
    {
      aspect: 'Post-Visa & Arrival Support',
      traditional: 'Services end once visa is granted; student is left on their own',
      ueca: 'Physical on-the-ground team in Italy & Thailand assists with housing, residency permits & onboarding',
    },
    {
      aspect: 'Scholarship & Financial Aid Focus',
      traditional: 'Limited to generic discounts or high-tuition partner institutions',
      ueca: 'Deep specialization in regional grants (DSU/ERSU), tuition waivers & full financial aid packages',
    },
    {
      aspect: 'Documentation & Visa Preparation',
      traditional: 'Basic checklist with minimal embassy coaching',
      ueca: 'Legal document legalization (DOV/CIMEA), financial dossier auditing & 1-on-1 mock interview drill',
    },
  ];

  return (
    <section id="about-us" className="relative py-16 sm:py-24 bg-[#FAF8F5] overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#E5A823]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#5A1226]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-12 border-b border-stone-200 pb-8">
          <div className="lg:col-span-7 space-y-3">
            <div className="flex items-center gap-3">
              <CrestLogo variant="compact" />
              <span className="text-xs font-bold uppercase tracking-widest text-[#E5A823]">
                Who We Are
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#5A1226] tracking-tight">
              About <span className="text-[#E5A823]">{agencyInfo.name}</span>
            </h2>
            <p className="text-slate-700 text-base sm:text-lg leading-relaxed">
              Empowering students across Myanmar and Southeast Asia with honest, world-class academic counseling,
              unrivaled scholarship access, and lifelong on-the-ground support across Europe and Asia.
            </p>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-lg border-2 border-[#E5A823]/30 group">
              <img
                src="/src/assets/images/about_us_headline_1791445385165.jpg"
                alt="About U Education team and international students"
                referrerPolicy="no-referrer"
                className="w-full h-52 sm:h-60 object-cover transform transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-3 right-3 px-3 py-1.5 bg-black/40 backdrop-blur-md rounded-xl text-white flex items-center justify-between text-xs">
                <span className="font-semibold text-[#E5A823]">U Education Heritage</span>
                <span className="font-bold">Est. 2019</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Highlights Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-12">
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-stone-200 shadow-xs text-center space-y-1 hover:border-[#E5A823] transition-colors">
            <div className="text-2xl sm:text-4xl font-extrabold text-[#5A1226]">1,500+</div>
            <div className="text-xs sm:text-sm font-semibold text-slate-700">Successful Placements</div>
            <div className="text-[11px] text-slate-500">Across Europe & Asia</div>
          </div>
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-stone-200 shadow-xs text-center space-y-1 hover:border-[#E5A823] transition-colors">
            <div className="text-2xl sm:text-4xl font-extrabold text-[#E5A823]">98.4%</div>
            <div className="text-xs sm:text-sm font-semibold text-slate-700">Visa Success Rate</div>
            <div className="text-[11px] text-slate-500">Dossier-verified filings</div>
          </div>
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-stone-200 shadow-xs text-center space-y-1 hover:border-[#E5A823] transition-colors">
            <div className="text-2xl sm:text-4xl font-extrabold text-[#5A1226]">$3.2M+</div>
            <div className="text-xs sm:text-sm font-semibold text-slate-700">Scholarships Secured</div>
            <div className="text-[11px] text-slate-500">Tuition grants & DSU awards</div>
          </div>
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-stone-200 shadow-xs text-center space-y-1 hover:border-[#E5A823] transition-colors">
            <div className="text-2xl sm:text-4xl font-extrabold text-[#E5A823]">4 Hubs</div>
            <div className="text-xs sm:text-sm font-semibold text-slate-700">International Offices</div>
            <div className="text-[11px] text-slate-500">Yangon, Mandalay, BKK, Messina</div>
          </div>
        </div>

        {/* Interactive Navigation Tabs */}
        <div className="flex items-center justify-center sm:justify-start gap-2 sm:gap-3 p-1.5 bg-stone-200/70 rounded-2xl max-w-xl mx-auto sm:mx-0 mb-10">
          <button
            id="tab-about-history"
            onClick={() => setActiveTab('history')}
            className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer flex-1 justify-center ${
              activeTab === 'history'
                ? 'bg-[#5A1226] text-white shadow-md'
                : 'text-slate-700 hover:text-[#5A1226] hover:bg-white/60'
            }`}
          >
            <History className="w-4 h-4 text-[#E5A823]" />
            <span>Our History</span>
          </button>
          <button
            id="tab-about-values"
            onClick={() => setActiveTab('values')}
            className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer flex-1 justify-center ${
              activeTab === 'values'
                ? 'bg-[#5A1226] text-white shadow-md'
                : 'text-slate-700 hover:text-[#5A1226] hover:bg-white/60'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-[#E5A823]" />
            <span>Core Values</span>
          </button>
          <button
            id="tab-about-unique"
            onClick={() => setActiveTab('unique')}
            className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer flex-1 justify-center ${
              activeTab === 'unique'
                ? 'bg-[#5A1226] text-white shadow-md'
                : 'text-slate-700 hover:text-[#5A1226] hover:bg-white/60'
            }`}
          >
            <Sparkles className="w-4 h-4 text-[#E5A823]" />
            <span>What Makes Us Unique</span>
          </button>
        </div>

        {/* Tab 1: Brief History & Journey */}
        {activeTab === 'history' && (
          <div className="space-y-10 animate-fade-in">
            {/* Story Narrative Box */}
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-sm relative overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#5A1226]/5 text-[#5A1226] text-xs font-bold uppercase tracking-wider">
                    <History className="w-3.5 h-3.5 text-[#E5A823]" />
                    <span>Our Founding Story</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-[#5A1226] leading-tight">
                    Pioneering Transparent, Compassionate International Education Since 2019
                  </h3>
                  <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                    {agencyInfo.name} was established with a singular conviction: that every aspiring student deserves access to accurate, ethical, and uncompromised guidance when pursuing global degrees.
                  </p>
                  <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                    Witnessing how traditional consultancies often imposed opaque agency markups or directed students solely toward institutions offering high recruitment kickbacks, our founders set out to build an agency that puts the student’s intellectual and financial interests first.
                  </p>
                  <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-medium text-[#5A1226]">
                    Today, with permanent representative hubs across Myanmar, Thailand, and Italy, we stand as one of the region’s most respected education consultancies for Italian, Thai, Chinese, and Malaysian higher education.
                  </p>
                </div>

                <div className="lg:col-span-5 relative">
                  <div className="rounded-2xl overflow-hidden shadow-md border-2 border-stone-100 bg-stone-900 group">
                    <img
                      src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop"
                      alt="Education counselors collaborating with university students"
                      className="w-full h-72 sm:h-80 object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#5A1226]/90 via-[#5A1226]/30 to-transparent flex items-end p-6">
                      <div className="text-white space-y-1">
                        <div className="text-xs font-bold uppercase tracking-widest text-[#E5A823]">
                          On-The-Ground Presence
                        </div>
                        <div className="text-sm font-semibold">
                          From Yangon & Mandalay classrooms to historic European university squares.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline Milestones */}
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-[#E5A823]" />
                <h3 className="text-xl font-bold text-[#5A1226]">Our Key Milestones</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {milestones.map((m, idx) => {
                  const Icon = m.icon;
                  return (
                    <div
                      key={idx}
                      className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs hover:border-[#E5A823] hover:shadow-md transition-all flex flex-col justify-between group"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xl font-extrabold text-[#5A1226] group-hover:text-[#E5A823] transition-colors">
                            {m.year}
                          </span>
                          <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#5A1226]/10 text-[#5A1226]">
                            {m.badge}
                          </span>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-[#5A1226]/5 flex items-center justify-center text-[#5A1226] group-hover:bg-[#E5A823] group-hover:text-[#5A1226] transition-colors">
                          <Icon className="w-5 h-5" />
                        </div>
                        <h4 className="text-base font-bold text-slate-900 leading-snug">
                          {m.title}
                        </h4>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          {m.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Core Values */}
        {activeTab === 'values' && (
          <div className="space-y-8 animate-fade-in">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#5A1226]">
                The Moral Compass That Guides Every Student File
              </h3>
              <p className="text-slate-600 text-sm sm:text-base">
                Our consultancy is anchored in four uncompromising core values that safeguard students and their families.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {coreValues.map((val, idx) => {
                const Icon = val.icon;
                return (
                  <div
                    key={idx}
                    className={`bg-white rounded-3xl p-6 sm:p-8 border-2 ${val.color} shadow-sm hover:shadow-lg transition-all flex flex-col justify-between group`}
                  >
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="w-12 h-12 rounded-2xl bg-[#5A1226] text-[#E5A823] flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                          <Icon className="w-6 h-6" />
                        </div>
                        <span className="text-xs font-bold text-slate-400">0{idx + 1}</span>
                      </div>

                      <div>
                        <h4 className="text-xl sm:text-2xl font-extrabold text-[#5A1226]">
                          {val.title}
                        </h4>
                        <p className="text-xs font-semibold uppercase tracking-wider text-[#E5A823] mt-0.5">
                          {val.subtitle}
                        </p>
                        <p className="text-slate-700 text-sm leading-relaxed mt-3">
                          {val.desc}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-stone-100 space-y-2">
                        {val.points.map((pt, pIdx) => (
                          <div key={pIdx} className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                            <CheckCircle2 className="w-4 h-4 text-[#E5A823] flex-shrink-0" />
                            <span>{pt}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Ethical Pledge Callout */}
            <div className="bg-[#5A1226] text-white p-6 sm:p-8 rounded-3xl shadow-lg border border-[#E5A823]/40 flex flex-col sm:flex-row items-center gap-6">
              <div className="p-4 bg-[#E5A823] text-[#5A1226] rounded-2xl flex-shrink-0 shadow-md">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <div className="space-y-1 text-center sm:text-left">
                <div className="text-xs font-bold uppercase tracking-widest text-[#E5A823]">
                  Our Formal Ethics Guarantee
                </div>
                <p className="text-sm sm:text-base text-slate-100 font-medium leading-relaxed">
                  "{agencyInfo.ethicalPledge}"
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: What Makes Us Unique */}
        {activeTab === 'unique' && (
          <div className="space-y-12 animate-fade-in">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#5A1226]">
                The U Education Difference: Why Students Trust Us
              </h3>
              <p className="text-slate-600 text-sm sm:text-base">
                Discover what sets our methodology apart from standard commercial education agencies.
              </p>
            </div>

            {/* 4 Differentiator Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {uniquenessDifferentiators.map((diff, idx) => {
                const Icon = diff.icon;
                return (
                  <div
                    key={idx}
                    className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200 shadow-xs hover:border-[#E5A823] hover:shadow-md transition-all flex flex-col justify-between group"
                  >
                    <div className="space-y-4">
                      <div className="w-12 h-12 rounded-2xl bg-[#5A1226]/5 text-[#5A1226] flex items-center justify-center group-hover:bg-[#5A1226] group-hover:text-[#E5A823] transition-colors">
                        <Icon className="w-6 h-6" />
                      </div>
                      <h4 className="text-lg font-extrabold text-[#5A1226] leading-snug">
                        {diff.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {diff.desc}
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-stone-100 flex items-center gap-1.5 text-xs font-bold text-[#E5A823]">
                      <span>Exclusive Standard</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Side-by-Side Comparison Table */}
            <div className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden">
              <div className="p-6 sm:p-8 bg-[#5A1226] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h4 className="text-xl sm:text-2xl font-extrabold text-white">
                    Comparison: Traditional Agents vs. U Education
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1">
                    Clear, uncompromising standards protecting student career investments.
                  </p>
                </div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E5A823] text-[#5A1226] text-xs font-bold uppercase tracking-wider self-start sm:self-auto">
                  <Sparkles className="w-3.5 h-3.5" />
                  Verified Difference
                </span>
              </div>

              <div className="divide-y divide-stone-200 overflow-x-auto">
                {comparisonData.map((row, idx) => (
                  <div key={idx} className="grid grid-cols-1 md:grid-cols-12 p-5 sm:p-6 gap-4 items-center hover:bg-stone-50/70 transition-colors">
                    <div className="md:col-span-4">
                      <div className="text-xs font-bold uppercase tracking-wider text-[#5A1226]">
                        {row.aspect}
                      </div>
                    </div>
                    <div className="md:col-span-4 bg-red-50/60 p-3.5 rounded-xl border border-red-100">
                      <div className="flex items-start gap-2 text-xs text-red-900">
                        <CloseIcon className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <strong className="block font-bold text-red-800">Traditional Agency:</strong>
                          <span>{row.traditional}</span>
                        </div>
                      </div>
                    </div>
                    <div className="md:col-span-4 bg-emerald-50/60 p-3.5 rounded-xl border border-emerald-100">
                      <div className="flex items-start gap-2 text-xs text-emerald-950">
                        <Check className="w-4 h-4 text-emerald-700 flex-shrink-0 mt-0.5" />
                        <div>
                          <strong className="block font-bold text-emerald-800">U Education Standard:</strong>
                          <span>{row.ueca}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Action Banner for the Section */}
        <div className="mt-14 p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#5A1226] via-[#6B152E] to-[#5A1226] text-white text-center sm:text-left flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border border-[#E5A823]/40">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[#E5A823] text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ready for Your Global Journey?</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Experience Education Consulting Rooted in Genuine Care
            </h3>
            <p className="text-sm text-slate-200">
              Schedule a one-on-one assessment with our licensed education consultants in Yangon, Mandalay, Bangkok, or Messina.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 flex-shrink-0">
            {onOpenConsultationModal && (
              <button
                id="about-book-consultation-btn"
                onClick={onOpenConsultationModal}
                className="px-6 py-3.5 rounded-xl bg-[#E5A823] text-[#5A1226] font-extrabold text-sm hover:bg-[#f0b533] transition-colors shadow-md cursor-pointer flex items-center gap-2"
              >
                <span>Book Free Assessment</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
            <a
              id="about-explore-destinations-btn"
              href="#destinations"
              className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm transition-colors border border-white/20"
            >
              <span>Explore Destinations</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
