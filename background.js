const userReadColor = "#4A4A4A";

var ColorTypes = {
    userRead: "userReadColor",
    userReadBg: "userReadBgColor"
};

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.from == "content" && request.type == "init") {
        //initialization
        if (localStorage.userReadColor == undefined) {
            localStorage.userReadColor = userReadColor;
        }

        //send init information to the content script
        initMessage = {
            from: "background",
            type: "init",
            userReadColor: localStorage.userReadColor,
        };

        sendResponse(initMessage);

    } else if (request.from == "popup") {
        switch (request.colorType) {
            case ColorTypes.userRead:
                localStorage.userReadColor = request.value;
        }

        //send the gathered information to the content script
        contentMessage = {
            from: "background",
            type: "update",
            userReadColor: localStorage.userReadColor
        };

        chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, contentMessage, function (response) {
            });
        });
    }
});




