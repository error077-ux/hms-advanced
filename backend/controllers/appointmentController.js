const appointmentService = require('../services/appointmentService');

exports.getAll = async (req, res, next) => {
  try {
    // Admin can get all, doctors see theirs, patients see theirs
    const data = await appointmentService.getAppointmentsByRole(req.user);
    res.json(data);
  } catch (err) {
    next(err);
  }
};

exports.updateStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    await appointmentService.updateStatus(id, status);
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};