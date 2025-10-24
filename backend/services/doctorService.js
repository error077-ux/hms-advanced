const db = require('../db');

exports.getDoctorByUserId = async (user_id) => {
  return db.prepare('SELECT * FROM doctors WHERE user_id = ?').get(user_id);
};

exports.getAppointments = async (doctor_id) => {
  return db.prepare(`
    SELECT a.*, p.name as patient_name FROM appointments a
    LEFT JOIN patients p ON a.patient_id = p.id
    WHERE a.doctor_id = ?
    ORDER BY a.date DESC
  `).all(doctor_id);
};

exports.addPrescription = async (appointment_id, doctor_id, patient_id, medicines, notes) => {
  const date = new Date().toISOString();
  db.prepare(`
    INSERT INTO prescriptions (appointment_id, doctor_id, patient_id, medicines, notes, date)
    VALUES (?, ?, ?, ?, ?, ?)
  `).run(appointment_id, doctor_id, patient_id, medicines, notes, date);
};

exports.requestLabTest = async (appointment_id, patient_id, doctor_id, test_name) => {
  db.prepare(`
    INSERT INTO lab_tests (appointment_id, patient_id, doctor_id, test_name, status)
    VALUES (?, ?, ?, ?, ?)
  `).run(appointment_id, patient_id, doctor_id, test_name, 'pending');
};

exports.requestRadiologyTest = async (appointment_id, patient_id, doctor_id, scan_type) => {
  db.prepare(`
    INSERT INTO radiology_tests (appointment_id, patient_id, doctor_id, scan_type, status)
    VALUES (?, ?, ?, ?, ?)
  `).run(appointment_id, patient_id, doctor_id, scan_type, 'pending');
};