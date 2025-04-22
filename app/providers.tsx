"use client";

import { SessionProvider } from "next-auth/react";

type Props = {
  children?: React.ReactNode;
};

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return <SessionProvider>{children}</SessionProvider>;
};
