import useCalculateSizes from "./hooks/useCalculateSizes";
import usePagination from "./hooks/usePagination";
import { slides } from "./lib/data";

interface Slide {
  image: string;
  title: string;
}

function App() {
  const { containerRef, slideWidth, currentSlidePerView } = useCalculateSizes();
  const slidesData: Slide[] = slides;

  // Utilisation de usePagination pour gérer la pagination
  const { currentIndex, nextSlide, prevSlide, maxIndex } = usePagination(currentSlidePerView);

  // Calcul du nombre maximum d'index avant de désactiver le bouton "Next"
  // const maxIndex = slidesData.length - Math.min(slidesData.length, currentSlidePerView); // 4 slides par view

  return (
    <main>
      <button onClick={prevSlide} disabled={currentIndex === 0}>
        Prev
      </button>
      <button
        onClick={nextSlide}
        disabled={currentIndex >= maxIndex}  // Désactiver le bouton si la dernière slide est visible
      >
        Next
      </button>
      <h1>Current Index: {currentIndex}</h1>

      <div className="mimachh-container" ref={containerRef} style={{ overflow: "hidden" }}>
        <div
          className="slides-container"
          style={{
            display: "flex",
            gap: "30px",
            transform: `translateX(-${currentIndex * (slideWidth + 30)}px)`, // Décaler en fonction de currentIndex
            transition: "transform 0.5s ease", // Transition fluide entre les slides
          }}
        >
          {slidesData.map((slide, index) => (
            <div
              key={index}
              className="mimachh-slide"
              style={{ width: `${slideWidth}px` }}
            >
              <div className="mimachh-img-container">
                <img src={slide.image} alt={slide.title} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default App;
