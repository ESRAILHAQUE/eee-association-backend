import { usersRepository } from "./users.repository";
import { AppError } from "../../common/middleware";

export const usersService = {
  async getByRegistrationNumber(registrationNumber: string) {
    const user =
      await usersRepository.findByRegistrationNumber(registrationNumber);
    if (!user) throw new AppError(404, "User not found");
    return user;
  },

  async updateProfileByRegNo(
    registrationNumber: string,
    data: Record<string, unknown>,
  ) {
    const user =
      await usersRepository.findByRegistrationNumber(registrationNumber);
    if (!user) throw new AppError(404, "User not found");
    return usersRepository.upsertProfile(
      user.id,
      user.registrationNumber,
      data,
    );
  },

  async setVerified(registrationNumber: string, isVerified: boolean) {
    const user =
      await usersRepository.findByRegistrationNumber(registrationNumber);
    if (!user) throw new AppError(404, "User not found");
    return usersRepository.setVerified(user.id, isVerified);
  },
};
