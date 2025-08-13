import { Button } from '@/components/ui/button';
import { Link } from 'wouter';

export default function HeroSection() {
  return (
    <section className="relative">
      <div className="relative h-screen bg-cover bg-center bg-no-repeat"
           style={{
             backgroundImage: `url('https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&h=1200')`
           }}>
        <div className="absolute inset-0 hero-gradient"></div>
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-6xl md:text-8xl font-light tracking-widest mb-8 text-shadow" data-testid="text-hero-title">
              THE NEW
            </h1>
            <Button
              asChild
              className="bg-white text-black px-8 py-3 text-sm font-medium tracking-wide hover:bg-gray-100 transition-colors"
              data-testid="button-view-all"
            >
              <Link href="/category/woman">VIEW ALL</Link>
            </Button>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
          <span className="text-sm text-shadow" data-testid="text-scroll-down">Scroll down</span>
        </div>
      </div>
    </section>
  );
}
