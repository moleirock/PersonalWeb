// DOM SELECTOR
const language = document.getElementById('language');
const flagEs = document.getElementById('flagEs');
const flagGb = document.getElementById('flagGb');

const textsToChange = document.querySelectorAll("[data-section]");

export function swapLanguage() {
    language.addEventListener("click", (e) => {
        flagEs.classList.toggle('display-none');
        flagGb.classList.toggle('display-none');
        changeLanguage(e.target.dataset.language);
    });
}


const changeLanguage = async (language) => {
    const requestJson = await fetch(`languages/${language}.json`);
    const texts = await requestJson.json();

    for (const text of textsToChange) {
        const section = text.dataset.section;
        const element = text.dataset.element;

        text.innerHTML = texts[section][element];
    }
};
