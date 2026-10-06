import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  PageType, 
  Opportunity, 
  UserProfile, 
  OpportunityCategory, 
  NotificationItem, 
  SkillGapAnalysis,
  LearningItem,
  CompanyProfile
} from '../types';
import { 
  initialOpportunities, 
  initialUserProfile, 
  initialNotifications, 
  skillGapDataMap 
} from '../data/mockData';
import confetti from 'canvas-confetti';

interface ToastState {
  show: boolean;
  message: string;
  type: 'success' | 'info' | 'warning';
}

interface AppContextType {
  currentPage: PageType;
  navigateTo: (page: PageType, params?: { opportunityId?: string; category?: OpportunityCategory }) => void;
  goBack: () => void;
  pageHistory: PageType[];
  
  // Opportunities State
  opportunities: Opportunity[];
  selectedOpportunity: Opportunity | null;
  setSelectedOpportunityId: (id: string) => void;
  toggleSave: (id: string) => void;
  applyToOpportunity: (id: string) => void;
  updateApplicationStatus: (id: string, status: Opportunity['applicationStatus']) => void;
  postOpportunity: (newOpp: Omit<Opportunity, 'id' | 'saved' | 'applied'>) => void;
  
  // Company Profile Modal
  selectedCompany: CompanyProfile | null;
  setSelectedCompany: (company: CompanyProfile | null) => void;
  openCompanyProfile: (companyName: string) => void;
  
  // Filtering & Search
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeCategory: OpportunityCategory;
  setActiveCategory: (cat: OpportunityCategory) => void;
  sortBy: 'match' | 'deadline' | 'stipend';
  setSortBy: (sort: 'match' | 'deadline' | 'stipend') => void;
  
  // User Profile
  userProfile: UserProfile;
  updateUserProfile: (updated: Partial<UserProfile>) => void;
  isLoggedIn: boolean;
  login: (email?: string, name?: string) => void;
  logout: () => void;
  
  // Skill Gap AI
  selectedSkillGapOppId: string;
  setSelectedSkillGapOppId: (id: string) => void;
  currentSkillGapData: SkillGapAnalysis;
  updateLearningItemProgress: (itemId: string, newProgress: number) => void;
  
  // Notifications
  notifications: NotificationItem[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  dismissNotification: (id: string) => void;
  addNotification: (notif: { title: string; message: string; type: NotificationItem['type']; actionPage?: PageType; actionLabel?: string }) => void;
  
  // Toast & Modals
  toast: ToastState | null;
  showToast: (message: string, type?: 'success' | 'info' | 'warning') => void;
  hideToast: () => void;
  
  // Modals
  isApplyModalOpen: boolean;
  setIsApplyModalOpen: (open: boolean) => void;
  isSuccessModalOpen: boolean;
  setIsSuccessModalOpen: (open: boolean) => void;
  appliedOpportunity: Opportunity | null;
  isEditProfileModalOpen: boolean;
  setIsEditProfileModalOpen: (open: boolean) => void;
  isFilterModalOpen: boolean;
  setIsFilterModalOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<PageType>('landing');
  const [pageHistory, setPageHistory] = useState<PageType[]>(['landing']);
  const [opportunities, setOpportunities] = useState<Opportunity[]>(initialOpportunities);
  const [selectedOpportunityId, setSelectedOpportunityIdState] = useState<string>('opp-1');
  const [selectedSkillGapOppId, setSelectedSkillGapOppId] = useState<string>('opp-1');
  const [selectedCompany, setSelectedCompany] = useState<CompanyProfile | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile>(initialUserProfile);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<OpportunityCategory>('All');
  const [sortBy, setSortBy] = useState<'match' | 'deadline' | 'stipend'>('match');
  
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);
  const [toast, setToast] = useState<ToastState | null>(null);
  
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [appliedOpportunity, setAppliedOpportunity] = useState<Opportunity | null>(null);
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  
  const [skillGapData, setSkillGapData] = useState<Record<string, SkillGapAnalysis>>(skillGapDataMap);

  const selectedOpportunity = opportunities.find(o => o.id === selectedOpportunityId) || opportunities[0];

  const navigateTo = (page: PageType, params?: { opportunityId?: string; category?: OpportunityCategory }) => {
    if (params?.opportunityId) {
      setSelectedOpportunityIdState(params.opportunityId);
    }
    if (params?.category) {
      setActiveCategory(params.category);
    }
    setPageHistory(prev => [...prev, page]);
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goBack = () => {
    if (pageHistory.length > 1) {
      const newHistory = [...pageHistory];
      newHistory.pop();
      const prevPage = newHistory[newHistory.length - 1];
      setPageHistory(newHistory);
      setCurrentPage(prevPage);
    } else {
      setCurrentPage('dashboard');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const setSelectedOpportunityId = (id: string) => {
    setSelectedOpportunityIdState(id);
  };

  const showToast = (message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  const hideToast = () => setToast(null);

  const toggleSave = (id: string) => {
    setOpportunities(prev =>
      prev.map(opp => {
        if (opp.id === id) {
          const newSaved = !opp.saved;
          if (newSaved) {
            showToast(`Saved "${opp.title}" to your list`, 'success');
            addNotification({
              title: 'Opportunity saved! ✓',
              message: `${opp.title} was added to your saved list.`,
              type: 'saved',
              actionPage: 'saved-opportunities',
              actionLabel: 'View Saved'
            });
          } else {
            showToast(`Removed from saved`, 'info');
          }
          return { ...opp, saved: newSaved, applicationStatus: newSaved && !opp.applied ? 'Saved' : opp.applicationStatus };
        }
        return opp;
      })
    );
  };

  const applyToOpportunity = (id: string) => {
    const opp = opportunities.find(o => o.id === id);
    if (!opp) return;

    setOpportunities(prev =>
      prev.map(item =>
        item.id === id
          ? {
              ...item,
              applied: true,
              applicationStatus: 'Applied',
              appliedDate: `Applied on ${new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}`
            }
          : item
      )
    );

    setAppliedOpportunity(opp);
    setIsApplyModalOpen(false);
    setIsSuccessModalOpen(true);

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // Ignore if confetti is not available
    }

    addNotification({
      title: 'Application Submitted! 🚀',
      message: `Your application for ${opp.title} at ${opp.company} has been submitted.`,
      type: 'profile',
      actionPage: 'application-tracker',
      actionLabel: 'Track Status'
    });
  };

  const updateApplicationStatus = (id: string, status: Opportunity['applicationStatus']) => {
    setOpportunities(prev =>
      prev.map(item => (item.id === id ? { ...item, applicationStatus: status } : item))
    );
    showToast(`Updated status to "${status}"`, 'info');
  };

  const postOpportunity = (newOppData: Omit<Opportunity, 'id' | 'saved' | 'applied'>) => {
    const newOpp: Opportunity = {
      ...newOppData,
      id: `opp-direct-${Date.now()}`,
      saved: false,
      applied: false,
      isDirectCompanyPost: true,
      postedDate: 'Just now'
    };

    setOpportunities(prev => [newOpp, ...prev]);

    try {
      confetti({
        particleCount: 90,
        spread: 75,
        origin: { y: 0.6 }
      });
    } catch {
      // Ignore
    }

    showToast(`✓ "${newOpp.title}" successfully published!`, 'success');
    addNotification({
      title: '📢 Opportunity Published!',
      message: `"${newOpp.title}" by ${newOpp.company} is now live and discoverable for students.`,
      type: 'match',
      actionPage: 'opportunities',
      actionLabel: 'View Listing'
    });
  };

  const openCompanyProfile = (companyName: string) => {
    // Generate company profile
    const matchedOpps = opportunities.filter(o => o.company.toLowerCase() === companyName.toLowerCase());
    const sampleLogo = matchedOpps[0]?.companyLogo || 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=100&auto=format&fit=crop&q=60';
    
    const companyProfile: CompanyProfile = {
      id: `comp-${companyName.toLowerCase().replace(/\s+/g, '-')}`,
      name: companyName,
      logo: sampleLogo,
      website: `https://${companyName.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`,
      about: `${companyName} is actively hiring and fostering talent across software engineering, data, design, and innovation through internships, contests, and full-time career programs.`,
      industry: 'Technology & Software Innovation',
      location: matchedOpps[0]?.location || 'Bangalore / Remote',
      size: '1,000 - 5,000 employees',
      type: 'MNC / Product Leader',
      verified: true,
      activeOpportunitiesCount: matchedOpps.length || 2,
      commonlySoughtSkills: Array.from(new Set(matchedOpps.flatMap(o => o.requiredSkills))).slice(0, 6)
    };

    setSelectedCompany(companyProfile);
  };

  const updateUserProfile = (updated: Partial<UserProfile>) => {
    setUserProfile(prev => ({
      ...prev,
      ...updated,
      profileCompleted: Math.min(100, (prev.profileCompleted || 75) + 5)
    }));
    showToast('Profile updated successfully!', 'success');
  };

  const login = (email?: string, name?: string) => {
    setIsLoggedIn(true);
    if (name || email) {
      setUserProfile(prev => ({
        ...prev,
        name: name || prev.name,
        email: email || prev.email
      }));
    }
    showToast(`Welcome back, ${name || userProfile.name}! 👋`, 'success');
    navigateTo('dashboard');
  };

  const logout = () => {
    setIsLoggedIn(false);
    showToast('You have been logged out.', 'info');
    navigateTo('landing');
  };

  const currentSkillGapData = skillGapData[selectedSkillGapOppId] || skillGapData['opp-1'];

  const updateLearningItemProgress = (itemId: string, newProgress: number) => {
    setSkillGapData(prev => {
      const current = prev[selectedSkillGapOppId];
      if (!current) return prev;
      const updatedItems = current.learningItems.map(item => {
        if (item.id === itemId) {
          const status = newProgress >= 100 ? 'Completed' : newProgress > 0 ? 'In Progress' : 'Not Started';
          return { ...item, progress: newProgress, status: status as LearningItem['status'] };
        }
        return item;
      });
      return {
        ...prev,
        [selectedSkillGapOppId]: {
          ...current,
          learningItems: updatedItems
        }
      };
    });
    showToast('Course progress updated!', 'success');
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    showToast('All notifications marked as read', 'info');
  };

  const dismissNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const addNotification = (notif: { title: string; message: string; type: NotificationItem['type']; actionPage?: PageType; actionLabel?: string }) => {
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: notif.title,
      message: notif.message,
      time: 'Just now',
      type: notif.type,
      read: false,
      actionPage: notif.actionPage,
      actionLabel: notif.actionLabel
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <AppContext.Provider
      value={{
        currentPage,
        navigateTo,
        goBack,
        pageHistory,
        opportunities,
        selectedOpportunity,
        setSelectedOpportunityId,
        toggleSave,
        applyToOpportunity,
        updateApplicationStatus,
        postOpportunity,
        selectedCompany,
        setSelectedCompany,
        openCompanyProfile,
        searchQuery,
        setSearchQuery,
        activeCategory,
        setActiveCategory,
        sortBy,
        setSortBy,
        userProfile,
        updateUserProfile,
        isLoggedIn,
        login,
        logout,
        selectedSkillGapOppId,
        setSelectedSkillGapOppId,
        currentSkillGapData,
        updateLearningItemProgress,
        notifications,
        unreadCount,
        markAsRead,
        markAllAsRead,
        dismissNotification,
        addNotification,
        toast,
        showToast,
        hideToast,
        isApplyModalOpen,
        setIsApplyModalOpen,
        isSuccessModalOpen,
        setIsSuccessModalOpen,
        appliedOpportunity,
        isEditProfileModalOpen,
        setIsEditProfileModalOpen,
        isFilterModalOpen,
        setIsFilterModalOpen
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
