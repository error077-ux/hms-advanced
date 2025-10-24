const db = require('../db');

exports.getPatientByUserId = async (user_id) => {
  return db.prepare('SELECT * FROM patients WHERE user_id = ?').get(user_id);
};

exports.getAppointments = async (patient_id) => {
  return db.prepare(`
    SELECT a.*, d.name as doctor_name FROM appointments a
    LEFT JOIN doctors d ON a.doctor_id = d.id
    WHERE a.patient_id = ?
    ORDER BY a.date DESC
  `).all(patient_id);
};

exports.bookAppointment = async (patient_id, data) => {
  const { doctor_id, department_id, date, time } = data;
  db.prepare('INSERT INTO appointments (patient_id, doctor_id, department_id, date, time, status) VALUES (?, ?, ?, ?, ?, ?)')
    .run(patient_id, doctor_id, department_id, date, time, 'booked');
};

exports.uploadInsurance = async (patient_id, file_name) => {
  db.prepare('INSERT INTO insurance_docs (patient_id, file_name, upload_date) VALUES (?, ?, ?)').run(
    patient_id, file_name, new Date().toISOString()
  );
};

exports.listInsurance = async (patient_id) => {
  return db.prepare('SELECT * FROM insurance_docs WHERE patient_id = ?').all(patient_id);
};