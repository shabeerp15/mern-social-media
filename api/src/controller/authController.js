import express from 'express'
import User from '../models/userModels.js'
import bcrypt from 'bcrypt'

// @desc    : Register user
// Method   : POST /auth/register
// Access   : Public
const registerUser = async (req, res) => {
    try {
        // fetch data from body
        const {username, email, password} = req.body

        // generate hashed password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        // create a new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        })

        // save user and return response
        const user = await newUser.save()
        res.status(200).json(user)
    } catch (error) {
        res.status(401)
        throw new Error('Sign up failed')
    }
}

// @desc    : Login user
// Method   : POST /auth/login
// Access   : Public
const loginUser = async (req, res) => {
    // const {email, password} = req.body
    try {
        const user = await User.findOne({email: req.body.email})
        !user && res.status(404).json('user not found')

        const validPassword = await bcrypt.compare(
            req.body.password,
            user.password
        )
        !validPassword && res.status(400).json('Wrong password')

        res.status(200).json(user)
    } catch (error) {
        res.status(404)
        throw new Error(error)
    }
}

export {registerUser, loginUser}
