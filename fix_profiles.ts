import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const users = await prisma.user.findMany({
    where: { profile: null },
    include: { profile: true }
  });
  console.log(`Found ${users.length} users with no profile.`);
  for (const u of users) {
    console.log(`- ${u.registrationNumber} : ${u.fullName}`);
    if (u.registrationNumber) {
        let batchStr = "Unknown";
        if (u.registrationNumber.startsWith("2020")) batchStr = "2020-21";
        else if (u.registrationNumber.startsWith("2021")) batchStr = "2021-22";
        else if (u.registrationNumber.startsWith("2022")) batchStr = "2022-23";
        else if (u.registrationNumber.startsWith("2023")) batchStr = "2023-24";
        else if (u.registrationNumber.startsWith("2019")) batchStr = "2019-20";

        if (batchStr !== "Unknown") {
            await prisma.userProfile.create({
                data: {
                    userId: u.id,
                    registrationNumber: u.registrationNumber,
                    batch: batchStr
                }
            });
            console.log(`  -> Created profile with batch ${batchStr}`);
        }
    }
  }
}
main().catch(console.error).finally(() => prisma.$disconnect());
