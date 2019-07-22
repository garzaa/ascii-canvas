var radius = 20;

var boxConfig = new BoxConfig("x");
boxConfig.color = "darkslategray";
boxConfig.cornerChars = "++++"
boxConfig.hChar = "-"
boxConfig.vChar = "|"

function init() {
    createCanvas(101, 50, document.getElementById("canvas-container"));
    background("#2b2b2b");
    foreground("#888888");
    fillCanvas(".");
    noLoop();
}

function update() {
    fillRect(" ", 50, 25, 20, 5);
    drawRect("c", 50, 25, 20, 5, boxConfig);
    drawText(
        "Welcome, traveler.\n\nStay a while.",
        50, 26, 
        "lightgray",
        true
    );
}
