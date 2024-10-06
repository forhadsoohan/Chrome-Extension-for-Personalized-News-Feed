import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Skeleton } from './ui/skeleton';

export const NewsFeed = ({ settings }) => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNews();
  }, [settings]);

  const fetchNews = async () => {
    setLoading(true);
    // In a real implementation, you would fetch news from an API here
    // For this example, we'll use dummy data
    const dummyNews = [
      { id: 1, title: 'Breaking News 1', content: 'This is the content of breaking news 1' },
      { id: 2, title: 'Tech Update', content: 'Latest advancements in AI technology' },
      { id: 3, title: 'Sports Highlight', content: 'Recap of the weekend\'s biggest games' },
    ];
    setTimeout(() => {
      setNews(dummyNews);
      setLoading(false);
    }, 1000);
  };

  if (loading) {
    return (
      <div className={`grid ${settings.layout === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-4`}>
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-4 w-[250px]" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-[300px]" />
              <Skeleton className="h-4 w-[200px] mt-2" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className={`grid ${settings.layout === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-4`}>
      {news.map((item) => (
        <Card key={item.id}>
          <CardHeader>
            <CardTitle>{item.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{item.content}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};