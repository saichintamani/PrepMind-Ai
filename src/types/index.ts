export interface User {
  id: string;
  email: string;
  name?: string;
  phone?: string;
  bio?: string;
  profilePicture?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

export interface Upload {
  id: string;
  userId: string;
  fileName: string;
  fileUrl: string;
  fileSize: number;
  fileType: string;
  summary?: string;
  createdAt: string;
}

export interface Quiz {
  id: string;
  userId: string;
  uploadId?: string;
  title: string;
  questions: QuizQuestion[];
  totalScore: number;
  passingScore: number;
  createdAt: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

export interface Flashcard {
  id: string;
  userId: string;
  uploadId?: string;
  question: string;
  answer: string;
  difficulty: 'easy' | 'medium' | 'hard';
  createdAt: string;
}

export interface MockInterview {
  id: string;
  userId: string;
  type: 'technical' | 'hr';
  duration: number;
  score: number;
  communicationScore: number;
  technicalScore: number;
  confidenceScore: number;
  transcription?: string;
  feedback?: string;
  createdAt: string;
}

export interface Resume {
  id: string;
  userId: string;
  fileName: string;
  fileUrl: string;
  score: number;
  suggestions?: ResumeSuggestion[];
  createdAt: string;
}

export interface ResumeSuggestion {
  section: string;
  suggestion: string;
  priority: 'high' | 'medium' | 'low';
}

export interface Subscription {
  id: string;
  userId: string;
  planId: string;
  status: 'active' | 'cancelled' | 'expired';
  currentPeriodStart: string;
  currentPeriodEnd: string;
  createdAt: string;
}

export interface Plan {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  features: string[];
  creditsPerMonth?: number;
}

export interface Transaction {
  id: string;
  userId: string;
  subscriptionId: string;
  amount: number;
  currency: string;
  status: 'completed' | 'failed' | 'pending';
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  createdAt: string;
}
