export default function SubjectCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-[28px] bg-white shadow-sm">

      {/* Image */}

      <div className="skeleton h-52 w-full" />

      <div className="space-y-4 p-6">

        <div className="skeleton h-5 w-28" />

        <div className="skeleton h-8 w-3/4" />

        <div className="space-y-2">

          <div className="skeleton h-4 w-full" />

          <div className="skeleton h-4 w-5/6" />

          <div className="skeleton h-4 w-2/3" />

        </div>

        <div className="flex justify-between">

          <div className="skeleton h-5 w-20" />

          <div className="skeleton h-5 w-20" />

        </div>

        <div className="flex justify-between">

          <div className="skeleton h-10 w-24 rounded-full" />

          <div className="skeleton h-8 w-16" />

        </div>

        <div className="skeleton h-12 w-full rounded-full" />

      </div>

    </div>
  );
}