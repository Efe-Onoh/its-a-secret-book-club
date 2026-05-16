import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Attendee from "@/lib/models/Attendee";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

interface RSVPData {
  name: string;
  email: string;
  whatsapp: string;
  eventId: string;
  eventTitle: string;
  eventDate: string;
  eventTime: string;
  eventLocation: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: RSVPData = await request.json();
    const { name, email, whatsapp, eventId, eventTitle, eventDate, eventTime, eventLocation } = body;

    if (!name || !email || !whatsapp || !eventId) {
      return NextResponse.json({ error: "Please fill in all fields" }, { status: 400 });
    }

    await connectToDatabase();

    // Check if this email already RSVPd for this event
    // Prevents duplicate registrations
    const existing = await Attendee.findOne({ email, eventId });
    if (existing) {
      return NextResponse.json({ message: "You have already RSVPd for this event" }, { status: 200 });
    }

    await Attendee.create({
      name,
      email,
      whatsapp,
      eventId,
      eventTitle,
      eventDate,
      eventTime,
      eventLocation,
    });

    // Admin email
    await transporter.sendMail({
      from: `"It's A Secret Book Club" <${process.env.GMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: `New RSVP — ${eventTitle}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0;">
          <div style="background: #0a0a0a; padding: 32px 40px;">
            <p style="margin: 0 0 4px; font-size: 11px; letter-spacing: 4px; text-transform: uppercase; color: rgba(255,255,255,0.5);">New RSVP</p>
            <h1 style="margin: 0; font-size: 32px; font-weight: 900; color: #ffffff; text-transform: uppercase;">${eventTitle}</h1>
          </div>
          <div style="padding: 32px 40px; background: #ffffff;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0;">
                <p style="margin: 0 0 2px; font-size: 10px; letter-spacing: 3px; text-transform: uppercase; color: #999;">Name</p>
                <p style="margin: 0; font-size: 16px; color: #0a0a0a;">${name}</p>
              </td></tr>
              <tr><td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0;">
                <p style="margin: 0 0 2px; font-size: 10px; letter-spacing: 3px; text-transform: uppercase; color: #999;">Email</p>
                <p style="margin: 0; font-size: 16px; color: #0a0a0a;">${email}</p>
              </td></tr>
              <tr><td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0;">
                <p style="margin: 0 0 2px; font-size: 10px; letter-spacing: 3px; text-transform: uppercase; color: #999;">WhatsApp</p>
                <p style="margin: 0; font-size: 16px; color: #0a0a0a;">${whatsapp}</p>
              </td></tr>
              <tr><td style="padding: 12px 0;">
                <p style="margin: 0 0 2px; font-size: 10px; letter-spacing: 3px; text-transform: uppercase; color: #999;">Event</p>
                <p style="margin: 0; font-size: 16px; color: #0a0a0a;">${eventDate} · ${eventTime} · ${eventLocation}</p>
              </td></tr>
            </table>
          </div>
        </div>
      `,
    });

    // Attendee confirmation email — clean white, one accent colour
    await transporter.sendMail({
      from: `"It's A Secret Book Club" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: `You're going — ${eventTitle}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0;">
          
          <!-- Header -->
          <div style="padding: 40px; background: #ffffff; border-bottom: 3px solid #0a0a0a;">
            <p style="margin: 0 0 8px; font-size: 11px; letter-spacing: 4px; text-transform: uppercase; color: #999999;">It's A Secret Book Club</p>
            <h1 style="margin: 0; font-size: 40px; font-weight: 900; color: #0a0a0a; text-transform: uppercase; line-height: 1;">You're going.</h1>
          </div>

          <!-- Event details block -->
          <div style="padding: 32px 40px; background: #f9f8f5;">
            <p style="margin: 0 0 20px; font-size: 11px; letter-spacing: 3px; text-transform: uppercase; color: #999;">Your event</p>
            <h2 style="margin: 0 0 12px; font-size: 28px; font-weight: 900; color: #0a0a0a; text-transform: uppercase; line-height: 1.1;">${eventTitle}</h2>
            <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0; width: 120px;">
                  <p style="margin: 0; font-size: 10px; letter-spacing: 3px; text-transform: uppercase; color: #999;">Date</p>
                </td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0;">
                  <p style="margin: 0; font-size: 15px; color: #0a0a0a;">${eventDate}</p>
                </td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0;">
                  <p style="margin: 0; font-size: 10px; letter-spacing: 3px; text-transform: uppercase; color: #999;">Time</p>
                </td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0;">
                  <p style="margin: 0; font-size: 15px; color: #0a0a0a;">${eventTime}</p>
                </td>
              </tr>
              <tr>
                <td style="padding: 10px 0;">
                  <p style="margin: 0; font-size: 10px; letter-spacing: 3px; text-transform: uppercase; color: #999;">Location</p>
                </td>
                <td style="padding: 10px 0;">
                  <p style="margin: 0; font-size: 15px; color: #0a0a0a;">${eventLocation}</p>
                </td>
              </tr>
            </table>
          </div>

          <!-- Message -->
          <div style="padding: 32px 40px; background: #ffffff;">
            <p style="margin: 0 0 16px; font-size: 16px; color: #0a0a0a; line-height: 1.7;">
              Hi ${name},
            </p>
            <p style="margin: 0 0 16px; font-size: 16px; color: #666666; line-height: 1.7;">
              Your spot is confirmed. We'll send you a reminder with any additional details closer to the date.
            </p>
            <p style="margin: 0; font-size: 16px; color: #666666; line-height: 1.7;">
              See you there.
            </p>
          </div>

          <!-- Footer -->
          <div style="padding: 20px 40px; background: #0a0a0a;">
            <p style="margin: 0; font-size: 11px; letter-spacing: 3px; text-transform: uppercase; color: rgba(255,255,255,0.4);">
              It's A Secret Book Club · Dubai · ${new Date().getFullYear()}
            </p>
          </div>

        </div>
      `,
    });

    return NextResponse.json({ message: "RSVP confirmed" }, { status: 201 });
  } catch (error) {
    console.error("RSVP error:", error);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
