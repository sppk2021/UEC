import React, { useState, useMemo, useEffect } from 'react';
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
  Calculator,
  Wallet,
  Coins,
  PiggyBank,
  Receipt,
  Plane,
  Layers,
  MapPin,
  Check,
} from 'lucide-react';
import { useWebsite } from '../context/WebsiteContext';
import { StudyDestination } from '../types';
import { SideBySideBudgetComparator } from './SideBySideBudgetComparator';

export interface InteractiveAssessmentToolProps {
  initialTab?: 'why' | 'suggestions' | 'budget' | 'universities' | 'comparison';
}

export const InteractiveAssessmentTool: React.FC<InteractiveAssessmentToolProps> = ({ initialTab }) => {
  const { data, showToast, setActivePage, pathwayTab, setPathwayTab } = useWebsite();
  const destinations = data.destinations;
  const agencyInfo = data.agencyInfo;

  // Form Criteria State
  const [educationLevel, setEducationLevel] = useState<string>('grade12');
  const [targetDegree, setTargetDegree] = useState<string>('bachelor');
  const [financialPriority, setFinancialPriority] = useState<string>('full_scholarship');
  const [annualBudgetTier, setAnnualBudgetTier] = useState<string>('budget_low'); // budget_low (<$2k), budget_mid ($2k-$5k), budget_standard ($5k-$10k), budget_premium ($10k+)
  const [fieldOfInterest, setFieldOfInterest] = useState<string>('cs_ai');
  const [englishStatus, setEnglishStatus] = useState<string>('ielts_moderate');
  const [preferredRegion, setPreferredRegion] = useState<string>('any');

  const [showResult, setShowResult] = useState<boolean>(true);
  const [activeResultTab, setActiveResultTab] = useState<'why' | 'suggestions' | 'budget' | 'universities' | 'comparison'>(
    initialTab || pathwayTab || 'why'
  );

  useEffect(() => {
    if (initialTab && initialTab !== activeResultTab) {
      setActiveResultTab(initialTab);
    } else if (pathwayTab && pathwayTab !== activeResultTab) {
      setActiveResultTab(pathwayTab);
    }
  }, [initialTab, pathwayTab]);

  const handleTabChange = (tab: 'why' | 'suggestions' | 'budget' | 'universities' | 'comparison') => {
    setActiveResultTab(tab);
    setPathwayTab(tab);
  };

  // ==========================================
  // EXPANDED INTERACTIVE BUDGET CALCULATOR STATE
  // ==========================================
  const [calcCountry, setCalcCountry] = useState<string>('italy');
  const [calcCourseLevel, setCalcCourseLevel] = useState<'foundation' | 'bachelor' | 'master' | 'mbbs'>('bachelor');
  const [calcDurationYears, setCalcDurationYears] = useState<number>(3);
  const [calcDiscipline, setCalcDiscipline] = useState<'general' | 'business' | 'tech_cs' | 'engineering' | 'medical'>('tech_cs');
  const [calcCityTier, setCalcCityTier] = useState<'tier1' | 'tier2'>('tier2'); // Tier 1: Capital/Metropolis, Tier 2: University Town/Regional
  const [calcHousingType, setCalcHousingType] = useState<'dorm' | 'shared_flat' | 'private_studio'>('dorm');
  const [calcLifestyleTier, setCalcLifestyleTier] = useState<'saver' | 'standard' | 'comfort'>('standard');
  const [calcScholarshipPct, setCalcScholarshipPct] = useState<number>(100); // 0%, 25%, 50%, 75%, 100%
  const [calcPartTimeWeeklyHours, setCalcPartTimeWeeklyHours] = useState<number>(15); // 0 to 20
  const [selectedCurrency, setSelectedCurrency] = useState<'USD' | 'EUR' | 'MMK' | 'LOCAL'>('USD');
  const [timeHorizon, setTimeHorizon] = useState<'annual' | 'total'>('total'); // 1-Year or Full Degree Duration

  // Currency Conversion Rates (Approximate 2026/2027 values for planning)
  const currencyRates: Record<string, { rateFromUSD: number; symbol: string; label: string }> = {
    USD: { rateFromUSD: 1.0, symbol: '$', label: 'USD ($)' },
    EUR: { rateFromUSD: 0.92, symbol: '€', label: 'EUR (€)' },
    MMK: { rateFromUSD: 4500, symbol: 'Ks', label: 'MMK (Lakhs)' },
    LOCAL: { rateFromUSD: 1.0, symbol: '', label: 'Local Currency' },
  };

  // Comprehensive Country Data & Fee Matrix by Course Level & Living Tier
  const countryFinancialData: Record<
    string,
    {
      countryName: string;
      flag: string;
      code: string;
      currencyName: string;
      localRateFromUSD: number;
      localSymbol: string;
      hourlyWageUSD: number;
      maxLegalHoursPerWeek: number;
      legalWorkNotes: string;
      preDeparture: {
        visaFee: number;
        translationLegalization: number;
        airfareEstimate: number;
        initialDeposit: number;
      };
      courseLevelDefaults: Record<
        'foundation' | 'bachelor' | 'master' | 'mbbs',
        {
          defaultDurationYears: number;
          baseAnnualTuitionUSD: number;
          degreeTitle: string;
          scholarshipPrograms: string;
        }
      >;
      disciplineMultiplier: Record<'general' | 'business' | 'tech_cs' | 'engineering' | 'medical', number>;
      monthlyLivingBaseUSD: {
        tier1: { dorm: number; shared_flat: number; private_studio: number; food: number; utilities: number; transit: number; healthAnnual: number };
        tier2: { dorm: number; shared_flat: number; private_studio: number; food: number; utilities: number; transit: number; healthAnnual: number };
      };
      cities: { tier1: string; tier2: string };
    }
  > = {
    italy: {
      countryName: 'Italy',
      flag: '🇮🇹',
      code: 'IT',
      currencyName: 'EUR (€)',
      localRateFromUSD: 0.92,
      localSymbol: '€',
      hourlyWageUSD: 10.0, // ~€9/hr
      maxLegalHoursPerWeek: 20,
      legalWorkNotes: '20 hours/week legally allowed under Italian Student Visa during semester; 40 hours during holidays.',
      preDeparture: {
        visaFee: 60,
        translationLegalization: 280, // CIMEA / DOV & Apostille
        airfareEstimate: 580,
        initialDeposit: 400,
      },
      courseLevelDefaults: {
        foundation: {
          defaultDurationYears: 1,
          baseAnnualTuitionUSD: 3500,
          degreeTitle: 'International Foundation Year (Italian & English)',
          scholarshipPrograms: 'University early fee-discounts',
        },
        bachelor: {
          defaultDurationYears: 3,
          baseAnnualTuitionUSD: 1800, // Public university average
          degreeTitle: 'Laurea Triennale (3-Year European Bachelor)',
          scholarshipPrograms: '100% DSU Regional Grant + €6,000–€8,000 living stipend',
        },
        master: {
          defaultDurationYears: 2,
          baseAnnualTuitionUSD: 2200,
          degreeTitle: 'Laurea Magistrale (2-Year European Master)',
          scholarshipPrograms: '100% DSU Regional Scholarship + Invest Your Talent in Italy',
        },
        mbbs: {
          defaultDurationYears: 6,
          baseAnnualTuitionUSD: 2400,
          degreeTitle: 'Single-Cycle Medicine & Surgery (6-Year MD in English / IMAT)',
          scholarshipPrograms: 'DSU Full Tuition Waiver + Regional Housing',
        },
      },
      disciplineMultiplier: {
        general: 0.9,
        business: 1.05,
        tech_cs: 1.0,
        engineering: 1.15,
        medical: 1.25,
      },
      monthlyLivingBaseUSD: {
        tier1: { dorm: 380, shared_flat: 550, private_studio: 850, food: 280, utilities: 80, transit: 35, healthAnnual: 200 }, // Rome / Milan
        tier2: { dorm: 260, shared_flat: 360, private_studio: 550, food: 220, utilities: 55, transit: 25, healthAnnual: 200 }, // Messina / Bologna / Padua
      },
      cities: { tier1: 'Rome / Milan / Florence (Tier 1)', tier2: 'Messina / Padua / Turin / Pisa (Tier 2 Student Towns)' },
    },
    thailand: {
      countryName: 'Thailand',
      flag: '🇹🇭',
      code: 'TH',
      currencyName: 'THB (฿)',
      localRateFromUSD: 36.5,
      localSymbol: '฿',
      hourlyWageUSD: 4.5,
      maxLegalHoursPerWeek: 15,
      legalWorkNotes: 'On-campus student assistantships, digital freelance, and university corporate internships.',
      preDeparture: {
        visaFee: 80,
        translationLegalization: 120,
        airfareEstimate: 140,
        initialDeposit: 250,
      },
      courseLevelDefaults: {
        foundation: {
          defaultDurationYears: 1,
          baseAnnualTuitionUSD: 2600,
          degreeTitle: 'English Academic & Study Skills Pathway',
          scholarshipPrograms: 'University early bird discount up to 25%',
        },
        bachelor: {
          defaultDurationYears: 4,
          baseAnnualTuitionUSD: 3800, // ABAC, Bangkok U, Stamford
          degreeTitle: '4-Year International Bachelor Degree (English Medium)',
          scholarshipPrograms: 'Merit-based tuition reduction (25%–50%)',
        },
        master: {
          defaultDurationYears: 2,
          baseAnnualTuitionUSD: 4600,
          degreeTitle: 'International Master / MBA Program',
          scholarshipPrograms: 'Graduate research fellowship and ASEAN bursaries',
        },
        mbbs: {
          defaultDurationYears: 5,
          baseAnnualTuitionUSD: 7200,
          degreeTitle: 'Biomedical / Healthcare International Program',
          scholarshipPrograms: 'Institutional scholarship awards',
        },
      },
      disciplineMultiplier: {
        general: 0.9,
        business: 1.0,
        tech_cs: 1.1,
        engineering: 1.15,
        medical: 1.4,
      },
      monthlyLivingBaseUSD: {
        tier1: { dorm: 220, shared_flat: 320, private_studio: 450, food: 200, utilities: 50, transit: 35, healthAnnual: 220 }, // Bangkok
        tier2: { dorm: 150, shared_flat: 220, private_studio: 320, food: 150, utilities: 40, transit: 20, healthAnnual: 220 }, // Chiang Mai / Chonburi / Hat Yai
      },
      cities: { tier1: 'Bangkok Metropolitan (Tier 1)', tier2: 'Chiang Mai / Chonburi / Khon Kaen (Tier 2)' },
    },
    china: {
      countryName: 'China',
      flag: '🇨🇳',
      code: 'CN',
      currencyName: 'CNY (¥)',
      localRateFromUSD: 7.25,
      localSymbol: '¥',
      hourlyWageUSD: 6.0,
      maxLegalHoursPerWeek: 15,
      legalWorkNotes: 'Campus work-study programs, language tutoring, and approved multinational internships.',
      preDeparture: {
        visaFee: 100,
        translationLegalization: 150,
        airfareEstimate: 420,
        initialDeposit: 150,
      },
      courseLevelDefaults: {
        foundation: {
          defaultDurationYears: 1,
          baseAnnualTuitionUSD: 2200,
          degreeTitle: '1-Year University Foundation & HSK Preparatory',
          scholarshipPrograms: 'Belt & Road Language Grant',
        },
        bachelor: {
          defaultDurationYears: 4,
          baseAnnualTuitionUSD: 3200, // Top Tier State Universities
          degreeTitle: '4-Year Bachelor of Science / Engineering / Arts',
          scholarshipPrograms: 'CSC Type A/B Full-Ride (Tuition Waiver + Free Dorm + ¥2,500/mo)',
        },
        master: {
          defaultDurationYears: 3,
          baseAnnualTuitionUSD: 3900,
          degreeTitle: 'Master Degree (Research / English Taught)',
          scholarshipPrograms: 'CSC Full-Ride (Tuition Waiver + Free Dorm + ¥3,000/mo)',
        },
        mbbs: {
          defaultDurationYears: 6,
          baseAnnualTuitionUSD: 5200,
          degreeTitle: '6-Year MBBS Clinical Medicine (WHO / WFME Recognized)',
          scholarshipPrograms: 'Provincial Government Scholarship (Up to 100% Tuition)',
        },
      },
      disciplineMultiplier: {
        general: 0.85,
        business: 1.0,
        tech_cs: 1.1,
        engineering: 1.15,
        medical: 1.35,
      },
      monthlyLivingBaseUSD: {
        tier1: { dorm: 180, shared_flat: 350, private_studio: 580, food: 220, utilities: 45, transit: 30, healthAnnual: 150 }, // Shanghai / Beijing / Shenzhen
        tier2: { dorm: 110, shared_flat: 210, private_studio: 340, food: 150, utilities: 30, transit: 20, healthAnnual: 150 }, // Wuhan / Xi\'an / Nanjing / Hangzhou
      },
      cities: { tier1: 'Shanghai / Beijing / Shenzhen (Tier 1)', tier2: 'Wuhan / Nanjing / Xi’an / Hangzhou (Tier 2 Major Hubs)' },
    },
    malaysia: {
      countryName: 'Malaysia',
      flag: '🇲🇾',
      code: 'MY',
      currencyName: 'MYR (RM)',
      localRateFromUSD: 4.7,
      localSymbol: 'RM',
      hourlyWageUSD: 5.5,
      maxLegalHoursPerWeek: 20,
      legalWorkNotes: '20 hours/week legally during semester breaks, festive holidays, and long vacations under EMGS student pass.',
      preDeparture: {
        visaFee: 450, // EMGS Visa Approval Letter (VAL)
        translationLegalization: 180,
        airfareEstimate: 190,
        initialDeposit: 300,
      },
      courseLevelDefaults: {
        foundation: {
          defaultDurationYears: 1,
          baseAnnualTuitionUSD: 4200,
          degreeTitle: 'Foundation in Science / Business / Computing',
          scholarshipPrograms: 'Merit bursaries based on IGCSE / Matriculation scores',
        },
        bachelor: {
          defaultDurationYears: 3, // UK/Australia models are 3 years in Malaysia
          baseAnnualTuitionUSD: 6400,
          degreeTitle: 'Bachelor (UK / Australian Dual Degree or 3+0 Transfer)',
          scholarshipPrograms: 'High-Achiever Merit Scholarships (Up to 50% Tuition Waiver)',
        },
        master: {
          defaultDurationYears: 1.5,
          baseAnnualTuitionUSD: 7200,
          degreeTitle: 'Master / MBA (Taylor’s, Sunway, APU, Monash)',
          scholarshipPrograms: 'Graduate Dean’s Excellence Award',
        },
        mbbs: {
          defaultDurationYears: 5,
          baseAnnualTuitionUSD: 16000,
          degreeTitle: '5-Year MBBS Medical Degree (Monash / Newcastle / IMU)',
          scholarshipPrograms: 'Medical faculty entrance subsidies',
        },
      },
      disciplineMultiplier: {
        general: 0.9,
        business: 1.0,
        tech_cs: 1.1,
        engineering: 1.2,
        medical: 1.5,
      },
      monthlyLivingBaseUSD: {
        tier1: { dorm: 260, shared_flat: 380, private_studio: 580, food: 240, utilities: 55, transit: 30, healthAnnual: 380 }, // Kuala Lumpur / Subang Jaya / Petaling Jaya
        tier2: { dorm: 180, shared_flat: 260, private_studio: 390, food: 180, utilities: 40, transit: 20, healthAnnual: 380 }, // Penang / Johor Bahru / Melaka
      },
      cities: { tier1: 'Kuala Lumpur / Subang / Selangor (Tier 1)', tier2: 'Penang / Johor / Cyberjaya (Tier 2)' },
    },
    cambodia: {
      countryName: 'Cambodia',
      flag: '🇰🇭',
      code: 'KH',
      currencyName: 'USD ($)',
      localRateFromUSD: 1.0,
      localSymbol: '$',
      hourlyWageUSD: 4.0,
      maxLegalHoursPerWeek: 20,
      legalWorkNotes: 'Flexible student work & internships with multinational corporate branches in Phnom Penh.',
      preDeparture: {
        visaFee: 60,
        translationLegalization: 100,
        airfareEstimate: 160,
        initialDeposit: 200,
      },
      courseLevelDefaults: {
        foundation: {
          defaultDurationYears: 1,
          baseAnnualTuitionUSD: 1800,
          degreeTitle: 'Intensive Academic English & Preparation',
          scholarshipPrograms: 'ASEAN Neighbor Early Bird Grant',
        },
        bachelor: {
          defaultDurationYears: 4,
          baseAnnualTuitionUSD: 2400, // Paragon, RUPP, NUM
          degreeTitle: '4-Year International Bachelor (US / European Dual Options)',
          scholarshipPrograms: 'Direct ASEAN Enrollment Grants (Up to 40% Tuition)',
        },
        master: {
          defaultDurationYears: 2,
          baseAnnualTuitionUSD: 3000,
          degreeTitle: 'International Master / Global MBA',
          scholarshipPrograms: 'Executive leadership bursaries',
        },
        mbbs: {
          defaultDurationYears: 5,
          baseAnnualTuitionUSD: 4800,
          degreeTitle: 'Public Health & Healthcare Administration',
          scholarshipPrograms: 'Regional health development scholarship',
        },
      },
      disciplineMultiplier: {
        general: 0.9,
        business: 1.0,
        tech_cs: 1.1,
        engineering: 1.15,
        medical: 1.3,
      },
      monthlyLivingBaseUSD: {
        tier1: { dorm: 180, shared_flat: 260, private_studio: 390, food: 170, utilities: 45, transit: 25, healthAnnual: 180 }, // Phnom Penh Center
        tier2: { dorm: 120, shared_flat: 180, private_studio: 270, food: 130, utilities: 35, transit: 15, healthAnnual: 180 }, // Siem Reap / Battambang
      },
      cities: { tier1: 'Phnom Penh Center (Tier 1)', tier2: 'Siem Reap / Suburban Campus (Tier 2)' },
    },
  };

  // Intelligent Profiler Match Recommendation Algorithm
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

    if (preferredRegion === 'italy') {
      primary = italy;
      secondary = financialPriority === 'full_scholarship' || annualBudgetTier === 'budget_low' ? china : malaysia;
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
      if (annualBudgetTier === 'budget_low' || financialPriority === 'full_scholarship') {
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
      } else if (annualBudgetTier === 'budget_mid' || financialPriority === 'affordable') {
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
      } else if (financialPriority === 'dual_degree' || annualBudgetTier === 'budget_premium') {
        primary = malaysia;
        secondary = cambodia;
        matchPercentage = 98;
        scholarshipChance = 'High-Achiever Merit Awards (Up to 50% Tuition Reduction)';
        intakeRecommendation = 'September / October 2026 Intake';
        intakeDeadline = 'EMGS Visa Approval Letter (VAL) filing: 2 months prior';
      } else {
        if (fieldOfInterest === 'medicine_health') {
          primary = china;
          secondary = italy;
          matchPercentage = 96;
        } else if (fieldOfInterest === 'architecture_engineering') {
          primary = italy;
          secondary = malaysia;
          matchPercentage = 97;
        } else {
          primary = malaysia;
          secondary = italy;
          matchPercentage = 95;
        }
      }
    }

    let targetUniversities: string[] = [];
    if (primary.id === 'italy') {
      targetUniversities = [
        'University of Messina (Primary European On-Ground Hub)',
        'Sapienza University of Rome',
        'University of Bologna',
        'Politecnico di Milano (Engineering/Arch)',
        'University of Padua',
      ];
    } else if (primary.id === 'thailand') {
      targetUniversities = [
        'Assumption University (ABAC - Top Business & Tech)',
        'Bangkok University International',
        'Stamford International University (American/European dual degree)',
        'Mahidol University International College',
        'Chulalongkorn University',
      ];
    } else if (primary.id === 'china') {
      targetUniversities = [
        'Zhejiang University (Top 50 World)',
        'Wuhan University',
        'Shanghai Jiao Tong University',
        'Nanjing University of Science and Technology',
        'Xi’an Jiaotong University',
      ];
    } else if (primary.id === 'malaysia') {
      targetUniversities = [
        'Taylor’s University (QS World Top 300 / 5-Star Campus)',
        'Monash University Malaysia (Australian Top 50 Group of Eight)',
        'University of Nottingham Malaysia (British Russell Group)',
        'Asia Pacific University (APU - Premier Digital Tech & AI)',
        'Sunway University',
      ];
    } else {
      targetUniversities = [
        'American University of Phnom Penh (AUPP - US Dual Degree with Arizona & Fort Hays)',
        'Paragon International University (Engineering, IT & Business)',
        'Royal University of Phnom Penh (RUPP - International Programs)',
        'National University of Management (NUM International College)',
      ];
    }

    const whyChooseThis = [
      {
        title: `Globally Recognized ${primary.country} Degree Framework`,
        desc: `Degrees from accredited ${primary.country} institutions follow internationally aligned accreditation systems, enabling seamless credit transfers and recognized credentials worldwide.`,
        icon: Award,
      },
      {
        title: `Strategic Match for ${fieldOfInterest === 'cs_ai' ? 'Computing & AI' : fieldOfInterest === 'business_finance' ? 'Business & Finance' : fieldOfInterest === 'architecture_engineering' ? 'Engineering & Design' : fieldOfInterest === 'medicine_health' ? 'Medical Sciences' : 'Your Desired Major'}`,
        desc: `Exceptional faculty strength, specialized laboratory facilities, and established corporate internship networks tailor-made for high-demand careers.`,
        icon: Compass,
      },
      {
        title: `Outstanding Value & Financial Feasibility`,
        desc: `Tuition structures in ${primary.country} maximize your return on educational investment, especially when paired with U Education's scholarship dossier filing.`,
        icon: DollarSign,
      },
      {
        title: `Dedicated On-Ground & Local Hub Support`,
        desc: `U Education maintains dedicated liaison offices and ground support in ${primary.country === 'Italy' ? 'Messina (Italy)' : primary.country === 'Thailand' ? 'Bangkok' : primary.country === 'Cambodia' ? 'Phnom Penh' : primary.country} for secure airport pickup, dorm check-in, and residency assistance.`,
        icon: ShieldCheck,
      },
    ];

    const suggestions = {
      testStrategy:
        englishStatus === 'ielts_strong'
          ? 'Your English proficiency is prime. Focus directly on SOP crafting and university portal priority filing.'
          : englishStatus === 'ielts_moderate'
          ? 'Target 3–4 weeks of intensive IELTS/Duolingo speaking and writing modules to unlock top-tier scholarship thresholds.'
          : 'Enroll in U Education’s streamlined Duolingo English Test (DET) express program or university direct English medium verification.',
      actionSteps: [
        `Submit certified academic transcripts & certificates to U Education counselors for official evaluation.`,
        `Draft Statement of Purpose (SOP) highlighting passion for ${fieldOfInterest === 'cs_ai' ? 'Technology & Computing' : fieldOfInterest === 'business_finance' ? 'Global Business' : 'your chosen domain'}.`,
        `Compile family income documentation for ${primary.id === 'italy' ? 'Italian Regional DSU' : primary.id === 'china' ? 'CSC Scholarship' : 'Merit Scholarship'} verification.`,
        `Secure university pre-acceptance offer letter through U Education priority agency channel.`,
        `Complete embassy visa documentation audit and mock interview coaching with our visa specialists.`,
      ],
      checklist: [
        'Certified High School / Bachelor Transcript & Certificate (English Translated & Notarized)',
        'Valid International Passport (Minimum 18 Months Validity)',
        'Statement of Purpose (SOP) & Academic Curriculum Vitae (CV)',
        'Two Letters of Recommendation (from Academic Teachers/Professors)',
        'Financial Affidavit of Support & Bank Statements (Embassy Compliance)',
        'English Language Certificate (IELTS / Duolingo / MOI Letter)',
      ],
    };

    const majorNames: Record<string, string> = {
      cs_ai: 'Computer Science, Software Engineering & AI',
      business_finance: 'International Business, Finance & Economics',
      architecture_engineering: 'Architecture, Civil & Mechanical Engineering',
      medicine_health: 'Medicine (MBBS), Pharmacy & Health Sciences',
      hospitality_tourism: 'International Hospitality & Tourism Management',
      arts_humanities: 'Digital Media, Communications & Humanities',
    };

    return {
      primary,
      secondary,
      matchPercentage,
      scholarshipChance,
      intakeRecommendation,
      intakeDeadline,
      targetUniversities,
      whyChooseThis,
      suggestions,
      selectedMajorName: majorNames[fieldOfInterest] || 'General Studies',
    };
  };

  const rec = useMemo(
    () => getRecommendation(),
    [
      educationLevel,
      targetDegree,
      financialPriority,
      annualBudgetTier,
      fieldOfInterest,
      englishStatus,
      preferredRegion,
      destinations,
    ]
  );

  // Sync calculator country when recommendation updates unless manually changed
  const activeCountryData = countryFinancialData[calcCountry] || countryFinancialData.italy;

  // Helper currency conversion & formatting
  const formatMoney = (amountInUSD: number, targetCountryKey: string = calcCountry) => {
    const cData = countryFinancialData[targetCountryKey] || activeCountryData;
    if (selectedCurrency === 'LOCAL') {
      const converted = amountInUSD * cData.localRateFromUSD;
      return `${cData.localSymbol} ${Math.round(converted).toLocaleString()}`;
    }

    const targetInfo = currencyRates[selectedCurrency];
    const converted = amountInUSD * targetInfo.rateFromUSD;

    if (selectedCurrency === 'MMK') {
      const lakhs = (converted / 100000).toFixed(1);
      return `${Math.round(converted).toLocaleString()} Ks (~${lakhs} Lakhs)`;
    }

    return `${targetInfo.symbol} ${Math.round(converted).toLocaleString()}`;
  };

  // ==========================================
  // DYNAMIC BUDGET CALCULATION ENGINE
  // ==========================================
  const dynamicBudget = useMemo(() => {
    const cData = countryFinancialData[calcCountry] || countryFinancialData.italy;
    const courseDef = cData.courseLevelDefaults[calcCourseLevel];
    const disciplineMult = cData.disciplineMultiplier[calcDiscipline];
    const livingTierData = cData.monthlyLivingBaseUSD[calcCityTier];

    // 1. Gross Annual Tuition
    const grossAnnualTuitionUSD = Math.round(courseDef.baseAnnualTuitionUSD * disciplineMult);

    // 2. Scholarship Net Tuition
    const scholarshipDiscountUSD = Math.round(grossAnnualTuitionUSD * (calcScholarshipPct / 100));
    const netAnnualTuitionUSD = Math.max(0, grossAnnualTuitionUSD - scholarshipDiscountUSD);

    // 3. Monthly Living Expenses Breakdown
    const monthlyHousingUSD =
      calcHousingType === 'dorm'
        ? livingTierData.dorm
        : calcHousingType === 'shared_flat'
        ? livingTierData.shared_flat
        : livingTierData.private_studio;

    // Lifestyle multiplier for food & personal spending
    const lifestyleMult = calcLifestyleTier === 'saver' ? 0.85 : calcLifestyleTier === 'comfort' ? 1.35 : 1.0;
    const monthlyFoodUSD = Math.round(livingTierData.food * lifestyleMult);
    const monthlyUtilitiesUSD = livingTierData.utilities;
    const monthlyTransitUSD = livingTierData.transit;
    const monthlyPersonalUSD = Math.round(75 * lifestyleMult);

    const monthlyLivingTotalUSD =
      monthlyHousingUSD + monthlyFoodUSD + monthlyUtilitiesUSD + monthlyTransitUSD + monthlyPersonalUSD;

    const annualLivingTotalUSD = monthlyLivingTotalUSD * 12;
    const annualHealthInsuranceUSD = livingTierData.healthAnnual;

    // 4. Part-Time Income Offset (calculated for 10 months/year)
    const effectiveWorkHours = Math.min(calcPartTimeWeeklyHours, cData.maxLegalHoursPerWeek);
    const monthlyPartTimeIncomeUSD = Math.round(effectiveWorkHours * 4.2 * cData.hourlyWageUSD);
    const annualPartTimeIncomeUSD = monthlyPartTimeIncomeUSD * 10; // 10 working months

    // 5. Total Annual & Duration Aggregates
    const annualGrossTotalUSD = grossAnnualTuitionUSD + annualLivingTotalUSD + annualHealthInsuranceUSD;
    const annualNetTotalUSD = Math.max(
      0,
      netAnnualTuitionUSD + annualLivingTotalUSD + annualHealthInsuranceUSD - annualPartTimeIncomeUSD
    );

    const fullDurationNetTotalUSD = annualNetTotalUSD * calcDurationYears;
    const fullDurationGrossTotalUSD = annualGrossTotalUSD * calcDurationYears;

    // 6. Pre-Departure Startup Capital
    const preDepartureTotalUSD =
      cData.preDeparture.visaFee +
      cData.preDeparture.translationLegalization +
      cData.preDeparture.airfareEstimate +
      cData.preDeparture.initialDeposit;

    // Grand total for entire degree including startup
    const grandTotalAllInclusiveUSD = fullDurationNetTotalUSD + preDepartureTotalUSD;

    return {
      cData,
      courseDef,
      grossAnnualTuitionUSD,
      scholarshipDiscountUSD,
      netAnnualTuitionUSD,
      monthlyHousingUSD,
      monthlyFoodUSD,
      monthlyUtilitiesUSD,
      monthlyTransitUSD,
      monthlyPersonalUSD,
      monthlyLivingTotalUSD,
      annualLivingTotalUSD,
      annualHealthInsuranceUSD,
      monthlyPartTimeIncomeUSD,
      annualPartTimeIncomeUSD,
      annualGrossTotalUSD,
      annualNetTotalUSD,
      fullDurationNetTotalUSD,
      fullDurationGrossTotalUSD,
      preDepartureTotalUSD,
      grandTotalAllInclusiveUSD,
      durationYears: calcDurationYears,
    };
  }, [
    calcCountry,
    calcCourseLevel,
    calcDurationYears,
    calcDiscipline,
    calcCityTier,
    calcHousingType,
    calcLifestyleTier,
    calcScholarshipPct,
    calcPartTimeWeeklyHours,
  ]);

  // Handle Course Level Quick Preset Selection
  const handleSelectCourseLevel = (lvl: 'foundation' | 'bachelor' | 'master' | 'mbbs') => {
    setCalcCourseLevel(lvl);
    const cData = countryFinancialData[calcCountry] || countryFinancialData.italy;
    setCalcDurationYears(cData.courseLevelDefaults[lvl].defaultDurationYears);
  };

  // Copy Pathway & Budget Dossier to Clipboard
  const handleCopyReport = () => {
    const reportText = `=========================================
U EDUCATION CONSULTANT AGENCY (UECA)
ACADEMIC PATHWAY & BUDGET COST ESTIMATE
=========================================
Target Country: ${activeCountryData.countryName} (${activeCountryData.code})
Selected Course Level: ${dynamicBudget.courseDef.degreeTitle}
Duration: ${calcDurationYears} Year(s)
Academic Discipline: ${calcDiscipline.toUpperCase()}
Living Location: ${activeCountryData.cities[calcCityTier]}
Accommodation Style: ${calcHousingType.replace('_', ' ').toUpperCase()}
Scholarship Deduction Applied: ${calcScholarshipPct}% (${dynamicBudget.courseDef.scholarshipPrograms})
Part-Time Work Allowance: ${calcPartTimeWeeklyHours} hrs/week (~$${dynamicBudget.monthlyPartTimeIncomeUSD}/mo)

FINANCIAL PROJECTION (ESTIMATED IN USD):
-----------------------------------------
1. ANNUAL TUITION:
   - Gross Annual Tuition: $${dynamicBudget.grossAnnualTuitionUSD.toLocaleString()}
   - Scholarship Discount: -$${dynamicBudget.scholarshipDiscountUSD.toLocaleString()} (${calcScholarshipPct}%)
   - Net Annual Tuition Payable: $${dynamicBudget.netAnnualTuitionUSD.toLocaleString()}

2. ESTIMATED LIVING EXPENSES (Per Month / Per Year):
   - Monthly Rent & Housing: $${dynamicBudget.monthlyHousingUSD.toLocaleString()} / mo ($${(dynamicBudget.monthlyHousingUSD * 12).toLocaleString()} / yr)
   - Food, Groceries & Dining: $${dynamicBudget.monthlyFoodUSD.toLocaleString()} / mo ($${(dynamicBudget.monthlyFoodUSD * 12).toLocaleString()} / yr)
   - Utilities, Wi-Fi & Transit: $${(dynamicBudget.monthlyUtilitiesUSD + dynamicBudget.monthlyTransitUSD).toLocaleString()} / mo
   - Annual Student Health & Visa Cover: $${dynamicBudget.annualHealthInsuranceUSD.toLocaleString()} / yr
   - Total Living Expenses: $${dynamicBudget.monthlyLivingTotalUSD.toLocaleString()} / mo ($${dynamicBudget.annualLivingTotalUSD.toLocaleString()} / yr)

3. PART-TIME WORK OFFSET:
   - Monthly Legal Earning: ~$${dynamicBudget.monthlyPartTimeIncomeUSD.toLocaleString()} / mo
   - Annual Part-Time Offset (10 mo): -$${dynamicBudget.annualPartTimeIncomeUSD.toLocaleString()} / yr

4. NET ESTIMATED OUT-OF-POCKET:
   - Net Annual Out-of-Pocket: $${dynamicBudget.annualNetTotalUSD.toLocaleString()} / year
   - Full ${calcDurationYears}-Year Degree Total: $${dynamicBudget.fullDurationNetTotalUSD.toLocaleString()}
   - One-Time Pre-Departure Startup: $${dynamicBudget.preDepartureTotalUSD.toLocaleString()}
   - Grand Total Estimated Investment: $${dynamicBudget.grandTotalAllInclusiveUSD.toLocaleString()}

CONTACT COUNSELOR FOR VERIFICATION & SCHOLARSHIP FILING:
- Email: ${agencyInfo.email}
- Hotlines: ${agencyInfo.phone} / +959977859474
- Physical Hubs: Yangon • Mandalay • Bangkok • Phnom Penh • Messina (Italy)
=========================================`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(reportText);
      showToast('Comprehensive Study Cost & Budget Report copied to clipboard!');
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
              Intelligent Academic & Financial Profiler · 2026/2027 Intakes
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-[#5A1226] tracking-tight leading-tight">
            Study Pathway & <span className="text-[#E5A823]">Budget Calculator</span>
          </h2>
          <div className="w-20 h-1.5 bg-[#E5A823] rounded-full mx-auto" />

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Answer the questions below to receive an algorithmic destination evaluation, custom scholarship forecast, and an <strong>interactive budget calculator</strong> estimating total tuition and living costs for <strong>Italy, Thailand, China, Malaysia, and Cambodia</strong>.
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
                      onClick={() => {
                        setTargetDegree(item.id);
                        if (item.id === 'bachelor') handleSelectCourseLevel('bachelor');
                        if (item.id === 'master') handleSelectCourseLevel('master');
                        if (item.id === 'pathway') handleSelectCourseLevel('foundation');
                      }}
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

            {/* Row 2: Annual Budget Tier & Financial Priority */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* 3. Annual Budget Range */}
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-wider text-[#5A1226] flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#5A1226] text-white flex items-center justify-center text-[10px]">
                    3
                  </span>
                  Target Annual Budget Range (Tuition + Living)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5">
                  {[
                    {
                      id: 'budget_low',
                      label: '< $2,000 / Year',
                      desc: 'Needs 100% Scholarship (Italy DSU / China CSC Full-Ride)',
                    },
                    {
                      id: 'budget_mid',
                      label: '$2,000 – $5,000 / Year',
                      desc: 'Affordable ASEAN Tier (Thailand & Cambodia Programs)',
                    },
                    {
                      id: 'budget_standard',
                      label: '$5,000 – $9,500 / Year',
                      desc: 'Moderate Tier (Italy Public Fee + Living / Malaysia)',
                    },
                    {
                      id: 'budget_premium',
                      label: '$9,500+ / Year',
                      desc: 'Premium Tier (UK/Australia Branch Campuses in Malaysia)',
                    },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setAnnualBudgetTier(item.id)}
                      className={`p-3.5 rounded-xl text-left transition-all border cursor-pointer ${
                        annualBudgetTier === item.id
                          ? 'bg-[#5A1226] text-white border-[#5A1226] shadow-xs'
                          : 'bg-[#FAF8F5] text-slate-700 border-stone-200 hover:border-[#E5A823]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-bold leading-snug">{item.label}</p>
                        <Wallet className={`w-3.5 h-3.5 ${annualBudgetTier === item.id ? 'text-[#E5A823]' : 'text-slate-400'}`} />
                      </div>
                      <p
                        className={`text-[11px] mt-1 line-clamp-2 ${
                          annualBudgetTier === item.id ? 'text-slate-200' : 'text-slate-500'
                        }`}
                      >
                        {item.desc}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* 4. Financial & Scholarship Priority */}
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-wider text-[#5A1226] flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#5A1226] text-white flex items-center justify-center text-[10px]">
                    4
                  </span>
                  Scholarship & Strategic Priority
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
                      label: 'Low Tuition & Sustainable Living',
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

            </div>

            {/* Row 3: Target Major & English Status & Geographical Preference */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* 5. Target Major */}
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-wider text-[#5A1226] flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#5A1226] text-white flex items-center justify-center text-[10px]">
                    5
                  </span>
                  Intended Major / Field
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2">
                  {[
                    { id: 'cs_ai', label: '💻 Computer Science & AI', disciplineKey: 'tech_cs' },
                    { id: 'business_finance', label: '📈 Business, Finance & Trade', disciplineKey: 'business' },
                    { id: 'architecture_engineering', label: '🏛️ Architecture & Engineering', disciplineKey: 'engineering' },
                    { id: 'medicine_health', label: '🩺 Medicine & Health Sciences', disciplineKey: 'medical' },
                    { id: 'hospitality_tourism', label: '🏨 Hospitality & Tourism', disciplineKey: 'business' },
                    { id: 'arts_humanities', label: '🎨 Digital Media & Arts', disciplineKey: 'general' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setFieldOfInterest(item.id);
                        setCalcDiscipline(item.disciplineKey as typeof calcDiscipline);
                      }}
                      className={`p-2.5 rounded-xl text-xs font-bold text-left transition-all border cursor-pointer ${
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

              {/* 6. English Status */}
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-wider text-[#5A1226] flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#5A1226] text-white flex items-center justify-center text-[10px]">
                    6
                  </span>
                  Language Proficiency Status
                </label>
                <div className="grid grid-cols-1 gap-2">
                  {[
                    {
                      id: 'ielts_strong',
                      label: 'IELTS 6.5+ / Duolingo 115+',
                      desc: 'Ready for direct entry to top European & ASEAN programs',
                    },
                    {
                      id: 'ielts_moderate',
                      label: 'IELTS 5.5 – 6.0 / Duolingo 95–110',
                      desc: 'Qualifies for most bachelor programs & foundation pathways',
                    },
                    {
                      id: 'duolingo_prep',
                      label: 'Planning to Take Duolingo / IELTS',
                      desc: 'Seeking fast-track online preparation guidance',
                    },
                    {
                      id: 'no_test_yet',
                      label: 'No Test Yet / Medium of Instruction',
                      desc: 'Require university internal English test or waiver',
                    },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setEnglishStatus(item.id)}
                      className={`p-2.5 rounded-xl text-left transition-all border cursor-pointer ${
                        englishStatus === item.id
                          ? 'bg-[#5A1226] text-white border-[#5A1226] shadow-xs'
                          : 'bg-[#FAF8F5] text-slate-700 border-stone-200 hover:border-[#E5A823]'
                      }`}
                    >
                      <p className="text-xs font-bold leading-snug">{item.label}</p>
                      <p
                        className={`text-[10px] mt-0.5 line-clamp-1 ${
                          englishStatus === item.id ? 'text-slate-200' : 'text-slate-500'
                        }`}
                      >
                        {item.desc}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* 7. Preferred Region */}
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-wider text-[#5A1226] flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#5A1226] text-white flex items-center justify-center text-[10px]">
                    7
                  </span>
                  Geographical Focus
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'any', label: '🌟 Best Match' },
                    { id: 'italy', label: '🇮🇹 Italy' },
                    { id: 'thailand', label: '🇹🇭 Thailand' },
                    { id: 'china', label: '🇨🇳 China' },
                    { id: 'malaysia', label: '🇲🇾 Malaysia' },
                    { id: 'cambodia', label: '🇰🇭 Cambodia' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setPreferredRegion(item.id);
                        if (item.id !== 'any') setCalcCountry(item.id);
                      }}
                      className={`p-3 rounded-xl text-xs font-bold text-center transition-all border cursor-pointer ${
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
                  setCalcCountry(rec.primary.id);
                  showToast('Updated study pathway & budget recommendations generated!');
                  document.querySelector('#assessment-results-card')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 rounded-full bg-[#5A1226] hover:bg-[#721832] text-white font-black text-xs sm:text-sm tracking-wide shadow-md transition-all hover:scale-105 active:scale-95 border border-[#E5A823]/40 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#E5A823]" />
                <span>Calculate Best Study Pathway & Budget</span>
                <ArrowRight className="w-4 h-4 text-[#E5A823]" />
              </button>

              <button
                type="button"
                onClick={() => {
                  setEducationLevel('grade12');
                  setTargetDegree('bachelor');
                  setFinancialPriority('full_scholarship');
                  setAnnualBudgetTier('budget_low');
                  setFieldOfInterest('cs_ai');
                  setEnglishStatus('ielts_moderate');
                  setPreferredRegion('any');
                  setCalcCountry('italy');
                  setCalcCourseLevel('bachelor');
                  setCalcDurationYears(3);
                  setCalcDiscipline('tech_cs');
                  setCalcCityTier('tier2');
                  setCalcHousingType('dorm');
                  setCalcLifestyleTier('standard');
                  setCalcScholarshipPct(100);
                  setCalcPartTimeWeeklyHours(15);
                  setShowResult(true);
                  showToast('Assessment & Calculator reset to defaults');
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
                      )}%0D%0A-%20Budget%20Tier:%20${encodeURIComponent(
                        annualBudgetTier
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
                      <span>Copy Full Pathway & Cost Report</span>
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

              {/* Sub-Navigation Tabs with Prominent Budget Tab */}
              <div className="border-b border-stone-200 bg-stone-50 rounded-2xl p-1.5 flex overflow-x-auto no-scrollbar gap-1.5 scroll-smooth">
                {[
                  {
                    id: 'why',
                    label: `Why Choose ${rec.primary.country}`,
                    icon: CheckCircle2,
                  },
                  {
                    id: 'budget',
                    label: `Budget & Study Cost Calculator`,
                    icon: Calculator,
                    badge: 'Interactive & Multi-Country',
                  },
                  {
                    id: 'suggestions',
                    label: 'Suggestions & Roadmap',
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
                      onClick={() => handleTabChange(tab.id as typeof activeResultTab)}
                      className={`px-3.5 sm:px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap flex-shrink-0 ${
                        isActive
                          ? 'bg-[#5A1226] text-white shadow-xs'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-stone-200/60'
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${isActive ? 'text-[#E5A823]' : 'text-[#5A1226]'}`} />
                      <span>{tab.label}</span>
                      {tab.badge && (
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-black uppercase tracking-wider ${
                          isActive ? 'bg-[#E5A823] text-[#5A1226]' : 'bg-amber-100 text-amber-900 border border-amber-300'
                        }`}>
                          {tab.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* =========================================================================
                  TAB 1: WHY YOU SHOULD CHOOSE THIS SECTION
                 ========================================================================= */}
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

              {/* =========================================================================
                  TAB 2: FULLY EXPANDED INTERACTIVE STUDY COST & BUDGET CALCULATOR
                 ========================================================================= */}
              {activeResultTab === 'budget' && (
                <div className="space-y-8 animate-in fade-in duration-200">
                  
                  {/* Master Calculator Controller Panel */}
                  <div className="bg-gradient-to-br from-amber-50/80 via-white to-stone-50 p-6 sm:p-8 rounded-3xl border-2 border-amber-200/90 shadow-md space-y-7">
                    
                    {/* Top Bar: Title & Currency Switcher */}
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-stone-200">
                      <div>
                        <div className="flex items-center gap-2.5">
                          <div className="p-2 rounded-xl bg-[#5A1226] text-[#E5A823] shadow-xs">
                            <Calculator className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="text-xl sm:text-2xl font-black text-[#5A1226]">
                              Interactive Study Cost & Budget Calculator
                            </h4>
                            <p className="text-xs text-slate-600 font-medium">
                              Simulate total tuition, living expenses, scholarships, and part-time offsets by country & course level.
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Currency Selector Pill */}
                      <div className="flex items-center gap-1.5 bg-white p-1.5 rounded-2xl border border-stone-200 shadow-2xs self-start lg:self-auto">
                        <span className="text-[11px] font-bold text-slate-500 px-2">Currency:</span>
                        {(['USD', 'EUR', 'MMK', 'LOCAL'] as const).map((curr) => (
                          <button
                            key={curr}
                            onClick={() => setSelectedCurrency(curr)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                              selectedCurrency === curr
                                ? 'bg-[#5A1226] text-white shadow-2xs'
                                : 'text-slate-700 hover:bg-stone-100'
                            }`}
                          >
                            {curr === 'LOCAL' ? `${activeCountryData.currencyName}` : curr}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Step 1: Select Country to Calculate */}
                    <div className="space-y-2.5">
                      <label className="text-xs font-black uppercase tracking-wider text-[#5A1226] flex items-center justify-between">
                        <span className="flex items-center gap-2">
                          <MapPin className="w-3.5 h-3.5 text-[#E5A823]" />
                          Step 1: Choose Destination Country
                        </span>
                        <span className="text-[11px] text-slate-500 font-normal">
                          (Click any country to calculate instant costs)
                        </span>
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                        {[
                          { id: 'italy', name: 'Italy', flag: '🇮🇹', badge: '100% DSU Grant' },
                          { id: 'thailand', name: 'Thailand', flag: '🇹🇭', badge: 'Affordable ASEAN' },
                          { id: 'china', name: 'China', flag: '🇨🇳', badge: 'CSC Full-Ride' },
                          { id: 'malaysia', name: 'Malaysia', flag: '🇲🇾', badge: 'UK/AU Dual Degree' },
                          { id: 'cambodia', name: 'Cambodia', flag: '🇰🇭', badge: 'Direct Entry Grants' },
                        ].map((c) => {
                          const isSelected = calcCountry === c.id;
                          return (
                            <button
                              key={c.id}
                              type="button"
                              onClick={() => {
                                setCalcCountry(c.id);
                                const newCData = countryFinancialData[c.id];
                                setCalcDurationYears(newCData.courseLevelDefaults[calcCourseLevel].defaultDurationYears);
                              }}
                              className={`p-3 rounded-2xl text-left transition-all border-2 cursor-pointer flex flex-col justify-between ${
                                isSelected
                                  ? 'bg-[#5A1226] text-white border-[#5A1226] shadow-md scale-[1.02]'
                                  : 'bg-white text-slate-800 border-stone-200 hover:border-[#E5A823] hover:bg-stone-50'
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-2xl">{c.flag}</span>
                                {isSelected && <Check className="w-4 h-4 text-[#E5A823]" />}
                              </div>
                              <div className="mt-2">
                                <p className="font-black text-xs leading-snug">{c.name}</p>
                                <p className={`text-[10px] mt-0.5 ${isSelected ? 'text-amber-300' : 'text-slate-500'}`}>
                                  {c.badge}
                                </p>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Step 2: Select Course Level & Degree Duration */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-1">
                      
                      {/* Course Level Selection */}
                      <div className="space-y-2.5">
                        <label className="text-xs font-black uppercase tracking-wider text-[#5A1226] flex items-center gap-2">
                          <GraduationCap className="w-3.5 h-3.5 text-[#E5A823]" />
                          Step 2: Select Course Level
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          {[
                            {
                              id: 'foundation',
                              title: 'Foundation / Pathway',
                              sub: '1 Year Prep Course',
                              years: 1,
                            },
                            {
                              id: 'bachelor',
                              title: "Bachelor's Degree",
                              sub: `${activeCountryData.courseLevelDefaults.bachelor.defaultDurationYears} Years Program`,
                              years: activeCountryData.courseLevelDefaults.bachelor.defaultDurationYears,
                            },
                            {
                              id: 'master',
                              title: "Master's / MBA",
                              sub: `${activeCountryData.courseLevelDefaults.master.defaultDurationYears} Years Program`,
                              years: activeCountryData.courseLevelDefaults.master.defaultDurationYears,
                            },
                            {
                              id: 'mbbs',
                              title: 'MBBS / Clinical Medicine',
                              sub: `${activeCountryData.courseLevelDefaults.mbbs.defaultDurationYears} Years Program`,
                              years: activeCountryData.courseLevelDefaults.mbbs.defaultDurationYears,
                            },
                          ].map((item) => {
                            const isSelected = calcCourseLevel === item.id;
                            return (
                              <button
                                key={item.id}
                                type="button"
                                onClick={() => handleSelectCourseLevel(item.id as typeof calcCourseLevel)}
                                className={`p-3 rounded-2xl text-left border-2 transition-all cursor-pointer ${
                                  isSelected
                                    ? 'bg-[#5A1226] text-white border-[#5A1226] shadow-sm'
                                    : 'bg-white text-slate-800 border-stone-200 hover:border-[#E5A823]'
                                }`}
                              >
                                <p className="text-xs font-black leading-snug">{item.title}</p>
                                <p className={`text-[10px] mt-0.5 ${isSelected ? 'text-amber-300' : 'text-slate-500'}`}>
                                  {item.sub}
                                </p>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Course Duration & Field of Study Adjusters */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <label className="text-xs font-black uppercase tracking-wider text-[#5A1226] flex items-center gap-2">
                            <Clock className="w-3.5 h-3.5 text-[#E5A823]" />
                            Duration: {calcDurationYears} {calcDurationYears === 1 ? 'Academic Year' : 'Academic Years'}
                          </label>
                          <span className="text-[11px] font-bold text-slate-500">
                            (Drag to adjust total duration)
                          </span>
                        </div>

                        {/* Slider for Duration */}
                        <div className="bg-white p-3 rounded-2xl border border-stone-200 space-y-2">
                          <input
                            type="range"
                            min={1}
                            max={6}
                            step={1}
                            value={calcDurationYears}
                            onChange={(e) => setCalcDurationYears(parseInt(e.target.value))}
                            className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-[#5A1226]"
                          />
                          <div className="flex justify-between text-[10px] font-bold text-slate-400">
                            <span>1 Year (Pathway)</span>
                            <span>2 Years (Master)</span>
                            <span>3-4 Years (Bachelor)</span>
                            <span>5-6 Years (Medicine)</span>
                          </div>
                        </div>

                        {/* Discipline Tier Selector */}
                        <div className="space-y-1.5 pt-1">
                          <label className="text-[11px] font-bold text-slate-700 block">
                            Academic Discipline / Lab Fee Tier:
                          </label>
                          <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5">
                            {[
                              { id: 'general', label: 'Humanities' },
                              { id: 'business', label: 'Business' },
                              { id: 'tech_cs', label: 'Tech & CS' },
                              { id: 'engineering', label: 'Engineering' },
                              { id: 'medical', label: 'Medical' },
                            ].map((d) => (
                              <button
                                key={d.id}
                                type="button"
                                onClick={() => setCalcDiscipline(d.id as typeof calcDiscipline)}
                                className={`py-1.5 px-2 rounded-xl text-[11px] font-bold text-center border transition-all cursor-pointer ${
                                  calcDiscipline === d.id
                                    ? 'bg-[#5A1226] text-white border-[#5A1226]'
                                    : 'bg-white text-slate-600 border-stone-200 hover:bg-stone-100'
                                }`}
                              >
                                {d.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                    </div>

                    {/* Step 3: Location, Housing, Lifestyle & Scholarship Modifiers */}
                    <div className="pt-4 border-t border-stone-200 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      
                      {/* City Living Tier */}
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-[#5A1226] uppercase tracking-wider block">
                          Campus Location
                        </label>
                        <div className="grid grid-cols-1 gap-1.5 bg-white p-1 rounded-xl border border-stone-200">
                          <button
                            type="button"
                            onClick={() => setCalcCityTier('tier1')}
                            className={`py-2 px-2.5 rounded-lg text-left text-[11px] font-bold transition-all cursor-pointer ${
                              calcCityTier === 'tier1' ? 'bg-[#5A1226] text-white' : 'text-slate-700 hover:bg-stone-100'
                            }`}
                          >
                            <p>{activeCountryData.cities.tier1.split('(')[0]}</p>
                            <span className={`text-[10px] font-normal ${calcCityTier === 'tier1' ? 'text-amber-300' : 'text-slate-400'}`}>
                              Capital / Metro Area
                            </span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setCalcCityTier('tier2')}
                            className={`py-2 px-2.5 rounded-lg text-left text-[11px] font-bold transition-all cursor-pointer ${
                              calcCityTier === 'tier2' ? 'bg-[#5A1226] text-white' : 'text-slate-700 hover:bg-stone-100'
                            }`}
                          >
                            <p>{activeCountryData.cities.tier2.split('(')[0]}</p>
                            <span className={`text-[10px] font-normal ${calcCityTier === 'tier2' ? 'text-amber-300' : 'text-slate-400'}`}>
                              University Town (Lower Cost)
                            </span>
                          </button>
                        </div>
                      </div>

                      {/* Accommodation Style */}
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-[#5A1226] uppercase tracking-wider block">
                          Housing Type
                        </label>
                        <div className="grid grid-cols-1 gap-1.5 bg-white p-1 rounded-xl border border-stone-200">
                          {[
                            { id: 'dorm', label: 'Campus Dorm (Shared)', sub: 'Most economical' },
                            { id: 'shared_flat', label: 'Shared Student Flat', sub: 'Single room in flat' },
                            { id: 'private_studio', label: 'Private Studio Apartment', sub: 'Independent living' },
                          ].map((h) => (
                            <button
                              key={h.id}
                              type="button"
                              onClick={() => setCalcHousingType(h.id as typeof calcHousingType)}
                              className={`py-1.5 px-2 rounded-lg text-left text-[11px] font-bold transition-all cursor-pointer ${
                                calcHousingType === h.id ? 'bg-[#5A1226] text-white' : 'text-slate-700 hover:bg-stone-100'
                              }`}
                            >
                              <p>{h.label}</p>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Scholarship % Applied */}
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <label className="text-xs font-bold text-[#5A1226] uppercase tracking-wider">
                            Scholarship Waiver
                          </label>
                          <span className="text-xs font-black text-[#5A1226] bg-amber-100 px-2 py-0.5 rounded-md">
                            {calcScholarshipPct}% Off
                          </span>
                        </div>
                        <div className="bg-white p-2.5 rounded-xl border border-stone-200 space-y-2">
                          <div className="grid grid-cols-4 gap-1">
                            {[0, 30, 50, 100].map((pct) => (
                              <button
                                key={pct}
                                type="button"
                                onClick={() => setCalcScholarshipPct(pct)}
                                className={`py-1 rounded-lg text-[10px] font-bold text-center border cursor-pointer ${
                                  calcScholarshipPct === pct
                                    ? 'bg-[#5A1226] text-white border-[#5A1226]'
                                    : 'bg-stone-50 text-slate-600 border-stone-200 hover:bg-stone-100'
                                }`}
                              >
                                {pct === 100 ? '100% Full' : pct === 0 ? '0% Full Fee' : `${pct}%`}
                              </button>
                            ))}
                          </div>
                          <p className="text-[10px] text-slate-500 line-clamp-2">
                            {dynamicBudget.courseDef.scholarshipPrograms}
                          </p>
                        </div>
                      </div>

                      {/* Legal Part-Time Hours/Week */}
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <label className="text-xs font-bold text-[#5A1226] uppercase tracking-wider">
                            Part-Time Work
                          </label>
                          <span className="text-xs font-black text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md">
                            {calcPartTimeWeeklyHours} hrs/wk
                          </span>
                        </div>
                        <div className="bg-white p-2.5 rounded-xl border border-stone-200 space-y-2">
                          <div className="grid grid-cols-3 gap-1">
                            {[0, 10, activeCountryData.maxLegalHoursPerWeek].map((hrs) => (
                              <button
                                key={hrs}
                                type="button"
                                onClick={() => setCalcPartTimeWeeklyHours(hrs)}
                                className={`py-1 rounded-lg text-[10px] font-bold text-center border cursor-pointer ${
                                  calcPartTimeWeeklyHours === hrs
                                    ? 'bg-emerald-700 text-white border-emerald-700'
                                    : 'bg-stone-50 text-slate-600 border-stone-200 hover:bg-stone-100'
                                }`}
                              >
                                {hrs === 0 ? 'No Work' : `${hrs} hrs/wk`}
                              </button>
                            ))}
                          </div>
                          <p className="text-[10px] text-emerald-700 font-semibold">
                            Offset: ~{formatMoney(dynamicBudget.monthlyPartTimeIncomeUSD)} / month
                          </p>
                        </div>
                      </div>

                    </div>

                  </div>

                  {/* Horizon Toggle: 1-Year View vs Entire Degree Duration View */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-stone-100 p-2 rounded-2xl border border-stone-300">
                    <div className="flex items-center gap-2 px-3">
                      <Layers className="w-4 h-4 text-[#5A1226]" />
                      <span className="text-xs font-bold text-slate-700">Display Calculation Horizon:</span>
                    </div>

                    <div className="grid grid-cols-2 gap-1.5 w-full sm:w-auto">
                      <button
                        type="button"
                        onClick={() => setTimeHorizon('total')}
                        className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                          timeHorizon === 'total'
                            ? 'bg-[#5A1226] text-white shadow-xs'
                            : 'bg-white text-slate-700 hover:bg-stone-200'
                        }`}
                      >
                        <span>Full {calcDurationYears}-Year Degree Total</span>
                        <span className="text-[10px] px-1.5 py-0.2 rounded-md bg-[#E5A823] text-[#5A1226] font-black">
                          Complete
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setTimeHorizon('annual')}
                        className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                          timeHorizon === 'annual'
                            ? 'bg-[#5A1226] text-white shadow-xs'
                            : 'bg-white text-slate-700 hover:bg-stone-200'
                        }`}
                      >
                        <span>1 Academic Year (Annual)</span>
                      </button>
                    </div>
                  </div>

                  {/* Summary Metric Cards: Grand Output Display */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    
                    {/* 1. Net Out of Pocket Total */}
                    <div className="p-6 rounded-3xl bg-gradient-to-br from-[#5A1226] to-[#450C1D] text-white shadow-lg space-y-2 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-[#E5A823]/20 rounded-full blur-xl pointer-events-none" />
                      <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wider block">
                        {timeHorizon === 'total' ? `Total Net Investment (${calcDurationYears} Yrs)` : 'Net Annual Out-of-Pocket'}
                      </span>
                      <p className="text-2xl sm:text-3xl font-black text-white">
                        {formatMoney(
                          timeHorizon === 'total'
                            ? dynamicBudget.fullDurationNetTotalUSD
                            : dynamicBudget.annualNetTotalUSD
                        )}
                      </p>
                      <span className="text-[11px] text-slate-300 block">
                        Includes Net Tuition + Living - {calcScholarshipPct}% Scholarship
                      </span>
                    </div>

                    {/* 2. Monthly Out of Pocket */}
                    <div className="p-6 rounded-3xl bg-white border-2 border-[#E5A823] shadow-sm space-y-2">
                      <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                        Estimated Monthly Living Budget
                      </span>
                      <p className="text-2xl sm:text-3xl font-black text-amber-700">
                        {formatMoney(dynamicBudget.monthlyLivingTotalUSD)}
                        <span className="text-xs text-slate-500 font-semibold"> / mo</span>
                      </p>
                      <span className="text-[11px] text-slate-500 block">
                        Rent ({calcHousingType.replace('_', ' ')}), Food & Bills
                      </span>
                    </div>

                    {/* 3. Part-Time Offset Capacity */}
                    <div className="p-6 rounded-3xl bg-white border-2 border-emerald-400 shadow-sm space-y-2">
                      <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block">
                        Part-Time Earning Capacity
                      </span>
                      <p className="text-2xl sm:text-3xl font-black text-emerald-600">
                        ~{formatMoney(
                          timeHorizon === 'total'
                            ? dynamicBudget.annualPartTimeIncomeUSD * calcDurationYears
                            : dynamicBudget.annualPartTimeIncomeUSD
                        )}
                      </p>
                      <span className="text-[11px] text-emerald-700 font-medium block">
                        {calcPartTimeWeeklyHours > 0
                          ? `Based on ${calcPartTimeWeeklyHours} hrs/week @ $${activeCountryData.hourlyWageUSD}/hr`
                          : 'No part-time offset calculated'}
                      </span>
                    </div>

                    {/* 4. Pre-Departure Startup Capital */}
                    <div className="p-6 rounded-3xl bg-white border-2 border-stone-300 shadow-sm space-y-2">
                      <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                        Pre-Departure Startup Funds
                      </span>
                      <p className="text-2xl sm:text-3xl font-black text-slate-900">
                        {formatMoney(dynamicBudget.preDepartureTotalUSD)}
                      </p>
                      <span className="text-[11px] text-slate-500 block">
                        Visa, Translation/CIMEA, Airfare & Deposit
                      </span>
                    </div>

                  </div>

                  {/* Detailed Itemized Expense Breakdown Table */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    
                    {/* Itemized Table (2 Cols) */}
                    <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-7 border-2 border-stone-200 shadow-sm space-y-5">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <Receipt className="w-5 h-5 text-[#5A1226]" />
                          <h5 className="font-black text-base text-[#5A1226]">
                            Itemized Cost Matrix: {activeCountryData.countryName} ({dynamicBudget.courseDef.degreeTitle})
                          </h5>
                        </div>
                        <span className="text-xs text-slate-500 font-bold bg-stone-100 px-2.5 py-1 rounded-lg">
                          Horizon: {timeHorizon === 'total' ? `${calcDurationYears} Years Complete` : '1 Academic Year'}
                        </span>
                      </div>

                      <div className="overflow-x-auto">
                        <table className="w-full text-xs text-left">
                          <thead>
                            <tr className="border-b-2 border-stone-200 text-[#5A1226] font-bold">
                              <th className="py-3">Expense Item</th>
                              <th className="py-3">Basis / Rate</th>
                              <th className="py-3 text-right">Gross Amount</th>
                              <th className="py-3 text-right">Net Model ({timeHorizon === 'total' ? `${calcDurationYears} Yrs` : '1 Yr'})</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-stone-100 font-medium text-slate-700">
                            
                            {/* Tuition Line Item */}
                            <tr className="hover:bg-stone-50">
                              <td className="py-3.5 font-bold text-slate-900 flex items-center gap-2">
                                <GraduationCap className="w-4 h-4 text-[#5A1226]" />
                                <div>
                                  <span>Tuition Fees ({calcDiscipline.toUpperCase()})</span>
                                  {calcScholarshipPct > 0 && (
                                    <span className="block text-[10px] text-emerald-600 font-bold">
                                      ✓ {calcScholarshipPct}% Scholarship Deduction Applied
                                    </span>
                                  )}
                                </div>
                              </td>
                              <td className="py-3.5 text-slate-500">
                                {formatMoney(dynamicBudget.grossAnnualTuitionUSD)} / year
                              </td>
                              <td className="py-3.5 text-right line-through text-slate-400">
                                {formatMoney(
                                  timeHorizon === 'total'
                                    ? dynamicBudget.grossAnnualTuitionUSD * calcDurationYears
                                    : dynamicBudget.grossAnnualTuitionUSD
                                )}
                              </td>
                              <td className="py-3.5 text-right font-black text-[#5A1226] text-sm">
                                {formatMoney(
                                  timeHorizon === 'total'
                                    ? dynamicBudget.netAnnualTuitionUSD * calcDurationYears
                                    : dynamicBudget.netAnnualTuitionUSD
                                )}
                              </td>
                            </tr>

                            {/* Housing Line Item */}
                            <tr className="hover:bg-stone-50">
                              <td className="py-3.5 font-bold text-slate-900 flex items-center gap-2">
                                <Building2 className="w-4 h-4 text-[#5A1226]" />
                                <span>Accommodation ({calcHousingType.replace('_', ' ')})</span>
                              </td>
                              <td className="py-3.5 text-slate-500">
                                {formatMoney(dynamicBudget.monthlyHousingUSD)} / month
                              </td>
                              <td className="py-3.5 text-right text-slate-500">
                                {formatMoney(
                                  timeHorizon === 'total'
                                    ? dynamicBudget.monthlyHousingUSD * 12 * calcDurationYears
                                    : dynamicBudget.monthlyHousingUSD * 12
                                )}
                              </td>
                              <td className="py-3.5 text-right font-bold text-slate-900">
                                {formatMoney(
                                  timeHorizon === 'total'
                                    ? dynamicBudget.monthlyHousingUSD * 12 * calcDurationYears
                                    : dynamicBudget.monthlyHousingUSD * 12
                                )}
                              </td>
                            </tr>

                            {/* Food & Meals */}
                            <tr className="hover:bg-stone-50">
                              <td className="py-3.5 font-bold text-slate-900 flex items-center gap-2">
                                <Coins className="w-4 h-4 text-[#5A1226]" />
                                <span>Food, Groceries & Dining ({calcLifestyleTier})</span>
                              </td>
                              <td className="py-3.5 text-slate-500">
                                {formatMoney(dynamicBudget.monthlyFoodUSD)} / month
                              </td>
                              <td className="py-3.5 text-right text-slate-500">
                                {formatMoney(
                                  timeHorizon === 'total'
                                    ? dynamicBudget.monthlyFoodUSD * 12 * calcDurationYears
                                    : dynamicBudget.monthlyFoodUSD * 12
                                )}
                              </td>
                              <td className="py-3.5 text-right font-bold text-slate-900">
                                {formatMoney(
                                  timeHorizon === 'total'
                                    ? dynamicBudget.monthlyFoodUSD * 12 * calcDurationYears
                                    : dynamicBudget.monthlyFoodUSD * 12
                                )}
                              </td>
                            </tr>

                            {/* Utilities, Transit & Personal */}
                            <tr className="hover:bg-stone-50">
                              <td className="py-3.5 font-bold text-slate-900">
                                Utilities, High-Speed Wi-Fi & Transit Pass
                              </td>
                              <td className="py-3.5 text-slate-500">
                                {formatMoney(dynamicBudget.monthlyUtilitiesUSD + dynamicBudget.monthlyTransitUSD)} / month
                              </td>
                              <td className="py-3.5 text-right text-slate-500">
                                {formatMoney(
                                  timeHorizon === 'total'
                                    ? (dynamicBudget.monthlyUtilitiesUSD + dynamicBudget.monthlyTransitUSD) * 12 * calcDurationYears
                                    : (dynamicBudget.monthlyUtilitiesUSD + dynamicBudget.monthlyTransitUSD) * 12
                                )}
                              </td>
                              <td className="py-3.5 text-right font-bold text-slate-900">
                                {formatMoney(
                                  timeHorizon === 'total'
                                    ? (dynamicBudget.monthlyUtilitiesUSD + dynamicBudget.monthlyTransitUSD) * 12 * calcDurationYears
                                    : (dynamicBudget.monthlyUtilitiesUSD + dynamicBudget.monthlyTransitUSD) * 12
                                )}
                              </td>
                            </tr>

                            {/* Health Cover & Visa Renewal */}
                            <tr className="hover:bg-stone-50">
                              <td className="py-3.5 font-bold text-slate-900">
                                Student Health Insurance & Visa Permit Annual Renewal
                              </td>
                              <td className="py-3.5 text-slate-500">
                                {formatMoney(dynamicBudget.annualHealthInsuranceUSD)} / year
                              </td>
                              <td className="py-3.5 text-right text-slate-500">
                                {formatMoney(
                                  timeHorizon === 'total'
                                    ? dynamicBudget.annualHealthInsuranceUSD * calcDurationYears
                                    : dynamicBudget.annualHealthInsuranceUSD
                                )}
                              </td>
                              <td className="py-3.5 text-right font-bold text-slate-900">
                                {formatMoney(
                                  timeHorizon === 'total'
                                    ? dynamicBudget.annualHealthInsuranceUSD * calcDurationYears
                                    : dynamicBudget.annualHealthInsuranceUSD
                                )}
                              </td>
                            </tr>

                            {/* Part Time Offset */}
                            {calcPartTimeWeeklyHours > 0 && (
                              <tr className="bg-emerald-50/70 text-emerald-800 font-bold">
                                <td className="py-3.5 flex items-center gap-2">
                                  <Briefcase className="w-4 h-4 text-emerald-600" />
                                  <span>Part-Time Legal Work Offset (10 Mo./Yr)</span>
                                </td>
                                <td className="py-3.5 text-emerald-700">
                                  ~{formatMoney(dynamicBudget.monthlyPartTimeIncomeUSD)} / month
                                </td>
                                <td className="py-3.5 text-right text-emerald-600">-</td>
                                <td className="py-3.5 text-right text-emerald-700 font-black text-sm">
                                  - {formatMoney(
                                    timeHorizon === 'total'
                                      ? dynamicBudget.annualPartTimeIncomeUSD * calcDurationYears
                                      : dynamicBudget.annualPartTimeIncomeUSD
                                  )}
                                </td>
                              </tr>
                            )}

                          </tbody>
                          <tfoot>
                            <tr className="border-t-2 border-[#5A1226] text-slate-900 font-black text-sm bg-amber-50/50">
                              <td colSpan={3} className="py-4 px-2 text-right text-[#5A1226]">
                                Total Net Out-of-Pocket ({timeHorizon === 'total' ? `${calcDurationYears} Years Total` : '1 Academic Year'}):
                              </td>
                              <td className="py-4 px-2 text-right text-[#5A1226] text-lg font-black">
                                {formatMoney(
                                  timeHorizon === 'total'
                                    ? dynamicBudget.fullDurationNetTotalUSD
                                    : dynamicBudget.annualNetTotalUSD
                                )}
                              </td>
                            </tr>
                          </tfoot>
                        </table>
                      </div>
                    </div>

                    {/* Pre-Departure Startup & Advisory Panel (1 Col) */}
                    <div className="bg-[#FAF8F5] rounded-3xl p-6 border-2 border-stone-200 shadow-sm space-y-5 flex flex-col justify-between">
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <Plane className="w-5 h-5 text-[#5A1226]" />
                          <h5 className="font-black text-base text-[#5A1226]">
                            Pre-Departure Startup Costs
                          </h5>
                        </div>
                        <p className="text-xs text-slate-600">
                          One-time expenses required before departing Myanmar for <strong>{activeCountryData.countryName}</strong>:
                        </p>

                        <div className="space-y-2.5 text-xs">
                          <div className="p-2.5 rounded-xl bg-white border border-stone-200 flex justify-between">
                            <span className="text-slate-600">Embassy Visa Application:</span>
                            <span className="font-bold text-slate-900">
                              {formatMoney(activeCountryData.preDeparture.visaFee)}
                            </span>
                          </div>
                          <div className="p-2.5 rounded-xl bg-white border border-stone-200 flex justify-between">
                            <span className="text-slate-600">Apostille / CIMEA / Translations:</span>
                            <span className="font-bold text-slate-900">
                              {formatMoney(activeCountryData.preDeparture.translationLegalization)}
                            </span>
                          </div>
                          <div className="p-2.5 rounded-xl bg-white border border-stone-200 flex justify-between">
                            <span className="text-slate-600">Student One-Way Flight:</span>
                            <span className="font-bold text-slate-900">
                              {formatMoney(activeCountryData.preDeparture.airfareEstimate)}
                            </span>
                          </div>
                          <div className="p-2.5 rounded-xl bg-white border border-stone-200 flex justify-between">
                            <span className="text-slate-600">Dormitory / Housing Security Deposit:</span>
                            <span className="font-bold text-slate-900">
                              {formatMoney(activeCountryData.preDeparture.initialDeposit)}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Counselor Part-Time Regulation Advisory Box */}
                      <div className="p-4 rounded-2xl bg-amber-100/80 border border-amber-300 space-y-2 text-xs">
                        <div className="flex items-center gap-1.5 font-bold text-[#5A1226]">
                          <PiggyBank className="w-4 h-4 text-[#5A1226]" />
                          <span>Student Work & Legal Regulations:</span>
                        </div>
                        <p className="text-slate-700 leading-relaxed font-medium">
                          {activeCountryData.legalWorkNotes}
                        </p>
                      </div>

                      {/* Copy / Email Calculator Dossier Action */}
                      <div className="pt-2 space-y-2">
                        <button
                          type="button"
                          onClick={handleCopyReport}
                          className="w-full py-2.5 px-4 rounded-xl bg-[#5A1226] hover:bg-[#721832] text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all shadow-xs"
                        >
                          <Copy className="w-3.5 h-3.5 text-[#E5A823]" />
                          <span>Copy This Custom Budget Dossier</span>
                        </button>
                      </div>

                    </div>

                  </div>

                  {/* Side-by-Side Dual Country Visual Cost Comparison Feature */}
                  <SideBySideBudgetComparator
                    destinations={destinations}
                    countryFinancialData={countryFinancialData}
                    calcCourseLevel={calcCourseLevel}
                    calcDiscipline={calcDiscipline}
                    calcCityTier={calcCityTier}
                    calcHousingType={calcHousingType}
                    calcLifestyleTier={calcLifestyleTier}
                    calcScholarshipPct={calcScholarshipPct}
                    calcPartTimeWeeklyHours={calcPartTimeWeeklyHours}
                    calcDurationYears={calcDurationYears}
                    selectedCurrency={selectedCurrency}
                    formatMoney={formatMoney}
                    showToast={showToast}
                    setActivePage={setActivePage}
                    defaultCountryA={calcCountry}
                    defaultCountryB={rec.secondary.id}
                  />

                  {/* 5-Destination Side-by-Side Quick Benchmark */}
                  <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-stone-200 shadow-sm space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <h5 className="font-black text-lg text-[#5A1226] flex items-center gap-2">
                          <Globe2 className="w-5 h-5 text-[#E5A823]" />
                          <span>Comparative Benchmark across All 5 Destinations ({dynamicBudget.courseDef.degreeTitle})</span>
                        </h5>
                        <p className="text-xs text-slate-500">
                          Click on any destination to immediately load its specific parameters into the interactive calculator above.
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
                      {destinations.map((dest) => {
                        const cInfo = countryFinancialData[dest.id] || countryFinancialData.italy;
                        const cCourse = cInfo.courseLevelDefaults[calcCourseLevel];
                        const isSelectedInCalc = dest.id === calcCountry;
                        return (
                          <div
                            key={dest.id}
                            onClick={() => {
                              setCalcCountry(dest.id);
                              setCalcDurationYears(cInfo.courseLevelDefaults[calcCourseLevel].defaultDurationYears);
                              showToast(`Switched calculator to ${dest.country}!`);
                            }}
                            className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                              isSelectedInCalc
                                ? 'bg-amber-50/80 border-[#5A1226] shadow-sm scale-[1.02]'
                                : 'bg-white border-stone-200 hover:border-[#E5A823]'
                            }`}
                          >
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-2xl">{dest.flagEmoji}</span>
                                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-stone-100 text-slate-700">
                                  {dest.code}
                                </span>
                              </div>
                              <div>
                                <h6 className="font-black text-xs text-slate-900">{dest.country}</h6>
                                <p className="text-[10px] text-slate-500 line-clamp-1">{cCourse.scholarshipPrograms}</p>
                              </div>
                            </div>

                            <div className="mt-3 pt-2 border-t border-stone-200/80 space-y-1 text-[11px]">
                              <div className="flex justify-between">
                                <span className="text-slate-500">Base Tuition:</span>
                                <span className="font-bold text-slate-800">{formatMoney(cCourse.baseAnnualTuitionUSD, dest.id)}/yr</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-slate-500">Living/Mo:</span>
                                <span className="font-bold text-amber-700">{formatMoney(cInfo.monthlyLivingBaseUSD.tier2.dorm + cInfo.monthlyLivingBaseUSD.tier2.food, dest.id)}</span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Bottom Action CTA in Budget Tab */}
                  <div className="p-6 rounded-3xl bg-gradient-to-r from-[#5A1226] to-[#450C1D] text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
                    <div>
                      <h5 className="font-black text-base text-amber-200">
                        Need an Official Financial Affidavit or Embassy Bank Statement Review?
                      </h5>
                      <p className="text-xs text-slate-200 mt-0.5">
                        Our counselors verify embassy bank balance compliance and prepare Italian DSU / Chinese CSC dossiers for zero rejection risk.
                      </p>
                    </div>
                    <button
                      onClick={() => setActivePage('contact')}
                      className="px-6 py-3 rounded-full bg-[#E5A823] hover:bg-[#d49515] text-[#5A1226] font-black text-xs sm:text-sm whitespace-nowrap shadow-md cursor-pointer transition-all hover:scale-105"
                    >
                      Book Free Financial Audit
                    </button>
                  </div>

                </div>
              )}

              {/* =========================================================================
                  TAB 3: PERSONALIZED SUGGESTIONS & STRATEGY SECTION
                 ========================================================================= */}
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
                    <div className="space-y-2.5">
                      {rec.suggestions.actionSteps.map((step, idx) => (
                        <div
                          key={idx}
                          className="p-3.5 rounded-xl bg-white border border-stone-200 flex items-start gap-3 shadow-2xs"
                        >
                          <div className="w-5 h-5 rounded-full bg-[#5A1226] text-white flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                            {idx + 1}
                          </div>
                          <p className="text-xs font-semibold text-slate-800 pt-0.5">{step}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Application Checklist */}
                  <div className="space-y-3 pt-2">
                    <h5 className="text-sm font-black text-[#5A1226] uppercase tracking-wider flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-[#E5A823]" />
                      <span>Required Document Checklist for {rec.primary.country}</span>
                    </h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {rec.suggestions.checklist.map((doc, idx) => (
                        <div
                          key={idx}
                          className="p-3 rounded-xl bg-[#FAF8F5] border border-stone-200 flex items-center gap-2.5 text-xs text-slate-700 font-medium"
                        >
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                          <span>{doc}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* =========================================================================
                  TAB 4: SHORTLISTED UNIVERSITIES
                 ========================================================================= */}
              {activeResultTab === 'universities' && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h4 className="text-xl font-black text-[#5A1226]">
                        Shortlisted Universities in {rec.primary.country}
                      </h4>
                      <p className="text-xs text-slate-500">
                        Top institutional recommendations tailored for {rec.selectedMajorName}.
                      </p>
                    </div>
                    <button
                      onClick={() => setActivePage('destinations', { destinationId: rec.primary.id, scrollToTop: true })}
                      className="px-4 py-2 rounded-full bg-[#5A1226] text-white text-xs font-bold self-start sm:self-auto cursor-pointer"
                    >
                      View Full {rec.primary.country} Directory →
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {rec.targetUniversities.map((uni, idx) => (
                      <div
                        key={idx}
                        className="p-5 rounded-2xl bg-[#FAF8F5] border border-stone-200 hover:border-[#E5A823] transition-all space-y-2 shadow-2xs"
                      >
                        <div className="flex items-center justify-between">
                          <span className="w-6 h-6 rounded-full bg-[#5A1226] text-white flex items-center justify-center text-xs font-bold">
                            {idx + 1}
                          </span>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                            Accredited Hub
                          </span>
                        </div>
                        <h5 className="font-bold text-sm text-slate-900 pt-1">{uni}</h5>
                        <p className="text-xs text-slate-500 font-medium">
                          Direct university application portal, scholarship pre-assessment & visa expedited pathway available.
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* =========================================================================
                  TAB 5: DESTINATION COMPARISON
                 ========================================================================= */}
              {activeResultTab === 'comparison' && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xl font-black text-[#5A1226]">
                        Head-to-Head: {rec.primary.country} vs {rec.secondary.country}
                      </h4>
                      <p className="text-xs text-slate-500">
                        Comparing your #1 matched pathway with your top alternative.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Primary Card */}
                    <div className="p-6 rounded-3xl bg-amber-50/60 border-2 border-[#5A1226] space-y-4 shadow-sm">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-4xl">{rec.primary.flagEmoji}</span>
                          <div>
                            <span className="text-[10px] font-black uppercase text-[#5A1226] bg-[#E5A823] px-2 py-0.5 rounded-full">
                              #1 Recommended
                            </span>
                            <h5 className="text-xl font-black text-slate-900">{rec.primary.country}</h5>
                          </div>
                        </div>
                        <span className="text-xl font-black text-[#5A1226]">{rec.matchPercentage}%</span>
                      </div>

                      <div className="space-y-2 text-xs divide-y divide-amber-200/60">
                        <div className="pt-2 flex justify-between">
                          <span className="text-slate-600 font-medium">Average Annual Tuition:</span>
                          <span className="font-bold text-slate-900">{rec.primary.avgTuition}</span>
                        </div>
                        <div className="pt-2 flex justify-between">
                          <span className="text-slate-600 font-medium">Monthly Living Cost:</span>
                          <span className="font-bold text-slate-900">{rec.primary.livingCost}</span>
                        </div>
                        <div className="pt-2 flex justify-between">
                          <span className="text-slate-600 font-medium">Work Allowance:</span>
                          <span className="font-bold text-slate-900">
                            {countryFinancialData[rec.primary.id]?.maxLegalHoursPerWeek || 20} hrs/week
                          </span>
                        </div>
                        <div className="pt-2 flex justify-between">
                          <span className="text-slate-600 font-medium">Primary Advantage:</span>
                          <span className="font-bold text-[#5A1226]">{rec.primary.highlightBadge}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          setCalcCountry(rec.primary.id);
                          setActiveResultTab('budget');
                        }}
                        className="w-full py-2.5 rounded-xl bg-[#5A1226] text-white font-bold text-xs hover:bg-[#721832] transition-colors cursor-pointer"
                      >
                        Calculate Costs for {rec.primary.country} →
                      </button>
                    </div>

                    {/* Secondary Card */}
                    <div className="p-6 rounded-3xl bg-white border-2 border-stone-200 space-y-4 shadow-sm">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-4xl">{rec.secondary.flagEmoji}</span>
                          <div>
                            <span className="text-[10px] font-black uppercase text-slate-600 bg-stone-100 px-2 py-0.5 rounded-full border border-stone-200">
                              #2 Runner-Up
                            </span>
                            <h5 className="text-xl font-black text-slate-900">{rec.secondary.country}</h5>
                          </div>
                        </div>
                        <span className="text-xl font-black text-slate-500">Alternative</span>
                      </div>

                      <div className="space-y-2 text-xs divide-y divide-stone-100">
                        <div className="pt-2 flex justify-between">
                          <span className="text-slate-600 font-medium">Average Annual Tuition:</span>
                          <span className="font-bold text-slate-900">{rec.secondary.avgTuition}</span>
                        </div>
                        <div className="pt-2 flex justify-between">
                          <span className="text-slate-600 font-medium">Monthly Living Cost:</span>
                          <span className="font-bold text-slate-900">{rec.secondary.livingCost}</span>
                        </div>
                        <div className="pt-2 flex justify-between">
                          <span className="text-slate-600 font-medium">Work Allowance:</span>
                          <span className="font-bold text-slate-900">
                            {countryFinancialData[rec.secondary.id]?.maxLegalHoursPerWeek || 15} hrs/week
                          </span>
                        </div>
                        <div className="pt-2 flex justify-between">
                          <span className="text-slate-600 font-medium">Primary Advantage:</span>
                          <span className="font-bold text-slate-900">{rec.secondary.highlightBadge}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          setCalcCountry(rec.secondary.id);
                          setActiveResultTab('budget');
                          showToast(`Switched calculator to ${rec.secondary.country}!`);
                        }}
                        className="w-full py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-slate-800 font-bold text-xs transition-colors cursor-pointer border border-stone-300"
                      >
                        Calculate Costs for {rec.secondary.country} →
                      </button>
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
