var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require("fs");
app.use(express.static("."));
app.get('/', function (req, res) {
   res.redirect('index.html');
});
server.listen(3000);

grassArr = []
grassEaterArr = []
predatorArr = [];
rockArr = []
magArr = []
matrix = []
n = 50;
weat = "winter"
weather = ["winter", "spring", "summer", "autumn"]
function weather(){
   if(weat == "winter")
      weat = "spring"
   else if(weat == "spring")
      weat = "summer"
   else if(weat == "summer")
      weat = "autumn"
   else if(weat == "autumn")
      weat = "winter"
}
LivingCrature = require("./LivingCrature")
Grass = require("./Grass");
GrassEater = require("./GrassEater");
Predator = require("./Predator");
Rock = require("./Rock");
Magician = require("./Magician");

function rand(min, max) {
   return Math.random() * (max - min) + min;
}

for (let i = 0; i < n; i++) {
   matrix[i] = [];
   for (let j = 0; j < n; j++) {
      matrix[i][j] = Math.floor(rand(0, 6))

   }
}

io.sockets.emit("send matrix", matrix)

function createObject() {
   for (let y = 0; y < matrix.length; y++) {
      for (let x = 0; x < matrix[y].length; x++) {
         if (matrix[y][x] == 1) {
            let gr = new Grass(x, y)
            grassArr.push(gr)
         }
         else if (matrix[y][x] == 2) {
            let greater = new GrassEater(x, y)
            grassEaterArr.push(greater)
         }
         else if (matrix[y][x] == 3) {
            let pred = new Predator(x, y)
            predatorArr.push(pred)
         }
         else if (matrix[y][x] == 4) {
            let rock = new Rock(x, y)
            rockArr.push(rock)
         }
         else if (matrix[y][x] == 5) {
            let mag = new Magician(x, y)
            magArr.push(mag)
         }
      }
   }
   io.sockets.emit('send matrix', matrix)
}

function game() {
   for (let i in grassArr) {
      grassArr[i].mul()
   }
   for (let i in grassEaterArr) {
      grassEaterArr[i].eat()
   }
   for (let i in predatorArr) {
      predatorArr[i].eat()
   }
   for (let i in rockArr) {
      rockArr[i].eat()
   }
   for (let i in magArr) {
      magArr[i].transform()
   }
   io.sockets.emit("send matrix", matrix);
}

setInterval(game, 1000)

function kill() {
   grassArr = [];
   grassEaterArr = []
   predatorArr = []
   rockArr = []
   magArr = []
   for (var y = 0; y < matrix.length; y++) {
      for (var x = 0; x < matrix[y].length; x++) {
         matrix[y][x] = 0;
      }
   }
   io.sockets.emit("send matrix", matrix);
}
function addGrass() {
   for (var i = 0; i < 7; i++) {
      var x = Math.floor(Math.random() * matrix[0].length)
      var y = Math.floor(Math.random() * matrix.length)
      if (matrix[y][x] == 0) {
         matrix[y][x] = 1
         var gr = new Grass(x, y, 1)
         grassArr.push(gr)
      }
   }
   io.sockets.emit("send matrix", matrix);
}
function addGrassEater() {
   for (var i = 0; i < 7; i++) {
      var x = Math.floor(Math.random() * matrix[0].length)
      var y = Math.floor(Math.random() * matrix.length)
      if (matrix[y][x] == 0) {
         matrix[y][x] = 2
         grassEaterArr.push(new GrassEater(x, y, 2))
      }
   }
   io.sockets.emit("send matrix", matrix);
}
function addPredator() {
   for (var i = 0; i < 7; i++) {
      var x = Math.floor(Math.random() * matrix[0].length)
      var y = Math.floor(Math.random() * matrix.length)
      if (matrix[y][x] == 0) {
         matrix[y][x] = 3
         predatorArr.push(new Predator(x, y))
      }
   }
   io.sockets.emit("send matrix", matrix);
}
function addRock() {
   for (var i = 0; i < 7; i++) {
      var x = Math.floor(Math.random() * matrix[0].length)
      var y = Math.floor(Math.random() * matrix.length)
      if (matrix[y][x] == 0) {
         matrix[y][x] = 4
         rockArr.push(new Rock(x, y))
      }
   }
   io.sockets.emit("send matrix", matrix);
}
function addMagician() {
   for (var i = 0; i < 7; i++) {
      var x = Math.floor(Math.random() * matrix[0].length)
      var y = Math.floor(Math.random() * matrix.length)
      if (matrix[y][x] == 0) {
         matrix[y][x] = 5
         magArr.push(new Magician(x, y))
      }
   }
   io.sockets.emit("send matrix", matrix);
}

io.on('connection', function (socket) {
   createObject();
   socket.on("kill", kill);
   socket.on("add grass", addGrass);
   socket.on("add grassEater", addGrassEater);
   socket.on("add predator", addPredator);
   socket.on("add rock", addRock)
   socket.on("add magician", addMagician)
});

var statistics = {};

setInterval(function () {
   statistics.grass = grassArr.length;
   statistics.grassEater = grassEaterArr.length;
   statistics.predator = predatorArr.length;
   statistics.rock = rockArr.length;
   statistics.mag = magArr.length;
   fs.writeFile("statistics.json", JSON.stringify(statistics), function () {
      console.log("send")
   })
}, 1000)