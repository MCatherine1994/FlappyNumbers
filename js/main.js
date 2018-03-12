var myGamePiece;
var myObstacles = [];

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function(){
        this.canvas.width = window.innerWidth; //set the gaming area to the whole window
        this.canvas.height = window.innerHeight; 
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);  //run the updateGameArea every 20th millisecond (50 times per second)
        //check if the a key is pressed, and set the key property of the myGameArea to the key code. When the key is released, set teh key property to false
        window.addEventListener('keydown', function (e){ 
            myGameArea.key = e.keyCode;
        })
        window.addEventListener('keyup', function (e){
            myGameArea.key = false;
        })
    },
    clear : function(){
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function(){
        clearInterval(this.interval);
    }    
}

function startGame(){
    myGamePiece = new component(30, 30, "red", 10, 120);
    myGameArea.start();
    //myObstacle = new component(20, 20, "green", 300, 120);
}

function component(width, height, color, x, y){
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;    
    this.x = x;
    this.y = y;    
    this.update = function(){
        ctx = myGameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    this.newPos = function(){
        this.x += this.speedX;
        this.y += this.speedY;        
    }    
    this.crashWith = function(otherobj){
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)){
            crash = false;
        }
        return crash;
    }
}

function updateGameArea(){
    var x, y;
    for(i = 0; i < myObstacles.length; i += 1){
        if(myGamePiece.crashWith(myObstacles[i])){
            myGameArea.stop();
            return;
        } 
    }
    myGameArea.clear();
    myGameArea.frameNo += 1;
    if(myGameArea.frameNo == 1 || everyinterval(150)){
        x = myGameArea.canvas.width;
        y = myGameArea.canvas.height - 200;
        myObstacles.push(new component(10, 200, "green", x, y));
    }
    for(i = 0; i < myObstacles.length; i += 1){
        myObstacles[i].x += -1;
        myObstacles[i].update();
    }
    myGamePiece.speedX = 0;
    myGamePiece.speedY = 0;
    if(myGameArea.key && myGameArea.key == 37){myGamePiece.speedX = -1;}
    if(myGameArea.key && myGameArea.key == 39){myGamePiece.speedX = 1;}
    if(myGameArea.key && myGameArea.key == 38){myGamePiece.speedY = -1;}
    if(myGameArea.key && myGameArea.key == 40){myGamePiece.speedY = 1;}
    myGamePiece.newPos();    
    myGamePiece.update();
}

function everyinterval(n){
    if((myGameArea.frameNo / n) % 1 == 0){return true;}
    return false;
}

