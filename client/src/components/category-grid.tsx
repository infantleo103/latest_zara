import { Link } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import type { Category } from '@shared/schema';

export default function CategoryGrid() {
  const { data: categories = [], isLoading } = useQuery({
    queryKey: ['/api/categories'],
  }) as { data: Category[]; isLoading: boolean };

  if (isLoading) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 h-88 rounded-lg"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.slice(0, 3).map((category) => (
            <Link
              key={category.id}
              href={`/category/${category.slug}`}
              className="group cursor-pointer"
              data-testid={`link-category-${category.slug}`}
            >
              <div className="relative overflow-hidden">
                <img
                  src={category.imageUrl || 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1200'}
                  alt={`${category.name} Fashion`}
                  className="w-full h-96 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
                <div className="absolute bottom-0 left-0 right-0 category-overlay">
                  <div className="p-6 text-white">
                    <h2 className="text-2xl font-light tracking-wide text-shadow" data-testid={`text-category-name-${category.slug}`}>
                      {category.name}
                    </h2>
                    <p className="text-sm mt-2 opacity-90 text-shadow" data-testid={`text-category-description-${category.slug}`}>
                      New Collection
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
