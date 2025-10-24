const db = require('../db');

exports.listDepartments = async () => {
  return db.prepare('SELECT * FROM departments').all();
};

exports.addDepartment = async (name) => {
  db.prepare('INSERT INTO departments (name) VALUES (?)').run(name);
};

exports.listStaff = async () => {
  // Returns doctors, nurses, admins
  const doctors = db.prepare('SELECT * FROM doctors').all();
  const nurses = db.prepare('SELECT * FROM nurses').all();
  const admins = db.prepare('SELECT * FROM users WHERE role IN (?, ?, ?)')
    .all('admin', 'director', 'payment_officer');
  return { doctors, nurses, admins };
};

exports.analytics = async () => {
  const appointments = db.prepare('SELECT COUNT(*) as count FROM appointments').get().count;
  const labTests = db.prepare('SELECT COUNT(*) as count FROM lab_tests').get().count;
  const radiologyTests = db.prepare('SELECT COUNT(*) as count FROM radiology_tests').get().count;
  const billing = db.prepare('SELECT SUM(amount) as total FROM billing').get().total;
  return { appointments, labTests, radiologyTests, billing };
};