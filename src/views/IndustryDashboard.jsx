import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Building2,
  Plus,
  Users,
  Briefcase,
  Search,
  Filter,
  CheckCircle2,
  Award,
  ChevronRight,
  ShieldCheck,
  Star,
  FileCheck,
  Send
} from 'lucide-react';

export default function IndustryDashboard() {
  const {
    opportunities,
    setIsPostModalOpen,
    candidates,
    updateCandidateStatus
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  const filteredCandidates = candidates.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.institution.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.topSkills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = statusFilter === 'All' || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-8 pb-12">
      {/* Recruiter Banner & Header */}
      <div className="bg-gradient-to-r from-teal-900 via-emerald-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-bold border border-teal-400/30">
              Corporate Partner Account
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-400/30">
              DataMind AI Technologies
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Industry Talent Acquisition Portal
          </h1>
          <p className="text-sm text-slate-300 max-w-xl mt-1">
            Post opportunities, evaluate verified skill badges, shortlist candidates with AI match scoring, and manage intern progression.
          </p>
        </div>

        <button
          onClick={() => setIsPostModalOpen(true)}
          className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white font-extrabold text-xs shadow-lg shadow-teal-600/30 flex items-center gap-2 transition-all hover:scale-105 shrink-0"
        >
          <Plus className="w-4 h-4" />
          Post New Internship / Job
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
          <p className="text-xs font-semibold text-slate-500">Active Listings</p>
          <p className="text-2xl font-extrabold text-teal-700 mt-1">{opportunities.length}</p>
          <p className="text-[10px] text-slate-400 mt-1">Internships & Placement Posts</p>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
          <p className="text-xs font-semibold text-slate-500">Total Applicants</p>
          <p className="text-2xl font-extrabold text-blue-700 mt-1">{candidates.length}</p>
          <p className="text-[10px] text-emerald-600 font-semibold mt-1">100% Skill Verified</p>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
          <p className="text-xs font-semibold text-slate-500">Shortlisted Candidates</p>
          <p className="text-2xl font-extrabold text-purple-700 mt-1">
            {candidates.filter(c => c.status === 'Shortlisted' || c.status === 'Interviewing').length}
          </p>
          <p className="text-[10px] text-purple-600 font-semibold mt-1">Interview Round Ready</p>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
          <p className="text-xs font-semibold text-slate-500">Offers Issued</p>
          <p className="text-2xl font-extrabold text-emerald-700 mt-1">
            {candidates.filter(c => c.status === 'Offered').length}
          </p>
          <p className="text-[10px] text-emerald-600 font-semibold mt-1">PPO & Placements</p>
        </div>
      </div>

      {/* Active Postings Manager */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-teal-600 uppercase tracking-wider">Opportunity Management</span>
            <h2 className="text-lg font-extrabold text-slate-900">Your Active Job & Internship Listings</h2>
          </div>
          <button
            onClick={() => setIsPostModalOpen(true)}
            className="text-xs font-bold text-teal-700 hover:text-teal-900 flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" />
            Create Posting
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {opportunities.map((opp) => (
            <div key={opp.id} className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <span className="px-2.5 py-0.5 bg-teal-100 text-teal-800 text-[10px] font-bold rounded">
                    {opp.type}
                  </span>
                  <h3 className="font-bold text-slate-900 text-base mt-1">{opp.title}</h3>
                  <p className="text-xs text-slate-500">{opp.mode} • Stipend: {opp.stipend}</p>
                </div>
                <span className="text-xs text-slate-400 font-medium">Deadline: {opp.deadline}</span>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-200 text-xs">
                <div className="flex items-center gap-1.5 text-slate-600">
                  <Users className="w-4 h-4 text-teal-600" />
                  <span className="font-semibold">{candidates.length} Matched Applicants</span>
                </div>
                <span className="text-[11px] font-bold text-teal-700">Active Listing</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Candidate Shortlisting & Talent Search */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">AI Talent Search</span>
            <h2 className="text-xl font-extrabold text-slate-900">Student Candidate Shortlisting Engine</h2>
          </div>

          {/* Search & Status Filter Controls */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search by skill, name..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-9 pr-3 py-1.5 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-semibold bg-white"
            >
              <option value="All">All Statuses</option>
              <option value="Applied">Applied</option>
              <option value="Shortlisted">Shortlisted</option>
              <option value="Interviewing">Interviewing</option>
              <option value="Offered">Offered</option>
            </select>
          </div>
        </div>

        {/* Candidate Pool Table */}
        <div className="overflow-x-auto border border-slate-200 rounded-2xl">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                <th className="p-4">Candidate Profile</th>
                <th className="p-4">Institution & Dept</th>
                <th className="p-4 text-center">Skill Match</th>
                <th className="p-4">Top Verified Skills</th>
                <th className="p-4 text-center">Badges</th>
                <th className="p-4">Pipeline Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredCandidates.map((cand) => (
                <tr key={cand.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-4">
                    <div className="font-bold text-slate-900 text-sm">{cand.name}</div>
                    <div className="text-[10px] text-slate-400">{cand.email}</div>
                  </td>
                  <td className="p-4">
                    <div className="font-medium text-slate-800">{cand.institution}</div>
                    <div className="text-[10px] text-slate-500">{cand.department} (CGPA: {cand.cgpa})</div>
                  </td>
                  <td className="p-4 text-center">
                    <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-xs">
                      {cand.skillMatch}%
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex flex-wrap gap-1">
                      {cand.topSkills.map((sk, i) => (
                        <span key={i} className="px-2 py-0.5 bg-slate-100 text-slate-700 text-[10px] font-mono rounded">
                          {sk}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="p-4 text-center font-bold text-indigo-600">
                    <span className="flex items-center justify-center gap-1">
                      <Award className="w-3.5 h-3.5 text-amber-500" />
                      {cand.verifiedBadges}
                    </span>
                  </td>
                  <td className="p-4">
                    <select
                      value={cand.status}
                      onChange={e => updateCandidateStatus(cand.id, e.target.value)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold border ${
                        cand.status === 'Shortlisted'
                          ? 'bg-blue-50 text-blue-800 border-blue-200'
                          : cand.status === 'Interviewing'
                          ? 'bg-purple-50 text-purple-800 border-purple-200'
                          : cand.status === 'Offered'
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                          : 'bg-slate-100 text-slate-700 border-slate-300'
                      }`}
                    >
                      <option value="Applied">Applied</option>
                      <option value="Shortlisted">Shortlisted</option>
                      <option value="Interviewing">Interviewing</option>
                      <option value="Offered">Offered (PPO)</option>
                    </select>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => alert(`Reviewing candidate profile for ${cand.name}`)}
                      className="px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-bold text-[11px]"
                    >
                      View Profile
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Intern Progress & Certificate Issuance Hub */}
      <div className="bg-gradient-to-r from-slate-900 to-teal-950 text-white rounded-3xl p-6 sm:p-8 space-y-6">
        <div>
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Active Intern Management</span>
          <h2 className="text-xl font-extrabold text-white">Intern Performance & Digital Certificate Issuer</h2>
        </div>

        <div className="p-5 rounded-2xl bg-white/10 border border-white/15 backdrop-blur flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xl border border-emerald-400/30">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">Sneha Kulkarni — Full Stack Intern</h3>
              <p className="text-xs text-slate-300">Vellore Institute of Technology • Completed 6 Month Tenure</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[10px] bg-emerald-400/20 text-emerald-300 px-2 py-0.5 rounded font-semibold">
                  Mentor Rating: 4.9 / 5.0
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={() => alert("Digital Internship Completion Certificate issued to Sneha Kulkarni & verified on Skill2Hire network!")}
            className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-extrabold text-xs shadow-md transition-all shrink-0 flex items-center gap-2"
          >
            <Award className="w-4 h-4" />
            Issue Verified Certificate
          </button>
        </div>
      </div>
    </div>
  );
}
