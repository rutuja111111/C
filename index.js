const express=require("express");

const app=express();

const port=8080;

const path=require("path");
app.use(express.urlencoded({extended:true}));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));

const {v4:uuidv4}=require("uuid");


let posts=[
    {
        id:uuidv4(),
        username:"Hrutuja",
        content:"I love coding",
    },
    {
        id:uuidv4(),
        username:"pruthavi",
        content:"I love Movie",
    },
    {
        id:uuidv4(),
        username:"Ram",
        content:"I love dancong",
    }
];

app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
});
app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
});
app.post("/posts",(req,res)=>{
    let {username,content}=req.body;
    let id=uuidv4();
    posts.push({id,username,content});
    res.redirect("/posts");
});
app.get("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let ps=posts.find((p)=> id === p.id);
    res.render("show.ejs",{ps});
});
app.patch("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let newPost=req.body.content;
    let ps=posts.find((p)=> id === p.id);
    ps.content=newPost;
  res.redirect("/posts");
});

const methodOverride = require('method-override');

 
// override with POST having ?_method=DELETE
app.use(methodOverride('_method'));
app.get("/posts/:id/edit",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=> id === p.id);
    res.render("edit.ejs",{post})
});

app.delete("/posts/:id",(req,res)=>{
    let {id}=req.params;
     posts=posts.filter((p)=> id !== p.id);
    res.redirect("/posts");
})

app.listen(port,(req,res)=>{
    console.log(`Listining on port${port}`);

});