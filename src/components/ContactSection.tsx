import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Send,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';
import { ChevronDeco } from './ChevronDeco';
import { useWebsite } from '../context/WebsiteContext';

export const ContactSection: React.FC = () => {
  const { data, addLead } = useWebsite();
  const agencyInfo = data.agencyInfo;
  const offices = data.offices;

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    currentEducation: 'Grade 12 / Matriculation',
    targetDestination: 'Italy (Scholarship & Public Universities)',
    targetMajor: '',
    preferredOffice: 'Yangon Office (Mayangone Tsp)',
    englishTest: 'Planning to take IELTS / Duolingo',
    intakeYear: '2026 / 2027',
    notes: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      addLead({
        fullName: formData.fullName,
        phone: formData.phone,
        email: formData.email || undefined,
        currentEducation: formData.currentEducation,
        targetDestination: formData.targetDestination,
        targetMajor: formData.targetMajor || 'General Academic Pathway',
        preferredOffice: formData.preferredOffice,
        notes: `${formData.englishTest} • Intake: ${formData.intakeYear}${formData.notes ? ' • Note: ' + formData.notes : ''}`,
      });
    } catch (err) {
      console.warn('Error recording lead:', err);
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 400);
  };

  const yangonOffice = offices.find((o) => o.id === 'yangon') || offices[0];
  const mandalayOffice = offices.find((o) => o.id === 'mandalay') || offices[1] || offices[0];

  return (
    <section id="contact" className="relative py-16 sm:py-24 bg-[#5A1226] text-white overflow-hidden">
      {/* Background Graduation Cap Backdrop with Gradient matching Slide 8 */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#4A0E1F] via-[#5A1226] to-[#3B0A17] pointer-events-none" />

      {/* Decorative Dot Matrix in top right & bottom left matching Slide 8 */}
      <div className="absolute top-10 right-8 w-44 h-44 bg-dot-pattern-white opacity-20 pointer-events-none hidden md:block" />
      <div className="absolute bottom-10 left-8 w-36 h-36 bg-dot-pattern opacity-20 pointer-events-none hidden lg:block" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Top Chevron & Contact Pill matching Slide 8 */}
        <div className="flex flex-col items-start space-y-4 mb-12">
          <div className="flex items-center justify-between w-full">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E5A823] text-[#5A1226] text-xs font-extrabold uppercase tracking-wider shadow-md">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Contact</span>
            </div>

            <ChevronDeco count={4} size="md" color="#E5A823" />
          </div>

          <div className="space-y-2">
            <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight">
              Get in Touch <br />
              <span className="text-[#E5A823]">With Us</span>
            </h2>
            <p className="text-slate-200 text-sm sm:text-base max-w-2xl">
              Take the first step toward your global degree. Book a complimentary one-on-one counseling session at our Yangon or Mandalay centers, or connect via WhatsApp.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Contact Information Cards matching exact user data */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Direct Phone / Hotline */}
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/15 hover:border-[#E5A823] transition-all shadow-lg">
              <div className="flex items-start gap-4">
                <div className="p-3.5 rounded-2xl bg-[#E5A823] text-[#5A1226] shadow-md flex-shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#E5A823]">
                    Official Hotline & Viber
                  </span>
                  <a
                    id="contact-phone-direct"
                    href={`tel:${agencyInfo.cleanPhone}`}
                    className="text-xl sm:text-2xl font-extrabold text-white hover:text-[#E5A823] transition-colors block"
                  >
                    {agencyInfo.phone}
                  </a>
                  <p className="text-xs text-slate-300">
                    Direct voice counseling & instant inquiry response
                  </p>
                </div>
              </div>
            </div>

            {/* Direct Email */}
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/15 hover:border-[#E5A823] transition-all shadow-lg">
              <div className="flex items-start gap-4">
                <div className="p-3.5 rounded-2xl bg-[#E5A823] text-[#5A1226] shadow-md flex-shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#E5A823]">
                    Official Email
                  </span>
                  <a
                    id="contact-email-direct"
                    href={`mailto:${agencyInfo.email}`}
                    className="text-lg sm:text-xl font-bold text-white hover:text-[#E5A823] transition-colors block break-all"
                  >
                    {agencyInfo.email}
                  </a>
                  <p className="text-xs text-slate-300">
                    Send transcripts and admissions portfolios directly
                  </p>
                </div>
              </div>
            </div>

            {/* Yangon Office Address Card */}
            {yangonOffice && (
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/15 space-y-2">
                <div className="flex items-center gap-2 text-[#E5A823] text-xs font-bold uppercase tracking-wider">
                  <MapPin className="w-4 h-4" />
                  <span>{yangonOffice.city} Counseling Center</span>
                </div>
                <p className="text-sm font-semibold text-white leading-relaxed">
                  {yangonOffice.address}
                </p>
                <div className="flex items-center justify-between text-xs text-slate-300 pt-2 border-t border-white/10">
                  <span>{yangonOffice.hours}</span>
                  <span className="text-[#E5A823] font-semibold">{yangonOffice.landmark || yangonOffice.city}</span>
                </div>
              </div>
            )}

            {/* Mandalay Office Address Card */}
            {mandalayOffice && (
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/15 space-y-2">
                <div className="flex items-center gap-2 text-[#E5A823] text-xs font-bold uppercase tracking-wider">
                  <MapPin className="w-4 h-4" />
                  <span>{mandalayOffice.city} Regional Center</span>
                </div>
                <p className="text-sm font-semibold text-white leading-relaxed">
                  {mandalayOffice.address}
                </p>
                <div className="flex items-center justify-between text-xs text-slate-300 pt-2 border-t border-white/10">
                  <span>{mandalayOffice.hours}</span>
                  <span className="text-[#E5A823] font-semibold">{mandalayOffice.landmark || mandalayOffice.city}</span>
                </div>
              </div>
            )}

            {/* Direct Send Email Action Button */}
            <a
              id="contact-send-email-btn"
              href={`mailto:${agencyInfo.email}?subject=Study%20Abroad%20Consultation%20Inquiry%20-%20U%20Education`}
              className="flex items-center justify-center gap-2.5 w-full py-4 rounded-2xl bg-[#E5A823] hover:bg-[#d49515] text-[#5A1226] font-black text-sm shadow-lg transition-all hover:scale-[1.02] cursor-pointer"
            >
              <Mail className="w-5 h-5" />
              <span>Send Official Email Inquiry</span>
            </a>

          </div>

          {/* Right Column: Free Consultation & Assessment Form */}
          <div className="lg:col-span-7 bg-white text-slate-900 rounded-3xl p-6 sm:p-10 shadow-2xl border-2 border-[#E5A823]">
            
            {submitted ? (
              <div className="text-center py-12 space-y-6 animate-in zoom-in-95 duration-300">
                <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-[#5A1226]">
                    Consultation Request Received!
                  </h3>
                  <p className="text-slate-600 text-sm max-w-md mx-auto">
                    Thank you, <strong className="text-slate-900">{formData.fullName}</strong>. Our senior education counselor will contact you via{' '}
                    <strong className="text-slate-900">{formData.phone}</strong> within 24 hours.
                  </p>
                </div>

                <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-stone-200 text-left max-w-md mx-auto text-xs space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Destination Interest:</span>
                    <strong className="text-[#5A1226]">{formData.targetDestination}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Office Preference:</span>
                    <strong className="text-[#5A1226]">{formData.preferredOffice}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Target Intake:</span>
                    <strong className="text-slate-800">{formData.intakeYear}</strong>
                  </div>
                </div>

                <div className="pt-4 flex flex-wrap justify-center gap-3">
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        fullName: '',
                        phone: '',
                        email: '',
                        currentEducation: 'Grade 12 / Matriculation',
                        targetDestination: 'Italy (Scholarship & Public Universities)',
                        targetMajor: '',
                        preferredOffice: 'Yangon Office (Mayangone Tsp)',
                        englishTest: 'Planning to take IELTS / Duolingo',
                        intakeYear: '2026 / 2027',
                        notes: '',
                      });
                    }}
                    className="px-6 py-2.5 rounded-full bg-stone-200 text-slate-800 font-bold text-xs hover:bg-stone-300 transition-colors cursor-pointer"
                  >
                    Submit Another Inquiry
                  </button>

                  <a
                    href={`mailto:${agencyInfo.email}?subject=Consultation%20Followup%20-%20${encodeURIComponent(
                      formData.fullName
                    )}`}
                    className="px-6 py-2.5 rounded-full bg-[#5A1226] hover:bg-[#721832] text-white font-bold text-xs transition-colors"
                  >
                    Send Email Follow-Up
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                
                <div className="space-y-1 pb-2 border-b border-stone-200">
                  <h3 className="text-2xl font-extrabold text-[#5A1226]">
                    Book Free Student Assessment
                  </h3>
                  <p className="text-xs text-slate-600">
                    Complimentary evaluation of transcripts, scholarship eligibility & university options.
                  </p>
                </div>

                {/* Name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Student Full Name <span className="text-rose-600">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Aung Kyaw Min"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:border-[#5A1226] focus:ring-2 focus:ring-[#5A1226]/20 text-sm outline-none transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Phone / Viber / Telegram <span className="text-rose-600">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 09977859474"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:border-[#5A1226] focus:ring-2 focus:ring-[#5A1226]/20 text-sm outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Email & Current Education */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Email Address <span className="text-rose-600">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. student@gmail.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:border-[#5A1226] focus:ring-2 focus:ring-[#5A1226]/20 text-sm outline-none transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Current Qualification
                    </label>
                    <select
                      value={formData.currentEducation}
                      onChange={(e) => setFormData({ ...formData, currentEducation: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:border-[#5A1226] focus:ring-2 focus:ring-[#5A1226]/20 text-sm outline-none transition-all bg-white"
                    >
                      <option>Grade 12 / Matriculation</option>
                      <option>IGCSE / GED / O-Levels</option>
                      <option>A-Levels / Foundation</option>
                      <option>Bachelor's Degree Holder</option>
                      <option>University Student (Transfer)</option>
                      <option>Master's / Postgraduate</option>
                    </select>
                  </div>
                </div>

                {/* Destination & Office */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Target Destination
                    </label>
                    <select
                      value={formData.targetDestination}
                      onChange={(e) => setFormData({ ...formData, targetDestination: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:border-[#5A1226] focus:ring-2 focus:ring-[#5A1226]/20 text-sm outline-none transition-all bg-white"
                    >
                      <option>Italy (Scholarships & Public Universities)</option>
                      <option>Thailand (International Programs & Proximity)</option>
                      <option>China (CSC Government Scholarships & Tech)</option>
                      <option>Malaysia (British & Australian Branch Campuses)</option>
                      <option>Cambodia (ASEAN Hub & Dual Degrees)</option>
                      <option>Multiple / Recommend Best Fit</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Counseling Preference
                    </label>
                    <select
                      value={formData.preferredOffice}
                      onChange={(e) => setFormData({ ...formData, preferredOffice: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:border-[#5A1226] focus:ring-2 focus:ring-[#5A1226]/20 text-sm outline-none transition-all bg-white"
                    >
                      <option>Yangon Office (Mayangone Tsp)</option>
                      <option>Mandalay Office (Chan Mya Tharsi Tsp)</option>
                      <option>Bangkok Liaison Hub (Thailand)</option>
                      <option>Phnom Penh Office (Cambodia)</option>
                      <option>Messina European Support (Italy)</option>
                      <option>Online Video Consultation (Zoom / Google Meet)</option>
                      <option>Direct Phone Call Consultation</option>
                    </select>
                  </div>
                </div>

                {/* Intake & Major */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Target Intake Year
                    </label>
                    <select
                      value={formData.intakeYear}
                      onChange={(e) => setFormData({ ...formData, intakeYear: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:border-[#5A1226] focus:ring-2 focus:ring-[#5A1226]/20 text-sm outline-none transition-all bg-white"
                    >
                      <option>2026 (Fall / September Intake)</option>
                      <option>2026 / 2027 (Spring / January Intake)</option>
                      <option>2027 (Fall / September Intake)</option>
                      <option>Immediate / Next Available</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Intended Major / Study Field
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Computer Science, Business, MBBS"
                      value={formData.targetMajor}
                      onChange={(e) => setFormData({ ...formData, targetMajor: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:border-[#5A1226] focus:ring-2 focus:ring-[#5A1226]/20 text-sm outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Questions / Background Notes */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Questions or Academic Background Notes
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Provide any details about your GPA, IELTS score, or specific universities you are interested in..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:border-[#5A1226] focus:ring-2 focus:ring-[#5A1226]/20 text-sm outline-none transition-all resize-none"
                  />
                </div>

                {/* Ethical Guarantee info */}
                <div className="flex items-center gap-2 text-xs text-slate-600 bg-[#FAF8F5] p-3 rounded-xl border border-stone-200">
                  <ShieldCheck className="w-4 h-4 text-[#E5A823] flex-shrink-0" />
                  <span>
                    Your personal information is secure and confidential. We never charge hidden agency fees.
                  </span>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  id="consultation-form-submit-button"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-[#5A1226] hover:bg-[#721832] text-white font-bold text-sm uppercase tracking-wider transition-all shadow-md hover:shadow-lg disabled:opacity-75 cursor-pointer border border-[#E5A823]/40"
                >
                  <Send className="w-4 h-4 text-[#E5A823]" />
                  <span>{isSubmitting ? 'Submitting Application...' : 'Book Free Consultation Now'}</span>
                </button>

              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};

