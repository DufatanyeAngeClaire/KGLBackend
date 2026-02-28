const express = require('express');
const { body, validationResult } = require('express-validator');
const Sales = require('../models/Sales');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

/**
 * @swagger
 * /sales:
 *   post:
 *     summary: Record sale (Cash or Credit)
 *     tags: [Sales]
 */
router.post('/',
  protect,
  authorize('Sales Agent'),
  body('saleType').isIn(['Cash', 'Credit']),
  async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json(errors.array());

    if (req.body.saleType === 'Cash' && !req.body.amountPaid)
      return res.status(400).json({ message: 'Cash sale requires amountPaid' });

    if (req.body.saleType === 'Credit' && !req.body.nationalId)
      return res.status(400).json({ message: 'Credit sale requires NIN' });

    const sale = await Sales.create(req.body);
    res.status(201).json(sale);
  }
);

module.exports = router;