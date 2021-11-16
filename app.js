const express = require("express");
const app = express();
app.use(express.static("public"));
const nodemailer = require("nodemailer");
const bodyParser = require('body-parser');

    session = require('express-session');
app.use(session({
    secret: '2C44-4D44-WppQ38S',
    resave: true,
    saveUninitialized: true
}));

var auth = function(req, res, next) {
    if (req.session && req.session.user === "thomas" && req.session.admin)
      return next();
    else
      return res.sendStatus(401);
  };

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));

/* Import and use routes */
const projectsRouter = require("./routers/projects.js");
const pagesRouter = require("./routers/pages.js")
const contactRouter = require("./routers/contact.js");

app.use(projectsRouter.router);
app.use(pagesRouter.router);
app.use(contactRouter.router);

const { createPage } = require("./render.js");
const { urlencoded } = require("express");

/* Ready the pages */
const frontpagePage = createPage("frontpage/index.html", {
        title: "Nodefolio | Welcome"
});
const adminPage = createPage("admin/admin.html", {
    title: "Nodefolio | Admin" 
});
const CVPage = createPage("CVPage/CVPage.html");
const projectsPage = createPage("projects/projects.html");
const contactPage = createPage("contact/contact.html");
const loginPage = createPage("login/login.html");

app.get("/", (req, res) => {
    res.send(frontpagePage);
});

app.get('/login', function (req, res) {
    res.send(loginPage)
  });

app.post('/auth', function (req, res) {
    
   const username = "thomas"
   const password = "password"


    if(req.body.username == username && req.body.password == password) {
        res.send(adminPage);
    } else if(req.body.username !== username || req.body.password !== password) {
        res.send(projectsPage)

    }  
     
    
    /* if (!req.username || !req.password) {
      res.send('login failed');    
    } else if(req.username === "thomas" || req.password === "password") {
      req.session.user = "thomas";
      req.session.admin = true;
      res.send("/admin/admin.html");
    } */
});


  // Logout endpoint
app.get('/logout', function (req, res) {
    req.session.destroy();
    res.send("logout success!");
  });



  app.get('/admin', auth, function (req, res) {
    res.send("You can only see this after you've logged in.");
});


app.get("/cv", (req, res) => {
    res.send(CVPage);
});

app.get("/projects", (req, res) => {
    res.send(projectsPage);
});

app.get("/contact", (req, res) => {
    res.send(contactPage);
});

app.post("/contact", (req, res) => {
    console.log(req.body);

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'west3616@gmail.com',
            pass: 'djz99pqt'

        }


    })

    const mailOptions = {
        from: req.body.email,
        to: 'west3616@gmail.com',
        subject: `Message from ${req.body.email}: ${req.body.subject}`,
        text: req.body.message
    }

    transporter.sendMail(mailOptions, (error, info)=> {
        if(error) {
            console.log(error);
            res.send('error')
        }else{
            console.log('Email sent:' + info.response);
            res.send('success')
        }
    })

});



const PORT = process.env.PORT || 8080;

app.listen(PORT, (error) => {
    console.log("Server is running on", PORT);
});
