export interface LibraryQuestion {
  id: string;
  question: string;
  answer: string;
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface LibraryQuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  topic: string;
}

export interface LibraryCodingProblem {
  id: string;
  title: string;
  difficulty: 'easy' | 'medium' | 'hard';
  company: string;
  description: string;
  hints: string[];
  topics: string[];
}

export interface ReferenceMaterial {
  id: string;
  title: string;
  category: 'machine-learning' | 'dsa' | 'interview' | 'placement';
  summary: string;
  keyPoints: string[];
  tags: string[];
}

/** ML & placement reference pack — revision + interview + quiz source */
export const REFERENCE_MATERIALS: ReferenceMaterial[] = [
  {
    id: 'ml-fundamentals',
    title: 'Machine Learning Fundamentals',
    category: 'machine-learning',
    summary: 'Core ML concepts for viva, interviews, and aptitude rounds.',
    tags: ['ml', 'supervised', 'evaluation'],
    keyPoints: [
      'Supervised learning uses labeled data; unsupervised finds structure without labels.',
      'Bias-variance tradeoff: high bias underfits, high variance overfits.',
      'Train/validation/test split prevents optimistic metrics on unseen data.',
      'Precision = TP/(TP+FP), Recall = TP/(TP+FN), F1 balances both.',
      'Gradient descent minimizes loss by updating weights along negative gradient.',
    ],
  },
  {
    id: 'ml-algorithms',
    title: 'ML Algorithms Cheat Sheet',
    category: 'machine-learning',
    summary: 'When to use linear models, trees, SVM, clustering, and neural nets.',
    tags: ['ml', 'algorithms', 'neural-networks'],
    keyPoints: [
      'Linear/logistic regression: interpretable baselines for regression/classification.',
      'Random Forest: robust tabular model, handles non-linearity and mixed features.',
      'SVM: strong with clear margin; kernel trick for non-linear boundaries.',
      'K-Means: partition data into K clusters by minimizing within-cluster variance.',
      'Neural networks: representation learning; CNNs for vision, RNNs/Transformers for sequences.',
    ],
  },
  {
    id: 'dl-nlp',
    title: 'Deep Learning & NLP Essentials',
    category: 'machine-learning',
    summary: 'Transformers, embeddings, and common interview talking points.',
    tags: ['deep-learning', 'nlp', 'transformers'],
    keyPoints: [
      'Backpropagation computes gradients via chain rule through the computation graph.',
      'Dropout and batch norm improve generalization and training stability.',
      'Word embeddings (Word2Vec, GloVe) map tokens to dense vectors.',
      'Attention lets models focus on relevant tokens; Transformers use self-attention.',
      'Fine-tuning pretrained models (BERT, GPT) adapts general knowledge to tasks.',
    ],
  },
  {
    id: 'dsa-placement',
    title: 'DSA for Placement Interviews',
    category: 'dsa',
    summary: 'Patterns and complexity expectations for coding rounds.',
    tags: ['dsa', 'arrays', 'graphs'],
    keyPoints: [
      'Two pointers and sliding window solve many array/string problems in O(n).',
      'Hash maps trade space for O(1) lookups in frequency and anagram problems.',
      'BFS/DFS on graphs and grids; know when to use each.',
      'Dynamic programming: optimal substructure + overlapping subproblems.',
      'Always state time/space complexity and edge cases before coding.',
    ],
  },
  {
    id: 'hr-behavioral',
    title: 'HR & Behavioral Interview Guide',
    category: 'interview',
    summary: 'STAR method and common HR questions for campus placement.',
    tags: ['hr', 'behavioral', 'star'],
    keyPoints: [
      'STAR: Situation, Task, Action, Result — structure every behavioral answer.',
      'Prepare stories for teamwork, conflict, leadership, failure, and learning.',
      'Research the company mission, product, and recent news before the interview.',
      'Ask thoughtful questions about team, growth, and expectations.',
      'Be concise: 90–120 seconds per answer unless asked to elaborate.',
    ],
  },
];

export const INTERVIEW_QUESTIONS: LibraryQuestion[] = [
  {
    id: 'iq-1',
    topic: 'Machine Learning',
    difficulty: 'easy',
    question: 'What is the difference between supervised and unsupervised learning?',
    answer:
      'Supervised learning trains on labeled input-output pairs (e.g., spam classification). Unsupervised learning finds patterns in unlabeled data (e.g., clustering customers).',
  },
  {
    id: 'iq-2',
    topic: 'Machine Learning',
    difficulty: 'medium',
    question: 'Explain overfitting and how to reduce it.',
    answer:
      'Overfitting means the model memorizes training noise and performs poorly on new data. Mitigations include more data, regularization (L1/L2), dropout, early stopping, cross-validation, and simpler models.',
  },
  {
    id: 'iq-3',
    topic: 'Machine Learning',
    difficulty: 'medium',
    question: 'What is cross-validation and why use it?',
    answer:
      'Cross-validation splits data into folds, trains on some folds and validates on others, rotating folds. It gives a more reliable estimate of generalization than a single train-test split.',
  },
  {
    id: 'iq-4',
    topic: 'Deep Learning',
    difficulty: 'hard',
    question: 'How does backpropagation work?',
    answer:
      'Forward pass computes predictions and loss. Backward pass applies the chain rule to propagate gradients from the loss to each parameter. Optimizers then update weights to reduce loss.',
  },
  {
    id: 'iq-5',
    topic: 'Deep Learning',
    difficulty: 'medium',
    question: 'CNN vs RNN — when would you use each?',
    answer:
      'CNNs exploit local spatial structure (images, spectrograms). RNNs model sequential dependencies (time series, text before Transformers). Modern NLP often uses Transformers instead of RNNs.',
  },
  {
    id: 'iq-6',
    topic: 'Data Structures',
    difficulty: 'easy',
    question: 'Explain time complexity of binary search.',
    answer:
      'Binary search on a sorted array runs in O(log n) time because each step halves the search space. Space is O(1) iterative or O(log n) recursive due to call stack.',
  },
  {
    id: 'iq-7',
    topic: 'Data Structures',
    difficulty: 'medium',
    question: 'When do you use a hash map vs a set?',
    answer:
      'Hash maps store key-value pairs for lookups and counts. Sets store unique keys for membership tests. Both offer average O(1) operations.',
  },
  {
    id: 'iq-8',
    topic: 'HR',
    difficulty: 'easy',
    question: 'Tell me about yourself.',
    answer:
      'Give a 60–90 second pitch: current role/education, relevant skills, 1–2 achievements with metrics, and why you fit this role. End by connecting to the company.',
  },
  {
    id: 'iq-9',
    topic: 'HR',
    difficulty: 'medium',
    question: 'Describe a time you handled conflict in a team.',
    answer:
      'Use STAR: describe the situation, your responsibility, how you listened, found common ground, and the positive outcome (delivery, morale, learning).',
  },
  {
    id: 'iq-10',
    topic: 'System Design',
    difficulty: 'hard',
    question: 'How would you design a scalable ML inference API?',
    answer:
      'Use stateless API servers behind a load balancer, model versioning, caching frequent predictions, async queues for batch jobs, monitoring latency/errors, and autoscaling on CPU/GPU metrics.',
  },
];

export const QUIZ_BANK: LibraryQuizQuestion[] = [
  {
    id: 'q-1',
    topic: 'Machine Learning',
    question: 'Which metric is best when false negatives are costly (e.g., disease detection)?',
    options: ['Accuracy', 'Precision', 'Recall', 'MSE'],
    correctAnswer: 2,
    explanation: 'Recall measures how many actual positives were found — critical when missing a positive is dangerous.',
  },
  {
    id: 'q-2',
    topic: 'Machine Learning',
    question: 'L2 regularization on weights tends to:',
    options: ['Sparsify weights to zero', 'Shrink weights smoothly', 'Increase learning rate', 'Remove features'],
    correctAnswer: 1,
    explanation: 'L2 (Ridge) penalizes large weights, encouraging smaller, smoother weights rather than exact zeros.',
  },
  {
    id: 'q-3',
    topic: 'Machine Learning',
    question: 'K-Means requires you to specify:',
    options: ['Number of clusters K', 'Learning rate', 'Number of layers', 'Batch size'],
    correctAnswer: 0,
    explanation: 'K-Means partitions data into K clusters; K is a hyperparameter often chosen via elbow method or domain knowledge.',
  },
  {
    id: 'q-4',
    topic: 'Deep Learning',
    question: 'Dropout during training primarily helps:',
    options: ['Speed up inference', 'Reduce overfitting', 'Increase model size', 'Fix class imbalance'],
    correctAnswer: 1,
    explanation: 'Dropout randomly disables neurons, preventing co-adaptation and improving generalization.',
  },
  {
    id: 'q-5',
    topic: 'Deep Learning',
    question: 'Transformers rely heavily on:',
    options: ['Pooling layers only', 'Self-attention', 'K-Means', 'Decision trees'],
    correctAnswer: 1,
    explanation: 'Self-attention lets each token attend to others, capturing long-range dependencies in parallel.',
  },
  {
    id: 'q-6',
    topic: 'Data Structures',
    question: 'Average time to insert in a hash map is:',
    options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
    correctAnswer: 0,
    explanation: 'With a good hash function and load factor, insert/lookup/delete are O(1) on average.',
  },
  {
    id: 'q-7',
    topic: 'Data Structures',
    question: 'BFS is typically implemented using a:',
    options: ['Stack', 'Queue', 'Heap', 'Trie'],
    correctAnswer: 1,
    explanation: 'BFS explores level by level; a queue processes nodes in FIFO order.',
  },
  {
    id: 'q-8',
    topic: 'Algorithms',
    question: 'Merge sort time complexity is:',
    options: ['O(n)', 'O(n log n)', 'O(n²)', 'O(log n)'],
    correctAnswer: 1,
    explanation: 'Merge sort divides and merges in O(n log n) time with O(n) extra space.',
  },
  {
    id: 'q-9',
    topic: 'Machine Learning',
    question: 'A confusion matrix is used for:',
    options: ['Regression loss', 'Classification results', 'Clustering', 'Feature scaling'],
    correctAnswer: 1,
    explanation: 'It tabulates TP, TN, FP, FN for classification models.',
  },
  {
    id: 'q-10',
    topic: 'Placement',
    question: 'In STAR method, "A" stands for:',
    options: ['Analysis', 'Action', 'Answer', 'Assessment'],
    correctAnswer: 1,
    explanation: 'STAR = Situation, Task, Action, Result — Action is what you specifically did.',
  },
];

export const CODING_PROBLEMS: LibraryCodingProblem[] = [
  {
    id: 'cp-1',
    title: 'Two Sum',
    difficulty: 'easy',
    company: 'Google',
    topics: ['arrays', 'hash-map'],
    description: 'Given an array of integers and a target, return indices of two numbers that add up to target.',
    hints: ['Use a hash map to store seen numbers', 'For each x, check if target - x exists'],
  },
  {
    id: 'cp-2',
    title: 'Longest Substring Without Repeating Characters',
    difficulty: 'medium',
    company: 'Facebook',
    topics: ['strings', 'sliding-window'],
    description: 'Find the length of the longest substring without repeating characters.',
    hints: ['Use sliding window with a set or map of last index', 'Shrink window when duplicate found'],
  },
  {
    id: 'cp-3',
    title: 'Median of Two Sorted Arrays',
    difficulty: 'hard',
    company: 'Google',
    topics: ['binary-search', 'arrays'],
    description: 'Find the median of two sorted arrays in O(log(m+n)) time.',
    hints: ['Binary search on partition indices', 'Ensure left halves ≤ right halves'],
  },
  {
    id: 'cp-4',
    title: 'Reverse Integer',
    difficulty: 'easy',
    company: 'Microsoft',
    topics: ['math'],
    description: 'Reverse digits of a 32-bit signed integer; return 0 if reversed value overflows.',
    hints: ['Pop digits with modulo', 'Check overflow before multiplying by 10'],
  },
];

export const DEFAULT_FLASHCARDS = INTERVIEW_QUESTIONS.slice(0, 6).map((q) => ({
  id: `fc-${q.id}`,
  question: q.question,
  answer: q.answer,
  topic: q.topic,
}));

export const QUIZ_TOPICS = ['Machine Learning', 'Deep Learning', 'Data Structures', 'Algorithms', 'Placement', 'All Topics'];

export function getQuestionsForInterview(type: 'technical' | 'hr', count = 5): LibraryQuestion[] {
  const pool =
    type === 'hr'
      ? INTERVIEW_QUESTIONS.filter((q) => q.topic === 'HR')
      : INTERVIEW_QUESTIONS.filter((q) => q.topic !== 'HR');
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  const fallback = [...INTERVIEW_QUESTIONS].sort(() => Math.random() - 0.5);
  const selected = shuffled.length >= count ? shuffled : fallback;
  return selected.slice(0, count);
}

export function getQuizQuestionsByTopic(topic: string, count = 5): LibraryQuizQuestion[] {
  const pool = topic === 'All Topics' ? QUIZ_BANK : QUIZ_BANK.filter((q) => q.topic === topic);
  return [...pool].sort(() => Math.random() - 0.5).slice(0, Math.min(count, pool.length));
}
