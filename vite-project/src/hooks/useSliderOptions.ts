
export interface Breakpoints {
    [key: number]: {
        slidePerView: number;
        spaceBetween: number;
    };
}
export default function useSliderOptions() {

    const slidePerView = 1;
    const spaceBetween = 30;
    const direction = 'horizontal';
    const breakpoints: Breakpoints = {
        640: {
            slidePerView: 2,
            spaceBetween: 30,
        },
        768: {
            slidePerView: 3,
            spaceBetween: 30,
        },
        1024: {
            slidePerView: 4,
            spaceBetween: 30,
        },
    }
  return {
    slidePerView,
    spaceBetween,
    breakpoints,
    direction
  };
}
