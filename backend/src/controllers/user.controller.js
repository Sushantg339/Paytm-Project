const { z } = require("zod")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const userModel = require("../models/user.model")
const accountModel = require("../models/account.model")
const { JWT_SECRET } = require("../config/config")

const signupController = async (req, res)=>{
    try {
        const requiredBody = z.object({
            firstName : z.string(),
            lastName : z.string().optional(),
            username : z.string().email(),
            password : z.string().min(6)
        })

        const parsed = requiredBody.safeParse(req.body)

        if(!parsed.success){
            return res.status(411).json({
                msg : "Email already taken / Incorrect inputs"
            })
        }

        const {firstName, lastName, username, password} = parsed.data

        const isUser = await userModel.findOne({username})

        if(isUser){
            return res.status(411).json({
                msg : "Email already taken / Incorrect inputs"
            })
        }

        const hashedPassword = await bcrypt.hash(password , 10)

        const user = await userModel.create({
            firstName,
            lastName,
            username,
            password: hashedPassword
        })

        await accountModel.create({
            userId : user._id,
            balance : 1 + Math.random() * 10000
        })

        const token = jwt.sign({userId : user._id}, JWT_SECRET)

        return res.status(201).json({
            message: "User created successfully",
            token: token
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg : "internal server error!"
        })
    }
}

const signinController = async (req , res)=>{
    try {
        const requiredBody = z.object({
            username : z.string().email(),
            password : z.string().min(6)
        })

        const parsed = requiredBody.safeParse(req.body)

        if(!parsed.success){
            return res.status(411).json({
                msg : "Error while logging in"
            })
        }

        const {username, password} = parsed.data

        const user = await userModel.findOne({username})

        if(!user){
            return res.status(411).json({
                msg : "Error while logging in"
            })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if(!isPasswordValid){
            return res.status(411).json({
                msg : "Error while logging in"
            })
        }

        const token = await jwt.sign({userId : user._id}, JWT_SECRET)

        return res.status(200).json({
            jwt : token
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg : "internal server error!"
        })
    }
}

const updateDetails = async (req , res)=>{
    try {
        const userId = req.userId

        if(!userId){
            return res.status(404).json({
                msg : "user not found"
            })
        }

        const requiredBody = z.object({
            firstName : z.string().optional(),
            lastName : z.string().optional(),
            password : z.string().min(6).optional()
        })

        const parsed = requiredBody.safeParse(req.body)

        if(!parsed.success){
            return res.status(411).json({
                msg : "Error while updating information"
            })
        }

        const {firstName, lastName, password} = parsed.data

        const updateData = {}

        

        if (firstName) updateData.firstName = firstName
        if (lastName) updateData.lastName = lastName

        if (password) updateData.password = await bcrypt.hash(password, 10)
        

        if (Object.keys(updateData).length === 0) {
            return res.status(400).json({
                msg: "No fields provided to update"
            })
        }

        await userModel.findByIdAndUpdate(userId, updateData, {new: true})

        return res.status(200).json({
            message: "Updated successfully"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg : "internal server error!"
        })
    }
}

const getUsers = async (req , res)=>{
    try {
        const {filter} = req.query

        let query = {}

        if(filter){
            query = {
                $or : [
                    {username : {$regex : filter, $options : 'i'}},
                    {firstName : {$regex : filter, $options : 'i'}},
                    {lastName : {$regex : filter, $options : 'i'}}
                ]
            }
        }

        const users = await userModel.find(query).select('-password')

        return res.status(200).json({
            msg : "users fetched successfully!",
            users
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg : "internal server error!"
        })
    }
}


module.exports = {signupController, signinController, updateDetails, getUsers}