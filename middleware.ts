import { authMiddleware } from "@clerk/nextjs";
import { NextResponse } from "next/server";

// Allow the app to boot even if Clerk env vars are not yet set on the platform
const isClerkConfigured = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY && process.env.CLERK_SECRET_KEY);

const middleware = isClerkConfigured
  ? authMiddleware({
      publicRoutes: ["/api/webhooks/clerk", "/api/webhooks/stripe"],
    })
  : () => NextResponse.next();

export default middleware;

export const config = {
  matcher: [
    "/((?!.+\\.[\\w]+$|_next).*)",
    "/(api|trpc)(.*)",
  ],
};
