
let ColorTypes;

//initialize values in input elements
chrome.runtime.getBackgroundPage(function(bg) {
    //preserve the same color types as background page
    ColorTypes = bg.ColorTypes;

    document.getElementById("readInput").jscolor.fromString(bg.localStorage.read);
    document.getElementById("readBgInput").jscolor.fromString(bg.localStorage.readBg);
    document.getElementById("unreadInput").jscolor.fromString(bg.localStorage.unread);
    document.getElementById("unreadBgInput").jscolor.fromString(bg.localStorage.unreadBg);
    document.getElementById("selectedInput").jscolor.fromString(bg.localStorage.selected);
    document.getElementById("selectedBgInput").jscolor.fromString(bg.localStorage.selectedBg);
});

//update functions
function updateUserReadColor(jscolor) {
    sendUserInputToBackground(jscolor, ColorTypes.read);
}

function updateUserReadBgColor(jscolor) {
    sendUserInputToBackground(jscolor, ColorTypes.readBg);
}

function updateUserUnreadColor(jscolor) {
    sendUserInputToBackground(jscolor, ColorTypes.unread);
}

function updateUserUnreadBgColor(jscolor) {
    sendUserInputToBackground(jscolor, ColorTypes.unreadBg);
}

function updateUserSelectedColor(jscolor) {
    sendUserInputToBackground(jscolor, ColorTypes.selected);
}

function updateUserSelectedBgColor(jscolor) {
    sendUserInputToBackground(jscolor, ColorTypes.selectedBg);
}

function sendUserInputToBackground(value, colorType) {
    let color = '#' + value;

    chrome.runtime.sendMessage({
        from: "popup",
        colorType: colorType,
        value: color
    });
}

//visual
document.addEventListener("DOMContentLoaded", function () {
    let ghLink = document.getElementById("ghLink");
    ghLink.addEventListener('click', function () {
        chrome.tabs.create({url: ghLink.getAttribute("href")});
    });
});
