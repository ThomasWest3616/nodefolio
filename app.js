import express from 'express';
import { connection } from './database.js';
import session from 'express-session';
import projectsRouter from './routers/projects.js'
import contact from './routers/contact.js'







const app = express();
app.use(express.static("public"));
app.use(contact);


const router = express.Router()





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

app.use(projectsRouter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* Import and use routes */






import { createPage } from './render.js';
import { urlencoded } from 'express';


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

    
    if (request.session.loggedin) {
		response.send(adminPage);
	} else {
		response.send(loginPage);
	}
	response.end();
});





app.get("/cv", (req, res) => {
    res.send(CVPage);
});

app.get("/contact", (req, res) => {
    res.send(contactPage);
});

app.post("/contact", (req, res) => {
    console.log(req.body); 
});

app.get("/projects", (req, res) => {
 res.send(projectsPage);
 });






const PORT = process.env.PORT || 8080;

app.listen(PORT, (error) => {
    console.log("Server is running on", PORT);
    
});
