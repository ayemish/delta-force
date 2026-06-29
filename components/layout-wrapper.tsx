"use client";

import { usePathname } from "next/navigation";
import Shell from "@/components/shell";
import Background from "@/components/background";
import CustomCursor from "@/components/custom-cursor";
import ToastProvider from "@/components/toast-provider";
import type { ReactNode } from "react";

interface LayoutWrapperProps {
  children: ReactNode;
}

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  const pathname = usePathname();
  const isAuthRoute = pathname?.startsWith('/signin') || pathname?.startsWith('/signup') || pathname?.startsWith('/reset-password');

  if (isAuthRoute) {
    return (
      <ToastProvider>
        {children}
        <Background />
        <CustomCursor />
      </ToastProvider>
    );
  }

  return (
    <ToastProvider>
      <Shell>{children}</Shell>
      <Background />
      <CustomCursor />
    </ToastProvider>
  );
}
