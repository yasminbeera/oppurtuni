export type PageType = 
  | 'landing'
  | 'auth'
  | 'dashboard'
  | 'create-profile'
  | 'onboarding'
  | 'ai-search'
  | 'opportunities'
  | 'opportunity-details'
  | 'skill-gap'
  | 'career-insights'
  | 'post-opportunity'
  | 'application-tracker'
  | 'saved-opportunities'
  | 'profile-settings'
  | 'settings';

export type OpportunityCategory = 
  | 'All' 
  | 'Internships' 
  | 'Jobs' 
  | 'Hackathons' 
  | 'Meetups' 
  | 'Fellowships' 
  | 'Competitions' 
  | 'Scholarships' 
  | 'Workshops';

export type ApplicationStage = 
  | 'Opportunity' 
  | 'Saved' 
  | 'Applying' 
  | 'Applied' 
  | 'Assessment' 
  | 'Interview' 
  | 'Selected' 
  | 'Rejected';

export type ApplicationStatus = ApplicationStage;

export interface CompanyProfile {
  id: string;
  name: string;
  logo: string;
  website: string;
  about: string;
  industry: string;
  location: string;
  size: string;
  type: string;
  verified: boolean;
  activeOpportunitiesCount: number;
  commonlySoughtSkills: string[];
}

export interface Opportunity {
  id: string;
  title: string;
  company: string;
  companyLogo: string;
  logoBg?: string;
  location: string;
  workMode: 'Remote' | 'On-site' | 'Hybrid' | 'Online';
  type: 'Internship' | 'Job' | 'Hackathon' | 'Meetup' | 'Fellowship' | 'Competition' | 'Scholarship' | 'Workshop';
  matchPercentage: number;
  deadlineDays: number;
  deadlineDate: string;
  duration?: string;
  stipend?: string;
  tags: string[];
  whyFits: string[];
  requiredSkills: string[];
  preferredSkills?: string[];
  eligibility: string;
  about: string;
  overview: string;
  responsibilities?: string[];
  whatYouWillLearn?: string[];
  benefits?: string[];
  saved: boolean;
  applied: boolean;
  applicationStatus?: ApplicationStatus;
  appliedDate?: string;
  interviewDate?: string;
  platformSource?: string;
  isDirectCompanyPost?: boolean;
  postedDate?: string;
  openings?: number;
  applicationLink?: string;
  contactEmail?: string;
  applicationProcess?: string[];
  // Event & Hackathon specifics
  speakers?: string[];
  topics?: string[];
  capacity?: string;
  teamSize?: string;
  prizePool?: string;
  theme?: string;
  startDate?: string;
  endDate?: string;
}

export interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  college: string;
  year: string;
  skills: string[];
  interests: string[];
  preferredLocation: string;
  opportunityTypes: string[];
  profileCompleted: number;
  resumeName?: string;
  phone?: string;
  bio?: string;
  githubUrl?: string;
  linkedinUrl?: string;
}

export interface LearningItem {
  id: string;
  title: string;
  duration: string;
  provider: string;
  skill: string;
  status: 'Not Started' | 'In Progress' | 'Completed';
  progress: number;
  rating: number;
}

export interface SkillGapAnalysis {
  opportunityId: string;
  roleTitle: string;
  company: string;
  matchPercentage: number;
  currentSkills: string[];
  missingSkills: string[];
  learningItems: LearningItem[];
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'profile' | 'saved' | 'match' | 'deadline' | 'info';
  read: boolean;
  actionPage?: PageType;
  actionLabel?: string;
}

export interface AgentStatus {
  id: string;
  name: string;
  role: string;
  description: string;
  status: 'Completed' | 'In Progress' | 'Pending';
  platforms?: string[];
  progressPercent: number;
}
