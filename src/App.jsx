import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Navbar from './components/Navbar';
import StudentDashboard from './views/StudentDashboard';
import IndustryDashboard from './views/IndustryDashboard';
import AcademicianDashboard from './views/AcademicianDashboard';
import InstitutionDashboard from './views/InstitutionDashboard';
import SkillAssessmentModal from './components/SkillAssessmentModal';
import OpportunityDetailModal from './components/OpportunityDetailModal';
import PostOpportunityModal from './components/PostOpportunityModal';
import DigitalPortfolioModal from './components/DigitalPortfolioModal';
import { Sparkles, Heart } from 'lucide-react';

function DashboardContent() {
  const { userRole, switchRole } = useApp();

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
      {userRole === 'student' && <StudentDashboard />}
      {userRole === 'industry' && <IndustryDashboard />}
      {userRole === 'academician' && <AcademicianDashboard />}
      {userRole === 'institution' && <InstitutionDashboard />}
    </main>
  );
}

export default function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-slate-50 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
        <Navbar />
        <DashboardContent />

        {/* Global Modals */}
        <SkillAssessmentModal />
        <OpportunityDetailModal />
        <PostOpportunityModal />
        <DigitalPortfolioModal />

        {/* Footer */}
        <footer className="mt-auto bg-slate-900 text-slate-400 text-xs py-8 border-t border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-xs">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
              <span className="font-extrabold text-white">Skill2Hire</span>
              <span>— Centralized Academia-Industry Collaboration Platform</span>
            </div>

            <p className="text-[11px] text-slate-500">
              Skill Mapping • Internships • Placements • Faculty Development
            </p>
          </div>
        </footer>
      </div>
    </AppProvider>
  );
}
