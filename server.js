const express = require('express');
const fs = require('fs')
const path = require('path')
const cookieParser = require('cookie-parser');
require('dotenv').config(); 
var cors = require('cors')
var morgan = require('morgan')
const mongoose = require('mongoose');
const passport = require('passport');
const app = express();
const port = process.env.HTTP_PORT || 3000;
const datasources = require('./datasources')

app.use(passport.initialize());

//initializes the passport configuration.
require('./config/passport-config')(passport);

//imports our configuration file which holds our verification callbacks and things like the secret for signing.
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
app.use(morgan("combined",{ stream: accessLogStream }))
app.use(cors())
app.use(cookieParser());
app.use(express.urlencoded({extended:true}))
app.use(express.json());

app.use('/users', require('./routes/user'));



//handle all kind of error that sent by this app
app.use((error,req,res,next)=>{
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message || "Server Error"
    const data = error.data || []
   res.status(status).json({
       message: message,
       data: data
   });
})

//fixes an issue with a depricated default in Mongoose.js
mongoose.set('useCreateIndex', true);
mongoose.connect(datasources.mongoDS.development.uri,{
    useNewUrlParser: true,
    useUnifiedTopology: true}
    )
.then(mongoConnected=>{
    console.log(`MongoDb connected`);
    app.listen(port, err => {
        if(err) console.error(err);
        console.log(`Listening for Requests on port: ${port}`);
    });
})
.catch(err=>{
    if(err) console.error(err);
    console.log(`MongoDb connection error`);
})