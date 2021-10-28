import express from 'express'
import User from '../models/userModels.js'
import Message from '../models/messageModels.js'
import colors from 'colors'

// @desc    : Add message
// Method   : GET /conversations/
// Access   : Private
const addMessage = async (req, res) => {
    const newMessage = new Message(req.body)
    try {
        const savedMessage = await newMessage.save()
        res.status(200).json(savedMessage)
    } catch (error) {
        res.status(500).json(error)
    }
}

// @desc    : Get message
// Method   : GET /conversations/
// Access   : Private
const getMessage = async (req, res) => {
    try {
        const messages = await Message.find({
            conversationId: req.params.conversationId,
        })

        res.status(200).json(messages)
    } catch (error) {
        res.status(500).json(error)
    }
}

export {addMessage, getMessage}
