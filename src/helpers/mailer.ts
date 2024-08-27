import nodemailer, { SentMessageInfo } from "nodemailer";

interface SendEmailOptions {
  email: string;
  emailType: "VERIFY" | "RESET";
  userId: string;
}

export const sendEmail = async ({
  email,
  emailType,
  userId,
}: SendEmailOptions): Promise<SentMessageInfo> => {
  try {
    // Create a transporter object using SMTP transport
    const transporter = nodemailer.createTransport({
      service: "Gmail", // e.g., Gmail, Yahoo, Outlook (or configure using host, port, etc.)
      auth: {
        user: process.env.EMAIL_USER!, // Your email address
        pass: process.env.EMAIL_PASSWORD!, // Your email password or app-specific password
      },
    });

    // Define the email options
    const mailOptions = {
      from: "emtiaz ahmed",
      to: email,
      subject: emailType === "VERIFY" ? "Verify Your Email" : "Password Reset",
    };

    // Send the email
    const mailResponse = await transporter.sendMail(mailOptions);

    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
