const toggleTheme = document.getElementById("toggleTheme");
const navigationControl = document.getElementById("navigationControl");
const dropMenu = document.getElementById("dropMenu");

export function hideNavigation() {
    navigationControl.style.transform = "translate(-100%)";
    toggleTheme.style.right = "-5rem";
    dropMenu.style.transform = "translate(0)";
}
export function showNavigation() {
    navigationControl.style.transform = "unset";
    toggleTheme.style.right = "1rem";
    dropMenu.style.transform = "translate(100%,-100%)";
}