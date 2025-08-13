import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { useEffect, useState } from 'react';

export default function HeroSection() {
  const [currentImage, setCurrentImage] = useState(0);
  
  const heroImages = [
    'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&h=1200',
    'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&h=1200',
    'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&h=1200'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background Image Carousel */}
      <div className="absolute inset-0">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${
              index === currentImage ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ backgroundImage: `url('${image}')` }}
          />
        ))}
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-7xl md:text-9xl font-extralight tracking-[0.3em] mb-12 text-shadow animate-fade-in" data-testid="text-hero-title">
            THE NEW
          </h1>
          <div className="space-y-4">
            <p className="text-lg md:text-xl font-light tracking-wide text-shadow opacity-90">
              SPRING COLLECTION 2024
            </p>
            <Button
              asChild
              className="bg-transparent border border-white text-white px-12 py-4 text-sm font-light tracking-[0.2em] hover:bg-white hover:text-black transition-all duration-300"
              data-testid="button-view-all"
            >
              <Link href="/category/woman">DISCOVER</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <div className="flex flex-col items-center space-y-2">
          <span className="text-xs font-light tracking-wide text-shadow" data-testid="text-scroll-down">
            SCROLL TO EXPLORE
          </span>
          <div className="w-px h-8 bg-white/60"></div>
        </div>
      </div>

      {/* Image Indicators */}
      <div className="absolute bottom-8 right-8 flex space-x-2">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentImage ? 'bg-white' : 'bg-white/40'
            }`}
            data-testid={`button-hero-indicator-${index}`}
          />
        ))}
      </div>
    </section>
  );
}
