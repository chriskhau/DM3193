var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

var col1 = [0,0,0,0,0,0]
var col2 = [0,0,0,0,0,0]
var col3 = [0,0,0,0,0,0]
var col4 = [0,0,0,0,0,0]
var col5 = [0,0,0,0,0,0]
var col6 = [0,0,0,0,0,0]
var col7 = [0,0,0,0,0,0]

var col1Counter = 0;
var col2Counter = 0;
var col3Counter = 0;
var col4Counter = 0;
var col5Counter = 0;
var col6Counter = 0;
var col7Counter = 0;

var player_list = []
var playerCounter = 0;

var winner = 0;

var currentPlayersTurn = 1;


io.on('connection', function(socket){
    playerCounter++;
    if (playerCounter < 3 ){
    socket.id = playerCounter;
    console.log(socket.id);
    player_list[socket.id] = socket;
    updateTurn(socket);

    socket.emit('turnCounter',{
        currentTurn: currentPlayersTurn
    })

    }
    

    if (socket.id === 1){
        console.log("something");
        socket.emit('player',{
            msg:'Player 1'
        })
    }
    else if (socket.id === 2){
        socket.emit('player',{
            msg:'Player 2'
        })
    }
    else {
        socket.emit('full',{
            msg:"sorry the room is full"
        });
    }

        socket.on('set col 1',function(data){
            if (socket.id == currentPlayersTurn){
            if (col1Counter < 6){
                col1[col1Counter] = currentPlayersTurn;
                col1Counter++;
                console.log(col1)
                displayBoard();
                
                placePiece('1',col1Counter);
                incrementTurn();
                updateTurn();
                
            }
            else {
                console.log("cant fill this anymore");
            }
        }

        console.log('im fillingcol 1')
        })
        socket.on('set col 2',function(data){
            if (socket.id == currentPlayersTurn){
            if (col2Counter < 6){
                col2[col2Counter] = currentPlayersTurn;
                col2Counter++;
                console.log(col2)
                displayBoard();

                placePiece('2',col2Counter);
                incrementTurn();
                updateTurn();
            }
            else {
                console.log("cant fill this anymore");
            }
            console.log('im fillingcol 2')
        }
        })
        socket.on('set col 3',function(data){
            if (socket.id == currentPlayersTurn){
            if (col3Counter < 6){
                col3[col3Counter] = currentPlayersTurn;
                col3Counter++;
                console.log(col3)
                displayBoard();

                placePiece('3',col3Counter);
                incrementTurn();
                updateTurn();
            }
            else {
                console.log("cant fill this anymore");
            }
            console.log('im fillingcol 3')
        }
        })
        socket.on('set col 4',function(data){
            if (socket.id == currentPlayersTurn){
            if (col4Counter < 6){
                col4[col4Counter] = currentPlayersTurn;
                col4Counter++;
                console.log(col4)
                displayBoard();

                placePiece('4',col4Counter);
                incrementTurn();
                updateTurn();
            }
            else {
                console.log("cant fill this anymore");
            }
            console.log('im fillingcol 4')
        }
        })
        socket.on('set col 5',function(data){
            if (socket.id == currentPlayersTurn){
            if (col5Counter < 6){
                col5[col5Counter] = currentPlayersTurn;
                col5Counter++;
                console.log(col5)
                displayBoard();

                placePiece('5',col5Counter);
                incrementTurn();
                updateTurn();
            }
            else {
                console.log("cant fill this anymore");
            }
            console.log('im fillingcol 5')
        }
        })
        socket.on('set col 6',function(data){
            if (socket.id == currentPlayersTurn){
            if (col6Counter < 6){
                col6[col6Counter] = currentPlayersTurn;
                col6Counter++;
                console.log(col6)
                displayBoard();

                placePiece('6',col6Counter);
                incrementTurn();
                updateTurn();
            }
            else {
                console.log("cant fill this anymore");
            }
            console.log('im fillingcol 6')
        }
        })
        socket.on('set col 7',function(data){
            if (socket.id == currentPlayersTurn){
            if (col7Counter < 6){
                col7[col7Counter] = currentPlayersTurn;
                col7Counter++;
                console.log(col7)
                displayBoard();

                placePiece('7',col7Counter);
                incrementTurn();
                updateTurn();
            }
            else {
                console.log("cant fill this anymore");
            }
            console.log('im fillingcol 7')
        }
        })

});

function displayBoard(){
    console.log("current board");
    for (var i=5;i>=0;i--){
        console.log(`[${col1[i]}, ${col2[i]}, ${col3[i]}, ${col4[i]}, ${col5[i]}, ${col6[i]}, ${col7[i]} ]`)
    }
}
function placePiece(col,row){
    for (var i in player_list){
    socket = player_list[i]
        socket.emit('board',{
        number:currentPlayersTurn,
        col:col,
        row:row
        })
    }
}
function incrementTurn(){
    currentPlayersTurn++;
    if (currentPlayersTurn > 2){
        currentPlayersTurn = currentPlayersTurn-2
    }
}
function updateTurn(){
    for (var i in player_list){
        socket = player_list[i];
        if (currentPlayersTurn === 1){
            if (socket.id === 1){
            socket.emit('playerTurn',{
                msg:"It is currently your turn"
            })
        }
            if (socket.id === 2){
                socket.emit('playerTurn',{
                    msg:"It is currently NOT your turn"
                })
            }
        }
        else{
            if (socket.id === 1){
                socket.emit('playerTurn',{
                msg:"It is currently NOT your turn"
                })
            }
            if (socket.id === 2){
                socket.emit('playerTurn',{
                msg:"It is currently your turn"
                })
            }
        }
    }
}




http.listen(8000, function(){
  console.log('listening on *:8000');
});