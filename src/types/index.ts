export interface Prompt {
  id: string;
  act: string;
  prompt: string;
  for_devs: boolean;
  category?: string;
  tags?: string[];
  platforms?: string[];
  created_at?: string;
  updated_at?: string;
}

export interface VibePrompt {
  id: string;
  app: string;
  prompt: string;
  contributor: string;
  techstack: string;
  category?: string;
  tags?: string[];
  platforms?: string[];
  created_at?: string;
  updated_at?: string;
}

export interface SearchFilters {
  query: string;
  category: string;
  forDevs: boolean | null;
  platform: string;
  sortBy: 'relevance' | 'name' | 'newest' | 'oldest';
}

export interface AppState {
  hydrated: boolean;
  prompts: Prompt[];
  vibePrompts: VibePrompt[];
  filteredPrompts: ((Prompt | VibePrompt) & { type: 'prompt' | 'vibe' })[];
  searchFilters: SearchFilters;
  favorites: string[];
  darkMode: boolean;
  isLoading: boolean;
  error: string | null;
}

export type PromptType = Prompt | VibePrompt; 