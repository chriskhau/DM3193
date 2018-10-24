console.log('hello server');

var fs = require('fs');
const express = require('express');

const app = express();
var data = fs.readFileSync('words.json');
var words = JSON.parse(data);
console.log(words);

const server = app.listen(3000, listening);

//other ports: 8000, 8080

function listening(){
    console.log('I am listening...')
}

app.get('/add/:key/:first/:string/:number',addWord);
app.get('/display',displayAll);
app.get('/display/:key/:value',displayInfo);
app.get('/',instructions);

function addWord(request,response){
    var data = request.params;
    var key = data.key;
    var d1 = Number(data.number)
    var d2 = data.first
    var d3 = data.string
    var value = {"name":d2,"string":d3,"number":d1};
    words[key] = value;
    var data = JSON.stringify(words);
    fs.writeFile('words.json',data,finished);
        function finished(err){
            console.log('it worked!');
        }
        var reply = {
            msg: "thanks for adding something"
        }
        response.send(reply);
}
function displayAll(request,response){
    response.send(words);
}
function displayInfo(request,response){
    var key = String(request.params.key)
    var value = String(request.params.value);
    console.log("search:", key,"value:", value);
    console.log(words[key][value]);
    var answer = words[key][value]


    response.send(`The key '${key}' has the value of '${answer}' for '${value}'`);
}
function instructions(request,response){
    var message = `use /add/key/name/string/value to add something to the json \n use /display to display all \n use /display/key/value to search for a specific value`
    response.send(message)
}