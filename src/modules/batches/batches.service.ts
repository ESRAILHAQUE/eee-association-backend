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
  async addCR(batchId: string, crId: string) {
    const batch = await batchesRepository.findById(batchId);
    if (!batch) throw new AppError(404, "Batch not found");

    await usersRepository.updateRole(crId, "cr");
    return batchesRepository.addCR(batchId, crId);
  },
  async removeCR(batchId: string, crId: string) {
    const batch = await batchesRepository.findById(batchId);
    if (!batch) throw new AppError(404, "Batch not found");

    await usersRepository.updateRole(crId, "student");
    return batchesRepository.removeCR(batchId, crId);
  },
  async deleteBatch(batchId: string) {
    const batch = await batchesRepository.findById(batchId);
    if (!batch) throw new AppError(404, "Batch not found");
    
    // If there are CRs, demote them back to student
    if (batch.crs && batch.crs.length > 0) {
      for (const cr of batch.crs) {
        await usersRepository.updateRole(cr.id, "student");
      }
    }
    
    return batchesRepository.delete(batchId);
  }
};
