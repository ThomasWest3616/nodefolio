const express = require("express");
const app = express();
app.use(express.static("public"));
const nodemailer = require("nodemailer");
const bodyParser = require('body-parser');
var mysql = require("mysql");
var connection = require('./database')
const encoder = bodyParser.urlencoded();

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

/* app.get("/", (req, res) => {
    let sql = "SELECT * FROM USER"
    connection.query(sql, function(err, results) {
        if (err) throw err;
        res.send(results);
    });
}); */

app.get('/login', function (req, res) {
    res.send(loginPage)
  });


  app.post('/auth_login', function(request, response) {
	var username = request.body.username;
	var password = request.body.password;
	if (username && password) {
		connection.query('SELECT * FROM user WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
			if (results.length > 0) {
				request.session.loggedin = true;
				request.session.username = username;
				response.redirect('/admin');
			} else {
				response.send(loginPage);
			}			
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});

 
  

  // Logout endpoint
app.get('/logout', function (req, res) {
    req.session.destroy();
    res.send("logout success!");
  });



  app.get('/admin', function(request, response) {
	response.send(adminPage);
    
    /* if (request.session.loggedin) {
		response.send(adminPage);
	} else {
		response.send(loginPage);
	}
	response.end(); */
});


//Get all projects
app.get('/projects', (req, res) => {
    connection.query('SELECT * FROM projects', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

//Delete af project
app.delete('/projects/:id', (req, res) => {
    connection.query('DELETE FROM projects WHERE idprojects = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send('Deleted successfully.');
        else
            console.log(err);
    })
});

//Insert project
app.post('/projects', (req, res) => {
    let project = req.body;
    var sql = "SET @idprojects = ?;SET @name = ?;SET @description = ?;SET @link = ?; \
    CALL EmployeeAddOrEdit(@projectsid,@name,@description,@link);";
    connection.query(sql, [project.projectsid, project.name, project.description, project.link], (err, rows, fields) => {
        if (!err)
            rows.forEach(element => {
                if(element.constructor == Array)
                res.send('Project added with id: '+element[0].projectsid);
            });
        else
            console.log(err);
    })
});

//Update project
app.put('/projects', (req, res) => {
    let project = req.body;
    var sql = "SET @idprojects = ?;SET @name = ?;SET @description = ?;SET @link = ?; \
    CALL EmployeeAddOrEdit(@projectsid,@name,@description,@link);";
    connection.query(sql, [project.projectsid, project.name, project.description, project.link], (err, rows, fields) => {
        if (!err)
            res.send('Updated successfully');
        else
            console.log(err);
    })
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
    });

});



const PORT = process.env.PORT || 8080;

app.listen(PORT, (error) => {
    console.log("Server is running on", PORT);
    
});
