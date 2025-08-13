import { useState, useEffect } from 'react';
import { Link } from 'wouter';

export default function ModelGrid() {
  const [visibleItems, setVisibleItems] = useState([0, 1, 2]);

  const modelImages = [
    {
      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=900',
      title: 'THE SUIT',
      category: 'BLAZERS',
      link: '/category/woman',
      gridClass: 'row-span-2'
    },
    {
      image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600',
      title: 'LEATHER EDIT',
      category: 'JACKETS',
      link: '/category/woman',
      gridClass: ''
    },
    {
      image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=800',
      title: 'MINIMALIST',
      category: 'DRESSES',
      link: '/category/woman',
      gridClass: 'col-span-2'
    },
    {
      image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=700',
      title: 'KNITWEAR',
      category: 'SWEATERS',
      link: '/category/woman',
      gridClass: ''
    },
    {
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=900',
      title: 'OUTERWEAR',
      category: 'COATS',
      link: '/category/woman',
      gridClass: 'row-span-2'
    },
    {
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600',
      title: 'BASICS',
      category: 'ESSENTIALS',
      link: '/category/woman',
      gridClass: ''
    },
    {
      image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=800',
      title: 'ACCESSORIES',
      category: 'BAGS & SHOES',
      link: '/category/woman',
      gridClass: 'col-span-2'
    },
    {
      image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=700',
      title: 'DENIM',
      category: 'JEANS',
      link: '/category/woman',
      gridClass: ''
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleItems(prev => {
        const nextItems = [...prev];
        const randomIndex = Math.floor(Math.random() * modelImages.length);
        if (!nextItems.includes(randomIndex)) {
          nextItems.shift();
          nextItems.push(randomIndex);
        }
        return nextItems;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, [modelImages.length]);

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-7xl font-extralight tracking-[0.2em] text-black mb-8">
            STUDIO
          </h2>
          <p className="text-lg font-light text-gray-600 max-w-2xl mx-auto">
            Indoor photoshoot sessions capturing the essence of contemporary fashion
          </p>
          <div className="mt-8 flex justify-center">
            <div className="w-16 h-px bg-gray-300"></div>
          </div>
        </div>

        {/* Masonry Grid Layout - Inspired by Zara */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[200px] gap-3 md:gap-4">
          {modelImages.map((model, index) => (
            <div
              key={index}
              className={`
                ${model.gridClass}
                group cursor-pointer overflow-hidden relative
                transition-all duration-500 hover:scale-[1.02] hover:z-10
                ${visibleItems.includes(index) ? 'opacity-100' : 'opacity-80'}
                masonry-item
              `}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Link href={model.link}>
                <div className="relative w-full h-full bg-gray-100">
                  <img
                    src={model.image}
                    alt={model.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  
                  {/* Subtle Overlay for Text Readability */}
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-all duration-300" />
                  
                  {/* Minimalist Text Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 text-white transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <p className="text-xs font-light tracking-[0.15em] opacity-90 mb-1">
                      {model.category}
                    </p>
                    <h3 className="text-sm md:text-base font-light tracking-wide">
                      {model.title}
                    </h3>
                  </div>

                  {/* Corner Indicator */}
                  <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-white text-xs font-light">
                      {index + 1}
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* View More */}
        <div className="text-center mt-16">
          <Link href="/category/woman">
            <button className="px-12 py-4 border border-black text-black text-sm font-light tracking-[0.2em] hover:bg-black hover:text-white transition-all duration-300">
              VIEW ALL COLLECTIONS
            </button>
          </Link>
        </div>
      </div>

      {/* Floating Design Elements */}
      <div className="absolute top-20 left-10 w-16 h-16 border border-gray-300 rounded-full opacity-20 animate-float hidden lg:block"></div>
      <div className="absolute bottom-20 right-16 w-12 h-12 border border-gray-300 rounded-full opacity-30 animate-float hidden lg:block" style={{ animationDelay: '2s' }}></div>
    </section>
  );
}