const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = document.body.clientWidth;
canvas.height = document.body.clientHeight;

const gridSize = 75; // adjust grid size to your liking
const dotSize = 4; // adjust dot size to your liking

var randomColor = null;

let dots = [];

var timeoutId = null;

const darknessValue = 150; // change this value as needed

const videos = document.querySelectorAll('.project-item video');



const footer = document.getElementById("footer");


function limitNumberWithinRange(num, min, max){
    const MIN = min || 1;
    const MAX = max || 20;
    const parsed = parseInt(num)
    return Math.min(Math.max(parsed, MIN), MAX)
}

class Dot {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.vx = Math.random() * 1 - 0.5;
        this.vy = Math.random() * 1 - 0.5;
    }
    draw() {
        ctx.fillStyle = "black";
        ctx.fillRect(this.x, this.y, dotSize, dotSize);
    }
    update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width) {
            this.vx = -this.vx;
        }
        if (this.y < 0 || this.y > canvas.height) {
            this.vy = -this.vy;
        }
    }
}

function restart() {
    for (let x = gridSize / 2; x < canvas.width; x += gridSize) {
        for (let y = gridSize / 2; y < canvas.height; y += gridSize) {
            dots.push(new Dot(x, y));
        }
    }
}
restart();


let previousHeight = window.innerHeight;
let previousWidth = window.innerWidth;

window.addEventListener("resize", (event) => {ChangeWindowSize();});

function ChangeWindowSize() {
    if(Math.abs(previousHeight - window.innerHeight) > 0.1 * window.innerHeight || Math.abs(previousWidth - window.innerWidth) > 0.01 * window.innerWidth)
    {
        canvas.width = document.body.clientWidth;
        canvas.height = document.body.clientHeight;
        dots.length = 0;
        restart();
        previousHeight = window.innerHeight;
        previousWidth = window.innerWidth;
    }   
}

videos.forEach(video => {
    video.addEventListener('mouseenter', () => {
      video.play();
    });
  
    video.addEventListener('mouseleave', () => {
      video.pause();
      video.currentTime = 0;
    });
});

// Get all the section elements
const sections = document.getElementsByClassName('slides');
const titles = document.getElementsByClassName('anchor-button');

// Listen for scroll events on the window object
window.addEventListener('scroll', () => {updateSection();});
function updateSection() {
    // Loop through each section and check if it is in view
    for (let i = 0; i < sections.length; i++) {
      titles[i].classList.remove('underline');
      const section = sections[i];
      const rect = section.getBoundingClientRect();
      if (rect.top < 0.5 * window.innerHeight && rect.bottom > 0.5 * window.innerHeight) {
        // Update the URL with the ID of the current section
        history.replaceState(null, null, `#${section.id}`);
        // Show the underline for the title element of the current section
        titles[i].classList.add('underline');
      }
    }
}

updateSection();

function getRandomArbitrary(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}


switch(getRandomArbitrary(0, 10)) {
    default: randomColor = "rgba(170, 255, 100, ";
        break;
    case 1:  randomColor = "rgba(120, 120, 255, ";
        break;
    case 2:  randomColor = "rgba(100, 255, 255, ";
        break;
    case 3:  randomColor = "rgba(100, 255, 170, ";
        break;
    case 4:  randomColor = "rgba(133, 255, 192, ";
        break;
    case 5:  randomColor = "rgba(125, 230, 255, ";
        break;
    case 6:  randomColor = "rgba(255, 130, 130, ";
        break;
    case 7:  randomColor = "rgba(255, 125, 200, ";
        break;
    case 8:  randomColor = "rgba(100, 205, 250, ";
        break;
    case 9:  randomColor = "rgba(255, 150, 160, ";
        break;
}


// Parse the numeric values from the RGBA string
const rgbValues = randomColor.match(/\d+/g).map(Number);

// Darken the RGB values by the specified amount
const darkenedRgbValues = rgbValues.map(value => Math.max(value - darknessValue, 0));

// Convert the darkened RGB values to a hex code
const hexCode = "#" + rgbValues.map(value => value.toString(16).padStart(2, "0")).join("");
const hexCodeDark = "#" + darkenedRgbValues.map(value => value.toString(16).padStart(2, "0")).join("");


document.documentElement.style.setProperty('--accentColor', hexCode);

document.documentElement.style.setProperty('--accentColorDark', hexCodeDark);


function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < dots.length; i++) {
        dots[i].draw();
        dots[i].update();
        for (let j = i + 1; j < dots.length; j++) {
            const distX = dots[i].x - dots[j].x;
            const distY = dots[i].y - dots[j].y;
            const distance = Math.sqrt(distX * distX + distY * distY) * 0.4;
            if (distance < gridSize) {
                ctx.beginPath();
                ctx.moveTo(dots[i].x + dotSize / 2, dots[i].y + dotSize / 2);
                ctx.lineTo(dots[j].x + dotSize / 2, dots[j].y + dotSize / 2);
                ctx.strokeStyle = randomColor + 12/distance + ")";
                ctx.lineWidth = 0.6;
                ctx.stroke();
            }
        }
    }
}
animate();