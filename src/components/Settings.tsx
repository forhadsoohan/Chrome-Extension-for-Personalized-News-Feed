import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Checkbox } from './ui/checkbox';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';

export const Settings = ({ settings, onSave, onCancel }) => {
  const [newSettings, setNewSettings] = useState(settings);

  const handleSourceChange = (source) => {
    setNewSettings((prev) => ({
      ...prev,
      sources: prev.sources.includes(source)
        ? prev.sources.filter((s) => s !== source)
        : [...prev.sources, source],
    }));
  };

  const handleCategoryChange = (category) => {
    setNewSettings((prev) => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter((c) => c !== category)
        : [...prev.categories, category],
    }));
  };

  const handleLayoutChange = (layout) => {
    setNewSettings((prev) => ({ ...prev, layout }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>News Feed Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium">News Sources</h3>
            <div className="mt-2 space-y-2">
              {['CNN', 'BBC', 'Reuters'].map((source) => (
                <div key={source} className="flex items-center">
                  <Checkbox
                    id={`source-${source}`}
                    checked={newSettings.sources.includes(source)}
                    onCheckedChange={() => handleSourceChange(source)}
                  />
                  <Label htmlFor={`source-${source}`} className="ml-2">
                    {source}
                  </Label>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium">Categories</h3>
            <div className="mt-2 space-y-2">
              {['Technology', 'Politics', 'Sports', 'Entertainment'].map((category) => (
                <div key={category} className="flex items-center">
                  <Checkbox
                    id={`category-${category}`}
                    checked={newSettings.categories.includes(category)}
                    onCheckedChange={() => handleCategoryChange(category)}
                  />
                  <Label htmlFor={`category-${category}`} className="ml-2">
                    {category}
                  </Label>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium">Layout</h3>
            <RadioGroup
              value={newSettings.layout}
              onValueChange={handleLayoutChange}
              className="mt-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="grid" id="layout-grid" />
                <Label htmlFor="layout-grid">Grid</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="list" id="layout-list" />
                <Label htmlFor="layout-list">List</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
        <div className="mt-6 flex justify-end space-x-2">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={() => onSave(newSettings)}>Save Changes</Button>
        </div>
      </CardContent>
    </Card>
  );
};