var radius = 20;
var particleColors = ["#f2dc49", "#d99e1e", "#ba5d11", "#80170f", "#5c1737", "#2b122b"]
var particleSprites = "O0@o*,."
var particles = [];

var boxConfig = new BoxConfig("x");
boxConfig.color = "darkslategray";
boxConfig.cornerChars = "++++"
boxConfig.hChar = "-"
boxConfig.vChar = "|"

function init() {
    createCanvas(101, 50, document.getElementById("canvas-container"));
    background("#2b2b2b");
    foreground("#888888");
    fillCanvas(" ");
    frameRate(24);
}

function update() {
    fillCanvas(" ");
    spawnParticle();
    spawnParticle();
    spawnParticle();
    spawnParticle();
    spawnParticle();
    spawnParticle();
    spawnParticle();
    spawnParticle();
    spawnParticle();
    spawnParticle();
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    fillRect(" ", 50, 25, 12, 4);
    drawRect("c", 50, 25, 12, 4, boxConfig);
    drawText(
        "Welcome, traveler.",
        42, 24, 
        "lightgray"
    );
    drawLink(
        "Stay a while.",
        ``,
        42, 26
    )
}

function spawnParticle() {
    particles.push(new Particle(
        55,
        new Vector2(randInt(99), 51),
        new Vector2(0, -1 - randInt(2))
    ));
}

class Particle {    
    lifetime;
    age;
    velocity;
    position;
    index;
    active;

    constructor(lifetime, position, velocity) {
        this.lifetime = lifetime + Math.random()*3;
        this.position = position;
        this.velocity = velocity;
        this.age = 0;
        this.index = particles.length+1;
        this.active=true;
    }

    update() {
        this.age++;
        this.position.add(this.velocity);
    }

    draw() {
        if (!this.active) {
            return;
        }
        var ageRatio = this.age/this.lifetime;
        if (this.age >= this.lifetime || this.position.y < 0) {
            particles.splice(this.index, 1);
            this.active = false;
            return;
        }
        var sprite = particleSprites[Math.round(particleSprites.length*ageRatio)];
        var color = particleColors[Math.round(particleColors.length*ageRatio)]
        drawChar(
            sprite, 
            this.position.x + Math.sin((frameCount+this.age*(this.index%4))/8)*4,
            this.position.y, 
            color);
    }
}
