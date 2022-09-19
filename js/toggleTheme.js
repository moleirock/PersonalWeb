export function swapTheme() {
    toggleTheme.addEventListener("click", (e) => {
        document.body.classList.toggle("light");
        sun.classList.toggle("display-none");
        moon.classList.toggle("display-none");
    });
}
