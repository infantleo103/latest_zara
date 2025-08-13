# Overview

This is a high-fidelity Zara website clone featuring minimalist luxury design with aesthetic model photography and sophisticated animations. The application recreates Zara's premium fashion e-commerce experience with floating navigation, full-size indoor photoshoot images in random grid layouts, and contemporary design elements. Built as a full-stack solution with complete shopping functionality including product browsing, cart management, and search capabilities.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript and Vite for fast development and building
- **Styling**: Tailwind CSS with shadcn/ui component library for consistent design
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: Zustand for cart state with persistence support
- **Data Fetching**: TanStack Query (React Query) for server state management and caching
- **Form Handling**: React Hook Form with Zod validation

## Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Pattern**: RESTful API design with structured route handlers
- **Development**: Hot reload with Vite in development mode
- **Build System**: esbuild for production bundling

## Data Storage Solutions
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Provider**: Neon Database for serverless PostgreSQL hosting
- **Schema Management**: Drizzle Kit for migrations and schema management
- **Development Fallback**: In-memory storage implementation for development/testing

## Authentication and Authorization
- **Session Management**: Express sessions with PostgreSQL session store
- **Anonymous Shopping**: Cart functionality works without user authentication
- **Security**: CORS configuration and input validation with Zod schemas

## External Dependencies

### Database & ORM
- **Neon Database**: Serverless PostgreSQL hosting (@neondatabase/serverless)
- **Drizzle ORM**: Type-safe database operations with PostgreSQL dialect
- **Session Store**: connect-pg-simple for PostgreSQL-backed session storage

### UI & Styling
- **shadcn/ui**: Comprehensive UI component library built on Radix UI primitives
- **Tailwind CSS**: Utility-first CSS framework with custom design tokens
- **Radix UI**: Headless UI components for accessibility and customization
- **Lucide React**: Icon library for consistent iconography

### Development Tools
- **Vite**: Fast build tool with HMR and React plugin support
- **TypeScript**: Static type checking across frontend and backend
- **Replit Integration**: Custom plugins for development environment integration

### Utilities & Libraries
- **TanStack Query**: Server state management with caching and background updates
- **Zustand**: Lightweight state management with persistence
- **date-fns**: Date manipulation and formatting utilities
- **clsx & tailwind-merge**: Conditional CSS class management

## Recent Changes (August 2025)

### Complete E-Commerce Platform Features
- **Authentication System**: Full user login/signup with session management and protected routes
- **Enhanced Product Pages**: Detailed product information with titles, pricing, descriptions, and image galleries
- **Payment Processing**: Comprehensive checkout flow with Stripe integration and order confirmation
- **Virtual Try-On**: AI-powered virtual try-on feature for fashion items
- **Shopping Cart**: Persistent cart functionality with add/remove/update capabilities
- **Order Management**: Order success pages with tracking and confirmation details

### Customization Section (Latest Addition)
- **Customization Homepage Section**: New dedicated section on homepage showcasing personalized products
- **Bespoke Product Category**: Custom tailored suits, personalized leather jackets, evening dresses
- **Custom Product Features**: Monogramming, custom fits, personalized details and fabric choices
- **Customization Flow**: Dedicated category page for browsing all customizable products
- **Visual Design**: Custom badges, specialized imagery, and tailored product descriptions

### Aesthetic Design Overhaul
- **Floating Navigation**: Transparent header that becomes solid on scroll with enlarged ZARA logo
- **Hero Section**: Full-screen carousel with rotating background images and sophisticated typography
- **Model Grid**: Indoor photoshoot images in masonry layout with random grid alignment (Zara-inspired)
- **Glass Morphism**: Floating elements with backdrop blur effects throughout the interface
- **Enhanced Typography**: Extralight fonts with precise letter spacing for luxury aesthetic
- **Parallax Effects**: Fixed background attachments for depth and visual interest
- **Animation System**: Fade-in animations, floating elements, and smooth transitions

### Component Architecture
- **AestheticGallery**: Full-screen image sections with category overlays
- **ModelGrid**: Random masonry grid layout for indoor model photography
- **Enhanced Header**: Scroll-responsive navigation with scaling logo and color transitions
- **Authentication Integration**: Header shows user status with login/logout functionality
- **Improved CSS**: Custom animations, glass morphism utilities, and responsive design patterns

### Product Detail Page Features
- **Split-Screen Layout**: Professional image gallery left, product details right
- **Aesthetic Typography**: Minimalist fonts with precise letter spacing
- **Product Recommendations**: "YOU MAY BE INTERESTED IN" section below main product
- **Virtual Try-On**: AI-powered virtual try-on feature for users to try outfits with their photos
- **Shopping Cart**: Complete cart functionality with error handling and persistence
- **Wishlist Feature**: Save/remove products from wishlist with heart icon