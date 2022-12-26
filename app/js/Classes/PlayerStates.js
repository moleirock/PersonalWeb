import { Dust } from "./Particles.js";

const states = {
    RUNNING_RIGHT: 0,
    RUNNING_LEFT: 1,
    JUMPING_RIGHT: 2,
    JUMPING_LEFT: 3,
    STANDING_RIGHT: 4,
    STANDING_LEFT: 5,
};

class State {
    constructor(state) {
        this.state = state;
    }
}
export class RunningRight extends State {
    constructor(player) {
        super("RUNNING_RIGHT");
        this.player = player;
        this.runningSpeed = 16;
    }
    enter() {
        this.player.frameY = states.RUNNING_RIGHT;
        this.player.maxFrame = 41;
        this.player.fps = 64;
        this.player.maxSpeed = -this.runningSpeed;
        toggleTheme.style.transform = "translate(6rem)";
        navigationControl.style.transform = "translate(-100%)";
    }
    handleInput(input) {
        this.player.app.particles.push(new Dust(this.player.app, this.player.x + this.player.width * 0.5, this.player.app.height, 1));

        if (input.includes("ArrowLeft")) {
            input.splice(input.indexOf("ArrowRight"), 1);
            this.player.setState(states.RUNNING_LEFT);
        } else if (input.indexOf("ArrowRight") === -1) this.player.setState(states.STANDING_RIGHT);
        else if (input.includes("ArrowUp")) this.player.setState(states.JUMPING_RIGHT);
    }
}
export class RunningLeft extends State {
    constructor(player) {
        super("RUNNING_LEFT");
        this.player = player;
        this.runningSpeed = 16;
    }
    enter() {
        this.player.frameY = states.RUNNING_LEFT;
        this.player.maxFrame = 41;
        this.player.fps = 64;
        this.player.maxSpeed = this.runningSpeed;
        navigationControl.style.transform = "unset";
        toggleTheme.style.transform = "unset";
    }
    handleInput(input) {
        this.player.app.particles.push(new Dust(this.player.app, this.player.x + this.player.width * 0.5, this.player.app.height, -1));
        if (input.includes("ArrowRight")) {
            input.splice(input.indexOf("ArrowLeft"), 1);
            this.player.setState(states.RUNNING_RIGHT);
        } else if (input.indexOf("ArrowLeft") === -1) this.player.setState(states.STANDING_LEFT);
        else if (input.includes("ArrowUp")) this.player.setState(states.JUMPING_LEFT);
    }
}
export class JumpingRight extends State {
    constructor(player) {
        super("JUMPING_RIGHT");
        this.player = player;
    }
    enter() {
        this.player.frameY = states.JUMPING_RIGHT;
        this.player.maxFrame = 24;
        this.player.fps = 64;
        if (this.player.onGround()) this.player.velocitY -= 20;
    }
    handleInput(input) {
        if (input.includes("ArrowLeft")) {
            input.splice(input.indexOf("ArrowRight"), 1);
            this.player.setState(states.JUMPING_LEFT);
        } else if (this.player.onGround()) this.player.setState(states.STANDING_RIGHT);
    }
}
export class JumpingLeft extends State {
    constructor(player) {
        super("JUMPING_RIGHT");
        this.player = player;
    }
    enter() {
        this.player.frameY = states.JUMPING_LEFT;
        this.player.maxFrame = 24;
        this.player.fps = 64;
        if (this.player.onGround()) this.player.velocitY -= 20;
    }
    handleInput(input) {
        if (input.includes("ArrowRight")) {
            input.splice(input.indexOf("ArrowRight"), 1);
            this.player.setState(states.JUMPING_RIGHT);
        } else if (this.player.onGround()) this.player.setState(states.STANDING_LEFT);
    }
}

export class StandingRight extends State {
    constructor(player) {
        super("STANDING_RIGHT");
        this.player = player;
    }
    enter() {
        this.player.maxSpeed = 0;
        this.player.frameY = states.STANDING_RIGHT;
        this.player.maxFrame = 17;
        this.player.fps = 8;
    }
    handleInput(input) {
        if (input.includes("ArrowLeft")) this.player.setState(states.RUNNING_LEFT);
        else if (input.includes("ArrowRight")) this.player.setState(states.RUNNING_RIGHT);
        else if (input.includes("ArrowUp")) this.player.setState(states.JUMPING_RIGHT);
    }
}
export class StandingLeft extends State {
    constructor(player) {
        super("STANDING_LEFT");
        this.player = player;
    }
    enter() {
        this.player.frameY = states.STANDING_LEFT;
        this.player.maxFrame = 17;
        this.player.fps = 8;
        this.player.maxSpeed = 0;
    }
    handleInput(input) {
        if (input.includes("ArrowLeft")) this.player.setState(states.RUNNING_LEFT);
        else if (input.includes("ArrowRight")) this.player.setState(states.RUNNING_RIGHT);
        else if (input.includes("ArrowUp")) this.player.setState(states.JUMPING_LEFT);
    }
}
