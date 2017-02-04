
let ColorTypes;

//initialize values in input elements
chrome.runtime.getBackgroundPage(function(bg) {
    //preserve the same color types as background page
    ColorTypes = bg.ColorTypes;

    document.getElementById("userReadColorInput").jscolor.fromString(bg.localStorage.userReadColor);
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