// Auth request/response types (aligned with User schema)

export interface LoginBody {
  email: string; // institutional email
  password: string;
}

export interface RegisterBody {
  fullName: string;
  email: string; // institutional email
  password: string;
  // optional identity
  registrationNumber?: string;
  rollNumber?: string;
  batch?: string;
  session?: string;
  department?: string;
  program?: string;
  enrollmentYear?: number;
  graduationStatus?: "studying" | "graduated" | "dropped";
  accountType?: "student" | "alumni" | "teacher";
  // optional contact
  personalEmail?: string;
  phoneNumber?: string;
  address?: string;
  // optional role (e.g. when admin creates user)
  currentRole?: "student" | "cr" | "moderator" | "admin" | "super_admin";
}

export interface AuthResponse {
  user: {
    id: string;
    fullName: string;
    institutionalEmail: string;
    currentRole: string;
    accountType: string;
    emailVerified: boolean;
  };
  accessToken: string;
  expiresIn: string;
}
