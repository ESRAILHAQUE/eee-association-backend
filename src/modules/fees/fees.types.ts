export type PaymentStatus = "paid" | "partial" | "unpaid";

export interface CreateFeePayload {
  userId: string;
  semesterNumber: number;
  feeAmount: number;
}

export interface RecordPaymentPayload {
  paidAmount: number;
  paymentMethod?: string;
  transactionReference?: string;
}
