'use client';

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import type { Clone, Credential, Platform } from '@/lib/types';

interface ClonesContextType {
  clones: Clone[];
  addClone: (platform: Platform) => Clone;
  addCredential: (
    cloneId: string,
    credential: Omit<Credential, 'id' | 'createdAt'>
  ) => void;
  deleteClone: (cloneId: string) => void;
  isLoaded: boolean;
}

const ClonesContext = createContext<ClonesContextType | undefined>(undefined);

export function ClonesProvider({ children }: { children: ReactNode }) {
  const [clones, setClones] = useState<Clone[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const item = window.localStorage.getItem('clones');
      if (item) {
        setClones(JSON.parse(item));
      }
    } catch (error) {
      console.error('Failed to load clones from localStorage', error);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      try {
        window.localStorage.setItem('clones', JSON.stringify(clones));
      } catch (error) {
        console.error('Failed to save clones to localStorage', error);
      }
    }
  }, [clones, isLoaded]);

  const addClone = (platform: Platform) => {
    const id = `${platform}-${Math.random().toString(36).substr(2, 9)}`;
    const newClone: Clone = {
      id,
      platform,
      url: `/c/${id}`,
      createdAt: new Date().toISOString(),
      credentials: [],
    };
    setClones((prevClones) => [newClone, ...prevClones]);
    return newClone;
  };

  const addCredential = (
    cloneId: string,
    credentialData: Omit<Credential, 'id' | 'createdAt'>
  ) => {
    const newCredential: Credential = {
      ...credentialData,
      id: `cred-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
    };

    setClones((prevClones) =>
      prevClones.map((clone) =>
        clone.id === cloneId
          ? {
              ...clone,
              credentials: [newCredential, ...clone.credentials],
            }
          : clone
      )
    );
  };
  
  const deleteClone = (cloneId: string) => {
    setClones((prevClones) => prevClones.filter(clone => clone.id !== cloneId));
  };

  return (
    <ClonesContext.Provider value={{ clones, addClone, addCredential, deleteClone, isLoaded }}>
      {children}
    </ClonesContext.Provider>
  );
}

export function useClones() {
  const context = useContext(ClonesContext);
  if (context === undefined) {
    throw new Error('useClones must be used within a ClonesProvider');
  }
  return context;
}
