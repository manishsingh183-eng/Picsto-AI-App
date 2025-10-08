# Picsto App - Deployment Guide

This is a complete guide to set up and deploy the Picsto App - an AI-powered image transformation application.

## Project Overview

Picsto App is a Next.js application that provides AI-powered image transformations including:
- Image restoration
- Background removal  
- Generative fill
- Object removal and recoloring
- User authentication via Clerk
- Payment processing via Stripe
- Image processing via Cloudinary

## Prerequisites

Before deployment, ensure you have:

### 1. Node.js and npm
- Install Node.js (v18+ recommended) from https://nodejs.org/
- Verify installation: `node --version` and `npm --version`

### 2. Git (Optional but recommended)
- Install Git from https://git-scm.com/

## Required Services Setup

### 1. Clerk Authentication
1. Create account at https://clerk.com/
2. Create new application
3. Get your publishable key and secret key
4. Configure webhook endpoints for user management

### 2. MongoDB Database  
1. Create account at https://mongodb.com/atlas
2. Create new cluster
3. Get connection string
4. Whitelist IP addresses

### 3. Cloudinary Image Processing
1. Create account at https://cloudinary.com/
2. Get cloud name, API key, and API secret
3. Configure upload presets if needed

### 4. Stripe Payment Processing
1. Create account at https://stripe.com/
2. Get publishable and secret keys
3. Set up webhook endpoints for payment events
4. Configure products and prices

## Installation Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Configuration
1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
2. Fill in all required environment variables with your service credentials

### 3. Database Setup
The application uses MongoDB with Mongoose. Models are already defined for:
- Users
- Images/Transformations  
- Transactions

### 4. Development Server
```bash
npm run dev
```
Open http://localhost:3000

### 5. Build for Production
```bash
npm run build
npm start
```

## Known Issues and Fixes

### 1. Environment Variables
Ensure all required environment variables are set. Missing variables will cause authentication and API failures.

### 2. Cloudinary Configuration
- Verify upload presets are configured correctly
- Check API limits for your plan
- Ensure proper image format support

### 3. Webhook Configuration
Both Clerk and Stripe require proper webhook setup:
- Clerk: `/api/webhooks/clerk`
- Stripe: `/api/webhooks/stripe`

### 4. Database Connection Issues
- Verify MongoDB connection string format
- Check IP whitelist settings
- Ensure network access is configured

### 5. TypeScript Issues
The project uses strict TypeScript. Common fixes:
- Ensure all props are properly typed
- Add proper return types for functions
- Handle null/undefined cases

## Deployment Options

### 1. Vercel (Recommended)
1. Push code to GitHub/GitLab
2. Connect to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### 2. Netlify
1. Build the project locally
2. Upload build folder to Netlify
3. Configure environment variables
4. Set up redirects for SPA routing

### 3. Self-hosted
1. Use PM2 or similar process manager
2. Set up reverse proxy (nginx)
3. Configure SSL certificates
4. Set up environment variables

## Performance Optimization

### 1. Image Optimization
- Cloudinary handles image transformations
- Next.js Image component optimizes delivery
- Consider CDN for static assets

### 2. Database Optimization
- Add proper indexes for user queries
- Monitor connection pooling
- Consider read replicas for scaling

### 3. Caching Strategy
- Implement Redis for session caching
- Use Next.js built-in caching
- Configure CDN caching rules

## Monitoring and Maintenance

### 1. Error Tracking
- Set up Sentry or similar service
- Monitor API response times
- Track user authentication issues

### 2. Analytics
- Google Analytics for user behavior
- Stripe dashboard for payments
- Cloudinary analytics for usage

### 3. Security
- Regular dependency updates
- Monitor webhook signatures
- Implement rate limiting
- Regular security audits

## Support

For issues or questions:
1. Check the error logs in your deployment platform
2. Verify all environment variables are set correctly
3. Check service status pages (Clerk, Stripe, Cloudinary)
4. Review API documentation for each service

## Credits and Acknowledgments

This project uses several third-party services and open-source libraries. Please ensure you comply with their respective terms of service and licensing agreements.