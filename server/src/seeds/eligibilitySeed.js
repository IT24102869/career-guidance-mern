import "dotenv/config";
import mongoose from "mongoose";
import { connectDB } from "../config/db.js";
import University from "../models/University.js";
import DegreeProgram from "../models/DegreeProgram.js";
import ZScoreTable from "../models/ZScoreTable.js";

await connectDB();

// ── 15 Universities ──
const universities = [
  { name: "University of Colombo", code: "UOC", district: "Colombo", province: "Western", website: "https://cmb.ac.lk" },
  { name: "University of Peradeniya", code: "UOP", district: "Kandy", province: "Central", website: "https://pdn.ac.lk" },
  { name: "University of Moratuwa", code: "UOM", district: "Colombo", province: "Western", website: "https://uom.lk" },
  { name: "University of Kelaniya", code: "UOK", district: "Gampaha", province: "Western", website: "https://kln.ac.lk" },
  { name: "University of Sri Jayewardenepura", code: "USJ", district: "Colombo", province: "Western", website: "https://sjp.ac.lk" },
  { name: "University of Jaffna", code: "UOJ", district: "Jaffna", province: "Northern", website: "https://jfn.ac.lk" },
  { name: "University of Ruhuna", code: "UOR", district: "Matara", province: "Southern", website: "https://ruh.ac.lk" },
  { name: "Eastern University Sri Lanka", code: "EUSL", district: "Batticaloa", province: "Eastern", website: "https://esn.ac.lk" },
  { name: "South Eastern University of Sri Lanka", code: "SEUSL", district: "Ampara", province: "Eastern", website: "https://seu.ac.lk" },
  { name: "Rajarata University of Sri Lanka", code: "RUSL", district: "Anuradhapura", province: "North Central", website: "https://rjt.ac.lk" },
  { name: "Sabaragamuwa University of Sri Lanka", code: "SUSL", district: "Ratnapura", province: "Sabaragamuwa", website: "https://sab.ac.lk" },
  { name: "Wayamba University of Sri Lanka", code: "WUSL", district: "Kurunegala", province: "North Western", website: "https://wyb.ac.lk" },
  { name: "Uva Wellassa University", code: "UWU", district: "Badulla", province: "Uva", website: "https://uwu.ac.lk" },
  { name: "University of the Visual & Performing Arts", code: "UVPA", district: "Colombo", province: "Western", website: "https://vpa.ac.lk" },
  { name: "Gampaha Wickramarachchi University", code: "GWUIM", district: "Gampaha", province: "Western", website: "https://gwu.ac.lk" },
];

// ── 30 Degree Programs ──
function programs(uniMap) {
  return [
    { name: "BSc Engineering", code: "ENG_UOM_01", universityId: uniMap.UOM, stream: "Maths", durationYears: 4, degreeType: "BSc Eng", careerTags: ["Engineering", "IT"] },
    { name: "BSc Computer Science", code: "CS_UOC_01", universityId: uniMap.UOC, stream: "Maths", durationYears: 3, degreeType: "BSc", careerTags: ["IT", "Software"] },
    { name: "BSc Physical Science", code: "PHY_UOP_01", universityId: uniMap.UOP, stream: "Maths", durationYears: 3, degreeType: "BSc", careerTags: ["Science", "Research"] },
    { name: "BSc Applied Mathematics", code: "AMATH_USJ_01", universityId: uniMap.USJ, stream: "Maths", durationYears: 3, degreeType: "BSc", careerTags: ["Mathematics", "Data Science"] },
    { name: "BSc IT", code: "IT_UOM_01", universityId: uniMap.UOM, stream: "Maths", durationYears: 4, degreeType: "BSc", careerTags: ["IT", "Software", "Networking"] },
    { name: "BSc Quantity Surveying", code: "QS_UOM_01", universityId: uniMap.UOM, stream: "Maths", durationYears: 4, degreeType: "BSc", careerTags: ["Construction", "Finance"] },
    { name: "BSc Architecture", code: "ARCH_UOM_01", universityId: uniMap.UOM, stream: "Maths", durationYears: 5, degreeType: "BArch", careerTags: ["Architecture", "Design"] },

    { name: "MBBS Medicine", code: "MED_UOC_01", universityId: uniMap.UOC, stream: "Bio", durationYears: 5, degreeType: "MBBS", careerTags: ["Medicine", "Healthcare"] },
    { name: "BDS Dental Surgery", code: "DENT_UOP_01", universityId: uniMap.UOP, stream: "Bio", durationYears: 5, degreeType: "BDS", careerTags: ["Dentistry", "Healthcare"] },
    { name: "BSc Biological Science", code: "BIO_UOK_01", universityId: uniMap.UOK, stream: "Bio", durationYears: 3, degreeType: "BSc", careerTags: ["Biology", "Research"] },
    { name: "BSc Agriculture", code: "AGR_UOP_02", universityId: uniMap.UOP, stream: "Bio", durationYears: 4, degreeType: "BSc", careerTags: ["Agriculture", "Environment"] },
    { name: "BSc Pharmacy", code: "PHAR_USJ_01", universityId: uniMap.USJ, stream: "Bio", durationYears: 4, degreeType: "BSc Pharm", careerTags: ["Pharmacy", "Healthcare"] },
    { name: "BSc Food Science", code: "FOOD_SUSL_01", universityId: uniMap.SUSL, stream: "Bio", durationYears: 4, degreeType: "BSc", careerTags: ["Food Industry", "Research"] },
    { name: "BSc Veterinary Medicine", code: "VET_UOP_01", universityId: uniMap.UOP, stream: "Bio", durationYears: 5, degreeType: "BVSc", careerTags: ["Veterinary", "Animals"] },

    { name: "BCom Accountancy", code: "ACC_USJ_01", universityId: uniMap.USJ, stream: "Commerce", durationYears: 3, degreeType: "BCom", careerTags: ["Accounting", "Finance"] },
    { name: "BBA Business Administration", code: "BBA_UOC_01", universityId: uniMap.UOC, stream: "Commerce", durationYears: 3, degreeType: "BBA", careerTags: ["Management", "Business"] },
    { name: "BCom Finance", code: "FIN_UOK_01", universityId: uniMap.UOK, stream: "Commerce", durationYears: 3, degreeType: "BCom", careerTags: ["Finance", "Banking"] },
    { name: "BSc Management", code: "MGT_RUSL_01", universityId: uniMap.RUSL, stream: "Commerce", durationYears: 3, degreeType: "BSc", careerTags: ["Management", "HR"] },
    { name: "BBA Marketing", code: "MKT_UOC_01", universityId: uniMap.UOC, stream: "Commerce", durationYears: 3, degreeType: "BBA", careerTags: ["Marketing", "Sales"] },
    { name: "BSc Entrepreneurship", code: "ENT_USJ_01", universityId: uniMap.USJ, stream: "Commerce", durationYears: 3, degreeType: "BSc", careerTags: ["Business", "Startup"] },

    { name: "BA Economics", code: "ECON_UOC_01", universityId: uniMap.UOC, stream: "Arts", durationYears: 3, degreeType: "BA", careerTags: ["Economics", "Policy"] },
    { name: "BA Sociology", code: "SOC_UOP_01", universityId: uniMap.UOP, stream: "Arts", durationYears: 3, degreeType: "BA", careerTags: ["Social Science", "Research"] },
    { name: "BA English", code: "ENG_UOK_01", universityId: uniMap.UOK, stream: "Arts", durationYears: 3, degreeType: "BA", careerTags: ["Language", "Education"] },
    { name: "BA Law", code: "LAW_UOC_02", universityId: uniMap.UOC, stream: "Arts", durationYears: 4, degreeType: "LLB", careerTags: ["Law", "Governance"] },
    { name: "BA Visual Arts", code: "VART_UVPA_01", universityId: uniMap.UVPA, stream: "Arts", durationYears: 3, degreeType: "BVA", careerTags: ["Arts", "Design"] },
    { name: "BA Communication Studies", code: "COMM_EUSL_01", universityId: uniMap.EUSL, stream: "Arts", durationYears: 3, degreeType: "BA", careerTags: ["Media", "Journalism"] },

    { name: "BSc ICT", code: "ICT_EUSL_01", universityId: uniMap.EUSL, stream: "Tech", durationYears: 4, degreeType: "BSc", careerTags: ["IT", "Networking"] },
    { name: "BSc Engineering Technology", code: "ETECH_UOR_01", universityId: uniMap.UOR, stream: "Tech", durationYears: 4, degreeType: "BSc", careerTags: ["Engineering", "Technology"] },
    { name: "BSc Biosystems Technology", code: "BTECH_SUSL_01", universityId: uniMap.SUSL, stream: "Tech", durationYears: 4, degreeType: "BSc", careerTags: ["Biology", "Tech"] },
    { name: "BSc Software Technology", code: "STECH_WUSL_01", universityId: uniMap.WUSL, stream: "Tech", durationYears: 4, degreeType: "BSc", careerTags: ["IT", "Software"] },
  ];
}

// ── Z-Score cutoff generator for 10 key districts × 5 years ──
const DISTRICTS = ["Colombo", "Gampaha", "Kandy", "Galle", "Jaffna", "Kurunegala", "Matara", "Badulla", "Anuradhapura", "Ratnapura"];
const YEARS = [2020, 2021, 2022, 2023, 2024, 2025];

// Base cutoffs per program code for Colombo 2023; other districts/years derived with offsets
const baseCutoffs = {
  ENG_UOM_01: 1.85, CS_UOC_01: 1.72, PHY_UOP_01: 1.45, AMATH_USJ_01: 1.38, IT_UOM_01: 1.68, QS_UOM_01: 1.55, ARCH_UOM_01: 1.62,
  MED_UOC_01: 2.10, DENT_UOP_01: 1.98, BIO_UOK_01: 1.30, AGR_UOP_02: 1.22, PHAR_USJ_01: 1.55, FOOD_SUSL_01: 1.15, VET_UOP_01: 1.88,
  ACC_USJ_01: 1.50, BBA_UOC_01: 1.62, FIN_UOK_01: 1.42, MGT_RUSL_01: 1.10, MKT_UOC_01: 1.48, ENT_USJ_01: 1.35,
  ECON_UOC_01: 1.35, SOC_UOP_01: 0.98, ENG_UOK_01: 1.05, LAW_UOC_02: 1.60, VART_UVPA_01: 0.85, COMM_EUSL_01: 0.92,
  ICT_EUSL_01: 1.25, ETECH_UOR_01: 1.18, BTECH_SUSL_01: 1.12, STECH_WUSL_01: 1.22,
};

const districtOffsets = {
  Colombo: 0, Gampaha: -0.02, Kandy: -0.05, Galle: -0.04, Jaffna: -0.08,
  Kurunegala: -0.06, Matara: -0.05, Badulla: -0.12, Anuradhapura: -0.15, Ratnapura: -0.10,
};
const yearOffsets = { 2025: -0.05, 2024: -0.02, 2023: 0, 2022: 0.03, 2021: 0.06, 2020: 0.1 };

function buildZScoreEntries(programMap) {
  const entries = [];
  for (const [code, base] of Object.entries(baseCutoffs)) {
    const prog = programMap[code];
    if (!prog) continue;
    for (const dist of DISTRICTS) {
      for (const yr of YEARS) {
        const cutoff = +(base + (districtOffsets[dist] || 0) + (yearOffsets[yr] || 0)).toFixed(4);
        entries.push({
          degreeProgramId: prog._id,
          universityId: prog.universityId,
          year: yr,
          district: dist,
          cutoffZScore: cutoff,
        });
      }
    }
  }
  return entries;
}

async function seed() {
  try {
    console.log("Clearing existing eligibility seed data...");
    await ZScoreTable.deleteMany({});
    await DegreeProgram.deleteMany({});
    await University.deleteMany({});

    console.log("Seeding 15 universities...");
    const insertedUnis = await University.insertMany(universities);
    const uniMap = {};
    for (const u of insertedUnis) uniMap[u.code] = u._id;

    console.log("Seeding 30 degree programs...");
    const progData = programs(uniMap);
    const insertedProgs = await DegreeProgram.insertMany(progData);
    const programMap = {};
    for (const p of insertedProgs) programMap[p.code] = p;

    console.log(`Seeding Z-score cutoff entries (${DISTRICTS.length} districts × ${YEARS.length} years × ${insertedProgs.length} programs = ${DISTRICTS.length * YEARS.length * insertedProgs.length} rows)...`);
    const zEntries = buildZScoreEntries(programMap);
    await ZScoreTable.insertMany(zEntries);

    console.log(`Done! Seeded ${insertedUnis.length} universities, ${insertedProgs.length} programs, ${zEntries.length} Z-score entries.`);
  } catch (err) {
    console.error("Seed error:", err);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
}

seed();
