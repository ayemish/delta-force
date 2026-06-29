"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import AuthLayout from "@/components/auth/auth-layout";
import AuthCard from "@/components/auth/auth-card";
import AuthInput from "@/components/auth/auth-input";
import AuthButton from "@/components/auth/auth-button";
import AuthLink from "@/components/auth/auth-link";
import { CheckCircle, AlertCircle, Eye, EyeOff, ArrowLeft } from "lucide-react";

function ConfirmResetPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [tokenValid, setTokenValid] = useState<boolean | null>(null);

  useEffect(() => {
    // TODO: Validate reset token with backend
    const token = searchParams.get("token");
    const email = searchParams.get("email");
    
    if (!token || !email) {
      setTokenValid(false);
      setErrors({ general: "Invalid reset link. Please request a new password reset." });
    } else {
      // Simulate token validation
      setTokenValid(true);
    }
  }, [searchParams]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = "Password must contain uppercase, lowercase, and number";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      // TODO: Implement actual password reset logic
      const token = searchParams.get("token");
      const email = searchParams.get("email");
      
      console.log("Reset password:", { email, token, password: formData.password });
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call
      
      // Redirect to sign in with success message
      router.push("/signin?message=Password reset successfully");
    } catch (error) {
      setErrors({ general: "An error occurred. Please try again or request a new reset link." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  if (tokenValid === null) {
    return (
      <AuthLayout title="Reset Password - Delta Force">
        <AuthCard title="Validating..." subtitle="Please wait while we validate your reset link">
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--gold)]"></div>
          </div>
        </AuthCard>
      </AuthLayout>
    );
  }

  if (tokenValid === false) {
    return (
      <AuthLayout title="Reset Password - Delta Force">
        <AuthCard 
          title="Invalid Reset Link" 
          subtitle="This reset link is invalid or has expired"
        >
          <div className="text-center space-y-6">
            {/* Error Icon */}
            <div className="mx-auto w-16 h-16 bg-red-500/10 border border-red-500/20 rounded-full flex items-center justify-center">
              <AlertCircle className="w-8 h-8 text-red-400" />
            </div>
            
            {/* Error Message */}
            <div className="space-y-3">
              <p className="text-[var(--t1)] text-sm leading-relaxed">
                This password reset link is invalid or has expired.
              </p>
              <p className="text-[var(--t2)] text-sm leading-relaxed">
                Please request a new password reset link to continue.
              </p>
            </div>

            {/* Actions */}
            <div className="space-y-4">
              <AuthLink href="/reset-password" className="block">
                <AuthButton variant="secondary" fullWidth>
                  Request New Reset Link
                </AuthButton>
              </AuthLink>
              
              <div className="text-center text-[var(--t2)] text-sm">
                <AuthLink href="/signin">
                  Back to sign in
                </AuthLink>
              </div>
            </div>
          </div>
        </AuthCard>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout title="Reset Password - Delta Force">
      <AuthCard 
        title="Create New Password" 
        subtitle="Enter your new password below"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Password Input */}
          <div className="relative">
            <AuthInput
              type={showPassword ? "text" : "password"}
              label="New Password"
              placeholder="Enter new password"
              value={formData.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              error={errors.password}
              disabled={isLoading}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-[var(--t3)] hover:text-[var(--t1)] transition-colors"
              disabled={isLoading}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          {/* Confirm Password Input */}
          <div className="relative">
            <AuthInput
              type={showConfirmPassword ? "text" : "password"}
              label="Confirm New Password"
              placeholder="Confirm new password"
              value={formData.confirmPassword}
              onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
              error={errors.confirmPassword}
              disabled={isLoading}
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-9 text-[var(--t3)] hover:text-[var(--t1)] transition-colors"
              disabled={isLoading}
            >
              {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          {/* Password Requirements */}
          <div className="bg-[var(--surf3)] border border-[var(--bord)] rounded-lg p-4 space-y-2">
            <div className="text-xs text-[var(--t2)] font-semibold uppercase tracking-[0.5px] mb-3">
              Password Requirements:
            </div>
            <div className="space-y-1">
              <div className={`text-xs flex items-center gap-2 ${formData.password.length >= 8 ? "text-[var(--grn)]" : "text-[var(--t3)]"}`}>
                <div className={`w-1 h-1 rounded-full ${formData.password.length >= 8 ? "bg-[var(--grn)]" : "bg-[var(--t3)]"}`} />
                At least 8 characters
              </div>
              <div className={`text-xs flex items-center gap-2 ${/[a-z]/.test(formData.password) ? "text-[var(--grn)]" : "text-[var(--t3)]"}`}>
                <div className={`w-1 h-1 rounded-full ${/[a-z]/.test(formData.password) ? "bg-[var(--grn)]" : "bg-[var(--t3)]"}`} />
                One lowercase letter
              </div>
              <div className={`text-xs flex items-center gap-2 ${/[A-Z]/.test(formData.password) ? "text-[var(--grn)]" : "text-[var(--t3)]"}`}>
                <div className={`w-1 h-1 rounded-full ${/[A-Z]/.test(formData.password) ? "bg-[var(--grn)]" : "bg-[var(--t3)]"}`} />
                One uppercase letter
              </div>
              <div className={`text-xs flex items-center gap-2 ${/\d/.test(formData.password) ? "text-[var(--grn)]" : "text-[var(--t3)]"}`}>
                <div className={`w-1 h-1 rounded-full ${/\d/.test(formData.password) ? "bg-[var(--grn)]" : "bg-[var(--t3)]"}`} />
                One number
              </div>
            </div>
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
            disabled={isLoading}
          >
            Reset Password
          </AuthButton>
        </form>

        {/* Back to Sign In */}
        <div className="text-center text-[var(--t2)] text-sm">
          <AuthLink href="/signin">
            <ArrowLeft /> Back to sign in
          </AuthLink>
        </div>
      </AuthCard>
    </AuthLayout>
  );
}

export default function ConfirmResetPasswordPage() {
  return (
    <Suspense fallback={
      <AuthLayout title="Reset Password - Delta Force">
        <AuthCard title="Loading..." subtitle="Please wait">
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--gold)]"></div>
          </div>
        </AuthCard>
      </AuthLayout>
    }>
      <ConfirmResetPasswordContent />
    </Suspense>
  );
}
