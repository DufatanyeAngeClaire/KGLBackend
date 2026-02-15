const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { authenticateToken, isManager } = require('../middleware/auth');

// Validation rules
const procurementValidation = [
    body('produceName')
        .isAlphanumeric().withMessage('Produce name must be alphanumeric')
        .notEmpty().withMessage('Produce name is required'),
    body('produceType')
        .isAlpha().withMessage('Produce type must contain only letters')
        .isLength({ min: 2 }).withMessage('Produce type must be at least 2 characters')
        .notEmpty().withMessage('Produce type is required'),
    body('date')
        .notEmpty().withMessage('Date is required'),
    body('time')
        .notEmpty().withMessage('Time is required'),
    body('tonnage')
        .isNumeric().withMessage('Tonnage must be a number')
        .isInt({ min: 100 }).withMessage('Tonnage must be at least 3 digits (100+)'),
    body('cost')
        .isNumeric().withMessage('Cost must be numeric')
        .isLength({ min: 5 }).withMessage('Cost must be at least 5 digits'),
    body('dealerName')
        .isAlphanumeric().withMessage('Dealer name must be alphanumeric')
        .isLength({ min: 2 }).withMessage('Dealer name must be at least 2 characters'),
    body('branch')
        .isIn(['Maganjo', 'Matugga']).withMessage('Branch must be Maganjo or Matugga'),
    body('contact')
        .matches(/^\+?\d{10,15}$/).withMessage('Invalid phone number'),
    body('sellingPrice')
        .isNumeric().withMessage('Selling price must be numeric')
        .notEmpty().withMessage('Selling price is required'),
];

router.post('/', authenticateToken, isManager, procurementValidation, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // TODO: Save procurement to database
    res.json({ message: 'Procurement validated and ready to be saved' });
});

module.exports = router;
