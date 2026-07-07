import React, { useRef } from 'react';
import { Upload, CheckCircle, AlertCircle } from 'lucide-react';
import { DashboardLayout } from '../components/dashboard';
import Card from '../components/common/Card';
import { useStudyStore } from '../store/studyStore';
import { useToastStore } from '../store/toastStore';

const ResumePage: React.FC = () => {
  const { resume, analyzeResume } = useStudyStore();
  const toast = useToastStore();
  const inputRef = useRef<HTMLInputElement>(null);

  const [isAnalyzing, setIsAnalyzing] = React.useState(false);

  const handleFile = (file: File | undefined) => {
    if (!file) return;
    const valid =
      file.type === 'application/pdf' ||
      file.name.endsWith('.pdf') ||
      file.name.endsWith('.doc') ||
      file.name.endsWith('.docx');
    if (!valid) {
      toast.show('Please upload PDF or Word format', 'warning');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      toast.show('File must be under 10MB', 'error');
      return;
    }
    setIsAnalyzing(true);
    toast.show('Analyzing resume with AI...', 'info');
    setTimeout(() => {
      analyzeResume(file.name);
      setIsAnalyzing(false);
      toast.show('Resume analyzed successfully', 'success');
    }, 1500);
  };

  const resumeScore = resume?.score ?? 78;
  const suggestions = resume?.sections ?? [
    { section: 'Contact Information', score: 95, status: 'perfect' },
    { section: 'Summary', score: 72, status: 'needs-improvement' },
    { section: 'Skills', score: 85, status: 'good' },
    { section: 'Experience', score: 68, status: 'needs-improvement' },
    { section: 'Education', score: 90, status: 'good' },
  ];
  const improvements = resume?.improvements ?? [
    { priority: 'high', text: 'Add quantifiable metrics to your work experience' },
    { priority: 'high', text: 'Include relevant keywords for ATS optimization' },
    { priority: 'medium', text: 'Expand your skills section with technical skills' },
    { priority: 'medium', text: 'Add certifications and achievements' },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-navy-800 dark:text-earth-100">Resume Analyzer</h1>
          <p className="text-earth-500 dark:text-earth-400 mt-2">Get AI-powered feedback to optimize your resume</p>
          {resume && (
            <p className="text-sm text-brand-600 mt-2">
              Last analyzed: {resume.fileName} · {new Date(resume.analyzedAt).toLocaleString()}
            </p>
          )}
        </div>

        <div
          className={`bg-gradient-brand bg-opacity-5 border-2 border-dashed border-brand-300 rounded-lg p-12 text-center ${isAnalyzing ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          onClick={() => !isAnalyzing && inputRef.current?.click()}
        >
          <Upload size={48} className={`mx-auto text-brand-500 mb-4 ${isAnalyzing ? 'animate-bounce' : ''}`} />
          <h3 className="text-xl font-semibold text-navy-800 dark:text-earth-100">
            {isAnalyzing ? 'Analyzing with AI...' : 'Upload your resume'}
          </h3>
          <p className="text-earth-500 mt-2">PDF or Word format (Max 10MB)</p>
          <input
            ref={inputRef}
            type="file"
            className="hidden"
            accept=".pdf,.doc,.docx,application/pdf"
            onChange={(e) => handleFile(e.target.files?.[0])}
            disabled={isAnalyzing}
          />
          <div className="mt-6">
            <span className={`btn-outline inline-block ${isAnalyzing ? 'pointer-events-none' : 'cursor-pointer'}`}>
              Choose File
            </span>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-1">
            <div className="text-center">
              <div className="relative w-32 h-32 mx-auto mb-4">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="#E8E3DE" strokeWidth="8" />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="url(#grad)"
                    strokeWidth="8"
                    strokeDasharray={`${(resumeScore / 100) * 283} 283`}
                    strokeLinecap="round"
                    style={{ transform: 'rotate(-90deg)', transformOrigin: '50px 50px' }}
                  />
                  <defs>
                    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FF6B00" />
                      <stop offset="100%" stopColor="#FFA500" />
                    </linearGradient>
                  </defs>
                </svg>
                <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl font-bold text-navy-800 dark:text-earth-100">
                  {resumeScore}
                </p>
              </div>
              <p className="text-lg font-semibold text-navy-800 dark:text-earth-100">Overall Score</p>
              <p className="text-sm text-earth-500 mt-2">
                {resumeScore >= 80 ? 'Strong' : resumeScore >= 70 ? 'Good' : 'Needs work'} · Room for improvement
              </p>
            </div>
          </Card>

          <Card className="lg:col-span-2">
            <h3 className="text-xl font-semibold text-navy-800 dark:text-earth-100 mb-4">Section Scores</h3>
            <div className="space-y-3">
              {suggestions.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between pb-3 border-b border-earth-200 dark:border-navy-600 last:border-b-0"
                >
                  <div className="flex items-center gap-3">
                    {item.status === 'perfect' ? (
                      <CheckCircle size={20} className="text-green-500" />
                    ) : (
                      <AlertCircle size={20} className="text-orange-500" />
                    )}
                    <span className="text-navy-800 dark:text-earth-100 font-medium">{item.section}</span>
                  </div>
                  <span className="text-lg font-bold text-brand-500">{item.score}%</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <Card>
          <h3 className="text-xl font-semibold text-navy-800 dark:text-earth-100 mb-4">AI Improvement Suggestions</h3>
          <div className="space-y-3">
            {improvements.map((suggestion, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg ${
                  suggestion.priority === 'high'
                    ? 'bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800'
                    : 'bg-orange-50 dark:bg-orange-950 border border-orange-200 dark:border-orange-800'
                }`}
              >
                <div className="flex items-start gap-3">
                  <span
                    className={`px-3 py-1 rounded text-xs font-semibold ${
                      suggestion.priority === 'high'
                        ? 'bg-red-200 text-red-700'
                        : 'bg-orange-200 text-orange-700'
                    }`}
                  >
                    {suggestion.priority.toUpperCase()}
                  </span>
                  <p className="text-navy-800 dark:text-earth-100 flex-1">{suggestion.text}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ResumePage;
