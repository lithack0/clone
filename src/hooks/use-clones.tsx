"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { db } from "@/lib/firebase";
import {
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { useAuth } from "@/hooks/use-auth";
import type { Clone, Credential, Platform } from "@/lib/types";

interface ClonesContextType {
  clones: Clone[];
  addClone: (platform: Platform) => Promise<Clone>;
  addCredential: (
    cloneId: string,
    credential: Omit<Credential, "id" | "createdAt">
  ) => Promise<void>;
  deleteClone: (cloneId: string) => Promise<void>;
  isLoaded: boolean;
}

const ClonesContext = createContext<ClonesContextType | undefined>(undefined);

export function ClonesProvider({ children }: { children: ReactNode }) {
  const [clones, setClones] = useState<Clone[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      setClones([]);
      setIsLoaded(true);
      return;
    }

    const q = query(
      collection(db, "clones"),
      where("userId", "==", user.email)
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const clonesData: Clone[] = [];
      querySnapshot.forEach((doc) => {
        clonesData.push({ id: doc.id, ...doc.data() } as Clone);
      });
      setClones(clonesData);
      setIsLoaded(true);
    });

    return () => unsubscribe();
  }, [user]);

  const addClone = async (platform: Platform) => {
    if (!user) throw new Error("User not authenticated");

    const newClone: Omit<Clone, "id"> = {
      userId: user.email!,
      platform,
      url: "", // will set after
      createdAt: new Date().toISOString(),
      credentials: [],
    };

    const docRef = await addDoc(collection(db, "clones"), newClone);
    const clone: Clone = { id: docRef.id, ...newClone, url: `/c/${docRef.id}` };
    await updateDoc(docRef, { url: `/c/${docRef.id}` });
    return clone;
  };

  const addCredential = async (
    cloneId: string,
    credentialData: Omit<Credential, "id" | "createdAt">
  ) => {
    const newCredential: Credential = {
      ...credentialData,
      id: `cred-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
    };

    const cloneRef = doc(db, "clones", cloneId);
    const clone = clones.find((c) => c.id === cloneId);
    if (clone) {
      await updateDoc(cloneRef, {
        credentials: [newCredential, ...clone.credentials],
      });
    }
  };

  const deleteClone = async (cloneId: string) => {
    await deleteDoc(doc(db, "clones", cloneId));
  };

  return (
    <ClonesContext.Provider
      value={{ clones, addClone, addCredential, deleteClone, isLoaded }}
    >
      {children}
    </ClonesContext.Provider>
  );
}

export function useClones() {
  const context = useContext(ClonesContext);
  if (context === undefined) {
    throw new Error("useClones must be used within a ClonesProvider");
  }
  return context;
}
