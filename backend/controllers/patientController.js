const patientService = require('../services/patientService');

exports.getProfile = async (req, res, next) => {
  try {
    const patient = await patientService.getPatientByUserId(req.user.id);
    res.json(patient);
  } catch (err) {
    next(err);
  }
};

exports.getAppointments = async (req, res, next) => {
  try {
    const patient = await patientService.getPatientByUserId(req.user.id);
    if (!patient) throw new Error('Patient not found');
    const appointments = await patientService.getAppointments(patient.id);
    res.json(appointments);
  } catch (err) {
    next(err);
  }
};

exports.bookAppointment = async (req, res, next) => {
  try {
    const patient = await patientService.getPatientByUserId(req.user.id);
    if (!patient) throw new Error('Patient not found');
    const data = req.body;
    await patientService.bookAppointment(patient.id, data);
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};

exports.uploadInsurance = async (req, res, next) => {
  try {
    const patient = await patientService.getPatientByUserId(req.user.id);
    if (!patient) throw new Error('Patient not found');
    await patientService.uploadInsurance(patient.id, req.file.filename);
    res.json({ success: true, file: req.file.filename });
  } catch (err) {
    next(err);
  }
};

exports.listInsurance = async (req, res, next) => {
  try {
    const patient = await patientService.getPatientByUserId(req.user.id);
    if (!patient) throw new Error('Patient not found');
    const docs = await patientService.listInsurance(patient.id);
    res.json(docs);
  } catch (err) {
    next(err);
  }
};