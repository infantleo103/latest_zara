import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Search, User, ShoppingBag, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/lib/cart';
import { cn } from '@/lib/utils';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [location] = useLocation();
  const { openCart, getTotalItems } = useCartStore();

  const navigation = [
    { name: 'WOMAN', href: '/category/woman' },
    { name: 'MAN', href: '/category/man' },
    { name: 'KIDS', href: '/category/kids' },
    { name: 'HOME', href: '/category/home' },
    { name: 'SALE', href: '/category/sale' },
  ];

  const totalItems = getTotalItems();

  return (
    <header className="sticky top-0 bg-white z-50 border-b border-gray-100">
      {/* Top Bar */}
      <div className="hidden md:block bg-black text-white text-xs py-2">
        <div className="container mx-auto px-4 text-center">
          FREE DELIVERY ON ORDERS OVER ₹2,990
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="button-toggle-mobile-menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>

          {/* Logo */}
          <div className="text-2xl md:text-3xl font-bold tracking-widest">
            <Link href="/" data-testid="link-home">
              ZARA
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8 text-sm font-medium">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'hover:text-gray-600 transition-colors',
                  location === item.href && 'font-semibold'
                )}
                data-testid={`link-${item.name.toLowerCase()}`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Action Icons */}
          <div className="flex items-center space-x-4 text-lg">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSearchOpen(true)}
              data-testid="button-open-search"
            >
              <Search size={20} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              data-testid="button-open-account"
            >
              <User size={20} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="relative"
              onClick={openCart}
              data-testid="button-open-cart"
            >
              <ShoppingBag size={20} />
              {totalItems > 0 && (
                <span
                  className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                  data-testid="text-cart-count"
                >
                  {totalItems}
                </span>
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4">
            <div className="flex flex-col space-y-4 text-center">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="py-2 border-b border-gray-100 last:border-b-0"
                  onClick={() => setMobileMenuOpen(false)}
                  data-testid={`link-mobile-${item.name.toLowerCase()}`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
