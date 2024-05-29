const express = require('express')
const app = express();
const port = 5500;
const details = require('./config');
const mongoose = require('mongoose')


//convert data into json format
app.use(express.json());

app.use(express.urlencoded({ extended: false }));
mongoose.connect('mongodb+srv://<id and password of your database>@cluster0.veda7mu.mongodb.net/login')
    .then(res => {
        console.log("DataBase connected sucessfully'")

    }).catch(err => {
        console.log('thukaab of DATABASE')
    })


app.get("/", (req, res) => {
    try {
        res.render('login.ejs')
    } catch (error) {
        console.log(error)
    }
});
app.post('/login', async (req, res) => {    
    const data = await  details.find({username: req.body.username, password: req.body.password})
    if(data){
        res.render('home.ejs')
    }
    else{
        res.send('invaild entry')
    }
})

app.get("/signup", (req, res) => {
    res.render('signup.ejs')
});

app.post("/signup", async (req, res) => {
    const data = {
        name: req.body.username,
        password: req.body.password
    }
    const finder = await details.find({username: data.name})
    await details.create(data);
    console.log(data);
    res.render('home.ejs')
})

app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})
