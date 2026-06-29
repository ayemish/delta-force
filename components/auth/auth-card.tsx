import type { ReactNode } from "react";

interface AuthCardProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
}

export default function AuthCard({ children, title, subtitle }: AuthCardProps) {
  return (
    <div className="relative">
      {/* Glass morphism card */}
      <div className="relative overflow-hidden bg-gradient-to-br from-black/80 to-black/60 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-2xl transition-all duration-300 hover:shadow-3xl animate-slide-up">
        {/* Top accent line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[var(--gold)] via-[var(--gold-l)] to-[var(--gold-d)] opacity-50 rounded-t-[var(--r2)]" />
        
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-[var(--t1)] tracking-[-0.8px] mb-2">
            {title}
          </h1>
          {subtitle && (
            <p className="text-[var(--t2)] text-lg leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>
        
        {/* Content */}
        <div className="space-y-6">
          {children}
        </div>
      </div>
    </div>
  );
}
