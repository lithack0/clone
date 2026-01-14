'use client';
import { useParams } from 'next/navigation';
import { useClones } from '@/hooks/use-clones';
import FacebookPage from '@/components/clones/FacebookPage';
import TwitterPage from '@/components/clones/TwitterPage';
import LinkedinPage from '@/components/clones/LinkedinPage';
import InstagramPage from '@/components/clones/InstagramPage';

export default function ClonePage() {
  const params = useParams();
  const { slug } = params;
  const { clones } = useClones();

  const cloneId = Array.isArray(slug) ? slug[0] : slug;
  const currentClone = clones.find((c) => c.id === cloneId);

  if (!clones || clones.length === 0) {
     return (
        <div className="flex h-screen items-center justify-center bg-gray-100">
            <p>Loading clone...</p>
        </div>
     )
  }

  if (!currentClone) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="text-4xl font-bold">404</h1>
          <p className="text-lg">Clone not found.</p>
        </div>
      </div>
    );
  }

  switch (currentClone.platform) {
    case 'facebook':
      return <FacebookPage clone={currentClone} />;
    case 'twitter':
      return <TwitterPage clone={currentClone} />;
    case 'linkedin':
      return <LinkedinPage clone={currentClone} />;
    case 'instagram':
      return <InstagramPage clone={currentClone} />;
    default:
      return (
        <div className="flex h-screen items-center justify-center">
          Invalid clone platform.
        </div>
      );
  }
}
