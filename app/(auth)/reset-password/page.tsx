"use client";

import { useState } from "react";
import AuthLayout from "@/components/auth/auth-layout";
import AuthCard from "@/components/auth/auth-card";
import AuthInput from "@/components/auth/auth-input";
import AuthButton from "@/components/auth/auth-button";
import AuthLink from "@/components/auth/auth-link";
import { Mail, CheckCircle } from "lucide-react";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      // TODO: Implement actual password reset request logic
      console.log("Reset password request for:", email);
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call
      
      setIsSuccess(true);
    } catch (error) {
      setErrors({ general: "An error occurred. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (value: string) => {
    setEmail(value);
    // Clear error when user starts typing
    if (errors.email) {
      setErrors(prev => ({ ...prev, email: "" }));
    }
  };

  if (isSuccess) {
    return (
      <AuthLayout title="Reset Password - Delta Force">
        <AuthCard 
          title="Check Your Email" 
          subtitle="We've sent you instructions to reset your password"
        >
          <div className="text-center space-y-6">
            {/* Success Icon */}
            <div className="mx-auto w-16 h-16 bg-green-500/10 border border-green-500/20 rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-green-400" />
            </div>
            
            {/* Success Message */}
            <div className="space-y-3">
              <p className="text-[var(--t1)] text-sm leading-relaxed">
                We've sent a password reset link to:
              </p>
              <p className="text-[var(--gold)] font-medium text-sm">
                {email}
              </p>
              <p className="text-[var(--t2)] text-sm leading-relaxed">
                Click the link in the email to create a new password. If you don't see it, check your spam folder.
              </p>
            </div>

            {/* Actions */}
            <div className="space-y-4">
              <AuthButton
                variant="secondary"
                onClick={() => setIsSuccess(false)}
                disabled={isLoading}
              >
                Send another email
              </AuthButton>
              
              <div className="text-center text-[var(--t2)] text-sm">
                Remember your password?{" "}
                <AuthLink href="/signin">
                  Sign in
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
        title="Reset Password" 
        subtitle="Enter your email to receive password reset instructions"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Input */}
          <AuthInput
            type="email"
            label="Email Address"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => handleInputChange(e.target.value)}
            error={errors.email}
            disabled={isLoading}
            required
            icon={<Mail className="w-4 h-4 text-[var(--t3)]" />}
          />

          {/* Instructions */}
          <div className="bg-[var(--surf3)] border border-[var(--bord)] rounded-lg p-4 text-[var(--t2)] text-sm leading-relaxed">
            <div className="flex items-start gap-3">
              <Mail className="w-4 h-4 text-[var(--gold)] mt-0.5 flex-shrink-0" />
              <div>
                We'll send you an email with a link to reset your password. The link will expire in 24 hours.
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
            Send Reset Link
          </AuthButton>
        </form>

        {/* Back to Sign In */}
        <div className="text-center text-[var(--t2)] text-sm">
          <AuthLink href="/signin">
            ← Back to sign in
          </AuthLink>
        </div>
      </AuthCard>
    </AuthLayout>
  );
}
