const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { sendBookingEmail } = require('./emailService');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.post('/api/booking', async (req, res) => {
    try {
        const bookingData = req.body;
        bookingData.timestamp = new Date().toLocaleString();

        await sendBookingEmail(bookingData);

        res.status(200).json({ success: true, message: 'Booking request sent successfully. Confirmation email sent.' });
    } catch (error) {
        console.error('Error processing booking:', error);
        res.status(500).json({ success: false, message: 'Failed to process booking request.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
