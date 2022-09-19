import { RunningRight, RunningLeft, JumpingRight, JumpingLeft, StandingRight, StandingLeft } from "./playerStates.js";
export class Player {
    constructor(app) {
        this.image = playerImage;
        this.app = app;
        this.width = this.image.naturalWidth / 42;
        this.height = this.image.naturalHeight / 6;
        this.x = this.app.width * 0.35 - this.width * 0.5;
        this.y = this.app.height - this.height;
        this.velocitY = 0;
        this.gravity = 0.5;
        this.frameX = 0;
        this.frameY = 4;
        this.maxFrame = 17;
        this.speed = 0;
        this.maxSpeed = 0;
        this.endScreen = document.querySelector(".scene__contact").getBoundingClientRect().left;
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
    }
    update(input) {
        this.frameInterval = 1000 / this.fps;

        this.currentState.handleInput(input);

        // Dialogue Stops
        if (!dialogue.classList.contains("display-none")) this.maxSpeed = 0;

        // Horizontal movement
        this.speed += this.maxSpeed;

        if (this.speed > 0) this.speed = 0;
        else if (this.speed < -this.endScreen) this.speed = -this.endScreen;
        sections.style.transform = `translate(${this.speed}px)`;

        // Vertical movement
        this.y += this.velocitY;
        if (!this.onGround()) this.velocitY += this.gravity;
        else {
            this.velocitY = 0;
            this.y = this.app.height - this.height;
        }
    }
    draw(context, deltatime) {
        // Animation frames
        if (this.frameX >= this.maxFrame) this.frameX = 0;
        if (this.frameTimer >= this.frameInterval) {
            this.frameX++;
            this.frameTimer = 0;
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
    screenPosition(about, projects, contact,dialogueCount,input) {
        buttonHome.addEventListener("click", (e) => {
            input.push('ArrowUp');
            sections.style.transition = "transform 0.5s ease-in-out 0s";
            this.speed = 0;
            setTimeout(() => {
                sections.style.transition = "unset";
                input.splice(input.indexOf("ArrowUp"), 1);
            }, 500);
            
        });
        buttonAbout.addEventListener("click", (e) => {
            input.push('ArrowUp');
            sections.style.transition = "transform 0.5s ease-in-out 0s";
            this.speed = -about;
            setTimeout(() => {
                sections.style.transition = "unset";
                input.splice(input.indexOf("ArrowUp"), 1);
            }, 500);
        });
        buttonProjects.addEventListener("click", (e) => {
            input.push('ArrowUp');
            sections.style.transition = "transform 0.5s ease-in-out 0s";
            this.speed = -projects;
            setTimeout(() => {
                sections.style.transition = "unset";
                input.splice(input.indexOf("ArrowUp"), 1);
            }, 500);
        });
        buttonContact.addEventListener("click", (e) => {
            input.push('ArrowUp');
            sections.style.transition = "transform 0.5s ease-in-out 0s";
            this.speed = -contact;
            setTimeout(() => {
                sections.style.transition = "unset";
                input.splice(input.indexOf("ArrowUp"), 1);
            }, 500);
        });
    }
}
