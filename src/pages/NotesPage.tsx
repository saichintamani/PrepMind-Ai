import React, { useRef, useState } from 'react';
import { Upload, FileText, Trash2, BookMarked } from 'lucide-react';
import { DashboardLayout } from '../components/dashboard';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import { useStudyStore } from '../store/studyStore';
import { REFERENCE_MATERIALS } from '../data/studyLibrary';
import { useToastStore } from '../store/toastStore';
import { formatRelativeTime } from '../store/studyStore';
import { FILE_SIZE_LIMIT } from '../constants';

const NotesPage: React.FC = () => {
  const { uploads, addUpload, removeUpload, importReferenceLibrary, referencesImported } = useStudyStore();
  const toast = useToastStore();
  const fileRef = useRef<HTMLInputElement>(null);
  const dropRef = useRef<HTMLInputElement>(null);

  const [viewUploadId, setViewUploadId] = useState<string | null>(null);

  const selected = uploads.find((u) => u.id === viewUploadId);
  const refDetail = selected?.referenceId
    ? REFERENCE_MATERIALS.find((r) => r.id === selected.referenceId)
    : null;

  const handleFiles = (files: FileList | null) => {
    if (!files?.length) return;
    Array.from(files).forEach((file) => {
      if (file.type !== 'application/pdf' && !file.name.endsWith('.pdf')) {
        toast.show(`${file.name}: only PDF files are supported`, 'warning');
        return;
      }
      if (file.size > FILE_SIZE_LIMIT) {
        toast.show(`${file.name} exceeds 50MB limit`, 'error');
        return;
      }
      addUpload(file);
      toast.show(`Uploaded ${file.name}`, 'success');
    });
  };

  const handleImportLibrary = () => {
    const count = importReferenceLibrary();
    if (count > 0) {
      toast.show(`Imported ${count} ML & placement reference materials`, 'success');
    } else {
      toast.show('Reference library already imported', 'info');
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-4xl font-bold text-navy-800 dark:text-earth-100">AI Notes & Summaries</h1>
            <p className="text-earth-500 dark:text-earth-400 mt-2">
              Upload PDFs or use the built-in ML placement reference pack
            </p>
          </div>
          <div className="flex gap-2 flex-wrap">
            {!referencesImported && (
              <Button variant="outline" className="flex items-center gap-2" onClick={handleImportLibrary}>
                <BookMarked size={18} />
                Import ML Reference Pack
              </Button>
            )}
            <Button className="btn-primary" onClick={() => fileRef.current?.click()}>
              Upload PDF
            </Button>
            <input
              ref={fileRef}
              type="file"
              accept=".pdf,application/pdf"
              multiple
              className="hidden"
              onChange={(e) => handleFiles(e.target.files)}
            />
          </div>
        </div>

        <div
          className="bg-gradient-brand bg-opacity-5 border-2 border-dashed border-brand-300 rounded-lg p-12 text-center cursor-pointer"
          onClick={() => dropRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            handleFiles(e.dataTransfer.files);
          }}
        >
          <Upload size={48} className="mx-auto text-brand-500 mb-4" />
          <h3 className="text-xl font-semibold text-navy-800 dark:text-earth-100">Drop your PDFs here</h3>
          <p className="text-earth-500 mt-2">or click to browse (Max 50MB)</p>
          <input
            ref={dropRef}
            type="file"
            accept=".pdf,application/pdf"
            multiple
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
          />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-navy-800 dark:text-earth-100 mb-6">Your Materials</h2>
          {uploads.length === 0 ? (
            <Card>
              <p className="text-center text-earth-500 py-6">
                No materials yet. Import the ML reference pack or upload your PDFs.
              </p>
            </Card>
          ) : (
            <div className="grid gap-4">
              {uploads.map((upload) => (
                <Card key={upload.id} variant="glass" className="flex items-center justify-between p-6 flex-wrap gap-4">
                  <div className="flex items-center gap-4 flex-1 min-w-[200px]">
                    <div className="w-12 h-12 bg-brand-100 dark:bg-navy-700 rounded-lg flex items-center justify-center">
                      <FileText size={24} className="text-brand-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-navy-800 dark:text-earth-100 flex items-center gap-2">
                        {upload.fileName}
                        {upload.source === 'reference' && (
                          <span className="text-xs px-2 py-0.5 bg-brand-100 text-brand-700 rounded-full">Reference</span>
                        )}
                      </h3>
                      <p className="text-sm text-earth-500 mt-1">
                        {upload.fileSize} · {formatRelativeTime(upload.uploadedAt)}
                      </p>
                      <p className="text-sm text-brand-600 mt-1 line-clamp-2">{upload.summary}</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Button variant="secondary" size="sm" onClick={() => setViewUploadId(upload.id)}>
                      View Summary
                    </Button>
                    <button
                      type="button"
                      className="p-2 hover:bg-red-50 dark:hover:bg-red-950 rounded-lg text-red-600"
                      onClick={() => {
                        removeUpload(upload.id);
                        toast.show('Removed', 'info');
                      }}
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        <Modal
          isOpen={!!viewUploadId}
          onClose={() => setViewUploadId(null)}
          title={selected?.fileName ?? 'Summary'}
          size="lg"
        >
          {selected && (
            <div className="space-y-4">
              <p className="text-earth-600 dark:text-earth-300">{selected.summary}</p>
              {refDetail && (
                <>
                  <h4 className="font-semibold text-navy-800 dark:text-earth-100">Key revision points</h4>
                  <ul className="list-disc list-inside space-y-2 text-earth-600 dark:text-earth-400">
                    {refDetail.keyPoints.map((point, i) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
                  <p className="text-sm text-earth-500">Tags: {refDetail.tags.join(', ')}</p>
                </>
              )}
              <Button className="btn-primary w-full" onClick={() => setViewUploadId(null)}>
                Close
              </Button>
            </div>
          )}
        </Modal>
      </div>
    </DashboardLayout>
  );
};

export default NotesPage;
