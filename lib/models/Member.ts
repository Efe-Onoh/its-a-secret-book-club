import mongoose, { Schema, Document } from "mongoose";

export interface IMember extends Document {
  name: string;
  email: string;
  whatsapp: string;
  bookAnswer: string;
  status: "pending" | "approved" | "declined";
  createdAt: Date;
}

const MemberSchema = new Schema<IMember>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    whatsapp: { type: String, required: true },
    bookAnswer: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "approved", "declined"],
      default: "pending",
    },
  },
  { timestamps: true },
);

export default mongoose.models.Member || mongoose.model<IMember>("Member", MemberSchema);
