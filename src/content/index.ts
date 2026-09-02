// Injected into every page (see manifest.json "matches").
// Runs in an isolated world: shares the page's DOM but not its JS globals.

console.log("Content script loaded on", window.location.href);

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message?.type === "PING") {
    sendResponse({ status: "pong", title: document.title });
  }
  return true;
});
