import React from 'react';
import { Upload, CheckCircle, AlertCircle } from 'lucide-react';
import { DashboardLayout } from '../components/dashboard';
import Card from '../components/common/Card';

const ResumePage: React.FC = () => {
  const resumeScore = 78;
  const suggestions = [
    { section: 'Contact Information', score: 95, status: 'perfect' },
    { section: 'Summary', score: 72, status: 'needs-improvement' },
    { section: 'Skills', score: 85, status: 'good' },
    { section: 'Experience', score: 68, status: 'needs-improvement' },
    { section: 'Education', score: 90, status: 'good' },
  ];

  const improvements = [
    { priority: 'high', text: 'Add quantifiable metrics to your work experience' },
    { priority: 'high', text: 'Include relevant keywords for ATS optimization' },
    { priority: 'medium', text: 'Expand your skills section with technical skills' },
    { priority: 'medium', text: 'Add certifications and achievements' },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-navy-800">Resume Analyzer</h1>
          <p className="text-earth-500 mt-2">Get AI-powered feedback to optimize your resume</p>
        </div>

        <div className="bg-gradient-brand bg-opacity-5 border-2 border-dashed border-brand-300 rounded-lg p-12 text-center">
          <Upload size={48} className="mx-auto text-brand-500 mb-4" />
          <h3 className="text-xl font-semibold text-navy-800">Upload your resume</h3>
          <p className="text-earth-500 mt-2">PDF or Word format (Max 10MB)</p>
          <div className="mt-6">
            <input type="file" className="hidden" id="resume-upload" accept=".pdf,.doc,.docx" />
            <label htmlFor="resume-upload" className="btn-outline inline-block cursor-pointer">
              Choose File
            </label>
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
                <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl font-bold text-navy-800">
                  {resumeScore}
                </p>
              </div>
              <p className="text-lg font-semibold text-navy-800">Overall Score</p>
              <p className="text-sm text-earth-500 mt-2">Good • Room for improvement</p>
            </div>
          </Card>

          <Card className="lg:col-span-2">
            <h3 className="text-xl font-semibold text-navy-800 mb-4">Section Scores</h3>
            <div className="space-y-3">
              {suggestions.map((item, index) => (
                <div key={index} className="flex items-center justify-between pb-3 border-b border-earth-200 last:border-b-0">
                  <div className="flex items-center gap-3">
                    {item.status === 'perfect' ? (
                      <CheckCircle size={20} className="text-green-500" />
                    ) : (
                      <AlertCircle size={20} className="text-orange-500" />
                    )}
                    <span className="text-navy-800 font-medium">{item.section}</span>
                  </div>
                  <span className="text-lg font-bold text-brand-500">{item.score}%</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <Card>
          <h3 className="text-xl font-semibold text-navy-800 mb-4">AI Improvement Suggestions</h3>
          <div className="space-y-3">
            {improvements.map((suggestion, index) => (
              <div key={index} className={`p-4 rounded-lg ${suggestion.priority === 'high' ? 'bg-red-50 border border-red-200' : 'bg-orange-50 border border-orange-200'}`}>
                <div className="flex items-start gap-3">
                  <span className={`px-3 py-1 rounded text-xs font-semibold ${suggestion.priority === 'high' ? 'bg-red-200 text-red-700' : 'bg-orange-200 text-orange-700'}`}>
                    {suggestion.priority.toUpperCase()}
                  </span>
                  <p className="text-navy-800 flex-1">{suggestion.text}</p>
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
