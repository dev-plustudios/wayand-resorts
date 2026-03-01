const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendBookingEmail = async (bookingData) => {
  const {
    name,
    email,
    phone,
    checkIn,
    checkOut,
    guests,
    roomType,
    specialRequests,
    totalAmount,
    timestamp,
  } = bookingData;

  const adminEmail = "pranavpranavc577@gmail.com";

  const htmlContent = `
    <h2>AERO WAYANAD - New Booking Request</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Phone:</strong> ${phone}</p>
    <p><strong>Check-in:</strong> ${checkIn}</p>
    <p><strong>Check-out:</strong> ${checkOut}</p>
    <p><strong>Guests:</strong> ${guests}</p>
    <p><strong>Room Type:</strong> ${roomType}</p>
    <p><strong>Special Requests:</strong> ${specialRequests || "None"}</p>
    <p><strong>Total:</strong> ₹${totalAmount}</p>
    <p><strong>Requested On:</strong> ${timestamp}</p>
  `;

  await resend.emails.send({
    from: "Aero Wayanad <onboarding@resend.dev>",
    to: [email, adminEmail],
    subject: `Booking Request - ${name}`,
    html: htmlContent,
  });
};

module.exports = { sendBookingEmail };