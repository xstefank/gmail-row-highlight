
//user colors
const userReadColor = "#4A4A4A";
const userReadBgColor = "#858585";
const userUnreadColor = "#505050";
const userUnreadBgColor = "#A0A0A0";


var ColorTypes = {
    userRead: "userReadColor",
    userReadBg: "userReadBgColor",
    userUnread: "userUnreadColor",
    userUnreadBg: "userUnreadBgColor"
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
            userReadBgColor: localStorage.userReadBgColor,
            userUnreadColor: localStorage.userUnreadColor,
            userUnreadBgColor: localStorage.userUnreadBgColor
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
            case ColorTypes.userUnread:
                localStorage.userUnreadColor = request.value;
                break;
            case ColorTypes.userUnreadBg:
                localStorage.userUnreadBgColor = request.value;
        }

        //send the gathered information to the content script
        contentMessage = {
            from: "background",
            type: "update",
            userReadColor: localStorage.userReadColor,
            userReadBgColor: localStorage.userReadBgColor,
            userUnreadColor: localStorage.userUnreadColor,
            userUnreadBgColor: localStorage.userUnreadBgColor
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

    if (localStorage.userUnreadColor == undefined) {
        localStorage.userUnreadColor = userUnreadColor;
    }

    if (localStorage.userUnreadBgColor == undefined) {
        localStorage.userUnreadBgColor = userUnreadBgColor;
    }
}
function resetColors() {
    localStorage.userReadColor = userReadColor;
    localStorage.userReadBgColor = userReadBgColor;
    localStorage.userUnreadColor = userUnreadColor;
    localStorage.userUnreadBgColor = userUnreadBgColor;
}
