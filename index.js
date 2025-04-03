import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "Hackathon",
  password: "password",
  port: 5432
});
db.connect();

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json()); 

function generateCaptcha() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let captcha = '';
    for (let i = 0; i < 6; i++) {
        captcha += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return captcha;
}
var captchaIn;

app.get("/",(req,res)=>{
    res.render("home.ejs");
});

// app.post("/register",(req,res)=>{
//     let register_data = req.body;
//     console.log(register_data);
//     res.render("register.ejs",{register_data:register_data.dropdown_option});
// });

app.get("/register",(req,res)=>{
    res.render("register.ejs");
});

app.post("/register_submit",async(req,res)=>{
    let data=req.body;
    console.log(data);
    try{
    await db.query("INSERT INTO login (username,email,pass) VALUES ($1,$2,$3)",
        [data.username,data.email,data.password]
    );
    // res.redirect("/");
    res.render("register.ejs",{msg:"Email successfully registered, now you can proceed login!"});
}
catch(err){
    res.render("register.ejs",{error:"Email already registered!"});
}
});

app.get("/login",(req,res)=>{
    captchaIn=generateCaptcha();
    res.render("login.ejs",{captcha:captchaIn});
});

app.post("/login_submit",async(req,res)=>{
    let login_data = req.body;
    console.log(login_data);
    let db_data = (await db.query(`SELECT * FROM login WHERE email='${login_data.email}' AND pass='${login_data.password}'`)).rows;

    if(db_data[0] && captchaIn===login_data.captcha){
        res.render("home1.ejs",{name: db_data[0].username});
    }
    else if(captchaIn!==login_data.captcha){
        res.render("login.ejs",{captchaMsg:"Captcha incorrect, try again",captcha:captchaIn});
    }
    else{
        res.render("login.ejs",{msg:"Email or password incorrect, try again",captcha:captchaIn});
    }
    console.log(captchaIn);
    console.log(login_data.captcha);
    console.log(db_data);
});

app.get("/AI_assistance.html" , (req,res)=>{
    res.sendFile(__dirname+"/mental_health_web3.html");
});

app.get("/indexM.html",(req,res)=>{
    res.sendFile(__dirname+"/indexM.html");
});
//
app.get("/congratulations",(req,res)=>{
    res.sendFile(__dirname+"/congratulations.html");
});

app.get("/moderate_exercises",(req,res)=>{
    res.sendFile(__dirname+"/moderate_exercises.html");
});

app.get("/improvement_exercises",(req,res)=>{
    res.sendFile(__dirname+"/improvement_exercises.html");
});

app.get("/confidence_exercises",(req,res)=>{
    res.sendFile(__dirname+"/confidence_exercises.html");
});

app.listen(port,()=>{
    console.log(`Listening in port ${port}`);
});

