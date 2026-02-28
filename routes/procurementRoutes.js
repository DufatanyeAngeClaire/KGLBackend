const express = require('express');
const { body, validationResult } = require('express-validator');
const Procurement = require('../models/Procurement');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

/**
 * @swagger
 * /procurement:
 *   post:
 *     summary: Record procurement
 *     tags: [Procurement]
 *     responses:
 *       201: Procurement recorded
 */
router.post('/',
  protect,
  authorize('Manager'),
  body('produceName').isAlphanumeric(),
  body('produceType').isLength({ min: 2 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json(errors.array());

    const procurement = await Procurement.create(req.body);
    res.status(201).json(procurement);
  }
);

module.exports = router;