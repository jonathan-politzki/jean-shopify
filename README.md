# Jean Personal Shopper - Shopify App

## Overview
Jean Personal Shopper is a Shopify app that instantly personalizes product recommendations for shoppers based on their digital presence. Rather than waiting for behavioral data or requiring lengthy questionnaires, the app provides immediate personalization through a simple, user-friendly flow:

1. Customer sees a "Personalize My Shopping" popup while browsing
2. Clicks to securely connect (OAuth via Google/LinkedIn)
3. Provides a single link that best represents their personality (social profile, blog, etc.)
4. Receives instant, AI-powered product recommendations tailored to their personality

Think of it as a digital personal shopper that instantly understands a customer's style and preferences through their online presence.

## Current Implementation

### Core Components
- `AuthFlow`: Handles secure OAuth integration with Jean Technologies infrastructure
- `PersonalityLink`: UI for collecting user's representative link
- `ProductRecommendations`: Displays personalized product suggestions
- Shopify theme extension for the popup integration

### Key Features Implemented
- Basic app scaffold with Remix + Shopify
- Database schema for storing user preferences and recommendations
- Integration points with Jean Technologies OAuth
- Theme extension structure for merchant stores

## Immediate Next Steps for MVP

### 1. Authentication Flow (High Priority)
- [ ] Complete OAuth callback handling in `app/routes/auth/callback.tsx`
- [ ] Implement proper session management
- [ ] Test end-to-end authentication flow

### 2. Core Functionality
- [ ] Implement personality link submission and storage
- [ ] Set up OpenAI integration for analyzing user personality
- [ ] Connect to Shopify's product API for recommendations
- [ ] Implement the recommendation algorithm

### 3. UI/UX Implementation
- [ ] Style the popup for merchant stores
- [ ] Create a smooth transition between authentication and link submission
- [ ] Design and implement the recommendation display

### 4. Testing & Deployment
- [ ] Set up proper error handling
- [ ] Add logging for debugging
- [ ] Create test merchant store
- [ ] Prepare for Shopify app store submission

## Technical Details

### Structure
```
jean-shopify/
├── app/                      # Main application code
│   ├── components/           # React components
│   ├── lib/                  # Shared utilities
│   └── routes/              # API and page routes
├── extensions/               # Shopify theme extension
└── prisma/                  # Database schema
```

### Key Files
- `app.embed.liquid`: Shopify theme integration
- `personality.ts`: Handles personality link submission
- `recommendations.ts`: Generates product recommendations
- `shopify.server.ts`: Shopify API integration
- `jean-client.ts`: Integration with Jean Technologies

## Getting Started
1. Install dependencies: `npm install`
2. Set up environment variables (see `.env.example`)
3. Run migrations: `npx prisma migrate dev`
4. Start development server: `npm run dev`

## Critical Path to MVP
1. Complete authentication flow
2. Implement basic personality link collection
3. Set up simple recommendation generation
4. Deploy to test store
5. Gather initial feedback
6. Submit to Shopify app store

## Future Enhancements
- Enhanced personality analysis
- Product matching refinement
- Merchant dashboard for analytics
- A/B testing different recommendation strategies
- Multi-platform social integration

## Resources
- [Shopify App Documentation](https://shopify.dev/docs/apps)
- [Jean Technologies Documentation](link-to-your-docs)
- [OpenAI API Documentation](https://platform.openai.com/docs)

## Notes for Developers
- Pay attention to Shopify's rate limits
- Be mindful of OpenAI token usage
- Follow Shopify's security best practices
- Test thoroughly with multiple store themes