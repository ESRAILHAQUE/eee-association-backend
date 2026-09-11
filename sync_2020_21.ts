import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const data = [
  { reg: "2020338501", name: "MD. OMOR FARUK" },
  { reg: "2020338502", name: "MASUD RANA" },
  { reg: "2020338503", name: "MARUF UDDIN CHY" },
  { reg: "2020338504", name: "SYED TUFAYEL AHMED MAFI" },
  { reg: "2020338506", name: "TANJINUR RAHMAN TUHIN" },
  { reg: "2020338508", name: "SAKIB BIN TARIQ" },
  { reg: "2020338509", name: "S.M SAADMAN" },
  { reg: "2020338510", name: "MD. TANVIRUL HAQUE" },
  { reg: "2020338512", name: "TANMOY CHOWDHURY" },
  { reg: "2020338514", name: "MAHMUDA KHANDOKAR" },
  { reg: "2020338516", name: "SAUJON BAHADUR" },
  { reg: "2020338517", name: "MASUK BILLAH" },
  { reg: "2020338519", name: "MD. ABDUL AZIM" },
  { reg: "2020338522", name: "SYED TAYEF AHMED SHAFI" },
  { reg: "2020338524", name: "SAZZAD HOSSAIN" },
  { reg: "2020338525", name: "SADMAN CHOWDHURY MIHAD" },
  { reg: "2020338526", name: "SHAPTAPURNA CHOWDHURY" },
  { reg: "2020338527", name: "MD. PARVEZ KAMALY" },
  { reg: "2020338529", name: "ALTAF HUSSAIN" },
  { reg: "2020338530", name: "MD. ASANUL AZIM ANAS" },
  { reg: "2020338532", name: "MANOSH DAS" },
  { reg: "2020338533", name: "ANIMESH DAS" },
  { reg: "2020338534", name: "MEHEDI HASAN" },
  { reg: "2020338535", name: "ABIR SEN" },
  { reg: "2020338536", name: "MAZHARUL ALAM" },
  { reg: "2020338538", name: "JUMAN DSA" },
  { reg: "2020338539", name: "ALI FARHAN AHMED" },
  { reg: "2020338540", name: "SHUVON DEB" },
  { reg: "2020338541", name: "HAMIDUR RAHMAN" },
  { reg: "2020338542", name: "IFTEKAR RAHMAN RUHIT" },
  { reg: "2020338543", name: "DURBAR NANDI" },
  { reg: "2020338545", name: "MD. ESRAIL HAQUE" },
  { reg: "2020338546", name: "NAIM AHMED" },
  { reg: "2020338547", name: "SAMIYA AKTER PRIYA" },
  { reg: "2020338548", name: "AYESHA SIDDIKA" },
  { reg: "2020338549", name: "TAREK MAHMUD USAMA" },
  { reg: "2020338552", name: "MAHNAJ AKTER MOU" },
  { reg: "2020338553", name: "TAHMIDUR RAHMAN" },
  { reg: "2020338554", name: "MD. SHOVO" },
  { reg: "2020338556", name: "NUSAIBA BINTE HAQBIB" },
  { reg: "2020338558", name: "MAHIBUL HASAN" },
  { reg: "2020338560", name: "MD. RIFATUL ISLAM MANNA" },
  { reg: "2020338562", name: "SHACHIN SHARMA" },
  { reg: "2020338565", name: "JAHID HASAN" },
  { reg: "2020338566", name: "MRINAL SAHAJEE" },
  { reg: "2019338538", name: "ASADUR RAHMAN SHOURAV" }
];

async function main() {
  const batchName = "2020-21";
  let batch = await prisma.batch.findUnique({ where: { name: batchName } });
  if (!batch) {
    batch = await prisma.batch.create({ data: { name: batchName } });
  }

  const defaultPassword = await bcrypt.hash("SEC123456", 10);
  let missing = 0;

  for (const s of data) {
    const existing = await prisma.user.findUnique({ where: { registrationNumber: s.reg } });
    if (!existing) {
      await prisma.user.create({
        data: {
          fullName: s.name,
          registrationNumber: s.reg,
          institutionalEmail: `${s.reg}@sec.ac.bd`,
          passwordHash: defaultPassword,
          currentRole: "student",
          isVerified: true,
          profile: {
            create: {
              registrationNumber: s.reg,
              batch: batchName,
            }
          }
        }
      });
      console.log(`Added missing student: ${s.reg} - ${s.name}`);
      missing++;
    }
  }
  
  console.log(`Total students in PDF: ${data.length}`);
  console.log(`Missing students added: ${missing}`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
