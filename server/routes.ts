import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { insertCartItemSchema } from "@shared/schema";
import { processVirtualTryOn } from "./virtual-tryon";

export async function registerRoutes(app: Express): Promise<Server> {
  // Categories
  app.get("/api/categories", async (req, res) => {
    try {
      const categories = await storage.getCategories();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch categories" });
    }
  });

  app.get("/api/categories/:slug", async (req, res) => {
    try {
      const category = await storage.getCategoryBySlug(req.params.slug);
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      res.json(category);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch category" });
    }
  });

  // Products
  app.get("/api/products", async (req, res) => {
    try {
      const { category, featured } = req.query;
      const products = await storage.getProducts(
        category as string,
        featured === "true" ? true : featured === "false" ? false : undefined
      );
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch products" });
    }
  });

  app.get("/api/products/search", async (req, res) => {
    try {
      const { q } = req.query;
      if (!q || typeof q !== "string") {
        return res.status(400).json({ message: "Search query is required" });
      }
      const products = await storage.searchProducts(q);
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Failed to search products" });
    }
  });

  app.get("/api/products/:slug", async (req, res) => {
    try {
      const product = await storage.getProductBySlug(req.params.slug);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch product" });
    }
  });

  // Cart
  app.get("/api/cart", async (req, res) => {
    try {
      const sessionId = "anonymous";
      const cartItems = await storage.getCartItems(sessionId);
      res.json(cartItems);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch cart items" });
    }
  });

  app.post("/api/cart", async (req, res) => {
    try {
      const sessionId = "anonymous";
      const validatedData = insertCartItemSchema.parse({
        ...req.body,
        sessionId
      });
      
      const cartItem = await storage.addCartItem(validatedData);
      res.status(201).json(cartItem);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid cart item data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to add item to cart" });
    }
  });

  app.patch("/api/cart/:id", async (req, res) => {
    try {
      const { quantity } = req.body;
      if (typeof quantity !== "number" || quantity < 0) {
        return res.status(400).json({ message: "Valid quantity is required" });
      }
      
      const cartItem = await storage.updateCartItem(req.params.id, quantity);
      if (!cartItem) {
        return res.status(404).json({ message: "Cart item not found" });
      }
      
      res.json(cartItem);
    } catch (error) {
      res.status(500).json({ message: "Failed to update cart item" });
    }
  });

  app.delete("/api/cart/:id", async (req, res) => {
    try {
      await storage.removeCartItem(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to remove cart item" });
    }
  });

  app.delete("/api/cart", async (req, res) => {
    try {
      const sessionId = "anonymous";
      await storage.clearCart(sessionId);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to clear cart" });
    }
  });

  // Virtual Try-On endpoint
  app.post("/api/virtual-tryon", processVirtualTryOn);

  // Custom design routes
  app.post("/api/custom-designs", async (req, res) => {
    try {
      const { productId, textElements, imageElements, canvas } = req.body;
      
      // For demo purposes, we'll create a design without user authentication
      // In production, you'd require authentication and get user ID from session
      const userId = "guest-user"; // This would come from authenticated session
      
      const designData = {
        canvas,
        elementsCount: textElements.length + imageElements.length,
        createdAt: new Date().toISOString()
      };

      const designId = await storage.saveCustomDesign(
        userId,
        productId,
        designData,
        textElements,
        imageElements
      );

      res.json({ 
        success: true, 
        designId,
        message: "Custom design saved successfully" 
      });
    } catch (error: any) {
      console.error("Error saving custom design:", error);
      res.status(500).json({ message: "Failed to save custom design" });
    }
  });

  app.get("/api/custom-designs/:designId", async (req, res) => {
    try {
      const { designId } = req.params;
      const design = await storage.getCustomDesign(designId);
      
      if (!design) {
        return res.status(404).json({ message: "Design not found" });
      }

      res.json(design);
    } catch (error: any) {
      console.error("Error fetching custom design:", error);
      res.status(500).json({ message: "Failed to fetch custom design" });
    }
  });

  app.get("/api/users/:userId/custom-designs", async (req, res) => {
    try {
      const { userId } = req.params;
      const designs = await storage.getCustomDesignsByUser(userId);
      
      res.json(designs);
    } catch (error: any) {
      console.error("Error fetching user designs:", error);
      res.status(500).json({ message: "Failed to fetch user designs" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
