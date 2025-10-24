const db = require('../db');

exports.getAppointmentsByRole = async (user) => {
  if (user.role === 'admin') {
    return db.prepare(`
      SELECT a.*, p.name as patient_name, d.name as doctor_name 
      FROM appointments a
      LEFT JOIN patients p ON a.patient_id = p.id
      LEFT JOIN doctors d ON a.doctor_id = d.id
      ORDER BY a.date DESC
    `).all();
  }
  if (user.role === 'doctor') {
    const doctor = db.prepare('SELECT id FROM doctors WHERE user_id = ?').get(user.id);
    return db.prepare(`
      SELECT a.*, p.name as patient_name 
      FROM appointments a
      LEFT JOIN patients p ON a.patient_id = p.id
      WHERE a.doctor_id = ?
      ORDER BY a.date DESC
    `).all(doctor.id);
  }
  if (user.role === 'patient') {
    const patient = db.prepare('SELECT id FROM patients WHERE user_id = ?').get(user.id);
    return db.prepare(`
      SELECT a.*, d.name as doctor_name 
      FROM appointments a
      LEFT JOIN doctors d ON a.doctor_id = d.id
      WHERE a.patient_id = ?
      ORDER BY a.date DESC
    `).all(patient.id);
  }
  return [];
};

exports.updateStatus = async (id, status) => {
  db.prepare('UPDATE appointments SET status = ? WHERE id = ?').run(status, id);
};