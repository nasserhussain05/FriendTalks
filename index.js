const express=require('express');
// const req = require('express/lib/request');
const cookieparser=require('cookie-parser');
const app=express();
const port=8000;
const expresslayouts=require('express-ejs-layouts');
const db=require('./config/mongoose');

app.use(express.urlencoded());

app.use(cookieparser());

app.use(express.static('./assets'));
app.use(expresslayouts);
//extract style and scripts from subpages into layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


//app.use('/',require('./routes'));
//set up voew engine
app.set('view engine','ejs');
app.set('views','./views');

 app.use('/',require('./routes'));

app.listen(port,function(err){
    if(err){
        console.log(`Error in running the port: ${err}`);
    }
    console.log(`Server is running on the port: ${port}`);
});