import { useQuery } from '@tanstack/react-query';
import HeroSection from '@/components/hero-section';
import AestheticGallery from '@/components/aesthetic-gallery';
import FloatingModels from '@/components/floating-models';
import CategoryGrid from '@/components/category-grid';
import ProductGrid from '@/components/product-grid';
import Newsletter from '@/components/newsletter';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import type { ProductWithCategory } from '@shared/schema';

export default function Home() {
  const { data: featuredProducts = [], isLoading } = useQuery({
    queryKey: ['/api/products', { featured: 'true' }],
  }) as { data: ProductWithCategory[]; isLoading: boolean };

  return (
    <>
      {/* Main Hero Section */}
      <HeroSection />
      
      {/* Aesthetic Full-Size Gallery */}
      <AestheticGallery />
      
      {/* Floating Models Section */}
      <FloatingModels />
      
      {/* Category Grid */}
      <CategoryGrid />
      
      {/* Featured Products */}
      {isLoading ? (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl md:text-6xl font-extralight text-center mb-16 tracking-[0.2em]">
              FEATURED
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-200 h-96 mb-4"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : (
        <ProductGrid
          products={featuredProducts}
          title="FEATURED"
          className="bg-white py-20"
        />
      )}

      {/* Parallax Editorial Section */}
      <section className="relative py-32 parallax-bg" style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1529139574466-a303027c1d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&h=1200')"
      }}>
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center text-white">
            <h2 className="text-5xl md:text-7xl font-extralight mb-8 tracking-[0.2em] text-shadow" data-testid="text-edit-title">
              THE EDIT
            </h2>
            <p className="text-lg font-light leading-relaxed mb-12 opacity-90" data-testid="text-edit-description">
              Discover our curated selection of timeless pieces that define contemporary elegance.
              From statement coats to refined accessories, each item is carefully chosen to elevate
              your wardrobe with sophisticated style.
            </p>
            <Button
              asChild
              className="bg-transparent border border-white text-white px-12 py-4 text-sm font-light tracking-[0.2em] hover:bg-white hover:text-black transition-all duration-300"
              data-testid="button-shop-edit"
            >
              <Link href="/category/woman">EXPLORE COLLECTION</Link>
            </Button>
          </div>
        </div>
      </section>

      <Newsletter />
    </>
  );
}
