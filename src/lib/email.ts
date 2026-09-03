import nodemailer from 'nodemailer';

// Booking details ka type define kar rahay hain taake TypeScript error na de
interface BookingDetails {
  full_name: string;
  service_date: string;
  service_time: string;
  full_address: string;
  cleaning_type?: string;
}

export async function sendAssignmentEmail(
  cleanerEmail: string, 
  cleanerName: string, 
  bookingDetails: BookingDetails
) {
  try {
    // 1. Email bhejney wala (Transporter) setup
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 465,
      secure: true, // Port 465 ke liye hamesha true hota hai
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // 2. Email ka design aur content
    const mailOptions = {
      from: `"Camz Cleaning" <${process.env.SMTP_USER}>`,
      to: cleanerEmail,
      subject: `New Job Assigned: ${bookingDetails.cleaning_type || 'Cleaning Service'}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; border: 1px solid #e0e0e0; border-radius: 8px;">
          <h2 style="color: #0056b3;">Hello ${cleanerName},</h2>
          <p style="color: #333; font-size: 16px;">You have been assigned a new cleaning job. Here are the details:</p>
          
          <table style="width: 100%; border-collapse: collapse; margin-top: 15px; color: #333; font-size: 15px;">
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; width: 35%;"><strong>Customer:</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${bookingDetails.full_name}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Service Date:</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${bookingDetails.service_date}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Time:</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${bookingDetails.service_time}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Address:</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${bookingDetails.full_address}</td>
            </tr>
          </table>
          
          <p style="margin-top: 25px; color: #555; font-size: 14px;">Please log in to your cleaner dashboard for full instructions and scope of work.</p>
          <p style="margin-top: 15px; font-size: 15px;">Best Regards,<br><strong style="color: #000;">Camz Cleaning Operations</strong></p>
        </div>
      `,
    };

    // 3. Email Send karna
    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ Email successfully sent to ${cleanerEmail} (ID: ${info.messageId})`);
    return true;

  } catch (error) {
    console.error("❌ Error sending email:", error);
    return false;
  }
}