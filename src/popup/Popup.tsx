import { useEffect, useState } from "react";

export default function Popup() {
  const [count, setCount] = useState(0);
  const [url, setUrl] = useState<string>("");

  // Example: read persisted state from chrome.storage on mount.
  useEffect(() => {
    chrome.storage.local.get(["count"], (result) => {
      if (typeof result.count === "number") setCount(result.count);
    });

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      setUrl(tabs[0]?.url ?? "unknown");
    });
  }, []);

  // Example: persist state to chrome.storage whenever it changes.
  useEffect(() => {
    chrome.storage.local.set({ count });
  }, [count]);

  const pingContentScript = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tabId = tabs[0]?.id;
      if (tabId == null) return;
      chrome.tabs.sendMessage(tabId, { type: "PING" }, (response) => {
        console.log("Content script responded:", response);
      });
    });
  };

  return (
    <div className="p-4 bg-white text-gray-900 flex flex-col gap-3">
      <h1 className="text-lg font-semibold">React + TS + Tailwind</h1>

      <p className="text-xs text-gray-500 break-all">Active tab: {url}</p>

      <div className="flex items-center gap-2">
        <button
          onClick={() => setCount((c) => c + 1)}
          className="px-3 py-1.5 rounded-md bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition-colors"
        >
          Count: {count}
        </button>
        <button
          onClick={() => setCount(0)}
          className="px-3 py-1.5 rounded-md border border-gray-300 text-sm font-medium hover:bg-gray-50 transition-colors"
        >
          Reset
        </button>
      </div>

      <button
        onClick={pingContentScript}
        className="px-3 py-1.5 rounded-md bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-colors"
      >
        Ping content script
      </button>
    </div>
  );
}
