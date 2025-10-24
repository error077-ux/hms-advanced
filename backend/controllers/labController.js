const labService = require('../services/labService');

exports.getAllTests = async (req, res, next) => {
  try {
    const tests = await labService.getAllTests();
    res.json(tests);
  } catch (err) {
    next(err);
  }
};

exports.updateResult = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { result } = req.body;
    await labService.updateResult(id, result);
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};

exports.uploadReport = async (req, res, next) => {
  try {
    const { id } = req.params;
    await labService.uploadReport(id, req.file.filename);
    res.json({ success: true, file: req.file.filename });
  } catch (err) {
    next(err);
  }
};