import React from 'react';

export interface Workshop {
  id: string;
  title: string;
  level: number;
  description: string;
}

export interface Slide {
  id: number;
  workshopId: string;
  title: string;
  section: string;
  content: React.ReactNode;
  resourceId?: string;
  facilitatorNotes?: string;
}

export interface Resource {
  id: string;
  workshopId: string;
  title: string;
  category: 'Exercise' | 'Handout' | 'Guide' | 'Bonus' | 'Reference';
  content: string;
}
