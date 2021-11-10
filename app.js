const express = require("express");
const app = express();
app.use(express.static("public"));
const nodemailer = require("nodemailer");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
const CVPage = createPage("CVPage/CVPage.html");
const projectsPage = createPage("projects/projects.html");
const contactPage = createPage("contact/contact.html");

app.get("/", (req, res) => {
    res.send(frontpagePage);
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
            pass: '34ptm3dJ'

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
