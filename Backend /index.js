const express = require("express")
const cors = require("cors");
const bodyParser = require("body-parser");
const router = require('./routes/router')
const mongoose = require('mongoose');
const schemas = require('./models/Schemas') 
require('dotenv/config');


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
const corsOptions = {
    origin : 'https://login-form-front.vercel.app',
    credential : true,
    optionSuccessStatus : 200
}
app.use(cors(corsOptions));

app.post('/loginData', async(req,res)=>{
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

app.post('/usersData', async(req,res)=>{
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

app.get('/users', async (req,res)=>{
    try{
    const userData = await schemas.Users.find({}).exec();
    res.json(userData);
    }
    catch(err){
        console.log(err);
    }
})

app.get('/',(req,res) =>{
    return res.json('Hello')
})
// app.use('/',router);
mongoose.connect(process.env.DB_URI)
.then(() => console.log("DB connected"))
.catch(err => console.log(err));

//  we create an env file to mask our important information so that when we share code no one else can see it.
const port = process.env.PORT || 4000;
const server = app.listen(port,()=>{
    console.log('Server 4000 is running')
})