var frameBuffer = [];
var selfCanvas;
var SELF_NAME = "asciiCanvas"
var STYLE_NAME = "asciiCanvasStyle";
var styleContainer;
var loop = true;
var updateInterval = 100;
var aspect = 0.5;
var frameCount = 0;

function lerp(a, b, x) {
    return a + x*(b-a);
}

class Vector2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    
    distance(other) {
        var dx = other.x - this.x;
        var dy = other.y - this.y;
        return Math.max(Math.abs(dx), Math.abs(dy));
    }

    round() {
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);
        return this;
    }

    lerp(other, t) {
        return new Vector2(
            lerp(this.x, other.x, t),
            lerp(this.y, other.y, t)
        );
    }
}

class Shape {
    color;
    char;
    points = [];

    constructor(char) {
        this.char = char;
    }

    push(x, y) {
        this.points.push(new Vector2(x, y));
    }

    draw() {
        for (var i=0; i<this.points.length-1; i++) {
            var p = this.points[i];
            var np = this.points[i+1];
            drawLine(this.char, p.x, p.y, np.x, np.y, this.color);
        }
    }
}

class Cell {
    color;
    value;

    constructor(value) {
        this.value = value;
        this.color = "inherit";
    }

    getValue() {
        return "<span style='color:"+this.color+";'>"+this.value+"</span>";
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

function drawChar(c, x, y, color) {
    x = Math.round(x);
    y = Math.round(y);

    if (x >= frameBuffer[0].length) {
        console.warn("X cell of " +x+" greater than maximum "+frameBuffer[0].length);
        return;
    }
    if (y >= frameBuffer.length) {
        console.warn("Y cell of " +y+" greater than maximum "+frameBuffer.length);
        return;
    }

    var tempCell = new Cell(c);
    if (color) {
        tempCell.color = color;
    }
    frameBuffer[y][x] = tempCell.getValue();
}

function drawText(line, x, y, color) {
    lines = line.split("\n");
    for (var h=0; h<lines.length; h++) {
        var currLine = lines[h];
        for (var i=0; i<currLine.length; i++) {
            drawChar(currLine[i], x+i, y+h, color);
        }
    }
}

function drawLink(text, address, x, y) {
    text = text.split("");
    text[0] = "<a href=\""+address+"\">"+text[0];
    text[text.length-1] = text[text.length-1]+"</a>";
    for (var i=0; i<text.length; i++) {
        frameBuffer[y][x+i] = text[i];
    }
}

function drawLine(char, startX, startY, endX, endY, color) {
    var start = new Vector2(startX, startY);
    var end = new Vector2(endX, endY);
    var points = [];
    var N = start.distance(end);
    for (var step=0; step<=N; step++) {
        var t = N == 0 ? 0.0 : step/N;
        points.push(start.lerp(end, t).round());
    }
    for (var i=0; i<points.length; i++) {
        var p = points[i];
        drawChar(char, p.x, p.y, color);
    }
}

function drawRect(char, xPos, yPos, xRad, yRad, color) {
    drawLine(char, xPos-xRad, yPos-yRad, xPos-xRad, yPos+yRad, color);
    drawLine(char, xPos-xRad, yPos-yRad, xPos+xRad, yPos-yRad, color);
    drawLine(char, xPos+xRad, yPos+yRad, xPos-xRad, yPos+yRad, color);
    drawLine(char, xPos+xRad, yPos+yRad, xPos+xRad, yPos-yRad, color);
}

function fillRect(char, xPos, yPos, xRad, yRad, color) {
    var startX = xPos - xRad;
    var startY = yPos - yRad;
    var endX = xPos + xRad;
    var endY = yPos + yRad;
    for (var i=startX; i<endX; i++) {
        drawLine(char, i, startY, i, endY, color);
    }
}

function drawCircle(char, xPos, yPos, xRad, yRad, step, color) {
    step = step || 10;
    for (var i=0; i<360; i+=step) {
        var r = deg2rad(i)
        var x = Math.cos(r)*xRad;
        var y = Math.sin(r)*yRad;
        drawChar(char, xPos+x, yPos+y, color);
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
        var tempLine = [];
        for (var j=0; j<frameBuffer[i].length; j++) {
            tempLine.push(frameBuffer[i][j]);
        }
        lines.push(tempLine.join(""));
    }
    selfCanvas.innerHTML = lines.join("\n");
}

function fillCanvas(content) {
    content = content[0];
    for (var i=0; i<frameBuffer.length; i++) {
        for (var j=0; j<frameBuffer[i].length; j++) {
            frameBuffer[i][j] = new Cell(content).getValue();
        }
    }
}

// wait and pick up the user-defined functions
setTimeout(function() {
    internalInit();
}, 1);
