import React from 'react';
import { Button } from './ui/button';
import { Settings } from 'lucide-react';

export const Header = ({ onSettingsClick }) => {
  return (
    <header className="bg-card shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Personalized News Feed</h1>
        <Button variant="ghost" size="icon" onClick={onSettingsClick}>
          <Settings className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
};