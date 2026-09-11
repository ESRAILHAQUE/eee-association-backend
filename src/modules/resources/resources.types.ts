export type ResourceStatus = "pending" | "approved" | "rejected";

export interface CreateResourceBody {
  title: string;
  description?: string;
  subject: string;
  semester?: number;
  fileUrl: string;
  fileType: string;
  batch?: string;
}

export interface UpdateResourceStatusBody {
  status: ResourceStatus;
}
