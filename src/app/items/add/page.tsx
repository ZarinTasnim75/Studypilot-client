"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserSession } from "@/hooks/use-user-session";
import { Loader2, PlusCircle, ArrowLeft, Image as ImageIcon } from "lucide-react";
import Link from "next/link";

export default function AddItemPage() {
  const router = useRouter();
  const { data: session, isLoading } = useUserSession();

  const [formData, setFormData] = useState({
    title: "",
    shortDescription: "",
    fullDescription: "",
    price: "",
    priority: "medium",
    imageUrl: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  // Protected Route Check
  useEffect(() => {
    if (!isLoading && !session?.user) {
      router.push("/login");
    }
  }, [session, isLoading, router]);

  if (isLoading || !session?.user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F8F4EC]">
        <div className="flex items-center gap-3 rounded-2xl bg-white p-6 shadow-sm border border-[#EEE8DE]">
          <Loader2 className="h-6 w-6 animate-spin text-[#1F4B43]" />
          <span className="text-sm font-semibold text-[#2D2A26]">Checking session...</span>
        </div>
      </div>
    );
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call/DB save
      await new Promise((resolve) => setTimeout(resolve, 800));
      
      setSuccessMsg(true);
      setTimeout(() => {
        router.push("/explore");
      }, 1200);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F4EC] px-4 py-12 pt-28 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">
        <Link
          href="/explore"
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-[#6F665B] hover:text-[#1F4B43]"
        >
          <ArrowLeft size={16} />
          Back to Explore
        </Link>

        <div className="rounded-3xl border border-[#EEE8DE] bg-white p-8 shadow-sm">
          <div className="flex items-center gap-3 border-b border-[#EEE8DE] pb-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F8F4EC] text-[#1F4B43]">
              <PlusCircle size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-[#2D2A26]">Add New Resource</h1>
              <p className="text-xs text-[#6F665B]">Share a study guide, course, or material</p>
            </div>
          </div>

          {successMsg ? (
            <div className="my-8 rounded-2xl bg-emerald-50 p-6 text-center border border-emerald-200">
              <p className="text-base font-bold text-emerald-800">Item Added Successfully!</p>
              <p className="mt-1 text-xs text-emerald-600">Redirecting to Explore...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              {/* Title */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#6F665B]">
                  Title *
                </label>
                <input
                  type="text"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. Advanced Organic Chemistry Notes"
                  className="mt-1.5 w-full rounded-xl border border-[#EEE8DE] bg-[#F8F4EC]/50 px-4 py-3 text-sm font-medium text-[#2D2A26] outline-none focus:border-[#1F4B43] focus:bg-white"
                />
              </div>

              {/* Short Description */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#6F665B]">
                  Short Description *
                </label>
                <input
                  type="text"
                  name="shortDescription"
                  required
                  maxLength={120}
                  value={formData.shortDescription}
                  onChange={handleChange}
                  placeholder="A quick 1-line overview of what's included"
                  className="mt-1.5 w-full rounded-xl border border-[#EEE8DE] bg-[#F8F4EC]/50 px-4 py-3 text-sm font-medium text-[#2D2A26] outline-none focus:border-[#1F4B43] focus:bg-white"
                />
              </div>

              {/* Full Description */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#6F665B]">
                  Full Description *
                </label>
                <textarea
                  name="fullDescription"
                  required
                  rows={4}
                  value={formData.fullDescription}
                  onChange={handleChange}
                  placeholder="Provide comprehensive details about topics covered, target audience, etc."
                  className="mt-1.5 w-full rounded-xl border border-[#EEE8DE] bg-[#F8F4EC]/50 px-4 py-3 text-sm font-medium text-[#2D2A26] outline-none focus:border-[#1F4B43] focus:bg-white resize-none"
                />
              </div>

              {/* Price & Priority Grid */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#6F665B]">
                    Price ($) *
                  </label>
                  <input
                    type="number"
                    name="price"
                    required
                    min="0"
                    step="0.01"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="0.00"
                    className="mt-1.5 w-full rounded-xl border border-[#EEE8DE] bg-[#F8F4EC]/50 px-4 py-3 text-sm font-medium text-[#2D2A26] outline-none focus:border-[#1F4B43] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#6F665B]">
                    Priority / Level *
                  </label>
                  <select
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    className="mt-1.5 w-full rounded-xl border border-[#EEE8DE] bg-[#F8F4EC]/50 px-4 py-3 text-sm font-medium text-[#2D2A26] outline-none focus:border-[#1F4B43] focus:bg-white"
                  >
                    <option value="low">Low / Beginner</option>
                    <option value="medium">Medium / Intermediate</option>
                    <option value="high">High / Advanced</option>
                  </select>
                </div>
              </div>

              {/* Optional Image URL */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#6F665B]">
                  Image URL (Optional)
                </label>
                <div className="relative mt-1.5">
                  <input
                    type="url"
                    name="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleChange}
                    placeholder="https://example.com/image.jpg"
                    className="w-full rounded-xl border border-[#EEE8DE] bg-[#F8F4EC]/50 py-3 pl-10 pr-4 text-sm font-medium text-[#2D2A26] outline-none focus:border-[#1F4B43] focus:bg-white"
                  />
                  <ImageIcon size={18} className="absolute left-3 top-3.5 text-[#6F665B]" />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-[#1F4B43] py-4 font-bold text-white transition-all hover:bg-[#173B35] disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      <span>Adding Item...</span>
                    </>
                  ) : (
                    <span>Submit & Publish</span>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}