var myGamePiece;
var myBackground;
var myObstacles = [];
var mySize;

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
    myGamePiece = new component(60, 60, "img/fish0.png", 300, 300, "image");
    myBackground = new component(window.innerWidth, window.innerHeight, "img/bg3.jpg", 0, 0, "background");
    myGameArea.start();
    //myObstacle = new component(20, 20, "green", 300, 120);
}

function component(width, height, color, x, y, type){
    this.type = type;
    if(type == "image" || type == "background"){
        this.image = new Image();
        this.image.src = color;
    }
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;    
    this.x = x;
    this.y = y;    
    this.update = function(){
        ctx = myGameArea.context;
        if(type == "image" || type == "background"){
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
            if(type == "background"){
                ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
            } 
        }else{
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    this.newPos = function(){
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.type == "background") {
            if (this.x == -(this.width)) {
                this.x = 0;
            }
        } 
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
    myBackground.speedX = -1.2;  //set the moving background, this speed need to be slower than the fisheres' speed
    myBackground.newPos(); 
    myBackground.update();
    myGameArea.frameNo += 1;
    if(myGameArea.frameNo == 1 || everyinterval(150)){
        x = myGameArea.canvas.width;
        y = myGameArea.canvas.height - 300;
        var num = Math.floor((Math.random() * 12) + 1);
        var z = num.toString();
        var str1 = "img/fish";
        var str2 = str1.concat(z);
        var str3 = str2.concat(".png");
        //myObstacles.push(new component(100, 100, str3, x, y, "image"));
        minHeight = 60;
        maxHeight = 600;
        height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
        minGap = 50;
        maxGap = 300;
        var ran1 = Math.floor((Math.random() * 100) + 30);
        var ran2 = Math.floor((Math.random() * 100) + 30);
        gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);
        //myObstacles.push(new component(80, 80, str3, x+ran, gap, "image"));
        myObstacles.push(new component(ran1, ran1, str3, x+gap, height + gap, "image"));  
        myObstacles.push(new component(ran2, ran2, str3, x, height - gap, "image")); 
    }
    for(i = 0; i < myObstacles.length; i += 1){
        myObstacles[i].x += -1.5;
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

