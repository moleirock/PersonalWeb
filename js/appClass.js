import { Player } from "./player.js";
import { InputHandler } from "./inputKeys.js";
import { getDialogue } from "./dialogue.js";

export class App {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.player = new Player(this);
        this.input = new InputHandler();
        this.aboutLeftX = document.querySelector(".scene__about").getBoundingClientRect().left;
        this.projectsLeftX = document.querySelector(".scene__projects").getBoundingClientRect().left;
        this.contactLeftX = document.querySelector(".scene__contact").getBoundingClientRect().left;
        this.particles = [];

        this.dialogueCount = 0;
    }

    update() {
        this.player.update(this.input.keys);

        // handle particles
        this.particles.forEach((particle,index)=>{
            particle.update();
            if(particle.markedForDeletion) this.particles.splice(index,1);
        })
    }
    draw(context, deltatime) {
        this.player.draw(context, deltatime);

        // drawing particles
        this.particles.forEach((particle)=>{
            particle.draw(context);
        })
    }
    drawCollision(context) {
        // collision circle
        context.beginPath();
        context.fillStyle = "rgba(0, 255, 76)";
        context.arc(
            this.player.x + this.player.width * 0.55,
            this.player.y + this.player.height * 0.35,
            this.player.width * 0.4,
            0,
            Math.PI * 2
        );
        context.fill();
    }
    dialogue() {
        if (this.player.speed === 0 && this.dialogueCount < 1) {
            getDialogue("home");
            ++this.dialogueCount;
        } else if (-this.player.speed >= this.aboutLeftX && this.dialogueCount < 2) {
            getDialogue("about");
            ++this.dialogueCount;
        } else if (-this.player.speed >= this.projectsLeftX && this.dialogueCount < 3) {
            getDialogue("projects");
            ++this.dialogueCount;
        } else if (-this.player.speed >= this.contactLeftX && this.dialogueCount < 4) {
            getDialogue("contact");
            ++this.dialogueCount;
        }
        
    }
    dialoguePlayer(context) {
        window.addEventListener("click", (e) => {
            const detectPixelColor = context.getImageData(e.x, e.y, 1, 1);
            const pixelColor = detectPixelColor.data;

            if (0 === pixelColor[0] && 255 === pixelColor[1] && 76 === pixelColor[2] && dialogue.classList.contains("display-none")) {
                getDialogue("playerFace");
            }
        });
    }
    navigationPosition() {
        this.player.screenPosition(this.aboutLeftX, this.projectsLeftX, this.contactLeftX,this.dialogueCount);
    }
}
