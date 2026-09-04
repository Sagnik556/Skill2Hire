import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Award,
  BookOpen,
  Briefcase,
  CheckCircle2,
  ChevronRight,
  Clock,
  Sparkles,
  TrendingUp,
  AlertTriangle,
  ArrowUpRight,
  ExternalLink,
  Target,
  FileCheck2,
  FolderPlus,
  Play
} from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

export default function StudentDashboard() {
  const {
    studentProfile,
    opportunities,
    applications,
    assessments,
    learningPrograms,
    setSelectedOpportunity,
    startAssessment,
    setIsPortfolioModalOpen,
    applyForOpportunity
  } = useApp();

  // Radar data formatting
  const radarData = studentProfile.skills.map(s => ({
    subject: s.name.split('/')[0].trim(),
    score: s.score,
    industryBenchmark: 85
  }));

  return (
    <div className="space-y-8 pb-12">
      {/* Student Welcome Banner & Quick Stats */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold border border-blue-400/30">
                {studentProfile.degree} • {studentProfile.year}
              </span>
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-400/30">
                CGPA: {studentProfile.cgpa}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Welcome back, {studentProfile.name}! 👋
            </h1>
            <p className="text-sm text-slate-300 max-w-xl mt-1 leading-relaxed">
              {studentProfile.bio}
            </p>
          </div>

          {/* Quick Portfolio Button */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setIsPortfolioModalOpen(true)}
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold text-xs shadow-lg shadow-emerald-600/30 flex items-center gap-2 transition-all hover:scale-105"
            >
              <Award className="w-4 h-4" />
              View Digital Verified Portfolio
            </button>
          </div>
        </div>

        {/* Stats Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-white/10">
          <div className="bg-white/5 backdrop-blur rounded-2xl p-4 border border-white/10">
            <p className="text-xs font-semibold text-slate-300">Avg Skill Match</p>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-extrabold text-blue-400">{studentProfile.skillMatchAverage}%</span>
              <span className="text-[10px] text-emerald-400 font-bold">↑ High Readiness</span>
            </div>
          </div>
          <div className="bg-white/5 backdrop-blur rounded-2xl p-4 border border-white/10">
            <p className="text-xs font-semibold text-slate-300">Verified Badges</p>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-extrabold text-emerald-400">{studentProfile.verifiedBadgeCount}</span>
              <span className="text-[10px] text-slate-400">Industry Evaluated</span>
            </div>
          </div>
          <div className="bg-white/5 backdrop-blur rounded-2xl p-4 border border-white/10">
            <p className="text-xs font-semibold text-slate-300">Active Applications</p>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-extrabold text-purple-400">{applications.length}</span>
              <span className="text-[10px] text-purple-300 font-medium">Track Status</span>
            </div>
          </div>
          <div className="bg-white/5 backdrop-blur rounded-2xl p-4 border border-white/10">
            <p className="text-xs font-semibold text-slate-300">Projects Showcase</p>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-extrabold text-amber-400">{studentProfile.projects.length}</span>
              <span className="text-[10px] text-amber-300">Verified Projects</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Skill Gap Radar & Target Career Path */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Radar Chart: Skill Profile vs Industry Standard */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600">
                AI Skill Profiler
              </span>
              <h2 className="text-lg font-extrabold text-slate-900">Assessed Skill Competency Radar</h2>
            </div>
            <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
              Industry Baseline: 85%
            </span>
          </div>

          <div className="h-64 sm:h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#475569', fontSize: 11, fontWeight: 600 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} />
                <Radar name="Your Competency" dataKey="score" stroke="#2563eb" fill="#3b82f6" fillOpacity={0.4} />
                <Radar name="Industry Standard" dataKey="industryBenchmark" stroke="#10b981" fill="#10b981" fillOpacity={0.15} strokeDasharray="3 3" />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-100 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-blue-500 inline-block"></span>
              <span className="text-slate-700 font-medium">Your Verified Score</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span>
              <span className="text-slate-700 font-medium">Target Industry Requirement</span>
            </div>
          </div>
        </div>

        {/* Skill Gap & Career Recommendation Cards */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-amber-600 mb-2">
              <Target className="w-5 h-5" />
              <h2 className="text-base font-extrabold text-slate-900">Skill Gap & Role Recommendation</h2>
            </div>

            {studentProfile.targetRoles.map((target, idx) => (
              <div key={idx} className="mb-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm text-slate-900">{target.role}</h3>
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 font-extrabold text-xs">
                    {target.matchPercent}% Match
                  </span>
                </div>

                <div className="mt-2 text-xs">
                  <span className="text-slate-500 font-bold block mb-1">Identified Skill Gaps:</span>
                  <div className="flex flex-wrap gap-1">
                    {target.missingSkills.map((mSkill, i) => (
                      <span key={i} className="px-2 py-0.5 bg-amber-100 text-amber-900 font-semibold rounded text-[10px]">
                        ⚠️ {mSkill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => startAssessment(assessments[0])}
            className="w-full py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all"
          >
            <Sparkles className="w-4 h-4" />
            Take Skill Assessment to Close Gaps
          </button>
        </div>
      </div>

      {/* Available Skill Assessment Questionnaires */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">Industry Tests</span>
            <h2 className="text-lg font-extrabold text-slate-900">Skill Assessment & Aptitude Questionnaires</h2>
          </div>
          <span className="text-xs text-slate-500">Verified by Partner Recruiters</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {assessments.map((assess) => (
            <div key={assess.id} className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-all flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2.5 py-1 rounded-md bg-indigo-100 text-indigo-800 text-[11px] font-bold">
                    {assess.category}
                  </span>
                  <span className="text-xs text-slate-500 flex items-center gap-1 font-medium">
                    <Clock className="w-3.5 h-3.5" /> {assess.durationMinutes} Mins
                  </span>
                </div>
                <h3 className="font-bold text-slate-900 text-base">{assess.title}</h3>
                <p className="text-xs text-slate-600 mt-1">
                  Evaluates: {assess.skillsEvaluated.join(', ')}
                </p>
              </div>

              <button
                onClick={() => startAssessment(assess)}
                className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <Play className="w-4 h-4 fill-white" />
                Start Interactive Assessment ({assess.questions.length} Questions)
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Industry Opportunities (Internships & Jobs) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-teal-600 uppercase tracking-wider">Matched Opportunities</span>
            <h2 className="text-xl font-extrabold text-slate-900">Recommended Industry Internships & Jobs</h2>
          </div>
          <span className="text-xs font-bold text-slate-500">{opportunities.length} Listings Available</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {opportunities.map((opp) => (
            <div key={opp.id} className="p-6 rounded-3xl bg-white border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-slate-100 text-2xl flex items-center justify-center border border-slate-200">
                      {opp.logo}
                    </div>
                    <div>
                      <h3 className="font-extrabold text-base text-slate-900">{opp.title}</h3>
                      <p className="text-xs text-slate-500 font-medium">{opp.company}</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-xs border border-emerald-200">
                    {opp.matchPercent}% Match
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 mt-3 text-xs text-slate-600">
                  <span className="px-2.5 py-1 bg-slate-100 rounded-md font-semibold">{opp.type}</span>
                  <span className="px-2.5 py-1 bg-slate-100 rounded-md font-semibold">{opp.mode}</span>
                  <span className="px-2.5 py-1 bg-blue-50 text-blue-800 font-bold">{opp.stipend}</span>
                </div>

                <p className="text-xs text-slate-600 mt-3 line-clamp-2">{opp.description}</p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {opp.requiredSkills.slice(0, 3).map((sk, i) => (
                    <span key={i} className="text-[10px] font-mono bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                      {sk}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => setSelectedOpportunity(opp)}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all"
                >
                  View Details & Apply
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Application Status Tracker */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-purple-600 uppercase tracking-wider">Recruitment Pipeline</span>
            <h2 className="text-lg font-extrabold text-slate-900">Your Active Internship & Job Applications</h2>
          </div>
          <span className="text-xs text-slate-500 font-semibold">{applications.length} Submissions</span>
        </div>

        <div className="space-y-3">
          {applications.map((app) => (
            <div key={app.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-sm text-slate-900">{app.opportunityTitle}</h3>
                  <span className="text-xs text-slate-500 font-medium">• {app.company}</span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">Applied on: {app.appliedDate} • Match Score: {app.matchScore}%</p>
                <p className="text-xs font-medium text-indigo-700 mt-1">Feedback: "{app.feedback}"</p>
              </div>

              {/* Status Pill */}
              <div className="flex items-center gap-2 shrink-0">
                <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                  app.status === 'Shortlisted'
                    ? 'bg-blue-100 text-blue-800 border-blue-200'
                    : app.status === 'Interviewing'
                    ? 'bg-purple-100 text-purple-800 border-purple-200'
                    : app.status === 'Offered'
                    ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
                    : 'bg-slate-200 text-slate-700 border-slate-300'
                }`}>
                  ● {app.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Industry Learning Programs & Certifications */}
      <div className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Skill Upskilling</span>
            <h2 className="text-xl font-extrabold text-white">Company-Sponsored Learning Programs</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {learningPrograms.map((prog) => (
            <div key={prog.id} className="p-5 rounded-2xl bg-white/10 border border-white/15 backdrop-blur space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 bg-amber-400/20 text-amber-300 border border-amber-400/30 text-[10px] font-bold rounded">
                  {prog.category}
                </span>
                <span className="text-xs text-slate-300 font-semibold">{prog.duration}</span>
              </div>
              <h3 className="font-bold text-white text-base">{prog.title}</h3>
              <p className="text-xs text-slate-300">{prog.description}</p>
              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs">
                <span className="text-emerald-400 font-semibold">🏅 {prog.badgeProvided}</span>
                <button
                  onClick={() => alert(`Enrolled in ${prog.title}!`)}
                  className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs"
                >
                  Enroll Free
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
