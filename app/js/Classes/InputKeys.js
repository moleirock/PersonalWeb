// DOM SELECTOR
const dialogue = document.getElementById('dialogue');
const mobileJoystick = document.getElementById('mobileJoystick');
const mobileJoystickCentre = document.getElementById('mobileJoystickCentre');


export class InputHandler {
    constructor() {
        this.keys = [];
        this.touchX = "";
        this.touchY = "";
        this.sensibility = 20;
        window.addEventListener("keydown", (e) => {
            if (dialogue.classList.contains("display-none"))
                switch (e.key) {
                    case "ArrowRight":
                    case "d":
                    case "D":
                        if (this.keys.indexOf("ArrowRight") === -1) this.keys.push("ArrowRight");
                        break;
                    case "ArrowLeft":
                    case "a":
                    case "A":
                        if (this.keys.indexOf("ArrowLeft") === -1) this.keys.push("ArrowLeft");
                        break;
                    case "ArrowUp":
                    case "w":
                    case "W":
                        if (this.keys.indexOf("ArrowUp") === -1) this.keys.push("ArrowUp");
                        break;
                } 
        });
        window.addEventListener("keyup", (e) => {
            switch (e.key) {
                case "ArrowRight":
                case "d":
                case "D":
                    this.keys.splice(this.keys.indexOf("ArrowRight"), 1);
                    break;
                case "ArrowLeft":
                case "a":
                case "A":
                    this.keys.splice(this.keys.indexOf("ArrowLeft"), 1);
                    break;
                case "ArrowUp":
                case "w":
                case "W":
                    this.keys.splice(this.keys.indexOf("ArrowUp"), 1);
                    break;
            }
        });
        
        /* MOBILE */
        mobileJoystick.addEventListener("touchstart", (e) => {
            this.touchX = e.changedTouches[0].pageX;
            this.touchY = e.changedTouches[0].pageY;
            
        },{passive: true});
        mobileJoystick.addEventListener("touchmove", (e) => {
            const swipeDistanceX = e.changedTouches[0].pageX - this.touchX;
            const swipeDistanceY = e.changedTouches[0].pageY - this.touchY;
                     
            if (dialogue.classList.contains("display-none")) {
                if (swipeDistanceY < -this.sensibility && this.keys.indexOf("ArrowUp") == -1) {
                    mobileJoystickCentre.style.top= "30%";
                    this.keys.push("ArrowUp");
                }
                if (swipeDistanceX > this.sensibility && this.keys.indexOf("ArrowRight") === -1) {
                    mobileJoystickCentre.style.left="70%";
                    this.keys.splice(this.keys.indexOf("ArrowLeft"), 1);
                    this.keys.push("ArrowRight");
                } else if (swipeDistanceX < -this.sensibility && this.keys.indexOf("ArrowLeft") === -1) {
                    mobileJoystickCentre.style.left="30%";
                    this.keys.splice(this.keys.indexOf("ArrowRight"), 1);
                    this.keys.push("ArrowLeft");
                }
            }
        },{passive: true});

        mobileJoystick.addEventListener("touchend", (e) => {
            mobileJoystickCentre.style.top= "50%";
            mobileJoystickCentre.style.left= "50%";
            this.keys=[];      
        });
    }
}
