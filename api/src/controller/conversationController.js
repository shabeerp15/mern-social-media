import express from 'express'
import User from '../models/userModels.js'
import Conversation from '../models/conversationModels.js'
import colors from 'colors'

// @desc    : New Conversation
// Method   : POST /conversations/
// Access   : Private
const newConv = async (req, res) => {
    const newConversation = new Conversation({
        members: [req.body.senderId, req.body.receiverId],
    })
    try {
        const savedConversation = await newConversation.save()
        res.status(200).json(savedConversation)
    } catch (error) {
        res.status(400).json(error)
    }
}

// @desc    : Get Conversation of user
// Method   : GET /conversations/
// Access   : Private
const getConv = async (req, res) => {
    try {
        const conversation = await Conversation.find({
            members: { $in: [req.params.userId] },
        })
        res.status(200).json(conversation)
    } catch (error) {
        res.status(400).json(error)
    }
}

// @desc    : Get Conversation includes two userId
// Method   : GET /conversations/find
// Access   : Private
const getConversationOfTwoUsers = async (req, res) => {
    try {
        const conversation = await Conversation.findOne({
            members: {
                $all: [req.params.firstUserId, req.params.secondUserId],
            },
        })
        res.status(200).json(conversation)
    } catch (error) {
        res.status(400).json(error)
    }
}

export { newConv, getConv, getConversationOfTwoUsers }
