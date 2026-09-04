import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  BookOpenCheck,
  Award,
  Users,
  Briefcase,
  ExternalLink,
  CheckCircle2,
  Calendar,
  Sparkles,
  FileText,
  BookmarkPlus
} from 'lucide-react';

export default function AcademicianDashboard() {
  const { facultyOpps, studentProfile } = useApp();
  const [enrolledFdp, setEnrolledFdp] = useState([]);

  const handleEnrollFdp = (oppId, title) => {
    setEnrolledFdp([...enrolledFdp, oppId]);
    alert(`Successfully registered for "${title}"! Notification sent to university administration.`);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Faculty Portal Banner */}
      <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-bold border border-purple-400/30">
              Academician Portal
            </span>
            <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-400/30">
              Department of Computer Science
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Faculty Industrial Exposure & Research Hub
          </h1>
          <p className="text-sm text-slate-300 max-w-xl mt-1">
            Explore faculty internships, Faculty Development Programs (FDPs), industry consultancy grants, and collaborative research initiatives.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => alert("Faculty Profile PDF exported for NIRF / NAAC accreditation!")}
            className="px-5 py-3 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-bold text-xs shadow-lg shadow-purple-600/30 flex items-center gap-2 transition-all hover:scale-105"
          >
            <Award className="w-4 h-4" />
            Accreditation Portfolio
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
          <p className="text-xs font-semibold text-slate-500">Active Mentees</p>
          <p className="text-2xl font-extrabold text-purple-700 mt-1">24 Students</p>
          <p className="text-[10px] text-slate-400 mt-1">Under Skill Endorsement</p>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
          <p className="text-xs font-semibold text-slate-500">FDPs & Training</p>
          <p className="text-2xl font-extrabold text-indigo-700 mt-1">3 Completed</p>
          <p className="text-[10px] text-emerald-600 font-semibold mt-1">AICTE Verified</p>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
          <p className="text-xs font-semibold text-slate-500">Consultancy Grants</p>
          <p className="text-2xl font-extrabold text-emerald-700 mt-1">₹4.5 Lakhs</p>
          <p className="text-[10px] text-slate-400 mt-1">2 Industry Projects</p>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
          <p className="text-xs font-semibold text-slate-500">Joint Publications</p>
          <p className="text-2xl font-extrabold text-amber-700 mt-1">4 Papers</p>
          <p className="text-[10px] text-amber-600 font-semibold mt-1">Industry Co-Authors</p>
        </div>
      </div>

      {/* Faculty Opportunities: FDPs, Industrial Training, Fellowships */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-purple-600 uppercase tracking-wider">Faculty Programs</span>
            <h2 className="text-xl font-extrabold text-slate-900">Faculty Internships, FDPs & Consultancy Grants</h2>
          </div>
          <span className="text-xs text-slate-500">Verified Corporate Sponsors</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {facultyOpps.map((opp) => {
            const isEnrolled = enrolledFdp.includes(opp.id);
            return (
              <div key={opp.id} className="p-6 rounded-3xl border border-slate-200 bg-slate-50/60 hover:bg-slate-50 transition-all flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2.5 py-0.5 rounded-md bg-purple-100 text-purple-800 text-[10px] font-bold">
                      {opp.type}
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium">Deadline: {opp.deadline}</span>
                  </div>

                  <h3 className="font-extrabold text-slate-900 text-base leading-snug">{opp.title}</h3>
                  <p className="text-xs font-bold text-indigo-700 mt-1">{opp.provider}</p>
                  <p className="text-xs text-slate-600 mt-2">{opp.description}</p>

                  <div className="mt-3 p-3 rounded-xl bg-white border border-slate-200 text-xs">
                    <span className="font-bold text-slate-700 block">Honorarium / Support:</span>
                    <span className="text-emerald-700 font-extrabold">{opp.stipendHonorarium}</span>
                  </div>
                </div>

                <button
                  disabled={isEnrolled}
                  onClick={() => handleEnrollFdp(opp.id, opp.title)}
                  className={`w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all ${
                    isEnrolled
                      ? 'bg-slate-300 text-slate-600 cursor-not-allowed'
                      : 'bg-purple-600 hover:bg-purple-700 text-white'
                  }`}
                >
                  {isEnrolled ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" /> Application Submitted
                    </>
                  ) : (
                    <>
                      <BookmarkPlus className="w-4 h-4" /> Apply for Program
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Student Mentorship & Skill Endorsement Portal */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">Student Mentorship</span>
            <h2 className="text-lg font-extrabold text-slate-900">Mentee Skill Verification & Endorsements</h2>
          </div>
          <span className="text-xs text-slate-500">24 Assigned Mentees</span>
        </div>

        <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center text-base border border-indigo-200">
              RS
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-slate-900 text-sm">{studentProfile.name}</h3>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">
                  CGPA: {studentProfile.cgpa}
                </span>
              </div>
              <p className="text-xs text-slate-500">{studentProfile.department} • 3rd Year</p>
              <div className="flex items-center gap-1.5 mt-1 text-xs text-slate-600">
                <span className="font-bold text-indigo-700">{studentProfile.verifiedBadgeCount} Verified Skills</span>
                <span>• 2 Active Job Applications</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => alert(`Verified skill endorsement log submitted for ${studentProfile.name}!`)}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-sm"
            >
              Endorse Verified Skills
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
