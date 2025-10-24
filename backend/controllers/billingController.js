const billingService = require('../services/billingService');

exports.getPatientBills = async (req, res, next) => {
  try {
    const bills = await billingService.getPatientBills(req.user.id);
    res.json(bills);
  } catch (err) {
    next(err);
  }
};

exports.markAsPaid = async (req, res, next) => {
  try {
    const { id } = req.params;
    await billingService.markAsPaid(id);
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};

exports.exportCSV = async (req, res, next) => {
  try {
    const csv = await billingService.exportCSV();
    res.header('Content-Type', 'text/csv');
    res.attachment('billing_report.csv');
    res.send(csv);
  } catch (err) {
    next(err);
  }
};