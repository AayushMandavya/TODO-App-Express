
//require process
const express = require ("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
//init process
dotenv.config();
const App = express();
App.use(bodyParser.urlencoded({extended:true}));
App.set("view engine","ejs");
const App_Port = process.env.PORT || 8000;

App.get("/",(req,res)=>{
    res.render("Index",{items:todos});
});


//declaring todos
let todos = [
{
    task: '6-7AM go to the gym',
    completed: false
}];

//adding todo tasks
App.post("/add-todo",(req,res)=>{
    console.log(req.body);
    todos.push({task:req.body.todo, completed:false});
    res.redirect("/");
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