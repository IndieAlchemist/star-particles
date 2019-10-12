import { randomIntFromRange, randomColor } from './utils.js';

var canvasTrails = document.getElementById('trailCanvas');
var canvasStars = document.getElementById('starsCanvas');

var cTrails = canvasTrails.getContext('2d');
var cStars = canvasStars.getContext('2d');


canvasTrails.width = window.innerWidth;
canvasTrails.height = window.innerHeight;

canvasStars.width = window.innerWidth;
canvasStars.height = window.innerHeight;

const nrInstances = 200;
const glowWidth = 3;
const minDistanceFromCenter=200;
const maxDistanceFromCenter=320;

const colors = [
    { fill: '#b5ceda', glow: '#b5ceda22' },
    { fill: '#94bad2', glow: '#94bad222' },
    { fill: '#60a1ca', glow: '#60a1ca22' },
    { fill: '#4c8ab9', glow: '#4c8ab922' },
    { fill: '#ba734c', glow: '#ba734c22' }

]

//Event listeners

addEventListener('resize', () => {
    canvasTrails.width = innerWidth;
    canvasTrails.height = innerHeight;

    init();
});

class Circle {
    constructor(x, y, radius, color) {
        this.centerX = x;
        this.centerY = y;
        this.radius = radius;
        this.color = color;
        this.radians = Math.random() * Math.PI * 2;
        this.velocity = Math.random() * 0.01 + 0.001;
        this.distanceFromCenter = randomIntFromRange(minDistanceFromCenter, maxDistanceFromCenter);

        this.x = this.centerX + Math.cos(this.radians) * this.distanceFromCenter;
        this.y = this.centerY + Math.sin(this.radians) * this.distanceFromCenter;
    }

    update = () => {
        const lastPoint = { x: this.x, y: this.y };
        this.radians += this.velocity;
        this.x = this.centerX + Math.cos(this.radians) * this.distanceFromCenter;
        this.y = this.centerY + Math.sin(this.radians) * this.distanceFromCenter;

        this.drawGlow();
        this.drawFill();
        this.draw(lastPoint);
    }

    draw = lastPoint => {
        cTrails.beginPath();
        cTrails.strokeStyle = this.color.fill;
        cTrails.lineWidth = this.radius;
        cTrails.moveTo(lastPoint.x, lastPoint.y);
        cTrails.lineTo(this.x, this.y);
        cTrails.stroke();
        cTrails.closePath();
    }

    drawGlow = () => {
        cStars.beginPath();
        cStars.arc(this.x, this.y, this.radius + glowWidth, 0, Math.PI * 2, false);



        cStars.fillStyle = this.color.glow;
        cStars.fill();
        cStars.closePath();
    }
    drawFill = () => {
        cStars.beginPath();
        cStars.arc(this.x, this.y, this.radius / 2, 0, Math.PI * 2, false);
        cStars.fillStyle = this.color.fill;
        cStars.fill();
        cStars.closePath();
    }
}


//Implementation
let particles;
const init = () => {



    particles = [];
    for (let i = 0; i < nrInstances; i++) {
        const radius = (Math.random() * 4) + 1;
        particles.push(new Circle(canvasTrails.width / 2, canvasTrails.height / 2, radius, randomColor(colors)));
    }

    cTrails.fillStyle = 'rgba(3,3,3,1)';
    cTrails.fillRect(0, 0, canvasTrails.width, canvasTrails.height);
}

//Animation loop
const animate = () => {
    requestAnimationFrame(animate);
    cTrails.fillStyle = 'rgba(3,3,3,0.1)';
    cTrails.fillRect(0, 0, canvasTrails.width, canvasTrails.height);

    cStars.clearRect(0, 0, canvasStars.width, canvasStars.height);

    particles.forEach(particle => {
        particle.update();
    });
}

init();
animate();
