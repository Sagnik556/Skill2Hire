import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { X, Clock, AlertTriangle, CheckCircle2, Award, ArrowRight, RotateCcw } from 'lucide-react';

export default function SkillAssessmentModal() {
  const { isAssessmentModalOpen, setIsAssessmentModalOpen, activeAssessment, submitAssessmentResult } = useApp();

  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes timer
  const [isCompleted, setIsCompleted] = useState(false);
  const [calculatedScore, setCalculatedScore] = useState(0);

  useEffect(() => {
    if (isAssessmentModalOpen) {
      setCurrentStep(0);
      setSelectedAnswers({});
      setTimeLeft((activeAssessment?.durationMinutes || 10) * 60);
      setIsCompleted(false);
    }
  }, [isAssessmentModalOpen, activeAssessment]);

  useEffect(() => {
    if (!isAssessmentModalOpen || isCompleted) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleFinishQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isAssessmentModalOpen, isCompleted]);

  if (!isAssessmentModalOpen || !activeAssessment) return null;

  const handleSelectOption = (questionIndex, optionIndex) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionIndex]: optionIndex
    });
  };

  const handleFinishQuiz = () => {
    let correct = 0;
    activeAssessment.questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) {
        correct += 1;
      }
    });

    const scorePct = Math.round((correct / activeAssessment.questions.length) * 100);
    setCalculatedScore(scorePct);
    setIsCompleted(true);
  };

  const handleSaveResults = () => {
    submitAssessmentResult(calculatedScore, activeAssessment.skillsEvaluated);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const currentQ = activeAssessment.questions[currentStep];

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden border border-slate-100 animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-700 to-indigo-800 p-6 text-white flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-200">
              <span>{activeAssessment.category}</span>
              <span>•</span>
              <span>{activeAssessment.difficulty} Difficulty</span>
            </div>
            <h2 className="text-xl font-bold mt-1">{activeAssessment.title}</h2>
          </div>
          <button
            onClick={() => setIsAssessmentModalOpen(false)}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!isCompleted ? (
          <div>
            {/* Progress & Timer Bar */}
            <div className="px-6 py-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs font-semibold text-slate-600">
              <div className="flex items-center gap-2">
                <span>Question {currentStep + 1} of {activeAssessment.questions.length}</span>
              </div>

              <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold ${
                timeLeft < 60 ? 'bg-red-100 text-red-700 animate-pulse' : 'bg-slate-200 text-slate-700'
              }`}>
                <Clock className="w-3.5 h-3.5" />
                <span>{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}</span>
              </div>
            </div>

            {/* Question Box */}
            <div className="p-6">
              <h3 className="text-base font-semibold text-slate-900 mb-4 leading-relaxed">
                {currentStep + 1}. {currentQ.question}
              </h3>

              <div className="space-y-3">
                {currentQ.options.map((optionText, optIdx) => {
                  const isSelected = selectedAnswers[currentStep] === optIdx;
                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelectOption(currentStep, optIdx)}
                      className={`w-full text-left p-4 rounded-xl border text-sm font-medium transition-all flex items-center gap-3 ${
                        isSelected
                          ? 'border-blue-600 bg-blue-50 text-blue-900 font-semibold shadow-sm'
                          : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center text-xs font-bold ${
                        isSelected ? 'border-blue-600 bg-blue-600 text-white' : 'border-slate-300 text-slate-500'
                      }`}>
                        {String.fromCharCode(65 + optIdx)}
                      </div>
                      <span>{optionText}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Modal Controls */}
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
              <button
                disabled={currentStep === 0}
                onClick={() => setCurrentStep(prev => prev - 1)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 disabled:opacity-40 hover:text-slate-900"
              >
                Previous Question
              </button>

              {currentStep < activeAssessment.questions.length - 1 ? (
                <button
                  onClick={() => setCurrentStep(prev => prev + 1)}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs flex items-center gap-2 shadow-sm transition-all"
                >
                  Next Question
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleFinishQuiz}
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-2 shadow-md transition-all"
                >
                  Submit & Score Test
                  <CheckCircle2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        ) : (
          /* Completion & Evaluation Summary Screen */
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
              <Award className="w-10 h-10" />
            </div>

            <div>
              <h3 className="text-2xl font-extrabold text-slate-900">Skill Assessment Complete!</h3>
              <p className="text-sm text-slate-600 mt-1">Your competency evaluation has been scored and mapped.</p>
            </div>

            {/* Score pill */}
            <div className="max-w-xs mx-auto p-6 rounded-2xl bg-gradient-to-b from-slate-50 to-slate-100 border border-slate-200 shadow-sm">
              <div className="text-4xl font-extrabold text-blue-700">{calculatedScore}%</div>
              <p className="text-xs font-bold text-slate-500 uppercase mt-1">Overall Competency Score</p>
              <div className="mt-3 inline-block px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                {calculatedScore >= 70 ? '✓ Verified Skill Credential Earned' : 'Skill Gap Identified (Learning Recommended)'}
              </div>
            </div>

            <div className="text-left bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-2">
              <span className="font-bold text-slate-800 block">Evaluated Competencies:</span>
              <div className="flex flex-wrap gap-2">
                {activeAssessment.skillsEvaluated.map((sk, idx) => (
                  <span key={idx} className="px-2.5 py-1 bg-white border border-slate-300 rounded-md font-medium text-slate-700">
                    {sk}: {calculatedScore >= 70 ? 'Proficient' : 'Needs Reinforcement'}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={handleSaveResults}
                className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
              >
                Update Skill Profile & Digital Portfolio
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
