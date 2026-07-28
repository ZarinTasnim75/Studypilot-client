import SubjectCardSkeleton from "./SubjectCardSkeleton";

export default function SubjectGridSkeleton() {
  return (
    <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <SubjectCardSkeleton key={index} />
      ))}
    </div>
  );
}