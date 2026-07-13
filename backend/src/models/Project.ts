import { Schema, model, models, Document } from 'mongoose'

export interface IProject extends Document {
  title: string
  description: string
  technologies: string[]
  featured: boolean
  demoUrl?: string
  repoUrl?: string
  image?: string
  createdAt: Date
  updatedAt: Date
}

const projectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true, trim: true, maxlength: 100 },
    description: { type: String, required: true, trim: true, maxlength: 1000 },
    technologies: [{ type: String, trim: true }],
    featured: { type: Boolean, default: false },
    demoUrl: { type: String, trim: true },
    repoUrl: { type: String, trim: true },
    image: { type: String, trim: true },
  },
  { timestamps: true }
)

projectSchema.index({ title: 'text', description: 'text' })

export const Project = models.Project || model<IProject>('Project', projectSchema)