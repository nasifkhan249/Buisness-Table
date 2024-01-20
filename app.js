// Basic Lib Import
const express =require('express');
const mongoose =require('mongoose');
const bodyParser=require('body-parser')
const router =require('./src/routes/api');
const app= new express();






const path= require('path')


// Security Middleware Lib Import
const rateLimit =require('express-rate-limit');
const helmet =require('helmet');
const mongoSanitize =require('express-mongo-sanitize');
const xss =require('xss-clean');
const hpp =require('hpp');
const cors =require('cors');

// Database Lib Import

app.use(express.static('client/build'));

// Security Middleware Implement
app.use(cors())
app.use(mongoSanitize())
app.use(xss())
app.use(hpp())

// Body Parser Implement
app.use(bodyParser.json())

// Request Rate Limit
const limiter= rateLimit({windowMs:15*60*1000,max:3000})
app.use(limiter)


// Mongo DB Database Connection
let URI="mongodb+srv://khannasif98:kutkut7220@cluster0.grizdvs.mongodb.net/buisness?retryWrites=true&w=majority";
let OPTION={user:'khannasif98',pass:'kutkut7220',autoIndex:true}

mongoose.connect(URI,OPTION).then(()=>{
    console.log("Connection Success")
}).catch((err)=>{
    console.error('Error connecting to MongoDB:', err);
})


// Routing Implement
app.use("/api/v1",router)

// Add React Front End Routing
// app.get('*',function (req,res) {
//     res.sendFile(path.resolve(__dirname,'client','build','index.html'))
// })

module.exports=app;  