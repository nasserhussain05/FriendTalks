const express=require('express');
const req = require('express/lib/request');
const app=express();
const port=8000;
const expresslayouts=require('express-ejs-layouts');

app.use(express.static('./assets'));
app.use(expresslayouts);

//extract style and scripts from subpages into layout
app.set('layout extractStyle',true);
app.set('layout extractStyle',true);

app.use('/',require('./routes'));
//set up voew engine
app.set('view engine','ejs');
app.set('views','./views');

app.listen(port,function(err){
    if(err){
        console.log(`Error in running the port: ${err}`);
    }
    console.log(`Server is running on the port: ${port}`);
});