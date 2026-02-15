const express = require('express');
const router = express.Router();
const { authenticateToken, isSalesAgent } = require('../middleware/auth');

// Only sales agents can record sales
router.post('/cash', authenticateToken, isSalesAgent, (req, res) => {
    // Logic to record cash sale
    res.json({ message: 'Cash sale recorded (Sales Agent only)' });
});

router.post('/credit', authenticateToken, isSalesAgent, (req, res) => {
    // Logic to record credit/deferred sale
    res.json({ message: 'Credit sale recorded (Sales Agent only)' });
});

module.exports = router;
