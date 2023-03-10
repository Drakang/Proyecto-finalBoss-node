const { User } = require("../models");
const express = require("express");

const router = express.Router();

router.get("/", async(req, res,next)=>{
    try {
        const user = await User.findById(req.user._id)
        
        if (user) {
            res.json({
              id: user._id,
              name: user.name,
              email: user.email,
            })
        }
    } catch (error) {
        next(error)
        res.status(404)
    }
})

router.delete("/delete", async(req, res,next)=>{
    try {
        const user = await User.findById(req.user._id)
        await User.deleteOne(user)
        
        res.status(201).json('success');
    } catch (error) {
        next(error)
        res.status(404).json(error)
    }
})

module.exports = router;