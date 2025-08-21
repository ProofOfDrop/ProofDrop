# ProofDrop - Airdrop Reputation Protocol

## Overview

ProofDrop is a decentralized protocol for verifiable airdrop reputation that analyzes on-chain wallet activity to create reputation scores. The system helps projects identify genuine users and eliminate bots from token distributions through sophisticated blockchain activity analysis. Users connect their wallets to receive scores from 0-100 points across six key metrics, earning tiered badges (BOT, Android, Cyborg, Human) based on their activity patterns. The application features a modern React frontend with Web3 wallet integration and a Node.js/Express backend designed for scalability.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The client uses **React 18** with **TypeScript** in a single-page application structure. The UI is built with **shadcn/ui components** styled using **Tailwind CSS** with a dark space-themed design system. State management relies on **TanStack React Query** for server state and **React hooks** for local state. The routing system uses **Wouter** for lightweight client-side navigation.

### Web3 Integration
Wallet connectivity is handled through **RainbowKit** and **Wagmi**, supporting multiple networks including Ethereum mainnet, Polygon, BSC, and testnets. The architecture separates Web3 concerns into dedicated configuration files and custom hooks, making it easy to add new networks or modify connection logic.

### Backend Architecture
The server uses **Express.js** with **TypeScript** in ESM module format. The storage layer implements an interface pattern with in-memory storage for development, designed to be easily replaced with database implementations. The API follows RESTful patterns with centralized error handling and request logging middleware.

### Database Design
Database schema is managed through **Drizzle ORM** with **PostgreSQL** as the target database. The current schema includes a basic users table with UUID primary keys, username, and password fields. The migration system is configured for PostgreSQL deployment with environment-based connection strings.

### Development Workflow
The project uses **Vite** for development with hot module replacement and React plugin support. The build process bundles the frontend with Vite and the backend with esbuild, optimizing for production deployment. TypeScript compilation uses strict mode with path mapping for clean imports.

### Scoring Engine
The wallet analysis system implements a points-based scoring algorithm across six metrics: account age (10 points), gas spent (10 points), unique contract interactions (20 points), governance participation (20 points), DeFi engagement (20 points), and airdrops claimed (20 points). The current implementation uses mock data but is structured to integrate with blockchain analysis APIs like Moralis or Covalent.

### UI Component System
The frontend leverages a comprehensive design system built on Radix UI primitives, providing accessible components for dialogs, forms, navigation, and data display. The styling approach uses CSS custom properties for theming with Tailwind utility classes for layout and responsive design.

## External Dependencies

### Blockchain Infrastructure
- **@neondatabase/serverless** - PostgreSQL database connection for production
- **Neon Database** - Serverless PostgreSQL hosting platform
- **RainbowKit** - Wallet connection interface supporting multiple providers
- **Wagmi** - React hooks for Ethereum interactions and wallet management

### Development Tools
- **Vite** - Frontend build tool with fast development server
- **Drizzle Kit** - Database schema management and migrations
- **TypeScript** - Type safety across frontend and backend
- **ESBuild** - Backend bundling for production deployment

### UI Framework
- **React 18** - Frontend framework with concurrent features
- **Radix UI** - Unstyled accessible component primitives
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library for consistent iconography

### Data Management
- **TanStack React Query** - Server state management and caching
- **React Hook Form** - Form state management with validation
- **Zod** - Runtime type validation for form schemas

### Future Integration Points
The architecture is prepared for integration with blockchain analytics services like **Moralis API**, **Covalent API**, or **The Graph Protocol** for comprehensive on-chain activity analysis. The scoring system includes placeholder configurations for these services and environment variable management for API keys.