export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5173';

export const PLANS = [
  {
    id: 'free',
    name: 'Free',
    description: 'Get started with PrepMind',
    price: 0,
    creditsPerMonth: 10,
    features: [
      'Upload 1 PDF per month',
      'Generate 5 summaries',
      'Create 5 quizzes',
      'Basic resume analysis',
      'Limited analytics',
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    description: 'Best for serious learners',
    price: 499,
    creditsPerMonth: 100,
    features: [
      'Unlimited PDF uploads',
      'Unlimited summaries',
      'Unlimited quizzes',
      'Advanced resume analysis',
      'AI mock interviews (2/month)',
      'Detailed analytics',
      'Priority support',
    ],
  },
  {
    id: 'premium',
    name: 'Premium',
    description: 'For competitive exam prep',
    price: 999,
    creditsPerMonth: 500,
    features: [
      'Everything in Pro',
      'Unlimited mock interviews',
      'Coding challenge practice',
      'Company-specific prep paths',
      '1-on-1 doubt sessions',
      'Custom study plans',
      'Placement guarantee support',
    ],
  },
];

export const NAV_ITEMS = [
  { label: 'Dashboard', href: '/dashboard', icon: 'LayoutDashboard' },
  { label: 'AI Notes', href: '/dashboard/notes', icon: 'BookOpen' },
  { label: 'Quizzes', href: '/dashboard/quizzes', icon: 'HelpCircle' },
  { label: 'Flashcards', href: '/dashboard/flashcards', icon: 'Layers' },
  { label: 'Coding Prep', href: '/dashboard/coding', icon: 'Code' },
  { label: 'Mock Interviews', href: '/dashboard/interviews', icon: 'Mic' },
  { label: 'Resume', href: '/dashboard/resume', icon: 'FileText' },
  { label: 'Analytics', href: '/dashboard/analytics', icon: 'BarChart3' },
  { label: 'Billing', href: '/dashboard/billing', icon: 'CreditCard' },
  { label: 'Settings', href: '/dashboard/settings', icon: 'Settings' },
];

export const TOAST_DURATION = 3000;

export const FILE_SIZE_LIMIT = 50 * 1024 * 1024; // 50MB
export const ALLOWED_FILE_TYPES = ['application/pdf'];
