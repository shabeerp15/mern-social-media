import express from 'express'
const router = express.Router()
import { addMessage, getMessage } from '../controller/messageController.js'

router.route('/').post(addMessage)
router.route('/:conversationId').get(getMessage)

export default router
