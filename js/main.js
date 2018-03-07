var myGamePiece;
var myObstacle;

function startGame() {
    myGameArea.start();
    myGamePiece = new component(30, 30, "red", 10, 120);
    myObstacle = new component(20, 20, "green", 300, 120);
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        //set the gaming area to the whole window
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        //run the updateGameArea every 20th millisecond (50 times per second)
        this.interval = setInterval(updateGameArea, 20);
        //check if the a key is pressed, and set the key property of the myGameArea to the key code. When the key is released, set teh key property to false
        window.addEventListener('keydown', function (e) {
            myGameArea.key = e.keyCode;
        })
        window.addEventListener('keyup', function (e) {
            myGameArea.key = false;
        })
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function() {
        clearInterval(this.interval);
    }
}

function component(width, height, color, x, y) {
    this.gamearea = myGameArea;
    this.width = width;
    this.height = height;
    //component controller speedX and speedY -- speed indicators
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;    
    this.update = function(){
        ctx = myGameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    //use speedX and speedY o change the component's position
    this.newPos = function(){
        this.x +=this.speedX;
        this.y += this.speedY;
    }
    this.crashWith = function(otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
            crash = false;
        }
        return crash;
    }    
}

function updateGameArea() {
    if(myGamePiece.crashWith(myObstacle)){
        myGameArea.stop();
    }else{
        myGameArea.clear();
        myGamePiece.speedX = 0;
        myGamePiece.speedY = 0; 
        if (myGameArea.key && myGameArea.key == 37) {myGamePiece.speedX = -1; }
        if (myGameArea.key && myGameArea.key == 39) {myGamePiece.speedX = 1; }
        if (myGameArea.key && myGameArea.key == 38) {myGamePiece.speedY = -1; }
        if (myGameArea.key && myGameArea.key == 40) {myGamePiece.speedY = 1; }
        myObstacle.x -= 1;
        myObstacle.update();
        myGamePiece.newPos();
        myGamePiece.update();
    }
}
