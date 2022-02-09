const express=require('express');
const req = require('express/lib/request');
const app=express();
const port=8000;

app.use('/',require('./routes'));

app.listen(port,function(err){
    if(err){
        console.log(`Error in running the port: ${err}`);
    }
    console.log(`Server is running on the port: ${port}`);
});