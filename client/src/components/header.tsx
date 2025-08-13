import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Search, User, ShoppingBag, Menu, X, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/lib/cart';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';

interface HeaderProps {
  onSearchOpen: () => void;
}

export default function Header({ onSearchOpen }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location, setLocation] = useLocation();
  const { openCart, getTotalItems } = useCartStore();
  const { user, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: 'WOMAN', href: '/category/woman' },
    { name: 'MAN', href: '/category/man' },
    { name: 'KIDS', href: '/category/kids' },
    { name: 'HOME', href: '/category/home' },
    { name: 'SALE', href: '/category/sale' },
  ];

  const totalItems = getTotalItems();

  return (
    <>
      {/* Floating Header */}
      <header className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled 
          ? "bg-white/95 backdrop-blur-md shadow-sm" 
          : "bg-transparent"
      )}>
        {/* Top Bar - only show when scrolled */}
        {scrolled && (
          <div className="hidden md:block bg-black text-white text-xs py-1">
            <div className="container mx-auto px-6 text-center">
              FREE DELIVERY ON ORDERS OVER ₹2,990
            </div>
          </div>
        )}

        {/* Main Navigation */}
        <nav className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "md:hidden hover:bg-transparent",
              scrolled ? "text-black hover:text-gray-600" : "text-white hover:text-gray-200"
            )}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="button-toggle-mobile-menu"
          >
            {mobileMenuOpen ? (
              <X size={20} className={scrolled ? "" : "text-shadow"} />
            ) : (
              <Menu size={20} className={scrolled ? "" : "text-shadow"} />
            )}
          </Button>

          {/* Logo */}
          <div className={cn(
            "font-light tracking-[0.3em] transition-all duration-300",
            scrolled 
              ? "text-3xl md:text-4xl text-black" 
              : "text-4xl md:text-6xl text-white text-shadow"
          )}>
            <Link href="/" data-testid="link-home">
              Xillusions
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className={cn(
            "hidden md:flex space-x-8 text-sm font-light tracking-wide transition-colors",
            scrolled ? "text-black" : "text-white"
          )}>
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'hover:opacity-70 transition-all duration-200',
                  location === item.href && 'font-normal border-b',
                  scrolled 
                    ? 'hover:text-gray-600 border-black' 
                    : 'hover:text-gray-200 border-white text-shadow'
                )}
                data-testid={`link-${item.name.toLowerCase()}`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Action Icons */}
          <div className={cn(
            "flex items-center space-x-4 text-lg transition-colors",
            scrolled ? "text-black" : "text-white"
          )}>
            <Button
              variant="ghost"
              size="sm"
              onClick={onSearchOpen}
              className={cn(
                "hover:bg-transparent",
                scrolled ? "hover:text-gray-600" : "hover:text-gray-200"
              )}
              data-testid="button-open-search"
            >
              <Search size={20} className={scrolled ? "" : "text-shadow"} />
            </Button>
            {isAuthenticated ? (
              <div className="flex items-center space-x-2">
                <span className={cn(
                  "text-sm font-light hidden sm:block",
                  scrolled ? "text-gray-700" : "text-white"
                )}>
                  {user?.firstName || user?.email?.split('@')[0]}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={logout}
                  className={cn(
                    "hover:bg-transparent",
                    scrolled ? "hover:text-gray-600" : "hover:text-gray-200"
                  )}
                  data-testid="button-logout"
                >
                  <LogOut size={16} className={scrolled ? "" : "text-shadow"} />
                </Button>
              </div>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setLocation('/login')}
                className={cn(
                  "hover:bg-transparent",
                  scrolled ? "hover:text-gray-600" : "hover:text-gray-200"
                )}
                data-testid="button-open-account"
              >
                <User size={20} className={scrolled ? "" : "text-shadow"} />
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "relative hover:bg-transparent",
                scrolled ? "hover:text-gray-600" : "hover:text-gray-200"
              )}
              onClick={openCart}
              data-testid="button-open-cart"
            >
              <ShoppingBag size={20} className={scrolled ? "" : "text-shadow"} />
              {totalItems > 0 && (
                <span
                  className={cn(
                    "absolute -top-2 -right-2 text-xs rounded-full w-5 h-5 flex items-center justify-center",
                    scrolled 
                      ? "bg-black text-white" 
                      : "bg-white text-black"
                  )}
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
          <div className="md:hidden mt-4 bg-white/95 backdrop-blur-md">
            <div className="flex flex-col space-y-4 text-center py-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="py-2 text-black font-light tracking-wide hover:opacity-70 transition-opacity"
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
    </>
  );
}
