
let ColorTypes;

//initialize values in input elements
chrome.runtime.getBackgroundPage(function(bg) {
    //preserve the same color types as background page
    ColorTypes = bg.ColorTypes;

    document.getElementById("userReadColorInput").jscolor.fromString(bg.localStorage.userReadColor);
    document.getElementById("userReadBgColorInput").jscolor.fromString(bg.localStorage.userReadBgColor);
    document.getElementById("userUnreadColorInput").jscolor.fromString(bg.localStorage.userUnreadColor);
    document.getElementById("userUnreadBgColorInput").jscolor.fromString(bg.localStorage.userUnreadBgColor);
});

//update functions
function updateUserReadColor(jscolor) {
    let color = '#' + jscolor;

    chrome.runtime.sendMessage({
        from: "popup",
        colorType: ColorTypes.userRead,
        value: color
    });
}

function updateUserReadBgColor(jscolor) {
    let color = '#' + jscolor;

    chrome.runtime.sendMessage({
        from: "popup",
        colorType: ColorTypes.userReadBg,
        value: color
    });
}

function updateUserUnreadColor(jscolor) {
    let color = '#' + jscolor;

    chrome.runtime.sendMessage({
        from: "popup",
        colorType: ColorTypes.userUnread,
        value: color
    });
}

function updateUserUnreadBgColor(jscolor) {
    let color = '#' + jscolor;

    chrome.runtime.sendMessage({
        from: "popup",
        colorType: ColorTypes.userUnreadBg,
        value: color
    });
}
