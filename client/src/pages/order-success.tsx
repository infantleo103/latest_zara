import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Package, Truck, Mail } from "lucide-react";

export default function OrderSuccess() {
  const [location] = useLocation();
  const [orderId] = useState(() => {
    const params = new URLSearchParams(location.split('?')[1] || '');
    return params.get('orderId') || 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase();
  });

  useEffect(() => {
    // Clear cart after successful order
    localStorage.removeItem('cart');
    // Dispatch cart update event
    window.dispatchEvent(new Event('cart-updated'));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-3xl font-extralight tracking-widest text-gray-900 dark:text-white mb-2">
            ORDER CONFIRMED
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Thank you for your purchase!
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="w-5 h-5" />
              Order Details
            </CardTitle>
            <CardDescription>
              Your order has been successfully placed and is being processed.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b">
              <span className="font-medium">Order Number:</span>
              <span className="text-primary font-mono" data-testid="text-order-id">{orderId}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <span className="font-medium">Estimated Delivery:</span>
              <span>3-5 business days</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="font-medium">Status:</span>
              <span className="text-green-600 font-medium">Confirmed</span>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="w-5 h-5" />
                Shipping Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <p>Your order will be shipped within 1-2 business days.</p>
                <p>You will receive a tracking number via email once your order ships.</p>
                <p>Estimated delivery: 3-5 business days</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="w-5 h-5" />
                What's Next?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <p>• You'll receive an order confirmation email shortly</p>
                <p>• We'll send shipping updates to your email</p>
                <p>• Track your package with the provided tracking number</p>
                <p>• Contact us if you have any questions</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild className="px-8" data-testid="button-continue-shopping">
            <Link href="/">
              CONTINUE SHOPPING
            </Link>
          </Button>
          <Button variant="outline" asChild className="px-8" data-testid="button-view-orders">
            <Link href="/orders">
              VIEW YOUR ORDERS
            </Link>
          </Button>
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Need help? Contact our customer service at{" "}
            <a href="mailto:support@zara.com" className="text-primary hover:underline">
              support@zara.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}