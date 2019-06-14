// Convenience function for creating elements
function h(tag, option, children, parent) {
    let element = document.createElement(tag);
    for (let key in option) {
        element[key] = option[key];
    }
    for (let child of children || []) {
        if (typeof child === "string") {
        child = document.createTextNode(child);
        }
        element.appendChild(child);
    }
    if (parent) {
        while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
        }
        parent.appendChild(element);
    }
    return element;
}

export default class FlexboxBuilder {
  constructor(questData, completedQuests) {
    // quest data from gw2 api
    this.questData = questData;
    this.questsById = {};
    for (let quest of questData) {
      this.questsById[quest.id] = quest.name;
    }
    this.questsById[0] = "Quest name not yet "
    // list of completed quest ids
    this.completedQuests = completedQuests;
  }

  vbox(title, children) {
    if (title) {
      children.unshift(h("div", {"className" : "title"}, [title]));
    }
    return h("div", {"className" : `vbox box ${title && "hastitle"}`}, children)
  }

  hbox(title, children) {
    if (title) {
      return this.vbox(title, [h("div", {"className" : "hbox box"}, children)]);
    }
    return h("div", {"className" : `hbox box ${title && "hastitle"}`}, children)
  }

  quest(id) {
    return h("div", {"className" : `quest ${this.completedQuests.includes(id) && "complete" || ""}`}, [ h("span", {}, [ this.questsById[id] || `${id}` ]) ])
  }
}