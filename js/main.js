var myGamePiece;


function startGame() {
    myGameArea.start();
    myGamePiece = new component("red", 20);
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    }
}

function component(color, size) {
    this.size = size;
    ctx = myGameArea.context;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(20, 120, size, 0, 2 * Math.PI);
    ctx.fill();
}

