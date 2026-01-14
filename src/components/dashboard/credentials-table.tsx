'use client';
import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Credential } from '@/lib/types';
import { Eye, EyeOff } from 'lucide-react';

export function CredentialsTable({ credentials }: { credentials: Credential[] }) {
  const [visiblePasswords, setVisiblePasswords] = useState<Record<string, boolean>>({});

  const togglePasswordVisibility = (id: string) => {
    setVisiblePasswords(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Username</TableHead>
            <TableHead>Password</TableHead>
            <TableHead className="text-right">Date Captured</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {credentials.map((cred) => (
            <TableRow key={cred.id}>
              <TableCell className="font-medium">{cred.username}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <span>
                    {visiblePasswords[cred.id] ? cred.password : '••••••••'}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => togglePasswordVisibility(cred.id)}
                  >
                    {visiblePasswords[cred.id] ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <Badge variant="outline">
                  {new Date(cred.createdAt).toLocaleDateString()}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
