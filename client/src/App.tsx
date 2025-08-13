import { Switch, Route } from "wouter";
import { useState, createContext } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Category from "@/pages/category";
import ProductDetail from "@/pages/product-detail";
import Checkout from "@/pages/checkout";
import Payment from "@/pages/payment";
import OrderSuccess from "@/pages/order-success";
import Login from "@/pages/login";
import Signup from "@/pages/signup";
import VirtualTryOn from "@/pages/virtual-tryon";
import Customization from "@/pages/customization";
import Header from "@/components/header";
import Footer from "@/components/footer";
import SearchModal from "@/components/search-modal";
import CartModal from "@/components/cart-modal";
import { AuthContext, useAuthState } from "@/hooks/useAuth";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/category/:slug" component={Category} />
      <Route path="/product/:slug" component={ProductDetail} />
      <Route path="/checkout" component={Checkout} />
      <Route path="/payment" component={Payment} />
      <Route path="/order-success" component={OrderSuccess} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/virtual-tryon/:slug" component={VirtualTryOn} />
      <Route path="/customize/:slug" component={Customization} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [searchOpen, setSearchOpen] = useState(false);
  const authState = useAuthState();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContext.Provider value={authState}>
        <TooltipProvider>
          <div className="min-h-screen bg-white dark:bg-gray-900">
            <Header onSearchOpen={() => setSearchOpen(true)} />
            <main>
              <Router />
            </main>
            <Footer />
            <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
            <CartModal />
            <Toaster />
          </div>
        </TooltipProvider>
      </AuthContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
