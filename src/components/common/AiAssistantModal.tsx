import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  X, 
  Send, 
  Bot, 
  User, 
  Compass, 
  BrainCircuit, 
  Calendar, 
  ArrowRight,
  HelpCircle,
  Briefcase
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  time: string;
  suggestions?: string[];
  actionLink?: {
    page: any;
    label: string;
  };
}

export const AiAssistantModal: React.FC = () => {
  const { navigateTo, userProfile, currentPage } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm1',
      sender: 'ai',
      text: `Hi ${userProfile.name.split(' ')[0]}! ✨ I'm your Oppurtuni AI Career Scout. I've analyzed your profile and discovered 126 active opportunities tailored for you. How can I help you accelerate your journey today?`,
      time: 'Just now',
      suggestions: [
        'Find frontend internships for me',
        'Which skills should I learn next?',
        'What opportunities are expiring soon?',
        'Help me prepare for my upcoming interview'
      ]
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  // Don't show floating button on public landing/auth pages
  if (currentPage === 'landing' || currentPage === 'auth') {
    return null;
  }

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');

    // AI Intelligent response generator
    setTimeout(() => {
      const lower = query.toLowerCase();
      let aiText = '';
      let suggestions: string[] | undefined;
      let actionLink: { page: any; label: string } | undefined;

      if (lower.includes('internship') || lower.includes('frontend')) {
        aiText = `I found 4 high-match frontend internships for you! Top pick is Google Summer Internship (92% match) and Amazon SDE Intern (94% match). Both value your Python, React & problem-solving background.`;
        suggestions = ['View 94% matched opportunities', 'Check frontend skill gaps'];
        actionLink = { page: 'opportunities', label: 'Explore Matches' };
      } else if (lower.includes('skill') || lower.includes('learn')) {
        aiText = `Based on current tech market trends and your dream roles, mastering TypeScript and API Testing will unlock an extra 18% match rate on high-paying SDE positions.`;
        suggestions = ['View 4-Week AI Roadmap', 'See trending skills'];
        actionLink = { page: 'skill-gap', label: 'Open Skill Gap AI' };
      } else if (lower.includes('expir') || lower.includes('deadline')) {
        aiText = `⚠️ Urgent: Google Generation Scholarship closes in 2 days ($2,500 USD grant), and Google Summer Internship has only 3 days left. I recommend submitting your materials now!`;
        suggestions = ['Check upcoming deadlines', 'Apply directly to Google'];
        actionLink = { page: 'opportunities', label: 'View Urgent Deadlines' };
      } else if (lower.includes('interview') || lower.includes('prep')) {
        aiText = `🎯 You have an upcoming interview with Microsoft for Developer Role! Key focus topics for this round: Cloud distributed basics, C++ / TypeScript fundamentals, and behavioral STAR stories.`;
        suggestions = ['Review Microsoft application', 'Practice interview questions'];
        actionLink = { page: 'application-tracker', label: 'Open Journey Tracker' };
      } else {
        aiText = `I understand! Oppurtuni AI is actively synchronizing with 8+ platforms including LinkedIn, Unstop, and Devfolio to match opportunities with your profile. Would you like me to run a live scout?`;
        suggestions = ['Run AI Agent Scout', 'Review my career insights'];
        actionLink = { page: 'ai-search', label: 'Start AI Search' };
      }

      const aiReply: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: aiText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestions,
        actionLink
      };

      setMessages(prev => [...prev, aiReply]);
    }, 600);
  };

  return (
    <>
      {/* Small Circular Floating AI Assistant Launcher */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(true)}
          title="Oppurtuni AI Assistant"
          className="group relative w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-lavender-700 via-indigo-600 to-softblue-500 hover:from-lavender-800 hover:to-indigo-700 text-white flex items-center justify-center shadow-xl shadow-lavender-500/30 hover:shadow-lavender-500/45 hover:scale-110 active:scale-95 transition-all duration-200 border-2 border-white/40 cursor-pointer"
        >
          <Sparkles className="w-6 h-6 text-mint-200 group-hover:rotate-12 transition-transform duration-300" />
          <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-mint-400 ring-2 ring-white animate-pulse" />
        </button>
      </div>

      {/* Slide-over Assistant Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden flex justify-end animate-in fade-in duration-200">
          <div 
            className="fixed inset-0 bg-slate-900/30 backdrop-blur-xs transition-opacity" 
            onClick={() => setIsOpen(false)} 
          />

          <div className="relative w-full max-w-md sm:max-w-lg bg-white h-full shadow-2xl flex flex-col z-10 border-l border-lavender-200">
            {/* Header */}
            <div className="p-4 sm:p-5 bg-gradient-to-r from-lavender-100 via-purple-50 to-pink-50 border-b border-lavender-200/80 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-lavender-700 to-indigo-600 text-white flex items-center justify-center shadow-md shadow-lavender-500/30">
                  <Sparkles className="w-5 h-5 text-mint-300" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                    Oppurtuni AI Assistant
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">Online</span>
                  </h3>
                  <p className="text-xs text-slate-500">Autonomous opportunity copilot</p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-white/80 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Body */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 bg-oppurtuni-canvas">
              {messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div className="flex items-start gap-2.5 max-w-[88%]">
                    {msg.sender === 'ai' && (
                      <div className="w-7 h-7 rounded-xl bg-lavender-600 text-white flex items-center justify-center flex-shrink-0 mt-1 shadow-xs">
                        <Bot className="w-4 h-4" />
                      </div>
                    )}

                    <div>
                      <div
                        className={`p-3.5 sm:p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                          msg.sender === 'user'
                            ? 'bg-gradient-to-r from-lavender-700 to-indigo-600 text-white rounded-tr-none shadow-md shadow-lavender-500/20'
                            : 'bg-white text-slate-800 border border-lavender-200/80 rounded-tl-none shadow-sm'
                        }`}
                      >
                        <p className="whitespace-pre-line">{msg.text}</p>

                        {msg.actionLink && (
                          <button
                            onClick={() => {
                              navigateTo(msg.actionLink!.page);
                              setIsOpen(false);
                            }}
                            className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-lavender-50 hover:bg-lavender-100 text-lavender-800 border border-lavender-200 text-xs font-bold transition-all"
                          >
                            <span>{msg.actionLink.label}</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>

                      <span className="text-[10px] text-slate-400 mt-1 block px-1">
                        {msg.time}
                      </span>
                    </div>
                  </div>

                  {/* Suggestions Chips */}
                  {msg.suggestions && (
                    <div className="mt-3 flex flex-wrap gap-1.5 pl-9">
                      {msg.suggestions.map((sug, i) => (
                        <button
                          key={i}
                          onClick={() => handleSend(sug)}
                          className="px-3 py-1.5 rounded-xl bg-white border border-lavender-200/80 hover:border-lavender-400 text-[11px] font-semibold text-slate-700 hover:text-lavender-700 hover:bg-lavender-50/50 transition-all text-left shadow-2xs"
                        >
                          {sug}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <div className="p-3.5 sm:p-4 bg-white border-t border-lavender-100">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  placeholder="Ask about opportunities, interviews, or skills..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-1 px-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-lavender-500/20 focus:border-lavender-500 transition-all placeholder:text-slate-400"
                />
                <button
                  type="submit"
                  disabled={!input.trim()}
                  className="p-2.5 sm:p-3 rounded-2xl bg-gradient-to-r from-lavender-700 to-indigo-600 hover:opacity-90 disabled:opacity-40 text-white transition-all shadow-md shadow-lavender-500/20"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
              <div className="flex items-center justify-between mt-2 px-1 text-[10px] text-slate-400">
                <span>Powered by Oppurtuni Agentic Engine</span>
                <span className="flex items-center gap-1 text-mint-600 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-mint-500" />
                  Live Sync
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
