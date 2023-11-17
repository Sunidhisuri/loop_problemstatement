

// // routes/reportRoutes.js
// const express = require('express');
// const reportController = require('../controllers/reportController');

// const router = express.Router();

// router.get('/trigger_report', async (req, res) => {
//   try {
//     const result = await reportController.triggerReport();
//     res.json(result);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// router.get('/get_report/:reportId', (req, res) => {
//   const { reportId } = req.params;
//   const result = reportController.getReport(reportId);
//   res.json(result);
// });

// module.exports = router;


const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');

router.post('/trigger_report', async (req, res) => {
  try {
    const result = await reportController.triggerReport();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/get_report/:reportId', (req, res) => {
  const { reportId } = req.params;
  const result = reportController.getReport(reportId);
  res.json(result);
});

module.exports = router;



