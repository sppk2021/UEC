import React, { useState, useMemo } from 'react';
import {
  Search,
  BookOpen,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  X,
  MessageCircle,
} from 'lucide-react';
import { useWebsite } from '../context/WebsiteContext';
import { BlogPost } from '../types';
import { CrestLogo } from '../components/CrestLogo';

interface BlogPageProps {
  onOpenConsultationModal?: () => void;
}

export const BlogPage: React.FC<BlogPageProps> = ({ onOpenConsultationModal }) => {
  const { data, selectedArticleSlug, setSelectedArticleSlug, setActivePage } = useWebsite();
  const blogPosts = data.blogPosts || [];
  const agencyInfo = data.agencyInfo;

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeArticle, setActiveArticle] = useState<BlogPost | null>(() => {
    if (selectedArticleSlug) {
      return blogPosts.find((p) => p.slug === selectedArticleSlug) || null;
    }
    return null;
  });

  const categories = ['All', 'Student Story', 'Study Tips', 'Destination Guide', 'Scholarships'];

  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchesCategory =
        selectedCategory === 'All' || post.category.toLowerCase() === selectedCategory.toLowerCase();
      const matchesSearch =
        searchQuery.trim() === '' ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (post.destinationTag && post.destinationTag.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [blogPosts, selectedCategory, searchQuery]);

  const featuredPost = useMemo(() => {
    return blogPosts.find((p) => p.featured) || blogPosts[0];
  }, [blogPosts]);

  const handleOpenArticle = (post: BlogPost) => {
    setActiveArticle(post);
    setSelectedArticleSlug(post.slug);
    window.history.pushState(
      { page: 'blog', articleSlug: post.slug },
      '',
      `#blog?article=${post.slug}`
    );
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCloseArticle = () => {
    setActiveArticle(null);
    setSelectedArticleSlug(null);
    window.history.pushState({ page: 'blog' }, '', '#blog');
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'student story':
        return 'text-[#0E7490] bg-cyan-50 border-cyan-200';
      case 'scholarships':
        return 'text-[#5A1226] bg-rose-50 border-rose-200';
      case 'study tips':
        return 'text-[#D97706] bg-amber-50 border-amber-200';
      case 'destination guide':
        return 'text-emerald-700 bg-emerald-50 border-emerald-200';
      default:
        return 'text-slate-700 bg-slate-100 border-slate-200';
    }
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen">
      {/* Blog Hero Header */}
      <section className="relative py-16 sm:py-24 bg-[#5A1226] text-white overflow-hidden border-b border-[#E5A823]/20">
        <div className="absolute inset-0 bg-gradient-to-b from-[#5A1226] via-[#4A0E1F] to-[#5A1226] pointer-events-none" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#E5A823]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-0 w-80 h-80 bg-dot-pattern-white opacity-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex flex-col items-start max-w-3xl space-y-4">
            <CrestLogo variant="light" />
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-[#E5A823]">
                Knowledge Base & Success Stories
              </span>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                Insights for Your <br />
                <span className="text-[#E5A823]">Global Academic Journey</span>
              </h1>
            </div>
            <p className="text-slate-200 text-base sm:text-lg leading-relaxed pt-2">
              Authentic student admission stories, step-by-step scholarship breakdowns, test preparation blueprints, and comprehensive destination guides written by our certified counselors and alumni.
            </p>
          </div>

          {/* Search & Filter Bar */}
          <div className="mt-10 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Category Segmented Filter */}
            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              {categories.map((cat) => {
                const isActive = selectedCategory.toLowerCase() === cat.toLowerCase();
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer whitespace-nowrap ${
                      isActive
                        ? 'bg-[#E5A823] text-[#5A1226] font-bold shadow-md'
                        : 'bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white border border-white/10'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles, countries, tips..."
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#E5A823] focus:bg-white/15 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Full Article Reader Modal / View */}
        {activeArticle ? (
          <article className="bg-white rounded-3xl border border-stone-200 shadow-xl overflow-hidden mb-16 animate-in fade-in duration-300">
            {/* Article Top Navigation Bar */}
            <div className="p-4 sm:p-6 bg-stone-50 border-b border-stone-200 flex items-center justify-between">
              <button
                onClick={handleCloseArticle}
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#5A1226] hover:text-[#721832] transition-colors cursor-pointer group"
              >
                <span className="p-1.5 rounded-lg bg-stone-200 group-hover:bg-[#5A1226] group-hover:text-white transition-colors">
                  &larr;
                </span>
                <span>Back to All Articles</span>
              </button>

              <div className="flex items-center gap-3 text-xs text-slate-500">
                <span>{activeArticle.readTime}</span>
                <span aria-hidden="true">·</span>
                <span>{activeArticle.publishedDate}</span>
              </div>
            </div>

            {/* Article Header & Image */}
            <div className="p-6 sm:p-10 lg:p-12 max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-4">
                <span
                  className={`px-3 py-1 rounded-md text-xs font-bold border ${getCategoryColor(
                    activeArticle.category
                  )}`}
                >
                  {activeArticle.category}
                </span>
                {activeArticle.destinationTag && (
                  <span className="text-xs font-semibold text-slate-500">
                    Destination: <strong className="text-slate-800">{activeArticle.destinationTag}</strong>
                  </span>
                )}
              </div>

              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#5A1226] leading-tight tracking-tight mb-4">
                {activeArticle.title}
              </h1>
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-6 font-medium">
                {activeArticle.subtitle}
              </p>

              {/* Author byline */}
              <div className="flex items-center gap-3 py-4 border-y border-stone-200 mb-8">
                <div className="w-11 h-11 rounded-full bg-[#5A1226] text-[#E5A823] flex items-center justify-center font-bold text-base flex-shrink-0">
                  {activeArticle.author.name.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">{activeArticle.author.name}</div>
                  <div className="text-xs text-slate-500">{activeArticle.author.role}</div>
                </div>
              </div>

              {/* Cover Image */}
              <div className="rounded-2xl overflow-hidden mb-10 shadow-md border border-stone-200 aspect-video max-h-[460px] w-full">
                <img
                  src={activeArticle.coverImage}
                  alt={activeArticle.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Key Takeaways Box */}
              {activeArticle.keyTakeaways && activeArticle.keyTakeaways.length > 0 && (
                <div className="mb-10 p-6 sm:p-8 rounded-2xl bg-amber-50/70 border border-amber-200">
                  <div className="flex items-center gap-2 text-sm font-bold text-[#5A1226] mb-3">
                    <Sparkles className="w-4 h-4 text-[#E5A823]" />
                    <span>Key Takeaways & Counselor Insights</span>
                  </div>
                  <ul className="space-y-2.5">
                    {activeArticle.keyTakeaways.map((takeaway, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-800 leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span>{takeaway}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Article Paragraphs */}
              <div className="space-y-6 text-slate-750 text-base sm:text-lg leading-relaxed font-normal">
                {activeArticle.content.map((paragraph, idx) => (
                  <p key={idx} className="leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* End of Article CTA */}
              <div className="mt-12 p-8 rounded-3xl bg-[#5A1226] text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-lg border border-[#E5A823]/30">
                <div className="space-y-1 text-center sm:text-left">
                  <h4 className="text-lg font-bold text-white">
                    Ready to Plan Your Higher Education Abroad?
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-200">
                    Book a complimentary 1-on-1 profile evaluation with our admissions specialists.
                  </p>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <button
                    onClick={() => {
                      if (onOpenConsultationModal) {
                        onOpenConsultationModal();
                      } else {
                        setActivePage('contact');
                      }
                    }}
                    className="px-5 py-3 rounded-full bg-[#E5A823] hover:bg-[#d49515] text-[#5A1226] font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer whitespace-nowrap"
                  >
                    Schedule Assessment
                  </button>
                  <a
                    href={`https://wa.me/${agencyInfo.whatsappNumber}?text=Hello%20U%20Education,%20I%20read%20your%20article%20'${encodeURIComponent(
                      activeArticle.title
                    )}'%20and%20want%20to%20inquire.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white transition-all shadow-md flex items-center justify-center"
                    title="Chat on WhatsApp"
                  >
                    <MessageCircle className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </article>
        ) : null}

        {/* Featured Article Spotlight (shown if no search active) */}
        {!activeArticle && searchQuery === '' && selectedCategory === 'All' && featuredPost && (
          <div className="mb-14">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#5A1226] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#E5A823]" />
                Featured Story
              </span>
            </div>

            <div
              onClick={() => handleOpenArticle(featuredPost)}
              className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer grid grid-cols-1 lg:grid-cols-12 group"
            >
              <div className="lg:col-span-7 aspect-video lg:aspect-auto relative overflow-hidden bg-stone-100">
                <img
                  src={featuredPost.coverImage}
                  alt={featuredPost.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span
                    className={`px-3 py-1 rounded-md text-xs font-bold shadow-sm border ${getCategoryColor(
                      featuredPost.category
                    )}`}
                  >
                    {featuredPost.category}
                  </span>
                </div>
              </div>

              <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span>{featuredPost.publishedDate}</span>
                    <span aria-hidden="true">·</span>
                    <span>{featuredPost.readTime}</span>
                    {featuredPost.destinationTag && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span className="font-semibold text-slate-750">{featuredPost.destinationTag}</span>
                      </>
                    )}
                  </div>

                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#5A1226] group-hover:text-[#721832] transition-colors leading-tight">
                    {featuredPost.title}
                  </h2>

                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed line-clamp-3">
                    {featuredPost.summary}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-stone-100">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-[#5A1226] text-[#E5A823] flex items-center justify-center font-bold text-xs">
                      {featuredPost.author.name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900">{featuredPost.author.name}</div>
                      <div className="text-[11px] text-slate-500">{featuredPost.author.role}</div>
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-1 text-xs font-bold text-[#5A1226] group-hover:text-[#E5A823] transition-colors">
                    Read Story <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Articles Grid */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl sm:text-2xl font-bold text-[#5A1226]">
              {selectedCategory === 'All' ? 'All Articles & Guides' : `${selectedCategory} (${filteredPosts.length})`}
            </h3>
            <span className="text-xs text-slate-500">
              Showing {filteredPosts.length} {filteredPosts.length === 1 ? 'article' : 'articles'}
            </span>
          </div>

          {filteredPosts.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-stone-300 p-8">
              <BookOpen className="w-12 h-12 text-slate-400 mx-auto mb-3" />
              <h4 className="text-lg font-bold text-slate-800">No articles found</h4>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-md mx-auto">
                No articles matching your search query or filter. Try clearing your search term.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                }}
                className="mt-4 px-4 py-2 rounded-xl bg-[#5A1226] text-white text-xs font-bold hover:bg-[#721832] transition-colors"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredPosts.map((post) => (
                <div
                  key={post.id}
                  id={`blog-card-${post.id}`}
                  onClick={() => handleOpenArticle(post)}
                  className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between group hover:-translate-y-1"
                >
                  <div>
                    {/* Thumbnail Image */}
                    <div className="aspect-[16/10] overflow-hidden bg-stone-100 relative">
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3">
                        <span
                          className={`px-2.5 py-0.5 rounded-md text-[11px] font-bold shadow-sm border ${getCategoryColor(
                            post.category
                          )}`}
                        >
                          {post.category}
                        </span>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-6 space-y-3">
                      <div className="flex items-center gap-2 text-xs text-slate-400">
                        <span>{post.publishedDate}</span>
                        <span aria-hidden="true">·</span>
                        <span>{post.readTime}</span>
                        {post.destinationTag && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span className="font-semibold text-slate-600">{post.destinationTag}</span>
                          </>
                        )}
                      </div>

                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#5A1226] transition-colors leading-snug line-clamp-2">
                        {post.title}
                      </h3>

                      <p className="text-slate-600 text-xs sm:text-sm leading-relaxed line-clamp-3">
                        {post.summary}
                      </p>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="px-6 pb-6 pt-2 border-t border-stone-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-[#5A1226] text-[#E5A823] flex items-center justify-center font-bold text-[10px]">
                        {post.author.name.charAt(0)}
                      </div>
                      <span className="text-xs font-semibold text-slate-700 truncate max-w-[130px]">
                        {post.author.name}
                      </span>
                    </div>

                    <span className="inline-flex items-center gap-1 text-xs font-bold text-[#5A1226] group-hover:text-[#E5A823] transition-colors">
                      Read <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Newsletter / Free Assessment Bottom Banner */}
        <div className="mt-20 p-8 sm:p-12 rounded-3xl bg-[#5A1226] text-white relative overflow-hidden shadow-xl border border-[#E5A823]/30">
          <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-[#E5A823]/10 rounded-full blur-2xl pointer-events-none" />
          <div className="relative max-w-3xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#E5A823]">
              Personalized Guidance
            </span>
            <h3 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight">
              Have questions about scholarship eligibility or university entry requirements?
            </h3>
            <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
              Our educational counselors provide tailored transcript appraisals, university matching, and full visa guidance.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => {
                  if (onOpenConsultationModal) {
                    onOpenConsultationModal();
                  } else {
                    setActivePage('contact');
                  }
                }}
                className="px-6 py-3 rounded-full bg-[#E5A823] hover:bg-[#d49515] text-[#5A1226] font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
              >
                Book Free Consultation
              </button>
              <button
                onClick={() => setActivePage('services')}
                className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm border border-white/20 transition-all cursor-pointer"
              >
                Explore All Services
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
