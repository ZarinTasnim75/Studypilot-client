// src/app/explore/[id]/page.tsx
import { resources } from "@/data/resources";
import SubjectCard from "@/components/explore/SubjectCard";
import ImageGallery from "@/components/explore/ImageGallery";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Star,
  Users,
  Clock3,
  BookOpen,
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
  Globe,
  Award,
  Share2,
} from "lucide-react";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ResourceDetailsPage({ params }: PageProps) {
  const { id } = await params;

  // Find resource by string or number ID match
  const resource = resources.find(
    (item) => item.id.toString() === id
  );

  if (!resource) {
    notFound();
  }

  // Filter related items in the same subject (excluding current item)
  const relatedResources = resources
    .filter((item) => item.subject === resource.subject && item.id !== resource.id)
    .slice(0, 3);

  // Fallback related items if no subject matches exist
  const displayRelated =
    relatedResources.length > 0
      ? relatedResources
      : resources.filter((item) => item.id !== resource.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-[#F8F4EC] pb-24 pt-28 text-[#2D2A26]">
      <div className="mx-auto max-w-7xl px-6">
        {/* Back Link */}
        <Link
          href="/explore"
          className="mb-8 inline-flex items-center gap-2 font-medium text-[#6F665B] transition-colors hover:text-[#1F4B43]"
        >
          <ArrowLeft size={18} />
          <span>Back to Explore</span>
        </Link>

        {/* Main Grid: Media & Specs */}
        <div className="grid gap-10 lg:grid-cols-12">
          
          {/* Left Column: Gallery & Core Details */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* 1. Multiple Images / Media Component */}
            <ImageGallery mainImage={resource.image} title={resource.title} />

            {/* Title & Badge */}
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-[#F6EFE4] px-4 py-1.5 text-xs font-semibold text-[#8B6B3F]">
                  {resource.subject}
                </span>
                <span className="rounded-full bg-[#1F4B43]/10 px-4 py-1.5 text-xs font-semibold text-[#1F4B43]">
                  {resource.difficulty}
                </span>
              </div>

              <h1 className="mt-4 text-3xl font-extrabold text-[#2D2A26] md:text-4xl">
                {resource.title}
              </h1>

              {/* Quick Ratings & Enrollment Stats */}
              <div className="mt-4 flex flex-wrap items-center gap-6 text-sm text-[#6F665B]">
                <div className="flex items-center gap-1.5">
                  <Star size={18} className="fill-[#D8A34D] text-[#D8A34D]" />
                  <span className="font-bold text-[#2D2A26]">{resource.rating}</span>
                  <span>(128 reviews)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Users size={18} />
                  <span>{resource.students} enrolled students</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Globe size={18} />
                  <span>English</span>
                </div>
              </div>
            </div>

            {/* 2. Description / Overview Section */}
            <section className="rounded-[28px] bg-white p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-[#2D2A26]">Description & Overview</h2>
              <p className="mt-4 leading-8 text-[#6F665B]">
                {resource.description}
              </p>
              <p className="mt-4 leading-8 text-[#6F665B]">
                This comprehensive resource is engineered to provide step-by-step guidance,
                practical hands-on exercises, and expert-curated materials to ensure complete mastery
                of the topics covered.
              </p>

              {/* Learning Highlights */}
              <div className="mt-8">
                <h3 className="text-lg font-bold text-[#2D2A26]">What You Will Learn</h3>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {[
                    "Master fundamental and advanced core concepts",
                    "Real-world practical examples and case studies",
                    "Self-assessment quizzes & downloadable resources",
                    "Lifetime access with step-by-step guidance",
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <CheckCircle2 size={18} className="mt-1 shrink-0 text-[#1F4B43]" />
                      <span className="text-sm text-[#6F665B]">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* 3. Key Information / Specifications Section */}
            <section className="rounded-[28px] bg-white p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-[#2D2A26]">Specifications & Key Details</h2>
              
              <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-4">
                <div className="rounded-2xl bg-[#F8F4EC] p-4 text-center">
                  <Clock3 size={24} className="mx-auto text-[#1F4B43]" />
                  <span className="mt-2 block text-xs text-[#6F665B]">Duration</span>
                  <span className="font-bold text-[#2D2A26]">{resource.duration}</span>
                </div>

                <div className="rounded-2xl bg-[#F8F4EC] p-4 text-center">
                  <BookOpen size={24} className="mx-auto text-[#1F4B43]" />
                  <span className="mt-2 block text-xs text-[#6F665B]">Total Lessons</span>
                  <span className="font-bold text-[#2D2A26]">{resource.lessons} Lessons</span>
                </div>

                <div className="rounded-2xl bg-[#F8F4EC] p-4 text-center">
                  <Award size={24} className="mx-auto text-[#1F4B43]" />
                  <span className="mt-2 block text-xs text-[#6F665B]">Certificate</span>
                  <span className="font-bold text-[#2D2A26]">Included</span>
                </div>

                <div className="rounded-2xl bg-[#F8F4EC] p-4 text-center">
                  <ShieldCheck size={24} className="mx-auto text-[#1F4B43]" />
                  <span className="mt-2 block text-xs text-[#6F665B]">Access</span>
                  <span className="font-bold text-[#2D2A26]">Lifetime</span>
                </div>
              </div>
            </section>

            {/* 4. Reviews & Ratings Section */}
            <section className="rounded-[28px] bg-white p-8 shadow-sm">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-[#2D2A26]">Student Reviews</h2>
                <div className="flex items-center gap-2">
                  <Star size={20} className="fill-[#D8A34D] text-[#D8A34D]" />
                  <span className="text-xl font-bold text-[#2D2A26]">{resource.rating}</span>
                  <span className="text-sm text-[#6F665B]">out of 5</span>
                </div>
              </div>

              {/* Sample Review Cards */}
              <div className="mt-6 space-y-6">
                {[
                  {
                    name: "Sarah Jenkins",
                    date: "2 weeks ago",
                    comment: "Extremely well structured! The explanations are clear and easy to follow.",
                    rating: 5,
                  },
                  {
                    name: "Alex Rivera",
                    date: "1 month ago",
                    comment: "Great quality resource. Really helped me prepare for my exams.",
                    rating: 5,
                  },
                ].map((review, idx) => (
                  <div key={idx} className="border-t border-[#EEE8DE] pt-6 first:border-0 first:pt-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1F4B43] text-sm font-bold text-white">
                          {review.name[0]}
                        </div>
                        <div>
                          <h4 className="font-bold text-[#2D2A26]">{review.name}</h4>
                          <span className="text-xs text-[#6F665B]">{review.date}</span>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} size={14} className="fill-[#D8A34D] text-[#D8A34D]" />
                        ))}
                      </div>
                    </div>
                    <p className="mt-3 text-sm text-[#6F665B]">{review.comment}</p>
                  </div>
                ))}
              </div>
            </section>

          </div>

          {/* Right Column: Sticky Sidebar / Call To Action */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 rounded-[28px] bg-white p-6 shadow-sm border border-[#EEE8DE]">
              <div className="flex items-baseline justify-between">
                <span className="text-sm text-[#6F665B]">Price</span>
                <span className="text-4xl font-extrabold text-[#1F4B43]">${resource.price}</span>
              </div>

              <div className="mt-6 space-y-3">
                <button className="w-full rounded-full bg-[#1F4B43] py-4 font-bold text-white transition-colors hover:bg-[#173B35]">
                  Enroll Now
                </button>
                <button className="w-full rounded-full border border-[#EEE8DE] py-3.5 font-semibold text-[#2D2A26] transition-colors hover:bg-[#F8F4EC]">
                  Add to Wishlist
                </button>
              </div>

              <div className="mt-6 space-y-3 border-t border-[#EEE8DE] pt-6 text-sm text-[#6F665B]">
                <div className="flex items-center justify-between">
                  <span>Level</span>
                  <span className="font-medium text-[#2D2A26]">{resource.difficulty}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Subject</span>
                  <span className="font-medium text-[#2D2A26]">{resource.subject}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Guarantee</span>
                  <span className="font-medium text-[#2D2A26]">30-Day Money Back</span>
                </div>
              </div>

              <button className="mt-6 flex w-full items-center justify-center gap-2 text-xs font-semibold text-[#6F665B] hover:text-[#1F4B43]">
                <Share2 size={14} /> Share this resource
              </button>
            </div>
          </div>

        </div>

        {/* 5. Related Items Section */}
        {displayRelated.length > 0 && (
          <section className="mt-20 border-t border-[#EEE8DE] pt-16">
            <h2 className="text-2xl font-bold text-[#2D2A26] md:text-3xl">
              Related Resources
            </h2>
            <p className="mt-2 text-sm text-[#6F665B]">
              Explore other courses and materials in {resource.subject}
            </p>

            <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {displayRelated.map((item) => (
                <SubjectCard key={item.id} resource={item} />
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  );
}