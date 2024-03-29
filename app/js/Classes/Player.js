import { RunningRight, RunningLeft, JumpingRight, JumpingLeft, StandingRight, StandingLeft } from "./PlayerStates.js";

// DOM SELECTOR
const playerImage = document.getElementById("playerImage");
const dialogue = document.getElementById("dialogue");
const sections = document.getElementById("sections");
const navigationControls = document.getElementById("navigationControls");
const buttonHome = document.getElementById("buttonHome");
const buttonAbout = document.getElementById("buttonAbout");
const buttonProjects = document.getElementById("buttonProjects");
const buttonContact = document.getElementById("buttonContact");

export class Player {
    constructor(app) {
        this.image = playerImage;
        this.app = app;
        this.width = this.image.naturalWidth / 42;
        this.height = this.image.naturalHeight / 6;
        this.x = this.app.width * 0.35 - this.width * 0.5;
        this.y = this.app.height - this.height;
        this.velocitY = 0;
        this.gravity = 0.6;
        this.frameX = 0;
        this.frameY = 4;
        this.maxFrame = 17;
        this.speed = 0;
        this.maxSpeed = 0;
        this.endScreen = app.width*3;
        // state manangemnt
        this.states = [
            new RunningRight(this),
            new RunningLeft(this),
            new JumpingRight(this),
            new JumpingLeft(this),
            new StandingRight(this),
            new StandingLeft(this),
        ];
        this.currentState = this.states[4];
        this.currentState.enter();

        // fps
        this.fps = 10;
        this.frameTimer = 0;
        this.frameInterval = 1000 / this.fps;

        //Buttons
        this.buttonHome = buttonHome;
        this.buttonAbout = buttonAbout;
        this.buttonProjects = buttonProjects;
        this.buttonContact = buttonContact;
        this.navigationControls = navigationControls;
    }
    update(input) {
        this.frameInterval = 1000 / this.fps;

        this.currentState.handleInput(input);

        // Dialogue Stops
        if (!dialogue.classList.contains("display-none")) this.maxSpeed = 0;
    }
    draw(context, deltatime) {
        // Animation frames, this conditions are for equality in movements in all devices
        if (this.frameX >= this.maxFrame) this.frameX = 0;
        if (this.frameTimer >= this.frameInterval) {
            this.frameX++;
            this.frameTimer = 0;

            // Horizontal movement
            this.speed += this.maxSpeed;

            if (this.speed > 0) this.speed = 0;
            else if (this.speed < -this.endScreen) this.speed = -this.endScreen;
            sections.style.transform = `translate(${this.speed}px)`;

            // Vertical movement
            if (this.velocitY < -20) this.velocitY = -20;
            this.y += this.velocitY;
            if (!this.onGround()) this.velocitY += this.gravity;
            else {
                this.velocitY = 0;
                this.y = this.app.height - this.height;
            }
        }
        this.frameTimer += deltatime;

        context.drawImage(
            this.image,
            this.width * this.frameX,
            this.height * this.frameY,
            this.width,
            this.height,
            this.x,
            this.y,
            this.width,
            this.height
        );
    }

    onGround() {
        return this.y >= this.app.height - this.height;
    }

    setState(state) {
        this.currentState = this.states[state];
        this.currentState.enter();
    }
    navigationPosition() {
        const navigate = (position) => {
            this.app.input.keys.push("ArrowUp");
            sections.style.transition = "transform 0.5s ease-in-out 0s";
            this.speed = -position;
            setTimeout(() => {
                sections.style.transition = "unset";
                this.app.input.keys.splice(this.app.input.keys.indexOf("ArrowUp"), 1);
            }, 500);
        };

        this.buttonHome.addEventListener("click", (e) => {
            navigate(0);
        });
        this.buttonAbout.addEventListener("click", (e) => {
            navigate(this.app.aboutLeftX);
        });
        this.buttonProjects.addEventListener("click", (e) => {
            navigate(this.app.projectsLeftX);
        });
        this.buttonContact.addEventListener("click", (e) => {
            navigate(this.app.contactLeftX);
        });
    }
}
