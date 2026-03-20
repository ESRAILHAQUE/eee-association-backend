export interface IssueCertificatesBody {
  eventId: string;
  userIds: string[];
}

export interface CertificateResponse {
  id: string;
  userId: string;
  eventId: string;
  issuedAt: Date;
  user: { id: string; fullName: string; registrationNumber: string };
  event: { id: string; title: string };
  issuedBy: { id: string; fullName: string };
}
