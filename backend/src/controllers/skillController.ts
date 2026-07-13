import { Request, Response, NextFunction } from 'express'
import { Skill } from '../models/Skill'
import { skillSchema } from '../validators/schemas'
import { AppError } from '../utils/AppError'

export const getSkills = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const skills = await Skill.find().sort({ category: 1, level: -1 })
    res.json({ success: true, data: skills })
  } catch (error) {
    next(error)
  }
}

export const getSkillById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const skill = await Skill.findById(req.params.id)
    if (!skill) {
      return next(new AppError('Skill not found', 404))
    }
    res.json({ success: true, data: skill })
  } catch (error) {
    next(error)
  }
}

export const createSkill = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validated = skillSchema.parse(req.body)
    const skill = await Skill.create(validated)
    res.status(201).json({ success: true, data: skill })
  } catch (error) {
    next(error)
  }
}

export const updateSkill = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validated = skillSchema.partial().parse(req.body)
    const skill = await Skill.findByIdAndUpdate(req.params.id, validated, { new: true, runValidators: true })
    if (!skill) {
      return next(new AppError('Skill not found', 404))
    }
    res.json({ success: true, data: skill })
  } catch (error) {
    next(error)
  }
}

export const deleteSkill = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const skill = await Skill.findByIdAndDelete(req.params.id)
    if (!skill) {
      return next(new AppError('Skill not found', 404))
    }
    res.json({ success: true, message: 'Skill deleted successfully' })
  } catch (error) {
    next(error)
  }
}