export interface CreateClubBody {
  name: string;
  description: string;
  logoUrl?: string;
}

export interface ClubResponse {
  id: string;
  name: string;
  description: string;
  logoUrl: string | null;
  isActive: boolean;
  createdAt: Date;
  _count: { members: number };
}
