import React, { useState, Suspense, lazy } from 'react';
import { MessageCircle, Phone, Sparkles, Sliders, ShieldCheck } from 'lucide-react';
import { WebsiteProvider, useWebsite } from './context/WebsiteContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Introduction } from './components/Introduction';
import { VisionMission } from './components/VisionMission';
import { CoreServices } from './components/CoreServices';
import { StudyDestinations } from './components/StudyDestinations';
import { OfficeLocations } from './components/OfficeLocations';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

// Lazy load heavy components to optimize initial page load speed and mobile performance
const PartnersGroup = lazy(() =>
  import('./components/PartnersGroup').then((m) => ({ default: m.PartnersGroup }))
);
const InteractiveAssessmentTool = lazy(() =>
  import('./components/InteractiveAssessmentTool').then((m) => ({
    default: m.InteractiveAssessmentTool,
  }))
);
const TestimonialsFaq = lazy(() =>
  import('./components/TestimonialsFaq').then((m) => ({ default: m.TestimonialsFaq }))
);
const ConsultationModal = lazy(() =>
  import('./components/ConsultationModal').then((m) => ({ default: m.ConsultationModal }))
);
const AdminPanel = lazy(() =>
  import('./components/AdminPanel/AdminPanel').then((m) => ({ default: m.AdminPanel }))
);

// Loading Skeleton Fallback for lazy-loaded sections
const SectionSkeleton: React.FC<{ label: string; minHeight?: string }> = ({
  label,
  minHeight = 'min-h-[300px]',
}) => (
  <div
    className={`w-full ${minHeight} max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex items-center justify-center`}
  >
    <div className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-stone-50 border border-stone-200">
      <div className="w-7 h-7 rounded-full border-3 border-[#5A1226]/20 border-t-[#E5A823] animate-spin" />
      <span className="text-xs font-semibold uppercase tracking-wider text-[#5A1226]">
        Loading {label}...
      </span>
    </div>
  </div>
);

const AppContent: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, isAdminOpen, setIsAdminOpen } = useWebsite();
  const { agencyInfo } = data;

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-slate-900 flex flex-col selection:bg-[#E5A823]/30 selection:text-[#5A1226]">
      {/* Navigation */}
      <Navbar onOpenConsultationModal={() => setIsModalOpen(true)} />

      {/* Main Website Sections */}
      <main className="flex-1">
        {/* 1. Hero Section (Slide 1) */}
        <Hero onOpenConsultation={() => setIsModalOpen(true)} />

        {/* 2. Introduction (Slide 2) */}
        <Introduction />

        {/* 3. Corporate Group & Delegated Partner (Slide 3) - Lazy loaded */}
        <Suspense fallback={<SectionSkeleton label="Partnership Network" minHeight="min-h-[350px]" />}>
          <PartnersGroup />
        </Suspense>

        {/* 4. Vision, Mission & Ethical Commitment (Slide 4) */}
        <VisionMission />

        {/* 5. Core Services (Slide 5) */}
        <CoreServices />

        {/* 6. Study Destinations (Slide 6) */}
        <StudyDestinations />

        {/* 7. Office Locations (Slide 7) */}
        <OfficeLocations />

        {/* 8. Interactive Student Pathway Profiler Tool - Lazy loaded heavy widget */}
        <Suspense fallback={<SectionSkeleton label="Interactive Assessment Profiler" minHeight="min-h-[450px]" />}>
          <InteractiveAssessmentTool />
        </Suspense>

        {/* 9. Process Roadmap & FAQs - Lazy loaded */}
        <Suspense fallback={<SectionSkeleton label="Frequently Asked Questions" minHeight="min-h-[350px]" />}>
          <TestimonialsFaq />
        </Suspense>

        {/* 10. Contact & Free Student Assessment Form (Slide 8) */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Pop-up Consultation Modal - Lazy loaded */}
      {isModalOpen && (
        <Suspense fallback={null}>
          <ConsultationModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        </Suspense>
      )}

      {/* Full-Feature Admin Panel Editor - Lazy loaded */}
      {isAdminOpen && (
        <Suspense
          fallback={
            <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="bg-[#FAF8F5] p-6 rounded-3xl border-2 border-[#E5A823] shadow-2xl flex items-center gap-3 text-[#5A1226] font-bold text-sm">
                <div className="w-6 h-6 rounded-full border-3 border-[#5A1226]/30 border-t-[#E5A823] animate-spin" />
                <span>Loading Admin Panel Editor...</span>
              </div>
            </div>
          }
        >
          <AdminPanel />
        </Suspense>
      )}

      {/* Floating Action Buttons: WhatsApp & Quick Admin Access */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2.5">
        {/* Floating Admin Trigger */}
        <button
          type="button"
          id="floating-admin-toggle"
          onClick={() => setIsAdminOpen(true)}
          className="flex items-center gap-2 px-3 py-2 rounded-full bg-[#5A1226] hover:bg-[#721832] text-amber-300 text-xs font-bold shadow-lg border border-[#E5A823]/50 transition-all hover:scale-105 cursor-pointer"
          title="Open Admin Panel to edit whole website"
        >
          <Sliders className="w-3.5 h-3.5 text-[#E5A823]" />
          <span className="hidden sm:inline">Admin Edit</span>
        </button>

        {/* WhatsApp Floating Chat */}
        <a
          id="floating-whatsapp-btn"
          href={`https://wa.me/${agencyInfo.whatsappNumber}?text=Hello%20U%20Education%20Consultant%20Agency,%20I%20would%20like%20to%20inquire%20about%20studying%20abroad.`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-xl transition-all hover:scale-105 group font-bold text-xs cursor-pointer"
          title="Chat with Education Counselor on WhatsApp"
        >
          <MessageCircle className="w-5 h-5 text-white" />
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 whitespace-nowrap text-white">
            Chat on WhatsApp
          </span>
        </a>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <WebsiteProvider>
      <AppContent />
    </WebsiteProvider>
  );
}

