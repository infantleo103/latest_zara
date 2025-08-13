import { useParams, Link } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Heart, Minus, Plus, ShoppingBag, Truck, RotateCcw, Star, Share2, Ruler, Palette } from 'lucide-react';
import { useCartStore } from '@/lib/cart';
import { useToast } from '@/hooks/use-toast';
import type { ProductWithCategory } from '@shared/schema';

export default function ProductDetailPage() {
  const { slug } = useParams();
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [liked, setLiked] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  
  const { addItem } = useCartStore();
  const { toast } = useToast();

  const { data: product, isLoading } = useQuery({
    queryKey: ['/api/products', slug],
  }) as { data: ProductWithCategory; isLoading: boolean };

  const handleAddToCart = () => {
    if (!product) return;
    
    if (product.sizes.length > 1 && !selectedSize) {
      toast({
        title: 'Please select a size',
        variant: 'destructive',
      });
      return;
    }

    if (product.colors.length > 1 && !selectedColor) {
      toast({
        title: 'Please select a color',
        variant: 'destructive',
      });
      return;
    }

    const cartItem = {
      id: `${product.id}-${selectedSize}-${selectedColor}`,
      sessionId: 'anonymous',
      productId: product.id,
      quantity,
      size: selectedSize || null,
      color: selectedColor || null,
      product,
    };

    addItem(cartItem);
    
    toast({
      title: 'Added to cart',
      description: `${product.name} has been added to your cart.`,
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="animate-pulse">
              <div className="bg-gray-200 dark:bg-gray-700 aspect-square rounded-lg mb-4"></div>
              <div className="grid grid-cols-4 gap-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="bg-gray-200 dark:bg-gray-700 aspect-square rounded"></div>
                ))}
              </div>
            </div>
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-extralight tracking-widest text-gray-900 dark:text-white mb-4">PRODUCT NOT FOUND</h1>
          <p className="text-gray-600 dark:text-gray-400">The product you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images Gallery */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden bg-gray-50 dark:bg-gray-800">
              <img
                src={product.images[selectedImage] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                data-testid="img-product-main"
              />
            </div>
            
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square overflow-hidden border-2 transition-all duration-200 ${
                      selectedImage === index 
                        ? 'border-black dark:border-white' 
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-500'
                    }`}
                    data-testid={`button-image-${index}`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-8">
            {/* Header */}
            <div className="space-y-2">
              <h1 className="text-4xl font-extralight tracking-widest text-gray-900 dark:text-white" data-testid="text-product-name">
                {product.name}
              </h1>
              {product.category && (
                <p className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wider" data-testid="text-product-category">
                  {product.category.name}
                </p>
              )}
            </div>

            {/* Price and Stock */}
            <div className="flex items-center justify-between">
              <span className="text-3xl font-light text-gray-900 dark:text-white" data-testid="text-product-price">
                ${parseFloat(product.price).toLocaleString()}
              </span>
              <div className="flex items-center space-x-2">
                {product.inStock ? (
                  <Badge variant="secondary" className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
                    IN STOCK
                  </Badge>
                ) : (
                  <Badge variant="destructive">OUT OF STOCK</Badge>
                )}
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <Separator />

            {/* Description */}
            {product.description && (
              <div className="space-y-3">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white uppercase tracking-wider">
                  DETAILS
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed" data-testid="text-product-description">
                  {product.description}
                </p>
              </div>
            )}

            {/* Size Selection */}
            {product.sizes.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-medium text-gray-900 dark:text-white uppercase tracking-wider">
                    SIZE {product.sizes.length > 1 && <span className="text-red-500">*</span>}
                  </label>
                  <Button variant="ghost" size="sm" className="text-xs uppercase tracking-wider">
                    <Ruler className="mr-1 h-3 w-3" />
                    SIZE GUIDE
                  </Button>
                </div>
                <Select value={selectedSize} onValueChange={setSelectedSize}>
                  <SelectTrigger className="w-full h-12" data-testid="select-size">
                    <SelectValue placeholder="SELECT SIZE" />
                  </SelectTrigger>
                  <SelectContent>
                    {product.sizes.map((size) => (
                      <SelectItem key={size} value={size}>
                        {size}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Color Selection */}
            {product.colors.length > 0 && (
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-900 dark:text-white uppercase tracking-wider">
                  COLOR {product.colors.length > 1 && <span className="text-red-500">*</span>}
                </label>
                <Select value={selectedColor} onValueChange={setSelectedColor}>
                  <SelectTrigger className="w-full h-12" data-testid="select-color">
                    <SelectValue placeholder="SELECT COLOR" />
                  </SelectTrigger>
                  <SelectContent>
                    {product.colors.map((color) => (
                      <SelectItem key={color} value={color}>
                        {color}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Quantity */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-900 dark:text-white uppercase tracking-wider">
                QUANTITY
              </label>
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                  className="h-12 w-12"
                  data-testid="button-quantity-decrease"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="text-xl font-light w-12 text-center" data-testid="text-quantity">
                  {quantity}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                  className="h-12 w-12"
                  data-testid="button-quantity-increase"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <Button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="w-full h-14 text-lg font-light tracking-widest"
                size="lg"
                data-testid="button-add-to-cart"
              >
                <ShoppingBag className="mr-2 h-5 w-5" />
                {product.inStock ? 'ADD TO BAG' : 'OUT OF STOCK'}
              </Button>
              
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  onClick={() => setLiked(!liked)}
                  className="h-12 font-light tracking-widest"
                  size="lg"
                  data-testid="button-wishlist"
                >
                  <Heart className={`mr-2 h-4 w-4 ${liked ? 'fill-red-500 text-red-500' : ''}`} />
                  {liked ? 'SAVED' : 'SAVE'}
                </Button>
                
                {product.category?.slug === 'customized' ? (
                  <Button
                    variant="outline"
                    asChild
                    className="h-12 font-light tracking-widest"
                    size="lg"
                    data-testid="button-customize"
                  >
                    <Link href={`/customize/${product.slug}`}>
                      <Palette className="mr-2 h-4 w-4" />
                      CUSTOMIZE
                    </Link>
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    asChild
                    className="h-12 font-light tracking-widest"
                    size="lg"
                    data-testid="button-virtual-tryon"
                  >
                    <Link href={`/virtual-tryon/${product.slug}`}>
                      <Star className="mr-2 h-4 w-4" />
                      TRY ON
                    </Link>
                  </Button>
                )}
              </div>
            </div>

            <Separator />

            {/* Product Features */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white uppercase tracking-wider">
                BENEFITS
              </h3>
              <div className="space-y-3">
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <Truck className="mr-3 h-4 w-4" />
                  Free shipping on orders over $50
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <RotateCcw className="mr-3 h-4 w-4" />
                  30-day returns & exchanges
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <Star className="mr-3 h-4 w-4" />
                  Premium quality guarantee
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Recommendations Section */}
        <div className="mt-20">
          <h2 className="text-2xl font-extralight tracking-widest text-center text-gray-900 dark:text-white mb-12">
            YOU MAY BE INTERESTED IN
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="aspect-square bg-gray-100 dark:bg-gray-800 mb-3 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800"></div>
                </div>
                <h3 className="text-sm font-light tracking-wider text-gray-900 dark:text-white group-hover:underline">
                  RELATED PRODUCT {index + 1}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">$89.90</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}