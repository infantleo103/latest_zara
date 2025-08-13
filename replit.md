# Overview

This is a modern e-commerce web application built as a full-stack solution featuring a fashion retail store (ZARA-inspired). The application provides a complete shopping experience with product browsing, cart management, and search functionality. It follows a monorepo structure with separate client and server directories, sharing common schemas and types through a shared directory.

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