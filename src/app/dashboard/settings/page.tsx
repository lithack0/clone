'use client';
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Camera } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';

export default function SettingsPage() {
  const { toast } = useToast();
  const { user, updateUser } = useAuth();
  const defaultAvatar = PlaceHolderImages.find(img => img.id === 'user-avatar');
  
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setAvatarPreview(user?.avatarUrl || defaultAvatar?.imageUrl || null);
  }, [user, defaultAvatar]);


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (avatarPreview && avatarPreview !== (user?.avatarUrl || defaultAvatar?.imageUrl)) {
        updateUser({ avatarUrl: avatarPreview });
    }
    toast({
      title: 'Settings Saved',
      description: 'Your profile information has been updated.',
    });
  };

  const handleImageUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setAvatarPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
        toast({
          title: 'Image Ready',
          description: 'Click "Save Changes" to apply your new profile picture.',
        });
      } else {
        toast({
          variant: 'destructive',
          title: 'Invalid File Type',
          description: 'Please select an image file.',
        });
      }
    }
  };

  return (
    <div className="container mx-auto py-6">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Profile Settings</CardTitle>
          <CardDescription>
            Update your account information and profile picture.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="space-y-2 flex flex-col items-center">
              <Label htmlFor="profile-picture">Profile Picture</Label>
              <div className="relative group">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                  accept="image/*"
                  id="profile-picture-input"
                />
                <button
                  type="button"
                  onClick={handleImageUploadClick}
                  className="relative rounded-full focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                >
                  <Avatar className="w-32 h-32">
                    {avatarPreview && (
                      <AvatarImage
                        src={avatarPreview}
                        alt="User avatar"
                        data-ai-hint={defaultAvatar?.imageHint}
                      />
                    )}
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                  <div className="absolute inset-0 w-full h-full bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <Camera className="w-8 h-8" />
                    <span className="sr-only">Upload new picture</span>
                  </div>
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Enter your name" defaultValue="Demo User" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Enter your email" defaultValue={user?.email || "demo@user.com"} disabled />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bio">About</Label>
              <Textarea
                id="bio"
                placeholder="Tell us a little about yourself"
                className="min-h-[100px]"
              />
            </div>
          </CardContent>
          <CardFooter className="border-t px-6 py-4">
            <Button type="submit">Save Changes</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
