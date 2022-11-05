import { App } from "./appClass.js";
import { swapTheme } from "./toggleTheme.js";
import { swapLanguage } from "./language.js";

window.addEventListener("load", () => {
    document.getElementById("loading").style.display = "none";

    // CANVAS SETTINGS----------------------------------------------------
    const canvas = document.getElementById("canvasPlayer");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    let lastTime = 0;

    // CANVAS COLLISION SETTINGS------------------------------------------
    const canvasCollision = document.getElementById("canvasCollision");
    const ctxCollision = canvasCollision.getContext("2d");
    canvasCollision.width = window.innerWidth;
    canvasCollision.height = window.innerHeight;

    // RESIZE RELOAD------------------------------------------------------
    // window.addEventListener("resize", () => {
    //     window.location.reload();
    // });

    // THEME AND LANGUAGE-------------------------------------------------
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
        const deltatime = timeStamp - lastTime;
        lastTime = timeStamp;

        app.update();
        app.draw(ctx, deltatime);
        app.drawCollision(ctxCollision);
        app.dialogue();
        requestAnimationFrame(animate);
    }

    animate(0);
});
