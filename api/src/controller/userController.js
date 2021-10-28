import express from 'express'
import bcrypt from 'bcrypt'
import User from '../models/userModels.js'

// @desc    : Update user
// Method   : PUT /users/:id
// Access   : Private
const updateUser = async (req, res) => {
    if (req.body.userId == req.params.id || req.body.isAdmin) {
        if (req.body.password) {
            try {
                const salt = await bcrypt.genSalt(10)
                req.body.password = await bcrypt.hash(req.body.password, salt)
            } catch (error) {
                return res.status(500).json(error)
            }
        }
        try {
            const user = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            })
            res.status(200).json('Account has been updated')
        } catch (error) {
            return res.status(500).json(error)
        }
    } else {
        return res.status(403).json('You can only update your account')
    }
}

// @desc    : Delete user
// Method   : DELETE /users/:id
// Access   : Private
const deleteUser = async (req, res) => {
    if (req.body.userId == req.params.id || req.body.isAdmin) {
        try {
            const user = await User.findByIdAndDelete(req.params.id)
            res.status(200).json('Account has been deleted')
        } catch (error) {
            return res.status(500).json(error)
        }
    } else {
        return res.status(403).json('You can only delete your account')
    }
}

// @desc    : Get a user
// Method   : GET /users/:id
// Access   : Private
const getUserById = async (req, res) => {
    const userId = req.query.userId
    const username = req.query.username
    try {
        const user = userId
            ? await User.findById(userId)
            : await User.findOne({username})
        const {password, updatedAt, ...others} = user._doc
        res.status(200).json(others)
    } catch (error) {
        return res.status(404).json(error)
    }
}

// @desc    : Get user friends
// Method   : GET /users/friends/:userId
// Access   : Private
const getFriends = async (req, res) => {
    console.log('running------------------------------------------')
    try {
        const user = await User.findById(req.params.userId)
        const friends = await Promise.all(
            user.followings.map((friendId) => {
                return User.findById(friendId)
            })
        )
        let friendList = []
        friends.map((friend) => {
            const {_id, username, profilePicture} = friend
            friendList.push({_id, username, profilePicture})
        })

        res.status(200).json(friendList)
    } catch (error) {
        return res.status(500).json(error)
    }
}

// @desc    : Follow a user
// Method   : PUT /users/:id/follow
// Access   : Private
const followUser = async (req, res) => {
    if (req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id)
            const currentUser = await User.findById(req.body.userId)
            if (!user.followers.includes(req.body.userId)) {
                await user.updateOne({$push: {followers: req.body.userId}})
                await currentUser.updateOne({
                    $push: {followings: req.params.id},
                })
                res.status(200).json('user has been followed')
            } else {
                res.status(404).json('You already follow this user')
            }
        } catch (error) {
            res.status(500).json(error)
        }
    } else {
        res.status(403).json("you can't follow your self")
    }
}

// @desc    : Unfollow a user
// Method   : PUT /users/:id/unfollow
// Access   : Private
const unfollowUser = async (req, res) => {
    if (req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id)
            const currentUser = await User.findById(req.body.userId)
            if (user.followers.includes(req.body.userId)) {
                await user.updateOne({$pull: {followers: req.body.userId}})
                await currentUser.updateOne({
                    $pull: {followings: req.params.id},
                })
                res.status(200).json('user has been unfollowed')
            } else {
                res.status(404).json("You can't follow him")
            }
        } catch (error) {
            res.status(500).json(error)
        }
    } else {
        res.status(403).json("you can't follow your self")
    }
}

export {
    updateUser,
    deleteUser,
    getUserById,
    followUser,
    unfollowUser,
    getFriends,
}
