export interface Resource {
  id: number;

  title: string;

  description: string;

  subject: string;

  difficulty: "Beginner" | "Intermediate" | "Advanced";

  duration: string;

  lessons: number;

  rating: number;

  students: number;

  price: number;

  image: string;
}