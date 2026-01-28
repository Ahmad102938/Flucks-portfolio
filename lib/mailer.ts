import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export async function sendMail(options: {
    subject: string;
    html: string;
}) {
    return transporter.sendMail({
        from: `"Website Lead" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_TO,
        subject: options.subject,
        html: options.html,
    });
}
