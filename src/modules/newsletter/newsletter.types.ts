// Newsletter module type definitions

export interface NewsletterItem {
  id: string;
  title: string;
  content: string;
  isPinned: boolean;
  createdAt: Date;
  createdBy: { id: string; fullName: string };
}

export interface SendNewsletterBody {
  subject: string;
  body: string;
}
