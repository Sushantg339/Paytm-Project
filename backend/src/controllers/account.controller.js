const { default: z } = require("zod")
const accountModel = require("../models/account.model")
const mongoose = require('mongoose')

const getBalance = async (req , res)=>{
    try {
        const userId = req.userId

        if(!userId){
            return res.status(401).json({
                msg : "unauthporized!"
            })
        }

        const account = await accountModel.findOne({userId})

        return res.status(200).json({
            balance : account.balance
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg : "internal server error!"
        })
    }
}

const transferAmount = async (req, res) => {
    const session = await mongoose.startSession()

    try {
        const requiredBody = z.object({
            to: z.string(),
            amount: z.number().positive()
        })

        const parsed = requiredBody.safeParse(req.body)

        if (!parsed.success) {
            return res.status(400).json({
                msg: "Invalid input schema"
            })
        }

        const { to, amount } = parsed.data

        if (to === req.userId) {
            return res.status(400).json({
                msg: "Cannot transfer to yourself"
            })
        }

        await session.startTransaction()

        const myAccount = await accountModel
            .findOne({ userId: req.userId })
            .session(session)

        if (!myAccount || myAccount.balance < amount) {
            await session.abortTransaction()
            return res.status(400).json({
                msg: "Insufficient balance"
            })
        }

        const receiver = await accountModel
            .findOne({ userId: to })
            .session(session)

        if (!receiver) {
            await session.abortTransaction()
            return res.status(400).json({
                msg: "Invalid receiver"
            })
        }

        await accountModel.updateOne(
            { userId: req.userId },
            { $inc: { balance: -amount } },
            { session }
        )

        await accountModel.updateOne(
            { userId: to },
            { $inc: { balance: amount } },
            { session }
        )

        await session.commitTransaction()
        session.endSession()

        return res.status(200).json({
            message: "Transfer successful"
        })

    } catch (error) {
        await session.abortTransaction()
        session.endSession()

        console.log(error)
        return res.status(500).json({
            msg: "internal server error!"
        })
    }
}

module.exports = {getBalance, transferAmount}