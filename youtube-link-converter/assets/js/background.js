chrome.commands.onCommand.addListener((command) => {
    if (command === "open_extension") {
        chrome.windows.create({
            url: chrome.runtime.getURL("popup.html"),
            type: "popup",
            width: 400,
            height: 600
        });
    }
});
