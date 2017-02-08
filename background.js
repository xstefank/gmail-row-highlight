
//default colors
const defReadColor = "#4A4A4A";
const defReadBgColor = "#858585";
const defUnreadColor = "#505050";
const defUnreadBgColor = "#A0A0A0";
const defSelectedColor = "#333A36";
const defSelectedBgColor = "#62E544";



var ColorTypes = {
    read: "userReadColor",
    readBg: "userReadBgColor",
    unread: "userUnreadColor",
    unreadBg: "userUnreadBgColor",
    selected: "userSelectedColor",
    selectedBg: "userSelectedBgColor"
};

//initialization
initStorageProperties();

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.from == "content" && request.type == "init") {

        //send init information to the content script
        initMessage = {
            from: "background",
            type: "init",
            read: localStorage.read,
            readBg: localStorage.readBg,
            unread: localStorage.unread,
            unreadBg: localStorage.unreadBg,
            selected: localStorage.selected,
            selectedBg: localStorage.selectedBg
        };

        sendResponse(initMessage);

    } else if (request.from == "popup") {
        switch (request.colorType) {
            case ColorTypes.read:
                localStorage.read = request.value;
                break;
            case ColorTypes.readBg:
                localStorage.readBg = request.value;
                break;
            case ColorTypes.unread:
                localStorage.unread = request.value;
                break;
            case ColorTypes.unreadBg:
                localStorage.unreadBg = request.value;
                break;
            case ColorTypes.selected:
                localStorage.selected = request.value;
                break;
            case ColorTypes.selectedBg:
                localStorage.selectedBg = request.value;
                break;
            default:
                throw "Undefined color type: " + request.colorType;
        }

        //send the gathered information to the content script
        contentMessage = {
            from: "background",
            type: "update",
            read: localStorage.read,
            readBg: localStorage.readBg,
            unread: localStorage.unread,
            unreadBg: localStorage.unreadBg,
            selected: localStorage.selected,
            selectedBg: localStorage.selectedBg
        };

        chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, contentMessage, function (response) {
            });
        });
    }
});

function initStorageProperties() {
    if (localStorage.read == undefined) {
        localStorage.read = defReadColor;
    }

    if (localStorage.readBg == undefined) {
        localStorage.readBg = defReadBgColor;
    }

    if (localStorage.unread == undefined) {
        localStorage.unread = defUnreadColor;
    }

    if (localStorage.unreadBg == undefined) {
        localStorage.unreadBg = defUnreadBgColor;
    }

    if (localStorage.selected == undefined) {
        localStorage.selected = defSelectedColor;
    }

    if (localStorage.selectedBg == undefined) {
        localStorage.selectedBg = defSelectedBgColor;
    }
}

function resetColors() {
    localStorage.read = defReadColor;
    localStorage.readBg = defReadBgColor;
    localStorage.unread = defUnreadColor;
    localStorage.unreadBg = defUnreadBgColor;
    localStorage.selected = defSelectedColor;
    localStorage.selectedBg = defSelectedBgColor;
}
