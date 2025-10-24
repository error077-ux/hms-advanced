const db = require('../db');

exports.getAllScans = async () => {
  return db.prepare(`
    SELECT r.*, p.name as patient_name, d.name as doctor_name 
    FROM radiology_tests r
    LEFT JOIN patients p ON r.patient_id = p.id
    LEFT JOIN doctors d ON r.doctor_id = d.id
    ORDER BY r.id DESC
  `).all();
};

exports.updateResult = async (id, result) => {
  db.prepare('UPDATE radiology_tests SET result = ?, status = ? WHERE id = ?')
    .run(result, 'completed', id);
};

exports.uploadReport = async (id, filename) => {
  db.prepare('UPDATE radiology_tests SET report_file = ?, status = ? WHERE id = ?')
    .run(filename, 'completed', id);
};