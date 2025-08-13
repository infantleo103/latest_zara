import { useState } from 'react';
import { useStripe, Elements, PaymentElement, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCartStore } from '@/lib/cart';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'wouter';
import { ArrowLeft, CreditCard, Truck, Shield } from 'lucide-react';

// Stripe setup
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY || 'pk_test_placeholder');

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsProcessing(true);
    
    // Mock payment processing for demo
    setTimeout(() => {
      toast({
        title: "Payment Successful",
        description: "Your order has been confirmed!",
      });
      setIsProcessing(false);
    }, 2000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-light tracking-wide mb-4">Payment Details</h3>
        <div className="space-y-4">
          <PaymentElement />
        </div>
      </div>

      <Button
        type="submit"
        disabled={!stripe || isProcessing}
        className="w-full py-4 bg-black text-white font-light tracking-wide hover:bg-gray-800 transition-colors"
        data-testid="button-complete-payment"
      >
        {isProcessing ? 'Processing...' : 'Complete Payment'}
      </Button>
    </form>
  );
};

export default function Checkout() {
  const { items, getTotalPrice, clearCart } = useCartStore();
  const [shippingInfo, setShippingInfo] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    phone: ''
  });

  const total = getTotalPrice();
  const shipping = 200;
  const tax = total * 0.18; // 18% GST
  const finalTotal = total + shipping + tax;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-extralight tracking-[0.2em] mb-8">Your cart is empty</h1>
          <Link href="/">
            <Button className="bg-black text-white px-8 py-3 font-light tracking-wide">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button variant="ghost" size="sm" className="p-2">
                <ArrowLeft size={20} />
              </Button>
            </Link>
            <h1 className="text-2xl font-extralight tracking-[0.2em]">CHECKOUT</h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Forms */}
          <div className="space-y-8">
            {/* Shipping Information */}
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h2 className="text-xl font-light tracking-wide mb-6 flex items-center">
                <Truck size={20} className="mr-3" />
                Shipping Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name" className="text-sm font-light">Full Name</Label>
                  <Input
                    id="name"
                    value={shippingInfo.name}
                    onChange={(e) => setShippingInfo({...shippingInfo, name: e.target.value})}
                    className="mt-1"
                    data-testid="input-name"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-sm font-light">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={shippingInfo.email}
                    onChange={(e) => setShippingInfo({...shippingInfo, email: e.target.value})}
                    className="mt-1"
                    data-testid="input-email"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="address" className="text-sm font-light">Address</Label>
                  <Input
                    id="address"
                    value={shippingInfo.address}
                    onChange={(e) => setShippingInfo({...shippingInfo, address: e.target.value})}
                    className="mt-1"
                    data-testid="input-address"
                  />
                </div>
                <div>
                  <Label htmlFor="city" className="text-sm font-light">City</Label>
                  <Input
                    id="city"
                    value={shippingInfo.city}
                    onChange={(e) => setShippingInfo({...shippingInfo, city: e.target.value})}
                    className="mt-1"
                    data-testid="input-city"
                  />
                </div>
                <div>
                  <Label htmlFor="postal" className="text-sm font-light">Postal Code</Label>
                  <Input
                    id="postal"
                    value={shippingInfo.postalCode}
                    onChange={(e) => setShippingInfo({...shippingInfo, postalCode: e.target.value})}
                    className="mt-1"
                    data-testid="input-postal"
                  />
                </div>
              </div>
            </div>

            {/* Payment Section */}
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h2 className="text-xl font-light tracking-wide mb-6 flex items-center">
                <CreditCard size={20} className="mr-3" />
                Payment Method
              </h2>
              <Elements stripe={stripePromise}>
                <CheckoutForm />
              </Elements>
            </div>

            {/* Security Notice */}
            <div className="bg-green-50 p-6 rounded-lg flex items-start space-x-3">
              <Shield size={20} className="text-green-600 mt-1" />
              <div>
                <h3 className="font-medium text-green-800">Secure Payment</h3>
                <p className="text-sm text-green-700 mt-1">
                  Your payment information is encrypted and secure. We never store your card details.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="bg-white p-8 rounded-lg shadow-sm h-fit">
            <h2 className="text-xl font-light tracking-wide mb-6">Order Summary</h2>
            
            {/* Cart Items */}
            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div key={`${item.productId}-${item.size}-${item.color}`} className="flex items-center space-x-4">
                  <img
                    src={item.product.images?.[0] || 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100'}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="font-light">{item.product.name}</h3>
                    <p className="text-sm text-gray-600">
                      {item.size && `Size: ${item.size}`} {item.color && `Color: ${item.color}`}
                    </p>
                    <p className="text-sm">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-medium">₹{(parseFloat(item.product.price) * item.quantity).toLocaleString('en-IN')}</p>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{total.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>₹{shipping.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (GST 18%)</span>
                <span>₹{tax.toLocaleString('en-IN')}</span>
              </div>
              <div className="border-t pt-2 flex justify-between text-lg font-medium">
                <span>Total</span>
                <span>₹{finalTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="mt-6 text-sm text-gray-600">
              <p>• Free returns within 30 days</p>
              <p>• 2-year warranty included</p>
              <p>• Delivery in 3-5 business days</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}