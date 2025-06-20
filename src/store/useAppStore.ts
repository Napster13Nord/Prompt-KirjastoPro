import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import Fuse from 'fuse.js';
import { AppState, Prompt, VibePrompt, SearchFilters } from '@/types';
import { User } from '@supabase/supabase-js';

interface AppStore extends AppState {
  hydrated: boolean;
  user: User | null;
  setUser: (user: User | null) => void;
  setHydrated: () => void;
  setPrompts: (prompts: Prompt[]) => void;
  setVibePrompts: (vibePrompts: VibePrompt[]) => void;
  setSearchFilters: (filters: Partial<SearchFilters>) => void;
  addToFavorites: (id: string) => void;
  removeFromFavorites: (id: string) => void;
  toggleDarkMode: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  searchPrompts: () => void;
  getAllPrompts: () => ((Prompt | VibePrompt) & { type: 'prompt' | 'vibe' })[];
  darkMode: boolean;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const initialSearchFilters: SearchFilters = {
  query: '',
  category: '',
  forDevs: null,
  platform: '',
  sortBy: 'relevance',
};

export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      hydrated: false,
      user: null,
      prompts: [],
      vibePrompts: [],
      filteredPrompts: [],
      searchFilters: initialSearchFilters,
      favorites: [],
      darkMode: false,
      isLoading: false,
      error: null,
      sidebarOpen: false,

      setHydrated: () => {
        set({ hydrated: true });
      },

      setUser: (user) => {
        set({ user });
      },

      setPrompts: (prompts) => {
        set({ prompts });
        get().searchPrompts();
      },

      setVibePrompts: (vibePrompts) => {
        set({ vibePrompts });
        get().searchPrompts();
      },

      setSearchFilters: (filters) => {
        set((state) => ({
          searchFilters: { ...state.searchFilters, ...filters },
        }));
        get().searchPrompts();
      },

      addToFavorites: (id) => {
        set((state) => ({
          favorites: [...state.favorites, id],
        }));
      },

      removeFromFavorites: (id) => {
        set((state) => ({
          favorites: state.favorites.filter((favId) => favId !== id),
        }));
      },

      toggleDarkMode: () => {
        set((state) => ({ darkMode: !state.darkMode }));
      },

      setLoading: (isLoading) => {
        set({ isLoading });
      },

      setError: (error) => {
        set({ error });
      },

      getAllPrompts: () => {
        const { prompts, vibePrompts } = get();
        return [
          ...prompts.map(p => ({ ...p, type: 'prompt' as const })),
          ...vibePrompts.map(p => ({ ...p, type: 'vibe' as const }))
        ];
      },

      searchPrompts: () => {
        const { prompts, vibePrompts, searchFilters } = get();
        const allPrompts = [
          ...prompts.map(p => ({ ...p, type: 'prompt' as const })),
          ...vibePrompts.map(p => ({ ...p, type: 'vibe' as const }))
        ];

        let filtered = allPrompts;

        // Filter by developer focus
        if (searchFilters.forDevs !== null) {
          filtered = filtered.filter((prompt) => {
            if ('for_devs' in prompt) {
              return prompt.for_devs === searchFilters.forDevs;
            }
            // For vibe prompts, consider tech-related keywords
            return searchFilters.forDevs ? 
              prompt.techstack.toLowerCase().includes('javascript') ||
              prompt.techstack.toLowerCase().includes('python') ||
              prompt.techstack.toLowerCase().includes('react') ||
              prompt.app.toLowerCase().includes('app') ||
              prompt.app.toLowerCase().includes('tool') : true;
          });
        }

        // Filter by category
        if (searchFilters.category) {
          filtered = filtered.filter((prompt) =>
            prompt.category?.toLowerCase().includes(searchFilters.category.toLowerCase())
          );
        }

        // Text search using Fuse.js
        if (searchFilters.query) {
          const fuse = new Fuse(filtered, {
            keys: [
              { name: 'act', weight: 2 },
              { name: 'app', weight: 2 },
              { name: 'prompt', weight: 1 },
              { name: 'techstack', weight: 1.5 },
            ],
            threshold: 0.3,
            includeScore: true,
          });

          const results = fuse.search(searchFilters.query);
          filtered = results.map((result) => result.item);
        }

        // Sort results
        switch (searchFilters.sortBy) {
          case 'name':
            filtered.sort((a, b) => {
              const nameA = 'act' in a ? a.act : a.app;
              const nameB = 'act' in b ? b.act : b.app;
              return nameA.localeCompare(nameB);
            });
            break;
          case 'newest':
            filtered.sort((a, b) => 
              new Date(b.created_at || '').getTime() - new Date(a.created_at || '').getTime()
            );
            break;
          case 'oldest':
            filtered.sort((a, b) => 
              new Date(a.created_at || '').getTime() - new Date(b.created_at || '').getTime()
            );
            break;
          // 'relevance' is already handled by Fuse.js
        }

        set({ filteredPrompts: filtered });
      },

      setSidebarOpen: (open: boolean) => set({ sidebarOpen: open }),
    }),
    {
      name: 'prompt-kirjasto-storage',
      partialize: (state) => ({
        favorites: state.favorites,
        darkMode: state.darkMode,
        searchFilters: state.searchFilters,
        sidebarOpen: state.sidebarOpen,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated();
      },
    }
  )
); 