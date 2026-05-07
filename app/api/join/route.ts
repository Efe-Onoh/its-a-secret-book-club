import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import connectToDatabase from "@/lib/mongodb";
import Member from "@/lib/models/Member";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

interface JoinFormData {
  name: string;
  email: string;
  whatsapp: string;
  bookAnswer: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: JoinFormData = await request.json();
    const { name, email, whatsapp, bookAnswer } = body;

    if (!name || !email || !whatsapp || !bookAnswer) {
      return NextResponse.json({ error: "Please fill in all fields" }, { status: 400 });
    }

    await connectToDatabase();
    // opens a connection to your MongoDB Atlas database. We await it because connecting takes a moment and we need to wait for it to finish before doing anything else.

    const member = await Member.create({
      name,
      email,
      whatsapp,
      bookAnswer,
    });

    await transporter.sendMail({
      from: `"It's A Secret Book Club" <${process.env.GMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: `New application — ${name}`,
      html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      
      <!-- Header colour block -->
      <div style="background-color: #E63946; padding: 48px 40px;">
        <p style="margin: 0 0 8px 0; font-size: 11px; letter-spacing: 4px; text-transform: uppercase; color: rgba(255,255,255,0.7);">New Application</p>
        <h1 style="margin: 0; font-size: 48px; font-weight: 900; color: #ffffff; line-height: 1; text-transform: uppercase;">
          ${name}
        </h1>
      </div>

      <!-- Details block -->
      <div style="background-color: #1B1B1B; padding: 40px;">
        
        <!-- Each detail row -->
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 16px 0; border-bottom: 1px solid #333333;">
              <p style="margin: 0 0 4px 0; font-size: 10px; letter-spacing: 3px; text-transform: uppercase; color: #666666;">Email</p>
              <p style="margin: 0; font-size: 16px; color: #ffffff;">${email}</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 16px 0; border-bottom: 1px solid #333333;">
              <p style="margin: 0 0 4px 0; font-size: 10px; letter-spacing: 3px; text-transform: uppercase; color: #666666;">WhatsApp</p>
              <p style="margin: 0; font-size: 16px; color: #ffffff;">${whatsapp}</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 16px 0;">
              <p style="margin: 0 0 4px 0; font-size: 10px; letter-spacing: 3px; text-transform: uppercase; color: #666666;">What book changed them</p>
              <p style="margin: 0; font-size: 16px; color: #ffffff; line-height: 1.6;">${bookAnswer}</p>
            </td>
          </tr>
        </table>

      </div>

      <!-- Footer -->
      <div style="background-color: #E63946; padding: 24px 40px;">
        <p style="margin: 0; font-size: 11px; letter-spacing: 3px; text-transform: uppercase; color: rgba(255,255,255,0.6);">
          It's A Secret Book Club · Dubai · ${new Date().getFullYear()}
        </p>
      </div>

    </div>
  `,
    });

    await transporter.sendMail({
      from: `"It's A Secret Book Club" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: `You applied. We'll be in touch.`,
      html: `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">

    <!-- Header -->
    <div style="background-color: #9C27B0; padding: 48px 40px;">
      <p style="margin: 0 0 8px 0; font-size: 11px; letter-spacing: 4px; text-transform: uppercase; color: rgba(255,255,255,0.7);">It's A Secret Book Club</p>
      <h1 style="margin: 0; font-size: 48px; font-weight: 900; color: #ffffff; line-height: 1; text-transform: uppercase;">
        See you<br />there!
      </h1>
    </div>

    <!-- Body -->
    <div style="background-color: #1B1B1B; padding: 40px;">
      <p style="margin: 0 0 24px 0; font-size: 18px; color: #ffffff; line-height: 1.7;">
        Hi ${name}!
      </p>
      <p style="margin: 0 0 24px 0; font-size: 16px; color: #999999; line-height: 1.7;">
        We got your RSVP and we're so glad you're coming. No approval, no waitlist — just show up, grab a seat, and enjoy the conversation.
      </p>
      <p style="margin: 0; font-size: 16px; color: #999999; line-height: 1.7;">
        We'll be in touch before the session with all the details — location, what to bring, and a little about the book if you haven't started yet.
      </p>
    </div>

    <!-- Colour block -->
    <div style="background-color: #F4D35E; padding: 32px 40px;">
      <p style="margin: 0; font-size: 13px; letter-spacing: 2px; text-transform: uppercase; color: #1A1800; line-height: 1.7;">
        Can't wait to meet you.<br />
        Happy reading!
      </p>
    </div>

    <!-- Footer -->
    <div style="background-color: #1B1B1B; padding: 24px 40px; border-top: 1px solid #333;">
      <p style="margin: 0; font-size: 11px; letter-spacing: 3px; text-transform: uppercase; color: #444444;">
        It's A Secret Book Club · Dubai · ${new Date().getFullYear()}
      </p>
    </div>

  </div>
`,
    });
    return NextResponse.json({ message: "Application received", id: member._id }, { status: 201 });
  } catch (error) {
    console.error("Join form error:", error);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
