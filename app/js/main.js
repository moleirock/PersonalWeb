import { App } from "./Classes/App.js";
import { swapTheme } from "./Functions/toggleTheme.js";
import { swapLanguage } from "./Functions/toggleLanguage.js";
import { projectFilter } from "./Functions/projectFilter.js";
import { handleNavigation } from "./Functions/handleTouchsNavigation.js";

window.addEventListener("load", () => {
    document.getElementById("loading").style.display = "none";

    // CANVAS PLAYER SETTINGS----------------------------------------------------
    const canvas = document.getElementById("canvasPlayer");
    const ctx = canvas.getContext("2d");
    canvas.width = document.querySelector("body").clientWidth;
    canvas.height = document.querySelector("body").clientHeight;
    let lastTime = 0;

    // CANVAS COLLISION SETTINGS------------------------------------------
    const canvasCollision = document.getElementById("canvasCollision");
    const ctxCollision = canvasCollision.getContext("2d", { willReadFrequently: true });
    canvasCollision.width = document.querySelector("body").clientWidth;
    canvasCollision.height = document.querySelector("body").clientHeight;

    // CANVAS BACKGROUND SETTINGS
    const canvasBackground = document.getElementById("canvasBackground");
    const ctxBackground = canvasBackground.getContext("2d");
    canvasBackground.width = document.querySelector("body").clientWidth;
    canvasBackground.height = document.querySelector("body").clientHeight;

    // RESIZE RELOAD------------------------------------------------------
    window.addEventListener("resize", () => {
        window.location.reload();
    });

    // VIEWPORT MOBILE UNITS
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);

    // MAIN APP ----------------------------------------------------------
    const app = new App(canvas.width, canvas.height);

    // CONTROL FUNCTIONS OF THEME AND LANGUAGE-------------------------------------------------
    swapTheme();
    swapLanguage();
    handleNavigation(app.player);
    
    // PROJECT FILTER
    projectFilter();

    // DIALOGUE
    app.dialoguePlayer(ctxCollision);
    app.askTour();

    // ANIMATION
    function animate(timeStamp) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctxCollision.clearRect(0, 0, canvasCollision.width, canvasCollision.height);
        ctxBackground.clearRect(0, 0, canvasBackground.width, canvasBackground.height);
        const deltatime = timeStamp - lastTime;
        lastTime = timeStamp;

        app.update();
        app.draw(ctx, deltatime);
        app.drawCollision(ctxCollision);
        app.drawBackground(ctxBackground);
        requestAnimationFrame(animate);
    }

    animate(0);
});
