import React, { useState } from 'react';
import { 
  ArrowLeft, 
  HelpCircle, 
  Search, 
  MessageSquare, 
  Mail, 
  FileText, 
  ChevronDown, 
  ChevronUp, 
  Sparkles, 
  Send, 
  CheckCircle2, 
  AlertCircle,
  ExternalLink,
  BookOpen
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const HelpSupportPage: React.FC = () => {
  const { goBack, showToast } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const [contactSubject, setContactSubject] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactType, setContactType] = useState<'support' | 'bug' | 'feedback'>('support');

  const faqs = [
    {
      q: 'How does Oppurtuni AI match opportunities with my profile?',
      a: 'Oppurtuni utilizes 4 specialized AI agents (Profile Agent, Scout Agent, Matching Agent, and Insight Agent) that continuously crawl verified sources including LinkedIn, Unstop, Handshake, and Devfolio. It computes semantic similarity and skill overlap between your profile details and job requirements to calculate your real-time Match Percentage.'
    },
    {
      q: 'What is the difference between Verified and Needs Verification listings?',
      a: 'Verified listings are posted directly by verified recruiters or retrieved from verified corporate partner APIs. Listings marked as "Needs Verification" are community-indexed and undergo automated AI integrity checks before full endorsement.'
    },
    {
      q: 'Can I use Oppurtuni if I do not have a PDF resume ready yet?',
      a: 'Yes! Oppurtuni does not block your career discovery or profile analysis. Our AI analyzes all manually entered skills, projects, certifications, coursework, and college details to compute your Match Power and provide recommendations instantly.'
    },
    {
      q: 'How do I download my auto-generated student portfolio?',
      a: 'Visit the "Create Profile" or "My Profile" section, navigate to the Resume & Portfolio tab, and click "Download Portfolio". Oppurtuni compiles your education, skills, live projects, certifications, and public platforms into a clean, recruiter-ready profile document.'
    },
    {
      q: 'How does the AI Skill Gap Roadmap help me get hired?',
      a: 'When you view any opportunity, Skill Gap AI compares your existing skill matrix against the mandatory and preferred requirements of that role. It generates a step-by-step personalized learning curriculum with vetted free and certified courses.'
    }
  ];

  const filteredFaqs = faqs.filter(f => 
    !searchQuery.trim() || 
    f.q.toLowerCase().includes(searchQuery.toLowerCase()) || 
    f.a.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSupportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showToast(`✓ Your ${contactType} ticket has been submitted to the Oppurtuni team!`, 'success');
    setContactSubject('');
    setContactMessage('');
  };

  return (
    <div className="w-full space-y-6 animate-in fade-in duration-200">
      
      {/* Header */}
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
              <span>Help Center & Support</span>
              <HelpCircle className="w-5 h-5 text-lavender-600" />
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">
              Frequently asked questions, student guides, and direct ticketing
            </p>
          </div>
        </div>
      </div>

      {/* Search Header Banner */}
      <div className="bg-gradient-to-r from-lavender-100 via-indigo-50 to-softblue-50 p-6 sm:p-8 rounded-3xl border border-lavender-200 text-center space-y-4 shadow-sm">
        <div className="max-w-md mx-auto space-y-2">
          <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">How can we help you today?</h2>
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-lavender-500" />
            <input
              type="text"
              placeholder="Search help articles, FAQs, guides..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-white border border-lavender-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-lavender-500/20 focus:border-lavender-500 shadow-sm"
            />
          </div>
        </div>
      </div>

      {/* 12-Column Responsive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column (7 Cols): FAQ Accordion & Quick Guides */}
        <div className="lg:col-span-7 space-y-5">
          <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 border border-lavender-200/80 shadow-card space-y-4">
            <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-lavender-600" />
              <span>Frequently Asked Questions</span>
            </h3>

            <div className="divide-y divide-lavender-100">
              {filteredFaqs.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div key={idx} className="py-3.5">
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="w-full flex items-center justify-between gap-3 text-left font-bold text-xs sm:text-sm text-slate-800 hover:text-lavender-700 transition-colors cursor-pointer"
                    >
                      <span>{faq.q}</span>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-lavender-600 flex-shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0" />
                      )}
                    </button>
                    {isOpen && (
                      <p className="text-xs text-slate-600 mt-2.5 leading-relaxed bg-slate-50/80 p-3.5 rounded-2xl border border-slate-100 animate-in fade-in duration-150">
                        {faq.a}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column (5 Cols): Contact Support & Feedback Form */}
        <div className="lg:col-span-5 space-y-5">
          <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-7 border border-lavender-200/80 shadow-card space-y-5">
            <div className="space-y-1">
              <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-lavender-600" />
                <span>Contact Oppurtuni Team</span>
              </h3>
              <p className="text-xs text-slate-500">
                Reach out to support, report a bug, or suggest new features.
              </p>
            </div>

            {/* Segmented Type Switcher */}
            <div className="grid grid-cols-3 gap-1 bg-slate-100 p-1 rounded-2xl text-xs font-bold">
              <button
                type="button"
                onClick={() => setContactType('support')}
                className={`py-1.5 rounded-xl transition-all cursor-pointer ${
                  contactType === 'support' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'
                }`}
              >
                Support
              </button>
              <button
                type="button"
                onClick={() => setContactType('bug')}
                className={`py-1.5 rounded-xl transition-all cursor-pointer ${
                  contactType === 'bug' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'
                }`}
              >
                Report Bug
              </button>
              <button
                type="button"
                onClick={() => setContactType('feedback')}
                className={`py-1.5 rounded-xl transition-all cursor-pointer ${
                  contactType === 'feedback' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'
                }`}
              >
                Feedback
              </button>
            </div>

            <form onSubmit={handleSupportSubmit} className="space-y-3.5">
              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700">Subject</label>
                <input
                  type="text"
                  value={contactSubject}
                  onChange={(e) => setContactSubject(e.target.value)}
                  placeholder="Summary of query or issue..."
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-lavender-500/20 focus:border-lavender-500"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700">Message Details</label>
                <textarea
                  rows={4}
                  value={contactMessage}
                  onChange={(e) => setContactMessage(e.target.value)}
                  placeholder="Provide details so our engineering/support team can assist you..."
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-lavender-500/20 focus:border-lavender-500"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-2xl bg-gradient-to-r from-lavender-700 via-indigo-600 to-softblue-600 hover:opacity-95 text-white font-bold text-xs shadow-md shadow-lavender-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit {contactType === 'support' ? 'Request' : contactType === 'bug' ? 'Bug Report' : 'Feedback'}</span>
              </button>
            </form>
          </div>
        </div>

      </div>

    </div>
  );
};
