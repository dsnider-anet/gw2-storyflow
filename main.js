import renderStoryFlow from './story.js';
import FlexboxBuilder from './builder.js';

document.getElementById("token").value = localStorage.getItem('token') || "";

let questData = null;
document.getElementById("render").addEventListener("click", () => {
    render(document.getElementById("token").value);
});

async function render(token) {
    if (!questData) {
        const response = await fetch("https://api.guildwars2.com/v2/quests?ids=all");
        questData = await response.json();
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
    
    const builder = new FlexboxBuilder(questData, completedQuests);
    const flow = renderStoryFlow(builder);
    const outputElement = document.getElementById("output");
    outputElement.innerHTML = "";
    outputElement.appendChild(flow);
    localStorage.setItem('token', token);
};
render(localStorage.getItem('token'));
