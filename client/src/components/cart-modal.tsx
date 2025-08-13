import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/lib/cart';
import { Trash2, Plus, Minus } from 'lucide-react';
import { Link } from 'wouter';

export default function CartModal() {
  const {
    items,
    isOpen,
    closeCart,
    removeItem,
    updateQuantity,
    getTotalPrice,
    getTotalItems,
  } = useCartStore();

  const totalPrice = getTotalPrice();
  const totalItems = getTotalItems();

  return (
    <Sheet open={isOpen} onOpenChange={closeCart}>
      <SheetContent className="w-full sm:max-w-md" data-testid="modal-cart">
        <SheetHeader className="border-b border-gray-200 pb-4">
          <SheetTitle className="flex items-center justify-between">
            <span className="text-xl font-extralight tracking-[0.1em] uppercase">Shopping Bag</span>
            <span className="text-xs text-gray-600 font-light tracking-wide" data-testid="text-cart-item-count">
              ({totalItems})
            </span>
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64" data-testid="text-cart-empty">
            <p className="text-gray-500 mb-6 font-light tracking-wide">Your bag is empty</p>
            <Button onClick={closeCart} variant="outline" className="font-light tracking-wide" data-testid="button-continue-shopping">
              Continue Shopping
            </Button>
          </div>
        ) : (
          <div className="flex flex-col h-full">
            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto py-4 space-y-4" data-testid="list-cart-items">
              {items.map((item) => (
                <div key={item.id} className="flex space-x-4 p-2 border-b border-gray-100">
                  <Link
                    href={`/product/${item.product?.slug || ''}`}
                    onClick={closeCart}
                    data-testid={`link-cart-product-${item.product?.slug || item.id}`}
                  >
                    <img
                      src={item.product?.images?.[0] || 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100'}
                      alt={item.product?.name || 'Product'}
                      className="w-20 h-24 object-cover"
                    />
                  </Link>
                  <div className="flex-1 space-y-2">
                    <Link
                      href={`/product/${item.product?.slug || ''}`}
                      onClick={closeCart}
                      className="block"
                      data-testid={`link-cart-product-name-${item.product?.slug || item.id}`}
                    >
                      <h3 className="font-light text-sm hover:underline tracking-wide">
                        {item.product?.name || 'Product'}
                      </h3>
                    </Link>
                    {item.size && (
                      <p className="text-sm text-gray-600" data-testid={`text-cart-size-${item.id}`}>
                        Size: {item.size}
                      </p>
                    )}
                    {item.color && (
                      <p className="text-sm text-gray-600" data-testid={`text-cart-color-${item.id}`}>
                        Color: {item.color}
                      </p>
                    )}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                          disabled={item.quantity <= 1}
                          data-testid={`button-decrease-quantity-${item.id}`}
                        >
                          <Minus size={12} />
                        </Button>
                        <span className="text-sm w-8 text-center" data-testid={`text-quantity-${item.id}`}>
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          data-testid={`button-increase-quantity-${item.id}`}
                        >
                          <Plus size={12} />
                        </Button>
                      </div>
                      <p className="text-sm font-medium" data-testid={`text-cart-price-${item.id}`}>
                        ₹{(parseFloat(item.product?.price || '0') * item.quantity).toLocaleString('en-IN', {
                          minimumFractionDigits: 2,
                        })}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeItem(item.id)}
                    className="text-gray-400 hover:text-red-500"
                    data-testid={`button-remove-item-${item.id}`}
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              ))}
            </div>

            {/* Cart Total */}
            <div className="border-t border-gray-200 pt-6 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-light tracking-wide">Total</span>
                <span className="text-lg font-light" data-testid="text-cart-total">
                  ₹{totalPrice.toLocaleString('en-IN', {
                    minimumFractionDigits: 2,
                  })}
                </span>
              </div>
              <Link href="/checkout" onClick={closeCart}>
                <Button
                  className="w-full py-4 bg-black text-white font-light tracking-[0.1em] text-xs uppercase hover:bg-gray-800 transition-colors"
                  data-testid="button-checkout"
                >
                  Proceed to Checkout
                </Button>
              </Link>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
