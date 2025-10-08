import React from "react";
import { ClerkProvider as RealClerkProvider, SignedIn as RealSignedIn, SignedOut as RealSignedOut, UserButton as RealUserButton } from "@clerk/nextjs";

export const isClerkConfigured = Boolean(
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY && process.env.CLERK_SECRET_KEY
);

export const ClerkProvider: any = isClerkConfigured
  ? RealClerkProvider
  : ({ children }: { children: React.ReactNode }) => <>{children}</>;

export const SignedIn: any = isClerkConfigured
  ? RealSignedIn
  : ({ children }: { children: React.ReactNode }) => <>{children}</>;

export const SignedOut: any = isClerkConfigured
  ? RealSignedOut
  : ({ children }: { children: React.ReactNode }) => <></>;

export const UserButton: any = isClerkConfigured ? RealUserButton : () => null;
