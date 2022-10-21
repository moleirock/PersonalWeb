// DOM SELECTOR
const dialogue = document.getElementById('dialogue');
const dialogueText = document.getElementById('dialogueText');
const dialogueButton = document.getElementById('dialogueButton');
const language = document.getElementById('language');


export const getDialogue = async (section = "home") => {
    let flagSelected = document.getElementsByClassName("language__icon display-none");

    const requestJson = await fetch(`languages/${flagSelected[0].dataset.language}.json`);
    const texts = await requestJson.json();

    speechBox(texts.dialogue[section]);
    language.addEventListener("click", () => {
        if (!dialogue.classList.contains("display-none")) getDialogue(section);
    });
};

const speechBox = (text = ["Nothing to say"], i = 0) => {
    dialogueText.innerHTML = text[i];
    dialogue.classList.remove("display-none");
    dialogueButton.addEventListener("click", () => {
        dialogue.classList.add("display-none");
        if (text.length - 1 > i) {
            speechBox(text, ++i);
        }
    });
};
