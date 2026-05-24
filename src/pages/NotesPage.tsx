import React, { useState } from 'react';
import { Upload, FileText, Trash2 } from 'lucide-react';
import { DashboardLayout } from '../components/dashboard';
import Card from '../components/common/Card';
import Button from '../components/common/Button';

const NotesPage: React.FC = () => {
  const [uploads] = useState([
    { id: '1', fileName: 'Data Structures.pdf', fileSize: '2.4 MB', uploadedAt: '2 hours ago', summary: 'Comprehensive guide to DSA' },
    { id: '2', fileName: 'System Design.pdf', fileSize: '3.1 MB', uploadedAt: '5 hours ago', summary: 'Design patterns and scalability' },
  ]);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-navy-800">AI Notes & Summaries</h1>
            <p className="text-earth-500 mt-2">Upload your study materials and get AI-generated summaries</p>
          </div>
          <Button className="btn-primary">Upload PDF</Button>
        </div>

        <div className="bg-gradient-brand bg-opacity-5 border-2 border-dashed border-brand-300 rounded-lg p-12 text-center">
          <Upload size={48} className="mx-auto text-brand-500 mb-4" />
          <h3 className="text-xl font-semibold text-navy-800">Drop your PDFs here</h3>
          <p className="text-earth-500 mt-2">or click to browse (Max 50MB)</p>
          <div className="mt-6">
            <input type="file" accept=".pdf" multiple className="hidden" id="file-upload" />
            <label htmlFor="file-upload" className="btn-outline inline-block cursor-pointer">
              Choose Files
            </label>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-navy-800 mb-6">Your Uploads</h2>
          <div className="grid gap-4">
            {uploads.map((upload) => (
              <Card key={upload.id} variant="glass" className="flex items-center justify-between p-6">
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center">
                    <FileText size={24} className="text-brand-500" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-navy-800">{upload.fileName}</h3>
                    <p className="text-sm text-earth-500 mt-1">
                      {upload.fileSize} • Uploaded {upload.uploadedAt}
                    </p>
                    <p className="text-sm text-brand-600 mt-1">{upload.summary}</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button variant="secondary" size="sm">
                    View Summary
                  </Button>
                  <button className="p-2 hover:bg-red-50 rounded-lg text-red-600 transition">
                    <Trash2 size={20} />
                  </button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default NotesPage;
