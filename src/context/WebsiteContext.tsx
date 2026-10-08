import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  WebsiteData,
  AgencyInfo,
  HeroContent,
  IntroContent,
  CoreService,
  StudyDestination,
  OfficeLocation,
  PartnerCompany,
  PillarsData,
  FaqItem,
  LeadItem,
  BlogPost,
} from '../types';
import { INITIAL_WEBSITE_DATA } from '../data/agencyData';

const LOCAL_STORAGE_KEY = 'ueca_website_custom_data_v4';
const AUTH_STORAGE_KEY = 'ueca_admin_session_auth_v1';

export type PageId = 'home' | 'about' | 'services' | 'destinations' | 'pathway' | 'blog' | 'offices' | 'contact';
export type PathwayTab = 'why' | 'budget' | 'comparison' | 'suggestions' | 'universities';

// Parse initial page from browser URL or hash
const getInitialPageFromUrl = (): PageId => {
  if (typeof window === 'undefined') return 'home';
  const path = window.location.pathname.toLowerCase().replace(/^\//, '').replace(/\/$/, '');
  const hash = window.location.hash.toLowerCase().replace(/^#\/?/, '');
  const target = hash || path;
  
  if (target.startsWith('about')) return 'about';
  if (target.startsWith('service')) return 'services';
  if (target.startsWith('destination')) return 'destinations';
  if (target.startsWith('pathway') || target.startsWith('calculator') || target.startsWith('budget') || target.startsWith('compare')) return 'pathway';
  if (target.startsWith('office')) return 'offices';
  if (target.startsWith('blog') || target.startsWith('stor')) return 'blog';
  if (target.startsWith('contact') || target.startsWith('assessment')) return 'contact';
  return 'home';
};

const getInitialPathwayTabFromUrl = (): PathwayTab => {
  if (typeof window === 'undefined') return 'why';
  const path = window.location.pathname.toLowerCase();
  const hash = window.location.hash.toLowerCase();
  const target = hash || path;
  if (target.includes('calculator') || target.includes('budget')) return 'budget';
  if (target.includes('compare') || target.includes('comparison')) return 'comparison';
  return 'why';
};

// Check if current browser URL corresponds to the /admin route
const checkIsAdminRoute = (): boolean => {
  if (typeof window === 'undefined') return false;
  const path = window.location.pathname.toLowerCase();
  const hash = window.location.hash.toLowerCase();
  const search = window.location.search.toLowerCase();
  return (
    path === '/admin' ||
    path === '/admin/' ||
    path.startsWith('/admin') ||
    hash === '#admin' ||
    hash.startsWith('#/admin') ||
    search.includes('admin=true') ||
    search.includes('admin=1')
  );
};

interface WebsiteContextType {
  data: WebsiteData;
  activePage: PageId;
  setActivePage: (page: PageId, options?: { scrollToTop?: boolean; articleSlug?: string; destinationId?: string; pathwayTab?: PathwayTab }) => void;
  pathwayTab: PathwayTab;
  setPathwayTab: (tab: PathwayTab) => void;
  selectedArticleSlug: string | null;
  setSelectedArticleSlug: (slug: string | null) => void;
  selectedDestinationId: string | null;
  setSelectedDestinationId: (id: string | null) => void;
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
  isAdminAuthenticated: boolean;
  setIsAdminAuthenticated: (auth: boolean) => void;
  verifyPasscode: (passcode: string) => boolean;
  updateAgencyInfo: (info: Partial<AgencyInfo>) => void;
  updateHeroContent: (hero: Partial<HeroContent>) => void;
  updateIntroContent: (intro: Partial<IntroContent>) => void;
  updateServices: (services: CoreService[]) => void;
  updateService: (index: number, updated: CoreService) => void;
  addService: (service: CoreService) => void;
  deleteService: (id: string) => void;
  updateDestinations: (destinations: StudyDestination[]) => void;
  updateDestination: (index: number, updated: StudyDestination) => void;
  addDestination: (destination: StudyDestination) => void;
  deleteDestination: (id: string) => void;
  updateOffices: (offices: OfficeLocation[]) => void;
  updateOffice: (index: number, updated: OfficeLocation) => void;
  addOffice: (office: OfficeLocation) => void;
  deleteOffice: (id: string) => void;
  updatePartners: (partners: PartnerCompany[]) => void;
  updatePartner: (index: number, updated: PartnerCompany) => void;
  addPartner: (partner: PartnerCompany) => void;
  deletePartner: (id: string) => void;
  updatePillars: (pillars: PillarsData) => void;
  updateFaqs: (faqs: FaqItem[]) => void;
  addFaq: (faq: FaqItem) => void;
  deleteFaq: (id: string) => void;
  updateBlogPosts: (posts: BlogPost[]) => void;
  addBlogPost: (post: BlogPost) => void;
  deleteBlogPost: (id: string) => void;
  addLead: (lead: Omit<LeadItem, 'id' | 'createdAt' | 'status'>) => void;
  updateLeadStatus: (id: string, status: LeadItem['status']) => void;
  deleteLead: (id: string) => void;
  updateAdminPasscode: (newPass: string) => void;
  resetToDefaults: () => void;
  exportDataToJson: () => void;
  importDataFromJson: (jsonStr: string) => boolean;
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const WebsiteContext = createContext<WebsiteContextType | undefined>(undefined);

export const WebsiteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<WebsiteData>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        
        let mergedDestinations = INITIAL_WEBSITE_DATA.destinations;
        if (Array.isArray(parsed.destinations) && parsed.destinations.length >= 5 && parsed.destinations.some((d: any) => d.id === 'cambodia')) {
          mergedDestinations = parsed.destinations;
        } else {
          mergedDestinations = INITIAL_WEBSITE_DATA.destinations;
        }

        let mergedOffices = INITIAL_WEBSITE_DATA.offices;
        if (Array.isArray(parsed.offices) && parsed.offices.length >= 5 && parsed.offices.some((o: any) => o.id === 'cambodia')) {
          mergedOffices = parsed.offices;
        } else {
          mergedOffices = INITIAL_WEBSITE_DATA.offices;
        }

        // Merge with initial data to ensure all keys exist
        const mergedIntroContent = { ...INITIAL_WEBSITE_DATA.introContent, ...(parsed.introContent || {}) };
        if (!mergedIntroContent.imageUrl || mergedIntroContent.imageUrl.includes('photo-1523050854058-8df90110c9f1')) {
          mergedIntroContent.imageUrl = INITIAL_WEBSITE_DATA.introContent.imageUrl;
        }

        return {
          ...INITIAL_WEBSITE_DATA,
          ...parsed,
          agencyInfo: { ...INITIAL_WEBSITE_DATA.agencyInfo, ...(parsed.agencyInfo || {}) },
          heroContent: { ...INITIAL_WEBSITE_DATA.heroContent, ...(parsed.heroContent || {}) },
          introContent: mergedIntroContent,
          destinations: mergedDestinations,
          offices: mergedOffices,
          pillars: { ...INITIAL_WEBSITE_DATA.pillars, ...(parsed.pillars || {}) },
          leads: Array.isArray(parsed.leads) ? parsed.leads : INITIAL_WEBSITE_DATA.leads,
          blogPosts: Array.isArray(parsed.blogPosts) && parsed.blogPosts.length > 0 ? parsed.blogPosts : INITIAL_WEBSITE_DATA.blogPosts,
        };
      }
    } catch (e) {
      console.warn('Failed to parse saved website data from localStorage', e);
    }
    return INITIAL_WEBSITE_DATA;
  });

  const [activePage, setActivePageState] = useState<PageId>(() => getInitialPageFromUrl());
  const [selectedArticleSlug, setSelectedArticleSlug] = useState<string | null>(() => {
    if (typeof window === 'undefined') return null;
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('article') || null;
  });
  const [selectedDestinationId, setSelectedDestinationId] = useState<string | null>(() => {
    if (typeof window === 'undefined') return null;
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('destination') || null;
  });

  const [pathwayTab, setPathwayTab] = useState<PathwayTab>(() => {
    return getInitialPathwayTabFromUrl();
  });

  const [isAdminOpen, setIsAdminOpenState] = useState<boolean>(() => {
    return checkIsAdminRoute();
  });

  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return sessionStorage.getItem(AUTH_STORAGE_KEY) === 'true';
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const setActivePage = (page: PageId, options?: { scrollToTop?: boolean; articleSlug?: string; destinationId?: string; pathwayTab?: PathwayTab }) => {
    setActivePageState(page);
    if (options?.pathwayTab !== undefined) {
      setPathwayTab(options.pathwayTab);
    }
    if (options?.articleSlug !== undefined) {
      setSelectedArticleSlug(options.articleSlug);
    }
    if (options?.destinationId !== undefined) {
      setSelectedDestinationId(options.destinationId);
    }

    if (typeof window !== 'undefined') {
      const queryParts: string[] = [];
      if (options?.destinationId) {
        queryParts.push(`destination=${encodeURIComponent(options.destinationId)}`);
      }
      if (options?.articleSlug) {
        queryParts.push(`article=${encodeURIComponent(options.articleSlug)}`);
      }
      if (options?.pathwayTab && options.pathwayTab !== 'why') {
        queryParts.push(`tab=${encodeURIComponent(options.pathwayTab)}`);
      }
      const queryString = queryParts.length > 0 ? `?${queryParts.join('&')}` : '';
      const targetHash = page === 'home' ? '' : `#${page}${queryString}`;
      window.history.pushState(
        { page, articleSlug: options?.articleSlug, destinationId: options?.destinationId, pathwayTab: options?.pathwayTab },
        '',
        targetHash || window.location.pathname
      );
      
      if (options?.scrollToTop !== false) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  // Sync open state with browser URL route (/admin)
  const setIsAdminOpen = (open: boolean) => {
    setIsAdminOpenState(open);
    if (typeof window !== 'undefined') {
      if (open) {
        if (!window.location.pathname.startsWith('/admin') && window.location.hash !== '#admin') {
          window.history.pushState({ admin: true }, '', '/admin');
        }
      } else {
        if (window.location.pathname.startsWith('/admin') || window.location.hash === '#admin') {
          window.history.pushState({ admin: false }, '', '/');
        }
      }
    }
  };

  // Listen to popstate, hashchange, and URL changes
  useEffect(() => {
    const handleLocationChange = () => {
      const isRoute = checkIsAdminRoute();
      setIsAdminOpenState(isRoute);

      const parsedPage = getInitialPageFromUrl();
      setActivePageState(parsedPage);

      const parsedTab = getInitialPathwayTabFromUrl();
      if (parsedPage === 'pathway') {
        const urlParams = new URLSearchParams(window.location.search);
        const tabParam = urlParams.get('tab') as PathwayTab | null;
        if (tabParam) {
          setPathwayTab(tabParam);
        } else if (parsedTab !== 'why') {
          setPathwayTab(parsedTab);
        }
      }

      const urlParams = new URLSearchParams(window.location.search);
      const art = urlParams.get('article');
      if (art) {
        setSelectedArticleSlug(art);
      }
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);

    // Keyboard shortcut for administrators: Ctrl+Shift+A or Cmd+Shift+A
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        setIsAdminOpenState((prev) => {
          const next = !prev;
          if (next) {
            window.history.pushState({ admin: true }, '', '/admin');
          } else {
            window.history.pushState({ admin: false }, '', '/');
          }
          return next;
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('Failed to save website data to localStorage', e);
    }
  }, [data]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const verifyPasscode = (passcode: string): boolean => {
    if (passcode.trim() === data.adminPasscode.trim()) {
      setIsAdminAuthenticated(true);
      sessionStorage.setItem(AUTH_STORAGE_KEY, 'true');
      return true;
    }
    return false;
  };

  const updateAgencyInfo = (info: Partial<AgencyInfo>) => {
    setData((prev) => ({
      ...prev,
      agencyInfo: { ...prev.agencyInfo, ...info },
      lastUpdated: new Date().toISOString(),
    }));
    showToast('Agency info updated successfully');
  };

  const updateHeroContent = (hero: Partial<HeroContent>) => {
    setData((prev) => ({
      ...prev,
      heroContent: { ...prev.heroContent, ...hero },
      lastUpdated: new Date().toISOString(),
    }));
    showToast('Hero section content updated');
  };

  const updateIntroContent = (intro: Partial<IntroContent>) => {
    setData((prev) => ({
      ...prev,
      introContent: { ...prev.introContent, ...intro },
      lastUpdated: new Date().toISOString(),
    }));
    showToast('Introduction content updated');
  };

  const updateServices = (services: CoreService[]) => {
    setData((prev) => ({ ...prev, services, lastUpdated: new Date().toISOString() }));
    showToast('Services updated');
  };

  const updateService = (index: number, updated: CoreService) => {
    setData((prev) => {
      const next = [...prev.services];
      next[index] = updated;
      return { ...prev, services: next, lastUpdated: new Date().toISOString() };
    });
    showToast(`Updated service: ${updated.title}`);
  };

  const addService = (service: CoreService) => {
    setData((prev) => ({
      ...prev,
      services: [...prev.services, service],
      lastUpdated: new Date().toISOString(),
    }));
    showToast(`Added service: ${service.title}`);
  };

  const deleteService = (id: string) => {
    setData((prev) => ({
      ...prev,
      services: prev.services.filter((s) => s.id !== id),
      lastUpdated: new Date().toISOString(),
    }));
    showToast('Service removed');
  };

  const updateDestinations = (destinations: StudyDestination[]) => {
    setData((prev) => ({ ...prev, destinations, lastUpdated: new Date().toISOString() }));
    showToast('Destinations updated');
  };

  const updateDestination = (index: number, updated: StudyDestination) => {
    setData((prev) => {
      const next = [...prev.destinations];
      next[index] = updated;
      return { ...prev, destinations: next, lastUpdated: new Date().toISOString() };
    });
    showToast(`Updated destination: ${updated.country}`);
  };

  const addDestination = (destination: StudyDestination) => {
    setData((prev) => ({
      ...prev,
      destinations: [...prev.destinations, destination],
      lastUpdated: new Date().toISOString(),
    }));
    showToast(`Added destination: ${destination.country}`);
  };

  const deleteDestination = (id: string) => {
    setData((prev) => ({
      ...prev,
      destinations: prev.destinations.filter((d) => d.id !== id),
      lastUpdated: new Date().toISOString(),
    }));
    showToast('Destination removed');
  };

  const updateOffices = (offices: OfficeLocation[]) => {
    setData((prev) => ({ ...prev, offices, lastUpdated: new Date().toISOString() }));
    showToast('Offices updated');
  };

  const updateOffice = (index: number, updated: OfficeLocation) => {
    setData((prev) => {
      const next = [...prev.offices];
      next[index] = updated;
      return { ...prev, offices: next, lastUpdated: new Date().toISOString() };
    });
    showToast(`Updated office: ${updated.city}`);
  };

  const addOffice = (office: OfficeLocation) => {
    setData((prev) => ({
      ...prev,
      offices: [...prev.offices, office],
      lastUpdated: new Date().toISOString(),
    }));
    showToast(`Added office: ${office.city}`);
  };

  const deleteOffice = (id: string) => {
    setData((prev) => ({
      ...prev,
      offices: prev.offices.filter((o) => o.id !== id),
      lastUpdated: new Date().toISOString(),
    }));
    showToast('Office removed');
  };

  const updatePartners = (partners: PartnerCompany[]) => {
    setData((prev) => ({ ...prev, partners, lastUpdated: new Date().toISOString() }));
    showToast('Partners updated');
  };

  const updatePartner = (index: number, updated: PartnerCompany) => {
    setData((prev) => {
      const next = [...prev.partners];
      next[index] = updated;
      return { ...prev, partners: next, lastUpdated: new Date().toISOString() };
    });
    showToast(`Updated partner: ${updated.name}`);
  };

  const addPartner = (partner: PartnerCompany) => {
    setData((prev) => ({
      ...prev,
      partners: [...prev.partners, partner],
      lastUpdated: new Date().toISOString(),
    }));
    showToast(`Added partner: ${partner.name}`);
  };

  const deletePartner = (id: string) => {
    setData((prev) => ({
      ...prev,
      partners: prev.partners.filter((p) => p.id !== id),
      lastUpdated: new Date().toISOString(),
    }));
    showToast('Partner removed');
  };

  const updatePillars = (pillars: PillarsData) => {
    setData((prev) => ({ ...prev, pillars, lastUpdated: new Date().toISOString() }));
    showToast('Vision & Mission pillars updated');
  };

  const updateFaqs = (faqs: FaqItem[]) => {
    setData((prev) => ({ ...prev, faqs, lastUpdated: new Date().toISOString() }));
    showToast('FAQs updated');
  };

  const addFaq = (faq: FaqItem) => {
    setData((prev) => ({
      ...prev,
      faqs: [...prev.faqs, faq],
      lastUpdated: new Date().toISOString(),
    }));
    showToast('New FAQ added');
  };

  const deleteFaq = (id: string) => {
    setData((prev) => ({
      ...prev,
      faqs: prev.faqs.filter((f) => f.id !== id),
      lastUpdated: new Date().toISOString(),
    }));
    showToast('FAQ deleted');
  };

  const addLead = (lead: Omit<LeadItem, 'id' | 'createdAt' | 'status'>) => {
    const newLead: LeadItem = {
      ...lead,
      id: 'lead-' + Date.now(),
      status: 'new',
      createdAt: new Date().toISOString(),
    };
    setData((prev) => ({
      ...prev,
      leads: [newLead, ...(prev.leads || [])],
      lastUpdated: new Date().toISOString(),
    }));
  };

  const updateLeadStatus = (id: string, status: LeadItem['status']) => {
    setData((prev) => ({
      ...prev,
      leads: prev.leads.map((l) => (l.id === id ? { ...l, status } : l)),
      lastUpdated: new Date().toISOString(),
    }));
    showToast(`Lead status marked as ${status}`);
  };

  const deleteLead = (id: string) => {
    setData((prev) => ({
      ...prev,
      leads: prev.leads.filter((l) => l.id !== id),
      lastUpdated: new Date().toISOString(),
    }));
    showToast('Lead entry removed');
  };

  const updateAdminPasscode = (newPass: string) => {
    if (!newPass.trim()) return;
    setData((prev) => ({
      ...prev,
      adminPasscode: newPass.trim(),
      lastUpdated: new Date().toISOString(),
    }));
    showToast('Admin passcode updated');
  };

  const updateBlogPosts = (posts: BlogPost[]) => {
    setData((prev) => ({ ...prev, blogPosts: posts, lastUpdated: new Date().toISOString() }));
    showToast('Blog articles updated');
  };

  const addBlogPost = (post: BlogPost) => {
    setData((prev) => ({
      ...prev,
      blogPosts: [post, ...(prev.blogPosts || [])],
      lastUpdated: new Date().toISOString(),
    }));
    showToast(`Published article: ${post.title}`);
  };

  const deleteBlogPost = (id: string) => {
    setData((prev) => ({
      ...prev,
      blogPosts: (prev.blogPosts || []).filter((b) => b.id !== id),
      lastUpdated: new Date().toISOString(),
    }));
    showToast('Article deleted');
  };

  const resetToDefaults = () => {
    setData(INITIAL_WEBSITE_DATA);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    showToast('Reset all website content to official slide defaults');
  };

  const exportDataToJson = () => {
    try {
      const jsonStr = JSON.stringify(data, null, 2);
      const blob = new Blob([jsonStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `ueca_website_backup_${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showToast('Website configuration JSON exported successfully');
    } catch (e) {
      console.error('Export failed', e);
      showToast('Failed to export JSON');
    }
  };

  const importDataFromJson = (jsonStr: string): boolean => {
    try {
      const parsed = JSON.parse(jsonStr);
      if (!parsed.agencyInfo || !parsed.services || !parsed.destinations) {
        showToast('Invalid backup file format');
        return false;
      }
      setData({
        ...INITIAL_WEBSITE_DATA,
        ...parsed,
        lastUpdated: new Date().toISOString(),
      });
      showToast('Website content imported successfully!');
      return true;
    } catch (e) {
      console.error('Import failed', e);
      showToast('Failed to parse JSON file');
      return false;
    }
  };

  const contextValue = React.useMemo(
    () => ({
      data,
      activePage,
      setActivePage,
      pathwayTab,
      setPathwayTab,
      selectedArticleSlug,
      setSelectedArticleSlug,
      selectedDestinationId,
      setSelectedDestinationId,
      isAdminOpen,
      setIsAdminOpen,
      isAdminAuthenticated,
      setIsAdminAuthenticated,
      verifyPasscode,
      updateAgencyInfo,
      updateHeroContent,
      updateIntroContent,
      updateServices,
      updateService,
      addService,
      deleteService,
      updateDestinations,
      updateDestination,
      addDestination,
      deleteDestination,
      updateOffices,
      updateOffice,
      addOffice,
      deleteOffice,
      updatePartners,
      updatePartner,
      addPartner,
      deletePartner,
      updatePillars,
      updateFaqs,
      addFaq,
      deleteFaq,
      updateBlogPosts,
      addBlogPost,
      deleteBlogPost,
      addLead,
      updateLeadStatus,
      deleteLead,
      updateAdminPasscode,
      resetToDefaults,
      exportDataToJson,
      importDataFromJson,
      toastMessage,
      showToast,
    }),
    [data, activePage, pathwayTab, selectedArticleSlug, selectedDestinationId, isAdminOpen, isAdminAuthenticated, toastMessage]
  );

  return (
    <WebsiteContext.Provider value={contextValue}>
      {children}

      {/* Global Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-2xl bg-[#5A1226] text-white text-xs sm:text-sm font-bold shadow-2xl border-2 border-[#E5A823] animate-in fade-in slide-in-from-bottom-4 duration-200 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#E5A823] animate-ping" />
          <span>{toastMessage}</span>
        </div>
      )}
    </WebsiteContext.Provider>
  );
};

export const useWebsite = (): WebsiteContextType => {
  const context = useContext(WebsiteContext);
  if (!context) {
    throw new Error('useWebsite must be used within a WebsiteProvider');
  }
  return context;
};
