const Database = require('better-sqlite3');
const db = new Database('./hospital.db');

// Create all tables (as shown earlier in this conversation)
// You can add/modify columns as needed.

db.exec(`
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE,
  password TEXT,
  role TEXT,
  abha_id TEXT
);

CREATE TABLE IF NOT EXISTS departments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT UNIQUE
);

CREATE TABLE IF NOT EXISTS patients (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER,
  name TEXT,
  dob TEXT,
  gender TEXT,
  contact TEXT,
  address TEXT,
  FOREIGN KEY(user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS doctors (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER,
  name TEXT,
  department_id INTEGER,
  specialty TEXT,
  FOREIGN KEY(user_id) REFERENCES users(id),
  FOREIGN KEY(department_id) REFERENCES departments(id)
);

CREATE TABLE IF NOT EXISTS nurses (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER,
  name TEXT,
  department_id INTEGER,
  FOREIGN KEY(user_id) REFERENCES users(id),
  FOREIGN KEY(department_id) REFERENCES departments(id)
);

CREATE TABLE IF NOT EXISTS appointments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  patient_id INTEGER,
  doctor_id INTEGER,
  department_id INTEGER,
  date TEXT,
  time TEXT,
  status TEXT,
  FOREIGN KEY(patient_id) REFERENCES patients(id),
  FOREIGN KEY(doctor_id) REFERENCES doctors(id),
  FOREIGN KEY(department_id) REFERENCES departments(id)
);

CREATE TABLE IF NOT EXISTS prescriptions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  appointment_id INTEGER,
  doctor_id INTEGER,
  patient_id INTEGER,
  medicines TEXT,
  notes TEXT,
  date TEXT,
  FOREIGN KEY(appointment_id) REFERENCES appointments(id),
  FOREIGN KEY(doctor_id) REFERENCES doctors(id),
  FOREIGN KEY(patient_id) REFERENCES patients(id)
);

CREATE TABLE IF NOT EXISTS lab_tests (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  appointment_id INTEGER,
  patient_id INTEGER,
  doctor_id INTEGER,
  test_name TEXT,
  result TEXT,
  report_file TEXT,
  status TEXT,
  FOREIGN KEY(appointment_id) REFERENCES appointments(id),
  FOREIGN KEY(doctor_id) REFERENCES doctors(id),
  FOREIGN KEY(patient_id) REFERENCES patients(id)
);

CREATE TABLE IF NOT EXISTS radiology_tests (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  appointment_id INTEGER,
  patient_id INTEGER,
  doctor_id INTEGER,
  scan_type TEXT,
  result TEXT,
  report_file TEXT,
  status TEXT,
  FOREIGN KEY(appointment_id) REFERENCES appointments(id),
  FOREIGN KEY(doctor_id) REFERENCES doctors(id),
  FOREIGN KEY(patient_id) REFERENCES patients(id)
);

CREATE TABLE IF NOT EXISTS billing (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  appointment_id INTEGER,
  patient_id INTEGER,
  amount REAL,
  paid INTEGER,
  date TEXT,
  FOREIGN KEY(appointment_id) REFERENCES appointments(id),
  FOREIGN KEY(patient_id) REFERENCES patients(id)
);

CREATE TABLE IF NOT EXISTS insurance_docs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  patient_id INTEGER,
  file_name TEXT,
  upload_date TEXT,
  FOREIGN KEY(patient_id) REFERENCES patients(id)
);

CREATE TABLE IF NOT EXISTS notifications (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER,
  message TEXT,
  seen INTEGER DEFAULT 0,
  created_at TEXT,
  FOREIGN KEY(user_id) REFERENCES users(id)
);
`);

module.exports = db;