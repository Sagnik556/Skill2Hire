import React from 'react';
import { useApp } from '../context/AppContext';
import {
  GraduationCap,
  Building2,
  BookOpenCheck,
  Landmark,
  Sparkles,
  Award,
  Bell,
  UserCheck,
  CheckCircle2,
  Info
} from 'lucide-react';

export default function Navbar() {
  const { userRole, switchRole, studentProfile, notification } = useApp();

  const roleConfigs = [
    { id: 'student', label: 'Student Portal', icon: GraduationCap, color: 'bg-blue-600' },
    { id: 'industry', label: 'Industry Recruiter', icon: Building2, color: 'bg-teal-600' },
    { id: 'academician', label: 'Academician / Faculty', icon: BookOpenCheck, color: 'bg-purple-600' },
    { id: 'institution', label: 'Institution Admin', icon: Landmark, color: 'bg-amber-600' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200 shadow-sm">
      {/* Toast Notification Banner */}
      {notification && (
        <div
          className={`px-4 py-2 text-sm font-medium text-white flex items-center justify-center gap-2 transition-all animate-bounce ${
            notification.type === 'success'
              ? 'bg-emerald-600'
              : notification.type === 'info'
              ? 'bg-blue-600'
              : 'bg-amber-600'
          }`}
        >
          {notification.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <Info className="w-4 h-4" />}
          {notification.message}
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Platform Name */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-blue-700 via-indigo-700 to-teal-600 bg-clip-text text-transparent">
                  Skill2Hire
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 border border-blue-200 uppercase tracking-wider">
                  v2.0 AI-Mapped
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium">Academia–Industry Collaboration Platform</p>
            </div>
          </div>

          {/* Persona Switcher Tabs */}
          <div className="hidden md:flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200/80">
            {roleConfigs.map((role) => {
              const Icon = role.icon;
              const isActive = userRole === role.id;
              return (
                <button
                  key={role.id}
                  onClick={() => switchRole(role.id)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    isActive
                      ? `${role.color} text-white shadow-sm scale-105`
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {role.label}
                </button>
              );
            })}
          </div>

          {/* Right Action Icons & Profile Info */}
          <div className="flex items-center gap-3">
            <div className="relative p-2 rounded-full hover:bg-slate-100 cursor-pointer text-slate-600">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-blue-600 ring-2 ring-white"></span>
            </div>

            <div className="h-8 w-[1px] bg-slate-200 mx-1 hidden sm:block"></div>

            {/* Profile Pill */}
            <div className="flex items-center gap-2 pl-2">
              <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center text-xs border border-indigo-200">
                {userRole === 'student' ? 'RS' : userRole === 'industry' ? 'DM' : userRole === 'academician' ? 'DR' : 'AD'}
              </div>
              <div className="hidden lg:block text-left">
                <p className="text-xs font-bold text-slate-800 leading-tight">
                  {userRole === 'student'
                    ? studentProfile.name
                    : userRole === 'industry'
                    ? 'DataMind AI Recruiter'
                    : userRole === 'academician'
                    ? 'Prof. Dr. V. K. Raman'
                    : 'Institution Admin'}
                </p>
                <p className="text-[10px] text-slate-500 font-medium capitalize flex items-center gap-1">
                  <UserCheck className="w-3 h-3 text-emerald-600" />
                  {userRole} Account
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile View Role Switcher */}
        <div className="md:hidden flex items-center justify-around py-2 border-t border-slate-100 overflow-x-auto">
          {roleConfigs.map((role) => {
            const Icon = role.icon;
            const isActive = userRole === role.id;
            return (
              <button
                key={role.id}
                onClick={() => switchRole(role.id)}
                className={`flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-semibold whitespace-nowrap ${
                  isActive ? `${role.color} text-white` : 'text-slate-600'
                }`}
              >
                <Icon className="w-3 h-3" />
                {role.id}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}
