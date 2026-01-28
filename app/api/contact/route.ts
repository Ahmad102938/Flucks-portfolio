import { NextResponse } from "next/server";
import { sendMail } from "@/lib/mailer";
import { isValidPhoneNumber } from "libphonenumber-js";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const {
            name,
            email,
            phone,
            country,
            projectType,
            numberOfPages,
            budget,
            message,
            preferredResponseMethod,
        } = body;

        // Server-side Validation
        if (!name || !email || !projectType) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        // Email Format Validation (Basic)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: "Invalid email format" },
                { status: 400 }
            );
        }

        // Phone Validation (if provided)
        if (phone && !isValidPhoneNumber(phone)) {
            return NextResponse.json(
                { error: "Invalid phone number" },
                { status: 400 }
            );
        }

        // Prepare Email Content
        const htmlContent = `
            <h2>New Project Inquiry</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone || "N/A"}</p>
            <p><strong>Country:</strong> ${country || "N/A"}</p>
            <p><strong>Project Type:</strong> ${projectType || "N/A"}</p>
            <p><strong>Pages:</strong> ${numberOfPages || "N/A"}</p>
            <p><strong>Budget:</strong> ${budget || "N/A"}</p>
            <p><strong>Preferred Method:</strong> ${preferredResponseMethod || "N/A"}</p>
            <br/>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
        `;

        // Send Email
        await sendMail({
            subject: `New Lead from ${name} - ${projectType || "General Inquiry"}`,
            html: htmlContent,
        });

        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        console.error("Contact API Error:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
