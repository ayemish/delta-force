"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AuthLayout from "@/components/auth/auth-layout";
import AuthCard from "@/components/auth/auth-card";
import AuthInput from "@/components/auth/auth-input";
import AuthButton from "@/components/auth/auth-button";
import GoogleButton from "@/components/auth/google-button";
import Divider from "@/components/auth/divider";
import AuthLink from "@/components/auth/auth-link";

export default function SignInPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      // TODO: Implement actual signin logic
      console.log("Signin data:", formData);
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call
      
      // Redirect to dashboard (role-based routing would happen here)
      router.push("/admin/dashboard");
    } catch (error) {
      setErrors({ general: "Invalid email or password" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    try {
      // TODO: Implement Google OAuth
      console.log("Google signin");
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate OAuth
      router.push("/admin/dashboard");
    } catch (error) {
      setErrors({ general: "An error occurred with Google sign in" });
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <AuthLayout title="Sign In - Delta Force">
      <AuthCard 
        title="Welcome Back" 
        subtitle="Sign in to access your Delta Force dashboard"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Input */}
          <AuthInput
            type="email"
            label="Email Address"
            placeholder="you@example.com"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            error={errors.email}
            disabled={isLoading || isGoogleLoading}
            required
          />

          {/* Password Input */}
          <AuthInput
            type="password"
            label="Password"
            placeholder="••••••••"
            value={formData.password}
            onChange={(e) => handleInputChange("password", e.target.value)}
            error={errors.password}
            disabled={isLoading || isGoogleLoading}
            required
          />

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm text-[var(--t2)] cursor-pointer">
              <input
                type="checkbox"
                checked={formData.remember}
                onChange={(e) => handleInputChange("remember", e.target.checked)}
                className="w-4 h-4 rounded border-[var(--bord2)] bg-[var(--surf3)] text-[var(--gold)] focus:ring-[var(--gold)] focus:ring-offset-0"
                disabled={isLoading || isGoogleLoading}
              />
              Remember me
            </label>
            
            <AuthLink href="/reset-password">
              Forgot password?
            </AuthLink>
          </div>

          {/* General Error */}
          {errors.general && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-red-400 text-sm">
              {errors.general}
            </div>
          )}

          {/* Submit Button */}
          <AuthButton
            type="submit"
            loading={isLoading}
            disabled={isLoading || isGoogleLoading}
          >
            Sign In
          </AuthButton>
        </form>

        <Divider />

        {/* Google Sign In */}
        <GoogleButton
          onClick={handleGoogleSignIn}
          loading={isGoogleLoading}
          disabled={isLoading || isGoogleLoading}
        >
          Continue with Google
        </GoogleButton>

        {/* Sign Up Link */}
        <div className="text-center text-[var(--t2)] text-sm">
          Don't have an account?{" "}
          <AuthLink href="/signup">
            Sign up
          </AuthLink>
        </div>
      </AuthCard>
    </AuthLayout>
  );
}
