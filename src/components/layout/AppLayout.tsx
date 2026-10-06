import React from 'react';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import { BottomNav } from './BottomNav';
import { ApplyModal } from '../modals/ApplyModal';
import { ApplicationSuccessModal } from '../modals/ApplicationSuccessModal';
import { EditProfileModal } from '../modals/EditProfileModal';
import { FilterModal } from '../modals/FilterModal';
import { NotificationToast } from '../common/NotificationToast';
import { useApp } from '../../context/AppContext';

export const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentPage } = useApp();

  // For landing page and auth page, do not show sidebar by default
  const isPublicPage = currentPage === 'landing' || currentPage === 'auth';

  if (isPublicPage) {
    return (
      <div className="min-h-screen bg-oppurtuni-canvas flex flex-col font-sans selection:bg-lavender-100 selection:text-lavender-700">
        <main className="flex-1 w-full">
          {children}
        </main>
        <NotificationToast />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-oppurtuni-canvas flex flex-col lg:flex-row font-sans selection:bg-lavender-100 selection:text-lavender-700">
      {/* Desktop Persistent Sidebar */}
      <Sidebar />

      {/* Main Content Area — Full viewport width and height with zero unnatural side margins */}
      <div className="flex-1 flex flex-col min-w-0 pb-20 lg:pb-8">
        <Navbar />
        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6 w-full min-w-0 animate-in fade-in duration-150">
          {children}
        </main>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <BottomNav />

      {/* Modals & Popups */}
      <ApplyModal />
      <ApplicationSuccessModal />
      <EditProfileModal />
      <FilterModal />
      <NotificationToast />
    </div>
  );
};
