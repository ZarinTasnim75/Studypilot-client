import SubjectGrid from "@/components/explore/SubjectGrid";

export default function ExplorePage() {
  return (
    <>
      <main className="bg-[#F8F4EC] pt-28 pb-20">

        <div className="mx-auto max-w-7xl px-6">

          <div className="mb-14">

            <h1 className="text-5xl font-bold text-[#2D2A26]">
              Explore Study Resources
            </h1>

            <p className="mt-4 max-w-2xl text-lg text-[#6F665B]">
              Discover AI-powered study materials across multiple subjects.
              Search, filter, and find the perfect resource for your learning
              journey.
            </p>

          </div>

          <SubjectGrid />

        </div>

      </main>
    </>
  );
}