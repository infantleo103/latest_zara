import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: 'Error',
        description: 'Please enter your email address.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate newsletter subscription
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: 'Success',
      description: 'Thank you for subscribing to our newsletter!',
    });
    
    setEmail('');
    setIsSubmitting(false);
  };

  return (
    <section className="py-16 bg-black text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-2xl font-light mb-4 tracking-wide" data-testid="text-newsletter-title">
          STAY UPDATED
        </h2>
        <p className="text-gray-300 mb-8 max-w-md mx-auto" data-testid="text-newsletter-description">
          Be the first to know about our new collections, exclusive offers, and fashion insights.
        </p>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="flex">
            <Input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-3 bg-transparent border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-white rounded-r-none"
              disabled={isSubmitting}
              data-testid="input-newsletter-email"
            />
            <Button
              type="submit"
              className="bg-white text-black px-6 py-3 hover:bg-gray-100 transition-colors rounded-l-none"
              disabled={isSubmitting}
              data-testid="button-newsletter-subscribe"
            >
              <ArrowRight size={16} />
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
