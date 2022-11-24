const express = require('express');
const mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
const user = require(`./models/user`);
const ls = require('localStorage')
const { body, validationResult } = require('express-validator');
const cors = require('cors')
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session')
const connectionModuler = require('./abstract/connectionModulers');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    secret: 'thisisaayanceoandfounderoftesla', 
    resave: false,
    saveUninitialized: true
}));
app.use(express.json()) 
const corsOptions ={
    origin:'*', 
    credentials:true,            
    optionSuccessStatus:200,
 }
 
 app.use(cors(corsOptions))




app.post(`/login`,async(req,res) =>{
const username = req.body.username
const data = await user.findOne({username:username})
if(!data){
    const newtoken = jwt.sign({
        user: username
    },`jwtPrivateKey`)
   const newuser = await user.create({
    username: req.body.username,
    todo: "",
    name: 'Not Provided',
    token: newtoken
   }).then(x=> res.status(200).json({token: newtoken}))
} 
if(data){
    const newtoken = jwt.sign({
        user: req.body.username
    },`jwtPrivateKey`)

    res.status(200).json({token: newtoken})
}
})

app.post(`/sent`, async(req,res) => {
    const {text,token} = req.body;
const verify = jwt.verify(token, "jwtPrivateKey");
const users = await user.updateOne({
    username:verify.user,
    todo: text,
    name: null,
    token: token
}).then(z => res.status(201).json({message: `Successfully Saved !`}))

})

app.post(`/see`, async(req,res) => {
    try {
    const {token} = req.body;

    const verify = jwt.verify(token, "jwtPrivateKey");
    const users = await user.findOne({username:verify.user}).then(p => res.json(p));
    } catch(err){
       console.log(err)
    }
})
connectionModuler.createMongooseConnection("mongodb+srv://aayan:aayan@cluster0.hqv8y.mongodb.net/?retryWrites=true&w=majority")
app.listen(4000,() => {
    console.log('Backend is ready to serve')
})


// DEVELOPED BY AAYAN