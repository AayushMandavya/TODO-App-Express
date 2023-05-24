
//require process
const express = require ("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const getConnection = require('./config/db');
//init process
dotenv.config();
const App = express();
App.use(bodyParser.urlencoded({extended:true}));
App.set("view engine","ejs");
const App_Port = process.env.PORT || 8000;
const conn= getConnection();


//middleware
App.use((req, res,next)=>{
   req.conn = conn;
    next();
});

App.get("/",(req,res)=>{
    console.log(req.conn);

    req.conn.query("SELECT * FROM todo",(error,result)=>{
        if(error){
            res.status(500).send("error aayo");
        }
        res.render("index",{items:result.rows});
    });
   
});


//declaring todos
// let todos = [
// {
//     task: 'yessir',
//     completed: false
// }];

//adding todo tasks
App.post("/add-todo",(req,res)=>{
    console.log(req.body);
   req.conn.query("insert into todo (id,title,iscomplete) values($1,$2,$3)",[Math.floor(Math.random(5)*1000),req.body.todo,false],(error,result)=>{
    if(error){
        res.status(500).send("error aayo");
    }
    res.redirect("/");
   })
   
    res.end();
})

//deleting todo tasks
App.post("/remove-todo", (req, res) => {
    console.log(req.body.delete);
    todos.splice(req.body.delete, 1);
    res.redirect("/");
})

//complete state declaration 
App.post('/complete', (req, res) => {
    console.log('completed:' + req.body.complete);
    const tasknum = req.body.completed;
    if (tasknum >= 0 && tasknum < todos.length) {
        todos[tasknum].completed = true;
      }
      res.redirect("/");
});

//server activation
App.listen(App_Port,()=>{
    console.log("server is running at port ",App_Port);
});