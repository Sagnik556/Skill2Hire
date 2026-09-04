import React, { createContext, useContext, useState } from 'react';
import {
  initialStudentData,
  sampleAssessments,
  sampleOpportunities,
  sampleLearningPrograms,
  sampleAcademicianOpportunities,
  sampleInstitutionalAnalytics,
  initialApplications,
  sampleCandidatesPool
} from '../data/mockData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Current active persona view: 'student' | 'industry' | 'academician' | 'institution'
  const [userRole, setUserRole] = useState('student');

  // Core application state
  const [studentProfile, setStudentProfile] = useState(initialStudentData);
  const [opportunities, setOpportunities] = useState(sampleOpportunities);
  const [applications, setApplications] = useState(initialApplications);
  const [learningPrograms, setLearningPrograms] = useState(sampleLearningPrograms);
  const [facultyOpps, setFacultyOpps] = useState(sampleAcademicianOpportunities);
  const [candidates, setCandidates] = useState(sampleCandidatesPool);
  const [analytics] = useState(sampleInstitutionalAnalytics);

  // Modals & Active Selections
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);
  const [isAssessmentModalOpen, setIsAssessmentModalOpen] = useState(false);
  const [activeAssessment, setActiveAssessment] = useState(null);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [isPortfolioModalOpen, setIsPortfolioModalOpen] = useState(false);
  const [notification, setNotification] = useState(null);

  // Helper to show floating notification
  const showToast = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  // Switch role view
  const switchRole = (role) => {
    setUserRole(role);
    showToast(`Switched view to ${role.toUpperCase()} Portal`, 'info');
  };

  // Apply to opportunity
  const applyForOpportunity = (opportunity) => {
    const exists = applications.find(a => a.opportunityId === opportunity.id);
    if (exists) {
      showToast(`You have already applied for ${opportunity.title}`, 'info');
      return;
    }

    const newApp = {
      id: `app-${Date.now()}`,
      opportunityId: opportunity.id,
      opportunityTitle: opportunity.title,
      company: opportunity.company,
      studentName: studentProfile.name,
      appliedDate: new Date().toISOString().split('T')[0],
      status: 'Applied',
      matchScore: opportunity.matchPercent || 85,
      feedback: 'Application under review by recruiter.'
    };

    setApplications([newApp, ...applications]);

    // Also add to recruiter candidates pool
    const newCand = {
      id: `c-${Date.now()}`,
      name: studentProfile.name,
      institution: studentProfile.institution,
      department: studentProfile.department,
      cgpa: studentProfile.cgpa,
      skillMatch: opportunity.matchPercent || 85,
      topSkills: studentProfile.skills.slice(0, 4).map(s => s.name.split('/')[0].trim()),
      verifiedBadges: studentProfile.verifiedBadgeCount,
      status: 'Applied',
      email: studentProfile.email
    };
    setCandidates([newCand, ...candidates]);

    showToast(`Successfully applied to ${opportunity.title} at ${opportunity.company}!`);
  };

  // Start Assessment Quiz
  const startAssessment = (assessment) => {
    setActiveAssessment(assessment);
    setIsAssessmentModalOpen(true);
  };

  // Submit Assessment Result & Update Student Profile Skills
  const submitAssessmentResult = (scorePercentage, evaluatedSkills) => {
    setIsAssessmentModalOpen(false);

    // Update student skills based on test score
    const updatedSkills = studentProfile.skills.map(s => {
      if (evaluatedSkills.some(es => s.name.toLowerCase().includes(es.toLowerCase()))) {
        return {
          ...s,
          score: Math.max(s.score, scorePercentage),
          verified: scorePercentage >= 70,
          gap: scorePercentage < 70,
          date: new Date().toISOString().split('T')[0]
        };
      }
      return s;
    });

    const newVerifiedCount = updatedSkills.filter(s => s.verified).length;

    setStudentProfile({
      ...studentProfile,
      skills: updatedSkills,
      verifiedBadgeCount: newVerifiedCount,
      skillMatchAverage: Math.min(98, Math.round(studentProfile.skillMatchAverage + (scorePercentage > 75 ? 3 : 0)))
    });

    showToast(`Skill Assessment Completed! Score: ${scorePercentage}%. Verified Badges Updated: ${newVerifiedCount}`, 'success');
  };

  // Recruiter posts new opportunity
  const postNewOpportunity = (oppData) => {
    const createdOpp = {
      id: `opp-${Date.now()}`,
      ...oppData,
      postedDate: new Date().toISOString().split('T')[0],
      matchPercent: Math.floor(Math.random() * 20) + 78
    };

    setOpportunities([createdOpp, ...opportunities]);
    setIsPostModalOpen(false);
    showToast(`Opportunity "${oppData.title}" posted successfully!`, 'success');
  };

  // Recruiter updates candidate recruitment status
  const updateCandidateStatus = (candidateId, newStatus) => {
    setCandidates(candidates.map(c => c.id === candidateId ? { ...c, status: newStatus } : c));
    setApplications(applications.map(a => a.id === candidateId ? { ...a, status: newStatus } : a));
    showToast(`Candidate status updated to "${newStatus}"`, 'info');
  };

  // Student adds project to digital portfolio
  const addProjectToPortfolio = (project) => {
    const newP = {
      id: `p-${Date.now()}`,
      ...project,
      verified: true
    };
    setStudentProfile({
      ...studentProfile,
      projects: [...studentProfile.projects, newP]
    });
    showToast(`Project "${project.title}" added to Verified Portfolio!`, 'success');
  };

  return (
    <AppContext.Provider
      value={{
        userRole,
        switchRole,
        studentProfile,
        opportunities,
        applications,
        learningPrograms,
        facultyOpps,
        candidates,
        analytics,
        assessments: sampleAssessments,
        selectedOpportunity,
        setSelectedOpportunity,
        isAssessmentModalOpen,
        setIsAssessmentModalOpen,
        activeAssessment,
        startAssessment,
        submitAssessmentResult,
        isPostModalOpen,
        setIsPostModalOpen,
        postNewOpportunity,
        isPortfolioModalOpen,
        setIsPortfolioModalOpen,
        updateCandidateStatus,
        applyForOpportunity,
        addProjectToPortfolio,
        notification
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
