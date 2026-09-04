import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Award, CheckCircle2, ExternalLink, Download, Plus, FileText, Globe, Code, ShieldCheck } from 'lucide-react';

export default function DigitalPortfolioModal() {
  const { isPortfolioModalOpen, setIsPortfolioModalOpen, studentProfile, addProjectToPortfolio } = useApp();

  const [showAddProject, setShowAddProject] = useState(false);
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    techStackStr: 'React, Node.js',
    githubUrl: 'https://github.com/rohan/project',
    liveUrl: 'https://demo.vercel.app'
  });

  if (!isPortfolioModalOpen) return null;

  const handleCreateProject = (e) => {
    e.preventDefault();
    addProjectToPortfolio({
      title: newProject.title,
      description: newProject.description,
      techStack: newProject.techStackStr.split(',').map(s => s.trim()),
      githubUrl: newProject.githubUrl,
      liveUrl: newProject.liveUrl
    });
    setShowAddProject(false);
    setNewProject({ title: '', description: '', techStackStr: 'React, Node.js', githubUrl: '', liveUrl: '' });
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full overflow-hidden border border-slate-100 animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 p-6 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-emerald-400 font-bold text-xl">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 uppercase tracking-wider">
                  Verified Digital Portfolio
                </span>
                <span className="text-xs text-slate-300">ID: SK2H-STUDENT-101</span>
              </div>
              <h2 className="text-xl font-bold mt-1 text-white">{studentProfile.name}</h2>
              <p className="text-xs text-slate-300">{studentProfile.institution} • {studentProfile.department}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => alert("Digital Portfolio PDF exported successfully!")}
              className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1.5 transition-all"
            >
              <Download className="w-4 h-4" />
              Export PDF
            </button>
            <button
              onClick={() => setIsPortfolioModalOpen(false)}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Portfolio Body */}
        <div className="p-6 max-h-[70vh] overflow-y-auto space-y-6">
          {/* Verified Badges Summary */}
          <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Award className="w-8 h-8 text-blue-600" />
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  {studentProfile.verifiedBadgeCount} Verified Skill Badges Earned
                </h3>
                <p className="text-xs text-slate-600">All badges are cryptographically signed by Skill2Hire industry partner test suites.</p>
              </div>
            </div>
            <div className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Fully Verified
            </div>
          </div>

          {/* Verified Competencies */}
          <div>
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
              Verified Technical & Soft Skills
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {studentProfile.skills.map((skill, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-xl border flex items-center justify-between text-xs font-medium ${
                    skill.verified
                      ? 'bg-emerald-50/50 border-emerald-200 text-slate-800'
                      : 'bg-slate-50 border-slate-200 text-slate-500'
                  }`}
                >
                  <div>
                    <span className="font-bold block">{skill.name}</span>
                    <span className="text-[10px] text-slate-500">Score: {skill.score}%</span>
                  </div>
                  {skill.verified ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  ) : (
                    <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded">Unverified</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Featured Projects */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Featured Verified Projects
              </h3>
              <button
                onClick={() => setShowAddProject(!showAddProject)}
                className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                Add New Project
              </button>
            </div>

            {/* Add Project Form */}
            {showAddProject && (
              <form onSubmit={handleCreateProject} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3 mb-4 text-xs">
                <h4 className="font-bold text-slate-800">Add Project to Portfolio</h4>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    required
                    placeholder="Project Title"
                    value={newProject.title}
                    onChange={e => setNewProject({ ...newProject, title: e.target.value })}
                    className="p-2 rounded border border-slate-300 font-medium"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Tech Stack (Comma separated)"
                    value={newProject.techStackStr}
                    onChange={e => setNewProject({ ...newProject, techStackStr: e.target.value })}
                    className="p-2 rounded border border-slate-300 font-medium"
                  />
                </div>
                <textarea
                  required
                  placeholder="Short description of technical architecture & impact..."
                  value={newProject.description}
                  onChange={e => setNewProject({ ...newProject, description: e.target.value })}
                  className="w-full p-2 rounded border border-slate-300 font-medium"
                  rows={2}
                />
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="url"
                    placeholder="GitHub Repo URL"
                    value={newProject.githubUrl}
                    onChange={e => setNewProject({ ...newProject, githubUrl: e.target.value })}
                    className="p-2 rounded border border-slate-300 font-medium"
                  />
                  <input
                    type="url"
                    placeholder="Live Demo URL"
                    value={newProject.liveUrl}
                    onChange={e => setNewProject({ ...newProject, liveUrl: e.target.value })}
                    className="p-2 rounded border border-slate-300 font-medium"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700"
                >
                  Save & Verify Project
                </button>
              </form>
            )}

            <div className="space-y-3">
              {studentProfile.projects.map((proj) => (
                <div key={proj.id} className="p-4 rounded-xl border border-slate-200 bg-white hover:shadow-sm transition-all">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-sm text-slate-900">{proj.title}</h4>
                        <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded">
                          ✓ Institution Verified
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 mt-1">{proj.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100 text-xs">
                    <div className="flex flex-wrap gap-1.5">
                      {proj.techStack.map((tech, i) => (
                        <span key={i} className="px-2 py-0.5 bg-slate-100 text-slate-700 font-mono text-[10px] rounded">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-3">
                      {proj.githubUrl && (
                        <a href={proj.githubUrl} target="_blank" rel="noreferrer" className="text-slate-600 hover:text-slate-900 flex items-center gap-1 font-semibold">
                          <Code className="w-3.5 h-3.5" /> Code
                        </a>
                      )}
                      {proj.liveUrl && (
                        <a href={proj.liveUrl} target="_blank" rel="noreferrer" className="text-blue-600 hover:text-blue-800 flex items-center gap-1 font-bold">
                          <Globe className="w-3.5 h-3.5" /> Demo
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
              Verified Industry Certifications
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {studentProfile.certifications.map((cert) => (
                <div key={cert.id} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 flex items-center gap-3">
                  <FileText className="w-8 h-8 text-indigo-600 shrink-0" />
                  <div>
                    <h4 className="font-bold text-xs text-slate-900">{cert.name}</h4>
                    <p className="text-[11px] text-slate-500">{cert.issuer} • Issued {cert.issueDate}</p>
                    <p className="text-[10px] text-slate-400 font-mono mt-0.5">Credential: {cert.credentialId}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 text-right">
          <button
            onClick={() => setIsPortfolioModalOpen(false)}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs"
          >
            Close Portfolio
          </button>
        </div>
      </div>
    </div>
  );
}
