import { useState } from 'react';
import { Link } from 'wouter';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { ProductWithCategory } from '@shared/schema';

interface ProductGridProps {
  products: ProductWithCategory[];
  title?: string;
  className?: string;
}

export default function ProductGrid({ products, title, className }: ProductGridProps) {
  const [likedProducts, setLikedProducts] = useState<Set<string>>(new Set());

  const toggleLike = (productId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setLikedProducts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(productId)) {
        newSet.delete(productId);
      } else {
        newSet.add(productId);
      }
      return newSet;
    });
  };

  if (products.length === 0) {
    return (
      <section className={cn("py-16", className)}>
        <div className="container mx-auto px-4">
          {title && (
            <h2 className="text-3xl font-light text-center mb-12 tracking-wide" data-testid="text-section-title">
              {title}
            </h2>
          )}
          <p className="text-center text-gray-500" data-testid="text-no-products">
            No products found.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className={cn("py-16", className)}>
      <div className="container mx-auto px-4">
        {title && (
          <h2 className="text-3xl font-light text-center mb-12 tracking-wide" data-testid="text-section-title">
            {title}
          </h2>
        )}
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" data-testid="grid-products">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.slug}`}
              className="group cursor-pointer"
              data-testid={`link-product-${product.slug}`}
            >
              <div className="relative overflow-hidden bg-white">
                <img
                  src={product.images[0] || 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=900'}
                  alt={product.name}
                  className="w-full h-96 object-cover group-hover:opacity-75 transition-opacity"
                />
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="bg-white p-2 rounded-full shadow-md hover:shadow-lg"
                    onClick={(e) => toggleLike(product.id, e)}
                    data-testid={`button-like-${product.slug}`}
                  >
                    <Heart
                      size={16}
                      className={cn(
                        'text-gray-600',
                        likedProducts.has(product.id) && 'fill-red-500 text-red-500'
                      )}
                    />
                  </Button>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <h3 className="text-sm font-medium" data-testid={`text-product-name-${product.slug}`}>
                  {product.name}
                </h3>
                <p className="text-sm text-gray-600" data-testid={`text-product-price-${product.slug}`}>
                  ₹{parseFloat(product.price).toLocaleString('en-IN', {
                    minimumFractionDigits: 2,
                  })}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
