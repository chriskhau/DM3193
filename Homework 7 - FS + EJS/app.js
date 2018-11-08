var express = require('express');
var app = express();
var ejs = require('ejs');
var fs = require('fs')
var bodyParser = require('body-parser');
var fetch = require('node-fetch');

var data = fs.readFileSync('server.json');
var loginInfo = JSON.parse(data);

const API_KEY = require('./youtubeAPIkey.js')

app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs');

app.get('/',function(req,res){
    res.render('index')
})
app.post('/',function(req,res){
    let name = req.body.name;
    let email = req.body.email;
    let password = req.body.password;
    let user = {"name":name,"email":email,"password":password}
    console.log(user);

    let data = JSON.stringify(user);
    
    fs.writeFile('server.json',data,finished);
        function finished(err){
            console.log("It worked!");
        }
        var reply = {
            msg:"Thanks for signing up"
        }
        res.redirect('/search');
})

app.get('/search',function(req,res){
    data = fs.readFileSync('server.json');
    loginInfo = JSON.parse(data);
    res.render('search',{videoList:null,name:loginInfo.name})
});

app.post('/search',function(req,res){
    let name = loginInfo.name;
    console.log(name);
    const search = req.body.search;
    let url = `https://www.googleapis.com/youtube/v3/search?part=snippet&key=${API_KEY}&q=${search}`
    fetch(url)
        .then(response=>response.json())
        .then(myJson=>{
            let list = myJson.items;
            res.render('search',{videoList:list,name:name})
            return;
        })


});
app.listen(8000,function(){
    console.log("im running on port 8000!");
})

