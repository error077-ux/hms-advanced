const db = require('../db');

exports.getAllTests = async () => {
  return db.prepare(`
    SELECT l.*, p.name as patient_name, d.name as doctor_name 
    FROM lab_tests l
    LEFT JOIN patients p ON l.patient_id = p.id
    LEFT JOIN doctors d ON l.doctor_id = d.id
    ORDER BY l.id DESC
  `).all();
};

exports.updateResult = async (id, result) => {
  db.prepare('UPDATE lab_tests SET result = ?, status = ? WHERE id = ?')
    .run(result, 'completed', id);
};

exports.uploadReport = async (id, filename) => {
  db.prepare('UPDATE lab_tests SET report_file = ?, status = ? WHERE id = ?')
    .run(filename, 'completed', id);
};