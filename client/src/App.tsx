import { Switch, Route } from "wouter";
import { useState } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Category from "@/pages/category";
import Product from "@/pages/product-new";
import Checkout from "@/pages/checkout";
import Header from "@/components/header";
import Footer from "@/components/footer";
import SearchModal from "@/components/search-modal";
import CartModal from "@/components/cart-modal";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/category/:slug" component={Category} />
      <Route path="/product/:slug" component={Product} />
      <Route path="/checkout" component={Checkout} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-white">
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
    </QueryClientProvider>
  );
}

export default App;
