import React, { useState, useEffect } from 'react';
import {
  X,
  Send,
  CheckCircle2,
  ShieldCheck,
} from 'lucide-react';
import { CrestLogo } from './CrestLogo';
import { useWebsite } from '../context/WebsiteContext';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({ isOpen, onClose }) => {
  const { data, addLead } = useWebsite();
  const agencyInfo = data.agencyInfo;

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    targetDestination: 'Italy (Public Universities & Scholarships)',
    targetMajor: '',
    preferredOffice: 'Yangon Office (Mayangone Tsp)',
    notes: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      addLead({
        fullName: formData.fullName,
        phone: formData.phone,
        email: formData.email || undefined,
        currentEducation: 'General Inquiry',
        targetDestination: formData.targetDestination,
        targetMajor: formData.targetMajor || 'General Program',
        preferredOffice: formData.preferredOffice,
        notes: formData.notes ? `Modal Inquiry • ${formData.notes}` : 'Direct Modal Booking',
      });
    } catch (err) {
      console.warn('Error recording modal lead:', err);
    }

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 400);
  };

  const handleClose = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div
      onClick={handleClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl max-w-lg w-full p-5 sm:p-8 shadow-2xl border-2 border-[#E5A823] relative max-h-[90vh] overflow-y-auto"
      >
        
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-[#5A1226] hover:bg-stone-100 transition-colors cursor-pointer"
          title="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-8 space-y-5 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-extrabold text-[#5A1226]">
                Application Received!
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Thank you, <strong className="text-slate-900">{formData.fullName}</strong>. Our senior consultant will contact you via{' '}
                <strong className="text-slate-900">{formData.phone}</strong> shortly.
              </p>
            </div>

            <div className="pt-3 flex flex-col gap-2">
              <a
                href={`https://wa.me/${agencyInfo.whatsappNumber}?text=Hello%20U%20Education,%20I%20just%20booked%20a%20consultation%20under%20the%20name%20${encodeURIComponent(
                  formData.fullName
                )}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-xl bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider text-center"
              >
                Instant Connect on WhatsApp
              </a>
              <button
                onClick={handleClose}
                className="w-full py-2.5 rounded-xl bg-stone-100 text-slate-700 font-semibold text-xs hover:bg-stone-200"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div className="space-y-1 pb-3 border-b border-stone-200">
              <div className="flex items-center gap-2">
                <CrestLogo variant="compact" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#E5A823]">
                  Direct Counseling Booking
                </span>
              </div>
              <h3 className="text-2xl font-extrabold text-[#5A1226]">
                Free Student Consultation
              </h3>
              <p className="text-xs text-slate-600">
                Speak directly with an accredited counselor in Yangon, Mandalay, or online.
              </p>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 uppercase">
                Student Full Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Min Thura"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:border-[#5A1226] text-xs sm:text-sm outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 uppercase">
                  Phone / Viber *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="09977859474"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:border-[#5A1226] text-xs sm:text-sm outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 uppercase">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@gmail.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:border-[#5A1226] text-xs sm:text-sm outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 uppercase">
                  Target Destination
                </label>
                <select
                  value={formData.targetDestination}
                  onChange={(e) => setFormData({ ...formData, targetDestination: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:border-[#5A1226] text-xs bg-white outline-none"
                >
                  <option>Italy (Public Universities & Scholarships)</option>
                  <option>Thailand (International Programs)</option>
                  <option>China (CSC Scholarships & Tech)</option>
                  <option>Malaysia (UK/Australian Branch Campuses)</option>
                  <option>Cambodia (ASEAN Hub & Dual Degrees)</option>
                  <option>Multiple / Need Recommendation</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 uppercase">
                  Preferred Office
                </label>
                <select
                  value={formData.preferredOffice}
                  onChange={(e) => setFormData({ ...formData, preferredOffice: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:border-[#5A1226] text-xs bg-white outline-none"
                >
                  <option>Yangon Office (Mayangone Tsp)</option>
                  <option>Mandalay Office (Chan Mya Tharsi Tsp)</option>
                  <option>Bangkok Liaison Office (Thailand)</option>
                  <option>Phnom Penh Support Office (Cambodia)</option>
                  <option>Messina European Office (Italy)</option>
                  <option>Online Zoom Video Meeting</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 uppercase">
                Intended Major / Notes
              </label>
              <input
                type="text"
                placeholder="e.g. Computer Science, Medicine, Business..."
                value={formData.targetMajor}
                onChange={(e) => setFormData({ ...formData, targetMajor: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:border-[#5A1226] text-xs sm:text-sm outline-none"
              />
            </div>

            <div className="flex items-center gap-2 text-[11px] text-slate-500 bg-[#FAF8F5] p-2.5 rounded-xl">
              <ShieldCheck className="w-4 h-4 text-[#E5A823] flex-shrink-0" />
              <span>Zero hidden fees. Unbiased institution advice tailored to you.</span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-[#5A1226] hover:bg-[#721832] text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 border border-[#E5A823]/40"
            >
              <Send className="w-4 h-4 text-[#E5A823]" />
              <span>{loading ? 'Submitting...' : 'Confirm Appointment'}</span>
            </button>

          </form>
        )}

      </div>
    </div>
  );
};
