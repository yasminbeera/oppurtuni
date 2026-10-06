import React, { useState, useMemo } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  Upload, 
  Plus, 
  X, 
  Check, 
  Sparkles, 
  FileText, 
  Building2, 
  MapPin, 
  GraduationCap, 
  CheckCircle2, 
  AlertTriangle, 
  Mail, 
  Phone, 
  Globe, 
  Award, 
  Briefcase, 
  Trash2, 
  Download, 
  ExternalLink, 
  BrainCircuit, 
  TrendingUp,
  Info
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ProjectItem, CertificationItem, PublicPlatformItem } from '../types';
import confetti from 'canvas-confetti';

export const CreateProfilePage: React.FC = () => {
  const { 
    userProfile, 
    updateUserProfile, 
    verifyEmail, 
    verifyPhone, 
    addProject, 
    deleteProject, 
    addCertification, 
    deleteCertification, 
    updatePublicPlatforms, 
    navigateTo, 
    goBack, 
    showToast 
  } = useApp();

  const [activeSection, setActiveSection] = useState<'basic' | 'platforms' | 'skills' | 'projects' | 'resume' | 'analysis'>('basic');

  // Basic Form States - Starting EMPTY
  const [fullName, setFullName] = useState(userProfile.name || '');
  const [email, setEmail] = useState(userProfile.email || '');
  const [phone, setPhone] = useState(userProfile.phone || '');
  const [college, setCollege] = useState(userProfile.college || '');
  const [year, setYear] = useState(userProfile.year || '1st Year');
  const [cgpa, setCgpa] = useState(userProfile.cgpa || '');
  const [preferredLocation, setPreferredLocation] = useState(userProfile.preferredLocation || '');

  // Verification Modals
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [isPhoneModalOpen, setIsPhoneModalOpen] = useState(false);
  const [emailCode, setEmailCode] = useState('');
  const [phoneCode, setPhoneCode] = useState('');

  // Platforms - Empty by default
  const platformOptions = ['GitHub', 'LinkedIn', 'LeetCode', 'CodeChef', 'HackerRank', 'Kaggle', 'Behance', 'Dribbble', 'Portfolio', 'Other'];
  const [platforms, setPlatforms] = useState<PublicPlatformItem[]>(userProfile.publicPlatforms || []);
  const [newPlatformType, setNewPlatformType] = useState('GitHub');
  const [newPlatformUrl, setNewPlatformUrl] = useState('');

  // Skills & Interests - Empty selection initially
  const allPopularSkills = [
    'React', 'Python', 'Java', 'JavaScript', 'SQL', 'Machine Learning', 'UI/UX',
    'TypeScript', 'C++', 'Node.js', 'Next.js', 'Tailwind CSS', 'FastAPI', 'HTML', 'CSS', 
    'Figma', 'Data Science', 'Cloud', 'Cybersecurity', 'Product Management', 'Git', 'Docker', 
    'PostgreSQL', 'GraphQL'
  ];

  const allPopularInterests = [
    'Artificial Intelligence', 'Web Development', 'Data Science', 'Cybersecurity', 
    'Startups', 'Research', 'Design', 'Product', 'Finance', 'Robotics', 'Open Source', 
    'Mobile Apps', 'Cloud Computing'
  ];

  const [skills, setSkills] = useState<string[]>(userProfile.skills || []);
  const [customSkillInput, setCustomSkillInput] = useState('');
  const [interests, setInterests] = useState<string[]>(userProfile.interests || []);

  // Projects - Empty by default
  const [projectsList, setProjectsList] = useState<ProjectItem[]>(userProfile.projects || []);
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [projName, setProjName] = useState('');
  const [projDesc, setProjDesc] = useState('');
  const [projTech, setProjTech] = useState('');
  const [projGithub, setProjGithub] = useState('');
  const [projLink, setProjLink] = useState('');

  // Certifications - Empty by default
  const [certificationsList, setCertificationsList] = useState<CertificationItem[]>(userProfile.certifications || []);
  const [isAddingCert, setIsAddingCert] = useState(false);
  const [certName, setCertName] = useState('');
  const [certIssuer, setCertIssuer] = useState('');
  const [certDate, setCertDate] = useState('');
  const [certId, setCertId] = useState('');
  const [certUrl, setCertUrl] = useState('');

  // Resume & Portfolio - Empty by default
  const [resumeFileName, setResumeFileName] = useState<string | null>(userProfile.resumeName || null);
  const [isPortfolioModalOpen, setIsPortfolioModalOpen] = useState(false);

  // Dynamic AI Profile Analysis computed directly from what user has entered
  const profileAnalysis = useMemo(() => {
    let score = 0;
    const missingSections: string[] = [];

    if (fullName.trim()) score += 15; else missingSections.push('Full Name');
    if (email.trim()) score += 10; else missingSections.push('Email Address');
    if (college.trim()) score += 10; else missingSections.push('College / University');
    if (cgpa.trim()) score += 5;
    if (preferredLocation.trim()) score += 5;
    if (userProfile.emailVerified) score += 5;
    if (userProfile.phoneVerified) score += 5;
    
    if (skills.length > 0) {
      score += Math.min(20, skills.length * 4);
    } else {
      missingSections.push('Skills');
    }

    if (interests.length > 0) {
      score += 5;
    } else {
      missingSections.push('Domain Interests');
    }

    if (platforms.length > 0) score += 5;
    if (projectsList.length > 0) score += Math.min(10, projectsList.length * 5); else missingSections.push('Projects');
    if (certificationsList.length > 0) score += 5;
    if (resumeFileName) score += 5;

    const completeness = Math.min(100, score);

    const strengths: string[] = [];
    if (skills.length > 0) {
      strengths.push(`Active Proficiencies: ${skills.slice(0, 3).join(', ')}`);
    }
    if (projectsList.length > 0) {
      strengths.push(`Practical Project Experience (${projectsList.length} ${projectsList.length === 1 ? 'project' : 'projects'} built)`);
    }
    if (platforms.length > 0) {
      strengths.push(`Public Developer Handles (${platforms.map(p => p.platform).join(', ')})`);
    }
    if (certificationsList.length > 0) {
      strengths.push(`Verified Credentials (${certificationsList.length} completed)`);
    }

    const recommended = ['System Design Basics', 'TypeScript & Cloud APIs', 'Git Workflows & CI/CD'];
    const readiness = completeness >= 80 
      ? 'High (Ready for Top Tier Opportunities)' 
      : completeness >= 50 
      ? 'Moderate (Ready for Internship Discovery)' 
      : completeness > 0 
      ? 'Building Foundation' 
      : 'Profile Not Started';

    return {
      completeness,
      missingSections,
      strengths,
      recommended,
      readiness,
      careerDirection: interests.length > 0 ? `${interests.join(' & ')} Specialist` : 'Software Engineer & Tech Professional',
      matchPower: `${completeness}%`
    };
  }, [fullName, email, college, cgpa, preferredLocation, skills, interests, platforms, projectsList, certificationsList, resumeFileName, userProfile.emailVerified, userProfile.phoneVerified]);

  // Handler functions
  const handleSaveBasic = () => {
    updateUserProfile({
      name: fullName,
      email,
      phone,
      college,
      year,
      cgpa,
      preferredLocation,
      profileCompleted: profileAnalysis.completeness
    });
  };

  const handleToggleSkill = (skill: string) => {
    if (skills.includes(skill)) {
      const updated = skills.filter(s => s !== skill);
      setSkills(updated);
      updateUserProfile({ skills: updated });
    } else {
      const updated = [...skills, skill];
      setSkills(updated);
      updateUserProfile({ skills: updated });
    }
  };

  const handleAddCustomSkill = () => {
    if (customSkillInput.trim() && !skills.includes(customSkillInput.trim())) {
      const updated = [...skills, customSkillInput.trim()];
      setSkills(updated);
      updateUserProfile({ skills: updated });
      setCustomSkillInput('');
      showToast(`Added skill "${customSkillInput.trim()}"`, 'success');
    }
  };

  const handleToggleInterest = (interest: string) => {
    if (interests.includes(interest)) {
      const updated = interests.filter(i => i !== interest);
      setInterests(updated);
      updateUserProfile({ interests: updated });
    } else {
      const updated = [...interests, interest];
      setInterests(updated);
      updateUserProfile({ interests: updated });
    }
  };

  const handleAddPlatform = () => {
    if (!newPlatformUrl.trim()) return;
    const updated = [...platforms, { platform: newPlatformType, url: newPlatformUrl.trim() }];
    setPlatforms(updated);
    updatePublicPlatforms(updated);
    setNewPlatformUrl('');
  };

  const handleRemovePlatform = (index: number) => {
    const updated = platforms.filter((_, i) => i !== index);
    setPlatforms(updated);
    updatePublicPlatforms(updated);
  };

  const handleSaveNewProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projName.trim()) return;
    const newProj: ProjectItem = {
      id: `proj-${Date.now()}`,
      name: projName.trim(),
      description: projDesc.trim(),
      tech: projTech.split(',').map(t => t.trim()).filter(Boolean),
      github: projGithub.trim() || undefined,
      link: projLink.trim() || undefined,
      startDate: '2025',
      endDate: 'Present'
    };
    const updated = [newProj, ...projectsList];
    setProjectsList(updated);
    addProject(newProj);
    setIsAddingProject(false);
    setProjName('');
    setProjDesc('');
    setProjTech('');
    setProjGithub('');
    setProjLink('');
  };

  const handleDeleteProj = (id: string) => {
    const updated = projectsList.filter(p => p.id !== id);
    setProjectsList(updated);
    deleteProject(id);
  };

  const handleSaveNewCert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!certName.trim()) return;
    const newCert: CertificationItem = {
      id: `cert-${Date.now()}`,
      name: certName.trim(),
      issuer: certIssuer.trim() || 'Certificate Issuer',
      issueDate: certDate.trim() || '2025',
      credentialId: certId.trim() || undefined,
      credentialUrl: certUrl.trim() || undefined
    };
    const updated = [newCert, ...certificationsList];
    setCertificationsList(updated);
    addCertification(newCert);
    setIsAddingCert(false);
    setCertName('');
    setCertIssuer('');
    setCertDate('');
    setCertId('');
    setCertUrl('');
  };

  const handleDeleteCert = (id: string) => {
    const updated = certificationsList.filter(c => c.id !== id);
    setCertificationsList(updated);
    deleteCertification(id);
  };

  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setResumeFileName(file.name);
      updateUserProfile({ resumeName: file.name });
      showToast(`✓ Uploaded "${file.name}"`, 'success');
      try {
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
      } catch {}
    }
  };

  const handleRemoveResume = () => {
    setResumeFileName(null);
    updateUserProfile({ resumeName: undefined });
    showToast('Resume removed', 'info');
  };

  const navTabs: { id: typeof activeSection; label: string; icon: React.ReactNode }[] = [
    { id: 'basic', label: '1. Basic Details', icon: <GraduationCap className="w-4 h-4" /> },
    { id: 'platforms', label: '2. Public Platforms', icon: <Globe className="w-4 h-4" /> },
    { id: 'skills', label: '3. Skills & Interests', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'projects', label: '4. Projects & Certs', icon: <Briefcase className="w-4 h-4" /> },
    { id: 'resume', label: '5. Resume & Portfolio', icon: <FileText className="w-4 h-4" /> },
    { id: 'analysis', label: '6. AI Profile Analysis', icon: <BrainCircuit className="w-4 h-4" /> },
  ];

  return (
    <div className="w-full space-y-6 animate-in fade-in duration-200">
      
      {/* Top Header Card */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/90 backdrop-blur-md p-4 sm:p-5 rounded-3xl border border-lavender-200/80 shadow-card">
        <div className="flex items-center gap-3">
          <button
            onClick={goBack}
            className="p-2.5 rounded-2xl bg-slate-50 border border-lavender-200 text-slate-600 hover:text-slate-900 hover:bg-lavender-50 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              <span>Complete Profile Builder</span>
              <span className="text-xs bg-lavender-100 text-lavender-800 px-2.5 py-0.5 rounded-full font-bold">
                {profileAnalysis.matchPower} Power
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">
              Build your verified talent profile and unlock high-match AI opportunity discovery
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setIsPortfolioModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-lavender-50 hover:bg-lavender-100 text-lavender-800 border border-lavender-200 font-bold text-xs shadow-2xs transition-all cursor-pointer"
          >
            <Download className="w-4 h-4 text-lavender-600" />
            <span>Download Portfolio</span>
          </button>

          <button
            onClick={() => {
              handleSaveBasic();
              navigateTo('ai-search');
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-lavender-700 via-indigo-600 to-softblue-600 hover:opacity-95 text-white font-bold text-xs shadow-md shadow-lavender-500/25 transition-all cursor-pointer"
          >
            <span>Launch AI Scout</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Progress Meter Bar */}
      <div className="bg-white/90 p-4 rounded-2xl border border-lavender-200/80 shadow-xs flex items-center justify-between gap-4">
        <div className="flex-1 space-y-1.5">
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="text-slate-800">Profile Completeness</span>
            <span className="text-lavender-700">{profileAnalysis.completeness}% Completed</span>
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-gradient-to-r from-lavender-600 via-indigo-600 to-mint-500 h-full rounded-full transition-all duration-500" 
              style={{ width: `${profileAnalysis.completeness}%` }}
            />
          </div>
        </div>
        <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-xl border border-emerald-200 shrink-0">
          ✓ {profileAnalysis.readiness}
        </span>
      </div>

      {/* Main Grid: Section Tabs on Left (4 Cols), Active Form on Right (8 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Section Tabs Navigation */}
        <div className="lg:col-span-4 bg-white/95 backdrop-blur-md rounded-3xl p-3 border border-lavender-200/80 shadow-card space-y-1">
          {navTabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveSection(tab.id)}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeSection === tab.id
                  ? 'bg-gradient-to-r from-lavender-700 via-indigo-600 to-softblue-600 text-white font-bold shadow-md shadow-lavender-500/20'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-lavender-50/70'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className={activeSection === tab.id ? 'text-white' : 'text-lavender-600'}>
                  {tab.icon}
                </span>
                <span>{tab.label}</span>
              </div>
              {activeSection === tab.id && <ArrowRight className="w-4 h-4" />}
            </button>
          ))}
        </div>

        {/* Active Section Content Panel */}
        <div className="lg:col-span-8 bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-lavender-200/80 shadow-card space-y-6">
          
          {/* SECTION 1: BASIC DETAILS */}
          {activeSection === 'basic' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="space-y-1">
                <h3 className="text-base font-extrabold text-slate-900">Basic & Academic Information</h3>
                <p className="text-xs text-slate-500">Provide your verified student credentials</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-700">Full Name</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Ananya Sharma"
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-lavender-500/20 focus:border-lavender-500 placeholder:text-slate-400"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-700">College / University</label>
                  <input
                    type="text"
                    value={college}
                    onChange={(e) => setCollege(e.target.value)}
                    placeholder="e.g. VIT University"
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-lavender-500/20 focus:border-lavender-500 placeholder:text-slate-400"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-700">Graduation Year / Batch</label>
                  <select
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white"
                  >
                    <option value="1st Year">1st Year (2028 Batch)</option>
                    <option value="2nd Year">2nd Year (2027 Batch)</option>
                    <option value="3rd Year">3rd Year (2026 Batch)</option>
                    <option value="4th Year">4th Year (2025 Batch)</option>
                    <option value="Recent Graduate">Recent Graduate</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-700">Cumulative GPA / CGPA</label>
                  <input
                    type="text"
                    value={cgpa}
                    onChange={(e) => setCgpa(e.target.value)}
                    placeholder="e.g. 8.6"
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white placeholder:text-slate-400"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-700">Preferred Location</label>
                  <input
                    type="text"
                    value={preferredLocation}
                    onChange={(e) => setPreferredLocation(e.target.value)}
                    placeholder="e.g. Hyderabad, Telangana"
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white placeholder:text-slate-400"
                  />
                </div>

                {/* Email with Verification Status */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold text-slate-700">Email Address</label>
                    {userProfile.emailVerified ? (
                      <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-0.5">
                        <CheckCircle2 className="w-3 h-3" /> Verified
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          if (!email.trim()) {
                            showToast('Please enter an email address first', 'info');
                            return;
                          }
                          setIsEmailModalOpen(true);
                        }}
                        className="text-[11px] font-bold text-lavender-700 hover:underline cursor-pointer"
                      >
                        Verify Email
                      </button>
                    )}
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. ananya.sharma@gmail.com"
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white placeholder:text-slate-400"
                  />
                </div>

                {/* Phone with Verification Status */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold text-slate-700">Mobile Number</label>
                    {userProfile.phoneVerified ? (
                      <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-0.5">
                        <CheckCircle2 className="w-3 h-3" /> Verified
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          if (!phone.trim()) {
                            showToast('Please enter a mobile number first', 'info');
                            return;
                          }
                          setIsPhoneModalOpen(true);
                        }}
                        className="text-[11px] font-bold text-lavender-700 hover:underline cursor-pointer"
                      >
                        Verify Number
                      </button>
                    )}
                  </div>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. +91 98765 43210"
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white placeholder:text-slate-400"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => {
                    handleSaveBasic();
                    setActiveSection('platforms');
                  }}
                  className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-lavender-700 to-indigo-600 text-white text-xs font-bold shadow-md shadow-lavender-500/25 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Next: Public Platforms</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* SECTION 2: PUBLIC PLATFORMS */}
          {activeSection === 'platforms' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="space-y-1">
                <h3 className="text-base font-extrabold text-slate-900">Public Coding & Portfolio Platforms</h3>
                <p className="text-xs text-slate-500">Connect your developer handles to strengthen your profile verification</p>
              </div>

              {/* Existing Platforms List or Empty State */}
              <div className="space-y-3">
                {platforms.length > 0 ? (
                  platforms.map((plat, idx) => (
                    <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-8 h-8 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-700 font-bold text-xs shrink-0">
                          {plat.platform.slice(0, 2).toUpperCase()}
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-slate-800">{plat.platform}</p>
                          <a 
                            href={plat.url} 
                            target="_blank" 
                            rel="noreferrer" 
                            className="text-[11px] text-lavender-700 hover:underline truncate block"
                          >
                            {plat.url}
                          </a>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <a
                          href={plat.url}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-500 hover:text-slate-800 cursor-pointer"
                          title="Open profile"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                        <button
                          type="button"
                          onClick={() => handleRemovePlatform(idx)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 cursor-pointer"
                          title="Remove"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-6 text-center border border-dashed border-slate-200 rounded-2xl bg-slate-50/50">
                    <Globe className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                    <p className="text-xs font-bold text-slate-600">No public platform handles linked yet</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">Add your GitHub, LinkedIn, or coding profile URLs below</p>
                  </div>
                )}
              </div>

              {/* Add New Platform */}
              <div className="p-4 rounded-2xl bg-lavender-50/70 border border-lavender-200/80 space-y-3">
                <span className="block text-xs font-bold text-lavender-900">Add Public Profile Link</span>
                <div className="flex flex-col sm:flex-row items-center gap-2.5">
                  <select
                    value={newPlatformType}
                    onChange={(e) => setNewPlatformType(e.target.value)}
                    className="w-full sm:w-40 px-3 py-2 text-xs bg-white border border-lavender-200 rounded-xl focus:bg-white font-bold"
                  >
                    {platformOptions.map(p => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>

                  <input
                    type="url"
                    placeholder={
                      newPlatformType === 'GitHub' 
                        ? 'e.g. https://github.com/yourusername'
                        : newPlatformType === 'LinkedIn'
                        ? 'e.g. https://linkedin.com/in/yourusername'
                        : newPlatformType === 'LeetCode'
                        ? 'e.g. https://leetcode.com/u/yourusername'
                        : newPlatformType === 'CodeChef'
                        ? 'e.g. https://codechef.com/users/yourusername'
                        : newPlatformType === 'Portfolio'
                        ? 'e.g. https://yourportfolio.com'
                        : `e.g. https://${newPlatformType.toLowerCase()}.com/yourusername`
                    }
                    value={newPlatformUrl}
                    onChange={(e) => setNewPlatformUrl(e.target.value)}
                    className="flex-1 w-full px-3 py-2 text-xs bg-white border border-lavender-200 rounded-xl focus:bg-white placeholder:text-slate-400"
                  />

                  <button
                    type="button"
                    onClick={handleAddPlatform}
                    disabled={!newPlatformUrl.trim()}
                    className="w-full sm:w-auto px-4 py-2 rounded-xl bg-gradient-to-r from-lavender-700 to-indigo-600 text-white font-bold text-xs disabled:opacity-40 cursor-pointer"
                  >
                    Add Link
                  </button>
                </div>
              </div>

              <div className="flex justify-between pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setActiveSection('basic')}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-xs font-bold text-slate-700 cursor-pointer"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setActiveSection('skills')}
                  className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-lavender-700 to-indigo-600 text-white text-xs font-bold shadow-md shadow-lavender-500/25 flex items-center gap-2 cursor-pointer"
                >
                  <span>Next: Skills & Interests</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* SECTION 3: SKILLS & INTERESTS */}
          {activeSection === 'skills' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="space-y-1">
                <h3 className="text-base font-extrabold text-slate-900">Technical Skills & Domain Interests</h3>
                <p className="text-xs text-slate-500">Select your active proficiencies and career passion areas</p>
              </div>

              {/* Selected Skills Chips */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Selected Skills ({skills.length})
                  </label>
                  {skills.length > 0 && (
                    <span className="text-[11px] text-slate-400">Click a chip to remove</span>
                  )}
                </div>
                <div className="flex flex-wrap gap-2 p-3.5 rounded-2xl bg-slate-50 border border-slate-200 min-h-16 items-center">
                  {skills.length > 0 ? (
                    skills.map((skill, i) => (
                      <span
                        key={i}
                        onClick={() => handleToggleSkill(skill)}
                        className="px-3 py-1 rounded-xl bg-gradient-to-r from-lavender-700 to-indigo-600 text-white font-bold text-xs shadow-2xs flex items-center gap-1.5 cursor-pointer hover:opacity-90"
                      >
                        <span>{skill}</span>
                        <X className="w-3 h-3" />
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-slate-400 italic">
                      No skills selected yet. Click the suggested tags below or add a custom skill.
                    </span>
                  )}
                </div>
              </div>

              {/* Add Custom Skill */}
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Type custom skill (e.g. Supabase, PyTorch, GraphQL)..."
                  value={customSkillInput}
                  onChange={(e) => setCustomSkillInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddCustomSkill()}
                  className="flex-1 px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white placeholder:text-slate-400"
                />
                <button
                  type="button"
                  onClick={handleAddCustomSkill}
                  disabled={!customSkillInput.trim()}
                  className="px-4 py-2 rounded-xl bg-lavender-100 hover:bg-lavender-200 text-lavender-900 font-bold text-xs disabled:opacity-40 cursor-pointer"
                >
                  Add Custom
                </button>
              </div>

              {/* Suggested Skills */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Suggested Skills</span>
                <div className="flex flex-wrap gap-1.5">
                  {allPopularSkills.map((sk) => {
                    const isSelected = skills.includes(sk);
                    return (
                      <button
                        key={sk}
                        type="button"
                        onClick={() => handleToggleSkill(sk)}
                        className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-lavender-700 text-white shadow-xs font-bold'
                            : 'bg-white border border-slate-200 text-slate-700 hover:bg-lavender-50 hover:border-lavender-300'
                        }`}
                      >
                        {isSelected && '✓ '}
                        {sk}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Domain Interests */}
              <div className="space-y-2 pt-4 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                    Domain Interests ({interests.length})
                  </label>
                  {interests.length > 0 && (
                    <span className="text-[11px] text-slate-400">Click to toggle</span>
                  )}
                </div>

                <div className="flex flex-wrap gap-2 p-3.5 rounded-2xl bg-slate-50 border border-slate-200 min-h-12 items-center mb-2">
                  {interests.length > 0 ? (
                    interests.map((interest, i) => (
                      <span
                        key={i}
                        onClick={() => handleToggleInterest(interest)}
                        className="px-3 py-1 rounded-xl bg-gradient-to-r from-softblue-600 to-indigo-600 text-white font-bold text-xs shadow-2xs flex items-center gap-1.5 cursor-pointer hover:opacity-90"
                      >
                        <span>{interest}</span>
                        <X className="w-3 h-3" />
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-slate-400 italic">
                      No interests selected yet. Choose suggested interest domains below.
                    </span>
                  )}
                </div>

                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Suggested Interests</span>
                <div className="flex flex-wrap gap-1.5">
                  {allPopularInterests.map((interest) => {
                    const isSelected = interests.includes(interest);
                    return (
                      <button
                        key={interest}
                        type="button"
                        onClick={() => handleToggleInterest(interest)}
                        className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-gradient-to-r from-softblue-600 to-indigo-600 text-white font-bold shadow-xs'
                            : 'bg-white border border-slate-200 text-slate-700 hover:bg-lavender-50'
                        }`}
                      >
                        {isSelected && '✓ '}
                        {interest}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex justify-between pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setActiveSection('platforms')}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-xs font-bold text-slate-700 cursor-pointer"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setActiveSection('projects')}
                  className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-lavender-700 to-indigo-600 text-white text-xs font-bold shadow-md shadow-lavender-500/25 flex items-center gap-2 cursor-pointer"
                >
                  <span>Next: Projects & Certifications</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* SECTION 4: PROJECTS & CERTIFICATIONS */}
          {activeSection === 'projects' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              
              {/* Projects Sub-section */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-extrabold text-slate-900">Projects ({projectsList.length})</h3>
                    <p className="text-xs text-slate-500">Showcase your hands-on code repositories and products</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsAddingProject(!isAddingProject)}
                    className="px-3 py-1.5 rounded-xl bg-lavender-50 hover:bg-lavender-100 text-lavender-800 font-bold text-xs border border-lavender-200 flex items-center gap-1.5 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>+ Add Project</span>
                  </button>
                </div>

                {/* Add Project Form Drawer */}
                {isAddingProject && (
                  <form onSubmit={handleSaveNewProject} className="p-4 rounded-2xl bg-lavender-50/70 border border-lavender-200 space-y-3">
                    <h4 className="text-xs font-bold text-lavender-900">New Project Details</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="e.g. AI Resume Analyzer"
                        value={projName}
                        onChange={(e) => setProjName(e.target.value)}
                        className="px-3 py-2 text-xs bg-white border border-lavender-200 rounded-xl placeholder:text-slate-400"
                        required
                      />
                      <input
                        type="text"
                        placeholder="e.g. React, Python, FastAPI"
                        value={projTech}
                        onChange={(e) => setProjTech(e.target.value)}
                        className="px-3 py-2 text-xs bg-white border border-lavender-200 rounded-xl placeholder:text-slate-400"
                      />
                      <input
                        type="url"
                        placeholder="e.g. https://github.com/yourusername/project"
                        value={projGithub}
                        onChange={(e) => setProjGithub(e.target.value)}
                        className="px-3 py-2 text-xs bg-white border border-lavender-200 rounded-xl placeholder:text-slate-400"
                      />
                      <input
                        type="url"
                        placeholder="e.g. https://project-demo.com (optional)"
                        value={projLink}
                        onChange={(e) => setProjLink(e.target.value)}
                        className="px-3 py-2 text-xs bg-white border border-lavender-200 rounded-xl placeholder:text-slate-400"
                      />
                      <div className="sm:col-span-2">
                        <textarea
                          rows={2}
                          placeholder="e.g. Built an AI-powered resume analysis tool with real-time scoring..."
                          value={projDesc}
                          onChange={(e) => setProjDesc(e.target.value)}
                          className="w-full px-3 py-2 text-xs bg-white border border-lavender-200 rounded-xl placeholder:text-slate-400"
                        />
                      </div>
                    </div>
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setIsAddingProject(false)}
                        className="px-3 py-1.5 rounded-xl bg-slate-200 text-xs font-bold text-slate-700 cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-1.5 rounded-xl bg-lavender-700 text-white text-xs font-bold cursor-pointer"
                      >
                        Save Project
                      </button>
                    </div>
                  </form>
                )}

                {/* Projects List or Empty State */}
                <div className="space-y-3">
                  {projectsList.length > 0 ? (
                    projectsList.map(proj => (
                      <div key={proj.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start justify-between gap-3">
                        <div className="space-y-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h4 className="font-bold text-sm text-slate-900">{proj.name}</h4>
                            {proj.link && (
                              <a href={proj.link} target="_blank" rel="noreferrer" className="text-lavender-600 hover:text-lavender-800">
                                <ExternalLink className="w-3.5 h-3.5" />
                              </a>
                            )}
                          </div>
                          <p className="text-xs text-slate-600">{proj.description}</p>
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {proj.tech.map((t, i) => (
                              <span key={i} className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700">
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleDeleteProj(proj.id)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))
                  ) : (
                    <div className="p-6 text-center border border-dashed border-slate-200 rounded-2xl bg-slate-50/50">
                      <Briefcase className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                      <p className="text-xs font-bold text-slate-600">No projects added yet</p>
                      <p className="text-[11px] text-slate-400 mt-0.5">Click "+ Add Project" to highlight your work</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Certifications Sub-section */}
              <div className="space-y-3 pt-6 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-extrabold text-slate-900">Certifications ({certificationsList.length})</h3>
                    <p className="text-xs text-slate-500">Industry-recognized diplomas and badges</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsAddingCert(!isAddingCert)}
                    className="px-3 py-1.5 rounded-xl bg-lavender-50 hover:bg-lavender-100 text-lavender-800 font-bold text-xs border border-lavender-200 flex items-center gap-1.5 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>+ Add Certification</span>
                  </button>
                </div>

                {isAddingCert && (
                  <form onSubmit={handleSaveNewCert} className="p-4 rounded-2xl bg-lavender-50/70 border border-lavender-200 space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="e.g. AWS Cloud Practitioner"
                        value={certName}
                        onChange={(e) => setCertName(e.target.value)}
                        className="px-3 py-2 text-xs bg-white border border-lavender-200 rounded-xl placeholder:text-slate-400"
                        required
                      />
                      <input
                        type="text"
                        placeholder="e.g. Amazon Web Services"
                        value={certIssuer}
                        onChange={(e) => setCertIssuer(e.target.value)}
                        className="px-3 py-2 text-xs bg-white border border-lavender-200 rounded-xl placeholder:text-slate-400"
                      />
                      <input
                        type="text"
                        placeholder="e.g. Nov 2024"
                        value={certDate}
                        onChange={(e) => setCertDate(e.target.value)}
                        className="px-3 py-2 text-xs bg-white border border-lavender-200 rounded-xl placeholder:text-slate-400"
                      />
                      <input
                        type="url"
                        placeholder="e.g. https://aws.amazon.com/verify/credential-id"
                        value={certUrl}
                        onChange={(e) => setCertUrl(e.target.value)}
                        className="px-3 py-2 text-xs bg-white border border-lavender-200 rounded-xl placeholder:text-slate-400"
                      />
                    </div>
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setIsAddingCert(false)}
                        className="px-3 py-1.5 rounded-xl bg-slate-200 text-xs font-bold text-slate-700 cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-1.5 rounded-xl bg-lavender-700 text-white text-xs font-bold cursor-pointer"
                      >
                        Save Credential
                      </button>
                    </div>
                  </form>
                )}

                <div className="space-y-2.5">
                  {certificationsList.length > 0 ? (
                    certificationsList.map(cert => (
                      <div key={cert.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-xl bg-mint-100 text-mint-700 flex items-center justify-center font-bold text-xs">
                            <Award className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-slate-900">{cert.name}</p>
                            <p className="text-[11px] text-slate-500">{cert.issuer} • Issued {cert.issueDate}</p>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleDeleteCert(cert.id)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))
                  ) : (
                    <div className="p-6 text-center border border-dashed border-slate-200 rounded-2xl bg-slate-50/50">
                      <Award className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                      <p className="text-xs font-bold text-slate-600">No certifications added yet</p>
                      <p className="text-[11px] text-slate-400 mt-0.5">Click "+ Add Certification" to verify credentials</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-between pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setActiveSection('skills')}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-xs font-bold text-slate-700 cursor-pointer"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setActiveSection('resume')}
                  className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-lavender-700 to-indigo-600 text-white text-xs font-bold shadow-md shadow-lavender-500/25 flex items-center gap-2 cursor-pointer"
                >
                  <span>Next: Resume & Portfolio</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* SECTION 5: RESUME & PORTFOLIO */}
          {activeSection === 'resume' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="space-y-1">
                <h3 className="text-base font-extrabold text-slate-900">Resume & Portfolio Generator</h3>
                <p className="text-xs text-slate-500">Upload optional PDF/DOCX or download your auto-compiled student portfolio</p>
              </div>

              {/* Resume Card */}
              <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200/90 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-lavender-100 text-lavender-700 flex items-center justify-center">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">Resume Status</h4>
                      <p className="text-xs text-slate-500">
                        {resumeFileName ? resumeFileName : 'No resume uploaded'}
                      </p>
                    </div>
                  </div>

                  {resumeFileName ? (
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-xl border border-emerald-200">
                      ✓ Active File
                    </span>
                  ) : (
                    <span className="text-xs font-medium text-slate-400 bg-slate-100 px-2.5 py-1 rounded-xl">
                      Optional
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <label className="px-4 py-2 rounded-xl bg-lavender-700 hover:bg-lavender-800 text-white font-bold text-xs flex items-center gap-2 cursor-pointer transition-colors shadow-xs">
                    <Upload className="w-3.5 h-3.5" />
                    <span>{resumeFileName ? 'Replace Resume (PDF/DOCX)' : 'Upload Resume'}</span>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleResumeUpload}
                      className="hidden"
                    />
                  </label>

                  {resumeFileName && (
                    <button
                      type="button"
                      onClick={handleRemoveResume}
                      className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-rose-600 hover:bg-rose-50 font-bold text-xs cursor-pointer"
                    >
                      Remove Resume
                    </button>
                  )}
                </div>
              </div>

              {/* Auto-Generated Portfolio Callout */}
              <div className="p-6 rounded-3xl bg-gradient-to-r from-lavender-100 via-indigo-50 to-softblue-50 border border-lavender-200 space-y-3">
                <div className="flex items-center gap-2.5">
                  <Sparkles className="w-5 h-5 text-lavender-600" />
                  <h4 className="text-sm font-extrabold text-slate-900">Auto-Generated Student Portfolio</h4>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Oppurtuni formats your entered profile details, verified coding platforms, projects, and certifications into a sleek digital portfolio card ready to share with recruiters.
                </p>
                <button
                  type="button"
                  onClick={() => setIsPortfolioModalOpen(true)}
                  className="px-5 py-2.5 rounded-2xl bg-white border border-lavender-300 text-lavender-800 font-extrabold text-xs shadow-xs hover:bg-lavender-50 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Download className="w-4 h-4 text-lavender-600" />
                  <span>Preview & Download Portfolio</span>
                </button>
              </div>

              <div className="flex justify-between pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setActiveSection('projects')}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-xs font-bold text-slate-700 cursor-pointer"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setActiveSection('analysis')}
                  className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-lavender-700 to-indigo-600 text-white text-xs font-bold shadow-md shadow-lavender-500/25 flex items-center gap-2 cursor-pointer"
                >
                  <span>Next: View AI Profile Analysis</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* SECTION 6: AI PROFILE ANALYSIS */}
          {activeSection === 'analysis' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-extrabold text-slate-900">AI Profile Intelligence & Match Power</h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800">
                    Live Computed
                  </span>
                </div>
                <p className="text-xs text-slate-500">
                  Comprehensive profile strength evaluation computed across all entered credentials {resumeFileName ? 'and uploaded resume' : '(works seamlessly without resume)'}
                </p>
              </div>

              {profileAnalysis.completeness === 0 ? (
                /* Empty Profile State */
                <div className="p-8 text-center border border-dashed border-lavender-200 rounded-3xl bg-lavender-50/50 space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-lavender-100 text-lavender-700 flex items-center justify-center mx-auto">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <h4 className="text-sm font-extrabold text-slate-800">Complete your profile to unlock AI-powered insights.</h4>
                  <p className="text-xs text-slate-500 max-w-md mx-auto">
                    Add your basic details, skills, interests, and projects to enable real-time matching against thousands of opportunities.
                  </p>
                  <button
                    type="button"
                    onClick={() => setActiveSection('basic')}
                    className="px-5 py-2 rounded-xl bg-lavender-700 text-white font-bold text-xs shadow-xs"
                  >
                    Start with Basic Details
                  </button>
                </div>
              ) : (
                /* Active Profile Analysis */
                <>
                  {/* Completeness Notice if Incomplete */}
                  {profileAnalysis.completeness < 100 && (
                    <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200/80 flex items-start gap-3">
                      <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                      <div className="text-xs">
                        <p className="font-bold text-amber-900">
                          Your profile is {profileAnalysis.completeness}% complete.
                        </p>
                        <p className="text-amber-700 mt-0.5">
                          {profileAnalysis.missingSections.length > 0 
                            ? `Add your ${profileAnalysis.missingSections.join(', ')} to improve your opportunity matches.`
                            : 'Add more projects, platforms, or certifications to maximize your AI match power.'}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* KPI Scorecard Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <div className="p-4 rounded-2xl bg-lavender-50 border border-lavender-200">
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Match Power</p>
                      <p className="text-lg font-extrabold text-lavender-700">{profileAnalysis.matchPower}</p>
                      <p className="text-[11px] text-slate-500 mt-0.5">Computed from entered details</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Opportunity Readiness</p>
                      <p className="text-sm font-extrabold text-emerald-700 truncate">{profileAnalysis.readiness}</p>
                      <p className="text-[11px] text-slate-500 mt-0.5">Discovery status</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-softblue-50 border border-softblue-200 col-span-2 sm:col-span-1">
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Verified Elements</p>
                      <p className="text-lg font-extrabold text-softblue-700">
                        {(userProfile.emailVerified ? 1 : 0) + (userProfile.phoneVerified ? 1 : 0) + (platforms.length > 0 ? 1 : 0) + (projectsList.length > 0 ? 1 : 0)} / 4
                      </p>
                      <p className="text-[11px] text-slate-500 mt-0.5">Trust indicators active</p>
                    </div>
                  </div>

                  {/* Skill Strengths */}
                  {profileAnalysis.strengths.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        Top Profile Strengths Identified
                      </h4>
                      <div className="space-y-1.5">
                        {profileAnalysis.strengths.map((str, i) => (
                          <div key={i} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs font-medium text-slate-700 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            <span>{str}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Recommended Next Skills */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <TrendingUp className="w-3.5 h-3.5 text-lavender-600" />
                      Recommended Next Skills (Boosts match score by +15%)
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {profileAnalysis.recommended.map((rec, i) => (
                        <span key={i} className="px-3 py-1 rounded-xl bg-lavender-50 border border-lavender-200 text-lavender-800 font-bold text-xs">
                          + {rec}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Final Launch Action */}
                  <div className="p-5 rounded-3xl bg-gradient-to-r from-lavender-700 via-indigo-600 to-softblue-600 text-white space-y-3 shadow-lg shadow-lavender-500/30">
                    <h4 className="font-extrabold text-sm sm:text-base">Ready to Discover Your Best Matches?</h4>
                    <p className="text-xs text-lavender-100 leading-relaxed">
                      Your profile has been saved. Our AI discovery scanner will match open opportunities against your verified inputs.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        handleSaveBasic();
                        navigateTo('ai-search');
                      }}
                      className="px-6 py-2.5 rounded-2xl bg-white text-lavender-900 font-extrabold text-xs shadow-md hover:bg-lavender-50 transition-all cursor-pointer flex items-center gap-2"
                    >
                      <Sparkles className="w-4 h-4 text-lavender-700" />
                      <span>Launch AI Discovery Scanner</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          )}

        </div>

      </div>

      {/* PORTFOLIO PREVIEW & DOWNLOAD MODAL */}
      {isPortfolioModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-lavender-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Header */}
            <div className="bg-gradient-to-r from-lavender-700 via-indigo-600 to-softblue-600 p-6 text-white flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold text-lavender-200 uppercase tracking-wider">Auto-Compiled Digital Portfolio</span>
                <h3 className="text-lg font-bold">{fullName || 'Your Name'}</h3>
                <p className="text-xs text-lavender-100">
                  {college || 'Your College'} • {year} • {cgpa ? `CGPA: ${cgpa}` : 'CGPA: Not set'}
                </p>
              </div>
              <button
                onClick={() => setIsPortfolioModalOpen(false)}
                className="p-2 rounded-full bg-white/20 hover:bg-white/30 text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body: Rendered Portfolio Details */}
            <div className="p-6 space-y-5 max-h-[60vh] overflow-y-auto">
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Active Technical Skills</h4>
                <div className="flex flex-wrap gap-1.5">
                  {skills.length > 0 ? (
                    skills.map((s, i) => (
                      <span key={i} className="px-2.5 py-0.5 rounded-lg bg-lavender-50 text-lavender-800 font-bold text-xs border border-lavender-200">
                        {s}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-slate-400 italic">No skills added</span>
                  )}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Projects ({projectsList.length})</h4>
                <div className="space-y-2">
                  {projectsList.length > 0 ? (
                    projectsList.map(p => (
                      <div key={p.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                        <p className="text-xs font-bold text-slate-900">{p.name}</p>
                        <p className="text-[11px] text-slate-600 mt-0.5">{p.description}</p>
                        {p.tech.length > 0 && (
                          <p className="text-[10px] text-lavender-700 font-bold mt-1">Tech: {p.tech.join(', ')}</p>
                        )}
                      </div>
                    ))
                  ) : (
                    <span className="text-xs text-slate-400 italic">No projects added</span>
                  )}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Verified Certifications</h4>
                <div className="space-y-1.5">
                  {certificationsList.length > 0 ? (
                    certificationsList.map(c => (
                      <div key={c.id} className="text-xs text-slate-700 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        <strong>{c.name}</strong> — {c.issuer} ({c.issueDate})
                      </div>
                    ))
                  ) : (
                    <span className="text-xs text-slate-400 italic">No certifications added</span>
                  )}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                onClick={() => {
                  showToast('✓ Portfolio PDF downloaded to your device!', 'success');
                  setIsPortfolioModalOpen(false);
                }}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-lavender-700 to-indigo-600 text-white font-bold text-xs shadow-md shadow-lavender-500/25 flex items-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download Portfolio PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Email Verification Modal */}
      {isEmailModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-white rounded-3xl shadow-2xl border border-lavender-200 p-6 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base text-slate-900">Verify Email Address</h3>
              <button onClick={() => setIsEmailModalOpen(false)} className="text-slate-400 hover:text-slate-700 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-slate-600">
              Demo code sent to <strong className="text-slate-800">{email}</strong>. (Code: <strong className="text-lavender-700">482910</strong>)
            </p>
            <form onSubmit={(e) => {
              e.preventDefault();
              verifyEmail(emailCode);
              setIsEmailModalOpen(false);
              setEmailCode('');
            }} className="space-y-3">
              <input
                type="text"
                maxLength={6}
                value={emailCode}
                onChange={(e) => setEmailCode(e.target.value)}
                placeholder="Enter 6-digit code"
                className="w-full px-3.5 py-2.5 text-center tracking-widest text-sm font-bold bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-lavender-500"
                required
              />
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-lavender-700 to-indigo-600 text-white font-bold text-xs cursor-pointer"
              >
                Confirm Verification
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Phone Verification Modal */}
      {isPhoneModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-white rounded-3xl shadow-2xl border border-lavender-200 p-6 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base text-slate-900">Verify Mobile Number</h3>
              <button onClick={() => setIsPhoneModalOpen(false)} className="text-slate-400 hover:text-slate-700 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-slate-600">
              SMS OTP sent to <strong className="text-slate-800">{phone}</strong>. (Code: <strong className="text-mint-700">772901</strong>)
            </p>
            <form onSubmit={(e) => {
              e.preventDefault();
              verifyPhone(phoneCode);
              setIsPhoneModalOpen(false);
              setPhoneCode('');
            }} className="space-y-3">
              <input
                type="text"
                maxLength={6}
                value={phoneCode}
                onChange={(e) => setPhoneCode(e.target.value)}
                placeholder="Enter SMS OTP"
                className="w-full px-3.5 py-2.5 text-center tracking-widest text-sm font-bold bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-lavender-500"
                required
              />
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-lavender-700 to-indigo-600 text-white font-bold text-xs cursor-pointer"
              >
                Confirm Mobile OTP
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
