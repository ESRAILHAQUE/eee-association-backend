import { newsletterRepository } from "./newsletter.repository";
import type { SendNewsletterBody } from "./newsletter.types";

export const newsletterService = {
  async getAll() {
    return newsletterRepository.findAll();
  },

  async send(body: SendNewsletterBody, createdById: string) {
    return newsletterRepository.create({
      subject: body.subject,
      content: body.body,
      createdById,
    });
  },
};
