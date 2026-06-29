"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AuthLayout from "@/components/auth/auth-layout";
import AuthCard from "@/components/auth/auth-card";
import AuthInput from "@/components/auth/auth-input";
import AuthButton from "@/components/auth/auth-button";
import GoogleButton from "@/components/auth/google-button";
import RoleSelector, { type UserRole } from "@/components/auth/role-selector";
import Divider from "@/components/auth/divider";
import AuthLink from "@/components/auth/auth-link";

export default function SignUpPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    role: "admin" as UserRole,
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
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.role) {
      newErrors.role = "Please select a role";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      // TODO: Implement actual signup logic
      console.log("Signup data:", formData);
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call
      
      // Redirect to dashboard or success page
      router.push("/admin/dashboard");
    } catch (error) {
      setErrors({ general: "An error occurred during signup" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setIsGoogleLoading(true);
    try {
      // TODO: Implement Google OAuth
      console.log("Google signup for role:", formData.role);
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate OAuth
      router.push("/admin/dashboard");
    } catch (error) {
      setErrors({ general: "An error occurred with Google signup" });
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string | UserRole) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <AuthLayout title="Sign Up - Delta Force">
      <AuthCard 
        title="Create Account" 
        subtitle="Join Delta Force to manage properties efficiently"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Role Selection */}
          <RoleSelector
            value={formData.role}
            onChange={(role) => handleInputChange("role", role)}
            error={errors.role}
          />

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

          {/* Confirm Password Input */}
          <AuthInput
            type="password"
            label="Confirm Password"
            placeholder="••••••••"
            value={formData.confirmPassword}
            onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
            error={errors.confirmPassword}
            disabled={isLoading || isGoogleLoading}
            required
          />

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
            Create Account
          </AuthButton>
        </form>

        <Divider />

        {/* Google Sign Up */}
        <GoogleButton
          onClick={handleGoogleSignUp}
          loading={isGoogleLoading}
          disabled={isLoading || isGoogleLoading}
        >
          Continue with Google
        </GoogleButton>

        {/* Sign In Link */}
        <div className="text-center text-[var(--t2)] text-sm">
          Already have an account?{" "}
          <AuthLink href="/signin">
            Sign in
          </AuthLink>
        </div>
      </AuthCard>
    </AuthLayout>
  );
}
