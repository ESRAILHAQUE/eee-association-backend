// Users module type definitions

export interface UpdateMyProfileBody {
  personalEmail?: string;
  phoneNumber?: string;
}

export interface UpdateProfileBody {
  rollNumber?: string;
  batch?: string;
  session?: string;
  department?: string;
  program?: string;
  enrollmentYear?: number;
  personalEmail?: string;
  phoneNumber?: string;
  address?: string;
  cgpa?: number;
  [key: string]: unknown;
}

export interface SetVerifiedBody {
  isVerified: boolean;
}

export interface UserWithProfile {
  id: string;
  fullName: string;
  registrationNumber: string;
  institutionalEmail: string;
  currentRole: string;
  isVerified: boolean;
  isBlock: boolean;
  isDeleted: boolean;
  profile: {
    id: string;
    batch: string | null;
    rollNumber: string | null;
    cgpa: number | null;
    [key: string]: unknown;
  } | null;
}
