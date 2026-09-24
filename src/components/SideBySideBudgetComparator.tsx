import React, { useState, useMemo } from 'react';
import {
  ArrowLeftRight,
  TrendingDown,
  TrendingUp,
  Scale,
  GraduationCap,
  Building2,
  Coins,
  Briefcase,
  Plane,
  Copy,
  Sparkles,
  ArrowRight,
  Layers,
} from 'lucide-react';
import { StudyDestination } from '../types';

interface SideBySideBudgetComparatorProps {
  destinations?: StudyDestination[];
  countryFinancialData: Record<string, any>;
  calcCourseLevel: 'foundation' | 'bachelor' | 'master' | 'mbbs';
  calcDiscipline: 'general' | 'business' | 'tech_cs' | 'engineering' | 'medical';
  calcCityTier: 'tier1' | 'tier2';
  calcHousingType: 'dorm' | 'shared_flat' | 'private_studio';
  calcLifestyleTier: 'saver' | 'standard' | 'comfort';
  calcScholarshipPct: number;
  calcPartTimeWeeklyHours: number;
  calcDurationYears: number;
  selectedCurrency: 'USD' | 'EUR' | 'MMK' | 'LOCAL';
  formatMoney: (amountInUSD: number, countryKey?: string) => string;
  showToast: (message: string) => void;
  setActivePage: (page: string, params?: any) => void;
  defaultCountryA?: string;
  defaultCountryB?: string;
}

export const SideBySideBudgetComparator: React.FC<SideBySideBudgetComparatorProps> = ({
  countryFinancialData,
  calcCourseLevel,
  calcDiscipline,
  calcCityTier,
  calcHousingType,
  calcLifestyleTier,
  calcScholarshipPct,
  calcPartTimeWeeklyHours,
  calcDurationYears,
  formatMoney,
  showToast,
  setActivePage,
  defaultCountryA = 'italy',
  defaultCountryB = 'thailand',
}) => {
  const [countryA, setCountryA] = useState<string>(defaultCountryA);
  const [countryB, setCountryB] = useState<string>(defaultCountryB);
  const [compareHorizon, setCompareHorizon] = useState<'annual' | 'total'>('annual');

  // Compute metrics for any country
  const computeCountryBudget = (countryKey: string) => {
    const cData = countryFinancialData[countryKey] || countryFinancialData.italy;
    const courseDef = cData.courseLevelDefaults[calcCourseLevel] || cData.courseLevelDefaults.bachelor;
    const disciplineMult = cData.disciplineMultiplier[calcDiscipline] || 1.0;
    const livingTierData = cData.monthlyLivingBaseUSD[calcCityTier] || cData.monthlyLivingBaseUSD.tier2;

    const grossAnnualTuitionUSD = Math.round(courseDef.baseAnnualTuitionUSD * disciplineMult);
    const scholarshipDiscountUSD = Math.round(grossAnnualTuitionUSD * (calcScholarshipPct / 100));
    const netAnnualTuitionUSD = Math.max(0, grossAnnualTuitionUSD - scholarshipDiscountUSD);

    const monthlyHousingUSD =
      calcHousingType === 'dorm'
        ? livingTierData.dorm
        : calcHousingType === 'shared_flat'
        ? livingTierData.shared_flat
        : livingTierData.private_studio;

    const lifestyleMult = calcLifestyleTier === 'saver' ? 0.85 : calcLifestyleTier === 'comfort' ? 1.35 : 1.0;
    const monthlyFoodUSD = Math.round(livingTierData.food * lifestyleMult);
    const monthlyUtilitiesUSD = livingTierData.utilities;
    const monthlyTransitUSD = livingTierData.transit;
    const monthlyPersonalUSD = Math.round(75 * lifestyleMult);

    const monthlyLivingTotalUSD =
      monthlyHousingUSD + monthlyFoodUSD + monthlyUtilitiesUSD + monthlyTransitUSD + monthlyPersonalUSD;

    const annualLivingTotalUSD = monthlyLivingTotalUSD * 12;
    const annualHealthInsuranceUSD = livingTierData.healthAnnual;

    const effectiveWorkHours = Math.min(calcPartTimeWeeklyHours, cData.maxLegalHoursPerWeek);
    const monthlyPartTimeIncomeUSD = Math.round(effectiveWorkHours * 4.2 * cData.hourlyWageUSD);
    const annualPartTimeIncomeUSD = monthlyPartTimeIncomeUSD * 10;

    const annualGrossTotalUSD = grossAnnualTuitionUSD + annualLivingTotalUSD + annualHealthInsuranceUSD;
    const annualNetTotalUSD = Math.max(
      0,
      netAnnualTuitionUSD + annualLivingTotalUSD + annualHealthInsuranceUSD - annualPartTimeIncomeUSD
    );

    const durationYears = calcDurationYears;
    const fullDurationNetTotalUSD = annualNetTotalUSD * durationYears;
    const fullDurationGrossTotalUSD = annualGrossTotalUSD * durationYears;

    const preDepartureTotalUSD =
      cData.preDeparture.visaFee +
      cData.preDeparture.translationLegalization +
      cData.preDeparture.airfareEstimate +
      cData.preDeparture.initialDeposit;

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
      grandTotalAllInclusiveUSD: fullDurationNetTotalUSD + preDepartureTotalUSD,
    };
  };

  const budgetA = useMemo(() => computeCountryBudget(countryA), [countryA, calcCourseLevel, calcDiscipline, calcCityTier, calcHousingType, calcLifestyleTier, calcScholarshipPct, calcPartTimeWeeklyHours, calcDurationYears]);
  const budgetB = useMemo(() => computeCountryBudget(countryB), [countryB, calcCourseLevel, calcDiscipline, calcCityTier, calcHousingType, calcLifestyleTier, calcScholarshipPct, calcPartTimeWeeklyHours, calcDurationYears]);

  // Differential calculations
  const annualNetDiffUSD = budgetA.annualNetTotalUSD - budgetB.annualNetTotalUSD;
  const fullDurationNetDiffUSD = budgetA.fullDurationNetTotalUSD - budgetB.fullDurationNetTotalUSD;

  const handleSwap = () => {
    const temp = countryA;
    setCountryA(countryB);
    setCountryB(temp);
    showToast('Swapped comparison destinations!');
  };

  const handleCopyComparison = () => {
    const report = `=========================================
U EDUCATION SIDE-BY-SIDE BUDGET COMPARISON
=========================================
Selected Program Level: ${budgetA.courseDef.degreeTitle}
Duration: ${calcDurationYears} Academic Year(s)
Comparison Horizon: ${compareHorizon === 'annual' ? '1 Academic Year' : `${calcDurationYears}-Year Degree Total`}

[COUNTRY A] ${budgetA.cData.countryName.toUpperCase()} (${budgetA.cData.flag})
- Net Annual Tuition: $${budgetA.netAnnualTuitionUSD.toLocaleString()}
- Annual Living Costs: $${budgetA.annualLivingTotalUSD.toLocaleString()} ($${budgetA.monthlyLivingTotalUSD.toLocaleString()}/mo)
- Part-Time Earning Offset: -$${budgetA.annualPartTimeIncomeUSD.toLocaleString()} / year
- Net Annual Out-of-Pocket: $${budgetA.annualNetTotalUSD.toLocaleString()} / year
- ${calcDurationYears}-Year Degree Net Total: $${budgetA.fullDurationNetTotalUSD.toLocaleString()}
- Pre-Departure Startup: $${budgetA.preDepartureTotalUSD.toLocaleString()}

[COUNTRY B] ${budgetB.cData.countryName.toUpperCase()} (${budgetB.cData.flag})
- Net Annual Tuition: $${budgetB.netAnnualTuitionUSD.toLocaleString()}
- Annual Living Costs: $${budgetB.annualLivingTotalUSD.toLocaleString()} ($${budgetB.monthlyLivingTotalUSD.toLocaleString()}/mo)
- Part-Time Earning Offset: -$${budgetB.annualPartTimeIncomeUSD.toLocaleString()} / year
- Net Annual Out-of-Pocket: $${budgetB.annualNetTotalUSD.toLocaleString()} / year
- ${calcDurationYears}-Year Degree Net Total: $${budgetB.fullDurationNetTotalUSD.toLocaleString()}
- Pre-Departure Startup: $${budgetB.preDepartureTotalUSD.toLocaleString()}

[COMPARISON VERDICT]
Difference in Net Annual Out-of-Pocket: ${Math.abs(annualNetDiffUSD) === 0 ? 'Equal Cost' : `${annualNetDiffUSD < 0 ? budgetA.cData.countryName : budgetB.cData.countryName} is $${Math.abs(annualNetDiffUSD).toLocaleString()}/year cheaper.`}
Total ${calcDurationYears}-Year Degree Savings: $${Math.abs(fullDurationNetDiffUSD).toLocaleString()}

For personalized scholarship filing & bank verification: contact U Education Counselor.
=========================================`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(report);
      showToast('Side-by-side cost comparison copied to clipboard!');
    }
  };

  const countryOptions = [
    { id: 'italy', name: 'Italy', flag: '🇮🇹' },
    { id: 'thailand', name: 'Thailand', flag: '🇹🇭' },
    { id: 'china', name: 'China', flag: '🇨🇳' },
    { id: 'malaysia', name: 'Malaysia', flag: '🇲🇾' },
    { id: 'cambodia', name: 'Cambodia', flag: '🇰🇭' },
  ];

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-stone-200 shadow-lg space-y-7 animate-in fade-in duration-200">
      
      {/* Header & Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-stone-200">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-[#5A1226] text-[#E5A823] shadow-xs">
            <Scale className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-xl sm:text-2xl font-black text-[#5A1226]">
                Side-by-Side Dual Country Cost Comparison
              </h4>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 font-bold uppercase tracking-wider hidden sm:inline-block">
                Visual Delta
              </span>
            </div>
            <p className="text-xs text-slate-600 font-medium mt-0.5">
              Select any two countries to visualize the direct difference in estimated annual tuition, living expenses, and degree totals.
            </p>
          </div>
        </div>

        {/* Comparison Horizon Switcher */}
        <div className="flex items-center gap-2 bg-stone-100 p-1.5 rounded-2xl border border-stone-200 self-start lg:self-auto">
          <span className="text-[11px] font-bold text-slate-500 pl-2">Display:</span>
          <button
            type="button"
            onClick={() => setCompareHorizon('annual')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              compareHorizon === 'annual'
                ? 'bg-[#5A1226] text-white shadow-2xs'
                : 'text-slate-700 hover:bg-stone-200/80'
            }`}
          >
            1 Academic Year
          </button>
          <button
            type="button"
            onClick={() => setCompareHorizon('total')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              compareHorizon === 'total'
                ? 'bg-[#5A1226] text-white shadow-2xs'
                : 'text-slate-700 hover:bg-stone-200/80'
            }`}
          >
            Full {calcDurationYears}-Year Degree
          </button>
        </div>
      </div>

      {/* Country Selectors with Swap Button */}
      <div className="grid grid-cols-1 md:grid-cols-9 gap-4 items-center">
        
        {/* Country A Selection (4 cols) */}
        <div className="md:col-span-4 p-4 rounded-2xl bg-amber-50/70 border-2 border-amber-200 space-y-2">
          <label className="text-xs font-black uppercase tracking-wider text-[#5A1226] flex items-center justify-between">
            <span>Destination A (Baseline)</span>
            <span className="text-xs bg-[#5A1226] text-white px-2 py-0.5 rounded-md font-bold">
              {budgetA.cData.countryName} {budgetA.cData.flag}
            </span>
          </label>
          <div className="grid grid-cols-5 gap-1.5 pt-1">
            {countryOptions.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setCountryA(c.id)}
                className={`py-2 px-1 rounded-xl text-center border transition-all cursor-pointer ${
                  countryA === c.id
                    ? 'bg-[#5A1226] text-white border-[#5A1226] font-black shadow-xs scale-105'
                    : 'bg-white text-slate-700 border-stone-200 hover:bg-amber-100/50'
                }`}
              >
                <span className="text-lg block leading-none">{c.flag}</span>
                <span className="text-[10px] font-bold block mt-1 truncate">{c.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Swap Button (1 col) */}
        <div className="md:col-span-1 flex justify-center">
          <button
            type="button"
            onClick={handleSwap}
            title="Swap Destinations A and B"
            className="p-3 rounded-full bg-white hover:bg-[#5A1226] text-[#5A1226] hover:text-white border-2 border-stone-300 hover:border-[#5A1226] shadow-sm transition-all cursor-pointer active:scale-95"
          >
            <ArrowLeftRight className="w-4 h-4" />
          </button>
        </div>

        {/* Country B Selection (4 cols) */}
        <div className="md:col-span-4 p-4 rounded-2xl bg-stone-50 border-2 border-stone-200 space-y-2">
          <label className="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center justify-between">
            <span>Destination B (Comparison Target)</span>
            <span className="text-xs bg-slate-800 text-white px-2 py-0.5 rounded-md font-bold">
              {budgetB.cData.countryName} {budgetB.cData.flag}
            </span>
          </label>
          <div className="grid grid-cols-5 gap-1.5 pt-1">
            {countryOptions.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setCountryB(c.id)}
                className={`py-2 px-1 rounded-xl text-center border transition-all cursor-pointer ${
                  countryB === c.id
                    ? 'bg-slate-800 text-white border-slate-800 font-black shadow-xs scale-105'
                    : 'bg-white text-slate-700 border-stone-200 hover:bg-stone-100'
                }`}
              >
                <span className="text-lg block leading-none">{c.flag}</span>
                <span className="text-[10px] font-bold block mt-1 truncate">{c.name}</span>
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Visual Difference Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-500/15 via-[#5A1226]/10 to-amber-500/15 border-2 border-amber-300/80 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className={`p-3 rounded-2xl ${annualNetDiffUSD <= 0 ? 'bg-emerald-600 text-white' : 'bg-amber-600 text-white'} shadow-sm`}>
            {annualNetDiffUSD <= 0 ? <TrendingDown className="w-5 h-5" /> : <TrendingUp className="w-5 h-5" />}
          </div>
          <div>
            <span className="text-[11px] font-black uppercase tracking-wider text-[#5A1226] block">
              Direct Cost Differential ({compareHorizon === 'annual' ? '1 Year' : `${calcDurationYears} Years`})
            </span>
            <p className="text-base sm:text-lg font-black text-slate-900">
              {annualNetDiffUSD === 0 ? (
                <span>Both countries have identical net estimated out-of-pocket costs.</span>
              ) : annualNetDiffUSD < 0 ? (
                <span>
                  <strong>{budgetA.cData.countryName}</strong> is{' '}
                  <span className="text-emerald-700 underline font-black">
                    {formatMoney(Math.abs(compareHorizon === 'annual' ? annualNetDiffUSD : fullDurationNetDiffUSD))}
                  </span>{' '}
                  cheaper than <strong>{budgetB.cData.countryName}</strong>{' '}
                  ({Math.round((Math.abs(annualNetDiffUSD) / (budgetB.annualNetTotalUSD || 1)) * 100)}% savings)
                </span>
              ) : (
                <span>
                  <strong>{budgetB.cData.countryName}</strong> is{' '}
                  <span className="text-emerald-700 underline font-black">
                    {formatMoney(Math.abs(compareHorizon === 'annual' ? annualNetDiffUSD : fullDurationNetDiffUSD))}
                  </span>{' '}
                  cheaper than <strong>{budgetA.cData.countryName}</strong>{' '}
                  ({Math.round((Math.abs(annualNetDiffUSD) / (budgetA.annualNetTotalUSD || 1)) * 100)}% savings)
                </span>
              )}
            </p>
          </div>
        </div>

        {/* Quick Save Callout */}
        <div className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-xl border border-stone-200 shadow-2xs whitespace-nowrap">
          <Sparkles className="w-4 h-4 text-[#E5A823]" />
          <span className="text-xs font-bold text-slate-700">
            {calcDurationYears}-Year Degree Delta:{' '}
            <strong className="text-[#5A1226]">
              {formatMoney(Math.abs(fullDurationNetDiffUSD))}
            </strong>
          </span>
        </div>
      </div>

      {/* Visual Side-by-Side Comparison Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Country A Summary Box */}
        <div className="p-6 rounded-3xl bg-amber-50/50 border-2 border-[#5A1226] space-y-5 shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-amber-200">
            <div className="flex items-center gap-3">
              <span className="text-4xl">{budgetA.cData.flag}</span>
              <div>
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-[#5A1226] text-white">
                  Destination A
                </span>
                <h5 className="text-xl font-black text-slate-900 mt-0.5">{budgetA.cData.countryName}</h5>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-bold text-slate-500 uppercase block">
                {compareHorizon === 'annual' ? 'Net Annual Cost' : `${calcDurationYears}-Yr Degree Total`}
              </span>
              <p className="text-2xl font-black text-[#5A1226]">
                {formatMoney(compareHorizon === 'annual' ? budgetA.annualNetTotalUSD : budgetA.fullDurationNetTotalUSD, countryA)}
              </p>
            </div>
          </div>

          {/* Itemized Line Items for Country A */}
          <div className="space-y-2.5 text-xs">
            <div className="p-2.5 rounded-xl bg-white border border-stone-200 flex justify-between items-center">
              <span className="text-slate-600 font-medium flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-[#5A1226]" />
                Net Tuition ({calcScholarshipPct}% Scholarship):
              </span>
              <span className="font-bold text-slate-900">
                {formatMoney(compareHorizon === 'annual' ? budgetA.netAnnualTuitionUSD : budgetA.netAnnualTuitionUSD * calcDurationYears, countryA)}
              </span>
            </div>

            <div className="p-2.5 rounded-xl bg-white border border-stone-200 flex justify-between items-center">
              <span className="text-slate-600 font-medium flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-[#5A1226]" />
                Accommodation ({calcHousingType.replace('_', ' ')}):
              </span>
              <span className="font-bold text-slate-900">
                {formatMoney(compareHorizon === 'annual' ? budgetA.monthlyHousingUSD * 12 : budgetA.monthlyHousingUSD * 12 * calcDurationYears, countryA)}
                <span className="text-[10px] text-slate-500 font-normal"> ({formatMoney(budgetA.monthlyHousingUSD, countryA)}/mo)</span>
              </span>
            </div>

            <div className="p-2.5 rounded-xl bg-white border border-stone-200 flex justify-between items-center">
              <span className="text-slate-600 font-medium flex items-center gap-1.5">
                <Coins className="w-3.5 h-3.5 text-[#5A1226]" />
                Food, Groceries & Bills:
              </span>
              <span className="font-bold text-slate-900">
                {formatMoney(
                  compareHorizon === 'annual'
                    ? (budgetA.monthlyFoodUSD + budgetA.monthlyUtilitiesUSD + budgetA.monthlyTransitUSD) * 12
                    : (budgetA.monthlyFoodUSD + budgetA.monthlyUtilitiesUSD + budgetA.monthlyTransitUSD) * 12 * calcDurationYears,
                  countryA
                )}
              </span>
            </div>

            <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 flex justify-between items-center text-emerald-800">
              <span className="font-bold flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-emerald-600" />
                Part-Time Work Offset ({calcPartTimeWeeklyHours} hrs/wk):
              </span>
              <span className="font-black">
                - {formatMoney(compareHorizon === 'annual' ? budgetA.annualPartTimeIncomeUSD : budgetA.annualPartTimeIncomeUSD * calcDurationYears, countryA)}
              </span>
            </div>

            <div className="p-2.5 rounded-xl bg-white border border-stone-200 flex justify-between items-center">
              <span className="text-slate-600 font-medium flex items-center gap-1.5">
                <Plane className="w-3.5 h-3.5 text-slate-500" />
                Pre-Departure Startup Funds:
              </span>
              <span className="font-bold text-slate-800">
                {formatMoney(budgetA.preDepartureTotalUSD, countryA)}
              </span>
            </div>
          </div>

          {/* Strategic Highlight */}
          <div className="p-3 rounded-xl bg-amber-100/70 border border-amber-300 text-xs space-y-1">
            <span className="font-black text-[#5A1226] block">Key Advantage ({budgetA.cData.countryName}):</span>
            <p className="text-slate-700 font-medium">
              {budgetA.courseDef.scholarshipPrograms}. Max legal work: {budgetA.cData.maxLegalHoursPerWeek} hrs/week.
            </p>
          </div>
        </div>

        {/* Country B Summary Box */}
        <div className="p-6 rounded-3xl bg-stone-50 border-2 border-stone-300 space-y-5 shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-stone-200">
            <div className="flex items-center gap-3">
              <span className="text-4xl">{budgetB.cData.flag}</span>
              <div>
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-slate-800 text-white">
                  Destination B
                </span>
                <h5 className="text-xl font-black text-slate-900 mt-0.5">{budgetB.cData.countryName}</h5>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-bold text-slate-500 uppercase block">
                {compareHorizon === 'annual' ? 'Net Annual Cost' : `${calcDurationYears}-Yr Degree Total`}
              </span>
              <p className="text-2xl font-black text-slate-800">
                {formatMoney(compareHorizon === 'annual' ? budgetB.annualNetTotalUSD : budgetB.fullDurationNetTotalUSD, countryB)}
              </p>
            </div>
          </div>

          {/* Itemized Line Items for Country B */}
          <div className="space-y-2.5 text-xs">
            <div className="p-2.5 rounded-xl bg-white border border-stone-200 flex justify-between items-center">
              <span className="text-slate-600 font-medium flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-slate-700" />
                Net Tuition ({calcScholarshipPct}% Scholarship):
              </span>
              <span className="font-bold text-slate-900">
                {formatMoney(compareHorizon === 'annual' ? budgetB.netAnnualTuitionUSD : budgetB.netAnnualTuitionUSD * calcDurationYears, countryB)}
              </span>
            </div>

            <div className="p-2.5 rounded-xl bg-white border border-stone-200 flex justify-between items-center">
              <span className="text-slate-600 font-medium flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-slate-700" />
                Accommodation ({calcHousingType.replace('_', ' ')}):
              </span>
              <span className="font-bold text-slate-900">
                {formatMoney(compareHorizon === 'annual' ? budgetB.monthlyHousingUSD * 12 : budgetB.monthlyHousingUSD * 12 * calcDurationYears, countryB)}
                <span className="text-[10px] text-slate-500 font-normal"> ({formatMoney(budgetB.monthlyHousingUSD, countryB)}/mo)</span>
              </span>
            </div>

            <div className="p-2.5 rounded-xl bg-white border border-stone-200 flex justify-between items-center">
              <span className="text-slate-600 font-medium flex items-center gap-1.5">
                <Coins className="w-3.5 h-3.5 text-slate-700" />
                Food, Groceries & Bills:
              </span>
              <span className="font-bold text-slate-900">
                {formatMoney(
                  compareHorizon === 'annual'
                    ? (budgetB.monthlyFoodUSD + budgetB.monthlyUtilitiesUSD + budgetB.monthlyTransitUSD) * 12
                    : (budgetB.monthlyFoodUSD + budgetB.monthlyUtilitiesUSD + budgetB.monthlyTransitUSD) * 12 * calcDurationYears,
                  countryB
                )}
              </span>
            </div>

            <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 flex justify-between items-center text-emerald-800">
              <span className="font-bold flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-emerald-600" />
                Part-Time Work Offset ({calcPartTimeWeeklyHours} hrs/wk):
              </span>
              <span className="font-black">
                - {formatMoney(compareHorizon === 'annual' ? budgetB.annualPartTimeIncomeUSD : budgetB.annualPartTimeIncomeUSD * calcDurationYears, countryB)}
              </span>
            </div>

            <div className="p-2.5 rounded-xl bg-white border border-stone-200 flex justify-between items-center">
              <span className="text-slate-600 font-medium flex items-center gap-1.5">
                <Plane className="w-3.5 h-3.5 text-slate-500" />
                Pre-Departure Startup Funds:
              </span>
              <span className="font-bold text-slate-800">
                {formatMoney(budgetB.preDepartureTotalUSD, countryB)}
              </span>
            </div>
          </div>

          {/* Strategic Highlight */}
          <div className="p-3 rounded-xl bg-stone-100 border border-stone-300 text-xs space-y-1">
            <span className="font-black text-slate-800 block">Key Advantage ({budgetB.cData.countryName}):</span>
            <p className="text-slate-700 font-medium">
              {budgetB.courseDef.scholarshipPrograms}. Max legal work: {budgetB.cData.maxLegalHoursPerWeek} hrs/week.
            </p>
          </div>
        </div>

      </div>

      {/* Visual Cost Proportion Bars */}
      <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-stone-200 space-y-4">
        <h5 className="text-xs font-black text-[#5A1226] uppercase tracking-wider flex items-center gap-2">
          <Layers className="w-4 h-4 text-[#E5A823]" />
          <span>Annual Cost Composition Breakdown (Tuition vs Living Expenses)</span>
        </h5>

        <div className="space-y-4 text-xs">
          
          {/* Bar A */}
          <div className="space-y-1.5">
            <div className="flex justify-between font-bold text-slate-800">
              <span>{budgetA.cData.flag} {budgetA.cData.countryName}</span>
              <span>Total Gross: {formatMoney(budgetA.annualGrossTotalUSD, countryA)}/yr</span>
            </div>
            <div className="h-4 w-full bg-stone-200 rounded-full overflow-hidden flex">
              <div
                style={{
                  width: `${Math.max(5, (budgetA.netAnnualTuitionUSD / (budgetA.annualGrossTotalUSD || 1)) * 100)}%`,
                }}
                className="bg-[#5A1226] text-white text-[9px] font-bold flex items-center justify-center truncate"
                title={`Tuition: ${formatMoney(budgetA.netAnnualTuitionUSD, countryA)}`}
              >
                Tuition
              </div>
              <div
                style={{
                  width: `${Math.max(5, (budgetA.annualLivingTotalUSD / (budgetA.annualGrossTotalUSD || 1)) * 100)}%`,
                }}
                className="bg-[#E5A823] text-[#5A1226] text-[9px] font-bold flex items-center justify-center truncate"
                title={`Living: ${formatMoney(budgetA.annualLivingTotalUSD, countryA)}`}
              >
                Living
              </div>
            </div>
          </div>

          {/* Bar B */}
          <div className="space-y-1.5">
            <div className="flex justify-between font-bold text-slate-800">
              <span>{budgetB.cData.flag} {budgetB.cData.countryName}</span>
              <span>Total Gross: {formatMoney(budgetB.annualGrossTotalUSD, countryB)}/yr</span>
            </div>
            <div className="h-4 w-full bg-stone-200 rounded-full overflow-hidden flex">
              <div
                style={{
                  width: `${Math.max(5, (budgetB.netAnnualTuitionUSD / (budgetB.annualGrossTotalUSD || 1)) * 100)}%`,
                }}
                className="bg-slate-800 text-white text-[9px] font-bold flex items-center justify-center truncate"
                title={`Tuition: ${formatMoney(budgetB.netAnnualTuitionUSD, countryB)}`}
              >
                Tuition
              </div>
              <div
                style={{
                  width: `${Math.max(5, (budgetB.annualLivingTotalUSD / (budgetB.annualGrossTotalUSD || 1)) * 100)}%`,
                }}
                className="bg-amber-400 text-slate-900 text-[9px] font-bold flex items-center justify-center truncate"
                title={`Living: ${formatMoney(budgetB.annualLivingTotalUSD, countryB)}`}
              >
                Living
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Action Footer */}
      <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
        <button
          type="button"
          onClick={handleCopyComparison}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-slate-800 font-bold text-xs border border-stone-300 transition-all cursor-pointer"
        >
          <Copy className="w-4 h-4 text-[#5A1226]" />
          <span>Copy Side-by-Side Comparison Dossier</span>
        </button>

        <button
          type="button"
          onClick={() => setActivePage('contact')}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#5A1226] hover:bg-[#721832] text-white font-bold text-xs shadow-md transition-all cursor-pointer"
        >
          <span>Get Free University Shortlist & Financial Review</span>
          <ArrowRight className="w-4 h-4 text-[#E5A823]" />
        </button>
      </div>

    </div>
  );
};
