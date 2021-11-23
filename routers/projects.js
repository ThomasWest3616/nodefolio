import express from "express";
import { connection } from '../database.js'
const router = express.Router();
const app = express();

router.use(express.json())

router.get("/getprojects", (req, res) => {
    connection.query('SELECT * FROM projects', function (error, results, fields) {
        if (error) throw error;
        res.send(results)
    },

    )
}); 

/* app.get('/projects', (req, res) => {
    connection.query('SELECT * FROM projects', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
}); */




/* router.get('/delete/:id', function (req, res) {
    const id = req.params.id;
    connection.query(`DELETE FROM projects WHERE id = ${id}`, function (error, results, fields) {
        if (error) throw err;
        res.redirect("/admin");
    },

    )
}); */

router.get('/delete/:id', (req, res) => {
    connection.query('DELETE FROM projects WHERE id = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.redirect('/admin');
        else
            console.log(err);
    })
});



 router.post('/update', (req, res) => {
    const projectId = req.body.id;
    let sql = "update projects SET name='" + req.body.name + "',  description='" + req.body.description + "',  link='" + req.body.link + "' where id =" + projectId;
    connection.query(sql, (err, results) => {
        if (err) throw err;
        console.log("Project updated");
        res.redirect("/admin");
    });
});

  /* router.post('/update', (req, res) => {
    var id = req.body.id;
    var name = req.body.name;
    var description = req.body.description;
    var link = req.body.link;

    connection.query(`UPDATE projects SET name = "" + ${name.toString()}, description = "" + ${description.toString()}, link = "" + ${link.toString()} WHERE id = ${id}`, function (err, rows, fields) {
        if (!err)
            res.send('Updated successfully');
        else
            console.log(err);
    })
}); */



router.post('/createProject', function (req, res) {
    var name = req.body.name;
    var description = req.body.description;
    var link = req.body.link;
    connection.query("INSERT INTO projects (name, description, link) VALUES (?, ?, ?)", [name.toString(), description.toString(), link.toString()], function (err, result) {
        if (err) throw err;
        console.log("New project added");
    });
    res.redirect("/admin");
    res.end()
});



export default router;
