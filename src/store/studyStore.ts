import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  REFERENCE_MATERIALS,
  DEFAULT_FLASHCARDS,
  CODING_PROBLEMS,
  getQuizQuestionsByTopic,
  INTERVIEW_QUESTIONS,
  type LibraryQuizQuestion,
} from '../data/studyLibrary';

export interface StudyUpload {
  id: string;
  fileName: string;
  fileSize: string;
  uploadedAt: string;
  summary: string;
  source: 'upload' | 'reference';
  referenceId?: string;
  tags: string[];
}

export interface StoredQuiz {
  id: string;
  title: string;
  topic: string;
  questions: LibraryQuizQuestion[];
  score?: number;
  lastAttemptAt?: string;
  createdAt: string;
}

export interface StoredInterview {
  id: string;
  type: 'technical' | 'hr';
  duration: number;
  score: number;
  communicationScore: number;
  technicalScore: number;
  confidenceScore: number;
  feedback: string;
  strengths: string[];
  improvements: string[];
  questionsAsked: string[];
  createdAt: string;
}

export interface StoredFlashcard {
  id: string;
  question: string;
  answer: string;
  topic: string;
}

export interface CodingProgress {
  [problemId: string]: { solved: boolean; reviewedAt?: string };
}

export interface ResumeAnalysis {
  fileName: string;
  score: number;
  analyzedAt: string;
  sections: { section: string; score: number; status: string }[];
  improvements: { priority: string; text: string }[];
}

interface StudyState {
  uploads: StudyUpload[];
  quizzes: StoredQuiz[];
  interviews: StoredInterview[];
  flashcards: StoredFlashcard[];
  codingProgress: CodingProgress;
  referencesImported: boolean;
  resume: ResumeAnalysis | null;

  importReferenceLibrary: () => number;
  addUpload: (file: File) => void;
  removeUpload: (id: string) => void;
  createQuiz: (topic: string, title?: string) => StoredQuiz | null;
  saveQuizAttempt: (quizId: string, score: number) => void;
  deleteQuiz: (id: string) => void;
  addInterview: (interview: Omit<StoredInterview, 'id' | 'createdAt'>) => void;
  toggleCodingSolved: (problemId: string) => void;
  setCodingReviewed: (problemId: string) => void;
  removeFlashcard: (id: string) => void;
  analyzeResume: (fileName: string) => void;
  search: (query: string) => SearchResult[];
}

export interface SearchResult {
  type: 'upload' | 'quiz' | 'interview' | 'flashcard' | 'reference' | 'coding';
  id: string;
  title: string;
  subtitle: string;
  path: string;
}

function formatRelativeTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const hours = Math.floor(diff / 3600000);
  if (hours < 1) return 'Just now';
  if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  const days = Math.floor(hours / 24);
  if (days === 1) return 'Yesterday';
  return `${days} days ago`;
}

export { formatRelativeTime };

export const useStudyStore = create<StudyState>()(
  persist(
    (set, get) => ({
      uploads: [],
      quizzes: [],
      interviews: [],
      flashcards: DEFAULT_FLASHCARDS,
      codingProgress: {},
      referencesImported: false,
      resume: null,

      importReferenceLibrary: () => {
        if (get().referencesImported) return 0;
        const refUploads: StudyUpload[] = REFERENCE_MATERIALS.map((ref) => ({
          id: `ref-${ref.id}`,
          fileName: `${ref.title}.pdf`,
          fileSize: 'Reference',
          uploadedAt: new Date().toISOString(),
          summary: ref.summary,
          source: 'reference' as const,
          referenceId: ref.id,
          tags: ref.tags,
        }));
        const extraCards = INTERVIEW_QUESTIONS.map((q) => ({
          id: `fc-${q.id}`,
          question: q.question,
          answer: q.answer,
          topic: q.topic,
        }));
        const existingIds = new Set(get().flashcards.map((f) => f.id));
        const newCards = extraCards.filter((c) => !existingIds.has(c.id));

        set({
          referencesImported: true,
          uploads: [...refUploads, ...get().uploads],
          flashcards: [...get().flashcards, ...newCards],
        });
        return refUploads.length;
      },

      addUpload: (file) => {
        const upload: StudyUpload = {
          id: crypto.randomUUID(),
          fileName: file.name,
          fileSize: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
          uploadedAt: new Date().toISOString(),
          summary: `Study material uploaded. AI summary: key topics from ${file.name.replace(/\.[^.]+$/, '')} — review notes and generate quizzes.`,
          source: 'upload',
          tags: ['upload', 'pdf'],
        };
        set({ uploads: [upload, ...get().uploads] });
      },

      removeUpload: (id) => set({ uploads: get().uploads.filter((u) => u.id !== id) }),

      createQuiz: (topic, title) => {
        const questions = getQuizQuestionsByTopic(topic, 5);
        if (questions.length === 0) return null;
        const quiz: StoredQuiz = {
          id: crypto.randomUUID(),
          title: title ?? `${topic} Quiz`,
          topic,
          questions,
          createdAt: new Date().toISOString(),
        };
        set({ quizzes: [quiz, ...get().quizzes] });
        return quiz;
      },

      saveQuizAttempt: (quizId, score) => {
        set({
          quizzes: get().quizzes.map((q) =>
            q.id === quizId ? { ...q, score, lastAttemptAt: new Date().toISOString() } : q
          ),
        });
      },

      deleteQuiz: (id) => set({ quizzes: get().quizzes.filter((q) => q.id !== id) }),

      addInterview: (data) => {
        const interview: StoredInterview = {
          ...data,
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
        };
        set({ interviews: [interview, ...get().interviews] });
      },

      toggleCodingSolved: (problemId) => {
        const current = get().codingProgress[problemId]?.solved ?? false;
        set({
          codingProgress: {
            ...get().codingProgress,
            [problemId]: { solved: !current, reviewedAt: new Date().toISOString() },
          },
        });
      },

      setCodingReviewed: (problemId) => {
        set({
          codingProgress: {
            ...get().codingProgress,
            [problemId]: { solved: true, reviewedAt: new Date().toISOString() },
          },
        });
      },

      removeFlashcard: (id) => set({ flashcards: get().flashcards.filter((f) => f.id !== id) }),

      analyzeResume: (fileName) => {
        set({
          resume: {
            fileName,
            score: 72 + Math.floor(Math.random() * 18),
            analyzedAt: new Date().toISOString(),
            sections: [
              { section: 'Contact Information', score: 95, status: 'perfect' },
              { section: 'Summary', score: 72, status: 'needs-improvement' },
              { section: 'Skills', score: 85, status: 'good' },
              { section: 'Experience', score: 68, status: 'needs-improvement' },
              { section: 'Education', score: 90, status: 'good' },
            ],
            improvements: [
              { priority: 'high', text: 'Add quantifiable metrics to your work experience' },
              { priority: 'high', text: 'Include relevant keywords for ATS optimization (ML, Python, SQL)' },
              { priority: 'medium', text: 'Expand technical skills aligned with job description' },
              { priority: 'medium', text: 'Add certifications and project links' },
            ],
          },
        });
      },

      search: (query) => {
        const q = query.trim().toLowerCase();
        if (!q) return [];
        const results: SearchResult[] = [];

        get().uploads.forEach((u) => {
          if (u.fileName.toLowerCase().includes(q) || u.summary.toLowerCase().includes(q)) {
            results.push({ type: 'upload', id: u.id, title: u.fileName, subtitle: u.summary, path: '/dashboard/notes' });
          }
        });

        get().quizzes.forEach((quiz) => {
          if (quiz.title.toLowerCase().includes(q) || quiz.topic.toLowerCase().includes(q)) {
            results.push({
              type: 'quiz',
              id: quiz.id,
              title: quiz.title,
              subtitle: `${quiz.questions.length} questions`,
              path: '/dashboard/quizzes',
            });
          }
        });

        get().interviews.forEach((i) => {
          if (i.type.includes(q) || i.feedback.toLowerCase().includes(q)) {
            results.push({
              type: 'interview',
              id: i.id,
              title: `${i.type} interview`,
              subtitle: `Score ${i.score}%`,
              path: '/dashboard/interviews',
            });
          }
        });

        get().flashcards.forEach((f) => {
          if (f.question.toLowerCase().includes(q) || f.topic.toLowerCase().includes(q)) {
            results.push({
              type: 'flashcard',
              id: f.id,
              title: f.question.slice(0, 50),
              subtitle: f.topic,
              path: '/dashboard/flashcards',
            });
          }
        });

        REFERENCE_MATERIALS.forEach((ref) => {
          if (ref.title.toLowerCase().includes(q) || ref.tags.some((t) => t.includes(q))) {
            results.push({
              type: 'reference',
              id: ref.id,
              title: ref.title,
              subtitle: ref.category,
              path: '/dashboard/notes',
            });
          }
        });

        CODING_PROBLEMS.forEach((p) => {
          if (p.title.toLowerCase().includes(q) || p.topics.some((t) => t.includes(q))) {
            results.push({
              type: 'coding',
              id: p.id,
              title: p.title,
              subtitle: p.difficulty,
              path: '/dashboard/coding',
            });
          }
        });

        return results.slice(0, 8);
      },
    }),
    { name: 'prepmind_study_data' }
  )
);
