import mongoose, { Schema, model, Document } from 'mongoose'

export interface ISkill extends Document {
  name: string
  category: string
  level: number
  createdAt: Date
  updatedAt: Date
}

const skillSchema = new Schema<ISkill>(
  {
    name: { type: String, required: true, trim: true, maxlength: 50 },
    category: { type: String, required: true, trim: true },
    level: { type: Number, required: true, min: 0, max: 100 },
  },
  { timestamps: true }
)

skillSchema.index({ category: 1, level: -1 })

export const Skill = mongoose.models.Skill || model<ISkill>('Skill', skillSchema)