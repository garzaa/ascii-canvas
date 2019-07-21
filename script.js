var radius = 20;

function init() {
    createCanvas(101, 50, document.getElementById("canvas-container"));
    background("#2b2b2b");
    foreground("#888888");
    fillCanvas(".");
    frameRate(24);
}

function update() {
    fillCanvas(".");
    var f = frameCount/16;
    drawCircle("x", 50, 25, Math.sin(f)*radius, Math.cos(f)*radius, 2);
}