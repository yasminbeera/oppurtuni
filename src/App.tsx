import React from 'react';
import { useApp } from './context/AppContext';
import { AppLayout } from './components/layout/AppLayout';
import { LandingPage } from './pages/LandingPage';
import { AuthPage } from './pages/AuthPage';
import { DashboardPage } from './pages/DashboardPage';
import { CreateProfilePage } from './pages/CreateProfilePage';
import { OnboardingPage } from './pages/OnboardingPage';
import { AiSearchPage } from './pages/AiSearchPage';
import { OpportunitiesPage } from './pages/OpportunitiesPage';
import { OpportunityDetailsPage } from './pages/OpportunityDetailsPage';
import { SkillGapPage } from './pages/SkillGapPage';
import { CareerInsightsPage } from './pages/CareerInsightsPage';
import { ApplicationTrackerPage } from './pages/ApplicationTrackerPage';
import { SavedOpportunitiesPage } from './pages/SavedOpportunitiesPage';
import { ProfileSettingsPage } from './pages/ProfileSettingsPage';
import { NotificationsPage } from './pages/NotificationsPage';
import { AccountSecurityPage } from './pages/AccountSecurityPage';
import { HelpSupportPage } from './pages/HelpSupportPage';
import { RecentsPage } from './pages/RecentsPage';
import { SettingsPage } from './pages/SettingsPage';
import { PostOpportunityPage } from './pages/PostOpportunityPage';
import { AiAssistantModal } from './components/common/AiAssistantModal';
import { CompanyProfileModal } from './components/modals/CompanyProfileModal';

export const AppContent: React.FC = () => {
  const { currentPage } = useApp();

  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage />;
      case 'auth':
        return <AuthPage />;
      case 'onboarding':
        return <OnboardingPage />;
      case 'dashboard':
        return <DashboardPage />;
      case 'create-profile':
        return <CreateProfilePage />;
      case 'ai-search':
        return <AiSearchPage />;
      case 'opportunities':
        return <OpportunitiesPage />;
      case 'opportunity-details':
        return <OpportunityDetailsPage />;
      case 'recents':
        return <RecentsPage />;
      case 'post-opportunity':
        return <PostOpportunityPage />;
      case 'skill-gap':
        return <SkillGapPage />;
      case 'career-insights':
        return <CareerInsightsPage />;
      case 'application-tracker':
        return <ApplicationTrackerPage />;
      case 'saved-opportunities':
        return <SavedOpportunitiesPage />;
      case 'profile-settings':
        return <ProfileSettingsPage />;
      case 'notifications':
        return <NotificationsPage />;
      case 'account-security':
        return <AccountSecurityPage />;
      case 'help-support':
        return <HelpSupportPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <AppLayout>
      {renderPage()}
      <AiAssistantModal />
      <CompanyProfileModal />
    </AppLayout>
  );
};

export default function App() {
  return <AppContent />;
}
