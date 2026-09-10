import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const students = [
  { reg: '2020338501', name: 'Md. Omor Faruk' },
  { reg: '2020338502', name: 'Masud Rana' },
  { reg: '2020338503', name: 'Maruf Uddin Chy' },
  { reg: '2020338504', name: 'Syed Tufayel Ahmed Mafi' },
  { reg: '2020338506', name: 'Tanjinur Rahman Tuhin' },
  { reg: '2020338508', name: 'Sakib Bin Tariq' },
  { reg: '2020338509', name: 'S.M. Saadman' },
  { reg: '2020338510', name: 'Md. Tanvirul Haque' },
  { reg: '2020338512', name: 'Tanmoy Chowdhury' },
  { reg: '2020338514', name: 'Mahmuda Khandokar' },
  { reg: '2020338516', name: 'Saujon Bahadur' },
  { reg: '2020338517', name: 'Masuk Billah' },
  { reg: '2020338519', name: 'Md. Abdul Azim' },
  { reg: '2020338522', name: 'Syed Tayef Ahmed Shafi' },
  { reg: '2020338524', name: 'Sazzad Hossain' },
  { reg: '2020338525', name: 'Sadman Chowdhury Mihad' },
  { reg: '2020338526', name: 'Shaptapurna Chowdhury' },
  { reg: '2020338527', name: 'Md. Parvez Kamaly' },
  { reg: '2020338529', name: 'Altaf Hussain' },
  { reg: '2020338530', name: 'Md. Ahsanul Azim Anas' },
  { reg: '2020338532', name: 'Manosh Das' },
  { reg: '2020338534', name: 'Mehedi Hasan' },
  { reg: '2020338535', name: 'Abir Sen' },
  { reg: '2020338536', name: 'Mazharul Alam' },
  { reg: '2020338538', name: 'Juman Das' },
  { reg: '2020338539', name: 'Ali Farhan Ahmad' },
  { reg: '2020338540', name: 'Shuvon Deb' },
  { reg: '2020338541', name: 'Hamidur Rahman' },
  { reg: '2020338542', name: 'Iftekar Rahman Ruhit' },
  { reg: '2020338543', name: 'Durbar Nandi' },
  { reg: '2020338545', name: 'Md. Esrail Haque' },
  { reg: '2020338546', name: 'Naim Ahmed' },
  { reg: '2020338547', name: 'Samia Akter Priya' },
  { reg: '2020338548', name: 'Ayesha Siddika' },
  { reg: '2020338552', name: 'Mehnaj Aktar Mou' },
  { reg: '2020338553', name: 'Tahmidur Rahman' },
  { reg: '2020338556', name: 'Nusaiba Binte Habib' },
  { reg: '2020338558', name: 'Mohibul Hasan' },
  { reg: '2020338560', name: 'Md. Rifatul Islam Manna' },
  { reg: '2020338565', name: 'Jahid Hasan' },
  { reg: '2020338566', name: 'Mrinal Sahajee' },
];

async function main() {
  const passwordHash = await bcrypt.hash('password123', 10);
  
  console.log(`Seeding ${students.length} students...`);
  
  for (const s of students) {
    const email = `${s.reg}@sec.edu.bd`; // Dummy email
    
    // Create or update user
    const user = await prisma.user.upsert({
      where: { registrationNumber: s.reg },
      update: {},
      create: {
        fullName: s.name,
        registrationNumber: s.reg,
        institutionalEmail: email,
        passwordHash,
        currentRole: 'student',
        isVerified: true,
        profile: {
          create: {
            registrationNumber: s.reg,
            batch: '2020-21',
            session: '2020-21',
            department: 'EEE'
          }
        }
      }
    });

    const isPaid = Math.random() > 0.5;
    const paidAmount = isPaid ? 4500.00 : 0.00;
    const dueAmount = 4500.00 - paidAmount;
    const status = isPaid ? 'paid' : 'unpaid';

    // Create association fee for Semester 6 as dummy data
    await prisma.associationFee.upsert({
      where: {
        userId_semesterNumber: {
          userId: user.id,
          semesterNumber: 6
        }
      },
      update: {},
      create: {
        userId: user.id,
        semesterNumber: 6,
        feeAmount: 4500.00,
        paidAmount: paidAmount,
        dueAmount: dueAmount,
        paymentStatus: status
      }
    });
  }

  console.log('Seeding completed.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
