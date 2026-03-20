export interface GenerateQRBody {
  eventId: string;
}

export interface ScanQRBody {
  token: string;
}

export interface AttendanceQRResponse {
  id: string;
  eventId: string;
  token: string;
  expiresAt: Date;
  createdAt: Date;
}

export interface AttendanceResponse {
  id: string;
  eventId: string;
  userId: string;
  scannedAt: Date;
}
