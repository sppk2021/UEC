import React, { useState, useRef } from 'react';
import {
  X,
  Lock,
  Unlock,
  Save,
  RotateCcw,
  Download,
  Upload,
  Plus,
  Trash2,
  Edit3,
  Check,
  Building,
  Globe2,
  GraduationCap,
  MapPin,
  Users2,
  Compass,
  HelpCircle,
  Inbox,
  KeyRound,
  ExternalLink,
  MessageCircle,
  Phone,
  Mail,
  ShieldAlert,
  Sparkles,
  ChevronRight,
  Eye,
  CheckCircle2,
  FileSpreadsheet,
} from 'lucide-react';
import { useWebsite } from '../../context/WebsiteContext';
import { CrestLogo } from '../CrestLogo';
import {
  StudyDestination,
  CoreService,
  OfficeLocation,
  PartnerCompany,
  FaqItem,
  LeadItem,
} from '../../types';

export const AdminPanel: React.FC = () => {
  const {
    data,
    isAdminOpen,
    setIsAdminOpen,
    isAdminAuthenticated,
    setIsAdminAuthenticated,
    verifyPasscode,
    updateAgencyInfo,
    updateHeroContent,
    updateIntroContent,
    updateServices,
    updateDestinations,
    updateOffices,
    updatePartners,
    updatePillars,
    updateFaqs,
    updateLeadStatus,
    deleteLead,
    updateAdminPasscode,
    resetToDefaults,
    exportDataToJson,
    importDataFromJson,
    showToast,
  } = useWebsite();

  const [activeTab, setActiveTab] = useState<
    | 'general'
    | 'hero'
    | 'destinations'
    | 'services'
    | 'offices'
    | 'partners'
    | 'pillars'
    | 'faqs'
    | 'leads'
    | 'security'
  >('general');

  const [passcodeAttempt, setPasscodeAttempt] = useState('');
  const [passcodeError, setPasscodeError] = useState(false);
  const [newPasscode, setNewPasscode] = useState('');

  // Search & Filter for Leads
  const [leadFilter, setLeadFilter] = useState<'all' | 'new' | 'contacted' | 'enrolled'>('all');
  const [leadSearch, setLeadSearch] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isAdminOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (verifyPasscode(passcodeAttempt)) {
      setPasscodeError(false);
      setPasscodeAttempt('');
    } else {
      setPasscodeError(true);
    }
  };

  const handleQuickDemoLogin = () => {
    verifyPasscode('admin123');
    setPasscodeError(false);
  };

  const handleLogout = () => {
    setIsAdminAuthenticated(false);
    sessionStorage.removeItem('ueca_admin_session_auth_v1');
    showToast('Logged out of Admin Console');
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        importDataFromJson(content);
      }
    };
    reader.readAsText(file);
  };

  // Filtered leads
  const filteredLeads = data.leads.filter((lead) => {
    const matchesStatus = leadFilter === 'all' || lead.status === leadFilter;
    const matchesSearch =
      lead.fullName.toLowerCase().includes(leadSearch.toLowerCase()) ||
      lead.phone.includes(leadSearch) ||
      lead.email.toLowerCase().includes(leadSearch.toLowerCase()) ||
      lead.targetDestination.toLowerCase().includes(leadSearch.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const exportLeadsToCsv = () => {
    if (data.leads.length === 0) {
      showToast('No leads to export');
      return;
    }
    const headers = ['Date', 'Status', 'Full Name', 'Phone', 'Email', 'Target Destination', 'Target Major', 'Current Education', 'Preferred Office', 'Notes'];
    const rows = data.leads.map((l) => [
      new Date(l.createdAt).toLocaleDateString(),
      l.status,
      `"${l.fullName.replace(/"/g, '""')}"`,
      `"${l.phone}"`,
      `"${l.email}"`,
      `"${l.targetDestination.replace(/"/g, '""')}"`,
      `"${(l.targetMajor || '').replace(/"/g, '""')}"`,
      `"${(l.currentEducation || '').replace(/"/g, '""')}"`,
      `"${(l.preferredOffice || '').replace(/"/g, '""')}"`,
      `"${(l.notes || '').replace(/"/g, '""')}"`,
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `ueca_leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Leads CSV downloaded successfully');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#FAF8F5] text-slate-900 rounded-3xl w-full max-w-6xl h-[94vh] flex flex-col shadow-2xl border-4 border-[#5A1226] overflow-hidden">
        
        {/* Top Header Bar */}
        <div className="bg-[#5A1226] text-white px-5 sm:px-8 py-4 flex items-center justify-between border-b-2 border-[#E5A823]/60 flex-shrink-0">
          <div className="flex items-center gap-3">
            <CrestLogo variant="compact" />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base sm:text-lg tracking-tight text-white">
                  UECA Admin Portal
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#E5A823] text-[#5A1226] text-[10px] font-black uppercase tracking-wider">
                  Live Sync
                </span>
              </div>
              <p className="text-xs text-slate-300 hidden sm:block">
                Edit website content, destination programs, core services, and manage student leads in real-time.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAdminAuthenticated && (
              <>
                <button
                  type="button"
                  onClick={exportDataToJson}
                  title="Export Backup JSON"
                  className="p-2 rounded-xl bg-white/10 hover:bg-[#E5A823] hover:text-[#5A1226] text-white text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span className="hidden md:inline">Backup JSON</span>
                </button>

                <button
                  type="button"
                  onClick={handleLogout}
                  title="Log out from Admin"
                  className="p-2 rounded-xl bg-white/10 hover:bg-rose-600 text-white text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                >
                  <Lock className="w-4 h-4" />
                  <span className="hidden md:inline">Lock</span>
                </button>
              </>
            )}

            <button
              type="button"
              onClick={() => setIsAdminOpen(false)}
              className="p-2 rounded-xl bg-white/15 hover:bg-white text-white hover:text-[#5A1226] transition-all cursor-pointer"
              title="Close Admin Panel"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Auth Gate if not logged in */}
        {!isAdminAuthenticated ? (
          <div className="flex-1 flex items-center justify-center p-6 bg-[#FAF8F5]">
            <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-xl border-2 border-[#E5A823] text-center space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-[#5A1226] text-[#E5A823] flex items-center justify-center mx-auto shadow-md">
                <Lock className="w-8 h-8" />
              </div>

              <div className="space-y-1">
                <h3 className="text-2xl font-extrabold text-[#5A1226]">
                  Admin Authentication
                </h3>
                <p className="text-xs text-slate-600">
                  Enter your management passcode to edit website contents and view consultation leads.
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <input
                    type="password"
                    placeholder="Enter Passcode (Default: admin123)"
                    value={passcodeAttempt}
                    onChange={(e) => setPasscodeAttempt(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:border-[#5A1226] focus:ring-2 focus:ring-[#5A1226]/20 text-center font-mono tracking-widest text-sm outline-none"
                    autoFocus
                  />
                  {passcodeError && (
                    <p className="text-rose-600 text-xs font-bold mt-1.5 animate-shake">
                      Invalid passcode. Try the demo password below.
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-[#5A1226] hover:bg-[#721832] text-white font-bold text-xs uppercase tracking-wider transition-all shadow cursor-pointer border border-[#E5A823]/40"
                >
                  Unlock Admin Dashboard
                </button>
              </form>

              {/* Quick Demo Access Button */}
              <div className="pt-2 border-t border-stone-200">
                <button
                  type="button"
                  onClick={handleQuickDemoLogin}
                  className="w-full py-2.5 rounded-xl bg-[#FAF8F5] hover:bg-[#E5A823]/20 text-[#5A1226] font-bold text-xs border border-dashed border-[#E5A823] transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Unlock className="w-3.5 h-3.5 text-[#E5A823]" />
                  <span>Quick Demo Access (admin123)</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Main Authenticated Layout */
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            
            {/* Sidebar Navigation */}
            <div className="w-full md:w-64 bg-white border-b md:border-b-0 md:border-r border-stone-200 p-3 sm:p-4 flex md:flex-col gap-1.5 overflow-x-auto md:overflow-y-auto flex-shrink-0">
              
              <div className="hidden md:block px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Content Modules
              </div>

              {[
                { id: 'general', label: 'Agency & Contacts', icon: Building },
                { id: 'hero', label: 'Hero & Headlines', icon: Sparkles },
                { id: 'destinations', label: 'Study Destinations', icon: Globe2 },
                { id: 'services', label: 'Core Services (5 Steps)', icon: GraduationCap },
                { id: 'offices', label: 'Office Locations (4 Hubs)', icon: MapPin },
                { id: 'partners', label: 'Corporate Group (MTKN & DIR)', icon: Users2 },
                { id: 'pillars', label: 'Vision & Mission', icon: Compass },
                { id: 'faqs', label: 'FAQs Manager', icon: HelpCircle },
                {
                  id: 'leads',
                  label: `Student Inquiries (${data.leads.filter((l) => l.status === 'new').length} New)`,
                  icon: Inbox,
                  highlight: data.leads.filter((l) => l.status === 'new').length > 0,
                },
                { id: 'security', label: 'Backup & Security', icon: KeyRound },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl font-bold text-xs transition-all whitespace-nowrap md:whitespace-normal text-left cursor-pointer ${
                      isActive
                        ? 'bg-[#5A1226] text-white shadow-sm'
                        : 'text-slate-700 hover:bg-stone-100 hover:text-[#5A1226]'
                    } ${tab.highlight && !isActive ? 'ring-2 ring-[#E5A823]' : ''}`}
                  >
                    <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-[#E5A823]' : 'text-slate-500'}`} />
                    <span className="truncate">{tab.label}</span>
                  </button>
                );
              })}

              <div className="hidden md:block mt-auto pt-4 border-t border-stone-200 space-y-2">
                <button
                  onClick={resetToDefaults}
                  className="w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Restore Factory Defaults</span>
                </button>
              </div>

            </div>

            {/* Main Content Area */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-[#FAF8F5]">
              
              {/* TAB 1: General & Contacts */}
              {activeTab === 'general' && (
                <div className="space-y-6 max-w-4xl">
                  <div className="space-y-1 pb-4 border-b border-stone-200">
                    <h3 className="text-xl sm:text-2xl font-extrabold text-[#5A1226]">
                      Agency Information & Contact Hotlines
                    </h3>
                    <p className="text-xs text-slate-600">
                      Update official agency names, phone numbers, WhatsApp, and operating hours shown across the site.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 uppercase">Agency Full Name</label>
                      <input
                        type="text"
                        value={data.agencyInfo.name}
                        onChange={(e) => updateAgencyInfo({ name: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-stone-300 bg-white text-sm focus:border-[#5A1226] outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 uppercase">Short Brand Name</label>
                      <input
                        type="text"
                        value={data.agencyInfo.shortName}
                        onChange={(e) => updateAgencyInfo({ shortName: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-stone-300 bg-white text-sm focus:border-[#5A1226] outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase">Main Motto / Slogan</label>
                    <input
                      type="text"
                      value={data.agencyInfo.tagline}
                      onChange={(e) => updateAgencyInfo({ tagline: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-300 bg-white text-sm focus:border-[#5A1226] outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 uppercase">Phone Hotline / Viber</label>
                      <input
                        type="text"
                        value={data.agencyInfo.phone}
                        onChange={(e) =>
                          updateAgencyInfo({
                            phone: e.target.value,
                            cleanPhone: e.target.value.replace(/[^0-9+]/g, ''),
                          })
                        }
                        className="w-full px-4 py-2.5 rounded-xl border border-stone-300 bg-white text-sm focus:border-[#5A1226] outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 uppercase">WhatsApp Number (e.g. 959977859474)</label>
                      <input
                        type="text"
                        value={data.agencyInfo.whatsappNumber}
                        onChange={(e) => updateAgencyInfo({ whatsappNumber: e.target.value.replace(/[^0-9]/g, '') })}
                        className="w-full px-4 py-2.5 rounded-xl border border-stone-300 bg-white text-sm focus:border-[#5A1226] outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 uppercase">Official Email</label>
                      <input
                        type="email"
                        value={data.agencyInfo.email}
                        onChange={(e) => updateAgencyInfo({ email: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-stone-300 bg-white text-sm focus:border-[#5A1226] outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase">Operating Hours</label>
                    <input
                      type="text"
                      value={data.agencyInfo.workingHours}
                      onChange={(e) => updateAgencyInfo({ workingHours: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-300 bg-white text-sm focus:border-[#5A1226] outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase">Ethical Pledge / Guarantee Notice</label>
                    <textarea
                      rows={3}
                      value={data.agencyInfo.ethicalPledge}
                      onChange={(e) => updateAgencyInfo({ ethicalPledge: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-300 bg-white text-sm focus:border-[#5A1226] outline-none resize-none"
                    />
                  </div>
                </div>
              )}

              {/* TAB 2: Hero & Intro */}
              {activeTab === 'hero' && (
                <div className="space-y-6 max-w-4xl">
                  <div className="space-y-1 pb-4 border-b border-stone-200">
                    <h3 className="text-xl sm:text-2xl font-extrabold text-[#5A1226]">
                      Hero Section & Introduction Texts
                    </h3>
                    <p className="text-xs text-slate-600">
                      Customize top banner copy, visual titles, and introduction paragraphs.
                    </p>
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-stone-200 space-y-4">
                    <h4 className="font-bold text-sm text-[#5A1226]">Slide 1: Hero Banner Copy</h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-700 uppercase">Headline Line 1 (Gold)</label>
                        <input
                          type="text"
                          value={data.heroContent.brandLine1}
                          onChange={(e) => updateHeroContent({ brandLine1: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:border-[#5A1226] outline-none"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-700 uppercase">Headline Line 2 (Burgundy)</label>
                        <input
                          type="text"
                          value={data.heroContent.brandLine2}
                          onChange={(e) => updateHeroContent({ brandLine2: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:border-[#5A1226] outline-none"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 uppercase">Pill Slogan Badge</label>
                      <input
                        type="text"
                        value={data.heroContent.pillTagline}
                        onChange={(e) => updateHeroContent({ pillTagline: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:border-[#5A1226] outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 uppercase">Supporting Summary Text</label>
                      <textarea
                        rows={3}
                        value={data.heroContent.summaryText}
                        onChange={(e) => updateHeroContent({ summaryText: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:border-[#5A1226] outline-none resize-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-700 uppercase">Accepting Intakes Pill</label>
                        <input
                          type="text"
                          value={data.heroContent.acceptingIntakesText}
                          onChange={(e) => updateHeroContent({ acceptingIntakesText: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:border-[#5A1226] outline-none"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-700 uppercase">Hero Image URL</label>
                        <input
                          type="text"
                          value={data.heroContent.imageUrl}
                          onChange={(e) => updateHeroContent({ imageUrl: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:border-[#5A1226] outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-stone-200 space-y-4">
                    <h4 className="font-bold text-sm text-[#5A1226]">Slide 2: Introduction Section Copy</h4>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 uppercase">Main Lead Paragraph</label>
                      <textarea
                        rows={3}
                        value={data.introContent.leadText}
                        onChange={(e) => updateIntroContent({ leadText: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:border-[#5A1226] outline-none resize-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 uppercase">Secondary Philosophy Paragraph</label>
                      <textarea
                        rows={3}
                        value={data.introContent.supportingText}
                        onChange={(e) => updateIntroContent({ supportingText: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:border-[#5A1226] outline-none resize-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: Study Destinations */}
              {activeTab === 'destinations' && (
                <div className="space-y-6 max-w-4xl">
                  <div className="flex items-center justify-between pb-4 border-b border-stone-200">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-extrabold text-[#5A1226]">
                        Study Destinations ({data.destinations.length})
                      </h3>
                      <p className="text-xs text-slate-600">
                        Edit details, tuition costs, scholarship criteria, and top universities for Italy, Thailand, China, Malaysia, or add new countries.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        const newDest: StudyDestination = {
                          id: 'dest-' + Date.now(),
                          country: 'New Country',
                          code: 'NC',
                          flagEmoji: '🌐',
                          tagline: 'Global Academic Excellence',
                          description: 'Comprehensive undergraduate and master programs.',
                          highlightBadge: 'Scholarships Available',
                          scholarshipInfo: 'Merit and regional tuition reduction grants.',
                          avgTuition: '$3,000 – $8,000 / year',
                          livingCost: '$400 – $700 / month',
                          languageReq: 'IELTS 6.0+ / Duolingo',
                          intakes: ['September', 'January'],
                          popularPrograms: ['Business Administration', 'Computer Science'],
                          topUniversities: ['Top State University'],
                          flagColors: ['#5A1226', '#E5A823'],
                          bgGradient: 'from-slate-950 via-slate-900 to-[#5A1226]',
                        };
                        updateDestinations([...data.destinations, newDest]);
                      }}
                      className="px-4 py-2 rounded-xl bg-[#5A1226] text-white text-xs font-bold hover:bg-[#721832] transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
                    >
                      <Plus className="w-4 h-4 text-[#E5A823]" />
                      <span>Add Destination</span>
                    </button>
                  </div>

                  <div className="space-y-6">
                    {data.destinations.map((dest, index) => (
                      <div key={dest.id} className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-4">
                        <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                          <div className="flex items-center gap-3">
                            <span className="text-3xl">{dest.flagEmoji}</span>
                            <div>
                              <h4 className="font-extrabold text-base text-[#5A1226]">{dest.country}</h4>
                              <span className="text-xs text-slate-500">{dest.tagline}</span>
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() => {
                              if (confirm(`Delete destination ${dest.country}?`)) {
                                updateDestinations(data.destinations.filter((d) => d.id !== dest.id));
                              }
                            }}
                            className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                            title="Delete this destination"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <div className="space-y-1">
                            <label className="text-[11px] font-bold text-slate-600 uppercase">Country Name</label>
                            <input
                              type="text"
                              value={dest.country}
                              onChange={(e) => {
                                const next = [...data.destinations];
                                next[index] = { ...dest, country: e.target.value };
                                updateDestinations(next);
                              }}
                              className="w-full px-3 py-2 rounded-lg border border-stone-300 text-xs outline-none"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-[11px] font-bold text-slate-600 uppercase">Flag Emoji</label>
                            <input
                              type="text"
                              value={dest.flagEmoji}
                              onChange={(e) => {
                                const next = [...data.destinations];
                                next[index] = { ...dest, flagEmoji: e.target.value };
                                updateDestinations(next);
                              }}
                              className="w-full px-3 py-2 rounded-lg border border-stone-300 text-xs outline-none"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-[11px] font-bold text-slate-600 uppercase">Highlight Badge</label>
                            <input
                              type="text"
                              value={dest.highlightBadge}
                              onChange={(e) => {
                                const next = [...data.destinations];
                                next[index] = { ...dest, highlightBadge: e.target.value };
                                updateDestinations(next);
                              }}
                              className="w-full px-3 py-2 rounded-lg border border-stone-300 text-xs outline-none"
                            />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[11px] font-bold text-slate-600 uppercase">Tagline</label>
                          <input
                            type="text"
                            value={dest.tagline}
                            onChange={(e) => {
                              const next = [...data.destinations];
                              next[index] = { ...dest, tagline: e.target.value };
                              updateDestinations(next);
                            }}
                            className="w-full px-3 py-2 rounded-lg border border-stone-300 text-xs outline-none"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[11px] font-bold text-slate-600 uppercase">Description</label>
                          <textarea
                            rows={2}
                            value={dest.description}
                            onChange={(e) => {
                              const next = [...data.destinations];
                              next[index] = { ...dest, description: e.target.value };
                              updateDestinations(next);
                            }}
                            className="w-full px-3 py-2 rounded-lg border border-stone-300 text-xs outline-none resize-none"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[11px] font-bold text-slate-600 uppercase">Scholarship Information</label>
                          <textarea
                            rows={2}
                            value={dest.scholarshipInfo}
                            onChange={(e) => {
                              const next = [...data.destinations];
                              next[index] = { ...dest, scholarshipInfo: e.target.value };
                              updateDestinations(next);
                            }}
                            className="w-full px-3 py-2 rounded-lg border border-stone-300 text-xs outline-none resize-none"
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <div className="space-y-1">
                            <label className="text-[11px] font-bold text-slate-600 uppercase">Tuition Range</label>
                            <input
                              type="text"
                              value={dest.avgTuition}
                              onChange={(e) => {
                                const next = [...data.destinations];
                                next[index] = { ...dest, avgTuition: e.target.value };
                                updateDestinations(next);
                              }}
                              className="w-full px-3 py-2 rounded-lg border border-stone-300 text-xs outline-none"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-[11px] font-bold text-slate-600 uppercase">Living Costs</label>
                            <input
                              type="text"
                              value={dest.livingCost}
                              onChange={(e) => {
                                const next = [...data.destinations];
                                next[index] = { ...dest, livingCost: e.target.value };
                                updateDestinations(next);
                              }}
                              className="w-full px-3 py-2 rounded-lg border border-stone-300 text-xs outline-none"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-[11px] font-bold text-slate-600 uppercase">Language Requirements</label>
                            <input
                              type="text"
                              value={dest.languageReq}
                              onChange={(e) => {
                                const next = [...data.destinations];
                                next[index] = { ...dest, languageReq: e.target.value };
                                updateDestinations(next);
                              }}
                              className="w-full px-3 py-2 rounded-lg border border-stone-300 text-xs outline-none"
                            />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[11px] font-bold text-slate-600 uppercase">
                            Top Universities (Comma-separated)
                          </label>
                          <input
                            type="text"
                            value={dest.topUniversities.join(', ')}
                            onChange={(e) => {
                              const next = [...data.destinations];
                              next[index] = {
                                ...dest,
                                topUniversities: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                              };
                              updateDestinations(next);
                            }}
                            className="w-full px-3 py-2 rounded-lg border border-stone-300 text-xs outline-none"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[11px] font-bold text-slate-600 uppercase">
                            Popular Study Programs (Comma-separated)
                          </label>
                          <input
                            type="text"
                            value={dest.popularPrograms.join(', ')}
                            onChange={(e) => {
                              const next = [...data.destinations];
                              next[index] = {
                                ...dest,
                                popularPrograms: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                              };
                              updateDestinations(next);
                            }}
                            className="w-full px-3 py-2 rounded-lg border border-stone-300 text-xs outline-none"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: Core Services */}
              {activeTab === 'services' && (
                <div className="space-y-6 max-w-4xl">
                  <div className="space-y-1 pb-4 border-b border-stone-200">
                    <h3 className="text-xl sm:text-2xl font-extrabold text-[#5A1226]">
                      Core Services ({data.services.length} Steps)
                    </h3>
                    <p className="text-xs text-slate-600">
                      Manage the 5-step comprehensive student guidance pathway.
                    </p>
                  </div>

                  <div className="space-y-6">
                    {data.services.map((srv, idx) => (
                      <div key={srv.id} className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <label className="text-[11px] font-bold text-slate-600 uppercase">Step Tag (e.g. Step 01 • Assessment)</label>
                            <input
                              type="text"
                              value={srv.tag}
                              onChange={(e) => {
                                const next = [...data.services];
                                next[idx] = { ...srv, tag: e.target.value };
                                updateServices(next);
                              }}
                              className="w-full px-3 py-2 rounded-lg border border-stone-300 text-xs font-semibold"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-[11px] font-bold text-slate-600 uppercase">Service Title</label>
                            <input
                              type="text"
                              value={srv.title}
                              onChange={(e) => {
                                const next = [...data.services];
                                next[idx] = { ...srv, title: e.target.value };
                                updateServices(next);
                              }}
                              className="w-full px-3 py-2 rounded-lg border border-stone-300 text-xs font-bold text-[#5A1226]"
                            />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[11px] font-bold text-slate-600 uppercase">Description</label>
                          <textarea
                            rows={2}
                            value={srv.description}
                            onChange={(e) => {
                              const next = [...data.services];
                              next[idx] = { ...srv, description: e.target.value };
                              updateServices(next);
                            }}
                            className="w-full px-3 py-2 rounded-lg border border-stone-300 text-xs resize-none"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[11px] font-bold text-slate-600 uppercase">
                            Key Benefits / Checklist (One per line)
                          </label>
                          <textarea
                            rows={3}
                            value={srv.benefits.join('\n')}
                            onChange={(e) => {
                              const next = [...data.services];
                              next[idx] = {
                                ...srv,
                                benefits: e.target.value.split('\n').filter(Boolean),
                              };
                              updateServices(next);
                            }}
                            className="w-full px-3 py-2 rounded-lg border border-stone-300 text-xs font-mono"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[11px] font-bold text-slate-600 uppercase">
                            Deliverables (Comma-separated)
                          </label>
                          <input
                            type="text"
                            value={srv.deliverables.join(', ')}
                            onChange={(e) => {
                              const next = [...data.services];
                              next[idx] = {
                                ...srv,
                                deliverables: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                              };
                              updateServices(next);
                            }}
                            className="w-full px-3 py-2 rounded-lg border border-stone-300 text-xs"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 5: Office Locations */}
              {activeTab === 'offices' && (
                <div className="space-y-6 max-w-4xl">
                  <div className="space-y-1 pb-4 border-b border-stone-200">
                    <h3 className="text-xl sm:text-2xl font-extrabold text-[#5A1226]">
                      Office Locations ({data.offices.length} Centers)
                    </h3>
                    <p className="text-xs text-slate-600">
                      Edit addresses, contact details, counseling scope, and landmarks for Yangon, Mandalay, Bangkok, and Messina.
                    </p>
                  </div>

                  <div className="space-y-6">
                    {data.offices.map((office, idx) => (
                      <div key={office.id} className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-4">
                        <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                          <h4 className="font-extrabold text-base text-[#5A1226]">
                            {office.city} Office ({office.country})
                          </h4>
                          <span className="text-xs font-semibold text-[#E5A823]">{office.statusBadge}</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <label className="text-[11px] font-bold text-slate-600 uppercase">Center Title</label>
                            <input
                              type="text"
                              value={office.title}
                              onChange={(e) => {
                                const next = [...data.offices];
                                next[idx] = { ...office, title: e.target.value };
                                updateOffices(next);
                              }}
                              className="w-full px-3 py-2 rounded-lg border border-stone-300 text-xs font-bold"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-[11px] font-bold text-slate-600 uppercase">Status Badge</label>
                            <input
                              type="text"
                              value={office.statusBadge}
                              onChange={(e) => {
                                const next = [...data.offices];
                                next[idx] = { ...office, statusBadge: e.target.value };
                                updateOffices(next);
                              }}
                              className="w-full px-3 py-2 rounded-lg border border-stone-300 text-xs"
                            />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[11px] font-bold text-slate-600 uppercase">Exact Physical Address</label>
                          <textarea
                            rows={2}
                            value={office.address}
                            onChange={(e) => {
                              const next = [...data.offices];
                              next[idx] = { ...office, address: e.target.value };
                              updateOffices(next);
                            }}
                            className="w-full px-3 py-2 rounded-lg border border-stone-300 text-xs resize-none"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[11px] font-bold text-slate-600 uppercase">Counseling Role & Scope</label>
                          <textarea
                            rows={2}
                            value={office.role}
                            onChange={(e) => {
                              const next = [...data.offices];
                              next[idx] = { ...office, role: e.target.value };
                              updateOffices(next);
                            }}
                            className="w-full px-3 py-2 rounded-lg border border-stone-300 text-xs resize-none"
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <label className="text-[11px] font-bold text-slate-600 uppercase">Operating Hours</label>
                            <input
                              type="text"
                              value={office.hours}
                              onChange={(e) => {
                                const next = [...data.offices];
                                next[idx] = { ...office, hours: e.target.value };
                                updateOffices(next);
                              }}
                              className="w-full px-3 py-2 rounded-lg border border-stone-300 text-xs"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-[11px] font-bold text-slate-600 uppercase">Landmark Photo URL</label>
                            <input
                              type="text"
                              value={office.landmarkImage}
                              onChange={(e) => {
                                const next = [...data.offices];
                                next[idx] = { ...office, landmarkImage: e.target.value };
                                updateOffices(next);
                              }}
                              className="w-full px-3 py-2 rounded-lg border border-stone-300 text-xs"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 6: Partners */}
              {activeTab === 'partners' && (
                <div className="space-y-6 max-w-4xl">
                  <div className="space-y-1 pb-4 border-b border-stone-200">
                    <h3 className="text-xl sm:text-2xl font-extrabold text-[#5A1226]">
                      Corporate Group & Delegated Partners (Slide 3)
                    </h3>
                    <p className="text-xs text-slate-600">
                      Manage official information for MTKN Thailand Group and Digital Information Resources (DIR Myanmar).
                    </p>
                  </div>

                  <div className="space-y-6">
                    {data.partners.map((partner, idx) => (
                      <div key={partner.id} className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <label className="text-[11px] font-bold text-slate-600 uppercase">Partner Name</label>
                            <input
                              type="text"
                              value={partner.name}
                              onChange={(e) => {
                                const next = [...data.partners];
                                next[idx] = { ...partner, name: e.target.value };
                                updatePartners(next);
                              }}
                              className="w-full px-3 py-2 rounded-lg border border-stone-300 text-xs font-bold"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-[11px] font-bold text-slate-600 uppercase">Role / Subtitle</label>
                            <input
                              type="text"
                              value={partner.subtitle}
                              onChange={(e) => {
                                const next = [...data.partners];
                                next[idx] = { ...partner, subtitle: e.target.value };
                                updatePartners(next);
                              }}
                              className="w-full px-3 py-2 rounded-lg border border-stone-300 text-xs font-semibold text-[#5A1226]"
                            />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[11px] font-bold text-slate-600 uppercase">Badge Label</label>
                          <input
                            type="text"
                            value={partner.badge}
                            onChange={(e) => {
                              const next = [...data.partners];
                              next[idx] = { ...partner, badge: e.target.value };
                              updatePartners(next);
                            }}
                            className="w-full px-3 py-2 rounded-lg border border-stone-300 text-xs"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[11px] font-bold text-slate-600 uppercase">Description Paragraph</label>
                          <textarea
                            rows={4}
                            value={partner.description}
                            onChange={(e) => {
                              const next = [...data.partners];
                              next[idx] = { ...partner, description: e.target.value };
                              updatePartners(next);
                            }}
                            className="w-full px-3 py-2 rounded-lg border border-stone-300 text-xs leading-relaxed"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[11px] font-bold text-slate-600 uppercase">
                            Key Strategic Services (One per line)
                          </label>
                          <textarea
                            rows={4}
                            value={partner.keyServices.join('\n')}
                            onChange={(e) => {
                              const next = [...data.partners];
                              next[idx] = {
                                ...partner,
                                keyServices: e.target.value.split('\n').filter(Boolean),
                              };
                              updatePartners(next);
                            }}
                            className="w-full px-3 py-2 rounded-lg border border-stone-300 text-xs font-mono"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 7: Vision & Mission */}
              {activeTab === 'pillars' && (
                <div className="space-y-6 max-w-4xl">
                  <div className="space-y-1 pb-4 border-b border-stone-200">
                    <h3 className="text-xl sm:text-2xl font-extrabold text-[#5A1226]">
                      Vision, Mission & Ethical Commitment (Slide 4)
                    </h3>
                    <p className="text-xs text-slate-600">
                      Edit the 3 fundamental pillars that define U Education's philosophy and student care promise.
                    </p>
                  </div>

                  {(['vision', 'mission', 'commitment'] as const).map((pillarKey) => {
                    const item = data.pillars[pillarKey];
                    return (
                      <div key={pillarKey} className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="font-extrabold text-base text-[#5A1226] uppercase tracking-wider">
                            Pillar: {item.title}
                          </h4>
                          <span className="text-xs text-[#E5A823] font-bold">{item.tag}</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <label className="text-[11px] font-bold text-slate-600 uppercase">Title</label>
                            <input
                              type="text"
                              value={item.title}
                              onChange={(e) => {
                                updatePillars({
                                  ...data.pillars,
                                  [pillarKey]: { ...item, title: e.target.value },
                                });
                              }}
                              className="w-full px-3 py-2 rounded-lg border border-stone-300 text-xs font-bold"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-[11px] font-bold text-slate-600 uppercase">Subtitle / Tag</label>
                            <input
                              type="text"
                              value={item.tag}
                              onChange={(e) => {
                                updatePillars({
                                  ...data.pillars,
                                  [pillarKey]: { ...item, tag: e.target.value },
                                });
                              }}
                              className="w-full px-3 py-2 rounded-lg border border-stone-300 text-xs"
                            />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[11px] font-bold text-slate-600 uppercase">Detailed Statement</label>
                          <textarea
                            rows={3}
                            value={item.description}
                            onChange={(e) => {
                              updatePillars({
                                ...data.pillars,
                                [pillarKey]: { ...item, description: e.target.value },
                              });
                            }}
                            className="w-full px-3 py-2 rounded-lg border border-stone-300 text-xs leading-relaxed"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* TAB 8: FAQs */}
              {activeTab === 'faqs' && (
                <div className="space-y-6 max-w-4xl">
                  <div className="flex items-center justify-between pb-4 border-b border-stone-200">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-extrabold text-[#5A1226]">
                        Frequently Asked Questions ({data.faqs.length})
                      </h3>
                      <p className="text-xs text-slate-600">
                        Add and edit questions regarding Italian scholarships, IELTS requirements, and admissions.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        const newFaq: FaqItem = {
                          id: 'faq-' + Date.now(),
                          question: 'New Question Title?',
                          answer: 'Detailed explanation regarding study abroad procedures and guidelines.',
                          category: 'General',
                        };
                        updateFaqs([...data.faqs, newFaq]);
                      }}
                      className="px-4 py-2 rounded-xl bg-[#5A1226] text-white text-xs font-bold hover:bg-[#721832] transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
                    >
                      <Plus className="w-4 h-4 text-[#E5A823]" />
                      <span>Add Question</span>
                    </button>
                  </div>

                  <div className="space-y-4">
                    {data.faqs.map((faq, idx) => (
                      <div key={faq.id} className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-3">
                        <div className="flex items-start justify-between gap-3">
                          <div className="space-y-1 flex-1">
                            <label className="text-[11px] font-bold text-slate-600 uppercase">Question</label>
                            <input
                              type="text"
                              value={faq.question}
                              onChange={(e) => {
                                const next = [...data.faqs];
                                next[idx] = { ...faq, question: e.target.value };
                                updateFaqs(next);
                              }}
                              className="w-full px-3 py-2 rounded-lg border border-stone-300 text-xs font-bold text-[#5A1226]"
                            />
                          </div>

                          <button
                            type="button"
                            onClick={() => {
                              updateFaqs(data.faqs.filter((f) => f.id !== faq.id));
                            }}
                            className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg transition-colors cursor-pointer mt-4"
                            title="Delete this question"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[11px] font-bold text-slate-600 uppercase">Answer</label>
                          <textarea
                            rows={3}
                            value={faq.answer}
                            onChange={(e) => {
                              const next = [...data.faqs];
                              next[idx] = { ...faq, answer: e.target.value };
                              updateFaqs(next);
                            }}
                            className="w-full px-3 py-2 rounded-lg border border-stone-300 text-xs leading-relaxed"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 9: Leads Inbox */}
              {activeTab === 'leads' && (
                <div className="space-y-6 max-w-5xl">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-200">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-extrabold text-[#5A1226] flex items-center gap-2">
                        <span>Student Consultation Leads</span>
                        <span className="px-2.5 py-0.5 rounded-full bg-[#E5A823] text-[#5A1226] text-xs font-black">
                          {data.leads.length}
                        </span>
                      </h3>
                      <p className="text-xs text-slate-600">
                        Inquiries submitted through the free assessment form and consultation modal.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={exportLeadsToCsv}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-sm transition-all cursor-pointer"
                    >
                      <FileSpreadsheet className="w-4 h-4" />
                      <span>Export CSV Spreadsheet</span>
                    </button>
                  </div>

                  {/* Filter & Search Bar */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="flex-1">
                      <input
                        type="text"
                        placeholder="Search by student name, phone, or destination..."
                        value={leadSearch}
                        onChange={(e) => setLeadSearch(e.target.value)}
                        className="w-full px-4 py-2 rounded-xl border border-stone-300 bg-white text-xs outline-none focus:border-[#5A1226]"
                      />
                    </div>

                    <div className="flex gap-1.5 overflow-x-auto">
                      {(['all', 'new', 'contacted', 'enrolled'] as const).map((status) => (
                        <button
                          key={status}
                          onClick={() => setLeadFilter(status)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-colors cursor-pointer ${
                            leadFilter === status
                              ? 'bg-[#5A1226] text-white'
                              : 'bg-white text-slate-600 border border-stone-200 hover:bg-stone-100'
                          }`}
                        >
                          {status}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Leads List */}
                  {filteredLeads.length === 0 ? (
                    <div className="bg-white rounded-2xl p-12 text-center border border-stone-200 space-y-2">
                      <Inbox className="w-12 h-12 text-stone-300 mx-auto" />
                      <p className="text-sm font-bold text-slate-600">No student inquiries found</p>
                      <p className="text-xs text-slate-400">
                        When students submit the assessment form, their details will appear here immediately.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {filteredLeads.map((lead) => (
                        <div
                          key={lead.id}
                          className="bg-white p-5 sm:p-6 rounded-2xl border border-stone-200 shadow-xs hover:border-[#E5A823] transition-all space-y-3"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-stone-100">
                            <div className="flex items-center gap-3">
                              <h4 className="text-base font-extrabold text-[#5A1226]">{lead.fullName}</h4>
                              <span
                                className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                                  lead.status === 'new'
                                    ? 'bg-amber-100 text-amber-800 border border-amber-300'
                                    : lead.status === 'contacted'
                                    ? 'bg-blue-100 text-blue-800'
                                    : 'bg-emerald-100 text-emerald-800'
                                }`}
                              >
                                {lead.status}
                              </span>
                            </div>

                            <span className="text-[11px] text-slate-400">
                              {new Date(lead.createdAt).toLocaleString()}
                            </span>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                            <div>
                              <span className="text-slate-400 block text-[10px] uppercase font-semibold">Phone / Viber</span>
                              <a href={`tel:${lead.phone}`} className="font-bold text-[#5A1226] hover:underline">
                                {lead.phone}
                              </a>
                            </div>

                            <div>
                              <span className="text-slate-400 block text-[10px] uppercase font-semibold">Email</span>
                              <a href={`mailto:${lead.email}`} className="font-semibold text-slate-800 hover:underline break-all">
                                {lead.email}
                              </a>
                            </div>

                            <div>
                              <span className="text-slate-400 block text-[10px] uppercase font-semibold">Target Destination</span>
                              <span className="font-bold text-slate-800">{lead.targetDestination}</span>
                            </div>

                            <div>
                              <span className="text-slate-400 block text-[10px] uppercase font-semibold">Target Major</span>
                              <span className="font-semibold text-slate-700">{lead.targetMajor || 'Not specified'}</span>
                            </div>
                          </div>

                          {lead.notes && (
                            <div className="bg-[#FAF8F5] p-3 rounded-xl border border-stone-200 text-xs text-slate-700">
                              <strong className="text-slate-900 block text-[10px] uppercase">Student Notes:</strong>
                              <span>{lead.notes}</span>
                            </div>
                          )}

                          {/* Quick Actions */}
                          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-stone-100">
                            <div className="flex gap-2">
                              <a
                                href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(
                                  lead.fullName
                                )},%20this%20is%20U%20Education%20Consultant%20Agency%20regarding%20your%20study%20inquiry.`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 flex items-center gap-1"
                              >
                                <MessageCircle className="w-3.5 h-3.5" />
                                <span>WhatsApp</span>
                              </a>

                              <a
                                href={`tel:${lead.phone}`}
                                className="px-3 py-1.5 rounded-lg bg-stone-100 text-slate-800 text-xs font-bold hover:bg-stone-200 flex items-center gap-1 border border-stone-300"
                              >
                                <Phone className="w-3.5 h-3.5 text-[#5A1226]" />
                                <span>Call</span>
                              </a>
                            </div>

                            <div className="flex items-center gap-2">
                              <select
                                value={lead.status}
                                onChange={(e) => updateLeadStatus(lead.id, e.target.value as any)}
                                className="px-3 py-1.5 rounded-lg border border-stone-300 text-xs font-bold bg-white text-slate-700"
                              >
                                <option value="new">Mark: New</option>
                                <option value="contacted">Mark: Contacted</option>
                                <option value="enrolled">Mark: Enrolled</option>
                                <option value="archived">Mark: Archived</option>
                              </select>

                              <button
                                type="button"
                                onClick={() => {
                                  if (confirm(`Remove entry for ${lead.fullName}?`)) {
                                    deleteLead(lead.id);
                                  }
                                }}
                                className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg transition-colors cursor-pointer"
                                title="Delete Lead"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 10: Security & Storage */}
              {activeTab === 'security' && (
                <div className="space-y-6 max-w-3xl">
                  <div className="space-y-1 pb-4 border-b border-stone-200">
                    <h3 className="text-xl sm:text-2xl font-extrabold text-[#5A1226]">
                      Security, Backups & Reset
                    </h3>
                    <p className="text-xs text-slate-600">
                      Manage admin credentials, download site content snapshots, or import JSON backup files.
                    </p>
                  </div>

                  {/* Change Passcode */}
                  <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-4">
                    <h4 className="font-bold text-sm text-[#5A1226]">Update Admin Passcode</h4>
                    <p className="text-xs text-slate-600">
                      Change the secret passcode required to open this administration console.
                    </p>

                    <div className="flex gap-3">
                      <input
                        type="password"
                        placeholder="Enter new passcode"
                        value={newPasscode}
                        onChange={(e) => setNewPasscode(e.target.value)}
                        className="flex-1 px-4 py-2.5 rounded-xl border border-stone-300 text-xs font-mono"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (newPasscode.trim().length < 4) {
                            showToast('Passcode must be at least 4 characters');
                            return;
                          }
                          updateAdminPasscode(newPasscode);
                          setNewPasscode('');
                        }}
                        className="px-5 py-2.5 rounded-xl bg-[#5A1226] text-white font-bold text-xs hover:bg-[#721832] transition-colors cursor-pointer"
                      >
                        Update Passcode
                      </button>
                    </div>
                  </div>

                  {/* JSON Backup & Import */}
                  <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-4">
                    <h4 className="font-bold text-sm text-[#5A1226]">Website Configuration Backup</h4>
                    <p className="text-xs text-slate-600">
                      Download the complete content structure as a portable JSON file, or restore from a previously exported file.
                    </p>

                    <div className="flex flex-wrap gap-3">
                      <button
                        type="button"
                        onClick={exportDataToJson}
                        className="px-5 py-2.5 rounded-xl bg-[#5A1226] text-white font-bold text-xs hover:bg-[#721832] transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
                      >
                        <Download className="w-4 h-4 text-[#E5A823]" />
                        <span>Export Backup JSON</span>
                      </button>

                      <input
                        type="file"
                        ref={fileInputRef}
                        accept=".json"
                        onChange={handleImportFile}
                        className="hidden"
                      />

                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="px-5 py-2.5 rounded-xl bg-white text-slate-800 font-bold text-xs border border-stone-300 hover:bg-stone-50 transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
                      >
                        <Upload className="w-4 h-4 text-[#5A1226]" />
                        <span>Import Backup JSON</span>
                      </button>
                    </div>
                  </div>

                  {/* Danger Zone */}
                  <div className="bg-rose-50 p-6 rounded-2xl border border-rose-200 space-y-3">
                    <div className="flex items-center gap-2 text-rose-800 font-bold text-sm">
                      <ShieldAlert className="w-4 h-4" />
                      <span>Danger Zone</span>
                    </div>
                    <p className="text-xs text-rose-700">
                      Revert all custom edits, destinations, and copy back to the pristine original slide presentation default state.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        if (confirm('Are you sure you want to reset all content back to slide presentation defaults? Custom edits will be lost unless backed up.')) {
                          resetToDefaults();
                        }
                      }}
                      className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-colors cursor-pointer"
                    >
                      Reset All to Default State
                    </button>
                  </div>
                </div>
              )}

            </div>

          </div>
        )}

      </div>
    </div>
  );
};
