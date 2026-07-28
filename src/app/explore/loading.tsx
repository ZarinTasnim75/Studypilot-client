import SubjectGridSkeleton from "@/components/explore/SubjectGridSkeleton";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function Loading() {
  return (
    <>
      <Navbar />

      <main className="bg-[#F8F4EC] pt-32 pb-20">

        <div className="mx-auto max-w-7xl px-6">

          <div className="mb-10">

            <div className="skeleton h-12 w-80" />

            <div className="mt-4 skeleton h-5 w-[500px]" />

          </div>

          <SubjectGridSkeleton />

        </div>

      </main>

      <Footer />
    </>
  );
}