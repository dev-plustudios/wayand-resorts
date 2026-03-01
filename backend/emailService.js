const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendBookingEmail = async (bookingData) => {
  const {
    name, email, phone, checkIn, checkOut, guests, roomType, specialRequests, totalAmount, timestamp
  } = bookingData;

  const adminEmail = 'pranavpranavc577@gmail.com';

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; color: #0B3D2E;">
      <h2 style="color: #1F6F50;">AERO WAYANAD - New Booking Request</h2>
      <p>Thank you for choosing Aero Wayanad. Here are your booking details:</p>
      <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
        <tr><td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Name:</strong></td><td style="padding: 10px; border-bottom: 1px solid #ddd;">${name}</td></tr>
        <tr><td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Email:</strong></td><td style="padding: 10px; border-bottom: 1px solid #ddd;">${email}</td></tr>
        <tr><td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Phone:</strong></td><td style="padding: 10px; border-bottom: 1px solid #ddd;">${phone}</td></tr>
        <tr><td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Check-in:</strong></td><td style="padding: 10px; border-bottom: 1px solid #ddd;">${checkIn}</td></tr>
        <tr><td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Check-out:</strong></td><td style="padding: 10px; border-bottom: 1px solid #ddd;">${checkOut}</td></tr>
        <tr><td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Guests:</strong></td><td style="padding: 10px; border-bottom: 1px solid #ddd;">${guests}</td></tr>
        <tr><td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Room Type:</strong></td><td style="padding: 10px; border-bottom: 1px solid #ddd;">${roomType}</td></tr>
        <tr><td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Special Requests:</strong></td><td style="padding: 10px; border-bottom: 1px solid #ddd;">${specialRequests || 'None'}</td></tr>
        <tr><td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Estimated Total Amount:</strong></td><td style="padding: 10px; border-bottom: 1px solid #ddd;">₹${totalAmount}</td></tr>
        <tr><td style="padding: 10px;"><strong>Requested On:</strong></td><td style="padding: 10px;">${timestamp}</td></tr>
      </table>
      <p style="margin-top: 20px; font-weight: bold; color: #FF7A00;">Payment to be completed at the property on check-in day.</p>
    </div>
  `;

  const mailOptions = {
    from: `"Aero Wayanad" <${process.env.EMAIL_USER}>`,
    to: `${email}, ${adminEmail}`,
    subject: `Booking Request Confirmation - Aero Wayanad - ${name}`,
    html: htmlContent,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = {
  sendBookingEmail
};
