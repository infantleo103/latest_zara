import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';

export default function AestheticGallery() {
  const [currentSection, setCurrentSection] = useState(0);

  const galleryImages = [
    {
      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&h=2000',
      title: 'WOMEN',
      subtitle: 'NEW ARRIVALS',
      link: '/category/woman'
    },
    {
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&h=2000',
      title: 'MEN',
      subtitle: 'SPRING COLLECTION',
      link: '/category/man'
    },
    {
      image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&h=2000',
      title: 'KIDS',
      subtitle: 'PLAYFUL STYLES',
      link: '/category/kids'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSection((prev) => (prev + 1) % galleryImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [galleryImages.length]);

  return (
    <section className="h-screen overflow-hidden relative">
      {/* Background Images */}
      {galleryImages.map((section, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-1000 ${
            index === currentSection ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          }`}
        >
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url('${section.image}')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
        </div>
      ))}

      {/* Content Overlay */}
      <div className="absolute inset-0 flex items-center">
        <div className="container mx-auto px-6">
          <div className="max-w-xl">
            <div className="space-y-6 text-white animate-fade-in">
              <p className="text-sm font-light tracking-[0.3em] opacity-80">
                {galleryImages[currentSection].subtitle}
              </p>
              <h2 className="text-6xl md:text-8xl font-extralight tracking-[0.2em] text-shadow">
                {galleryImages[currentSection].title}
              </h2>
              <p className="text-lg font-light opacity-90 max-w-md leading-relaxed">
                Discover the latest trends and timeless pieces crafted with precision and style.
              </p>
              <Button
                asChild
                className="bg-transparent border border-white text-white px-8 py-3 text-sm font-light tracking-[0.2em] hover:bg-white hover:text-black transition-all duration-300 mt-8"
                data-testid="button-shop-collection"
              >
                <Link href={galleryImages[currentSection].link}>
                  SHOP COLLECTION
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-8 left-6 flex flex-col space-y-4">
        {galleryImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSection(index)}
            className={`w-px h-12 transition-all duration-300 ${
              index === currentSection ? 'bg-white' : 'bg-white/40'
            }`}
            data-testid={`button-gallery-nav-${index}`}
          />
        ))}
      </div>

      {/* Floating Elements */}
      <div className="absolute top-1/4 right-12 hidden lg:block">
        <div className="glass-morphism p-6 rounded-full animate-float">
          <span className="text-white text-xs font-light tracking-wide">2024</span>
        </div>
      </div>

      <div className="absolute bottom-1/4 right-1/4 hidden lg:block">
        <div className="glass-morphism p-4 rounded-full animate-float" style={{ animationDelay: '2s' }}>
          <span className="text-white text-xs font-light">NEW</span>
        </div>
      </div>
    </section>
  );
}