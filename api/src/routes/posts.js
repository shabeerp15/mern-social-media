import express from 'express'
const router = express.Router()
import {
    createPost,
    updatePost,
    deletePost,
    likePost,
    getPost,
    timelinePost,
    getAllPost
} from '../controller/postsController.js'

router.route('/').post(createPost)
router.route('/:id').get(getPost).put(updatePost).delete(deletePost)
router.route('/:id/like').put(likePost)
router.route('/timeline/:userId').get(timelinePost)
router.route('/profile/:username').get(getAllPost)

export default router
