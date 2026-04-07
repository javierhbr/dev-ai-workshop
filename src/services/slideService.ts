import { slides } from '../data/slidesData';
import { Slide } from '../types';

export const slideService = {
  getSlides: (workshopId: string): Slide[] => {
    return slides.filter(s => s.workshopId === workshopId);
  },
  getSlideById: (workshopId: string, id: number): Slide | undefined => {
    return slides.find(s => s.workshopId === workshopId && s.id === id);
  },
  getTotalSlides: (workshopId: string): number => {
    return slides.filter(s => s.workshopId === workshopId).length;
  }
};
