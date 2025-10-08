# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

**Picsto App** (formerly "Picify") is an AI-powered image transformation application built with Next.js 14. It provides users with advanced image editing capabilities including restoration, background removal, generative fill, object removal, and recoloring through Cloudinary's AI APIs.

### Technology Stack
- **Framework**: Next.js 14.1.4 with TypeScript and App Router
- **Authentication**: Clerk (@clerk/nextjs)
- **Database**: MongoDB with Mongoose ODM
- **Image Processing**: Cloudinary with next-cloudinary
- **Payments**: Stripe for credit-based transactions
- **UI**: Tailwind CSS + Radix UI components
- **Form Handling**: React Hook Form + Zod validation

## Common Development Commands

### Development Server
```bash
npm run dev
```
Starts the development server at http://localhost:3000

### Build Commands
```bash
npm run build    # Production build
npm start        # Start production server
npm run lint     # Run ESLint
```

### Testing Individual Features
```bash
# Test specific transformation types by navigating to:
# /transformations/add/restore
# /transformations/add/fill
# /transformations/add/remove
# /transformations/add/recolor
# /transformations/add/removeBackground
```

### Environment Setup
```bash
# Copy environment template and configure services
cp .env.example .env.local
# Fill in all required service credentials
```

## Application Architecture

### Core Application Flow
The application follows a credit-based system where users authenticate via Clerk, purchase credits through Stripe, and consume credits for AI image transformations via Cloudinary.

### Directory Structure
```
app/
├── (auth)/          # Authentication layouts (sign-in/up)
├── (root)/          # Main app with sidebar navigation
│   ├── page.tsx     # Home/dashboard with recent transformations
│   ├── credits/     # Credit purchase page with Stripe integration
│   ├── profile/     # User profile and transformation history
│   └── transformations/add/[type]/  # Dynamic transformation pages
```

### Key Components Architecture

**Navigation System**:
- `Sidebar` - Desktop navigation with transformation types
- `MobileNav` - Mobile sheet navigation
- Navigation routes defined in `constants/index.ts`

**Form System**:
- `TransformationForm` - Main form handling all transformation types
- `CustomField` - Reusable form field wrapper
- `MediaUploader` - Handles image upload to Cloudinary
- `TransformedImage` - Displays original vs transformed images

**State Management Pattern**:
The app uses server actions pattern with form state managed by React Hook Form. Database operations are handled through server actions in `lib/actions/` with proper error handling and revalidation.

### Database Models
Located in `lib/database/models/`:
- **User**: Stores Clerk user data + credit balance
- **Image**: Stores transformation metadata and URLs
- **Transaction**: Stores Stripe payment records

Database uses connection caching pattern for serverless optimization.

### API Integration Points

**Clerk Authentication**:
- Webhook: `/api/webhooks/clerk` - Syncs user creation/updates
- Middleware protects all routes except webhooks
- User context available via `@clerk/nextjs`

**Stripe Payments**:
- Webhook: `/api/webhooks/stripe` - Handles successful payments
- Three pricing tiers: Free (20 credits), Pro (120 credits), Premium (2000 credits)
- Credit deduction on transformation completion

**Cloudinary Processing**:
- Transformations configured in `constants/transformationTypes`
- Uses `next-cloudinary` for optimized delivery
- Images stored in 'picsto' folder with public_id tracking

### Transformation Types
Each transformation type has specific configuration:
- **restore**: Image restoration/enhancement
- **removeBackground**: AI background removal  
- **fill**: Generative fill/outpainting with aspect ratio changes
- **remove**: Object removal with prompt and shadow options
- **recolor**: Object recoloring with color specification

### Error Handling Strategy
- `handleError` utility in `lib/utils.ts` for consistent error processing
- Server actions use try/catch with proper error propagation
- Loading states managed in components during async operations

### Environment Configuration
The app requires multiple external services - all configurations are documented in `.env.example`:
- Clerk (authentication)
- MongoDB (database)
- Cloudinary (image processing) 
- Stripe (payments)

## Development Guidelines

### Adding New Transformation Types
1. Add configuration to `transformationTypes` in constants
2. Add route in `navLinks` array
3. Create transformation logic in server actions
4. Update TypeScript types in `types/index.d.ts`

### Working with Images
- All images flow through MediaUploader → Cloudinary → TransformedImage
- Use `getImageSize` utility for proper dimensioning
- Handle loading states during transformation processing

### Credit System Integration
- Check user credit balance before allowing transformations
- Deduct credits after successful transformation
- Handle insufficient credits with modal prompts

### Database Queries
- Always use `populateUser` for image queries to include author data
- Implement proper pagination for image lists
- Use connection caching for serverless optimization

## Webhook Endpoints

### Clerk Webhook (`/api/webhooks/clerk`)
Handles user lifecycle events from Clerk authentication service.

### Stripe Webhook (`/api/webhooks/stripe`)
Processes payment completion events and credit additions.

Both webhooks are marked as public routes in middleware and require proper signature verification.