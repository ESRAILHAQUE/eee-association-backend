import { usersRepository } from "./users.repository";
import { AppError } from "../../common/middleware";

export const usersService = {
  async getByRegistrationNumber(registrationNumber: string) {
    const user =
      await usersRepository.findByRegistrationNumber(registrationNumber);
    if (!user) throw new AppError(404, "User not found");
    return user;
  },

  async listUsers(filters: { role?: string; batch?: string; search?: string }) {
    return usersRepository.findMany(filters);
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

  async setVerifiedById(userId: string, isVerified: boolean) {
    return usersRepository.setVerified(userId, isVerified);
  },

  async setBlock(userId: string, isBlock: boolean) {
    return usersRepository.setBlock(userId, isBlock);
  },

  async updateUserById(userId: string, userUpdate: any, profileUpdate: any) {
    return usersRepository.updateUser(userId, userUpdate, profileUpdate);
  },

  async updateRole(userId: string, role: string) {
    return usersRepository.updateRole(userId, role as any);
  },

  async updateMyProfile(userId: string, data: { personalEmail?: string; phoneNumber?: string }) {
    return usersRepository.updateMyProfile(userId, data);
  },

  async bulkAddStudents(students: { fullName: string; registrationNumber: string; institutionalEmail: string; phoneNumber?: string; batch: string }[]) {
    // Generate hashed default password "SEC123456" for all users
    const bcrypt = require("bcryptjs");
    const defaultPasswordHash = await bcrypt.hash("SEC123456", 10);

    const usersToCreate = students.map(student => ({
      fullName: student.fullName,
      registrationNumber: student.registrationNumber,
      institutionalEmail: student.institutionalEmail,
      passwordHash: defaultPasswordHash,
      currentRole: "student",
      isVerified: true, // Auto-verified when added by admin
      profile: {
        registrationNumber: student.registrationNumber,
        batch: student.batch,
        phoneNumber: student.phoneNumber,
        personalEmail: student.institutionalEmail,
        accountType: "student"
      }
    }));

    return usersRepository.bulkCreate(usersToCreate);
  }
};
