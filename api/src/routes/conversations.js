import express from 'express'
const router = express.Router()
import {newConv, getConv, getConversationOfTwoUsers} from '../controller/conversationController.js'

router.route('/').post(newConv)
router.route('/:userId').get(getConv)
router.route('/find/:firstUserId/:secondUserId').get(getConversationOfTwoUsers)

export default router
