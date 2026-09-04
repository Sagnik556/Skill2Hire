import React from 'react';
import { useApp } from '../context/AppContext';
import { X, Building2, MapPin, Calendar, DollarSign, CheckCircle, AlertCircle, Briefcase, ArrowUpRight } from 'lucide-react';

export default function OpportunityDetailModal() {
  const { selectedOpportunity, setSelectedOpportunity, applyForOpportunity, studentProfile, applications } = useApp();

  if (!selectedOpportunity) return null;

  const hasApplied = applications.some(a => a.opportunityId === selectedOpportunity.id);

  // Check matched vs missing skills
  const studentSkillNames = studentProfile.skills.map(s => s.name.toLowerCase());

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden border border-slate-100 animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-slate-900 to-indigo-950 text-white relative">
          <button
            onClick={() => setSelectedOpportunity(null)}
            className="absolute top-5 right-5 p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 text-2xl flex items-center justify-center shadow-md">
              {selectedOpportunity.logo || '🏢'}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold border border-blue-400/30">
                  {selectedOpportunity.type}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-400/30">
                  {selectedOpportunity.matchPercent}% Skill Match
                </span>
              </div>
              <h2 className="text-xl font-bold text-white">{selectedOpportunity.title}</h2>
              <p className="text-sm text-slate-300 font-medium">{selectedOpportunity.company}</p>
            </div>
          </div>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-3 gap-2 mt-6 pt-4 border-t border-white/10 text-xs">
            <div className="flex items-center gap-2 text-slate-300">
              <MapPin className="w-4 h-4 text-blue-400 shrink-0" />
              <span className="truncate">{selectedOpportunity.mode}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <DollarSign className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="truncate">{selectedOpportunity.stipend}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <Calendar className="w-4 h-4 text-purple-400 shrink-0" />
              <span className="truncate">Deadline: {selectedOpportunity.deadline}</span>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 max-h-[60vh] overflow-y-auto space-y-6">
          {/* Required Skills & Student Match Checklist */}
          <div>
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
              Required Skills & Profile Compatibility
            </h3>
            <div className="flex flex-wrap gap-2">
              {selectedOpportunity.requiredSkills.map((skillName, idx) => {
                const isMatched = studentSkillNames.some(s => s.includes(skillName.toLowerCase()));
                return (
                  <div
                    key={idx}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border ${
                      isMatched
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                        : 'bg-amber-50 border-amber-200 text-amber-900'
                    }`}
                  >
                    {isMatched ? (
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                    )}
                    <span>{skillName}</span>
                    <span className="text-[10px] font-normal text-slate-500">
                      ({isMatched ? 'Proficient' : 'Missing'})
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Role Overview</h3>
            <p className="text-sm text-slate-700 leading-relaxed">{selectedOpportunity.description}</p>
          </div>

          {/* Key Responsibilities */}
          {selectedOpportunity.responsibilities && (
            <div>
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Key Responsibilities</h3>
              <ul className="space-y-2 text-sm text-slate-700">
                {selectedOpportunity.responsibilities.map((resp, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Perks */}
          {selectedOpportunity.perks && (
            <div>
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Perks & Benefits</h3>
              <div className="flex flex-wrap gap-2">
                {selectedOpportunity.perks.map((perk, idx) => (
                  <span key={idx} className="px-2.5 py-1 bg-slate-100 rounded-md text-xs font-medium text-slate-700">
                    ✨ {perk}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={() => setSelectedOpportunity(null)}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
          >
            Close
          </button>

          <button
            disabled={hasApplied}
            onClick={() => {
              applyForOpportunity(selectedOpportunity);
              setSelectedOpportunity(null);
            }}
            className={`px-6 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 shadow-md transition-all ${
              hasApplied
                ? 'bg-slate-300 text-slate-600 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {hasApplied ? (
              <>
                <CheckCircle className="w-4 h-4" />
                Already Applied
              </>
            ) : (
              <>
                Apply Now with Verified Skill Profile
                <ArrowUpRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
