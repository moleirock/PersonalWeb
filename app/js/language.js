export function swapLanguage() {
    language.addEventListener("click", (e) => {
        flagEs.classList.toggle('display-none');
        flagGb.classList.toggle('display-none');
        changeLanguage(e.target.dataset.language);
    });
}

const textsToChange = document.querySelectorAll("[data-section]");
const changeLanguage = async (language) => {
    const requestJson = await fetch(`languages/${language}.json`);
    const texts = await requestJson.json();

    for (const text of textsToChange) {
        const section = text.dataset.section;
        const element = text.dataset.element;

        text.innerHTML = texts[section][element];
    }
};
