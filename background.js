var userReadColor = "#4A4A4A";

var ColorTypes = {
    userRead: "userReadColor",
    userReadBg: "userReadBgColor"
};

//initialization
chrome.runtime.onInstalled.addListener(function () {
    console.log("init");
    if (localStorage.userReadColor == undefined) {
        localStorage.userReadColor = userReadColor;
    }
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.from == "popup") {
        switch (request.colorType) {
            case ColorTypes.userRead: localStorage.userReadColor = request.value;
        }

        //send the gathered information to the content script
        var contentMessage = {
            from: "background",
            userReadColor: localStorage.userReadColor
        };

        chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
            chrome.tabs.sendMessage(tabs[0].id, contentMessage, function(response) {});
        });
    }

});




