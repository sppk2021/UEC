export interface AgencyInfo {
  name: string;
  shortName: string;
  tagline: string;
  phone: string;
  cleanPhone: string;
  whatsappNumber: string;
  email: string;
  viberNumber: string;
  workingHours: string;
  ethicalPledge: string;
}

export interface HeroContent {
  brandLine1: string;
  brandLine2: string;
  pillTagline: string;
  summaryText: string;
  acceptingIntakesText: string;
  imageUrl: string;
}

export interface IntroContent {
  leadText: string;
  supportingText: string;
  affirmationText: string;
  imageUrl: string;
}

export interface StudyDestination {
  id: string;
  country: string;
  code: string;
  flagEmoji: string;
  tagline: string;
  description: string;
  highlightBadge: string;
  scholarshipInfo: string;
  avgTuition: string;
  livingCost: string;
  languageReq: string;
  intakes: string[];
  popularPrograms: string[];
  topUniversities: string[];
  flagColors: string[];
  bgGradient: string;
}

export interface CoreService {
  id: string;
  title: string;
  tag: string;
  description: string;
  iconName: string;
  benefits: string[];
  deliverables: string[];
}

export interface OfficeLocation {
  id: string;
  city: string;
  country: string;
  title: string;
  address: string;
  phone: string;
  email: string;
  role: string;
  hours: string;
  landmark: string;
  landmarkImage: string;
  statusBadge: string;
  coordinates?: { lat: number; lng: number };
}

export interface PartnerCompany {
  id: string;
  name: string;
  subtitle: string;
  badge: string;
  description: string;
  yearEstablished?: string;
  location: string;
  keyServices: string[];
  accentColor: string;
}

export interface PillarItem {
  title: string;
  tag: string;
  description: string;
}

export interface PillarsData {
  vision: PillarItem;
  mission: PillarItem;
  commitment: PillarItem;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export interface LeadItem {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  currentEducation: string;
  targetDestination: string;
  targetMajor: string;
  preferredOffice: string;
  englishTest?: string;
  intakeYear?: string;
  notes?: string;
  status: 'new' | 'contacted' | 'enrolled' | 'archived';
  createdAt: string;
}

export interface ConsultationRequest {
  id?: string;
  fullName: string;
  phone: string;
  email: string;
  currentEducation: string;
  targetDestination: string;
  targetMajor: string;
  preferredOffice: string;
  englishTest?: string;
  intakeYear?: string;
  notes?: string;
  createdAt?: string;
}

export interface WebsiteData {
  agencyInfo: AgencyInfo;
  heroContent: HeroContent;
  introContent: IntroContent;
  services: CoreService[];
  destinations: StudyDestination[];
  offices: OfficeLocation[];
  partners: PartnerCompany[];
  pillars: PillarsData;
  faqs: FaqItem[];
  leads: LeadItem[];
  adminPasscode: string;
  lastUpdated: string;
}

