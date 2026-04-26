require('dotenv').config();
const mongoose = require('mongoose');
const Student = require('./models/Student');

const students = [
  {
    studentId: 'STU001',
    name: 'Alice Johnson',
    email: 'alice.johnson@university.edu',
    department: 'Computer Science',
    year: 3,
    gpa: 3.85,
    phone: '+1-555-101-0001',
  },
  {
    studentId: 'STU002',
    name: 'Bob Martinez',
    email: 'bob.martinez@university.edu',
    department: 'Electrical Engineering',
    year: 2,
    gpa: 3.40,
    phone: '+1-555-101-0002',
  },
  {
    studentId: 'STU003',
    name: 'Clara Nguyen',
    email: 'clara.nguyen@university.edu',
    department: 'Computer Science',
    year: 4,
    gpa: 3.92,
    phone: '+1-555-101-0003',
  },
  {
    studentId: 'STU004',
    name: 'David Kim',
    email: 'david.kim@university.edu',
    department: 'Mechanical Engineering',
    year: 1,
    gpa: 3.10,
    phone: '+1-555-101-0004',
  },
  {
    studentId: 'STU005',
    name: 'Eva Patel',
    email: 'eva.patel@university.edu',
    department: 'Data Science',
    year: 3,
    gpa: 3.75,
    phone: '+1-555-101-0005',
  },
  {
    studentId: 'STU006',
    name: 'Frank Osei',
    email: 'frank.osei@university.edu',
    department: 'Electrical Engineering',
    year: 4,
    gpa: 3.55,
    phone: '+1-555-101-0006',
  },
  {
    studentId: 'STU007',
    name: 'Grace Liu',
    email: 'grace.liu@university.edu',
    department: 'Data Science',
    year: 2,
    gpa: 3.88,
    phone: '+1-555-101-0007',
  },
  {
    studentId: 'STU008',
    name: 'Henry Brown',
    email: 'henry.brown@university.edu',
    department: 'Mechanical Engineering',
    year: 3,
    gpa: 2.95,
    phone: '+1-555-101-0008',
  },
  {
    studentId: 'STU009',
    name: 'Isla Torres',
    email: 'isla.torres@university.edu',
    department: 'Computer Science',
    year: 1,
    gpa: 3.60,
    phone: '+1-555-101-0009',
  },
  {
    studentId: 'STU010',
    name: 'James Wilson',
    email: 'james.wilson@university.edu',
    department: 'Business Administration',
    year: 2,
    gpa: 3.20,
    phone: '+1-555-101-0010',
  },
  {
    studentId: 'STU011',
    name: 'Karen Adams',
    email: 'karen.adams@university.edu',
    department: 'Business Administration',
    year: 4,
    gpa: 3.70,
    phone: '+1-555-101-0011',
  },
  {
    studentId: 'STU012',
    name: 'Leo Fernandez',
    email: 'leo.fernandez@university.edu',
    department: 'Data Science',
    year: 3,
    gpa: 3.45,
    phone: '+1-555-101-0012',
  },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB Atlas');

    await Student.deleteMany({});
    console.log('🗑️  Cleared existing students');

    const inserted = await Student.insertMany(students);
    console.log(`🌱 Inserted ${inserted.length} students into the database`);

    inserted.forEach((s) =>
      console.log(`   → [${s.studentId}] ${s.name} — ${s.department}`)
    );
  } catch (err) {
    console.error('❌ Seed failed:', err.message);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected');
  }
}

seed();
