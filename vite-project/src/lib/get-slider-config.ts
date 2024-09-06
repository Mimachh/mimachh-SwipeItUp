import useSliderOptions from "../hooks/useSliderOptions";

export const getSliderConfig = ({width} : {width: number}) => {
    
    const sliderOptions = useSliderOptions();
    const { slidePerView, spaceBetween, breakpoints } = sliderOptions;
    let config = { slidePerView, spaceBetween };

    Object.keys(breakpoints).forEach((breakpoint) => {
      if (width >= parseInt(breakpoint)) {
        //@ts-ignore
        config = breakpoints[breakpoint];
      }
    });

    return config;
  };