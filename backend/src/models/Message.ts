import mongoose, { Document, Schema } from 'mongoose'

export type MessageStatus = 'pending' | 'read' | 'replied'

export interface IMessage extends Document {
  name: string
  email: string
  subject: string
  message: string
  status: MessageStatus
  createdAt: Date
  updatedAt: Date
}

const messageSchema = new Schema<IMessage>(
  {
    name: { type: String, required: true, trim: true, maxlength: 100 },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: 100 },
    subject: { type: String, required: true, trim: true, maxlength: 200 },
    message: { type: String, required: true, trim: true, maxlength: 5000 },
    status: {
      type: String,
      enum: ['pending', 'read', 'replied'],
      default: 'pending',
    },
  },
  { timestamps: true }
)

messageSchema.index({ createdAt: -1 })
messageSchema.index({ status: 1 })

export const Message = mongoose.model<IMessage>('Message', messageSchema)