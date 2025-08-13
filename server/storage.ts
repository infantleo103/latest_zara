import { type Product, type Category, type CartItem, type InsertProduct, type InsertCategory, type InsertCartItem, type ProductWithCategory, type CartItemWithProduct } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Categories
  getCategories(): Promise<Category[]>;
  getCategoryBySlug(slug: string): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;

  // Products
  getProducts(categorySlug?: string, featured?: boolean): Promise<ProductWithCategory[]>;
  getProductBySlug(slug: string): Promise<ProductWithCategory | undefined>;
  getProductById(id: string): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  searchProducts(query: string): Promise<ProductWithCategory[]>;

  // Cart
  getCartItems(sessionId: string): Promise<CartItemWithProduct[]>;
  addCartItem(item: InsertCartItem): Promise<CartItem>;
  updateCartItem(id: string, quantity: number): Promise<CartItem | undefined>;
  removeCartItem(id: string): Promise<void>;
  clearCart(sessionId: string): Promise<void>;
}

export class MemStorage implements IStorage {
  private categories: Map<string, Category>;
  private products: Map<string, Product>;
  private cartItems: Map<string, CartItem>;

  constructor() {
    this.categories = new Map();
    this.products = new Map();
    this.cartItems = new Map();
    this.seedData();
  }

  private seedData() {
    // Seed categories
    const womenCategory: Category = {
      id: randomUUID(),
      name: "WOMAN",
      slug: "woman",
      description: "Women's fashion collection",
      imageUrl: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1000"
    };

    const menCategory: Category = {
      id: randomUUID(),
      name: "MAN",
      slug: "man",
      description: "Men's fashion collection",
      imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1000"
    };

    const kidsCategory: Category = {
      id: randomUUID(),
      name: "KIDS",
      slug: "kids",
      description: "Children's fashion collection",
      imageUrl: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1000"
    };

    const homeCategory: Category = {
      id: randomUUID(),
      name: "HOME",
      slug: "home",
      description: "Home decor and accessories",
      imageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1000"
    };

    [womenCategory, menCategory, kidsCategory, homeCategory].forEach(category => {
      this.categories.set(category.id, category);
    });

    // Seed products
    const sampleProducts: Omit<Product, 'id' | 'createdAt'>[] = [
      {
        name: "WOOL BLEND COAT",
        slug: "wool-blend-coat",
        description: "Elegant wool blend coat with minimalist design",
        price: "12990.00",
        categoryId: womenCategory.id,
        images: ["https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=800"],
        sizes: ["XS", "S", "M", "L", "XL"],
        colors: ["Black", "Camel", "Navy"],
        inStock: true,
        featured: true
      },
      {
        name: "LEATHER HANDBAG",
        slug: "leather-handbag",
        description: "Premium leather handbag with sophisticated styling",
        price: "8990.00",
        categoryId: womenCategory.id,
        images: ["https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=800"],
        sizes: ["One Size"],
        colors: ["Black", "Brown", "Tan"],
        inStock: true,
        featured: true
      },
      {
        name: "COTTON POPLIN SHIRT",
        slug: "cotton-poplin-shirt",
        description: "Classic white cotton shirt with clean lines",
        price: "3990.00",
        categoryId: womenCategory.id,
        images: ["https://images.unsplash.com/photo-1594633313593-bab3825d0caf?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=800"],
        sizes: ["XS", "S", "M", "L", "XL"],
        colors: ["White", "Light Blue"],
        inStock: true,
        featured: true
      },
      {
        name: "STATEMENT NECKLACE",
        slug: "statement-necklace",
        description: "Bold statement necklace for elegant occasions",
        price: "2990.00",
        categoryId: womenCategory.id,
        images: ["https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=800"],
        sizes: ["One Size"],
        colors: ["Gold", "Silver"],
        inStock: true,
        featured: true
      },
      {
        name: "TAILORED BLAZER",
        slug: "tailored-blazer",
        description: "Professional blazer with perfect fit",
        price: "9990.00",
        categoryId: womenCategory.id,
        images: ["https://images.unsplash.com/photo-1544441892-794166f1e3be?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=800"],
        sizes: ["XS", "S", "M", "L", "XL"],
        colors: ["Black", "Navy", "Charcoal"],
        inStock: true,
        featured: true
      },
      {
        name: "OVERSIZED SUNGLASSES",
        slug: "oversized-sunglasses",
        description: "Designer sunglasses with UV protection",
        price: "3590.00",
        categoryId: womenCategory.id,
        images: ["https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=800"],
        sizes: ["One Size"],
        colors: ["Black", "Tortoise"],
        inStock: true,
        featured: true
      },
      {
        name: "PRINTED SILK SCARF",
        slug: "printed-silk-scarf",
        description: "Luxurious silk scarf with artistic print",
        price: "4990.00",
        categoryId: womenCategory.id,
        images: ["https://images.unsplash.com/photo-1601924994987-69e26d50dc26?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=800"],
        sizes: ["One Size"],
        colors: ["Multicolor"],
        inStock: true,
        featured: true
      },
      {
        name: "LEATHER OXFORD SHOES",
        slug: "leather-oxford-shoes",
        description: "Classic leather shoes with timeless appeal",
        price: "11990.00",
        categoryId: menCategory.id,
        images: ["https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=800"],
        sizes: ["39", "40", "41", "42", "43", "44", "45"],
        colors: ["Black", "Brown"],
        inStock: true,
        featured: true
      }
    ];

    sampleProducts.forEach(product => {
      const id = randomUUID();
      this.products.set(id, {
        ...product,
        id,
        createdAt: new Date()
      });
    });
  }

  async getCategories(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }

  async getCategoryBySlug(slug: string): Promise<Category | undefined> {
    return Array.from(this.categories.values()).find(cat => cat.slug === slug);
  }

  async createCategory(category: InsertCategory): Promise<Category> {
    const id = randomUUID();
    const newCategory: Category = { 
      ...category, 
      id,
      description: category.description ?? null,
      imageUrl: category.imageUrl ?? null
    };
    this.categories.set(id, newCategory);
    return newCategory;
  }

  async getProducts(categorySlug?: string, featured?: boolean): Promise<ProductWithCategory[]> {
    let products = Array.from(this.products.values());

    if (categorySlug) {
      const category = await this.getCategoryBySlug(categorySlug);
      if (category) {
        products = products.filter(p => p.categoryId === category.id);
      }
    }

    if (featured !== undefined) {
      products = products.filter(p => p.featured === featured);
    }

    return products.map(product => ({
      ...product,
      category: product.categoryId ? this.categories.get(product.categoryId) || null : null
    }));
  }

  async getProductBySlug(slug: string): Promise<ProductWithCategory | undefined> {
    const product = Array.from(this.products.values()).find(p => p.slug === slug);
    if (!product) return undefined;

    return {
      ...product,
      category: product.categoryId ? this.categories.get(product.categoryId) || null : null
    };
  }

  async getProductById(id: string): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async createProduct(product: InsertProduct): Promise<Product> {
    const id = randomUUID();
    const newProduct: Product = { 
      ...product, 
      id, 
      createdAt: new Date(),
      description: product.description ?? null,
      categoryId: product.categoryId ?? null,
      images: product.images ?? [],
      sizes: product.sizes ?? [],
      colors: product.colors ?? []
    };
    this.products.set(id, newProduct);
    return newProduct;
  }

  async searchProducts(query: string): Promise<ProductWithCategory[]> {
    const searchTerm = query.toLowerCase();
    const products = Array.from(this.products.values()).filter(product =>
      product.name.toLowerCase().includes(searchTerm) ||
      product.description?.toLowerCase().includes(searchTerm)
    );

    return products.map(product => ({
      ...product,
      category: product.categoryId ? this.categories.get(product.categoryId) || null : null
    }));
  }

  async getCartItems(sessionId: string): Promise<CartItemWithProduct[]> {
    const items = Array.from(this.cartItems.values()).filter(item => item.sessionId === sessionId);
    
    return items.map(item => ({
      ...item,
      product: this.products.get(item.productId!)!
    }));
  }

  async addCartItem(item: InsertCartItem): Promise<CartItem> {
    const id = randomUUID();
    const newItem: CartItem = { 
      ...item, 
      id,
      size: item.size ?? null,
      color: item.color ?? null,
      productId: item.productId ?? null
    };
    this.cartItems.set(id, newItem);
    return newItem;
  }

  async updateCartItem(id: string, quantity: number): Promise<CartItem | undefined> {
    const item = this.cartItems.get(id);
    if (!item) return undefined;

    const updatedItem = { ...item, quantity };
    this.cartItems.set(id, updatedItem);
    return updatedItem;
  }

  async removeCartItem(id: string): Promise<void> {
    this.cartItems.delete(id);
  }

  async clearCart(sessionId: string): Promise<void> {
    const itemsToRemove = Array.from(this.cartItems.entries())
      .filter(([_, item]) => item.sessionId === sessionId)
      .map(([id]) => id);
    
    itemsToRemove.forEach(id => this.cartItems.delete(id));
  }
}

export const storage = new MemStorage();
