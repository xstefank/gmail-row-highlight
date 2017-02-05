
//user colors
const userReadColor = "#4A4A4A";
const userReadBgColor = "#858585";


var ColorTypes = {
    userRead: "userReadColor",
    userReadBg: "userReadBgColor"
};

//initialization
initStorageProperties();

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.from == "content" && request.type == "init") {

        //send init information to the content script
        initMessage = {
            from: "background",
            type: "init",
            userReadColor: localStorage.userReadColor,
            userReadBgColor: localStorage.userReadBgColor
        };

        sendResponse(initMessage);

    } else if (request.from == "popup") {
        switch (request.colorType) {
            case ColorTypes.userRead:
                localStorage.userReadColor = request.value;
                break;
            case ColorTypes.userReadBg:
                localStorage.userReadBgColor = request.value;
                break;
        }

        //send the gathered information to the content script
        contentMessage = {
            from: "background",
            type: "update",
            userReadColor: localStorage.userReadColor,
            userReadBgColor: localStorage.userReadBgColor
        };

        chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, contentMessage, function (response) {
            });
        });
    }
});

function initStorageProperties() {
    if (localStorage.userReadColor == undefined) {
        localStorage.userReadColor = userReadColor;
    }

    if (localStorage.userReadBgColor == undefined) {
        localStorage.userReadBgColor = userReadBgColor;
    }
}
function resetColors() {
    localStorage.userReadColor = userReadColor;
    localStorage.userReadBgColor = userReadBgColor;
}
