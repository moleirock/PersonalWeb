import { App } from "./Classes/App.js";
import { swapTheme } from "./Functions/toggleTheme.js";
import { swapLanguage } from "./Functions/toggleLanguage.js";

window.addEventListener("load", () => {
    document.getElementById("loading").style.display = "none";

    // CANVAS PLAYER SETTINGS----------------------------------------------------
    const canvas = document.getElementById("canvasPlayer");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    let lastTime = 0;

    // CANVAS COLLISION SETTINGS------------------------------------------
    const canvasCollision = document.getElementById("canvasCollision");
    const ctxCollision = canvasCollision.getContext("2d", { willReadFrequently: true });
    canvasCollision.width = window.innerWidth;
    canvasCollision.height = window.innerHeight;

    // CANVAS BACKGROUND SETTINGS
    const canvasBackground = document.getElementById("canvasBackground");
    const ctxBackground = canvasBackground.getContext("2d");
    canvasBackground.width = window.innerWidth;
    canvasBackground.height = window.innerHeight;

    // RESIZE RELOAD------------------------------------------------------
    /* window.addEventListener("resize", () => {
        window.location.reload();
    }); */

    // VIEWPORT MOBILE UNITS
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);

    // CONTROL FUNCTIONS OF THEME AND LANGUAGE-------------------------------------------------
    swapTheme();
    swapLanguage();

    // MAIN APP ----------------------------------------------------------
    const app = new App(canvas.width, canvas.height);

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
