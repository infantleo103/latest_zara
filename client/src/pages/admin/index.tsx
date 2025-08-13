import { Link } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart3, 
  Users, 
  ShoppingCart, 
  Package, 
  Settings,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  DollarSign,
  Eye,
  Edit
} from 'lucide-react';

import AdminHeader from '@/components/admin-header';

export default function AdminIndex() {
  // Mock data for quick stats (in production, fetch from API)
  const stats = {
    totalRevenue: 45231.89,
    totalOrders: 2350,
    totalCustomers: 1245,
    activeProducts: 573,
    pendingOrders: 12,
    processingOrders: 8,
    shippedOrders: 15,
    deliveredOrders: 45,
  };

  const recentActivity = [
    { id: 1, type: 'order', message: 'New order #ORD-001 received', time: '2 minutes ago', status: 'new' },
    { id: 2, type: 'product', message: 'Product "Custom Suit" updated', time: '15 minutes ago', status: 'updated' },
    { id: 3, type: 'customer', message: 'New customer registered: John Doe', time: '1 hour ago', status: 'new' },
    { id: 4, type: 'order', message: 'Order #ORD-002 shipped', time: '2 hours ago', status: 'shipped' },
    { id: 5, type: 'system', message: 'Daily backup completed', time: '3 hours ago', status: 'completed' },
  ];

  const quickActions = [
    { title: 'Add Product', description: 'Create a new product', icon: Package, href: '/admin/products', color: 'blue' },
    { title: 'View Orders', description: 'Manage customer orders', icon: ShoppingCart, href: '/admin/orders', color: 'green' },
    { title: 'Analytics', description: 'View store analytics', icon: BarChart3, href: '/admin/dashboard', color: 'purple' },
    { title: 'Settings', description: 'Configure store settings', icon: Settings, href: '/admin/settings', color: 'gray' },
  ];

  return (
    <>
      <AdminHeader />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Panel</h1>
            <p className="text-gray-600 dark:text-gray-400">Welcome back! Here's what's happening with your store.</p>
          </div>
          <Button asChild data-testid="button-view-dashboard">
            <Link href="/admin/dashboard">
              <BarChart3 className="w-4 h-4 mr-2" />
              View Full Dashboard
            </Link>
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card data-testid="card-revenue-overview">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${stats.totalRevenue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground flex items-center">
                <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                +20.1% from last month
              </p>
            </CardContent>
          </Card>

          <Card data-testid="card-orders-overview">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalOrders.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                {stats.pendingOrders} pending orders
              </p>
            </CardContent>
          </Card>

          <Card data-testid="card-customers-overview">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalCustomers.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                +8.3% from last month
              </p>
            </CardContent>
          </Card>

          <Card data-testid="card-products-overview">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Products</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeProducts}</div>
              <p className="text-xs text-muted-foreground">
                5 out of stock
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quick Actions */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common administrative tasks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {quickActions.map((action) => (
                <Button
                  key={action.title}
                  asChild
                  variant="outline"
                  className="w-full justify-start h-auto p-4"
                  data-testid={`button-quick-action-${action.title.toLowerCase().replace(' ', '-')}`}
                >
                  <Link href={action.href}>
                    <action.icon className="w-5 h-5 mr-3" />
                    <div className="text-left">
                      <div className="font-medium">{action.title}</div>
                      <div className="text-sm text-muted-foreground">{action.description}</div>
                    </div>
                  </Link>
                </Button>
              ))}
            </CardContent>
          </Card>

          {/* Order Status Summary */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Order Status</CardTitle>
              <CardDescription>Current order distribution</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-orange-500" />
                  <span className="text-sm">Pending</span>
                </div>
                <Badge variant="secondary" data-testid="badge-pending-count">
                  {stats.pendingOrders}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Edit className="w-4 h-4 text-blue-500" />
                  <span className="text-sm">Processing</span>
                </div>
                <Badge variant="default" data-testid="badge-processing-count">
                  {stats.processingOrders}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <ShoppingCart className="w-4 h-4 text-purple-500" />
                  <span className="text-sm">Shipped</span>
                </div>
                <Badge variant="outline" data-testid="badge-shipped-count">
                  {stats.shippedOrders}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Delivered</span>
                </div>
                <Badge variant="default" data-testid="badge-delivered-count">
                  {stats.deliveredOrders}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest store activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      {activity.status === 'new' && <AlertCircle className="w-4 h-4 text-blue-500" />}
                      {activity.status === 'updated' && <Edit className="w-4 h-4 text-orange-500" />}
                      {activity.status === 'shipped' && <ShoppingCart className="w-4 h-4 text-purple-500" />}
                      {activity.status === 'completed' && <CheckCircle className="w-4 h-4 text-green-500" />}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-gray-900 dark:text-white" data-testid={`text-activity-${activity.id}`}>
                        {activity.message}
                      </p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Navigation Links */}
        <Card>
          <CardHeader>
            <CardTitle>Administration Sections</CardTitle>
            <CardDescription>Access all administrative features</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button asChild variant="outline" className="h-20 flex-col" data-testid="button-nav-dashboard">
                <Link href="/admin/dashboard">
                  <BarChart3 className="w-6 h-6 mb-2" />
                  Analytics Dashboard
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-20 flex-col" data-testid="button-nav-products">
                <Link href="/admin/products">
                  <Package className="w-6 h-6 mb-2" />
                  Products
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-20 flex-col" data-testid="button-nav-orders">
                <Link href="/admin/orders">
                  <ShoppingCart className="w-6 h-6 mb-2" />
                  Orders
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-20 flex-col" data-testid="button-nav-settings">
                <Link href="/admin/settings">
                  <Settings className="w-6 h-6 mb-2" />
                  Settings
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
    </>
  );
}