// DOM SELECTOR
const dialogue = document.getElementById("dialogue");
const dialogueText = document.getElementById("dialogueText");
const dialogueButton = document.getElementById("dialogueButton");

// VARIABLES DECLARATIONS
let texts = {};
let flagSelected = document.getElementsByClassName("language__icon display-none");
let currentMessageIndex = 0;
let section = "";

const updateDialogue = async () => {
    const requestJson = await fetch(`languages/${flagSelected[0].dataset.language}.json`);
    texts = await requestJson.json();
    dialogueText.innerHTML = texts.dialogue[section][currentMessageIndex];
    dialogue.classList.remove("display-none");
};
export const updateLanguage = () =>{
    if(!dialogue.classList.contains("display-none")) updateDialogue();
}

export const getDialogue = (sectionInput = "home") => {
    section = sectionInput;
    updateDialogue();
};

dialogueButton.addEventListener("click", () => {
    ++currentMessageIndex;
    if (currentMessageIndex < texts.dialogue[section].length) {
        updateDialogue();
    } else {
        dialogue.classList.add("display-none");
        currentMessageIndex = 0;
    }
});

