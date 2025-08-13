import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Home, 
  BarChart3, 
  Package, 
  ShoppingCart, 
  Settings, 
  Bell,
  User,
  LogOut
} from 'lucide-react';

export default function AdminHeader() {
  const [location] = useLocation();

  const navItems = [
    { href: '/admin', label: 'Overview', icon: Home },
    { href: '/admin/dashboard', label: 'Analytics', icon: BarChart3 },
    { href: '/admin/products', label: 'Products', icon: Package },
    { href: '/admin/orders', label: 'Orders', icon: ShoppingCart },
    { href: '/admin/settings', label: 'Settings', icon: Settings },
  ];

  const isActive = (href: string) => {
    if (href === '/admin') {
      return location === href;
    }
    return location.startsWith(href);
  };

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Navigation */}
          <div className="flex items-center space-x-8">
            <Link href="/admin" className="flex items-center space-x-2" data-testid="link-admin-home">
              <div className="w-8 h-8 bg-black dark:bg-white rounded-lg flex items-center justify-center">
                <span className="text-white dark:text-black font-bold text-sm">Z</span>
              </div>
              <span className="font-bold text-xl text-gray-900 dark:text-white">Admin</span>
            </Link>

            <nav className="hidden md:flex space-x-1">
              {navItems.map((item) => (
                <Button
                  key={item.href}
                  asChild
                  variant={isActive(item.href) ? 'default' : 'ghost'}
                  size="sm"
                  data-testid={`nav-${item.label.toLowerCase()}`}
                >
                  <Link href={item.href}>
                    <item.icon className="w-4 h-4 mr-2" />
                    {item.label}
                  </Link>
                </Button>
              ))}
            </nav>
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" data-testid="button-notifications">
              <Bell className="w-4 h-4" />
              <Badge variant="destructive" className="ml-1 px-1 min-w-[1.25rem] h-5">
                3
              </Badge>
            </Button>

            <Button variant="ghost" size="sm" data-testid="button-admin-profile">
              <User className="w-4 h-4 mr-2" />
              Admin
            </Button>

            <Button asChild variant="outline" size="sm" data-testid="button-back-to-store">
              <Link href="/">
                <Home className="w-4 h-4 mr-2" />
                Back to Store
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}