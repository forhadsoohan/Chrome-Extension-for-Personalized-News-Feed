import React, { useState, useEffect } from 'react';
import { ThemeProvider } from 'next-themes';
import { NewsFeed } from './components/NewsFeed';
import { Settings } from './components/Settings';
import { Header } from './components/Header';
import { useToast } from './hooks/use-toast';
import { Toaster } from './components/ui/toaster';
import './App.css';

function App() {
  const [settings, setSettings] = useState({
    sources: [],
    categories: [],
    layout: 'grid',
  });
  const [showSettings, setShowSettings] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Load settings from chrome.storage
    chrome.storage.sync.get(['newsSettings'], (result) => {
      if (result.newsSettings) {
        setSettings(result.newsSettings);
      }
    });
  }, []);

  const saveSettings = (newSettings) => {
    setSettings(newSettings);
    chrome.storage.sync.set({ newsSettings: newSettings }, () => {
      toast({
        title: 'Settings saved',
        description: 'Your preferences have been updated.',
      });
    });
    setShowSettings(false);
  };

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="min-h-screen bg-background text-foreground">
        <Header onSettingsClick={() => setShowSettings(true)} />
        <main className="container mx-auto px-4 py-8">
          {showSettings ? (
            <Settings settings={settings} onSave={saveSettings} onCancel={() => setShowSettings(false)} />
          ) : (
            <NewsFeed settings={settings} />
          )}
        </main>
        <Toaster />
      </div>
    </ThemeProvider>
  );
}

export default App;