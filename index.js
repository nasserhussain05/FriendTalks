const express=require('express');
// const req = require('express/lib/request');
const cookieparser=require('cookie-parser');
const app=express();
const port=8000;
const expresslayouts=require('express-ejs-layouts');
const db=require('./config/mongoose');

//used for session cookie
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');
const passportJWT=require('./config/passport-jwt-strategy');

const passportGoogle=require('./config/passport-google-oauth2-strategy');
const MongoStore = require('connect-mongo')(session);
const sassMiddleware=require('node-sass-middleware');
const flash=require('connect-flash');
const req = require('express/lib/request');
const customMware=require('./config/middleware');

app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}));
app.use(express.urlencoded());

app.use(cookieparser());

app.use(express.static('./assets'));
//make the uploads path available to the browser
app.use('/uploads',express.static(__dirname+'/uploads'));

app.use(expresslayouts);
//extract style and scripts from subpages into layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


//app.use('/',require('./routes'));
//set up voew engine
app.set('view engine','ejs');
app.set('views','./views');

//mongo store is used to store the session cookie in the db
app.use(session({
    name:'codeal',
    //TODO change the secret before deployment in production mode
    secret:'blah blah something',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },
    store: new MongoStore(
        {
            mongooseConnection: db,
            autoRemove: 'disabled'
        
        },
        function(err){
            console.log(err ||  'connect-mongodb setup ok');
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session()); 
app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(customMware.setFlash);

//use express routes
app.use('/', require('./routes'));

app.listen(port,function(err){
    if(err){
        console.log(`Error in running the port: ${err}`);
    }
    console.log(`Server is running on the port: ${port}`);
});