import { useState, useEffect } from 'react';
import { Link } from 'wouter';

export default function FloatingModels() {
  const [visibleModels, setVisibleModels] = useState([0]);

  const models = [
    {
      image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1200',
      name: 'WINTER COATS',
      price: 'FROM ₹12,990',
      link: '/category/woman'
    },
    {
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1200',
      name: 'LEATHER GOODS',
      price: 'FROM ₹8,990',
      link: '/category/woman'
    },
    {
      image: 'https://images.unsplash.com/photo-1594633313593-bab3825d0caf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1200',
      name: 'CLASSIC SHIRTS',
      price: 'FROM ₹3,990',
      link: '/category/woman'
    },
    {
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1200',
      name: 'ACCESSORIES',
      price: 'FROM ₹2,990',
      link: '/category/woman'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleModels(prev => {
        const nextIndex = (Math.max(...prev) + 1) % models.length;
        return [...prev.slice(-2), nextIndex];
      });
    }, 3000);
    return () => clearInterval(interval);
  }, [models.length]);

  return (
    <section className="py-20 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-extralight tracking-[0.2em] text-black mb-8">
            EDITORIAL
          </h2>
          <p className="text-lg font-light text-gray-600 max-w-2xl mx-auto">
            Experience fashion through our lens. Each piece tells a story of contemporary elegance.
          </p>
        </div>

        {/* Infinite Scroll Container */}
        <div className="relative h-96 overflow-hidden">
          <div className="flex space-x-8 animate-pulse">
            {models.map((model, index) => (
              <div
                key={index}
                className={`flex-shrink-0 w-64 h-80 relative group cursor-pointer transition-all duration-700 ${
                  visibleModels.includes(index) 
                    ? 'opacity-100 transform translate-y-0' 
                    : 'opacity-40 transform translate-y-4'
                }`}
                style={{
                  animationDelay: `${index * 0.5}s`,
                  transform: `translateX(${index * 20}px)`
                }}
              >
                <Link href={model.link}>
                  <div className="relative overflow-hidden rounded-lg shadow-lg">
                    <img
                      src={model.image}
                      alt={model.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="text-lg font-light tracking-wide mb-2">{model.name}</h3>
                      <p className="text-sm opacity-90">{model.price}</p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Floating Text */}
        <div className="flex justify-center mt-16">
          <div className="text-center space-y-4">
            <div className="inline-block glass-morphism px-8 py-4 rounded-full">
              <span className="text-sm font-light tracking-[0.3em] text-gray-800">
                SCROLL TO DISCOVER MORE
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Background Decorative Elements */}
      <div className="absolute top-10 left-10 w-32 h-32 border border-gray-200 rounded-full opacity-20 animate-float"></div>
      <div className="absolute bottom-10 right-10 w-24 h-24 border border-gray-200 rounded-full opacity-30 animate-float" style={{ animationDelay: '3s' }}></div>
    </section>
  );
}