export type EventStatus = "draft" | "published" | "cancelled" | "completed";
export type EventType =
  | "workshop"
  | "seminar"
  | "competition"
  | "cultural"
  | "meeting"
  | "other";

export interface CreateEventBody {
  title: string;
  description: string;
  eventType?: EventType;
  venue: string;
  startAt: string; // ISO date string
  endAt: string;
  targetBatch?: string | null;
  maxCapacity?: number | null;
}

export interface UpdateEventStatusBody {
  status: EventStatus;
}
