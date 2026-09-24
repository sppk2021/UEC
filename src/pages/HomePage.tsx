import React, { useState, Suspense, lazy } from 'react';
import {
  ArrowRight,
  ChevronRight,
  X,
  Eye,
  Award,
  Building2,
} from 'lucide-react';
import { useWebsite } from '../context/WebsiteContext';
import { Hero } from '../components/Hero';
import { Introduction } from '../components/Introduction';
import { CrestLogo } from '../components/CrestLogo';
import { StudyDestination } from '../types';

const InteractiveAssessmentTool = lazy(() =>
  import('../components/InteractiveAssessmentTool').then((m) => ({
    default: m.InteractiveAssessmentTool,
  }))
);

const TestimonialsFaq = lazy(() =>
  import('../components/TestimonialsFaq').then((m) => ({ default: m.TestimonialsFaq }))
);

interface HomePageProps {
  onOpenConsultationModal?: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenConsultationModal }) => {
  const { data, setActivePage } = useWebsite();
  const { services, destinations, offices, blogPosts } = data;

  const [quickViewDest, setQuickViewDest] = useState<StudyDestination | null>(null);

  const featuredPosts = (blogPosts || []).slice(0, 3);

  return (
    <div className="bg-[#FAF8F5]">
      {/* 1. Hero Section */}
      <Hero
        onOpenConsultation={() => {
          if (onOpenConsultationModal) {
            onOpenConsultationModal();
          } else {
            setActivePage('contact');
          }
        }}
      />

      {/* 2. Executive Introduction */}
      <Introduction />

      {/* 3. Study Destinations Spotlight (Modern, Colorful & Clean) */}
      <section
        id="featured-study-destinations"
        className="py-16 sm:py-24 bg-gradient-to-b from-[#FAF8F5] to-white text-slate-900 relative overflow-hidden border-t border-stone-200 scroll-mt-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="space-y-3 max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-widest text-[#5A1226] bg-[#5A1226]/5 px-3 py-1 rounded-full border border-[#5A1226]/15">
                Top Study Destinations
              </span>
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-[#5A1226] leading-tight">
                Pathway to World-Class <br />
                <span className="text-[#E5A823]">International Degrees</span>
              </h2>
              <div className="w-20 h-1.5 bg-[#E5A823] rounded-full" />
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed pt-1">
                Explore specialized university networks across <strong>Italy</strong>, <strong>Thailand</strong>, <strong>China</strong>, <strong>Malaysia</strong>, and <strong>Cambodia</strong> with full scholarship support and ground guidance.
              </p>
            </div>

            <button
              onClick={() => setActivePage('destinations')}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#5A1226] hover:bg-[#721832] text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer whitespace-nowrap"
            >
              <span>Explore All 5 Destinations</span>
              <ArrowRight className="w-4 h-4 text-[#E5A823]" />
            </button>
          </div>

          {/* Country Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {destinations.map((dest) => (
              <div
                key={dest.id}
                onClick={() => setActivePage('destinations', { destinationId: dest.id, scrollToTop: true })}
                className="rounded-3xl p-5 bg-white hover:bg-stone-50 border-2 border-stone-200 hover:border-[#E5A823] transition-all duration-300 flex flex-col justify-between cursor-pointer group hover:-translate-y-1 shadow-sm hover:shadow-xl"
              >
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl filter drop-shadow-xs">{dest.flagEmoji}</span>
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setQuickViewDest(dest);
                        }}
                        title={`Quick Preview ${dest.country}`}
                        className="p-1.5 rounded-lg bg-stone-100 hover:bg-[#5A1226] text-slate-600 hover:text-white transition-colors cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-2.5 py-0.5 rounded-md bg-stone-100 text-slate-800 border border-stone-200 text-[11px] font-black uppercase tracking-wider">
                        {dest.code}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-black text-slate-900 group-hover:text-[#5A1226] transition-colors flex items-center gap-1.5">
                      <span>{dest.country}</span>
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 font-medium line-clamp-2">
                      {dest.tagline}
                    </p>
                  </div>

                  <div className="p-3 rounded-2xl bg-[#FAF8F5] border border-stone-200/80 space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-500 font-medium">Avg. Tuition:</span>
                      <span className="font-bold text-slate-900">{dest.avgTuition.split('(')[0]}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500 font-medium">Grants:</span>
                      <span className="font-bold text-[#5A1226]">{dest.highlightBadge.split('•')[0]}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 mt-3 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-[#5A1226] group-hover:text-[#E5A823]">
                  <span>View Details</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>

          {/* Quick View Modal for Destination Data */}
          {quickViewDest && (
            <div
              onClick={() => setQuickViewDest(null)}
              className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-3xl max-w-2xl w-full p-5 sm:p-8 shadow-2xl border-2 border-[#E5A823] relative max-h-[90vh] overflow-y-auto space-y-6"
              >
                {/* Header with image */}
                <div className="relative rounded-2xl overflow-hidden -mt-1 -mx-1 sm:-mt-3 sm:-mx-3 p-5 sm:p-7 text-white">
                  <div className="absolute inset-0 z-0 bg-stone-900">
                    {quickViewDest.imageUrl && (
                      <img
                        src={quickViewDest.imageUrl}
                        alt={quickViewDest.country}
                        className="w-full h-full object-cover brightness-50"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/60 to-transparent" />
                  </div>

                  <div className="relative z-10 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-3xl">{quickViewDest.flagEmoji}</span>
                        <span className="px-2.5 py-0.5 rounded-md bg-[#E5A823] text-[#5A1226] text-xs font-black uppercase tracking-wider">
                          {quickViewDest.code} • {quickViewDest.highlightBadge}
                        </span>
                      </div>
                      <button
                        onClick={() => setQuickViewDest(null)}
                        className="p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-black text-white">
                      Study in {quickViewDest.country}
                    </h3>
                    <p className="text-slate-200 text-xs sm:text-sm font-medium">
                      {quickViewDest.tagline}
                    </p>
                  </div>
                </div>

                {/* Quick stats grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-stone-200">
                    <p className="text-xs font-semibold text-slate-500">Average Tuition</p>
                    <p className="text-sm font-black text-slate-900 mt-0.5">{quickViewDest.avgTuition}</p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-stone-200">
                    <p className="text-xs font-semibold text-slate-500">Living Costs & Housing</p>
                    <p className="text-sm font-black text-slate-900 mt-0.5">{quickViewDest.livingCost}</p>
                  </div>
                </div>

                {/* Scholarships info */}
                <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 space-y-1">
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-900">
                    <Award className="w-4 h-4 text-[#C2850A]" />
                    <span>Scholarships & Regional Funding</span>
                  </div>
                  <p className="text-xs text-amber-950 font-medium leading-relaxed">
                    {quickViewDest.scholarshipInfo}
                  </p>
                </div>

                {/* Top universities */}
                {quickViewDest.topUniversities && quickViewDest.topUniversities.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                      <Building2 className="w-4 h-4 text-[#5A1226]" />
                      <span>Featured Partner Universities</span>
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {quickViewDest.topUniversities.map((uni, uIdx) => (
                        <span
                          key={uIdx}
                          className="px-3 py-1 rounded-xl bg-stone-100 text-slate-800 text-xs font-semibold border border-stone-200"
                        >
                          {uni}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => {
                      const targetId = quickViewDest.id;
                      setQuickViewDest(null);
                      setActivePage('destinations', { destinationId: targetId, scrollToTop: true });
                    }}
                    className="flex-1 py-3.5 px-6 rounded-full bg-[#5A1226] hover:bg-[#721832] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
                  >
                    <span>View Full {quickViewDest.country} Guide in Our Study Destinations</span>
                    <ArrowRight className="w-4 h-4 text-[#E5A823]" />
                  </button>
                  <button
                    onClick={() => {
                      setQuickViewDest(null);
                      if (onOpenConsultationModal) {
                        onOpenConsultationModal();
                      } else {
                        setActivePage('contact');
                      }
                    }}
                    className="py-3.5 px-6 rounded-full bg-[#E5A823] hover:bg-[#d49515] text-[#5A1226] font-bold text-xs sm:text-sm transition-all cursor-pointer text-center"
                  >
                    Book Free Assessment
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 4. Core Services Pillars Summary */}
      <section className="py-16 sm:py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="space-y-3 max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-widest text-[#5A1226]">
                End-to-End Counseling Suite
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-[#5A1226] leading-tight">
                Our 5 Pillars of <br />
                <span className="text-[#E5A823]">Student Support</span>
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                From initial profiling and university selection to embassy visa defense and European airport greeting.
              </p>
            </div>

            <button
              onClick={() => setActivePage('services')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#5A1226] hover:bg-[#721832] text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer whitespace-nowrap"
            >
              <span>View Full Services Breakdown</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {services.map((service, index) => (
              <div
                key={service.id}
                onClick={() => setActivePage('services')}
                className="p-6 rounded-2xl bg-stone-50 border border-stone-200 hover:border-[#5A1226] hover:shadow-lg transition-all duration-300 flex flex-col justify-between cursor-pointer group"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-[#5A1226] text-[#E5A823] flex items-center justify-center font-bold text-sm">
                    {`0${index + 1}`}
                  </div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-[#5A1226] transition-colors leading-snug">
                    {service.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {service.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-stone-200 flex items-center gap-1 text-xs font-bold text-[#5A1226] group-hover:text-[#E5A823]">
                  <span>Learn more</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Featured Blog & Student Stories Section */}
      <section className="py-16 sm:py-24 bg-[#FAF8F5] border-t border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="space-y-3 max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-widest text-[#5A1226]">
                Latest from the Blog
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-[#5A1226] leading-tight">
                Student Success Stories & <br />
                <span className="text-[#E5A823]">Study Abroad Guides</span>
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Read real accounts of students who secured European scholarships, master test prep strategies, and city guides.
              </p>
            </div>

            <button
              onClick={() => setActivePage('blog')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#5A1226] hover:bg-[#721832] text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer whitespace-nowrap"
            >
              <span>Explore All Articles</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {featuredPosts.map((post) => (
              <div
                key={post.id}
                onClick={() => {
                  setActivePage('blog', { articleSlug: post.slug });
                }}
                className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between group hover:-translate-y-1"
              >
                <div>
                  <div className="aspect-[16/10] overflow-hidden bg-stone-100 relative">
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold shadow-sm bg-white text-[#5A1226] border border-stone-200">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <span>{post.publishedDate}</span>
                      <span aria-hidden="true">·</span>
                      <span>{post.readTime}</span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#5A1226] transition-colors leading-snug line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed line-clamp-2">
                      {post.summary}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2 border-t border-stone-100 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-700">{post.author.name}</span>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-[#5A1226] group-hover:text-[#E5A823]">
                    Read Story <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Interactive Student Pathway Profiler */}
      <Suspense fallback={null}>
        <InteractiveAssessmentTool />
      </Suspense>

      {/* 7. Global Counseling Hubs Snapshot */}
      <section className="py-16 sm:py-20 bg-white border-t border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-[#5A1226] bg-[#5A1226]/5 px-3 py-1 rounded-full border border-[#5A1226]/15">
                5 Global Centers
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-[#5A1226]">
                Our Counseling & Support Network
              </h2>
            </div>
            <button
              onClick={() => setActivePage('offices')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FAF8F5] hover:bg-stone-200 text-xs sm:text-sm font-bold text-[#5A1226] border border-stone-200 transition-colors cursor-pointer"
            >
              <span>View Office Addresses & Maps</span>
              <ArrowRight className="w-4 h-4 text-[#E5A823]" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {offices.map((office) => {
              const flagEmoji =
                office.flagEmoji ||
                (office.id === 'yangon' || office.id === 'mandalay'
                  ? '🇲🇲'
                  : office.id === 'bangkok'
                  ? '🇹🇭'
                  : office.id === 'cambodia'
                  ? '🇰🇭'
                  : '🇮🇹');

              return (
                <div
                  key={office.id}
                  onClick={() => setActivePage('offices')}
                  className="rounded-2xl bg-[#FAF8F5] hover:bg-white border-2 border-stone-200 hover:border-[#E5A823] transition-all cursor-pointer group shadow-2xs hover:shadow-lg overflow-hidden flex flex-col justify-between"
                >
                  <div>
                    <div className="aspect-[16/10] overflow-hidden relative">
                      <img
                        src={office.landmarkImage}
                        alt={office.city}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-xs text-white text-[11px] font-bold flex items-center gap-1">
                        <span>{flagEmoji}</span>
                        <span>{office.country}</span>
                      </div>
                    </div>

                    <div className="p-4 space-y-2">
                      <h4 className="font-black text-slate-900 group-hover:text-[#5A1226] text-sm flex items-center justify-between">
                        <span>{office.city}</span>
                        <span className="text-[10px] text-slate-400 uppercase font-mono">{office.countryCode || ''}</span>
                      </h4>
                      <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed">
                        {office.address}
                      </p>
                    </div>
                  </div>

                  <div className="p-4 pt-0 text-[11px] font-bold text-[#5A1226] group-hover:text-[#E5A823] flex items-center justify-between border-t border-stone-100 mt-2 pt-2">
                    <span>{office.hours.split(':')[0]} Open</span>
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 8. FAQs */}
      <Suspense fallback={null}>
        <TestimonialsFaq />
      </Suspense>

      {/* 9. Bottom Free Consultation Banner */}
      <section className="py-16 bg-[#5A1226] text-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative">
          <CrestLogo variant="light" />
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight">
            Begin Your International Higher Education Journey Today
          </h2>
          <p className="text-slate-200 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Schedule a confidential 1-on-1 profile evaluation with our expert counselors in Yangon, Mandalay, Bangkok, or online.
          </p>
          <div className="pt-4 flex flex-wrap justify-center items-center gap-4">
            <button
              onClick={() => {
                if (onOpenConsultationModal) {
                  onOpenConsultationModal();
                } else {
                  setActivePage('contact');
                }
              }}
              className="px-8 py-4 rounded-full bg-[#E5A823] hover:bg-[#d49515] text-[#5A1226] font-extrabold text-sm shadow-xl transition-all hover:scale-105 cursor-pointer"
            >
              Book Free Student Assessment
            </button>
            <button
              onClick={() => setActivePage('about')}
              className="px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 transition-all cursor-pointer"
            >
              Learn About Our Agency
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
