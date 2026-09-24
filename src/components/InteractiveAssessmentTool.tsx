import React, { useState, useMemo } from 'react';
import {
  Compass,
  Sparkles,
  ArrowRight,
  RotateCcw,
  Award,
  CheckCircle2,
  DollarSign,
  GraduationCap,
  Calendar,
  Building2,
  Globe2,
  ShieldCheck,
  Copy,
  Mail,
  TrendingUp,
  Clock,
  BookOpen,
  Briefcase,
} from 'lucide-react';
import { useWebsite } from '../context/WebsiteContext';
import { StudyDestination } from '../types';

export const InteractiveAssessmentTool: React.FC = () => {
  const { data, showToast, setActivePage } = useWebsite();
  const destinations = data.destinations;
  const agencyInfo = data.agencyInfo;

  // Form Criteria State
  const [educationLevel, setEducationLevel] = useState<string>('grade12');
  const [targetDegree, setTargetDegree] = useState<string>('bachelor');
  const [financialPriority, setFinancialPriority] = useState<string>('full_scholarship');
  const [fieldOfInterest, setFieldOfInterest] = useState<string>('cs_ai');
  const [englishStatus, setEnglishStatus] = useState<string>('ielts_moderate');
  const [preferredRegion, setPreferredRegion] = useState<string>('any');

  const [showResult, setShowResult] = useState<boolean>(true);
  const [activeResultTab, setActiveResultTab] = useState<'why' | 'suggestions' | 'comparison' | 'universities'>('why');

  // Intelligent Recommendation Algorithm
  const getRecommendation = () => {
    const italy = destinations.find((d) => d.id === 'italy') || destinations[0];
    const china = destinations.find((d) => d.id === 'china') || destinations[1] || destinations[0];
    const thailand = destinations.find((d) => d.id === 'thailand') || destinations[2] || destinations[0];
    const malaysia = destinations.find((d) => d.id === 'malaysia') || destinations[3] || destinations[0];
    const cambodia = destinations.find((d) => d.id === 'cambodia') || destinations[4] || destinations[0];

    let primary: StudyDestination = italy;
    let secondary: StudyDestination = china;
    let matchPercentage = 96;
    let scholarshipChance = 'High (85%–95%) • DSU Regional Public Scholarships';
    let intakeRecommendation = 'Fall 2026 (September / October Intake)';
    let intakeDeadline = 'Pre-enrolment & CIMEA portal filing: March – June 2026';

    // Region preference overrides
    if (preferredRegion === 'italy') {
      primary = italy;
      secondary = financialPriority === 'full_scholarship' ? china : malaysia;
      matchPercentage = 98;
    } else if (preferredRegion === 'thailand') {
      primary = thailand;
      secondary = cambodia;
      matchPercentage = 97;
    } else if (preferredRegion === 'china') {
      primary = china;
      secondary = italy;
      matchPercentage = 98;
    } else if (preferredRegion === 'malaysia') {
      primary = malaysia;
      secondary = thailand;
      matchPercentage = 98;
    } else if (preferredRegion === 'cambodia') {
      primary = cambodia;
      secondary = thailand;
      matchPercentage = 96;
    } else {
      // Dynamic logic based on priority + major + education
      if (financialPriority === 'full_scholarship') {
        if (fieldOfInterest === 'cs_ai' || fieldOfInterest === 'architecture_engineering') {
          primary = italy;
          secondary = china;
          matchPercentage = 98;
          scholarshipChance = 'Very High (90%+) • Italian DSU Regional Grants (100% Tuition Waiver + €6,000–€8,000 Living Stipend)';
        } else if (fieldOfInterest === 'medicine_health') {
          primary = china;
          secondary = italy;
          matchPercentage = 95;
          scholarshipChance = 'High (80%–90%) • CSC Chinese Government Full-Ride (Tuition, Dorm & Stipend)';
        } else {
          primary = italy;
          secondary = china;
          matchPercentage = 96;
          scholarshipChance = 'Very High (85%–95%) • Regional Public Tuition Waiver';
        }
      } else if (financialPriority === 'affordable') {
        if (fieldOfInterest === 'hospitality_tourism' || fieldOfInterest === 'business_finance') {
          primary = thailand;
          secondary = cambodia;
          matchPercentage = 97;
          scholarshipChance = 'Moderate-High (30%–60% Merit Bursaries)';
          intakeRecommendation = 'August 2026 (Semester 1) / January 2027 (Semester 2)';
          intakeDeadline = 'Visa submission: 6–8 weeks before semester commencement';
        } else {
          primary = cambodia;
          secondary = thailand;
          matchPercentage = 95;
          scholarshipChance = 'Direct ASEAN Early-Enrolment Grants (Up to 40%)';
          intakeRecommendation = 'October 2026 / March 2027 Intake';
          intakeDeadline = 'Rolling admissions with expedited liaison visa processing';
        }
      } else if (financialPriority === 'dual_degree') {
        primary = malaysia;
        secondary = cambodia;
        matchPercentage = 98;
        scholarshipChance = 'High-Achiever Merit Awards (Up to 50% Tuition Reduction)';
        intakeRecommendation = 'September / October 2026 Intake';
        intakeDeadline = 'EMGS Visa Approval Letter (VAL) filing: 2 months prior';
      } else {
        // top_ranking
        if (fieldOfInterest === 'architecture_engineering' || fieldOfInterest === 'business_finance') {
          primary = italy;
          secondary = malaysia;
          matchPercentage = 96;
        } else {
          primary = china;
          secondary = malaysia;
          matchPercentage = 95;
        }
      }
    }

    // Specific field tailored advice
    const majorNames: Record<string, string> = {
      cs_ai: 'Computer Science, Artificial Intelligence & Software Engineering',
      business_finance: 'International Business, Finance & Fintech',
      medicine_health: 'Medicine, Surgery (MBBS) & Biomedical Sciences',
      architecture_engineering: 'Architecture, Civil & Mechanical Engineering',
      international_relations: 'International Relations, Global Diplomacy & Law',
      hospitality_tourism: 'Hospitality, Tourism & Luxury Brand Management',
    };

    // Tailored Universities per country and major
    const getUniversitiesForMatch = (countryId: string, field: string): string[] => {
      if (countryId === 'italy') {
        if (field === 'cs_ai' || field === 'architecture_engineering') {
          return [
            'Politecnico di Milano (Top 15 Global Engineering)',
            'University of Messina (Our European Ground Support Hub)',
            'Sapienza University of Rome',
            'Politecnico di Torino',
          ];
        } else if (field === 'medicine_health') {
          return [
            'University of Messina (IMAT English Medicine Program)',
            'University of Bologna (World Oldest Medical School)',
            'University of Milan',
            'Sapienza University of Rome',
          ];
        } else {
          return [
            'University of Bologna (Leading Business & Economics)',
            'University of Padua (European Research Pioneer)',
            'University of Messina (Direct Student Support)',
            'Sapienza University of Rome',
          ];
        }
      } else if (countryId === 'thailand') {
        return [
          'Chulalongkorn University (International Programs)',
          'Assumption University (ABAC - Prestigious English Business)',
          'Mahidol University (Global Medical & Science Hub)',
          'Bangkok University International (Digital Arts & Media)',
        ];
      } else if (countryId === 'china') {
        return [
          'Tsinghua University (World Top 20 - Computer Science)',
          'Zhejiang University (State-of-the-Art AI Laboratories)',
          'Shanghai Jiao Tong University (Pioneering Engineering & Trade)',
          'Nanjing University (CSC Full-Scholarship Host)',
        ];
      } else if (countryId === 'malaysia') {
        return [
          'Monash University Malaysia (Australian Top 50 Branch Campus)',
          'Taylor’s University (QS 5-Stars & AACSB Business)',
          'Sunway University (Lancaster University UK Dual Degree)',
          'Asia Pacific University (APU - Premier Tech Leader)',
        ];
      } else {
        return [
          'American University of Phnom Penh (AUPP - US Dual Degree with Arizona & Fort Hays)',
          'Paragon International University (Engineering & IT)',
          'Royal University of Phnom Penh (RUPP)',
          'National University of Management (NUM - International Programs)',
        ];
      }
    };

    // Why Choose This Section Details
    const getWhyChooseThis = (countryId: string, field: string) => {
      switch (countryId) {
        case 'italy':
          return [
            {
              title: 'World-Renowned European Degree & 100% Scholarships',
              desc: 'Public universities in Italy are funded by regional governments, meaning tuition is exceptionally low (€900–€3,500/year). Eligible international students qualify for regional DSU grants providing complete tuition waivers, free student housing, and cash living allowances of up to €6,000–€8,000/year based on family financial parity (ISEE-Parificato).',
              icon: Award,
            },
            {
              title: `Global Leadership in ${majorNames[field] || 'Your Chosen Major'}`,
              desc: 'Italy houses some of Europe’s most prestigious technical institutes (Politecnico di Milano, Politecnico di Torino) and ancient research universities (Bologna, Messina, Sapienza) offering world-recognized Bologna Process degrees entirely taught in English.',
              icon: GraduationCap,
            },
            {
              title: '27 Schengen Nations Mobility & Post-Study Stay',
              desc: 'With an Italian student residence permit (Permesso di Soggiorno), you enjoy visa-free travel across all 27 European Schengen nations. Graduates receive a 12-month post-study stay-back permit to seek employment in Europe.',
              icon: Globe2,
            },
            {
              title: 'Direct Physical Support via Our Messina Office',
              desc: 'U Education maintains a full-time European support team in Messina, Sicily. Our staff personally meets you at the airport, handles your dormitory check-in, accompanies you to the police station for your resident permit, and supports you throughout your academic stay.',
              icon: ShieldCheck,
            },
          ];
        case 'thailand':
          return [
            {
              title: 'Proximity to Myanmar & Seamless Travel Transit',
              desc: 'Only 1 hour flight time from Yangon, Thailand offers familiar cultural comfort, outstanding healthcare, and effortless travel for families, with zero jetlag or harsh climate barriers.',
              icon: Compass,
            },
            {
              title: 'Prestigious Western Dual Degrees at Half the Cost',
              desc: 'Leading Thai institutions (Assumption ABAC, Stamford, Chulalongkorn) maintain partnerships with top UK, Australian, and US universities, allowing you to earn internationally recognized qualifications at $2,500–$6,500/year tuition.',
              icon: DollarSign,
            },
            {
              title: 'Flexible English Entry Pathways',
              desc: 'Many Thai universities accept Duolingo, Medium of Instruction (MOI) certificates from your previous school, or internal university English proficiency tests, accelerating your enrolment timeline.',
              icon: BookOpen,
            },
            {
              title: 'MTKN Thailand Group In-Country Corporate Hub',
              desc: 'Our Bangkok regional liaison team assists students with apartment leases, student visa extensions, and corporate networking connections across Southeast Asia.',
              icon: ShieldCheck,
            },
          ];
        case 'china':
          return [
            {
              title: 'CSC Government & Belt and Road 100% Full-Ride Scholarships',
              desc: 'China invests heavily in international scholars. Qualified applicants can secure 100% free tuition, complimentary on-campus accommodation, and a monthly cash living stipend of 2,500–3,500 RMB directly deposited into your bank account.',
              icon: Award,
            },
            {
              title: 'Global High-Tech & Engineering Superpower',
              desc: 'Gain firsthand access to world-class robotics, artificial intelligence, biomedical laboratories, and advanced infrastructure that leads global technological progress.',
              icon: TrendingUp,
            },
            {
              title: 'Fully English-Taught Undergraduate & Postgraduate Curricula',
              desc: 'You can study completely in English while acquiring conversational Mandarin, unlocking unmatched career value with multinational corporations worldwide.',
              icon: Globe2,
            },
            {
              title: 'Zero Hidden Tuition Markup Policy',
              desc: 'All institutional applications and scholarship dossiers are submitted directly into official Chinese government and university portals with total transparency.',
              icon: ShieldCheck,
            },
          ];
        case 'malaysia':
          return [
            {
              title: 'Premier British & Australian Branch Campuses',
              desc: 'Graduate with an official degree from Monash University (Australia), University of Nottingham (UK), or Taylor’s University without paying expensive Western living costs. Your degree certificate is identical to onshore UK/Australia graduates.',
              icon: GraduationCap,
            },
            {
              title: 'Fully English-Speaking Society & Financial Hub',
              desc: 'Malaysia is a premier ASEAN business, tech, and halal hub with 100% English medium of instruction, rigorous ACCA/Engineering accreditation, and top student living satisfaction.',
              icon: Briefcase,
            },
            {
              title: 'High-Achiever Merit Rebates & Dean’s Awards',
              desc: 'Institutions offer 20% to 50% merit waivers for strong academic records, plus post-study options to transfer 1–2 years directly to parent campuses in the UK or Australia.',
              icon: Award,
            },
            {
              title: 'Streamlined EMGS Student Visa System',
              desc: 'Malaysia’s Education Malaysia Global Services (EMGS) portal provides rapid electronic visa clearance with high approval rates for international scholars.',
              icon: CheckCircle2,
            },
          ];
        case 'cambodia':
        default:
          return [
            {
              title: 'American University Degree in Phnom Penh',
              desc: 'Earn an authentic US degree at the American University of Phnom Penh (AUPP), dual-accredited with top US state universities (University of Arizona and Fort Hays State University), right inside ASEAN.',
              icon: GraduationCap,
            },
            {
              title: 'Fast-Track Admissions & High Visa Approval Rates',
              desc: 'Cambodia offers rapid, welcoming student visa processing with minimal red tape, making it an ideal choice for swift semester enrolment without lengthy embassy waiting times.',
              icon: Clock,
            },
            {
              title: 'Extremely Affordable Living & High Quality of Life',
              desc: 'With comfortable modern dormitory and private apartment rentals starting at $150–$250/month and total living costs around $300–$500/month, you maximize educational value.',
              icon: DollarSign,
            },
            {
              title: 'Direct UECA Office on Preah Monivong Blvd, Phnom Penh',
              desc: 'Our on-the-ground Phnom Penh center provides immediate arrival logistics, airport reception, sim cards, and direct academic tutoring coordination for Myanmar students.',
              icon: ShieldCheck,
            },
          ];
      }
    };

    // Suggestions & Strategy Details
    const getSuggestions = (countryId: string, engStatus: string) => {
      let testStrategy = 'Your current English profile qualifies for direct university entry.';
      if (engStatus === 'no_test_moi') {
        testStrategy =
          'We recommend requesting a Medium of Instruction (MOI) certificate from your previous school or scheduling an internal university placement exam to bypass IELTS requirements.';
      } else if (engStatus === 'need_prep_coaching') {
        testStrategy =
          'Enroll in UECA’s Digital Learning Hub intensive coaching to lift your score to IELTS 6.0 / Duolingo 105 within 4–6 weeks for maximum scholarship priority.';
      }

      let countryLegalStep = 'Step 2: Official Document Legalization (Notarization & MOFA authentication).';
      let scholarshipPortalStep = 'Step 3: Scholarship Dossier Submission & Financial Evaluation.';

      if (countryId === 'italy') {
        countryLegalStep = 'Step 2: Official Document Legalization (Notarization, MOFA authentication & CIMEA Statement of Comparability).';
        scholarshipPortalStep = 'Step 3: ISEE-Parificato Declaration Filing for Regional DSU 100% Tuition & Accommodation Grant.';
      } else if (countryId === 'china') {
        countryLegalStep = 'Step 2: Chinese Foreigner Physical Examination & Notarized Academic Transcripts.';
        scholarshipPortalStep = 'Step 3: CSC Agency Portal Dossier Submission for Full Government Fellowship.';
      } else if (countryId === 'malaysia') {
        countryLegalStep = 'Step 2: Academic Certificate Attestation & EMGS Visa Approval Letter (VAL) Filing.';
        scholarshipPortalStep = 'Step 3: University Direct High-Achiever Merit Bursary Application.';
      } else if (countryId === 'thailand' || countryId === 'cambodia') {
        countryLegalStep = 'Step 2: Expedited Ministry Notarization & Direct Offer Confirmation.';
        scholarshipPortalStep = 'Step 3: ASEAN Partner Tuition Discount & In-Country Liaison Registration.';
      }

      return {
        testStrategy,
        actionSteps: [
          'Step 1: Complimentary Academic Profiling & Transcript Verification at UECA Yangon or Mandalay centers.',
          countryLegalStep,
          scholarshipPortalStep,
          'Step 4: Formal University Offer Acceptance & Embassy Visa Filing.',
          'Step 5: Pre-Departure Logistics, Flight Booking & Dormitory Bed Reservation with our in-country team.',
        ],
        checklist: [
          'High School / Bachelor Transcripts & Graduation Certificates (Original + English Translation)',
          'Valid International Passport (Minimum 18 months validity)',
          'Statement of Purpose (SOP) / Motivation Letter (Reviewed by UECA senior editor)',
          'Curriculum Vitae (CV / Resume in Europass or Academic format)',
          'Two Letters of Academic Recommendation',
          'Family Financial Statement (For DSU regional scholarship or visa solvency proof)',
        ],
      };
    };

    return {
      primary,
      secondary,
      matchPercentage,
      scholarshipChance,
      intakeRecommendation,
      intakeDeadline,
      targetUniversities: getUniversitiesForMatch(primary.id, fieldOfInterest),
      runnerUpUniversities: getUniversitiesForMatch(secondary.id, fieldOfInterest),
      whyChooseThis: getWhyChooseThis(primary.id, fieldOfInterest),
      suggestions: getSuggestions(primary.id, englishStatus),
      selectedMajorName: majorNames[fieldOfInterest] || 'General Studies',
    };
  };

  const rec = useMemo(
    () => getRecommendation(),
    [
      educationLevel,
      targetDegree,
      financialPriority,
      fieldOfInterest,
      englishStatus,
      preferredRegion,
      destinations,
    ]
  );

  // Copy Pathway Dossier to Clipboard
  const handleCopyReport = () => {
    const reportText = `=========================================
U EDUCATION CONSULTANT AGENCY (UECA)
ACADEMIC PATHWAY ASSESSMENT REPORT
=========================================
Matched Destination: ${rec.primary.country} (${rec.primary.code})
Profile Compatibility: ${rec.matchPercentage}% Match
Target Major: ${rec.selectedMajorName}
Scholarship Probability: ${rec.scholarshipChance}
Recommended Intake: ${rec.intakeRecommendation}
Intake Cutoff: ${rec.intakeDeadline}

RECOMMENDED UNIVERSITIES:
${rec.targetUniversities.map((u, i) => ` ${i + 1}. ${u}`).join('\n')}

ESTIMATED FINANCIALS:
- Tuition Range: ${rec.primary.avgTuition}
- Estimated Living Cost: ${rec.primary.livingCost}

WHY YOU SHOULD CHOOSE ${rec.primary.country.toUpperCase()}:
${rec.whyChooseThis.map((w) => `• ${w.title}: ${w.desc}`).join('\n\n')}

RECOMMENDED ACTION STEPS:
${rec.suggestions.actionSteps.join('\n')}

Next Steps: Contact U Education Counselor at eduinfo.ueca@gmail.com or +959977859474
Counseling Centers: Yangon (Mayangone) • Mandalay (Chan Mya Tharsi) • Bangkok • Phnom Penh • Messina (Italy)
=========================================`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(reportText);
      showToast('Academic Pathway Report copied to clipboard!');
    }
  };

  return (
    <section id="assessment-tool" className="py-16 sm:py-24 bg-[#FAF8F5] border-t border-stone-200 relative overflow-hidden">
      {/* Decorative Warm Accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#E5A823]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#5A1226]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3.5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E5A823]/50 shadow-xs">
            <Compass className="w-4 h-4 text-[#E5A823]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#5A1226]">
              Intelligent Academic Profiler · 2026/2027 Intakes
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-[#5A1226] tracking-tight leading-tight">
            Find Your Ideal <span className="text-[#E5A823]">Study Pathway</span>
          </h2>
          <div className="w-20 h-1.5 bg-[#E5A823] rounded-full mx-auto" />

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Answer a few quick questions to receive an algorithmic destination evaluation, custom scholarship forecast, curated university shortlist, and step-by-step strategy for <strong>Italy, Thailand, China, Malaysia, and Cambodia</strong>.
          </p>
        </div>

        {/* Profiler Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-stone-200 shadow-xl space-y-10">
          
          {/* Form Criteria Inputs */}
          <div className="space-y-8">
            
            {/* Row 1: Education Level & Target Degree */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* 1. Education Level */}
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-wider text-[#5A1226] flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#5A1226] text-white flex items-center justify-center text-[10px]">
                    1
                  </span>
                  Current Educational Background
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5">
                  {[
                    { id: 'grade12', label: 'Grade 12 / Matriculation' },
                    { id: 'igcse', label: 'IGCSE / GED / A-Level' },
                    { id: 'bachelor', label: "Bachelor's Degree Graduate" },
                    { id: 'master', label: "Master's / Postgrad" },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setEducationLevel(item.id)}
                      className={`p-3 rounded-xl text-xs font-bold text-left transition-all border cursor-pointer ${
                        educationLevel === item.id
                          ? 'bg-[#5A1226] text-white border-[#5A1226] shadow-xs'
                          : 'bg-[#FAF8F5] text-slate-700 border-stone-200 hover:border-[#E5A823]'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Target Degree Level */}
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-wider text-[#5A1226] flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#5A1226] text-white flex items-center justify-center text-[10px]">
                    2
                  </span>
                  Target Degree Level
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-2.5">
                  {[
                    { id: 'bachelor', label: 'Bachelor (Undergrad)' },
                    { id: 'master', label: 'Master (Postgrad / MBA)' },
                    { id: 'pathway', label: 'Foundation / Pathway' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setTargetDegree(item.id)}
                      className={`p-3 rounded-xl text-xs font-bold text-left transition-all border cursor-pointer ${
                        targetDegree === item.id
                          ? 'bg-[#5A1226] text-white border-[#5A1226] shadow-xs'
                          : 'bg-[#FAF8F5] text-slate-700 border-stone-200 hover:border-[#E5A823]'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Row 2: Financial Priority & Target Major */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* 3. Financial Priority */}
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-wider text-[#5A1226] flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#5A1226] text-white flex items-center justify-center text-[10px]">
                    3
                  </span>
                  Financial & Scholarship Priority
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5">
                  {[
                    {
                      id: 'full_scholarship',
                      label: '100% Full Scholarship & Grants',
                      desc: 'Tuition waiver + housing + stipend (Italy DSU / China CSC)',
                    },
                    {
                      id: 'affordable',
                      label: 'Affordable / Sustainable Tuition',
                      desc: '$2,000 – $5,500/year (Thailand & Cambodia)',
                    },
                    {
                      id: 'dual_degree',
                      label: 'Western Dual Degrees in ASEAN',
                      desc: 'British/Australian branch campuses in Malaysia & Cambodia',
                    },
                    {
                      id: 'top_ranking',
                      label: 'High Global Research Ranking',
                      desc: 'Top 100/200 world ranked universities',
                    },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setFinancialPriority(item.id)}
                      className={`p-3.5 rounded-xl text-left transition-all border cursor-pointer ${
                        financialPriority === item.id
                          ? 'bg-[#5A1226] text-white border-[#5A1226] shadow-xs'
                          : 'bg-[#FAF8F5] text-slate-700 border-stone-200 hover:border-[#E5A823]'
                      }`}
                    >
                      <p className="text-xs font-bold leading-snug">{item.label}</p>
                      <p
                        className={`text-[11px] mt-1 line-clamp-2 ${
                          financialPriority === item.id ? 'text-slate-200' : 'text-slate-500'
                        }`}
                      >
                        {item.desc}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* 4. Target Major */}
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-wider text-[#5A1226] flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#5A1226] text-white flex items-center justify-center text-[10px]">
                    4
                  </span>
                  Intended Major / Field of Study
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5">
                  {[
                    { id: 'cs_ai', label: 'Computer Science, IT & AI' },
                    { id: 'business_finance', label: 'Business, Finance & Trade' },
                    { id: 'medicine_health', label: 'Medicine & Health (MBBS)' },
                    { id: 'architecture_engineering', label: 'Engineering & Architecture' },
                    { id: 'international_relations', label: 'International Relations & Law' },
                    { id: 'hospitality_tourism', label: 'Hospitality & Tourism' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setFieldOfInterest(item.id)}
                      className={`p-3 rounded-xl text-xs font-bold text-left transition-all border cursor-pointer ${
                        fieldOfInterest === item.id
                          ? 'bg-[#5A1226] text-white border-[#5A1226] shadow-xs'
                          : 'bg-[#FAF8F5] text-slate-700 border-stone-200 hover:border-[#E5A823]'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Row 3: English Proficiency & Preferred Region */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* 5. English Status */}
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-wider text-[#5A1226] flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#5A1226] text-white flex items-center justify-center text-[10px]">
                    5
                  </span>
                  English Proficiency Status
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5">
                  {[
                    { id: 'ielts_ready', label: 'IELTS 6.0+ / Duolingo 105+' },
                    { id: 'ielts_moderate', label: 'IELTS 5.0–5.5 / Duolingo 85–100' },
                    { id: 'no_test_moi', label: 'No Test Yet (Prefer MOI / Internal Test)' },
                    { id: 'need_prep_coaching', label: 'Need Test Coaching at UECA Hub' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setEnglishStatus(item.id)}
                      className={`p-3 rounded-xl text-xs font-bold text-left transition-all border cursor-pointer ${
                        englishStatus === item.id
                          ? 'bg-[#5A1226] text-white border-[#5A1226] shadow-xs'
                          : 'bg-[#FAF8F5] text-slate-700 border-stone-200 hover:border-[#E5A823]'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 6. Preferred Region */}
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-wider text-[#5A1226] flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#5A1226] text-white flex items-center justify-center text-[10px]">
                    6
                  </span>
                  Geographical Preference
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-2.5">
                  {[
                    { id: 'any', label: '🌟 Any Match' },
                    { id: 'italy', label: '🇮🇹 Italy' },
                    { id: 'thailand', label: '🇹🇭 Thailand' },
                    { id: 'china', label: '🇨🇳 China' },
                    { id: 'malaysia', label: '🇲🇾 Malaysia' },
                    { id: 'cambodia', label: '🇰🇭 Cambodia' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setPreferredRegion(item.id)}
                      className={`p-2.5 sm:p-3 rounded-xl text-xs font-bold text-center transition-all border cursor-pointer ${
                        preferredRegion === item.id
                          ? 'bg-[#5A1226] text-white border-[#5A1226] shadow-xs'
                          : 'bg-[#FAF8F5] text-slate-700 border-stone-200 hover:border-[#E5A823]'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Recalculate & Reset Control Toolbar */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => {
                  setShowResult(true);
                  showToast('Updated study pathway recommendations generated!');
                  document.querySelector('#assessment-results-card')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 rounded-full bg-[#5A1226] hover:bg-[#721832] text-white font-black text-xs sm:text-sm tracking-wide shadow-md transition-all hover:scale-105 active:scale-95 border border-[#E5A823]/40 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#E5A823]" />
                <span>Recalculate Best Study Pathway</span>
                <ArrowRight className="w-4 h-4 text-[#E5A823]" />
              </button>

              <button
                type="button"
                onClick={() => {
                  setEducationLevel('grade12');
                  setTargetDegree('bachelor');
                  setFinancialPriority('full_scholarship');
                  setFieldOfInterest('cs_ai');
                  setEnglishStatus('ielts_moderate');
                  setPreferredRegion('any');
                  setShowResult(true);
                  showToast('Assessment criteria reset to defaults');
                }}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full bg-stone-100 hover:bg-stone-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer border border-stone-200"
              >
                <RotateCcw className="w-3.5 h-3.5 text-[#5A1226]" />
                <span>Reset Criteria</span>
              </button>
            </div>

          </div>

          {/* =========================================================================
              RESULTS DOSSIER: COMPLETE, MODERN & HIGHLY ACTIONABLE
             ========================================================================= */}
          {showResult && (
            <div id="assessment-results-card" className="pt-8 border-t-2 border-[#E5A823] space-y-8 animate-in fade-in duration-300">
              
              {/* Top Banner: Primary Recommended Destination */}
              <div className="relative rounded-3xl p-6 sm:p-10 bg-gradient-to-br from-[#5A1226] via-[#6E162F] to-[#450C1D] text-white shadow-2xl overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#E5A823]/15 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10 space-y-6">
                  
                  {/* Top Match Meta Badges */}
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E5A823] text-[#5A1226] text-xs font-black uppercase tracking-wider shadow-sm">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{rec.matchPercentage}% Academic Compatibility Match</span>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-amber-200 font-semibold">
                      <Clock className="w-3.5 h-3.5 text-[#E5A823]" />
                      <span>{rec.intakeRecommendation}</span>
                    </div>
                  </div>

                  {/* Main Match Identity */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-center gap-5">
                      <span className="text-5xl sm:text-6xl filter drop-shadow-md">{rec.primary.flagEmoji}</span>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-black text-amber-300 uppercase tracking-widest">
                            {rec.primary.code} • Recommended Country
                          </span>
                        </div>
                        <h3 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                          Study in {rec.primary.country}
                        </h3>
                        <p className="text-slate-200 text-xs sm:text-sm mt-1 font-medium max-w-xl">
                          {rec.primary.tagline}
                        </p>
                      </div>
                    </div>

                    {/* Quick Financial Snapshot Pill */}
                    <div className="bg-black/30 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-xs space-y-1.5 flex-shrink-0 min-w-[220px]">
                      <div className="flex justify-between gap-3">
                        <span className="text-slate-300">Avg. Tuition:</span>
                        <span className="font-bold text-white">{rec.primary.avgTuition.split('(')[0]}</span>
                      </div>
                      <div className="flex justify-between gap-3">
                        <span className="text-slate-300">Living Cost:</span>
                        <span className="font-bold text-amber-300">{rec.primary.livingCost}</span>
                      </div>
                      <div className="flex justify-between gap-3 pt-1 border-t border-white/10">
                        <span className="text-slate-300">Runner-Up:</span>
                        <span className="font-bold text-white">
                          {rec.secondary.flagEmoji} {rec.secondary.country}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Scholarship Probability Callout */}
                  <div className="p-4 rounded-2xl bg-white/10 border border-white/15 flex items-center gap-3">
                    <Award className="w-6 h-6 text-[#E5A823] flex-shrink-0" />
                    <div>
                      <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wider block">
                        Scholarship Potential for Your Profile
                      </span>
                      <p className="text-xs sm:text-sm font-semibold text-white">
                        {rec.scholarshipChance}
                      </p>
                    </div>
                  </div>

                  {/* Quick Action Toolbar */}
                  <div className="pt-2 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-2.5 sm:gap-3">
                    <a
                      href={`mailto:${agencyInfo.email}?subject=Official%20Pathway%20Assessment%20Inquiry%20-%20${encodeURIComponent(
                        rec.primary.country
                      )}%20(${encodeURIComponent(rec.selectedMajorName)})&body=Hello%20U%20Education%20Admissions%20Team,%0D%0A%0D%0AI%20completed%20the%20academic%20pathway%20profiler%20with%20the%20following%20details:%0D%0A-%20Target%20Destination:%20${encodeURIComponent(
                        rec.primary.country
                      )}%0D%0A-%20Desired%20Major:%20${encodeURIComponent(
                        rec.selectedMajorName
                      )}%0D%0A-%20Current%20Education:%20${encodeURIComponent(
                        educationLevel
                      )}%0D%0A-%20Target%20Degree:%20${encodeURIComponent(
                        targetDegree
                      )}%0D%0A-%20English%20Status:%20${encodeURIComponent(
                        englishStatus
                      )}%0D%0A-%20Recommended%20Intake:%20${encodeURIComponent(
                        rec.intakeRecommendation
                      )}%0D%0A%0D%0APlease%20let%20me%20know%20the%20next%20steps%20for%20my%20application%20and%20scholarship%20evaluation.%0D%0A%0D%0ABest%20regards.`}
                      className="px-5 sm:px-6 py-3 rounded-full bg-[#E5A823] hover:bg-[#d49515] text-[#5A1226] font-black text-xs sm:text-sm shadow-md transition-all hover:scale-105 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Mail className="w-4 h-4" />
                      <span>Send Official Email with This Pathway</span>
                    </a>

                    <button
                      onClick={handleCopyReport}
                      className="px-4 sm:px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm border border-white/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Copy className="w-4 h-4 text-[#E5A823]" />
                      <span>Copy Full Pathway Report</span>
                    </button>

                    <button
                      onClick={() => setActivePage('contact')}
                      className="px-4 sm:px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm border border-white/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Book Free 1-on-1 Counseling</span>
                      <ArrowRight className="w-4 h-4 text-[#E5A823]" />
                    </button>
                  </div>

                </div>
              </div>

              {/* Sub-Navigation Tabs for Detailed Pathway Analysis with Touch Scroll */}
              <div className="border-b border-stone-200 bg-stone-50 rounded-2xl p-1.5 flex overflow-x-auto no-scrollbar gap-1.5 scroll-smooth">
                {[
                  {
                    id: 'why',
                    label: `Why You Should Choose ${rec.primary.country}`,
                    icon: CheckCircle2,
                  },
                  {
                    id: 'suggestions',
                    label: 'Personalized Suggestions & Strategy',
                    icon: Sparkles,
                  },
                  {
                    id: 'universities',
                    label: `Shortlisted Universities (${rec.targetUniversities.length})`,
                    icon: Building2,
                  },
                  {
                    id: 'comparison',
                    label: `Compare: ${rec.primary.country} vs ${rec.secondary.country}`,
                    icon: TrendingUp,
                  },
                ].map((tab) => {
                  const isActive = activeResultTab === tab.id;
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveResultTab(tab.id as typeof activeResultTab)}
                      className={`px-3.5 sm:px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap flex-shrink-0 ${
                        isActive
                          ? 'bg-[#5A1226] text-white shadow-xs'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-stone-200/60'
                      }`}
                    >
                      <Icon className="w-4 h-4 text-[#E5A823]" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Tab 1: WHY YOU SHOULD CHOOSE THIS SECTION */}
              {activeResultTab === 'why' && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h4 className="text-xl font-black text-[#5A1226]">
                        Why You Should Choose {rec.primary.country} for {rec.selectedMajorName}
                      </h4>
                      <p className="text-xs text-slate-500">
                        Evaluated based on your educational background, financial objectives, and language status.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {rec.whyChooseThis.map((item, idx) => {
                      const Icon = item.icon;
                      return (
                        <div
                          key={idx}
                          className="p-5 rounded-2xl bg-[#FAF8F5] border border-stone-200 hover:border-[#E5A823] transition-all space-y-2.5 shadow-2xs"
                        >
                          <div className="flex items-center gap-2.5 text-[#5A1226] font-bold text-sm">
                            <div className="p-2 rounded-xl bg-white text-[#5A1226] border border-stone-200 shadow-2xs">
                              <Icon className="w-4 h-4 text-[#E5A823]" />
                            </div>
                            <span>{item.title}</span>
                          </div>
                          <p className="text-xs text-slate-700 leading-relaxed font-medium">
                            {item.desc}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Tab 2: PERSONALIZED SUGGESTIONS & STRATEGY SECTION */}
              {activeResultTab === 'suggestions' && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <div className="p-6 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-3">
                    <div className="flex items-center gap-2 text-[#5A1226] font-black text-base">
                      <Sparkles className="w-5 h-5 text-[#E5A823]" />
                      <span>Executive Counselor Recommendations & Timeline</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                      <div className="p-4 rounded-xl bg-white border border-amber-200/80 space-y-1">
                        <span className="text-[11px] font-bold text-[#5A1226] uppercase block">
                          Optimal Target Intake
                        </span>
                        <p className="text-sm font-bold text-slate-900">{rec.intakeRecommendation}</p>
                        <p className="text-xs text-slate-600">{rec.intakeDeadline}</p>
                      </div>

                      <div className="p-4 rounded-xl bg-white border border-amber-200/80 space-y-1">
                        <span className="text-[11px] font-bold text-[#5A1226] uppercase block">
                          Language Preparation Strategy
                        </span>
                        <p className="text-xs text-slate-700 leading-relaxed font-medium">
                          {rec.suggestions.testStrategy}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Action Steps Roadmap */}
                  <div className="space-y-3">
                    <h5 className="text-sm font-black text-[#5A1226] uppercase tracking-wider flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-[#E5A823]" />
                      <span>Step-by-Step Strategic Roadmap</span>
                    </h5>
                    <div className="space-y-2">
                      {rec.suggestions.actionSteps.map((step, sIdx) => (
                        <div
                          key={sIdx}
                          className="p-3.5 rounded-xl bg-white border border-stone-200 text-xs font-semibold text-slate-800 flex items-start gap-3 shadow-2xs"
                        >
                          <span className="w-5 h-5 rounded-full bg-[#5A1226] text-white flex items-center justify-center text-[10px] flex-shrink-0 mt-0.5">
                            {sIdx + 1}
                          </span>
                          <span className="leading-relaxed">{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Required Documents Checklist */}
                  <div className="space-y-3">
                    <h5 className="text-sm font-black text-[#5A1226] uppercase tracking-wider flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-[#E5A823]" />
                      <span>Application Dossier Checklist</span>
                    </h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {rec.suggestions.checklist.map((doc, dIdx) => (
                        <div
                          key={dIdx}
                          className="p-3 rounded-xl bg-[#FAF8F5] border border-stone-200 text-xs font-medium text-slate-700 flex items-center gap-2"
                        >
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                          <span>{doc}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 3: SHORTLISTED UNIVERSITIES */}
              {activeResultTab === 'universities' && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <div>
                    <h4 className="text-xl font-black text-[#5A1226]">
                      Curated Institutions for {rec.selectedMajorName} in {rec.primary.country}
                    </h4>
                    <p className="text-xs text-slate-500">
                      Institutions partner-accredited by official education ministries with English-taught programs.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {rec.targetUniversities.map((uni, uIdx) => (
                      <div
                        key={uIdx}
                        className="p-5 rounded-2xl bg-white border-2 border-stone-200 hover:border-[#E5A823] transition-all flex items-start gap-3.5 shadow-2xs"
                      >
                        <div className="p-2.5 rounded-xl bg-[#5A1226]/5 text-[#5A1226] flex-shrink-0">
                          <Building2 className="w-5 h-5 text-[#E5A823]" />
                        </div>
                        <div className="space-y-1">
                          <h5 className="font-bold text-slate-900 text-sm leading-snug">{uni}</h5>
                          <p className="text-xs text-slate-500">
                            English Medium • Full UECA Pre-enrolment Filing Support
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <p className="text-xs text-slate-600 font-medium">
                      Want to check entrance examinations (TOLC, IMAT, or University Internal Placement) for these institutions?
                    </p>
                    <button
                      onClick={() => setActivePage('contact')}
                      className="px-5 py-2 rounded-full bg-[#5A1226] text-white text-xs font-bold hover:bg-[#721832] transition-colors whitespace-nowrap cursor-pointer"
                    >
                      Request University Syllabus
                    </button>
                  </div>
                </div>
              )}

              {/* Tab 4: SIDE-BY-SIDE COMPARISON */}
              {activeResultTab === 'comparison' && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <div>
                    <h4 className="text-xl font-black text-[#5A1226]">
                      Side-by-Side Analysis: {rec.primary.country} vs {rec.secondary.country}
                    </h4>
                    <p className="text-xs text-slate-500">
                      Why our algorithm prioritized {rec.primary.country} as your optimal first choice.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Primary Card */}
                    <div className="p-6 rounded-2xl bg-white border-2 border-emerald-500 shadow-md space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <span className="text-3xl">{rec.primary.flagEmoji}</span>
                          <div>
                            <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase">
                              #1 Top Recommended
                            </span>
                            <h5 className="text-lg font-black text-slate-900">{rec.primary.country}</h5>
                          </div>
                        </div>
                        <span className="text-base font-black text-emerald-600">{rec.matchPercentage}% Match</span>
                      </div>

                      <div className="space-y-2 text-xs divide-y divide-stone-100">
                        <div className="pt-2 flex justify-between">
                          <span className="text-slate-500">Annual Tuition:</span>
                          <span className="font-bold text-slate-900">{rec.primary.avgTuition}</span>
                        </div>
                        <div className="pt-2 flex justify-between">
                          <span className="text-slate-500">Monthly Living:</span>
                          <span className="font-bold text-slate-900">{rec.primary.livingCost}</span>
                        </div>
                        <div className="pt-2 flex justify-between">
                          <span className="text-slate-500">Scholarship Model:</span>
                          <span className="font-bold text-[#5A1226]">{rec.primary.highlightBadge}</span>
                        </div>
                        <div className="pt-2">
                          <span className="text-slate-500 block mb-1">Top Academic Strengths:</span>
                          <p className="text-slate-700 font-medium leading-relaxed">{rec.primary.description}</p>
                        </div>
                      </div>
                    </div>

                    {/* Secondary Card */}
                    <div className="p-6 rounded-2xl bg-white border-2 border-stone-200 shadow-sm space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <span className="text-3xl">{rec.secondary.flagEmoji}</span>
                          <div>
                            <span className="px-2 py-0.5 rounded-md bg-stone-100 text-slate-700 text-[10px] font-black uppercase">
                              #2 Strong Alternative
                            </span>
                            <h5 className="text-lg font-black text-slate-900">{rec.secondary.country}</h5>
                          </div>
                        </div>
                        <span className="text-base font-black text-slate-600">Alternative Fit</span>
                      </div>

                      <div className="space-y-2 text-xs divide-y divide-stone-100">
                        <div className="pt-2 flex justify-between">
                          <span className="text-slate-500">Annual Tuition:</span>
                          <span className="font-bold text-slate-900">{rec.secondary.avgTuition}</span>
                        </div>
                        <div className="pt-2 flex justify-between">
                          <span className="text-slate-500">Monthly Living:</span>
                          <span className="font-bold text-slate-900">{rec.secondary.livingCost}</span>
                        </div>
                        <div className="pt-2 flex justify-between">
                          <span className="text-slate-500">Scholarship Model:</span>
                          <span className="font-bold text-slate-700">{rec.secondary.highlightBadge}</span>
                        </div>
                        <div className="pt-2">
                          <span className="text-slate-500 block mb-1">Top Academic Strengths:</span>
                          <p className="text-slate-700 font-medium leading-relaxed">{rec.secondary.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>
          )}

        </div>

      </div>
    </section>
  );
};
