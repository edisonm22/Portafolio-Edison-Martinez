import { Request, Response, NextFunction } from 'express'
import { Project } from '../models/Project'
import { projectSchema } from '../validators/schemas'
import { AppError } from '../utils/AppError'

export const getProjects = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 })
    res.json({ success: true, data: projects })
  } catch (error) {
    next(error)
  }
}

export const getProjectById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const project = await Project.findById(req.params.id)
    if (!project) {
      return next(new AppError('Project not found', 404))
    }
    res.json({ success: true, data: project })
  } catch (error) {
    next(error)
  }
}

export const createProject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validated = projectSchema.parse(req.body)
    const project = await Project.create(validated)
    res.status(201).json({ success: true, data: project })
  } catch (error) {
    next(error)
  }
}

export const updateProject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validated = projectSchema.partial().parse(req.body)
    const project = await Project.findByIdAndUpdate(req.params.id, validated, { new: true, runValidators: true })
    if (!project) {
      return next(new AppError('Project not found', 404))
    }
    res.json({ success: true, data: project })
  } catch (error) {
    next(error)
  }
}

export const deleteProject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id)
    if (!project) {
      return next(new AppError('Project not found', 404))
    }
    res.json({ success: true, message: 'Project deleted successfully' })
  } catch (error) {
    next(error)
  }
}