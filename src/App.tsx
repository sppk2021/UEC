import React, { useState, Suspense, lazy } from 'react';
import { WebsiteProvider, useWebsite } from './context/WebsiteContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { DestinationsPage } from './pages/DestinationsPage';
import { BlogPage } from './pages/BlogPage';
import { ContactPage } from './pages/ContactPage';
import { PathwayPage } from './pages/PathwayPage';

const ConsultationModal = lazy(() =>
  import('./components/ConsultationModal').then((m) => ({ default: m.ConsultationModal }))
);
const AdminPanel = lazy(() =>
  import('./components/AdminPanel/AdminPanel').then((m) => ({ default: m.AdminPanel }))
);

const AppContent: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { activePage, isAdminOpen } = useWebsite();

  const renderCurrentPage = () => {
    switch (activePage) {
      case 'about':
        return <AboutPage onOpenConsultationModal={() => setIsModalOpen(true)} />;
      case 'services':
        return <ServicesPage onOpenConsultationModal={() => setIsModalOpen(true)} />;
      case 'destinations':
        return <DestinationsPage initialTab="destinations" onOpenConsultationModal={() => setIsModalOpen(true)} />;
      case 'offices':
        return <DestinationsPage initialTab="offices" onOpenConsultationModal={() => setIsModalOpen(true)} />;
      case 'pathway':
        return <PathwayPage onOpenConsultationModal={() => setIsModalOpen(true)} />;
      case 'blog':
        return <BlogPage onOpenConsultationModal={() => setIsModalOpen(true)} />;
      case 'contact':
        return <ContactPage onOpenConsultationModal={() => setIsModalOpen(true)} />;
      case 'home':
      default:
        return <HomePage onOpenConsultationModal={() => setIsModalOpen(true)} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-slate-900 flex flex-col selection:bg-[#E5A823]/30 selection:text-[#5A1226]">
      {/* Main Top Navigation */}
      <Navbar onOpenConsultationModal={() => setIsModalOpen(true)} />

      {/* Current Page View */}
      <main className="flex-1">
        {renderCurrentPage()}
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
