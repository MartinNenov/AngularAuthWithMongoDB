require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/user');
const app = express();

mongoose.connect(process.env.DATABASE_URL,{useNewUrlParser:true,useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error',(err)=> console.log(err));
db.once('open',()=>console.log('Connected to DB'));

app.use(express.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});




// ROUTES
app.post('/login',async (req,res)=>{
    try{
        let user = await User.findOne({email:req.body.email});
        if(user!=null && user.password == req.body.password){
            res.status(200).json('Successfuly logged in.');
        }else{
            throw new Error('Email or Password awre incorect');
        }
    }catch(err){
        console.log(err);
        res.json(err.toString());
    }
})

app.post('/register',async (req,res)=>{
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    try{
        if(await User.findOne({username:user.username}) != null){
            throw new Error('Username is taken.Place chose a new one.');
        }else if(await User.findOne({email:user.email}) != null){
            throw new Error('Email is taken.Place chose a new one.');
        }else{
            await user.save();
            res.status(201).json({
                username: req.body.username,
                email: req.body.email
            })
        }
    }catch(err){
        console.log(err);
        res.json(err.toString());
    }
})

// Start listening to the server


let port = 3000;
app.listen(port,()=>{
    console.log(`Server listening on port:${port}`);
});
