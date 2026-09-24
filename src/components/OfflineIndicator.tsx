import React, { useState, useEffect } from 'react';
import { WifiOff, CheckCircle, X } from 'lucide-react';

export const OfflineIndicator: React.FC = () => {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [showReconnected, setShowReconnected] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOffline(false);
      setShowReconnected(true);
      setIsDismissed(false);
      const timer = setTimeout(() => {
        setShowReconnected(false);
      }, 4000);
      return () => clearTimeout(timer);
    };

    const handleOffline = () => {
      setIsOffline(true);
      setShowReconnected(false);
      setIsDismissed(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (showReconnected) {
    return (
      <aside
        aria-label="Online status"
        className="fixed top-20 right-4 sm:right-8 z-50 animate-in fade-in slide-in-from-top-3 duration-300 pointer-events-auto"
      >
        <div className="bg-emerald-800 text-white px-4 py-2.5 rounded-2xl shadow-xl border border-emerald-600 flex items-center gap-3 text-xs font-semibold">
          <CheckCircle className="w-4 h-4 text-emerald-300 flex-shrink-0" />
          <span>Back online. Live updates & forms restored.</span>
        </div>
      </aside>
    );
  }

  if (!isOffline || isDismissed) {
    return null;
  }

  return (
    <aside
      aria-label="Offline status"
      className="fixed top-20 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-md animate-in fade-in slide-in-from-top-4 duration-300 pointer-events-auto"
    >
      <div className="bg-[#5A1226] text-white p-3.5 sm:p-4 rounded-2xl shadow-2xl border-2 border-[#E5A823] flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-[#E5A823]/20 border border-[#E5A823]/50 flex items-center justify-center flex-shrink-0 mt-0.5 text-[#E5A823]">
            <WifiOff className="w-4 h-4" />
          </div>
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#E5A823]">
                Offline Mode Active
              </span>
              <span className="bg-white/10 text-[10px] px-2 py-0.5 rounded-full font-medium text-slate-200">
                Cached Content
              </span>
            </div>
            <p className="text-xs text-slate-200 leading-relaxed">
              You are viewing stored study destinations, scholarship guides, and office contacts without an internet connection.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsDismissed(true)}
          className="text-white/60 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors flex-shrink-0 cursor-pointer"
          title="Dismiss offline banner"
          aria-label="Dismiss offline banner"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
};
