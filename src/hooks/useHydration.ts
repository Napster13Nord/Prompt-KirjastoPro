'use client';

import { useState, useEffect } from 'react';
import { useAppStore } from '@/store/useAppStore';

export function useHydration() {
  const [hydrated, setHydrated] = useState(false);
  const storeHydrated = useAppStore((state) => state.hydrated);

  useEffect(() => {
    // Use a small delay to ensure DOM is fully ready
    const timer = setTimeout(() => {
      setHydrated(true);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  return hydrated && storeHydrated;
} 