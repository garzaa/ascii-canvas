var frameBuffer = [];
var selfCanvas;
var SELF_NAME = "asciiCanvas"
var STYLE_NAME = "asciiCanvasStyle";
var styleContainer;
var loop = true;
var updateInterval = 100;
var aspect = 0.5;
var frameCount = 0;

class Vector2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

function init() {

}

function update() {

}

function noLoop() {
    loop = false;
}

function frameRate(x) {
    updateInterval = 1000 / x;
}

function internalInit() {
    init();
    internalUpdate();
    if (loop) {
        setInterval(internalUpdate, updateInterval);
    }
}

function internalUpdate() {
    update();
    frameCount++;
    drawCanvas();
}

function rad2deg(x) {
    return x * (180/Math.PI);
}

function deg2rad(x) {
    return x * (Math.PI/180); 
}

function drawChar(c, x, y) {
    x = Math.round(x);
    y = Math.round(y);

    if (x > frameBuffer[0].length) {
        console.error("X cell of " +x+" greater than maximum "+frameBuffer[0].length);
    }
    if (y > frameBuffer.length) {
        console.error("Y cell of " +y+" greater than maximum "+frameBuffer.length);
    }

    frameBuffer[y][x] = c[0];
}

function drawCircle(char, xPos, yPos, xRad, yRad, step) {
    step = step || 10;
    for (var i=0; i<360; i+=step) {
        var r = deg2rad(i)
        var x = Math.cos(r)*xRad;
        var y = Math.sin(r)*yRad;
        drawChar(char, xPos+x, yPos+y);
    }
}

function background(bgColor) {
    selfCanvas.style.backgroundColor = bgColor;
}

function foreground(fgColor) {
    selfCanvas.style.color = fgColor;
}

function createCanvas(x, y, containerElement=document.body) {
    var pre = document.createElement("pre");
    pre.id = SELF_NAME;
    pre.width = x;
    containerElement.appendChild(pre);
    selfCanvas = document.getElementById(SELF_NAME);
    for (var i=0; i<y; i++) {
        tempRow = []
        for (var j=0; j<x; j++) {
            tempRow.push(null);
        }
        frameBuffer.push(tempRow);
    }
} 

function drawCanvas() {
    var lines = [];
    for (var i=0; i<frameBuffer.length; i++) {
        lines.push(frameBuffer[i].join(""));
    }
    selfCanvas.innerText = lines.join("\n");
}

function fillCanvas(content) {
    content = content[0];
    for (var i=0; i<frameBuffer.length; i++) {
        for (var j=0; j<frameBuffer[i].length; j++) {
            frameBuffer[i][j] = content;
        }
    }
}

// wait and pick up the user-defined functions
setTimeout(function() {
    internalInit();
}, 1);
