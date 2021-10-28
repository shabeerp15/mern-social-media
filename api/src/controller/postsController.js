import express from 'express'
import Post from '../models/postModels.js'
import User from '../models/userModels.js'
import colors from 'colors'

// @desc    : Create a post
// Method   : POST /posts/
// Access   : Private
const createPost = async (req, res) => {
    const newPost = new Post(req.body)
    try {
        const savePost = await newPost.save()
        res.status(200).json(savePost)
    } catch (error) {
        res.status(500)
        throw new Error(error)
    }
}

// @desc    : Update a post
// Method   : PUT /posts/:id
// Access   : Private
const updatePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (req.body.userId === post.userId) {
            await post.updateOne({$set: req.body})
            res.status(200).json('The post has been updated')
        } else {
            res.status(403).json('You can only update your post')
        }
    } catch (error) {
        res.status(500)
        throw new Error(error)
    }
}

// @desc    : Delete a post
// Method   : DELETE /posts/:id
// Access   : Private
const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (req.body.userId === post.userId) {
            await post.deleteOne()
            res.status(200).json('The post has been deleted')
        } else {
            res.status(403).json('You can only delete your post')
        }
    } catch (error) {
        res.status(500)
        throw new Error(error)
    }
}

// @desc    : Like&Dislike a post
// Method   : PUT /posts/:id/like
// Access   : Private
const likePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)

        if (!post.likes.includes(req.body.userId)) {
            await post.updateOne({$push: {likes: req.body.userId}})
            res.status(200).json('The post has been liked')
        } else {
            await post.updateOne({$pull: {likes: req.body.userId}})
            res.status(200).json('The post has been disliked')
        }
    } catch (error) {
        res.status(500)
        throw new Error(error)
    }
}

// @desc    : Get a post
// Method   : GET /posts/:id
// Access   : Private
const getPost = async (req, res) => {
    try {
        console.log('object')
        const post = await Post.findById(req.params.id)
        res.status(200).json(post)
    } catch (error) {
        res.status(500)
        throw new Error(error)
    }
}

// @desc    : Timeline post
// Method   : GET /posts/timeline
// Access   : Private
const timelinePost = async (req, res) => {
    try {
        const currentUser = await User.findById(req.params.userId)
        const userPosts = await Post.find({userId: currentUser._id})
        const friendPosts = await Promise.all(
            currentUser.followings.map((friendId) => {
                return Post.find({userId: friendId})
            })
        )
        res.status(200).json(userPosts.concat(...friendPosts))
    } catch (error) {
        res.status(500)
        throw new Error(error)
    }
}

// @desc    : Get user all post
// Method   : GET /posts/timeline
// Access   : Private
const getAllPost = async (req, res) => {
    console.log(req.params.username.red)
    try {
        const user = await User.findOne({username: req.params.username})
        const posts = await Post.find({userId: user._id})

        res.status(200).json(posts)
    } catch (error) {
        res.status(500)
        throw new Error(error)
    }
}

export {
    createPost,
    updatePost,
    deletePost,
    likePost,
    getPost,
    timelinePost,
    getAllPost,
}
