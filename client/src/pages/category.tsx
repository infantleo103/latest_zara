import { useParams } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ProductGrid from '@/components/product-grid';
import { Filter, Grid, LayoutGrid } from 'lucide-react';
import type { ProductWithCategory, Category } from '@shared/schema';

export default function CategoryPage() {
  const { slug } = useParams();
  const [sortBy, setSortBy] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);

  const { data: category, isLoading: categoryLoading } = useQuery({
    queryKey: ['/api/categories', slug],
  }) as { data: Category; isLoading: boolean };

  const { data: products = [], isLoading: productsLoading } = useQuery({
    queryKey: ['/api/products', { category: slug }],
  }) as { data: ProductWithCategory[]; isLoading: boolean };

  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return parseFloat(a.price) - parseFloat(b.price);
      case 'price-high':
        return parseFloat(b.price) - parseFloat(a.price);
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  if (categoryLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-48 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-32 mb-8"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-8" data-testid="nav-breadcrumb">
        <span>Home</span>
        <span className="mx-2">/</span>
        <span className="text-black font-medium">{category?.name}</span>
      </nav>

      {/* Category Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-light tracking-wide mb-4" data-testid="text-category-title">
          {category?.name}
        </h1>
        {category?.description && (
          <p className="text-gray-600 max-w-2xl" data-testid="text-category-description">
            {category.description}
          </p>
        )}
      </div>

      {/* Filters and Sort */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2"
            data-testid="button-toggle-filters"
          >
            <Filter size={16} />
            <span>Filters</span>
          </Button>
          <div className="text-sm text-gray-500" data-testid="text-product-count">
            {products.length} {products.length === 1 ? 'item' : 'items'}
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-40" data-testid="select-sort">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="name">Name</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex items-center space-x-1">
            <Button variant="ghost" size="sm" data-testid="button-grid-view">
              <Grid size={16} />
            </Button>
            <Button variant="ghost" size="sm" data-testid="button-list-view">
              <LayoutGrid size={16} />
            </Button>
          </div>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="bg-gray-50 p-6 rounded-lg mb-8" data-testid="panel-filters">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-medium mb-4">Size</h3>
              <div className="flex flex-wrap gap-2">
                {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                  <Button
                    key={size}
                    variant="outline"
                    size="sm"
                    className="text-xs"
                    data-testid={`filter-size-${size}`}
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-medium mb-4">Color</h3>
              <div className="flex flex-wrap gap-2">
                {['Black', 'White', 'Gray', 'Navy', 'Brown'].map((color) => (
                  <Button
                    key={color}
                    variant="outline"
                    size="sm"
                    className="text-xs"
                    data-testid={`filter-color-${color.toLowerCase()}`}
                  >
                    {color}
                  </Button>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-medium mb-4">Price Range</h3>
              <div className="space-y-2">
                {[
                  'Under ₹2,000',
                  '₹2,000 - ₹5,000',
                  '₹5,000 - ₹10,000',
                  'Over ₹10,000'
                ].map((range) => (
                  <Button
                    key={range}
                    variant="outline"
                    size="sm"
                    className="text-xs w-full justify-start"
                    data-testid={`filter-price-${range.replace(/\s+/g, '-').toLowerCase()}`}
                  >
                    {range}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Products Grid */}
      {productsLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 h-80 mb-4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <ProductGrid products={sortedProducts} />
      )}
    </div>
  );
}
