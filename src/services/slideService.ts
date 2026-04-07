import { slides } from '../data/slidesData';
import { Slide } from '../types';

export const slideService = {
  getSlides: (): Slide[] => {
    return slides;
  },
  getSlideById: (id: number): Slide | undefined => {
    return slides.find(s => s.id === id);
  },
  getTotalSlides: (): number => {
    return slides.length;
  }
};
