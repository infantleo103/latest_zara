import { useQuery } from '@tanstack/react-query';
import HeroSection from '@/components/hero-section';
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
      <HeroSection />
      <CategoryGrid />
      
      {isLoading ? (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-light text-center mb-12 tracking-wide">
              FEATURED PRODUCTS
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-200 h-80 mb-4"></div>
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
          title="FEATURED PRODUCTS"
          className="bg-gray-50"
        />
      )}

      {/* Editorial Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1000"
                alt="Editorial Fashion"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl font-light mb-6 tracking-wide" data-testid="text-edit-title">
                  THE EDIT
                </h2>
                <p className="text-gray-600 leading-relaxed" data-testid="text-edit-description">
                  Discover our curated selection of timeless pieces that define contemporary elegance.
                  From statement coats to refined accessories, each item is carefully chosen to elevate
                  your wardrobe with sophisticated style.
                </p>
              </div>
              <Button
                asChild
                className="bg-black text-white px-8 py-3 text-sm font-medium tracking-wide hover:bg-gray-800 transition-colors"
                data-testid="button-shop-edit"
              >
                <Link href="/category/woman">SHOP THE EDIT</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Newsletter />
    </>
  );
}
