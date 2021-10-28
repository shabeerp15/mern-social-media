import express from 'express'
const router = express.Router()
import {updateUser, deleteUser,getUserById,followUser,unfollowUser, getFriends} from '../controller/userController.js'

router.route('/').get(getUserById)
router.route('/:id').put(updateUser).delete(deleteUser)
router.route('/:id/follow').put(followUser)
router.route('/:id/unfollow').put(unfollowUser)
router.route('/friends/:userId').get(getFriends) 

export default router
