import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/lib/cart';
import { useToast } from '@/hooks/use-toast';
import { Minus, Plus, Heart, Share, ArrowLeft, Truck, Shield, RotateCcw, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'wouter';
import type { ProductWithCategory } from '@shared/schema';
import VirtualTryOn from '@/components/virtual-tryon';

export default function ProductPage() {
  const { slug } = useParams<{ slug: string }>();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const { addItem } = useCartStore();

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const { data: product, isLoading, error } = useQuery({
    queryKey: ['/api/products', slug],
    enabled: !!slug,
  }) as { data: ProductWithCategory | undefined; isLoading: boolean; error: any };

  // Auto-select first available options
  useEffect(() => {
    if (product && !selectedSize && product.sizes && product.sizes.length > 0) {
      setSelectedSize(product.sizes[0]);
    }
    if (product && !selectedColor && product.colors && product.colors.length > 0) {
      setSelectedColor(product.colors[0]);
    }
  }, [product, selectedSize, selectedColor]);

  const handleAddToCart = () => {
    if (!product) return;

    const cartItem = {
      id: `${product.id}-${selectedSize}-${selectedColor}-${Date.now()}`,
      productId: product.id,
      quantity,
      size: selectedSize || null,
      color: selectedColor || null,
      product: product,
      sessionId: 'session'
    };

    addItem(cartItem);

    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-6 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image Skeleton */}
            <div className="space-y-4">
              <div className="aspect-square bg-gray-200 animate-pulse rounded-lg" />
              <div className="grid grid-cols-4 gap-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="aspect-square bg-gray-200 animate-pulse rounded" />
                ))}
              </div>
            </div>
            {/* Content Skeleton */}
            <div className="space-y-6">
              <div className="h-8 bg-gray-200 animate-pulse rounded" />
              <div className="h-6 bg-gray-200 animate-pulse rounded w-1/3" />
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 animate-pulse rounded" />
                <div className="h-4 bg-gray-200 animate-pulse rounded w-3/4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-light tracking-wide mb-4">Product not found</h1>
          <Link href="/">
            <Button className="bg-black text-white px-8 py-3 font-light tracking-wide">
              Return Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const productImages = product.images && product.images.length > 0 
    ? product.images 
    : ['https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800'];

  return (
    <div className="min-h-screen bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        {/* Left Side - Product Images */}
        <div className="relative bg-gray-50">
          {/* Main Image */}
          <div className="h-screen sticky top-0 overflow-hidden">
            <img
              src={productImages[selectedImage]}
              alt={product.name}
              className="w-full h-full object-cover"
              data-testid="img-product-main"
            />
            
            {/* Image Navigation */}
            {productImages.length > 1 && (
              <>
                <button
                  onClick={() => setSelectedImage(selectedImage > 0 ? selectedImage - 1 : productImages.length - 1)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={() => setSelectedImage(selectedImage < productImages.length - 1 ? selectedImage + 1 : 0)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors"
                >
                  <ChevronRight size={20} />
                </button>
              </>
            )}

            {/* Image Dots Indicator */}
            {productImages.length > 1 && (
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
                {productImages.map((_: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      selectedImage === index ? 'bg-black' : 'bg-white/60'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Side - Product Details */}
        <div className="px-8 lg:px-12 py-12 flex flex-col justify-between min-h-screen">
          {/* Back Button */}
          <div className="mb-8">
            <Link href="/">
              <Button variant="ghost" size="sm" className="p-0 h-auto font-light text-sm tracking-wide hover:bg-transparent">
                ← BACK
              </Button>
            </Link>
          </div>

          {/* Product Details */}
          <div className="flex-1 space-y-8">
            {/* Product Header */}
            <div className="space-y-6">
              <h1 className="text-2xl md:text-3xl font-light tracking-[0.05em] leading-tight" data-testid="text-product-name">
                {product.name}
              </h1>
              <p className="text-xl font-light text-gray-900" data-testid="text-product-price">
                ₹{parseFloat(product.price).toLocaleString('en-IN')}
              </p>
            </div>

            {/* Product Description */}
            {product.description && (
              <div className="border-t border-gray-200 pt-6">
                <p className="text-sm text-gray-600 leading-relaxed font-light" data-testid="text-product-description">
                  {product.description}
                </p>
              </div>
            )}

            {/* Product Options */}
            <div className="space-y-8">
              {/* Size Selection */}
              {product.sizes && product.sizes.length > 0 && (
                <div>
                  <h3 className="text-xs font-light tracking-[0.2em] uppercase mb-4 text-gray-700">
                    Size
                  </h3>
                  <div className="grid grid-cols-4 gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`py-3 text-xs font-light tracking-wide transition-all duration-200 border ${
                          selectedSize === size
                            ? 'border-black bg-black text-white'
                            : 'border-gray-300 hover:border-black'
                        }`}
                        data-testid={`button-size-${size.toLowerCase()}`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Color Selection */}
              {product.colors && product.colors.length > 0 && (
                <div>
                  <h3 className="text-xs font-light tracking-[0.2em] uppercase mb-4 text-gray-700">
                    Color
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-4 py-2 text-xs font-light tracking-wide transition-all duration-200 border ${
                          selectedColor === color
                            ? 'border-black bg-black text-white'
                            : 'border-gray-300 hover:border-black'
                        }`}
                        data-testid={`button-color-${color.toLowerCase()}`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* Bottom Section - Actions */}
          <div className="space-y-6 border-t border-gray-200 pt-8">
            {/* Quantity Selector */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-light tracking-[0.2em] uppercase text-gray-700">Quantity</span>
              <div className="flex items-center border border-gray-300">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                  className="p-2 hover:bg-gray-50 disabled:opacity-50"
                  data-testid="button-decrease-quantity"
                >
                  <Minus size={14} />
                </button>
                <span className="px-4 py-2 border-x border-gray-300 min-w-[50px] text-center text-sm" data-testid="text-quantity">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 hover:bg-gray-50"
                  data-testid="button-increase-quantity"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                onClick={handleAddToCart}
                className="w-full py-4 bg-black text-white font-light tracking-[0.1em] text-xs uppercase hover:bg-gray-800 transition-colors"
                data-testid="button-add-to-cart"
              >
                Add to Bag
              </Button>
              
              <div className="space-y-3">
                {/* Virtual Try-On */}
                <VirtualTryOn 
                  productImage={productImages[0]}
                  productName={product.name}
                />
                
                <div className="flex space-x-3">
                  <Button
                    variant="outline"
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    className="flex-1 py-3 font-light tracking-wide text-xs uppercase border-gray-300"
                    data-testid="button-wishlist"
                  >
                    <Heart size={14} className={`mr-2 ${isWishlisted ? 'fill-current' : ''}`} />
                    Wishlist
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 py-3 font-light tracking-wide text-xs uppercase border-gray-300"
                    data-testid="button-share"
                  >
                    <Share size={14} className="mr-2" />
                    Share
                  </Button>
                </div>
              </div>
            </div>

            {/* Product Features */}
            <div className="text-xs text-gray-600 space-y-2 pt-4 border-t border-gray-100">
              <div className="flex items-center space-x-2">
                <Truck size={14} />
                <span>Free delivery</span>
              </div>
              <div className="flex items-center space-x-2">
                <RotateCcw size={14} />
                <span>Free returns</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield size={14} />
                <span>2-year warranty</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* You May Be Interested In Section */}
      <RecommendedProducts currentProductId={product.id} />
    </div>
  );
}

// Recommended Products Component
function RecommendedProducts({ currentProductId }: { currentProductId: string }) {
  const { data: products } = useQuery({
    queryKey: ['/api/products'],
  }) as { data: ProductWithCategory[] | undefined };

  if (!products || products.length <= 1) return null;

  // Filter out current product and take first 4
  const recommendedProducts = products
    .filter((p) => p.id !== currentProductId)
    .slice(0, 4);

  return (
    <div className="bg-gray-50 py-20">
      <div className="container mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-extralight tracking-[0.1em] text-center mb-16">
          YOU MAY BE INTERESTED IN
        </h2>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {recommendedProducts.map((recProduct) => (
            <Link 
              key={recProduct.id} 
              href={`/product/${recProduct.slug}`}
              className="group"
              data-testid={`link-recommended-${recProduct.slug}`}
            >
              <div className="space-y-4">
                {/* Product Image */}
                <div className="aspect-[2/3] bg-white overflow-hidden">
                  <img
                    src={recProduct.images?.[0] || 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=800'}
                    alt={recProduct.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                
                {/* Product Info */}
                <div className="space-y-2">
                  <h3 className="text-sm font-light tracking-wide text-gray-900 group-hover:text-black transition-colors">
                    {recProduct.name}
                  </h3>
                  <p className="text-sm font-light text-gray-700">
                    ₹{parseFloat(recProduct.price).toLocaleString('en-IN')}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}