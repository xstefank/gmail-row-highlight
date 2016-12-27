chrome.browserAction.onClicked.addListener(function(activeTab){
    var newURL = "https://github.com/xstefank/gmail-row-highlight";
    chrome.tabs.create({ url: newURL });
});
