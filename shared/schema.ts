import { sql, relations } from "drizzle-orm";
import { pgTable, text, varchar, integer, decimal, boolean, timestamp, jsonb, index } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const categories = pgTable("categories", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  imageUrl: text("image_url"),
});

export const products = pgTable("products", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  categoryId: varchar("category_id").references(() => categories.id),
  images: jsonb("images").$type<string[]>().notNull().default([]),
  sizes: jsonb("sizes").$type<string[]>().notNull().default([]),
  colors: jsonb("colors").$type<string[]>().notNull().default([]),
  inStock: boolean("in_stock").notNull().default(true),
  featured: boolean("featured").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

// Session storage table for authentication
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User storage table for authentication
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const cartItems = pgTable("cart_items", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  sessionId: text("session_id").notNull(),
  productId: varchar("product_id").references(() => products.id),
  quantity: integer("quantity").notNull().default(1),
  size: text("size"),
  color: text("color"),
});

export const orders = pgTable("orders", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  sessionId: text("session_id").notNull(),
  userEmail: text("user_email"),
  status: text("status").notNull().default("pending"),
  total: decimal("total", { precision: 10, scale: 2 }).notNull(),
  shippingAddress: jsonb("shipping_address").$type<{
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    zipCode: string;
    country: string;
  }>().notNull(),
  paymentId: text("payment_id"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const orderItems = pgTable("order_items", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  orderId: varchar("order_id").references(() => orders.id),
  productId: varchar("product_id").references(() => products.id),
  quantity: integer("quantity").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  size: text("size"),
  color: text("color"),
});

export const insertCategorySchema = createInsertSchema(categories).omit({
  id: true,
});

export const insertProductSchema = createInsertSchema(products).omit({
  id: true,
  createdAt: true,
});

export const insertCartItemSchema = createInsertSchema(cartItems).omit({
  id: true,
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertOrderSchema = createInsertSchema(orders).omit({
  id: true,
  createdAt: true,
});

export const insertOrderItemSchema = createInsertSchema(orderItems).omit({
  id: true,
});

export type Category = typeof categories.$inferSelect;
export type Product = typeof products.$inferSelect;
export type CartItem = typeof cartItems.$inferSelect;
export type User = typeof users.$inferSelect;
export type UpsertUser = typeof users.$inferInsert;
export type Order = typeof orders.$inferSelect;
export type OrderItem = typeof orderItems.$inferSelect;
export type InsertCategory = z.infer<typeof insertCategorySchema>;
export type InsertProduct = z.infer<typeof insertProductSchema>;
export type InsertCartItem = z.infer<typeof insertCartItemSchema>;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type InsertOrder = z.infer<typeof insertOrderSchema>;
export type InsertOrderItem = z.infer<typeof insertOrderItemSchema>;

export interface ProductWithCategory extends Product {
  category: Category | null;
}

export interface CartItemWithProduct extends CartItem {
  product: Product;
}

export interface OrderWithItems extends Order {
  items: (OrderItem & { product: Product })[];
}

// Customization tables
export const customDesigns = pgTable("custom_designs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id),
  productId: varchar("product_id").references(() => products.id),
  orderId: varchar("order_id").references(() => orders.id),
  designData: jsonb("design_data").notNull(), // Stores the complete design configuration
  previewImageUrl: varchar("preview_image_url"), // URL to generated preview image
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const customTextElements = pgTable("custom_text_elements", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  designId: varchar("design_id").references(() => customDesigns.id, { onDelete: "cascade" }),
  text: varchar("text").notNull(),
  x: integer("x").notNull(),
  y: integer("y").notNull(),
  fontSize: integer("font_size").notNull(),
  fontFamily: varchar("font_family").notNull(),
  color: varchar("color").notNull(),
  fontWeight: varchar("font_weight").notNull(),
  rotation: integer("rotation").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

export const customImageElements = pgTable("custom_image_elements", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  designId: varchar("design_id").references(() => customDesigns.id, { onDelete: "cascade" }),
  imageUrl: varchar("image_url").notNull(), // URL to uploaded image
  originalFileName: varchar("original_file_name"),
  x: integer("x").notNull(),
  y: integer("y").notNull(),
  width: integer("width").notNull(),
  height: integer("height").notNull(),
  rotation: integer("rotation").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

// Relations for customization
export const customDesignsRelations = relations(customDesigns, ({ one, many }) => ({
  user: one(users, {
    fields: [customDesigns.userId],
    references: [users.id],
  }),
  product: one(products, {
    fields: [customDesigns.productId],
    references: [products.id],
  }),
  order: one(orders, {
    fields: [customDesigns.orderId],
    references: [orders.id],
  }),
  textElements: many(customTextElements),
  imageElements: many(customImageElements),
}));

export const customTextElementsRelations = relations(customTextElements, ({ one }) => ({
  design: one(customDesigns, {
    fields: [customTextElements.designId],
    references: [customDesigns.id],
  }),
}));

export const customImageElementsRelations = relations(customImageElements, ({ one }) => ({
  design: one(customDesigns, {
    fields: [customImageElements.designId],
    references: [customDesigns.id],
  }),
}));

// Customization schema types
export const insertCustomDesignSchema = createInsertSchema(customDesigns).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertCustomTextElementSchema = createInsertSchema(customTextElements).omit({
  id: true,
  createdAt: true,
});

export const insertCustomImageElementSchema = createInsertSchema(customImageElements).omit({
  id: true,
  createdAt: true,
});

export type CustomDesign = typeof customDesigns.$inferSelect;
export type InsertCustomDesign = z.infer<typeof insertCustomDesignSchema>;
export type CustomTextElement = typeof customTextElements.$inferSelect;
export type InsertCustomTextElement = z.infer<typeof insertCustomTextElementSchema>;
export type CustomImageElement = typeof customImageElements.$inferSelect;
export type InsertCustomImageElement = z.infer<typeof insertCustomImageElementSchema>;

export type CustomDesignWithElements = CustomDesign & {
  textElements: CustomTextElement[];
  imageElements: CustomImageElement[];
  product?: Product;
};
