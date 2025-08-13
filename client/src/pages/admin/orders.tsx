import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Truck, 
  Package, 
  CheckCircle, 
  XCircle,
  Calendar,
  DollarSign,
  MapPin,
  User,
  Phone,
  Mail
} from 'lucide-react';

// Mock orders data (in production, fetch from API)
const mockOrders = [
  {
    id: 'ORD-001',
    customerId: 'CUST-001',
    customerName: 'John Doe',
    customerEmail: 'john@example.com',
    customerPhone: '+1 555-0123',
    status: 'shipped',
    totalAmount: 299.99,
    shippingAddress: '123 Main St, New York, NY 10001',
    orderDate: '2025-08-13T10:30:00Z',
    shippedDate: '2025-08-13T15:30:00Z',
    items: [
      { id: 1, productName: 'Custom Tailored Suit', quantity: 1, price: 299.99 }
    ]
  },
  {
    id: 'ORD-002',
    customerId: 'CUST-002',
    customerName: 'Jane Smith',
    customerEmail: 'jane@example.com',
    customerPhone: '+1 555-0124',
    status: 'processing',
    totalAmount: 449.99,
    shippingAddress: '456 Oak Ave, Los Angeles, CA 90210',
    orderDate: '2025-08-13T09:15:00Z',
    items: [
      { id: 2, productName: 'Evening Dress', quantity: 1, price: 399.99 },
      { id: 3, productName: 'Silk Scarf', quantity: 1, price: 50.00 }
    ]
  },
  {
    id: 'ORD-003',
    customerId: 'CUST-003',
    customerName: 'Mike Johnson',
    customerEmail: 'mike@example.com',
    customerPhone: '+1 555-0125',
    status: 'delivered',
    totalAmount: 199.99,
    shippingAddress: '789 Pine St, Chicago, IL 60601',
    orderDate: '2025-08-12T14:20:00Z',
    shippedDate: '2025-08-12T18:00:00Z',
    deliveredDate: '2025-08-13T12:00:00Z',
    items: [
      { id: 4, productName: 'Leather Jacket', quantity: 1, price: 199.99 }
    ]
  },
  {
    id: 'ORD-004',
    customerId: 'CUST-004',
    customerName: 'Sarah Wilson',
    customerEmail: 'sarah@example.com',
    customerPhone: '+1 555-0126',
    status: 'pending',
    totalAmount: 599.99,
    shippingAddress: '321 Elm St, Miami, FL 33101',
    orderDate: '2025-08-12T16:45:00Z',
    items: [
      { id: 5, productName: 'Custom Wedding Dress', quantity: 1, price: 599.99 }
    ]
  }
];

import AdminHeader from '@/components/admin-header';

export default function AdminOrders() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Mock query - in production, replace with actual API call
  const { data: orders, isLoading } = useQuery({
    queryKey: ['/api/admin/orders'],
    queryFn: () => Promise.resolve(mockOrders),
  });

  const updateOrderStatus = useMutation({
    mutationFn: async ({ orderId, status }: { orderId: string; status: string }) => {
      // Mock API call - replace with actual endpoint
      await new Promise(resolve => setTimeout(resolve, 1000));
      return { success: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/orders'] });
      toast({ title: 'Order status updated successfully' });
    },
    onError: () => {
      toast({ title: 'Failed to update order status', variant: 'destructive' });
    },
  });

  const filteredOrders = orders?.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.customerEmail.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  }) || [];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'warning';
      case 'processing': return 'default';
      case 'shipped': return 'secondary';
      case 'delivered': return 'success';
      case 'cancelled': return 'destructive';
      default: return 'outline';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Package className="w-4 h-4" />;
      case 'processing': return <Edit className="w-4 h-4" />;
      case 'shipped': return <Truck className="w-4 h-4" />;
      case 'delivered': return <CheckCircle className="w-4 h-4" />;
      case 'cancelled': return <XCircle className="w-4 h-4" />;
      default: return <Package className="w-4 h-4" />;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <>
      <AdminHeader />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Order Management</h1>
            <p className="text-gray-600 dark:text-gray-400">Track and manage customer orders</p>
          </div>
        </div>

        {/* Order Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card data-testid="card-pending-orders">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {orders?.filter(o => o.status === 'pending').length || 0}
              </div>
            </CardContent>
          </Card>

          <Card data-testid="card-processing-orders">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Processing</CardTitle>
              <Edit className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {orders?.filter(o => o.status === 'processing').length || 0}
              </div>
            </CardContent>
          </Card>

          <Card data-testid="card-shipped-orders">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Shipped</CardTitle>
              <Truck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {orders?.filter(o => o.status === 'shipped').length || 0}
              </div>
            </CardContent>
          </Card>

          <Card data-testid="card-delivered-orders">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Delivered</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {orders?.filter(o => o.status === 'delivered').length || 0}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search by order ID, customer name, or email..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                    data-testid="input-search-orders"
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-48" data-testid="select-filter-status">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="shipped">Shipped</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Orders Table */}
        <Card>
          <CardHeader>
            <CardTitle>Orders</CardTitle>
            <CardDescription>
              {filteredOrders.length} orders found
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredOrders.map((order) => (
                <div 
                  key={order.id} 
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  data-testid={`row-order-${order.id}`}
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(order.status)}
                      <div>
                        <p className="font-medium" data-testid={`text-order-id-${order.id}`}>{order.id}</p>
                        <p className="text-sm text-muted-foreground">{order.customerName}</p>
                      </div>
                    </div>
                    <div className="hidden md:block">
                      <p className="text-sm">{order.customerEmail}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(order.orderDate).toLocaleDateString()}
                      </p>
                    </div>
                    <Badge 
                      variant={getStatusColor(order.status) as any}
                      data-testid={`badge-order-status-${order.id}`}
                    >
                      {order.status}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="text-right hidden sm:block">
                      <p className="font-bold" data-testid={`text-order-amount-${order.id}`}>
                        ${order.totalAmount.toFixed(2)}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                      </p>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => setSelectedOrder(order)}
                        data-testid={`button-view-order-${order.id}`}
                      >
                        <Eye className="w-3 h-3" />
                      </Button>
                      
                      <Select 
                        value={order.status} 
                        onValueChange={(status) => updateOrderStatus.mutate({ orderId: order.id, status })}
                      >
                        <SelectTrigger className="w-32" data-testid={`select-order-status-${order.id}`}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="processing">Processing</SelectItem>
                          <SelectItem value="shipped">Shipped</SelectItem>
                          <SelectItem value="delivered">Delivered</SelectItem>
                          <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Order Details Dialog */}
        {selectedOrder && (
          <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Order Details - {selectedOrder.id}</DialogTitle>
                <DialogDescription>
                  Complete order information and customer details
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-6">
                {/* Customer Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center">
                        <User className="w-5 h-5 mr-2" />
                        Customer Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4 text-muted-foreground" />
                        <span>{selectedOrder.customerName}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Mail className="w-4 h-4 text-muted-foreground" />
                        <span>{selectedOrder.customerEmail}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4 text-muted-foreground" />
                        <span>{selectedOrder.customerPhone}</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <MapPin className="w-4 h-4 text-muted-foreground mt-1" />
                        <span>{selectedOrder.shippingAddress}</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center">
                        <Package className="w-5 h-5 mr-2" />
                        Order Status
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span>Current Status:</span>
                        <Badge variant={getStatusColor(selectedOrder.status) as any}>
                          {selectedOrder.status}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Order Date:</span>
                        <span>{new Date(selectedOrder.orderDate).toLocaleString()}</span>
                      </div>
                      {selectedOrder.shippedDate && (
                        <div className="flex items-center justify-between">
                          <span>Shipped Date:</span>
                          <span>{new Date(selectedOrder.shippedDate).toLocaleString()}</span>
                        </div>
                      )}
                      {selectedOrder.deliveredDate && (
                        <div className="flex items-center justify-between">
                          <span>Delivered Date:</span>
                          <span>{new Date(selectedOrder.deliveredDate).toLocaleString()}</span>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>

                {/* Order Items */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Order Items</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {selectedOrder.items.map((item: any) => (
                        <div key={item.id} className="flex items-center justify-between p-3 border rounded">
                          <div>
                            <p className="font-medium">{item.productName}</p>
                            <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                          </div>
                          <p className="font-bold">${item.price.toFixed(2)}</p>
                        </div>
                      ))}
                      <div className="border-t pt-3 flex justify-between items-center">
                        <span className="text-lg font-semibold">Total:</span>
                        <span className="text-xl font-bold">${selectedOrder.totalAmount.toFixed(2)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </DialogContent>
          </Dialog>
        )}

        {/* Empty State */}
        {filteredOrders.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No orders found</h3>
              <p className="text-gray-600 dark:text-gray-400">
                {searchQuery || statusFilter !== 'all' 
                  ? 'Try adjusting your search or filter criteria' 
                  : 'No orders have been placed yet'}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
    </>
  );
}