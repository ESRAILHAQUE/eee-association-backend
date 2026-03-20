export interface CreateDocumentBody {
  title: string;
  description?: string;
  fileUrl: string;
  fileType: string;
  category: string;
  accessLevel?: string;
}

export interface DocumentResponse {
  id: string;
  title: string;
  description: string | null;
  fileUrl: string;
  fileType: string;
  category: string;
  accessLevel: string;
  createdAt: Date;
  uploadedBy: { id: string; fullName: string };
}
