import React from 'react';

export interface Slide {
  id: number;
  title: string;
  section: string;
  content: React.ReactNode;
  resourceId?: string;
  facilitatorNotes?: string;
}

export interface Resource {
  id: string;
  title: string;
  category: 'Exercise' | 'Handout' | 'Guide' | 'Bonus' | 'Reference';
  content: string;
}
