var express = require('express');
var app = express();
var ejs = require('ejs');
var bodyParser = require('body-parser');
var fetch = require('node-fetch');
const API_KEY = require('./youtubeAPIkey.js')

app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs');

app.get('/',function(req,res){
    res.render('index',{videoList:null})
});

app.post('/',function(req,res){
    const search = req.body.search;
    let url = `https://www.googleapis.com/youtube/v3/search?part=snippet&key=${API_KEY}&q=${search}`
    fetch(url)
        .then(response=>response.json())
        .then(myJson=>{
            let list = myJson.items;
            res.render('index',{videoList:list})
            return;
        })


});
app.listen(8000,function(){
    console.log("im running on port 8000!");
})