const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');
const collection = require('./mongodb')
const templatePath = path.join(__dirname, '../templates');

app.use(express.json());
app.set("view engine", "hbs");
app.set("views", templatePath);
app.use(express.urlencoded({extended:false}));

app.get("/", (req, res)=>{
    res.render("inicio");
});

app.get("/registro", (req, res)=>{
    res.render("registro");
});

app.post("/registro", async(req, res)=>{
    const data = {
        nc:req.body.nc,
        user:req.body.nc,
        password:req.body.password
    }

    await collection.insertMany([data]);

    res.render("inicio");
});

app.post("/inicio", async(req, res)=>{

    try{
        const check = await collection.findOne({user:req.body.user});
        

        if(check.password===req.body.password){
            res.render("home");
        }else{
            res.send("Contraseña incorrecta");
        }
        
    }catch{
        res.send("Datos incorrectos");
    }

    
});

app.listen(3000, ()=> {
    console.log("Puerto conectado");
});