import React, { useState } from 'react';
import {
  UserCheck,
  GraduationCap,
  FileCheck2,
  BookOpenCheck,
  PlaneTakeoff,
  CheckCircle2,
  ChevronRight,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { ChevronDeco } from './ChevronDeco';
import { CrestLogo } from './CrestLogo';
import { useWebsite } from '../context/WebsiteContext';

export const CoreServices: React.FC = () => {
  const { data } = useWebsite();
  const services = data.services;

  const [activeServiceId, setActiveServiceId] = useState<string>(services[0]?.id || 'profile-evaluation');

  const iconMap: Record<string, React.ElementType> = {
    UserCheck,
    GraduationCap,
    FileCheck2,
    BookOpenCheck,
    PlaneTakeoff,
  };

  return (
    <section id="services" className="relative py-16 sm:py-24 bg-[#5A1226] text-white overflow-hidden">
      {/* Subtle Dot Matrix Pattern overlay */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-dot-pattern-white opacity-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-dot-pattern opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Slide 5 Header with Crest & Golden Chevrons */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-8 lg:sticky lg:top-28">
            <div className="space-y-4">
              <CrestLogo variant="light" />
              
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-widest text-[#E5A823]">
                  End-to-End Educational Roadmap
                </span>
                <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
                  Core <br />
                  <span className="text-[#E5A823]">Services</span>
                </h2>
              </div>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                From initial profile appraisal to dormitory key handover, our comprehensive consulting suite ensures total academic and immigration safety.
              </p>

              <div className="pt-2">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#E5A823] hover:bg-[#D49515] text-[#5A1226] font-bold text-xs uppercase tracking-wider transition-all shadow-md hover:scale-105"
                >
                  <span>Request Service Consultation</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Service Headline Visual Card */}
              <div className="pt-2">
                <div className="relative rounded-2xl overflow-hidden border border-[#E5A823]/30 shadow-lg group">
                  <img
                    src="/src/assets/images/services_headline_1791445406028.jpg"
                    alt="Educational guidance and student consultation"
                    referrerPolicy="no-referrer"
                    className="w-full h-44 object-cover transform transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-2 left-2 right-2 px-2.5 py-1 bg-black/40 backdrop-blur-xs rounded-lg text-white flex items-center justify-between text-[11px]">
                    <span className="font-semibold text-[#E5A823]">5-Stage Pipeline</span>
                    <span>100% Compliance</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Chevron matching Slide 5 */}
            <div className="pt-6 hidden lg:block">
              <ChevronDeco count={4} size="lg" color="#E5A823" />
            </div>
          </div>

          {/* Right Column: 5 Services Cards matching Slide 5 Pill Heads & Clean Descriptions */}
          <div className="lg:col-span-8 space-y-4">
            
            {services.map((service) => {
              const Icon = iconMap[service.iconName] || GraduationCap;
              const isSelected = service.id === activeServiceId;

              return (
                <div
                  key={service.id}
                  id={`service-card-${service.id}`}
                  onClick={() => setActiveServiceId(service.id)}
                  className={`rounded-2xl p-6 sm:p-7 transition-all duration-300 border cursor-pointer ${
                    isSelected
                      ? 'bg-gradient-to-r from-white/15 to-white/10 border-[#E5A823] shadow-xl backdrop-blur-md ring-1 ring-[#E5A823]'
                      : 'bg-white/5 hover:bg-white/10 border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    
                    {/* Header Pill & Title */}
                    <div className="flex items-center gap-3.5">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform ${
                          isSelected ? 'bg-[#E5A823] text-[#5A1226] scale-105' : 'bg-white/10 text-[#E5A823]'
                        }`}
                      >
                        <Icon className="w-6 h-6" />
                      </div>

                      <div>
                        {/* Slide 5 Pill Style */}
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-[#E5A823]/40 text-[#E5A823] text-xs font-bold uppercase tracking-wider mb-1">
                          <Sparkles className="w-3 h-3 text-[#E5A823]" />
                          <span>{service.tag}</span>
                        </div>
                        <h3 className="text-xl sm:text-2xl font-bold text-white">
                          {service.title}
                        </h3>
                      </div>
                    </div>

                    <span
                      className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-colors hidden sm:block ${
                        isSelected ? 'bg-[#E5A823] text-[#5A1226]' : 'text-slate-400 bg-white/5'
                      }`}
                    >
                      {isSelected ? 'Active Service' : 'Click to View'}
                    </span>
                  </div>

                  {/* Exact Body Text from Slide 5 */}
                  <p className="text-slate-200 text-sm sm:text-base leading-relaxed mt-4">
                    {service.description}
                  </p>

                  {/* Expanded Details when selected */}
                  {isSelected && (
                    <div className="mt-5 pt-5 border-t border-white/10 space-y-3 animate-in fade-in duration-300">
                      <p className="text-xs font-bold uppercase tracking-wider text-[#E5A823]">
                        Key Inclusions & Guidance:
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {service.benefits.map((b, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs text-slate-200 bg-black/20 p-2.5 rounded-lg border border-white/5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#E5A823] flex-shrink-0 mt-0.5" />
                            <span>{b}</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-3 pt-3">
                        <div className="flex flex-wrap gap-1.5">
                          {service.deliverables.map((d, idx) => (
                            <span key={idx} className="text-[11px] bg-[#E5A823]/15 text-[#E5A823] px-2.5 py-1 rounded-md border border-[#E5A823]/30">
                              ✓ {d}
                            </span>
                          ))}
                        </div>

                        <a
                          href="#contact"
                          className="inline-flex items-center gap-1 text-xs font-bold text-[#E5A823] hover:underline"
                        >
                          <span>Apply for {service.title}</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

          </div>

        </div>

      </div>
    </section>
  );
};

