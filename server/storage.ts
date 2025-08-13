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

    const customizedCategory: Category = {
      id: randomUUID(),
      name: "CUSTOMIZED",
      slug: "customized",
      description: "Personalized and bespoke fashion pieces",
      imageUrl: "https://images.unsplash.com/photo-1594938384820-28d8f7f4bb8e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1000"
    };

    [womenCategory, menCategory, kidsCategory, homeCategory, customizedCategory].forEach(category => {
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
        sizes: ["XS", "S", "M", "L", "XL"] as string[],
        colors: ["Black", "Camel", "Navy"] as string[],
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
        sizes: ["One Size"] as string[],
        colors: ["Black", "Brown", "Tan"] as string[],
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
        sizes: ["XS", "S", "M", "L", "XL"] as string[],
        colors: ["White", "Light Blue"] as string[],
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
        sizes: ["One Size"] as string[],
        colors: ["Gold", "Silver"] as string[],
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
        sizes: ["XS", "S", "M", "L", "XL"] as string[],
        colors: ["Black", "Navy", "Charcoal"] as string[],
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
        sizes: ["One Size"] as string[],
        colors: ["Black", "Tortoise"] as string[],
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
        sizes: ["One Size"] as string[],
        colors: ["Multicolor"] as string[],
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
        sizes: ["39", "40", "41", "42", "43", "44", "45"] as string[],
        colors: ["Black", "Brown"] as string[],
        inStock: true,
        featured: true
      },

      // Customized Products
      {
        name: "CUSTOM TAILORED SUIT",
        slug: "custom-tailored-suit",
        description: "Bespoke suit tailored to your exact measurements and style preferences. Choose from premium fabrics and personalized details.",
        price: "89900.00",
        categoryId: customizedCategory.id,
        images: [
          "https://images.unsplash.com/photo-1594938384820-28d8f7f4bb8e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=800",
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=800"
        ],
        sizes: ["Custom"] as string[],
        colors: ["Navy", "Charcoal", "Black", "Brown"] as string[],
        inStock: true,
        featured: false
      },
      {
        name: "PERSONALIZED LEATHER JACKET",
        slug: "personalized-leather-jacket",
        description: "Custom leather jacket with your choice of leather type, color, and personalized embossing or embroidery.",
        price: "54900.00",
        categoryId: customizedCategory.id,
        images: [
          "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=800",
          "https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=800"
        ],
        sizes: ["Custom"] as string[],
        colors: ["Black", "Brown", "Tan", "Wine"] as string[],
        inStock: true,
        featured: false
      },
      {
        name: "BESPOKE EVENING DRESS",
        slug: "bespoke-evening-dress",
        description: "Elegant evening dress designed and tailored specifically for you. Choice of fabrics, necklines, and custom details.",
        price: "129900.00",
        categoryId: customizedCategory.id,
        images: [
          "https://images.unsplash.com/photo-1566479179817-c9c49e2bb2c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=800",
          "https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=800"
        ],
        sizes: ["Custom"] as string[],
        colors: ["Black", "Navy", "Emerald", "Burgundy"] as string[],
        inStock: true,
        featured: false
      },
      {
        name: "CUSTOM MONOGRAMMED SHIRT",
        slug: "custom-monogrammed-shirt",
        description: "Premium cotton shirt with custom monogramming, collar styles, and fit adjustments to your preferences.",
        price: "12900.00",
        categoryId: customizedCategory.id,
        images: [
          "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=800",
          "https://images.unsplash.com/photo-1619955074429-573cdf95c42c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=800"
        ],
        sizes: ["Custom"] as string[],
        colors: ["White", "Light Blue", "Pink", "Gray"] as string[],
        inStock: true,
        featured: false
      },
      {
        name: "TAILORED WOOL COAT",
        slug: "tailored-wool-coat",
        description: "Luxurious wool coat with custom tailoring, choice of wool blend, and personalized interior monogramming.",
        price: "74900.00",
        categoryId: customizedCategory.id,
        images: [
          "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=800",
          "https://images.unsplash.com/photo-1559563458-527698bf5295?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=800"
        ],
        sizes: ["Custom"] as string[],
        colors: ["Camel", "Navy", "Black", "Gray"] as string[],
        inStock: true,
        featured: false
      },
      {
        name: "CUSTOM DENIM JEANS",
        slug: "custom-denim-jeans",
        description: "Perfect-fit denim jeans with custom measurements, wash preferences, and personalized details.",
        price: "19900.00",
        categoryId: customizedCategory.id,
        images: [
          "https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=800",
          "https://images.unsplash.com/photo-1565084888279-aca607ecce0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=800"
        ],
        sizes: ["Custom"] as string[],
        colors: ["Indigo", "Black", "Light Wash", "Dark Wash"] as string[],
        inStock: true,
        featured: false
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
      productId: item.productId ?? null,
      quantity: item.quantity ?? 1
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
