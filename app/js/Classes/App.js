import { Player } from "./Player.js";
import { InputHandler } from "./InputKeys.js";
import { getDialogue } from "../Functions/dialogue.js";

// DOM SELECTOR
const aboutLeftX = document.querySelector(".scene__about").getBoundingClientRect().left;
const projectsLeftX = document.querySelector(".scene__projects").getBoundingClientRect().left;
const contactLeftX = document.querySelector(".scene__contact").getBoundingClientRect().left;
const sections = document.querySelectorAll("section[class^='scene__']");

export class App {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.player = new Player(this);
        this.input = new InputHandler();
        this.aboutLeftX = aboutLeftX;
        this.projectsLeftX = projectsLeftX;
        this.contactLeftX = contactLeftX;
        this.sections=sections;
        this.particles = [];
    }

    update() {
        this.player.update(this.input.keys);

        // handle particles
        this.particles.forEach((particle, index) => {
            particle.update();
            if (particle.markedForDeletion) this.particles.splice(index, 1);
        });
    }
    draw(context, deltatime) {
        this.player.draw(context, deltatime);

        // drawing particles
        this.particles.forEach((particle) => {
            particle.draw(context);
        });
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

    dialogueTour() {
        
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {                       
                        this.player.maxSpeed=0;
                        this.player.speed=-entry.target.offsetLeft;                       
                        getDialogue(entry.target.dataset.name);
                        observer.unobserve(entry.target);
                    }
                });
            },
            {   
                threshold: .95,
            }
        );

        this.sections.forEach((section) => {
            observer.observe(section);
        });
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

    askTour() {
        getDialogue("tour");

        dialogueButtonReject.addEventListener("click", () => {
            dialogue.classList.add("display-none");
            dialogueButtonReject.classList.add("display-none");
            this.player.navigationPosition();
        });

        dialogueButtonAccept.addEventListener("click", () => {
            dialogue.classList.add("display-none");
            dialogueButtonReject.classList.add("display-none");
            dialogueButtonAccept.classList.add("display-none");
            dialogueButton.classList.remove("display-none");
            this.player.navigationPosition();
            this.dialogueTour();
        });
    }
}
