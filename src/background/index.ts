// Manifest V3 service worker.
// Runs in the background, has access to most chrome.* APIs,
// but has no DOM and can be terminated/restarted by Chrome at any time.

chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension installed");
});

// Example: listen for messages from the popup or content scripts.
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message?.type === "GET_TAB_INFO") {
    sendResponse({ tabId: sender.tab?.id, url: sender.tab?.url });
  }
  // Return true to keep the message channel open for async sendResponse.
  return true;
});
