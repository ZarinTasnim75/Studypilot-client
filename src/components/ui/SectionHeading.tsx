interface SectionHeadingProps {
  badge: string;
  title: string;
  description: string;
}

export default function SectionHeading({
  badge,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <div className="mx-auto mb-16 max-w-2xl text-center">
      <span className="rounded-full bg-[#F3E8D7] px-4 py-2 text-sm font-semibold text-[#D8A34D]">
        {badge}
      </span>

      <h2 className="mt-6 text-5xl font-semibold text-[#2D2A26]">
        {title}
      </h2>

      <p className="mt-5 text-lg leading-8 text-[#6F665B]">
        {description}
      </p>
    </div>
  );
}