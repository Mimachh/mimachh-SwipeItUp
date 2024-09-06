import { useEffect, useState } from "react";
import useSliderOptions from "./useSliderOptions";
import { slides } from "../lib/data";

export default function usePagination(currentSlidePerView: number) {
    // FIXME
    // Not updated in real time
    const sliderOptions = useSliderOptions();
    const { slidePerView } = sliderOptions;

    const totalSlide = slides.length;

    // FIXME
    // ici currentSlidePerwview n'est pas remis à jour en temps réel car il est dans un autre hook, comment faire pour le console.log toutes les secondes ? 
    // peut être qu'un useEffect ici qui écoute currentSlidePerView 

    
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const maxIndex = totalSlide - Math.min(totalSlide, currentSlidePerView); 
    // Ajustement de nextSlide pour bloquer la navigation après la dernière slide visible
    const nextSlide = () => {
        // Bloquer la navigation lorsque le dernier groupe de slides est entièrement visible
        if (currentIndex < totalSlide - currentSlidePerView) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const prevSlide = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const goToSlide = (index: number) => {
        if (index >= 0 && index <= totalSlide - slidePerView) {
            setCurrentIndex(index);
        }
    };

    const firstSlide = () => {
        setCurrentIndex(0);
    };

    const lastSlide = () => {
        setCurrentIndex(totalSlide - slidePerView);
    };

    const [autoPlay, setAutoPlay] = useState<boolean>(true);
    const [intervalId, setIntervalId] = useState<number>(0);

    const startAutoPlay = () => {
        setAutoPlay(true);
    };

    const stopAutoPlay = () => {
        setAutoPlay(false);
    };

    const handleAutoPlay = () => {
        if (autoPlay) {
            nextSlide();
        }
    };

    useEffect(() => {
        if (autoPlay) {
            const id = window.setInterval(handleAutoPlay, 5000);
            setIntervalId(id);
            return () => {
                window.clearInterval(id);
            };
        }
    }, [autoPlay, currentIndex]);

    useEffect(() => {

    }, [currentSlidePerView]);

    return {
        currentIndex,
        totalSlide,
        nextSlide,
        prevSlide,
        goToSlide,
        firstSlide,
        lastSlide,
        autoPlay,
        startAutoPlay,
        stopAutoPlay,
        maxIndex
    };
}
