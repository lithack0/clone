"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import FacebookPage from "@/components/clones/FacebookPage";
import TwitterPage from "@/components/clones/TwitterPage";
import LinkedinPage from "@/components/clones/LinkedinPage";
import InstagramPage from "@/components/clones/InstagramPage";
import type { Clone } from "@/lib/types";

export default function ClonePage() {
  const params = useParams();
  const { slug } = params;
  const [clone, setClone] = useState<Clone | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchClone = async () => {
      const cloneId = Array.isArray(slug) ? slug[0] : slug;
      const docRef = doc(db, "clones", cloneId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setClone({ id: docSnap.id, ...docSnap.data() } as Clone);
      } else {
        setError(true);
      }
      setLoading(false);
    };

    if (slug) {
      fetchClone();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-100">
        <p>Loading clone...</p>
      </div>
    );
  }

  if (error || !clone) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="text-4xl font-bold">404</h1>
          <p className="text-lg">Clone not found.</p>
        </div>
      </div>
    );
  }

  switch (clone.platform) {
    case "facebook":
      return <FacebookPage clone={clone} />;
    case "twitter":
      return <TwitterPage clone={clone} />;
    case "linkedin":
      return <LinkedinPage clone={clone} />;
    case "instagram":
      return <InstagramPage clone={clone} />;
    default:
      return (
        <div className="flex h-screen items-center justify-center">
          Invalid clone platform.
        </div>
      );
  }
}
