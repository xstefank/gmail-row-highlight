
var ColorTypes;

//setup values in input elements
// document.addEventListener("DOMContentLoaded", function() {
//     document.getElementById("userReadColor").value = localStorage.userReadColor;
//
//     //init right colors in content script
//     chrome.tabs.query({active:true,currentWindow:true}, function(tab) {
//         chrome.tabs.sendMessage(tab[0].id, {userReadColor:localStorage.userReadColor});
//     });
// });

//initialize the values in input elements
chrome.runtime.getBackgroundPage(function(bg) {
    //preserve the same color types as background page
    ColorTypes = bg.ColorTypes;

    document.getElementById("userReadColorInput").jscolor.fromString(bg.localStorage.userReadColor);
});


//update functions
function updateUserReadColor(jscolor) {
    var color = '#' + jscolor;

    chrome.runtime.sendMessage({
        from: "popup",
        colorType: ColorTypes.userRead,
        value: color
    });
    // chrome.tabs.query({active:true,currentWindow:true}, function(tab) {
    //     chrome.tabs.sendMessage(tab[0].id, {userReadColor:localStorage.userReadColor});
    // });


}