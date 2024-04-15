const express = require('express');
const session = require('express-session');
const flash = require('express-flash');
const bodyParser = require('body-parser');
const path = require('path');

const PORT = process.env.PORT || 9630;

const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

const nocache = require('nocache');

app.use(nocache());


app.use(session({
    secret:"I am Ausm",
    resave: false,
    saveUninitialized: false,
    cookie:{
        maxAge: 60000
    }
}));


const users = [
    { email: '1@test.com', password: 'password' }
];


app.use(flash());


// Set the views directory
app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'ejs');



// Routes
app.get('/', (req,res)=>{
    // console.log("flash: ",req.flash());
    console.log(req.flash() && req.flash().length>0);
    console.log(req.flash(),req.flash().length)

    const a  = req.flash();

    if(a && a.length>0){
        console.log("main if");
        
        console.log("inside req.flash");
        res.render('index.ejs', {messages: a});
        console.log({messages235: a});
    }
    else{
        console.log("length: ",a.length);
        res.render('index.ejs');
        console.log("main else");
    }
});

app.get('/authenticated', (req,res)=>{
    const user = req.session.user;
    console.log("/authenticated is initiated");
    // res.sendFile(path.join(__dirname, 'views', 'authenticated_session.ejs'));
    if (!user) {
        res.status(400).redirect('/');
    } else {
        console.log("inside else of /auth")
        res.render('authenticated_session.ejs', { messages: req.flash() });
        // res.sendFile(path.join(__dirname, 'views', 'authenticated_session.ejs'));
    }
    // res.render('authenticated_session.ejs');
    console.log("/authenticated endline");

});





// app.post('/login', (req,res)=>{
//     const {email, password} = req.body

//     // console.log("Email ",email);
//     const user = users.find(u => u.email === email && u.password === password);
//     if(user){
//         req.session.user = user; 
//         // res.redirect('/authenticated');
//         console.log("user data: ",req.session.user);
//         req.flash('success', 'Login successful');
//         // res.redirect('/authenticated')
//         console.log("after asuth")
//         res.status(200).redirect('/authenticated');
//     }

//     else if(!email || !password){
//         // res.json({message:"Euh, Euh, Brother euh, Euh brother, What is this"});
//         req.flash("error","req");
//         res.status(400).redirect('/');
//     }
// });






app.post('/login', (req, res) => {
    console.log('Login route called'); // Debugging
    const { email, password } = req.body;

    const user = users.find(u => u.email === email && u.password === password);
    if (!user){
        req.flash('error', 'Invalid email or password 1');
        res.status(400).redirect('/');
        // res.status(400).render('index',{messages: req.flash()});
        console.log("inside !user")
    }
    else if (user) {
        req.session.user = user;
        console.log('User data:', req.session.user); // Debugging

        req.flash('success', 'Login successful');
        console.log('Flash messages set:', req.flash('success')); // Debugging

        res.status(400).redirect('/authenticated');
    } else if (!email || !password) {
        req.flash('error', 'Invalid email or password');
        res.status(400).redirect('/');
    }
});









app.listen(PORT, ()=>{
    console.log(`App running in http://localhost:${PORT}`);
});