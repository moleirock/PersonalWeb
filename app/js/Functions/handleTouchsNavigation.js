import { hideNavigation, showNavigation } from "./hideShowNavigation.js";
const scenes = document.querySelectorAll("section[class^='scene__']");
const dropMenu = document.getElementById("dropMenu");

export function handleNavigation(player) {
    scenes.forEach((scene) => {
        scene.addEventListener("touchstart", () => {
            hideNavigation();
            player.speed = -scene.offsetLeft;
        }, { passive: true });
    });
    dropMenu.addEventListener("click", () => {
        showNavigation();
    });
}
