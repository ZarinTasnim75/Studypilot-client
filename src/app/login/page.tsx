"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "../../../lib/auth-client";
import { Mail, Lock, Eye, EyeOff, AlertCircle, Sparkles, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Form Validation
  const validateForm = (): boolean => {
    const newErrors: { email?: string; password?: string } = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      newErrors.email = "Email address is required";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Demo Credentials Auto-Fill
  const handleDemoLogin = (): void => {
    setEmail("demo@studypilot.com");
    setPassword("demo123456");
    setErrors({});
  };

  // Submit Handler via Better Auth
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});

    await authClient.signIn.email(
      {
        email,
        password,
      },
      {
        onRequest: () => {
          setIsLoading(true);
        },
        onSuccess: async () => {
          await authClient.getSession();

          router.push("/explore");
          router.refresh();
        },
        onError: (ctx) => {
          setIsLoading(false);
          setErrors({ general: ctx.error.message || "Invalid credentials. Please try again." });
        },
      }
    );
  };

  // Google Social Sign-In via Better Auth
  const handleGoogleLogin = async (): Promise<void> => {
    try {
      const origin = typeof window !== "undefined" ? window.location.origin : "http://localhost:3000";

      await authClient.signIn.social({
        provider: "google",
        callbackURL: `${origin}/explore`,
      });
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Failed to initiate Google sign-in";
      setErrors({ general: errorMessage });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F8F4EC] px-4 py-28 text-[#2D2A26]">
      <div className="w-full max-w-md rounded-[28px] border border-[#EEE8DE] bg-white p-8 shadow-sm md:p-10">

        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-[#2D2A26]">Welcome Back</h1>
          <p className="mt-2 text-sm text-[#6F665B]">
            Sign in to access your StudyPilot dashboard
          </p>
        </div>

        {/* Backend Error Alert */}
        {errors.general && (
          <div className="mt-6 flex items-center gap-2 rounded-2xl border border-red-100 bg-red-50 p-4 text-sm text-red-600">
            <AlertCircle size={18} className="shrink-0" />
            <span>{errors.general}</span>
          </div>
        )}

        {/* Demo Login Button */}
        <div className="mt-6">
          <button
            type="button"
            onClick={handleDemoLogin}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#F6EFE4] px-4 py-3 text-xs font-bold text-[#8B6B3F] transition-all hover:bg-[#EFE5D5]"
          >
            <Sparkles size={16} />
            Auto-fill Demo Credentials
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">

          {/* Email */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#6F665B]">
              Email Address
            </label>
            <div className="relative mt-2">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6F665B]" size={18} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className={`w-full rounded-2xl border py-3.5 pl-11 pr-4 text-sm outline-none transition-all ${errors.email
                  ? "border-red-400 bg-red-50/30"
                  : "border-[#EEE8DE] focus:border-[#1F4B43] focus:ring-2 focus:ring-[#1F4B43]/10"
                  }`}
              />
            </div>
            {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#6F665B]">
                Password
              </label>
            </div>
            <div className="relative mt-2">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6F665B]" size={18} />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className={`w-full rounded-2xl border py-3.5 pl-11 pr-11 text-sm outline-none transition-all ${errors.password
                  ? "border-red-400 bg-red-50/30"
                  : "border-[#EEE8DE] focus:border-[#1F4B43] focus:ring-2 focus:ring-[#1F4B43]/10"
                  }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6F665B] hover:text-[#2D2A26]"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password}</p>}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-[#1F4B43] py-4 font-bold text-white transition-colors hover:bg-[#173B35] disabled:opacity-50"
          >
            {isLoading ? "Signing in..." : "Sign In"}
            {!isLoading && <ArrowRight size={18} />}
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center gap-4">
          <div className="h-[1px] flex-1 bg-[#EEE8DE]" />
          <span className="text-xs font-medium text-[#6F665B]">OR</span>
          <div className="h-[1px] flex-1 bg-[#EEE8DE]" />
        </div>

        {/* Social Google Login */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="flex w-full items-center justify-center gap-3 rounded-full border border-[#EEE8DE] bg-white py-3.5 text-sm font-semibold text-[#2D2A26] transition-colors hover:bg-[#F8F4EC]"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
          </svg>
          Continue with Google
        </button>

        {/* Footer */}
        <p className="mt-8 text-center text-sm text-[#6F665B]">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="font-bold text-[#1F4B43] hover:underline">
            Register here
          </Link>
        </p>

      </div>
    </div>
  );
}