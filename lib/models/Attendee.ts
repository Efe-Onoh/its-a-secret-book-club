import mongoose, { Schema, Document } from "mongoose";

export interface IAttendee extends Document {
  name: string;
  email: string;
  whatsapp: string;
  eventId: string;
  eventTitle: string;
  eventDate: string;
  eventTime: string;
  eventLocation: string;
  createdAt: Date;
}

const AttendeeSchema = new Schema<IAttendee>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    whatsapp: { type: String, required: true },
    eventId: { type: String, required: true },
    eventTitle: { type: String, required: true },
    eventDate: { type: String, required: true },
    eventTime: { type: String, required: true },
    eventLocation: { type: String, required: true },
  },
  { timestamps: true },
);

export default (mongoose.models["Attendee"] as mongoose.Model<IAttendee>) ?? mongoose.model<IAttendee>("Attendee", AttendeeSchema);
