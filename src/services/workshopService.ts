import { Workshop } from '../types';

export const workshops: Workshop[] = [
  {
    id: 'level-1',
    title: 'The Augmented Engineer - Level 1',
    level: 1,
    description: 'Mastering the basics of AI-augmented engineering with Copilot, Claude Code, and Windsurf.'
  },
  {
    id: 'level-2',
    title: 'The Augmented Engineer - Level 2',
    level: 2,
    description: 'Advanced patterns, custom skills, and complex multi-agent workflows.'
  }
];

export const workshopService = {
  getWorkshops: (): Workshop[] => workshops,
  getWorkshopById: (id: string): Workshop | undefined => workshops.find(w => w.id === id)
};
