//DB config

// require('./config/mongoose');


const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const post = require('./routes/api/post');
const profile = require('./routes/api/profile');
const users = require('./routes/api/users');
var cors = require('cors');

const app = express();
app.use(cors());
//body parser middleware
app.use(express.urlencoded({extended:false}));
app.use(express.json());
//db config

const db= require('./config/keys').mongoURI;

//connect to mongodb

mongoose
.connect(db,{
 
   useNewUrlParser:true,
   useUnifiedTopology:true
 
})
.then(() => console.log('Mongodb connected'))
.catch(err =>console.log(err));



//passport middlware
app.use(passport.initialize());

//passport config

require('./config/passport')(passport);


const port = process.env.PORT || 5000;

app.listen(port,() => console.log(`Server running port ${port}`));

//use routes

app.use('/api/users',users);
app.use('/api/post',post);
app.use('/api/profile',profile);

// app.listen(5000,(req,res) =>{
//  console.log('app is running in port 5000!')
// })