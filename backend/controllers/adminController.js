const adminService = require('../services/adminService');

exports.listDepartments = async (req, res, next) => {
  try {
    res.json(await adminService.listDepartments());
  } catch (err) {
    next(err);
  }
};

exports.addDepartment = async (req, res, next) => {
  try {
    const { name } = req.body;
    await adminService.addDepartment(name);
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};

exports.listStaff = async (req, res, next) => {
  try {
    res.json(await adminService.listStaff());
  } catch (err) {
    next(err);
  }
};

exports.analytics = async (req, res, next) => {
  try {
    res.json(await adminService.analytics());
  } catch (err) {
    next(err);
  }
};