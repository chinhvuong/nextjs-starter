export const APP_CONFIG = {
  name: 'Frontend Workflow',
  version: '1.0.0',
  description: 'A frontend application built with Next.js and Tailwind CSS',

  // API Configuration
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api',
    timeout: 10000,
  },

  // UI Configuration
  ui: {
    theme: 'light', // 'light' | 'dark' | 'system'
  },
} as const; 