const db = require('../db');
const { createObjectCsvStringifier } = require('csv-writer');

exports.getPatientBills = async (user_id) => {
  const patient = db.prepare('SELECT id FROM patients WHERE user_id = ?').get(user_id);
  if (!patient) return [];
  return db.prepare('SELECT * FROM billing WHERE patient_id = ?').all(patient.id);
};

exports.markAsPaid = async (id) => {
  db.prepare('UPDATE billing SET paid = 1 WHERE id = ?').run(id);
};

exports.exportCSV = async () => {
  const rows = db.prepare('SELECT * FROM billing').all();
  if (!rows.length) return '';
  const csvStringifier = createObjectCsvStringifier({
    header: Object.keys(rows[0]).map(key => ({ id: key, title: key })),
  });
  return csvStringifier.getHeaderString() + csvStringifier.stringifyRecords(rows);
};