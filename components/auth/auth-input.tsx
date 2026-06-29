import type { InputHTMLAttributes } from "react";
import { forwardRef } from "react";

interface AuthInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

const AuthInput = forwardRef<HTMLInputElement, AuthInputProps>(
  ({ label, error, icon, className = "", ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label className="block text-xs text-[var(--t2)] uppercase tracking-[0.5px] font-semibold">
            {label}
          </label>
        )}
        <div className="relative">
          <input
            ref={ref}
            className={`
              w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 
              text-gray-100 text-sm placeholder-gray-400 
              transition-all duration-200 outline-none
              focus:border-yellow-500 focus:shadow-[0_0_0_4px_rgba(201,161,74,0.08)]
              hover:border-gray-500
              ${error ? "border-red-400 focus:border-red-400 focus:shadow-[0_0_0_4px_rgba(216,124,114,0.08)]" : ""}
              ${icon ? "pl-12" : ""}
              ${className}
            `}
            {...props}
          />
          {icon && (
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[var(--t3)]">
              {icon}
            </div>
          )}
        </div>
        {error && (
          <p className="text-xs text-[var(--red)] font-medium flex items-center gap-1">
            <span className="text-xs">⚠</span>
            {error}
          </p>
        )}
      </div>
    );
  }
);

AuthInput.displayName = "AuthInput";

export default AuthInput;
