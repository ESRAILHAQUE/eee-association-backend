import { batchesRepository } from "./batches.repository";
import { AppError } from "../../common/middleware";
import { usersRepository } from "../users/users.repository";

export const batchesService = {
  async getBatches() {
    return batchesRepository.findMany();
  },
  async createBatch(name: string) {
    return batchesRepository.create(name);
  },
  async assignCR(batchId: string, crId: string | null) {
    const batch = await batchesRepository.findById(batchId);
    if (!batch) throw new AppError(404, "Batch not found");

    if (batch.crId && batch.crId !== crId) {
      await usersRepository.updateRole(batch.crId, "student");
    }

    if (crId) {
      await usersRepository.updateRole(crId, "cr");
    }

    return batchesRepository.assignCR(batchId, crId);
  }
};
