import nodemailer from "nodemailer";
const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

const sendTestEmail = async () => {
  try {
    const info = await transporter.sendMail({
      from: process.env.SENDER_EMAIL, // Sender email (ensure it's verified in Brevo)
      to: "recipient@example.com", // Replace with a valid recipient email
      subject: "Test Email from Brevo SMTP",
      text: "Hello, this is a test email sent using Brevo SMTP!",
    });

    console.log("Email sent successfully: " + info.response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

sendTestEmail();

export default transporter;
