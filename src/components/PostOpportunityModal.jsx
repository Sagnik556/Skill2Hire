import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Plus, Building2, Briefcase } from 'lucide-react';

export default function PostOpportunityModal() {
  const { isPostModalOpen, setIsPostModalOpen, postNewOpportunity } = useApp();

  const [formData, setFormData] = useState({
    title: '',
    company: 'DataMind AI Technologies',
    logo: '⚡',
    type: 'Internship',
    duration: '6 Months',
    mode: 'Hybrid (Bangalore)',
    stipend: '₹35,000 / month',
    deadline: '2026-10-15',
    requiredSkillsStr: 'React, Node.js, Python, PostgreSQL',
    description: '',
    responsibilitiesStr: 'Develop web apps, API integration, Collaborate with team'
  });

  if (!isPostModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    const skillsArray = formData.requiredSkillsStr.split(',').map(s => s.trim()).filter(Boolean);
    const respArray = formData.responsibilitiesStr.split(',').map(s => s.trim()).filter(Boolean);

    postNewOpportunity({
      title: formData.title,
      company: formData.company,
      logo: formData.logo,
      type: formData.type,
      duration: formData.duration,
      mode: formData.mode,
      stipend: formData.stipend,
      deadline: formData.deadline,
      requiredSkills: skillsArray,
      description: formData.description,
      responsibilities: respArray,
      perks: ['Pre-Placement Offer (PPO)', 'Mentorship', 'Flexible Hours']
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full overflow-hidden border border-slate-100 animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-700 to-emerald-800 p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Briefcase className="w-5 h-5" />
            <h2 className="text-lg font-bold">Post New Opportunity for Students</h2>
          </div>
          <button
            onClick={() => setIsPostModalOpen(false)}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto text-xs">
          <div>
            <label className="font-bold text-slate-700 block mb-1">Opportunity Title *</label>
            <input
              type="text"
              required
              placeholder="e.g. AI Frontend Developer Intern"
              value={formData.title}
              onChange={e => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 font-medium"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Company Name</label>
              <input
                type="text"
                required
                value={formData.company}
                onChange={e => setFormData({ ...formData, company: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 font-medium"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Opportunity Type</label>
              <select
                value={formData.type}
                onChange={e => setFormData({ ...formData, type: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 font-medium bg-white"
              >
                <option value="Internship">Internship</option>
                <option value="Placement (Full-Time)">Placement (Full-Time)</option>
                <option value="Apprenticeship">Apprenticeship</option>
                <option value="Faculty Internship">Faculty Internship</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Duration</label>
              <input
                type="text"
                value={formData.duration}
                onChange={e => setFormData({ ...formData, duration: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 font-medium"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Stipend / Salary</label>
              <input
                type="text"
                value={formData.stipend}
                onChange={e => setFormData({ ...formData, stipend: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 font-medium"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Deadline Date</label>
              <input
                type="date"
                value={formData.deadline}
                onChange={e => setFormData({ ...formData, deadline: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 font-medium"
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Required Skills (Comma separated) *</label>
            <input
              type="text"
              required
              placeholder="React, Node.js, Python, AWS"
              value={formData.requiredSkillsStr}
              onChange={e => setFormData({ ...formData, requiredSkillsStr: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 font-medium"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Role Description *</label>
            <textarea
              required
              rows={3}
              placeholder="Describe the opportunity responsibilities and what candidates will work on..."
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 font-medium"
            />
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
            <button
              type="button"
              onClick={() => setIsPostModalOpen(false)}
              className="px-4 py-2 font-semibold text-slate-600 hover:text-slate-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold flex items-center gap-2 shadow-md"
            >
              <Plus className="w-4 h-4" />
              Publish Opportunity
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
