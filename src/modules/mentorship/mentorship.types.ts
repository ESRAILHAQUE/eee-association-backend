export interface RegisterMentorBody {
  expertise: string[];
  bio: string;
}

export interface RequestSessionBody {
  mentorId: string;
  topic: string;
  scheduledAt: string; // ISO date string
}

export interface MentorProfileResponse {
  id: string;
  userId: string;
  expertise: string[];
  bio: string;
  isActive: boolean;
  user: { id: string; fullName: string; registrationNumber: string };
}

export interface MentorSessionResponse {
  id: string;
  mentorId: string;
  menteeId: string;
  topic: string;
  scheduledAt: Date;
  status: string;
  feedback: string | null;
  createdAt: Date;
}
