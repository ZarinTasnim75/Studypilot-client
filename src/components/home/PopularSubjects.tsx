import Image from "next/image";

const subjects = [
  {
    id: 1,
    title: "Computer Science",
    description: "Algorithms, DSA, Web Development and AI.",
    image: "/subjects/computer.jpg",
    notes: "2.4K Notes",
    level: "Beginner",
  },
  {
    id: 2,
    title: "Mathematics",
    description: "Calculus, Algebra, Statistics and Logic.",
    image: "/subjects/math.jpg",
    notes: "1.8K Notes",
    level: "Intermediate",
  },
  {
    id: 3,
    title: "Physics",
    description: "Mechanics, Electricity and Modern Physics.",
    image: "/subjects/physics.jpg",
    notes: "980 Notes",
    level: "Advanced",
  },
  {
    id: 4,
    title: "Business",
    description: "Finance, Economics and Marketing.",
    image: "/subjects/business.jpg",
    notes: "760 Notes",
    level: "Beginner",
  },
];

export default function PopularSubjects() {
  return (
    <section className="py-24 bg-[#FFFDF9]">
      <div className="max-w-7xl mx-auto px-5">

        <div className="text-center mb-16">
          <span className="badge badge-warning badge-lg">
            Popular Subjects
          </span>

          <h2 className="text-5xl font-bold mt-5">
            Learn Any Subject with AI
          </h2>

          <p className="max-w-2xl mx-auto mt-5 text-lg opacity-70">
            StudyPilot covers school, university, and professional subjects with
            AI-generated notes and personalized learning assistance.
          </p>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">
          {subjects.map((subject) => (
            <div
              key={subject.id}
              className="card bg-base-100 shadow-lg hover:shadow-2xl duration-300"
            >
              <figure className="h-56 overflow-hidden">
                <Image
                  src={subject.image}
                  alt={subject.title}
                  width={500}
                  height={400}
                  className="w-full h-full object-cover hover:scale-105 duration-500"
                />
              </figure>

              <div className="card-body">

                <h2 className="card-title">
                  {subject.title}
                </h2>

                <p>
                  {subject.description}
                </p>

                <div className="flex justify-between mt-3 text-sm opacity-70">
                  <span>{subject.notes}</span>
                  <span>{subject.level}</span>
                </div>

                <div className="card-actions mt-5">
                  <button className="btn btn-outline btn-success rounded-full w-full">
                    View Details
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}