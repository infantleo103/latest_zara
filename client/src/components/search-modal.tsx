import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { Search, X } from 'lucide-react';
import { Link } from 'wouter';
import type { ProductWithCategory } from '@shared/schema';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');

  const { data: searchResults = [], isLoading } = useQuery({
    queryKey: ['/api/products/search', { q: query }],
    enabled: query.length > 2,
  }) as { data: ProductWithCategory[]; isLoading: boolean };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is handled by the query above
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden" data-testid="modal-search">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Search</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              data-testid="button-close-search"
            >
              <X size={20} />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSearch} className="space-y-4">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search for products..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pr-10"
              data-testid="input-search"
            />
            <Button
              type="submit"
              variant="ghost"
              size="sm"
              className="absolute right-2 top-1/2 -translate-y-1/2"
              data-testid="button-search"
            >
              <Search size={16} />
            </Button>
          </div>
        </form>

        <div className="mt-6 overflow-y-auto max-h-96">
          {query.length <= 2 ? (
            <p className="text-center text-gray-500 py-8" data-testid="text-search-instruction">
              Start typing to search for products...
            </p>
          ) : isLoading ? (
            <p className="text-center text-gray-500 py-8" data-testid="text-search-loading">
              Searching...
            </p>
          ) : searchResults.length === 0 ? (
            <p className="text-center text-gray-500 py-8" data-testid="text-search-no-results">
              No products found for "{query}"
            </p>
          ) : (
            <div className="space-y-4" data-testid="list-search-results">
              {searchResults.map((product) => (
                <Link
                  key={product.id}
                  href={`/product/${product.slug}`}
                  className="flex items-center space-x-4 p-2 hover:bg-gray-50 rounded-lg"
                  onClick={onClose}
                  data-testid={`link-search-result-${product.slug}`}
                >
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-16 h-16 object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-sm">{product.name}</h3>
                    <p className="text-sm text-gray-600">₹{product.price}</p>
                    {product.category && (
                      <p className="text-xs text-gray-400">{product.category.name}</p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
