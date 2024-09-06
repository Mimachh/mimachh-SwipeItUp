import { useEffect, useRef, useState } from "react";
import useSliderOptions from "./useSliderOptions";
import { getSliderConfig } from "../lib/get-slider-config";

export default function useCalculateSizes() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const [slideWidth, setSlideWidth] = useState<number>(0);
  const [currentSlidePerView, setCurrentSlidePerView] = useState<number>(1);

  // FIXME
  // not updated in real time
  const sliderOptions = useSliderOptions();
  const { breakpoints } = sliderOptions;

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const newContainerWidth = containerRef.current.offsetWidth;
        setContainerWidth(newContainerWidth);

        // Récupérer le bon nombre de slides et l'espacement selon le breakpoint
        const { slidePerView, spaceBetween } = getSliderConfig({ width: newContainerWidth });

        // Calculer la largeur d'un slide (en prenant en compte l'espace entre slides)
        const totalSpacing = spaceBetween * (slidePerView - 1);
        const newSlideWidth = (newContainerWidth - totalSpacing) / slidePerView;

        setSlideWidth(newSlideWidth);
        setCurrentSlidePerView(slidePerView);  // Stocker le nombre de slides par vue
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [breakpoints]);

  return {
    containerRef,
    containerWidth,
    slideWidth,
    currentSlidePerView,  // Retourner le nombre de slides visibles
  };
}
