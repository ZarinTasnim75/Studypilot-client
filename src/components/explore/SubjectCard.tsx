import Image from "next/image";
import Link from "next/link";
import { Star, Users, Clock3, BookOpen } from "lucide-react";
import { Resource } from "@/types/resource";

interface SubjectCardProps {
  resource: Resource;
}

export default function SubjectCard({
  resource,
}: SubjectCardProps) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-[28px] bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
      {/* Image */}
      <Image
        src={resource.image}
        alt={resource.title}
        width={600}
        height={400}
        className="h-52 w-full object-cover"
      />

      {/* Content */}
      <div className="flex flex-1 flex-col p-6">
        {/* Subject */}
        <span className="w-fit rounded-full bg-[#F6EFE4] px-3 py-1 text-xs font-semibold text-[#8B6B3F]">
          {resource.subject}
        </span>

        {/* Title */}
        <h3 className="mt-3 line-clamp-2 text-2xl font-bold text-[#2D2A26]">
          {resource.title}
        </h3>

        {/* Description */}
        <p className="mt-3 line-clamp-3 text-sm leading-7 text-[#6F665B]">
          {resource.description}
        </p>

        {/* Rating & Students */}
        <div className="mt-5 flex items-center justify-between border-b border-[#EEE8DE] pb-4 text-sm">
          <div className="flex items-center gap-2">
            <Star
              size={18}
              className="fill-[#D8A34D] text-[#D8A34D]"
            />
            <span>{resource.rating}</span>
          </div>

          <div className="flex items-center gap-2">
            <Users size={18} />
            <span>{resource.students}</span>
          </div>
        </div>

        {/* Duration & Lessons */}
        <div className="mt-4 flex items-center justify-between text-sm text-[#6F665B]">
          <div className="flex items-center gap-2">
            <Clock3 size={16} />
            <span>{resource.duration}</span>
          </div>

          <div className="flex items-center gap-2">
            <BookOpen size={16} />
            <span>{resource.lessons} Lessons</span>
          </div>
        </div>

        {/* Difficulty & Price */}
        <div className="mt-5 flex items-center justify-between">
          <span className="rounded-full bg-[#1F4B43]/10 px-4 py-2 text-sm font-medium text-[#1F4B43]">
            {resource.difficulty}
          </span>

          <span className="text-2xl font-bold text-[#1F4B43]">
            ${resource.price}
          </span>
        </div>

        {/* Button */}
        <Link
          href={`/explore/${resource.id}`}
          className="btn mt-6 rounded-full border-none bg-[#1F4B43] text-white hover:bg-[#173B35]"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}