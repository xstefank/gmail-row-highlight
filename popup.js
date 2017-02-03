
//initial request from content script


//init color properties
if (localStorage.userReadColor == undefined) {
    localStorage.userReadColor = userReadColor;
}

//setup values in input elements
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("userReadColor").value = localStorage.userReadColor;

    //init right colors in content script
    chrome.tabs.query({active:true,currentWindow:true}, function(tab) {
        chrome.tabs.sendMessage(tab[0].id, {userReadColor:localStorage.userReadColor});
    });
});

//update functions
function updateUserReadColor(jscolor) {
    localStorage.userReadColor = '#' + jscolor;

    chrome.tabs.query({active:true,currentWindow:true}, function(tab) {
        chrome.tabs.sendMessage(tab[0].id, {userReadColor:localStorage.userReadColor});
    });
}