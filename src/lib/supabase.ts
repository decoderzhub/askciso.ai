import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-supabase-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// API Configuration
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'https://askciso-api.systemd.diskstation.me',
  ENDPOINTS: {
    CHAT: '/api/chat',
    CHAT_STREAM: '/api/chat/stream',
    HEALTH: '/api/health',
    ANALYZE_DOCUMENT: '/api/analyze-document'
  }
};

// Fibonacci spacing system
export const FIBONACCI_SCALE = {
  1: '8px',
  2: '16px',
  3: '24px',
  5: '40px',
  8: '64px',
  13: '104px',
  21: '168px',
  34: '272px'
} as const;

// Golden ratio constants
export const GOLDEN_RATIO = 1.618;
export const GOLDEN_WIDTH = '61.8%';
export const GOLDEN_HEIGHT = '38.2%';