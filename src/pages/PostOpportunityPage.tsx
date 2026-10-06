import React, { useState } from 'react';
import { 
  Briefcase, 
  GraduationCap, 
  Trophy, 
  Calendar, 
  Star, 
  Compass, 
  Sparkles, 
  Plus, 
  X, 
  Check, 
  ArrowRight, 
  Building2, 
  MapPin, 
  Globe, 
  Mail, 
  Clock, 
  DollarSign, 
  FileText, 
  CheckCircle2, 
  Eye, 
  Layers, 
  Megaphone,
  Flame,
  Award,
  Users,
  Send,
  Zap,
  Tag
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Opportunity, OpportunityCategory } from '../types';
import { MatchBadge, DeadlineBadge } from '../components/common/Badge';

export const PostOpportunityPage: React.FC = () => {
  const { postOpportunity, navigateTo } = useApp();

  // Opportunity Type Selection
  const [selectedType, setSelectedType] = useState<Opportunity['type']>('Internship');

  // Company Information
  const [companyName, setCompanyName] = useState('Acme Technologies');
  const [companyLogo, setCompanyLogo] = useState('https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=100&auto=format&fit=crop&q=60');
  const [companyWebsite, setCompanyWebsite] = useState('https://acme.tech');
  const [companyIndustry, setCompanyIndustry] = useState('Software & Artificial Intelligence');
  const [companyLocation, setCompanyLocation] = useState('Bangalore, India');
  const [companyType, setCompanyType] = useState('Startup');
  const [companyDescription, setCompanyDescription] = useState('Fast-growing product studio building next-generation AI tools.');

  // Opportunity Details
  const [title, setTitle] = useState('Full Stack AI Engineering Intern');
  const [workMode, setWorkMode] = useState<'Remote' | 'On-site' | 'Hybrid' | 'Online'>('Remote');
  const [location, setLocation] = useState('Bangalore / Remote');
  const [duration, setDuration] = useState('3 Months (Summer 2025)');
  const [stipend, setStipend] = useState('₹45,000 / month');
  const [deadlineDate, setDeadlineDate] = useState('30 April 2025');
  const [deadlineDays, setDeadlineDays] = useState(24);
  const [openings, setOpenings] = useState(3);
  const [experienceLevel, setExperienceLevel] = useState('Students / Freshers');
  const [applicationLink, setApplicationLink] = useState('https://acme.tech/careers');
  const [contactEmail, setContactEmail] = useState('careers@acme.tech');
  const [shortDescription, setShortDescription] = useState('Build intelligent agentic web applications using React, TypeScript, and modern LLM APIs.');
  const [responsibilities, setResponsibilities] = useState('Design responsive UI workflows in React and integrate autonomous backend agents.');
  const [learningOutcomes, setLearningOutcomes] = useState('Production TypeScript, LLM orchestration, scalable system architecture & CI/CD deployment.');
  const [benefits, setBenefits] = useState('Stipend, Pre-Placement Offer (PPO) potential, certificate, flexible working hours & 1-on-1 engineering mentorship.');

  // Event & Hackathon specifics
  const [eventDate, setEventDate] = useState('15 May 2025');
  const [eventTime, setEventTime] = useState('6:00 PM - 8:30 PM IST');
  const [speakers, setSpeakers] = useState('Dr. Sarah Chen (AI Principal), Alex Kumar (Staff Engineer)');
  const [topics, setTopics] = useState('Agentic AI, TypeScript 5.5, RAG Systems in Production');
  const [prizePool, setPrizePool] = useState('₹2,50,000 in Cash & Cloud Credits');
  const [teamSize, setTeamSize] = useState('2 - 4 Members');
  const [theme, setTheme] = useState('AI for Student Productivity & Career Acceleration');

  // Interactive Skills
  const [requiredSkills, setRequiredSkills] = useState<string[]>(['React', 'TypeScript', 'Node.js', 'Python']);
  const [newRequiredSkill, setNewRequiredSkill] = useState('');
  const [preferredSkills, setPreferredSkills] = useState<string[]>(['Git', 'Tailwind CSS', 'Docker', 'FastAPI']);
  const [newPreferredSkill, setNewPreferredSkill] = useState('');

  // Eligibility
  const [educationLevel, setEducationLevel] = useState('B.Tech / B.E / BCA / MCA / BS in CS or related field');
  const [yearOfStudy, setYearOfStudy] = useState('2nd, 3rd or Final Year students');

  // Publish Status
  const [isPublished, setIsPublished] = useState(false);
  const [publishedOppId, setPublishedOppId] = useState<string>('');

  const typeCards: { 
    type: Opportunity['type']; 
    label: string; 
    icon: React.ReactNode; 
    desc: string; 
    colorBg: string;
    colorText: string;
  }[] = [
    { 
      type: 'Job', 
      label: 'Job', 
      icon: <Briefcase className="w-5 h-5" />, 
      desc: 'Early career & full-time roles',
      colorBg: 'bg-softblue-100 text-softblue-700',
      colorText: 'text-softblue-700'
    },
    { 
      type: 'Internship', 
      label: 'Internship', 
      icon: <GraduationCap className="w-5 h-5" />, 
      desc: 'Summer, winter & semester roles',
      colorBg: 'bg-emerald-100 text-emerald-700',
      colorText: 'text-emerald-700'
    },
    { 
      type: 'Hackathon', 
      label: 'Hackathon', 
      icon: <Trophy className="w-5 h-5" />, 
      desc: 'Contests, prizes & innovation',
      colorBg: 'bg-rose-100 text-rose-700',
      colorText: 'text-rose-700'
    },
    { 
      type: 'Meetup', 
      label: 'Event / Meetup', 
      icon: <Calendar className="w-5 h-5" />, 
      desc: 'Webinars, tech talks & network',
      colorBg: 'bg-indigo-100 text-indigo-700',
      colorText: 'text-indigo-700'
    },
    { 
      type: 'Competition', 
      label: 'Competition', 
      icon: <Flame className="w-5 h-5" />, 
      desc: 'Case studies, coding & quizzes',
      colorBg: 'bg-amber-100 text-amber-700',
      colorText: 'text-amber-700'
    },
    { 
      type: 'Fellowship', 
      label: 'Fellowship', 
      icon: <Star className="w-5 h-5" />, 
      desc: 'Funded programs & grants',
      colorBg: 'bg-lavender-100 text-lavender-700',
      colorText: 'text-lavender-700'
    },
    { 
      type: 'Workshop', 
      label: 'Workshop', 
      icon: <Compass className="w-5 h-5" />, 
      desc: 'Hands-on practical training',
      colorBg: 'bg-pink-100 text-pink-700',
      colorText: 'text-pink-700'
    },
  ];

  const handleAddRequiredSkill = () => {
    if (newRequiredSkill.trim() && !requiredSkills.includes(newRequiredSkill.trim())) {
      setRequiredSkills([...requiredSkills, newRequiredSkill.trim()]);
      setNewRequiredSkill('');
    }
  };

  const handleRemoveRequiredSkill = (skill: string) => {
    setRequiredSkills(requiredSkills.filter(s => s !== skill));
  };

  const handleAddPreferredSkill = () => {
    if (newPreferredSkill.trim() && !preferredSkills.includes(newPreferredSkill.trim())) {
      setPreferredSkills([...preferredSkills, newPreferredSkill.trim()]);
      setNewPreferredSkill('');
    }
  };

  const handleRemovePreferredSkill = (skill: string) => {
    setPreferredSkills(preferredSkills.filter(s => s !== skill));
  };

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();

    const newOpportunityData: Omit<Opportunity, 'id' | 'saved' | 'applied'> = {
      title,
      company: companyName,
      companyLogo,
      location,
      workMode,
      type: selectedType,
      matchPercentage: 92,
      deadlineDays: Number(deadlineDays) || 15,
      deadlineDate,
      duration,
      stipend,
      tags: [selectedType, workMode, ...(requiredSkills.slice(0, 3))],
      whyFits: [
        `High demand for ${requiredSkills[0] || 'core engineering'} skills matching your profile`,
        `Opportunity at verified partner ${companyName}`,
        `Includes practical ownership and mentorship`
      ],
      requiredSkills,
      preferredSkills,
      eligibility: `${educationLevel} • ${yearOfStudy}`,
      about: shortDescription || `${companyName} is hosting an opportunity for passionate students.`,
      overview: responsibilities,
      whatYouWillLearn: [learningOutcomes],
      benefits: [benefits],
      isDirectCompanyPost: true,
      postedDate: 'Just now',
      openings,
      applicationLink,
      contactEmail,
      applicationProcess: ['Online Application Submission', 'Short Technical Screening', 'Final Interview & Selection'],
      // Extra attributes for events/hackathons
      prizePool: selectedType === 'Hackathon' ? prizePool : undefined,
      teamSize: selectedType === 'Hackathon' ? teamSize : undefined,
      theme: selectedType === 'Hackathon' ? theme : undefined,
      speakers: selectedType === 'Meetup' ? [speakers] : undefined,
      topics: selectedType === 'Meetup' ? [topics] : undefined,
      startDate: eventDate,
    };

    postOpportunity(newOpportunityData);
    setIsPublished(true);
  };

  return (
    <div className="w-full space-y-6 sm:space-y-8 animate-in fade-in duration-200">
      
      {/* 1. Header with Visual Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-lavender-700 via-purple-700 to-indigo-700 p-6 sm:p-8 text-white shadow-xl shadow-lavender-600/25">
        <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-gradient-to-l from-white/10 to-transparent pointer-events-none" />
        <div className="absolute -right-6 -bottom-6 w-52 h-52 bg-mint-400/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-2 right-20 w-32 h-32 bg-pink-400/20 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/20 text-white text-xs font-bold backdrop-blur-xs shadow-2xs">
              <Megaphone className="w-3.5 h-3.5 text-mint-300" />
              <span>Company & Organizer Publishing Suite</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight">
              Post an Opportunity
            </h1>

            <p className="text-xs sm:text-sm text-lavender-100 leading-relaxed">
              Share your opportunity with students looking for their next career move. Connect directly with high-intent talent across 60+ universities.
            </p>
          </div>

          {/* Visual: Company -> Opportunity -> Student Pipeline */}
          <div className="bg-white/15 backdrop-blur-md rounded-2xl p-4 border border-white/20 flex items-center gap-3 sm:gap-4 self-start lg:self-center shadow-lg">
            <div className="flex flex-col items-center text-center">
              <div className="w-10 h-10 rounded-xl bg-white text-lavender-700 flex items-center justify-center font-bold shadow-xs">
                <Building2 className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-extrabold text-white mt-1">Company</span>
            </div>

            <ArrowRight className="w-4 h-4 text-mint-300 animate-pulse" />

            <div className="flex flex-col items-center text-center">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-mint-400 to-emerald-500 text-slate-900 flex items-center justify-center font-bold shadow-xs">
                <Sparkles className="w-5 h-5 text-slate-900" />
              </div>
              <span className="text-[10px] font-extrabold text-mint-300 mt-1">Opportunity</span>
            </div>

            <ArrowRight className="w-4 h-4 text-mint-300 animate-pulse" />

            <div className="flex flex-col items-center text-center">
              <div className="w-10 h-10 rounded-xl bg-white text-indigo-700 flex items-center justify-center font-bold shadow-xs">
                <GraduationCap className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-extrabold text-white mt-1">Students</span>
            </div>
          </div>
        </div>
      </div>

      {/* Success Notification Banner after posting */}
      {isPublished && (
        <div className="bg-emerald-50 border-2 border-emerald-300 rounded-3xl p-6 shadow-card animate-in zoom-in-95 duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center font-bold shadow-md shadow-emerald-500/30 flex-shrink-0">
              <Check className="w-7 h-7 stroke-[3]" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-emerald-950">✓ Opportunity Published Successfully!</h3>
              <p className="text-xs text-emerald-800 mt-0.5">
                "{title}" is now live and actively discoverable by students in the Oppurtuni network.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigateTo('opportunities')}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-500/20 transition-all flex items-center gap-1.5"
            >
              <span>View in Opportunities Feed</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setIsPublished(false)}
              className="px-4 py-2.5 rounded-xl bg-white text-slate-700 hover:bg-slate-100 text-xs font-bold border border-slate-200"
            >
              Post Another
            </button>
          </div>
        </div>
      )}

      {/* Main 12-Column Grid: Form (8 Cols) + Sticky Live Preview (4 Cols) */}
      <form onSubmit={handlePublish} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column (8 Cols): Structured Opportunity Form */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Section 1: Select Opportunity Type */}
          <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-7 border border-lavender-200/80 shadow-card space-y-4">
            <div>
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-lavender-100 text-lavender-700 flex items-center justify-center text-xs font-extrabold">1</span>
                <span>What would you like to post?</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">Choose the type of opportunity you are publishing</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3">
              {typeCards.map(c => {
                const isSelected = selectedType === c.type;
                return (
                  <button
                    key={c.type}
                    type="button"
                    onClick={() => setSelectedType(c.type)}
                    className={`p-3.5 rounded-2xl border text-left transition-all relative flex flex-col justify-between group ${
                      isSelected
                        ? 'bg-lavender-50/90 border-lavender-500 shadow-sm shadow-lavender-500/10 ring-2 ring-lavender-500/20'
                        : 'bg-white border-slate-200/90 hover:border-lavender-300 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className={`p-2 rounded-xl ${c.colorBg} shadow-2xs group-hover:scale-110 transition-transform`}>
                        {c.icon}
                      </div>
                      {isSelected && (
                        <span className="w-5 h-5 rounded-full bg-lavender-600 text-white flex items-center justify-center text-xs font-bold">
                          ✓
                        </span>
                      )}
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900">{c.label}</h4>
                      <p className="text-[10px] text-slate-500 mt-0.5 leading-snug">{c.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 2: Company / Organizer Information */}
          <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-7 border border-lavender-200/80 shadow-card space-y-5">
            <div>
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-lavender-100 text-lavender-700 flex items-center justify-center text-xs font-extrabold">2</span>
                <span>Company / Organizer Information</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">Students see this verified company profile</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Company / Organization Name</label>
                <div className="relative">
                  <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g. Google, Microsoft, DevFolio"
                    className="w-full pl-10 pr-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-lavender-500/20 focus:border-lavender-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Company Logo Image URL</label>
                <input
                  type="url"
                  value={companyLogo}
                  onChange={(e) => setCompanyLogo(e.target.value)}
                  placeholder="https://... logo url"
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-lavender-500/20 focus:border-lavender-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Website URL</label>
                <div className="relative">
                  <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="url"
                    value={companyWebsite}
                    onChange={(e) => setCompanyWebsite(e.target.value)}
                    placeholder="https://company.com"
                    className="w-full pl-10 pr-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-lavender-500/20 focus:border-lavender-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Industry / Domain</label>
                <input
                  type="text"
                  value={companyIndustry}
                  onChange={(e) => setCompanyIndustry(e.target.value)}
                  placeholder="e.g. Fintech, AI, EdTech, Cloud"
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-lavender-500/20 focus:border-lavender-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Company HQ Location</label>
                <div className="relative">
                  <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={companyLocation}
                    onChange={(e) => setCompanyLocation(e.target.value)}
                    placeholder="e.g. Bangalore, India / Remote"
                    className="w-full pl-10 pr-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-lavender-500/20 focus:border-lavender-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Organization Type</label>
                <select
                  value={companyType}
                  onChange={(e) => setCompanyType(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-lavender-500/20 focus:border-lavender-500 cursor-pointer"
                >
                  <option>Startup</option>
                  <option>MNC / Enterprise</option>
                  <option>University / Institute</option>
                  <option>NGO / Non-Profit</option>
                  <option>Developer Community</option>
                  <option>Government Body</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">About the Organization</label>
              <textarea
                rows={2}
                value={companyDescription}
                onChange={(e) => setCompanyDescription(e.target.value)}
                placeholder="Brief summary of your mission and workplace culture..."
                className="w-full p-3 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-lavender-500/20 focus:border-lavender-500"
              />
            </div>
          </div>

          {/* Section 3: Opportunity Details */}
          <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-7 border border-lavender-200/80 shadow-card space-y-5">
            <div>
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-lavender-100 text-lavender-700 flex items-center justify-center text-xs font-extrabold">3</span>
                <span>Opportunity Details</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">Define role parameters, responsibilities, compensation and dates</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Opportunity Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Software Engineering Intern / React Native Developer"
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-lavender-500/20 focus:border-lavender-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Work Mode</label>
                <div className="grid grid-cols-4 gap-2">
                  {(['Remote', 'Hybrid', 'On-site', 'Online'] as const).map(mode => (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => setWorkMode(mode)}
                      className={`py-2 px-2 text-xs font-bold rounded-xl border transition-all ${
                        workMode === mode
                          ? 'bg-lavender-600 text-white border-lavender-600 shadow-2xs'
                          : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Location / City</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Bangalore, Mumbai, Remote"
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-lavender-500/20 focus:border-lavender-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Duration / Program Length</label>
                <input
                  type="text"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  placeholder="e.g. 3 Months / 6 Months / Full-Time"
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-lavender-500/20 focus:border-lavender-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Stipend / Salary / Prize</label>
                <input
                  type="text"
                  value={stipend}
                  onChange={(e) => setStipend(e.target.value)}
                  placeholder="e.g. ₹40,000 / month or ₹8 - 12 LPA"
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-lavender-500/20 focus:border-lavender-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Application Deadline Date</label>
                <input
                  type="text"
                  value={deadlineDate}
                  onChange={(e) => setDeadlineDate(e.target.value)}
                  placeholder="e.g. 30 April 2025"
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-lavender-500/20 focus:border-lavender-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Days Remaining (Urgency)</label>
                <input
                  type="number"
                  min="1"
                  max="90"
                  value={deadlineDays}
                  onChange={(e) => setDeadlineDays(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-lavender-500/20 focus:border-lavender-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Number of Openings</label>
                <input
                  type="number"
                  min="1"
                  value={openings}
                  onChange={(e) => setOpenings(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-lavender-500/20 focus:border-lavender-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Experience Level</label>
                <select
                  value={experienceLevel}
                  onChange={(e) => setExperienceLevel(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-lavender-500/20 focus:border-lavender-500 cursor-pointer"
                >
                  <option>Students / Freshers</option>
                  <option>0 - 1 Years Experience</option>
                  <option>1 - 3 Years Experience</option>
                  <option>Open to All</option>
                </select>
              </div>
            </div>

            {/* Hackathon specifics */}
            {selectedType === 'Hackathon' && (
              <div className="p-4 rounded-2xl bg-rose-50/60 border border-rose-200 space-y-3 animate-in fade-in">
                <h4 className="text-xs font-extrabold text-rose-900 uppercase tracking-wider">Hackathon Parameters</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Prize Pool</label>
                    <input
                      type="text"
                      value={prizePool}
                      onChange={(e) => setPrizePool(e.target.value)}
                      placeholder="e.g. ₹5,00,000 Cash"
                      className="w-full p-2 text-xs bg-white border border-slate-200 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Team Size</label>
                    <input
                      type="text"
                      value={teamSize}
                      onChange={(e) => setTeamSize(e.target.value)}
                      placeholder="e.g. 2 - 4 Members"
                      className="w-full p-2 text-xs bg-white border border-slate-200 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Theme / Track</label>
                    <input
                      type="text"
                      value={theme}
                      onChange={(e) => setTheme(e.target.value)}
                      placeholder="e.g. Generative AI & Web3"
                      className="w-full p-2 text-xs bg-white border border-slate-200 rounded-lg"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Event / Meetup specifics */}
            {selectedType === 'Meetup' && (
              <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-200 space-y-3 animate-in fade-in">
                <h4 className="text-xs font-extrabold text-indigo-900 uppercase tracking-wider">Event & Meetup Schedule</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Event Date & Time</label>
                    <input
                      type="text"
                      value={`${eventDate} • ${eventTime}`}
                      onChange={(e) => setEventDate(e.target.value)}
                      className="w-full p-2 text-xs bg-white border border-slate-200 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Featured Speakers</label>
                    <input
                      type="text"
                      value={speakers}
                      onChange={(e) => setSpeakers(e.target.value)}
                      placeholder="Speakers names & roles"
                      className="w-full p-2 text-xs bg-white border border-slate-200 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Agenda / Topics</label>
                    <input
                      type="text"
                      value={topics}
                      onChange={(e) => setTopics(e.target.value)}
                      placeholder="Key session topics"
                      className="w-full p-2 text-xs bg-white border border-slate-200 rounded-lg"
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Short Overview / Pitch</label>
                <textarea
                  rows={2}
                  value={shortDescription}
                  onChange={(e) => setShortDescription(e.target.value)}
                  placeholder="Summary for student opportunity cards..."
                  className="w-full p-3 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-lavender-500/20 focus:border-lavender-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Key Responsibilities & Project Scope</label>
                <textarea
                  rows={2}
                  value={responsibilities}
                  onChange={(e) => setResponsibilities(e.target.value)}
                  placeholder="What will the student build, analyze or deliver?"
                  className="w-full p-3 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-lavender-500/20 focus:border-lavender-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Perks & Learning Benefits</label>
                <textarea
                  rows={2}
                  value={benefits}
                  onChange={(e) => setBenefits(e.target.value)}
                  placeholder="Mentorship, PPO, certificates, stipend perks..."
                  className="w-full p-3 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-lavender-500/20 focus:border-lavender-500"
                />
              </div>
            </div>
          </div>

          {/* Section 4: Required & Preferred Skills (Interactive Selector) */}
          <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-7 border border-lavender-200/80 shadow-card space-y-5">
            <div>
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-lavender-100 text-lavender-700 flex items-center justify-center text-xs font-extrabold">4</span>
                <span>Required & Preferred Skills</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">Students are match-ranked against these exact skill tags</p>
            </div>

            {/* Required Skills */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-800">
                Required Skills ({requiredSkills.length}) <span className="text-rose-500">*</span>
              </label>
              
              <div className="flex flex-wrap gap-2 p-3 bg-lavender-50/50 rounded-2xl border border-lavender-200">
                {requiredSkills.map(skill => (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-1.5 px-3 py-1 bg-white text-lavender-800 border border-lavender-300 rounded-xl text-xs font-bold shadow-2xs"
                  >
                    <span>{skill}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveRequiredSkill(skill)}
                      className="hover:text-rose-600 transition-colors"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                ))}
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Type a required skill (e.g. Next.js, Docker, Java)"
                  value={newRequiredSkill}
                  onChange={(e) => setNewRequiredSkill(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddRequiredSkill();
                    }
                  }}
                  className="flex-1 px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-lavender-500/20 focus:border-lavender-500"
                />
                <button
                  type="button"
                  onClick={handleAddRequiredSkill}
                  className="px-4 py-2 rounded-xl bg-lavender-100 hover:bg-lavender-200 text-lavender-800 text-xs font-bold border border-lavender-200 flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Skill</span>
                </button>
              </div>
            </div>

            {/* Preferred Skills */}
            <div className="space-y-2 pt-2 border-t border-lavender-100">
              <label className="block text-xs font-bold text-slate-800">
                Preferred / Nice-to-have Skills ({preferredSkills.length})
              </label>
              
              <div className="flex flex-wrap gap-2 p-3 bg-slate-50 rounded-2xl border border-slate-200">
                {preferredSkills.map(skill => (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-1.5 px-3 py-1 bg-white text-slate-700 border border-slate-200 rounded-xl text-xs font-semibold shadow-2xs"
                  >
                    <span>{skill}</span>
                    <button
                      type="button"
                      onClick={() => handleRemovePreferredSkill(skill)}
                      className="hover:text-rose-600 transition-colors"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                ))}
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Add preferred skill (e.g. Figma, CI/CD, GraphQL)"
                  value={newPreferredSkill}
                  onChange={(e) => setNewPreferredSkill(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddPreferredSkill();
                    }
                  }}
                  className="flex-1 px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-lavender-500/20 focus:border-lavender-500"
                />
                <button
                  type="button"
                  onClick={handleAddPreferredSkill}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold border border-slate-200 flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add</span>
                </button>
              </div>
            </div>
          </div>

          {/* Section 5: Eligibility & Application Links */}
          <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-7 border border-lavender-200/80 shadow-card space-y-4">
            <div>
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-lavender-100 text-lavender-700 flex items-center justify-center text-xs font-extrabold">5</span>
                <span>Eligibility & Application Submission</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">Where and how students should apply</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Target Degree / Branch</label>
                <input
                  type="text"
                  value={educationLevel}
                  onChange={(e) => setEducationLevel(e.target.value)}
                  placeholder="e.g. B.Tech in CSE / IT / ECE"
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-lavender-500/20 focus:border-lavender-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Target Year of Study</label>
                <input
                  type="text"
                  value={yearOfStudy}
                  onChange={(e) => setYearOfStudy(e.target.value)}
                  placeholder="e.g. 2025 / 2026 Batch, Pre-final Year"
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-lavender-500/20 focus:border-lavender-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Direct Application URL</label>
                <div className="relative">
                  <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="url"
                    value={applicationLink}
                    onChange={(e) => setApplicationLink(e.target.value)}
                    placeholder="https://company.com/apply"
                    className="w-full pl-10 pr-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-lavender-500/20 focus:border-lavender-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Recruiter / Contact Email</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder="recruiter@company.com"
                    className="w-full pl-10 pr-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-lavender-500/20 focus:border-lavender-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Action Post Buttons */}
          <div className="bg-white/90 backdrop-blur-md rounded-3xl p-5 sm:p-6 border border-lavender-200/80 shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Listing will be indexed across the Oppurtuni network immediately.</span>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => navigateTo('opportunities')}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-bold transition-all"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-7 py-3 rounded-2xl bg-gradient-to-r from-lavender-700 via-purple-600 to-indigo-600 hover:opacity-95 text-white text-xs sm:text-sm font-extrabold shadow-lg shadow-lavender-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Post Opportunity Now</span>
              </button>
            </div>
          </div>

        </div>

        {/* Right Column (4 Cols): Sticky Real-Time Student Preview Card */}
        <div className="lg:col-span-4 space-y-5">
          <div className="bg-white/95 backdrop-blur-md rounded-3xl p-5 sm:p-6 border border-lavender-200/90 shadow-card space-y-4 sticky top-20">
            <div className="flex items-center justify-between border-b border-lavender-100 pb-3">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-lavender-600" />
                <h3 className="text-sm font-extrabold text-slate-900">Live Student Preview</h3>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                Live Card
              </span>
            </div>

            <p className="text-xs text-slate-500">
              This is how your opportunity will appear in the student discover feed:
            </p>

            {/* Rendered Opportunity Card Preview */}
            <div className="bg-white rounded-3xl p-5 border-2 border-lavender-300 shadow-md space-y-4 relative overflow-hidden">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 min-w-0">
                  <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-200 p-2 flex items-center justify-center flex-shrink-0 shadow-2xs">
                    <img
                      src={companyLogo}
                      alt={companyName}
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-lavender-100 text-lavender-800 text-[10px] font-extrabold mb-1">
                      <span>⚡ Direct Post</span>
                    </div>
                    <h4 className="text-sm font-extrabold text-slate-900 leading-snug truncate">
                      {title || 'Untitled Opportunity'}
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5 truncate">{companyName} • {location}</p>
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5">
                <span className="px-2.5 py-0.5 rounded-lg bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
                  {selectedType}
                </span>
                <span className="px-2.5 py-0.5 rounded-lg bg-softblue-50 text-softblue-700 text-[10px] font-bold border border-softblue-200">
                  {workMode}
                </span>
                <span className="px-2.5 py-0.5 rounded-lg bg-slate-100 text-slate-700 text-[10px] font-semibold">
                  {duration}
                </span>
              </div>

              {/* Required Skills list */}
              <div className="space-y-1 pt-1">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Required Skills</span>
                <div className="flex flex-wrap gap-1">
                  {requiredSkills.slice(0, 4).map(sk => (
                    <span key={sk} className="text-[10px] font-bold px-2 py-0.5 bg-lavender-50 text-lavender-700 rounded-md border border-lavender-200">
                      {sk}
                    </span>
                  ))}
                  {requiredSkills.length > 4 && (
                    <span className="text-[10px] text-slate-400 font-bold">+{requiredSkills.length - 4} more</span>
                  )}
                </div>
              </div>

              {/* Badges & Deadline */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                <div className="flex items-center gap-1.5">
                  <MatchBadge percentage={92} />
                  <DeadlineBadge days={Number(deadlineDays) || 15} />
                </div>
                <span className="text-[11px] font-bold text-emerald-700">{stipend}</span>
              </div>

              <div className="pt-2">
                <div className="w-full py-2 bg-gradient-to-r from-lavender-700 to-indigo-600 text-white rounded-xl text-xs font-bold text-center shadow-xs">
                  View & Apply
                </div>
              </div>
            </div>

            {/* Publishing Perks Info */}
            <div className="p-3.5 bg-mint-50/70 border border-mint-200 rounded-2xl space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-900">
                <Zap className="w-3.5 h-3.5 text-emerald-600" />
                <span>Instant Student Matching</span>
              </div>
              <p className="text-[11px] text-emerald-800 leading-relaxed">
                Our AI engine will notify students with verified {requiredSkills.slice(0, 2).join(' and ')} skills immediately upon submission.
              </p>
            </div>
          </div>
        </div>

      </form>

    </div>
  );
};
