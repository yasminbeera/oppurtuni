import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  GraduationCap, 
  Code2, 
  Heart, 
  Briefcase, 
  FileUp, 
  Target,
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { OpportuniLogo } from '../components/common/OpportuniLogo';
import confetti from 'canvas-confetti';

export const OnboardingPage: React.FC = () => {
  const { userProfile, updateUserProfile, navigateTo } = useApp();
  const [step, setStep] = useState(1);

  // Form states
  const [college, setCollege] = useState(userProfile.college);
  const [year, setYear] = useState(userProfile.year);
  const [selectedSkills, setSelectedSkills] = useState<string[]>(userProfile.skills);
  const [selectedInterests, setSelectedInterests] = useState<string[]>(userProfile.interests);
  const [selectedTypes, setSelectedTypes] = useState<string[]>(userProfile.opportunityTypes);
  const [careerGoal, setCareerGoal] = useState('Frontend / Full-Stack Software Engineer at high-growth tech startup');

  const availableSkills = ['React', 'Python', 'TypeScript', 'C++', 'Java', 'Web Development', 'SQL', 'UI/UX', 'Node.js', 'AI/ML', 'Next.js', 'Docker'];
  const availableInterests = ['Technology', 'AI/ML', 'Design', 'Fintech', 'Open Source', 'Social Good', 'Cybersecurity', 'Web3'];
  const opportunityOptions = ['Internships', 'Jobs', 'Hackathons', 'Meetups', 'Fellowships', 'Competitions', 'Scholarships', 'Workshops'];

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev => 
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );
  };

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev => 
      prev.includes(interest) ? prev.filter(i => i !== interest) : [...prev, interest]
    );
  };

  const toggleType = (t: string) => {
    setSelectedTypes(prev => 
      prev.includes(t) ? prev.filter(item => item !== t) : [...prev, t]
    );
  };

  const handleNext = () => {
    if (step < 6) {
      setStep(step + 1);
    } else {
      // Completed onboarding!
      updateUserProfile({
        college,
        year,
        skills: selectedSkills,
        interests: selectedInterests,
        opportunityTypes: selectedTypes,
        profileCompleted: 95
      });
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      setTimeout(() => {
        navigateTo('dashboard');
      }, 1200);
    }
  };

  return (
    <div className="min-h-screen bg-oppurtuni-canvas flex flex-col justify-between p-4 sm:p-8">
      {/* Top Header */}
      <div className="max-w-4xl w-full mx-auto flex items-center justify-between pb-6">
        <OpportuniLogo size="md" />
        <span className="text-xs font-bold text-slate-500 bg-white px-3 py-1 rounded-full border border-lavender-200 shadow-2xs">
          Step {step} of 6
        </span>
      </div>

      {/* Main Card */}
      <div className="max-w-2xl w-full mx-auto bg-white rounded-3xl p-6 sm:p-10 border border-lavender-200/90 shadow-card space-y-6">
        
        {/* Step Indicator Progress Bar */}
        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-lavender-600 via-indigo-600 to-mint-500 transition-all duration-300"
            style={{ width: `${(step / 6) * 100}%` }}
          />
        </div>

        {/* STEP 1: Education */}
        {step === 1 && (
          <div className="space-y-5 animate-in fade-in duration-150">
            <div className="flex items-center gap-3 text-lavender-700">
              <div className="w-10 h-10 rounded-2xl bg-lavender-50 border border-lavender-200 flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-lavender-600" />
              </div>
              <div>
                <h2 className="text-xl font-black text-slate-900">Where are you studying?</h2>
                <p className="text-xs text-slate-500">Helps AI calculate university recruitment eligibility</p>
              </div>
            </div>

            <div className="space-y-4 pt-2">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">College or University</label>
                <input
                  type="text"
                  value={college}
                  onChange={(e) => setCollege(e.target.value)}
                  className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-lavender-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Current Academic Year</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {['1st Year', '2nd Year', '3rd Year', 'Final Year / Grad'].map((y) => (
                    <button
                      key={y}
                      onClick={() => setYear(y)}
                      className={`py-2.5 px-3 rounded-2xl text-xs font-bold border transition-all ${
                        year === y
                          ? 'border-lavender-600 bg-lavender-50 text-lavender-900 shadow-2xs'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {y}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Skills */}
        {step === 2 && (
          <div className="space-y-5 animate-in fade-in duration-150">
            <div className="flex items-center gap-3 text-lavender-700">
              <div className="w-10 h-10 rounded-2xl bg-lavender-50 border border-lavender-200 flex items-center justify-center">
                <Code2 className="w-5 h-5 text-lavender-600" />
              </div>
              <div>
                <h2 className="text-xl font-black text-slate-900">What skills do you possess?</h2>
                <p className="text-xs text-slate-500">Select technologies and core competencies</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2.5 pt-2">
              {availableSkills.map((sk) => {
                const isSelected = selectedSkills.includes(sk);
                return (
                  <button
                    key={sk}
                    onClick={() => toggleSkill(sk)}
                    className={`px-4 py-2 rounded-2xl text-xs font-bold border transition-all ${
                      isSelected
                        ? 'bg-lavender-600 border-lavender-600 text-white shadow-sm shadow-lavender-500/25'
                        : 'bg-white border-slate-200 text-slate-700 hover:border-lavender-300 hover:bg-lavender-50/50'
                    }`}
                  >
                    {isSelected ? `✓ ${sk}` : `+ ${sk}`}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 3: Interests */}
        {step === 3 && (
          <div className="space-y-5 animate-in fade-in duration-150">
            <div className="flex items-center gap-3 text-softpink-600">
              <div className="w-10 h-10 rounded-2xl bg-softpink-50 border border-softpink-200 flex items-center justify-center">
                <Heart className="w-5 h-5 text-softpink-500" />
              </div>
              <div>
                <h2 className="text-xl font-black text-slate-900">What areas excite you?</h2>
                <p className="text-xs text-slate-500">Used by AI Scout agents to discover passionate projects</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2.5 pt-2">
              {availableInterests.map((item) => {
                const isSelected = selectedInterests.includes(item);
                return (
                  <button
                    key={item}
                    onClick={() => toggleInterest(item)}
                    className={`px-4 py-2 rounded-2xl text-xs font-bold border transition-all ${
                      isSelected
                        ? 'bg-softpink-500 border-softpink-500 text-white shadow-sm shadow-softpink-500/25'
                        : 'bg-white border-slate-200 text-slate-700 hover:border-softpink-300 hover:bg-softpink-50/50'
                    }`}
                  >
                    {isSelected ? `❤️ ${item}` : item}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 4: Opportunity Preferences */}
        {step === 4 && (
          <div className="space-y-5 animate-in fade-in duration-150">
            <div className="flex items-center gap-3 text-softblue-600">
              <div className="w-10 h-10 rounded-2xl bg-softblue-50 border border-softblue-200 flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-softblue-600" />
              </div>
              <div>
                <h2 className="text-xl font-black text-slate-900">Which opportunities to track?</h2>
                <p className="text-xs text-slate-500">Select all categories you wish to scout</p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              {opportunityOptions.map((opt) => {
                const isSelected = selectedTypes.includes(opt);
                return (
                  <div
                    key={opt}
                    onClick={() => toggleType(opt)}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all text-center ${
                      isSelected
                        ? 'bg-softblue-50 border-softblue-500 text-softblue-900 font-bold shadow-2xs'
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span className="text-xs block">{opt}</span>
                    <span className="text-[10px] text-slate-400 mt-1 block">
                      {isSelected ? '✓ Active' : 'Tap to add'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 5: Resume */}
        {step === 5 && (
          <div className="space-y-5 animate-in fade-in duration-150">
            <div className="flex items-center gap-3 text-mint-600">
              <div className="w-10 h-10 rounded-2xl bg-mint-50 border border-mint-200 flex items-center justify-center">
                <FileUp className="w-5 h-5 text-mint-600" />
              </div>
              <div>
                <h2 className="text-xl font-black text-slate-900">Upload your Resume</h2>
                <p className="text-xs text-slate-500">AI automatically extracts achievements and projects</p>
              </div>
            </div>

            <div className="border-2 border-dashed border-lavender-300 rounded-3xl p-8 text-center bg-lavender-50/30 hover:bg-lavender-50/60 transition-all cursor-pointer">
              <div className="w-12 h-12 rounded-2xl bg-white border border-lavender-200 text-lavender-600 mx-auto flex items-center justify-center shadow-2xs mb-3">
                <FileUp className="w-6 h-6" />
              </div>
              <p className="text-xs font-bold text-slate-900">{userProfile.resumeName || 'Upload Resume (PDF, DOCX)'}</p>
              <p className="text-[11px] text-slate-500 mt-1">Drag and drop or click to replace • Max 5MB</p>
              <span className="inline-block mt-3 px-3 py-1 bg-mint-100 text-mint-800 rounded-full text-[10px] font-bold">
                ✓ AI Resume Strength: 82% Ready
              </span>
            </div>
          </div>
        )}

        {/* STEP 6: Career Goal */}
        {step === 6 && (
          <div className="space-y-5 animate-in fade-in duration-150">
            <div className="flex items-center gap-3 text-indigo-600">
              <div className="w-10 h-10 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-center">
                <Target className="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <h2 className="text-xl font-black text-slate-900">What is your primary career goal?</h2>
                <p className="text-xs text-slate-500">Your North Star for AI recommendations</p>
              </div>
            </div>

            <div className="pt-2">
              <textarea
                rows={3}
                value={careerGoal}
                onChange={(e) => setCareerGoal(e.target.value)}
                className="w-full p-4 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-indigo-500/20"
                placeholder="e.g. Land a Frontend or Full-Stack Internship at a high-growth tech startup"
              />
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>Your Oppurtuni profile is ready. AI agents are primed to search!</span>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          {step > 1 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="px-4 py-2.5 rounded-2xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-semibold flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          ) : (
            <div />
          )}

          <button
            onClick={handleNext}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-lavender-700 to-indigo-600 hover:from-lavender-800 hover:to-indigo-700 text-white text-xs sm:text-sm font-bold shadow-lg shadow-lavender-500/25 flex items-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>{step === 6 ? 'Find My Opportunities →' : 'Continue'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Footer text */}
      <div className="text-center text-xs text-slate-400 py-4">
        Oppurtuni Autonomous Career Platform • Student-first AI matching
      </div>
    </div>
  );
};
