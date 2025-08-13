import { useQuery } from '@tanstack/react-query';
import HeroSection from '@/components/hero-section';
import AestheticGallery from '@/components/aesthetic-gallery';
import ModelGrid from '@/components/model-grid';
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

  const { data: customizedProducts = [], isLoading: isLoadingCustomized } = useQuery({
    queryKey: ['/api/products', { category: 'customized' }],
  }) as { data: ProductWithCategory[]; isLoading: boolean };

  return (
    <>
      {/* Main Hero Section */}
      <HeroSection />
      
      {/* Aesthetic Full-Size Gallery */}
      <AestheticGallery />
      
      {/* Full-Size Model Grid with Random Layout */}
      <ModelGrid />
      
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

      {/* Customization Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-extralight mb-6 tracking-[0.2em] text-gray-900 dark:text-white">
              CUSTOMIZATION
            </h2>
            <p className="text-lg font-light text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Create your unique style with our personalized collection. Each piece can be tailored to your preferences,
              ensuring a perfect fit and distinctive look that reflects your individual taste.
            </p>
          </div>

          {isLoadingCustomized ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-200 dark:bg-gray-700 h-96 mb-4 rounded"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : customizedProducts.length > 0 ? (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-12">
                {customizedProducts.slice(0, 8).map((product) => (
                  <Link key={product.id} href={`/customize/${product.slug}`} className="group">
                    <div className="relative overflow-hidden bg-white dark:bg-gray-700 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300">
                      <div className="aspect-square overflow-hidden">
                        <img
                          src={product.images[0] || 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800'}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          data-testid={`img-custom-product-${product.id}`}
                        />
                        <div className="absolute top-3 right-3">
                          <span className="bg-black text-white text-xs px-2 py-1 rounded-full font-light tracking-wider">
                            CUSTOM
                          </span>
                        </div>
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="bg-white text-black px-4 py-2 rounded-full font-light tracking-wider text-sm">
                              CUSTOMIZE NOW
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="text-sm font-light tracking-wider text-gray-900 dark:text-white mb-2 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors" data-testid={`text-custom-product-name-${product.id}`}>
                          {product.name}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400" data-testid={`text-custom-product-price-${product.id}`}>
                          From ${product.price}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              
              <div className="text-center">
                <Button
                  asChild
                  variant="outline"
                  className="px-8 py-3 font-light tracking-widest hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-gray-900 transition-colors"
                  data-testid="button-view-all-custom"
                >
                  <Link href="/category/customized">
                    VIEW ALL CUSTOMIZED PRODUCTS
                  </Link>
                </Button>
              </div>
            </>
          ) : (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                </svg>
              </div>
              <h3 className="text-xl font-light text-gray-600 dark:text-gray-400 mb-4">
                Customization Coming Soon
              </h3>
              <p className="text-gray-500 dark:text-gray-500 max-w-md mx-auto">
                We're working on bringing you personalized fashion options. Stay tuned for our customization service.
              </p>
            </div>
          )}
        </div>
      </section>

      <Newsletter />
    </>
  );
}
