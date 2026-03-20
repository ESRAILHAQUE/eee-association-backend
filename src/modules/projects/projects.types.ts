export type ProjectCategory =
  | "iot"
  | "matlab"
  | "power"
  | "embedded"
  | "software"
  | "research"
  | "other";

export interface CreateProjectBody {
  title: string;
  abstract: string;
  category?: ProjectCategory;
  githubUrl?: string;
  docUrl?: string;
}

export interface ProjectResponse {
  id: string;
  title: string;
  abstract: string;
  category: ProjectCategory;
  batch: string | null;
  githubUrl: string | null;
  docUrl: string | null;
  likes: number;
  createdAt: Date;
  user: { id: string; fullName: string };
}
