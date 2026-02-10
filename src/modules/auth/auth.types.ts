// Auth request/response types (aligned with User schema)

export interface LoginBody {
  email: string; // institutional email
  password: string;
}

export interface RegisterBody {
  fullName: string;
  email: string;
  password: string;
  registrationNumber: string;
}

export interface AuthResponse {
  user: {
    id: string;
    fullName: string;
    institutionalEmail: string;
    registrationNumber: string;
    currentRole: string;
    isVerified: boolean;
  };
  accessToken: string;
  expiresIn: string;
}

export interface RegisterResponse {
  user: {
    id: string;
    fullName: string;
    institutionalEmail: string;
    isVerified: boolean;
  };
  message: string;
}
