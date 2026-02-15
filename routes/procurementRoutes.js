const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');

router.post(
    '/',
    protect,
    authorize('Manager'),
    (req, res) => {
        res.status(201).json({
            message: "Procurement recorded successfully (Manager only)"
        });
    }
);

module.exports = router;
