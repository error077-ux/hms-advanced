const db = require('../db');
const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET || 'supersecret';

exports.registerUser = async (userData) => {
  const { username, password, role, abha_id, name, department_id, specialty, dob, gender, contact, address } = userData;
  // Check if username exists:
  const existing = db.prepare('SELECT * FROM users WHERE username = ?').get(username);
  if (existing) throw new Error('Username already exists');
  const userStmt = db.prepare('INSERT INTO users (username, password, role, abha_id) VALUES (?, ?, ?, ?)');
  const userResult = userStmt.run(username, password, role, abha_id);
  const user_id = userResult.lastInsertRowid;

  // Profile creation by role:
  if (role === 'patient') {
    db.prepare('INSERT INTO patients (user_id, name, dob, gender, contact, address) VALUES (?, ?, ?, ?, ?, ?)')
      .run(user_id, name, dob, gender, contact, address);
  } else if (role === 'doctor') {
    db.prepare('INSERT INTO doctors (user_id, name, department_id, specialty) VALUES (?, ?, ?, ?)')
      .run(user_id, name, department_id, specialty);
  } else if (role === 'nurse') {
    db.prepare('INSERT INTO nurses (user_id, name, department_id) VALUES (?, ?, ?)')
      .run(user_id, name, department_id);
  }
  const token = jwt.sign({ id: user_id, username, role }, SECRET, { expiresIn: '1d' });
  return { token, role };
};

exports.loginUser = async (username, password) => {
  const user = db.prepare('SELECT * FROM users WHERE username = ? AND password = ?').get(username, password);
  if (!user) throw new Error('Invalid credentials');
  const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, SECRET, { expiresIn: '1d' });
  return { token, role: user.role };
};