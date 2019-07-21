var radius = 20;

function init() {
    createCanvas(101, 50, document.getElementById("canvas-container"));
    background("#2b2b2b");
    foreground("#888888");
    fillCanvas(".");
    noLoop();
}

function update() {
    fillCanvas(".");
    fillRect("P", 50, 25, 30, 10, "red");
    drawLink("test", "http://www.google.com", 59, 35);
}
