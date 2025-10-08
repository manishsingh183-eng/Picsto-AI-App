import React from "react";

export const isClerkConfigured = Boolean(
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY && process.env.CLERK_SECRET_KEY
);

let _clerkMod: any | null = null;
const loadClerk = () => {
  if (_clerkMod) return _clerkMod;
  try {
    // Use require to avoid evaluating Clerk at module load time
    // This only loads when we actually render the component and Clerk is configured
    // Using require here keeps imports out of the module scope
    // @ts-ignore
    _clerkMod = require("@clerk/nextjs");
  } catch (e) {
    _clerkMod = {};
  }
  return _clerkMod;
};

export const ClerkProvider = ({ children, ...props }: any) => {
  if (!isClerkConfigured) return <>{children}</>;
  const { ClerkProvider } = loadClerk();
  const Real = ClerkProvider ?? (({ children: c }: any) => <>{c}</>);
  return <Real {...props}>{children}</Real>;
};

export const SignedIn = ({ children, ...props }: any) => {
  if (!isClerkConfigured) return <>{children}</>;
  const { SignedIn } = loadClerk();
  const Real = SignedIn ?? (({ children: c }: any) => <>{c}</>);
  return <Real {...props}>{children}</Real>;
};

export const SignedOut = ({ children, ...props }: any) => {
  if (!isClerkConfigured) return <></>;
  const { SignedOut } = loadClerk();
  const Real = SignedOut ?? (({ children: _ }: any) => <></>);
  return <Real {...props}>{children}</Real>;
};

export const UserButton = (props: any) => {
  if (!isClerkConfigured) return null;
  const { UserButton } = loadClerk();
  const Real = UserButton ?? (() => null);
  return <Real {...props} />;
};
