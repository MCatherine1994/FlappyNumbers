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
        this.interval = setInterval(updateGameArea, 20);
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function component(color, size) {
    this.size = size;
    this.update = function() {
        ctx = myGameArea.context;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(20, 120, size, 0, 2 * Math.PI);
        ctx.fill();
    }
}

function updateGameArea() {
    myGameArea.clear();
    myGamePiece.update();
}
