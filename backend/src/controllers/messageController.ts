import { Request, Response, NextFunction } from 'express'
import { Message } from '../models/Message'
import { messageSchema, messageQuerySchema } from '../validators/schemas'
import { AppError } from '../utils/AppError'

export const createMessage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validated = messageSchema.parse(req.body)
    const message = await Message.create(validated)
    res.status(201).json({ success: true, data: message })
  } catch (error) {
    next(error)
  }
}

export const getMessages = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { page, limit, status } = messageQuerySchema.parse(req.query)
    const skip = (page - 1) * limit

    const query = status ? { status } : {}
    const [messages, total] = await Promise.all([
      Message.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Message.countDocuments(query),
    ])

    res.json({
      success: true,
      data: messages,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    })
  } catch (error) {
    next(error)
  }
}

export const getMessageById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const message = await Message.findById(req.params.id)
    if (!message) {
      return next(new AppError('Message not found', 404))
    }
    res.json({ success: true, data: message })
  } catch (error) {
    next(error)
  }
}

export const updateMessageStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { status } = req.body
    if (!['pending', 'read', 'replied'].includes(status)) {
      return next(new AppError('Invalid status', 400))
    }
    const message = await Message.findByIdAndUpdate(req.params.id, { status }, { new: true })
    if (!message) {
      return next(new AppError('Message not found', 404))
    }
    res.json({ success: true, data: message })
  } catch (error) {
    next(error)
  }
}

export const deleteMessage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const message = await Message.findByIdAndDelete(req.params.id)
    if (!message) {
      return next(new AppError('Message not found', 404))
    }
    res.json({ success: true, message: 'Message deleted successfully' })
  } catch (error) {
    next(error)
  }
}