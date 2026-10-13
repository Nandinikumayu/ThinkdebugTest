import React, { useState, useEffect, useRef } from "react";
import { heroSlides } from "../data/initialProducts";

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const slideCount = heroSlides.length;
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (isPaused) return;

    timeoutRef.current = setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % slideCount);
    }, 4500);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [currentSlide, isPaused, slideCount]);

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slideCount);
  };

  const goToPrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slideCount) % slideCount);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <section
      className="hero-slider-section"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Promotional Carousel"
    >
      <div className="slider-wrapper">
        <div
          className="slides-track"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {heroSlides.map((slide) => (
            <div
              key={slide.id}
              className={`slide-item theme-${slide.theme}`}
              style={{ background: slide.bgGradient }}
            >
              <div className="slide-content-grid">
                <div className="slide-art-left">
                  <div className="store-mockup-frame">
                    <div className="phone-screen-card">
                      <div className="store-awning">STORE</div>
                      <div className="store-interior">
                        <span className="cart-3d-glyph">🛒</span>
                      </div>
                    </div>
                    <div className="megaphone-3d" aria-hidden="true">
                      📣
                    </div>
                  </div>
                </div>

                <div className="slide-center-promo">
                  <span className="promo-badge">{slide.badge}</span>
                  <div className="promo-badge-circle">
                    <span className="promo-sup">NEW</span>
                    <span className="promo-main">SALE</span>
                    <div className="promo-percent-row">
                      <span className="promo-up-to">UP TO</span>
                      <span className="promo-num">50</span>
                      <span className="promo-percent-sign">%<br/><small>OFF</small></span>
                    </div>
                  </div>
                  <div className="promo-search-pill">
                    <span className="search-pill-icon">🔍</span>
                    <span className="search-pill-text">Explore Top Brands</span>
                  </div>
                </div>

                <div className="slide-art-right">
                  <div className="shop-kiosk-frame">
                    <div className="kiosk-awning">SHOP</div>
                    <div className="kiosk-showcase">
                      <span className="clothing-icon">👗</span>
                      <span className="bag-icon">🛍️</span>
                    </div>
                  </div>
                  <div className="floating-shopping-bags" aria-hidden="true">
                    <span className="bag-float-1">🛍️</span>
                    <span className="bag-float-2">🎁</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          className="slider-nav-btn prev-btn"
          onClick={goToPrev}
          aria-label="Previous Slide"
        >
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>

        <button
          className="slider-nav-btn next-btn"
          onClick={goToNext}
          aria-label="Next Slide"
        >
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>

      <div className="slider-dots-container">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            className={`slider-dot ${index === currentSlide ? "active" : ""}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
