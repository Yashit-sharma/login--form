const express = require('express')
const router = express.Router()
const schemas = require('../models/Schemas') 

router.post('/loginData', async(req,res)=>{
    const {Email,Pass} = req.body;
    const UserName = Email;
    const exist = await schemas.Users.findOne({UserName})
    if(!exist){
        return res.json({Message : "User Not Found"});
    }
    else{
        if(Pass === exist.PassWord){
           return res.json({Message : "Logged In SuccessFully",Bool : true})
        }
        else{
           return res.json({Message : "PassWord Incorrect",Bool : false})
        }
    }
})

router.post('/usersData', async(req,res)=>{
    try{
        const {User,Pass} = req.body;
        const Data = {UserName : User,PassWord : Pass};
        const NewData = schemas.Users(Data);
        await NewData.save();
        return res.json({Message : `Added User`})
    }
    catch(err){
        console.log(err);
        return res.json({Message : `Duplicate User Found`,Error : `${err}`})
    }
})

router.get('/users', async (req,res)=>{
    try{
    const userData = await schemas.Users.find({}).exec();
    res.json(userData);
    }
    catch(err){
        console.log(err);
    }
})

module.exports = router