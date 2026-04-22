export interface Lesson {
  id: number;
  title: string;
}

export interface Module {
  id?: number;
  title: string;
  lessons: string[];
}
export interface Course {
  id: number;
  title: string;
  image: string; // Add this line
  category: string;
  description?: string;
  modules: Module[];
}