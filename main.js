import renderStoryFlow from './story.js';
import FlexboxBuilder from './builder.js';

document.getElementById("token").value = localStorage.getItem('token') || "";

let questData = null;
let storiesData = null;
let backstoryData = null;

const url = new URL(window.location.href);
const lang = url.searchParams.get("lang") || "en";

document.getElementById("render").addEventListener("click", () => {
    render(document.getElementById("token").value, lang);
});

async function render(token, lang) {
    if (!questData) {
        const response = await fetch(`https://api.guildwars2.com/v2/quests?ids=all&lang=${lang}`);
        questData = await response.json();
    }
    if (!storiesData) {
        const response = await fetch(`https://api.guildwars2.com/v2/stories?ids=all&lang=${lang}`);
        storiesData = await response.json();
    }
    if (!backstoryData) {
        const response = await fetch(`https://api.guildwars2.com/v2/backstory/answers?ids=all&lang=${lang}`);
        backstoryData = await response.json();
    }

    let completedQuests = [];
    if (token) {
        const chResponse = await fetch(`https://api.guildwars2.com/v2/characters?access_token=${token}`);
        const characters = await chResponse.json();
        for (let character of characters) {
            const qResponse = await fetch(`https://api.guildwars2.com/v2/characters/${character}/quests?access_token=${token}`);
            const quests = await qResponse.json();
            completedQuests = [ ...completedQuests, ...quests ];
        }
    }
    
    const builder = new FlexboxBuilder(questData, completedQuests, storiesData, backstoryData);
    const flow = renderStoryFlow(builder);
    const outputElement = document.getElementById("output");
    outputElement.innerHTML = "";
    outputElement.appendChild(flow);
    localStorage.setItem('token', token);
};
render(localStorage.getItem('token'), lang);
