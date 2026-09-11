import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const data2023_24 = [
  { reg: "2023338501", name: "Ishmam Hussain" },
  { reg: "2023338502", name: "MD. ARAFAT IQBAL" },
  { reg: "2023338503", name: "Srikanta Chowdhury" },
  { reg: "2023338504", name: "SANGLAP TALUKDER SHREYAS" },
  { reg: "2023338505", name: "Khandakar Shakawat Hossain" },
  { reg: "2023338506", name: "Mahfuz Iqram" },
  { reg: "2023338507", name: "ASIF UDDIN KHAN RATUL" },
  { reg: "2023338508", name: "MD. GOLAM MORSHED MUNNA" },
  { reg: "2023338509", name: "Sucismita Sen" },
  { reg: "2023338510", name: "MD JAHIDUL ISLAM" },
  { reg: "2023338511", name: "Md Harisul Habib" },
  { reg: "2023338512", name: "MD.ALAUDDIN KHAN" },
  { reg: "2023338513", name: "Md. Basir Akan Wasim" },
  { reg: "2023338514", name: "DIBAKAR PAUL DIP" },
  { reg: "2023338515", name: "Anet Sutradhar" },
  { reg: "2023338516", name: "Sudipta Datta Trisha" },
  { reg: "2023338517", name: "Sanjida Soha Mitu" },
  { reg: "2023338518", name: "MD. SAJID ISMAIL" },
  { reg: "2023338519", name: "Umme Kulsum Shukhi" },
  { reg: "2023338520", name: "MD MILON RANA" },
  { reg: "2023338521", name: "Niloy Chandra Roy" },
  { reg: "2023338522", name: "MD. RUHUL AMIN" },
  { reg: "2023338523", name: "Rabaya Akter Roshny" },
  { reg: "2023338524", name: "TONUSREE DAS TONU" },
  { reg: "2023338525", name: "Abu Yusuf Mojumder" },
  { reg: "2023338526", name: "MD ALIM SIDDIQUE" },
  { reg: "2023338527", name: "Fahim Faisal" },
  { reg: "2023338528", name: "Sharmishtha gupta" },
  { reg: "2023338529", name: "MD TAREQ SIDDIQ" },
  { reg: "2023338530", name: "Mohammad Tanjim Hossen" },
  { reg: "2023338531", name: "Tawfiqul Islam" },
  { reg: "2023338532", name: "Aradhya Das Bithe" },
  { reg: "2023338533", name: "Suborno Das Simanto" },
  { reg: "2023338534", name: "Mission Roy" },
  { reg: "2023338535", name: "Saruar Morshed Raju" },
  { reg: "2023338536", name: "MD.SADIK HOSSEN" },
  { reg: "2023338537", name: "M. Asadul Islam Yousuf" },
  { reg: "2023338538", name: "Samira Akter Bristy" },
  { reg: "2023338539", name: "Fahmida rahman chowdhury" },
  { reg: "2023338540", name: "SHEK MD SHAHRIAR KOBIR AKIB" },
  { reg: "2023338541", name: "Shakib Al Hasan" },
  { reg: "2023338542", name: "DHRUBO DEY" },
  { reg: "2023338543", name: "Md.Morsalin" },
  { reg: "2023338544", name: "MD. RATUL HASAN EMON" },
  { reg: "2023338545", name: "Salam hasan Chowdhury ohi" },
  { reg: "2023338546", name: "Rajlaxmy Chakraborty Pritha" },
  { reg: "2023338547", name: "FATHIN HASNAT AURNOB" },
  { reg: "2023338548", name: "Mushfiqur Rahman irfan" },
  { reg: "2023338549", name: "Ahmed ismam shahi" },
  { reg: "2023338550", name: "Md. Sayed Al Mahbub" },
  { reg: "2023338551", name: "MD. ABUL HASHEM" },
  { reg: "2023338552", name: "Md Moshiur Rahman Khan" },
  { reg: "2023338553", name: "Kanchoma Begum" },
  { reg: "2023338554", name: "SAPTAJYOTI BHATTACHARJEE" },
  { reg: "2023338555", name: "MD. JARIF WASIT BHUIYAN" },
  { reg: "2023338556", name: "mohammad sifatul alam" },
  { reg: "2023338558", name: "JUBAYER AHMED" },
  { reg: "2023338559", name: "Nabiha Tahsin Ruhama" },
  { reg: "2023338560", name: "Qazi Rasel" },
  { reg: "2023338561", name: "Kazi Tanvir Rahman" },
  { reg: "2023338562", name: "Pritom Kairi" },
  { reg: "2023338563", name: "Laishram Sukomol Singha" }
];

const data2022_23 = [
  { reg: "2022338501", name: "M. NAFIUZZAMAN KHAN" },
  { reg: "2022338502", name: "MD. SHAKIL KHAN" },
  { reg: "2022338503", name: "FAIZA FARZIA ARPI" },
  { reg: "2022338504", name: "JOYITA BHATTACHARJEE" },
  { reg: "2022338505", name: "UMME SARA" },
  { reg: "2022338506", name: "MINHAZUR RAHMAN LUIS" },
  { reg: "2022338507", name: "MD. RIFAT ISLAM" },
  { reg: "2022338508", name: "SOHISHNU CHAKRABORTY BARNO" },
  { reg: "2022338509", name: "MASUD RANA" },
  { reg: "2022338510", name: "RAIHAN AHMED" },
  { reg: "2022338511", name: "MD. MOHAIMINUL ISLAM" },
  { reg: "2022338512", name: "SUZANA KABIR" },
  { reg: "2022338513", name: "SHAHINUR AHMED SOYEB" },
  { reg: "2022338514", name: "ANAMIKA DEB" },
  { reg: "2022338515", name: "OLIUR RAHMAN" },
  { reg: "2022338516", name: "QUAZI MD. NAIMUL HASAN NABIL" },
  { reg: "2022338518", name: "PRATTUSH BISWAS" },
  { reg: "2022338519", name: "MD. ABUL MARJAN SHUVO" },
  { reg: "2022338520", name: "ISHTIAQUE AHMED ISHTI" },
  { reg: "2022338521", name: "NOYON DEB NATH" },
  { reg: "2022338523", name: "SWARUP ROY" },
  { reg: "2022338524", name: "MD. ABU NASER" },
  { reg: "2022338525", name: "PRASHANTO BAISHNAB" },
  { reg: "2022338527", name: "TANVIR MOLLAH" },
  { reg: "2022338528", name: "MD. IFTEKHAR UDDIN TAHMID" },
  { reg: "2022338529", name: "MD. NASIM HOSSAIN" },
  { reg: "2022338530", name: "ISRAT JAHAN MEEM" },
  { reg: "2022338531", name: "MD. RIDOY" },
  { reg: "2022338532", name: "ABDULLAH BIN MASUD" },
  { reg: "2022338533", name: "BIKASH CHANDRA ROY" },
  { reg: "2022338534", name: "SAKIF AHAMMAD" },
  { reg: "2022338535", name: "BHUBAN MIA RONI" },
  { reg: "2022338536", name: "MAHMUDUL HOQUE NABIL" },
  { reg: "2022338537", name: "MD. ROKHONUJJAMAN" },
  { reg: "2022338538", name: "SOHANUR RAHMAN REDOY" },
  { reg: "2022338539", name: "SHUVASHIS DAS" },
  { reg: "2022338540", name: "NOUMI NOUROSE SOHI" },
  { reg: "2022338541", name: "ARAFAT HOSSAIN" },
  { reg: "2022338542", name: "AYISHARIYA DEB AYISHE" },
  { reg: "2022338543", name: "MD. ISHRAQ CHOWDHURY" },
  { reg: "2022338544", name: "HRIDI MAJUMDER" },
  { reg: "2022338545", name: "MD. REFATUL ISLAM" },
  { reg: "2022338546", name: "HRIDOY DAS" },
  { reg: "2022338547", name: "SHUVOBROTHO DAS BADHON" },
  { reg: "2022338548", name: "RUJINA AKTER" },
  { reg: "2022338549", name: "MD. NAYEM" },
  { reg: "2022338550", name: "MD. ASHIQUR RAHMAN" },
  { reg: "2022338551", name: "MUSHARROF HUSSAIN" },
  { reg: "2022338552", name: "MD. ATIK SHAHRIER MAMUN" },
  { reg: "2022338554", name: "TUHIN HASAN" },
  { reg: "2022338555", name: "MD. SAKIB ARAFAT" },
  { reg: "2022338556", name: "MAHDI ANAM" },
  { reg: "2022338557", name: "FAISAL AHMED KHAN" },
  { reg: "2022338558", name: "MD. MOUJJAM HOSSAIN MONA" },
  { reg: "2022338560", name: "NAZMUL HUDA" },
  { reg: "2021338509", name: "Imdad Ullah Hadi" },
  { reg: "2021338545", name: "Md. Jahidul Islam Jihad" },
  { reg: "2021338553", name: "Aun Nafisa Nur Mou" },
  { reg: "2021338556", name: "Sabuj Dab Nath" },
  { reg: "2021338567", name: "Md. Tauhidur Rashid" }
];

const data2021_22 = [
  { reg: "2021338501", name: "MD. TANVIR HASAN" },
  { reg: "2021338502", name: "S. M MAHFUZ AHMED" },
  { reg: "2021338503", name: "BISHOWJIT KUMAR DAS" },
  { reg: "2021338504", name: "AMIT ROY MUNSHI" },
  { reg: "2021338505", name: "JAMIA CHOUDHURY" },
  { reg: "2021338506", name: "HAFIZ RAYHAN SHANTO" },
  { reg: "2021338507", name: "HASIBUL ISLAM NAFIS" },
  { reg: "2021338508", name: "PARVEJ HASAN BHUIYAN" },
  { reg: "2021338509", name: "IMDAD ULLAH HADI" },
  { reg: "2021338510", name: "MAKSUDUR RAHMAN BUOY" },
  { reg: "2021338511", name: "RAFI SARKAR" },
  { reg: "2021338512", name: "KAZI ISTIAK AHMED RIMU" },
  { reg: "2021338513", name: "SAMINA MEHERIN TOMA" },
  { reg: "2021338514", name: "SHADMAN SAKIB" },
  { reg: "2021338515", name: "MD. BAYEZID BOSTAMI" },
  { reg: "2021338516", name: "SHATABDI ROY KONA" },
  { reg: "2021338517", name: "DIGANTA DAS" },
  { reg: "2021338518", name: "SYEDA TANJIM SHUCHI" },
  { reg: "2021338519", name: "SHAKE MD. JUNAET AHAMED" },
  { reg: "2021338520", name: "RAKESH CHOWDHURY" },
  { reg: "2021338521", name: "ROBIUL" },
  { reg: "2021338522", name: "SADEK HOSSEN" },
  { reg: "2021338523", name: "OLIUL KAYUM NABIL" },
  { reg: "2021338524", name: "FAIJUL ISLAM RAKIB" },
  { reg: "2021338525", name: "MITHILA SEN GUPTA" },
  { reg: "2021338526", name: "ASRAFUL ISLAM" },
  { reg: "2021338527", name: "MD.AHASAN ULLAH" },
  { reg: "2021338528", name: "MD. TANVIR MAHMUD" },
  { reg: "2021338529", name: "SHANTA RANI NATH" },
  { reg: "2021338530", name: "SIFAT AHMED TAHMID" },
  { reg: "2021338531", name: "MD. HEMEL AKANDO" },
  { reg: "2021338532", name: "MONZUNUR RAHMAN MOON" },
  { reg: "2021338533", name: "LABONI DAS HRIDI" },
  { reg: "2021338534", name: "MST. JANNATUL FERDOUS RAKHI" },
  { reg: "2021338535", name: "ARPITA DEY API" },
  { reg: "2021338536", name: "SIMANTO BAIDYA" },
  { reg: "2021338537", name: "ANTOR BANIK ANTO" },
  { reg: "2021338538", name: "MD. TASNIMUL ISLAM SHAKER" },
  { reg: "2021338539", name: "TOUHID HOSSAIN" },
  { reg: "2021338540", name: "NUR AHMED" },
  { reg: "2021338541", name: "UZZAL KUMAR BISWAS" },
  { reg: "2021338542", name: "AMINUL ISLAM APU" },
  { reg: "2021338543", name: "MD. MAJHARUL ISLAM KHAN" },
  { reg: "2021338544", name: "PROSANTO CHANDO BOSHU" },
  { reg: "2021338545", name: "MD. JAHIDUL ISLAM JIHAD" },
  { reg: "2021338546", name: "SADMAN TAHMID ZARIF" },
  { reg: "2021338547", name: "MD. TANVIR AHAMME D" },
  { reg: "2021338548", name: "HU8ULLAH" },
  { reg: "2021338549", name: "SOUROB PAUL" },
  { reg: "2021338550", name: "MD: RAJIBUL ISLAM HRIDOY" },
  { reg: "2021338551", name: "MST. NUSRAT JAHAN TAMANNA" },
  { reg: "2021338552", name: "MASUDUR RAHMAN" },
  { reg: "2021338553", name: "AUN- NAFISA NUR MOU" },
  { reg: "2021338554", name: "LAMIA RAHMAN SPRIHA" },
  { reg: "2021338555", name: "SHIPU AHMED" },
  { reg: "2021338556", name: "SABUJ DAB NATH" },
  { reg: "2021338557", name: "MD. HASAN SAYEM" },
  { reg: "2021338558", name: "TAHSIN FATEMA CHOUDHURY" },
  { reg: "2021338559", name: "SUNGIDA AKTHER SINTHY" },
  { reg: "2021338560", name: "AZIZUR RAHMAN" }
];

async function seedBatch(batchName, data) {
  let batch = await prisma.batch.findUnique({ where: { name: batchName } });
  if (!batch) {
    batch = await prisma.batch.create({ data: { name: batchName } });
    console.log(`Created batch ${batchName}`);
  } else {
    console.log(`Batch ${batchName} already exists`);
  }

  const defaultPassword = await bcrypt.hash("SEC123456", 10);
  
  for (const s of data) {
    const existing = await prisma.user.findUnique({ where: { registrationNumber: s.reg } });
    if (existing) {
      console.log(`User ${s.reg} already exists. Skipping.`);
      continue;
    }
    
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
    console.log(`Created student: ${s.reg} - ${s.name} in ${batchName}`);
  }
}

async function main() {
  await seedBatch("2023-24", data2023_24);
  await seedBatch("2022-23", data2022_23);
  await seedBatch("2021-22", data2021_22);
}

main().catch(e => { console.error(e); process.exit(1); }).finally(async () => await prisma.$disconnect());
