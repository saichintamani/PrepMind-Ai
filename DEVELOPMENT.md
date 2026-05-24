# Development Guide - PrepMind AI

## Setup Guide

### 1. Prerequisites
- Node.js 16+ (recommended: 18 LTS)
- npm 8+ or yarn
- Git
- A Supabase account (free tier available)

### 2. Initial Setup

```bash
# Clone repository
git clone <repo-url>
cd project

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Update .env with your Supabase credentials
```

### 3. Supabase Setup

1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Copy your `Project URL` and `Anon Key`
4. Update `.env`:
```
VITE_SUPABASE_URL=your_project_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

### 4. Database Setup

The database migrations are automatically applied when you run the project. If you need to manually apply migrations:

1. Go to Supabase Dashboard
2. Navigate to SQL Editor
3. Run the migration SQL from the initial schema

## Running the Project

### Development Server
```bash
npm run dev
```
- Opens on `http://localhost:5173`
- Hot module reloading enabled
- Auto-refresh on file changes

### Production Build
```bash
npm run build
```
- Optimizes and minifies code
- Output in `dist/` folder
- Ready for deployment

### Linting
```bash
npm run lint
```
- Checks code quality
- Reports style issues
- Safe to run anytime

### Type Checking
```bash
npm run typecheck
```
- Validates TypeScript types
- Catches type errors
- Run before committing

## Project Architecture

### Component Hierarchy
```
App
├── Router
│   ├── LandingPage
│   ├── LoginPage
│   ├── SignupPage
│   └── DashboardLayout
│       ├── DashboardPage
│       ├── NotesPage
│       ├── QuizzesPage
│       ├── FlashcardsPage
│       ├── CodingPrepPage
│       ├── MockInterviewPage
│       ├── ResumePage
│       ├── AnalyticsPage
│       ├── BillingPage
│       └── SettingsPage
```

### State Management Flow
```
App (Initialize Auth)
└── useAuthStore (Zustand)
    ├── user state
    ├── isLoading
    ├── error
    └── auth methods (login, logout, signup)
```

## Common Development Tasks

### Adding a New Page

1. Create page component in `src/pages/`:
```tsx
import React from 'react';
import { DashboardLayout } from '../components/dashboard';

const NewPage: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Your content */}
      </div>
    </DashboardLayout>
  );
};

export default NewPage;
```

2. Add route in `App.tsx`:
```tsx
<Route
  path="/dashboard/new-page"
  element={
    <ProtectedRoute>
      <NewPage />
    </ProtectedRoute>
  }
/>
```

3. Add to NAV_ITEMS in `constants/index.ts`:
```ts
{ label: 'New Page', href: '/dashboard/new-page', icon: 'IconName' }
```

### Adding a New Component

1. Create in appropriate folder:
   - `components/common/` - Reusable UI components
   - `components/auth/` - Auth-specific components
   - `components/dashboard/` - Dashboard components
   - `components/landing/` - Landing page components

2. Example component:
```tsx
import React from 'react';

interface ComponentProps {
  // Props interface
}

const MyComponent: React.FC<ComponentProps> = ({ /* props */ }) => {
  return (
    <div>
      {/* Component content */}
    </div>
  );
};

export default MyComponent;
```

### Adding Database Functionality

1. Create/update service in `src/services/supabase.ts`:
```ts
export const newService = {
  async getItems(userId: string) {
    return supabase
      .from('items')
      .select('*')
      .eq('user_id', userId);
  },
};
```

2. Use in component:
```tsx
const { data, error } = await newService.getItems(userId);
```

### Creating a New Store

1. Create in `src/store/`:
```ts
import { create } from 'zustand';

interface MyStoreState {
  count: number;
  increment: () => void;
}

export const useMyStore = create<MyStoreState>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}));
```

2. Use in component:
```ts
const { count, increment } = useMyStore();
```

## Code Style Guidelines

### File Naming
- Components: PascalCase (`Button.tsx`, `DashboardLayout.tsx`)
- Utilities: camelCase (`supabase.ts`, `helpers.ts`)
- Pages: PascalCase (`DashboardPage.tsx`)

### Component Naming
- Always PascalCase
- Descriptive names (`LoginForm`, not `Form`)
- Use `.tsx` for JSX components

### Imports
- Group imports: React, libraries, local components
- Use absolute imports with `@` alias (configure in tsconfig)
- Export named components

### Styling
- Use Tailwind CSS classes
- Follow design system spacing (8px grid)
- Use brand colors from custom palette
- Minimal custom CSS

## Testing

### Unit Tests
To be added with Vitest. Structure:
```
src/
├── __tests__/
│   ├── components/
│   ├── services/
│   └── utils/
```

### E2E Tests
To be added with Playwright. Structure:
```
tests/
├── e2e/
│   ├── auth.spec.ts
│   ├── dashboard.spec.ts
```

## Performance Tips

1. **Code Splitting**: Use `React.lazy()` for pages
2. **Image Optimization**: Always use appropriate formats
3. **Bundle Analysis**: Run `npm run build` and check sizes
4. **Lazy Loading**: Implement for heavy components
5. **Memoization**: Use React.memo() for expensive renders

## Debugging

### Browser DevTools
- React DevTools: Check component state
- Redux DevTools: View Zustand store state
- Network tab: Monitor API calls

### Console Logging
```ts
console.log('Debug:', variable);
console.error('Error:', error);
console.warn('Warning:', issue);
```

### VSCode Extensions
- ES7+ React/Redux/React-Native snippets
- Tailwind CSS IntelliSense
- TypeScript Vue Plugin
- Prettier - Code formatter

## Git Workflow

### Branch Naming
```
feature/feature-name
bugfix/bug-name
improvement/improvement-name
```

### Commit Messages
```
feat: Add new feature
fix: Fix bug
style: Format code
refactor: Restructure code
docs: Update documentation
test: Add tests
```

### Before Pushing
```bash
npm run lint
npm run typecheck
npm run build
git add .
git commit -m "message"
git push origin branch-name
```

## Deployment Checklist

### Before Production
- [ ] Run `npm run lint`
- [ ] Run `npm run typecheck`
- [ ] Run `npm run build`
- [ ] Test auth flow
- [ ] Test protected routes
- [ ] Verify environment variables
- [ ] Check browser compatibility
- [ ] Test on mobile
- [ ] Review security

### After Deployment
- [ ] Verify site loads
- [ ] Test login/signup
- [ ] Check database connection
- [ ] Monitor error logs
- [ ] Test payment flow
- [ ] Verify emails sending

## Troubleshooting

### Port Already in Use
```bash
# Kill process on port 5173
lsof -i :5173
kill -9 <PID>

# Or use different port
npm run dev -- --port 3000
```

### Build Fails
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### TypeScript Errors
```bash
npm run typecheck
# Fix reported errors
```

### Database Connection Issues
1. Check Supabase URL and key
2. Verify RLS policies
3. Check table exists
4. Verify authentication

## Resources

- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [TypeScript](https://www.typescriptlang.org)
- [Supabase Docs](https://supabase.com/docs)
- [Vite Guide](https://vitejs.dev/guide/)
- [React Router](https://reactrouter.com)
