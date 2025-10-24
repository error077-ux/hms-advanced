const doctorService = require('../services/doctorService');

exports.getProfile = async (req, res, next) => {
  try {
    const profile = await doctorService.getDoctorByUserId(req.user.id);
    res.json(profile);
  } catch (err) {
    next(err);
  }
};

exports.getAppointments = async (req, res, next) => {
  try {
    const doctor = await doctorService.getDoctorByUserId(req.user.id);
    const appointments = await doctorService.getAppointments(doctor.id);
    res.json(appointments);
  } catch (err) {
    next(err);
  }
};

exports.addPrescription = async (req, res, next) => {
  try {
    const doctor = await doctorService.getDoctorByUserId(req.user.id);
    const { appointment_id, patient_id, medicines, notes } = req.body;
    await doctorService.addPrescription(appointment_id, doctor.id, patient_id, medicines, notes);
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};

exports.requestLabTest = async (req, res, next) => {
  try {
    const doctor = await doctorService.getDoctorByUserId(req.user.id);
    const { appointment_id, patient_id, test_name } = req.body;
    await doctorService.requestLabTest(appointment_id, patient_id, doctor.id, test_name);
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};

exports.requestRadiologyTest = async (req, res, next) => {
  try {
    const doctor = await doctorService.getDoctorByUserId(req.user.id);
    const { appointment_id, patient_id, scan_type } = req.body;
    await doctorService.requestRadiologyTest(appointment_id, patient_id, doctor.id, scan_type);
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};