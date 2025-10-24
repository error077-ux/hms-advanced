const radiologyService = require('../services/radiologyService');

exports.getAllScans = async (req, res, next) => {
  try {
    const scans = await radiologyService.getAllScans();
    res.json(scans);
  } catch (err) {
    next(err);
  }
};

exports.updateResult = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { result } = req.body;
    await radiologyService.updateResult(id, result);
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};

exports.uploadReport = async (req, res, next) => {
  try {
    const { id } = req.params;
    await radiologyService.uploadReport(id, req.file.filename);
    res.json({ success: true, file: req.file.filename });
  } catch (err) {
    next(err);
  }
};