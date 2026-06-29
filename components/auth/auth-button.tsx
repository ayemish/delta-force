import type { ButtonHTMLAttributes } from "react";
import { forwardRef } from "react";
import { Loader2 } from "lucide-react";

interface AuthButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  loading?: boolean;
  fullWidth?: boolean;
}

const AuthButton = forwardRef<HTMLButtonElement, AuthButtonProps>(
  ({ 
    variant = "primary", 
    loading = false, 
    fullWidth = true, 
    children, 
    disabled, 
    className = "", 
    ...props 
  }, ref) => {
    const baseClasses = "inline-flex items-center justify-center gap-2 rounded-[11px] font-semibold text-sm transition-all duration-200 cursor-pointer outline-none font-inherit border disabled:opacity-50 disabled:cursor-not-allowed";
    
    const variants = {
      primary: "bg-gradient-to-r from-[var(--gold-l)] via-[var(--gold)] to-[var(--gold-d)] text-[#1A1305] border-transparent px-6 py-3 shadow-[0_4px_14px_rgba(201,161,74,0.25)] hover:transform hover:translateY-[-2px] hover:shadow-[0_8px_28px_rgba(201,161,74,0.45)] focus:shadow-[0_0_0_4px_rgba(201,161,74,0.3)]",
      secondary: "bg-[var(--surf2)] border-[var(--bord2)] text-[var(--t1)] px-6 py-3 hover:border-[var(--gold)] hover:text-[var(--gold)] hover:shadow-[0_0_0_4px_rgba(201,161,74,0.07)] hover:transform hover:translateY-[-1px)] focus:shadow-[0_0_0_4px_rgba(201,161,74,0.3)]"
    };

    return (
      <button
        ref={ref}
        className={`
          ${baseClasses}
          ${variants[variant]}
          ${fullWidth ? "w-full" : ""}
          ${loading ? "opacity-50 cursor-not-allowed" : ""}
          ${className}
        `}
        disabled={disabled || loading}
        {...props}
      >
        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
        {children}
      </button>
    );
  }
);

AuthButton.displayName = "AuthButton";

export default AuthButton;
