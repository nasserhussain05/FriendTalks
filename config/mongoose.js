// const mongoose = require("mongoose");
// mongoose.connect('mongodb//localhost/codeal_development');
// const db=mongoose.connection;

// db.on('error',console.error.bind(console,"Error connecting to db"));

// db.once('open',function(){
//     console.log("connected to the database");
// });

// module.exports=db;

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/codeial_development');

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error connecting to MongoDB"));


db.once('open', function(){
    console.log('Connected to Database :: MongoDB');
});


module.exports = db;