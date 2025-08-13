import { useParams } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Heart, Minus, Plus, ShoppingBag, Truck, RotateCcw } from 'lucide-react';
import { useCartStore } from '@/lib/cart';
import { useToast } from '@/hooks/use-toast';
import type { ProductWithCategory } from '@shared/schema';

export default function ProductPage() {
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
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="animate-pulse">
            <div className="bg-gray-200 aspect-square rounded-lg mb-4"></div>
            <div className="grid grid-cols-4 gap-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="bg-gray-200 aspect-square rounded"></div>
              ))}
            </div>
          </div>
          <div className="space-y-6 animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
            <div className="h-6 bg-gray-200 rounded w-1/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-center text-gray-500">Product not found.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-8" data-testid="nav-breadcrumb">
        <span>Home</span>
        <span className="mx-2">/</span>
        {product.category && (
          <>
            <span>{product.category.name}</span>
            <span className="mx-2">/</span>
          </>
        )}
        <span className="text-black font-medium">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square bg-gray-50 overflow-hidden rounded-lg">
            <img
              src={product.images?.[selectedImage] || product.images?.[0] || 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800'}
              alt={product.name}
              className="w-full h-full object-cover cursor-zoom-in"
              data-testid="img-product-main"
            />
          </div>
          
          {product.images && product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2" data-testid="grid-product-thumbnails">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square bg-gray-50 overflow-hidden rounded border-2 ${
                    selectedImage === index ? 'border-black' : 'border-transparent'
                  }`}
                  data-testid={`button-thumbnail-${index}`}
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
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-light mb-4 tracking-wide" data-testid="text-product-name">
              {product.name}
            </h1>
            <p className="text-2xl font-medium" data-testid="text-product-price">
              ₹{parseFloat(product.price).toLocaleString('en-IN', {
                minimumFractionDigits: 2,
              })}
            </p>
          </div>

          {product.description && (
            <p className="text-gray-600 leading-relaxed" data-testid="text-product-description">
              {product.description}
            </p>
          )}

          {/* Size Selection */}
          {product.sizes.length > 1 && (
            <div>
              <h3 className="text-sm font-medium mb-3" data-testid="text-size-label">Size</h3>
              <Select value={selectedSize} onValueChange={setSelectedSize}>
                <SelectTrigger className="w-full" data-testid="select-size">
                  <SelectValue placeholder="Select size" />
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
          {product.colors.length > 1 && (
            <div>
              <h3 className="text-sm font-medium mb-3" data-testid="text-color-label">Color</h3>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <Button
                    key={color}
                    variant={selectedColor === color ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedColor(color)}
                    data-testid={`button-color-${color.toLowerCase()}`}
                  >
                    {color}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div>
            <h3 className="text-sm font-medium mb-3" data-testid="text-quantity-label">Quantity</h3>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
                data-testid="button-decrease-quantity"
              >
                <Minus size={16} />
              </Button>
              <span className="w-12 text-center" data-testid="text-quantity">
                {quantity}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setQuantity(quantity + 1)}
                data-testid="button-increase-quantity"
              >
                <Plus size={16} />
              </Button>
            </div>
          </div>

          {/* Add to Cart */}
          <div className="space-y-3">
            <Button
              className="w-full bg-black text-white hover:bg-gray-800 py-3"
              onClick={handleAddToCart}
              disabled={!product.inStock}
              data-testid="button-add-to-cart"
            >
              <ShoppingBag size={16} className="mr-2" />
              {product.inStock ? 'ADD TO CART' : 'OUT OF STOCK'}
            </Button>
            
            <Button
              variant="outline"
              className="w-full"
              onClick={() => setLiked(!liked)}
              data-testid="button-add-to-wishlist"
            >
              <Heart
                size={16}
                className={`mr-2 ${liked ? 'fill-red-500 text-red-500' : ''}`}
              />
              {liked ? 'ADDED TO WISHLIST' : 'ADD TO WISHLIST'}
            </Button>
          </div>

          {/* Stock Status */}
          {product.inStock && (
            <Badge variant="outline" className="text-green-600 border-green-200" data-testid="badge-in-stock">
              In Stock
            </Badge>
          )}

          {/* Additional Info */}
          <div className="space-y-4 pt-6 border-t border-gray-100">
            <div className="flex items-center space-x-3 text-sm text-gray-600">
              <Truck size={16} />
              <span>Free delivery on orders over ₹2,990</span>
            </div>
            <div className="flex items-center space-x-3 text-sm text-gray-600">
              <RotateCcw size={16} />
              <span>30-day return policy</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
