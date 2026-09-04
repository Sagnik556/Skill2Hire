import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Landmark,
  TrendingUp,
  Award,
  Building2,
  Users,
  BarChart2,
  PieChart as PieChartIcon,
  CheckCircle2,
  AlertTriangle,
  FileSpreadsheet
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend, FunnelChart, Funnel, LabelList } from 'recharts';

export default function InstitutionDashboard() {
  const { analytics } = useApp();

  return (
    <div className="space-y-8 pb-12">
      {/* Institution Banner */}
      <div className="bg-gradient-to-r from-amber-900 via-yellow-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-400/30">
              Institutional Admin Portal
            </span>
            <span className="px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-300 text-xs font-bold border border-yellow-400/30">
              National Institute of Technology
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Institutional Skill & Placement Analytics
          </h1>
          <p className="text-sm text-slate-300 max-w-xl mt-1">
            Data-driven insights into student skill development, department-level skill gaps, placement outcomes, and curriculum alignment with industry demands.
          </p>
        </div>

        <button
          onClick={() => alert("Full Accreditation & Placement Audit Report exported!")}
          className="px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-slate-950 font-extrabold text-xs shadow-lg shadow-amber-600/30 flex items-center gap-2 transition-all hover:scale-105 shrink-0"
        >
          <FileSpreadsheet className="w-4 h-4" />
          Export NIRF/NAAC Audit Report
        </button>
      </div>

      {/* KPI Cards Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
          <p className="text-xs font-semibold text-slate-500">Overall Placement Rate</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-extrabold text-amber-600">{analytics.overallPlacementRate}%</span>
            <span className="text-xs text-emerald-600 font-bold">↑ +4.2% YoY</span>
          </div>
          <p className="text-[10px] text-slate-400 mt-1">Current Academic Year</p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
          <p className="text-xs font-semibold text-slate-500">Average Stipend / Package</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-extrabold text-emerald-600">{analytics.avgPackage}</span>
          </div>
          <p className="text-[10px] text-slate-500 font-medium mt-1">Intern Stipend: {analytics.avgStipend}</p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
          <p className="text-xs font-semibold text-slate-500">Assessed Students</p>
          <p className="text-2xl font-extrabold text-blue-600 mt-1">{analytics.totalStudentsAssessed}</p>
          <p className="text-[10px] text-blue-600 font-semibold mt-1">{analytics.activeInternships} Active Internships</p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
          <p className="text-xs font-semibold text-slate-500">Industry Partners</p>
          <p className="text-2xl font-extrabold text-purple-600 mt-1">{analytics.partnerCompanies} Companies</p>
          <p className="text-[10px] text-purple-600 font-semibold mt-1">Active MoU Signed</p>
        </div>
      </div>

      {/* Main Charts: Skill Demand vs Syllabus & Departmental Gap */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Industry Demand vs Syllabus Coverage Chart */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div>
            <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">Curriculum Alignment</span>
            <h2 className="text-lg font-extrabold text-slate-900">In-Demand Skills vs Academic Syllabus</h2>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analytics.skillDemandVsSyllabus} margin={{ top: 20, right: 20, left: -10, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="skill" tick={{ fontSize: 10, fill: '#64748b' }} interval={0} angle={-15} textAnchor="end" />
                <YAxis domain={[0, 100]} tick={{ fontSize: 10 }} />
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: '11px', pt: '10px' }} />
                <Bar name="Industry Market Demand %" dataKey="demand" fill="#d97706" radius={[4, 4, 0, 0]} />
                <Bar name="Current Syllabus Coverage %" dataKey="syllabusCoverage" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Departmental Skill Gap Analysis */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div>
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Departmental Breakdown</span>
            <h2 className="text-lg font-extrabold text-slate-900">Department Skill Gap Heatmap</h2>
          </div>

          <div className="space-y-4">
            {analytics.departmentSkillGaps.map((dept, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="font-bold text-slate-900">{dept.department}</span>
                  <span className={`font-extrabold px-2 py-0.5 rounded text-[11px] ${
                    dept.gap > 15 ? 'bg-red-100 text-red-800' : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {dept.gap}% Skill Gap Identified
                  </span>
                </div>

                {/* Dual progress bar */}
                <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden flex">
                  <div style={{ width: `${dept.studentProficiency}%` }} className="bg-blue-600 h-full"></div>
                  <div style={{ width: `${dept.gap}%` }} className="bg-amber-400 h-full"></div>
                </div>

                <div className="flex justify-between items-center text-[10px] text-slate-500 mt-1 font-medium">
                  <span>Student Proficiency: {dept.studentProficiency}%</span>
                  <span>Industry Benchmark: {dept.industryRequired}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recruitment Funnel Overview */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-purple-600 uppercase tracking-wider">Placement Lifecycle</span>
            <h2 className="text-lg font-extrabold text-slate-900">Institutional Placement Recruitment Funnel</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 pt-2">
          {analytics.placementFunnel.map((step, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-gradient-to-b from-slate-50 to-slate-100 border border-slate-200 text-center">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                Stage {idx + 1}
              </span>
              <div className="text-xl font-extrabold text-indigo-900">{step.count}</div>
              <p className="text-xs font-semibold text-slate-700 mt-1">{step.stage}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
