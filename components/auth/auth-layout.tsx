import type { ReactNode } from "react";
import Background from "@/components/background";
import CustomCursor from "@/components/custom-cursor";

interface AuthLayoutProps {
  children: ReactNode;
  title?: string;
}

export default function AuthLayout({ children, title }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Background effects */}
      <div className="fixed inset-0 z-0">
        <Background />
      </div>
      
      {/* Cinematic vignette */}
      <div className="fixed inset-0 z-10 pointer-events-none bg-gradient-radial from-transparent via-transparent to-black/80" />
      
      {/* Main content */}
      <div className="relative z-20 flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-[440px] animate-fade-in">
          {children}
        </div>
      </div>
      
      {/* Custom cursor */}
      <CustomCursor />
    </div>
  );
}
