import { IFilterSettings } from "../interfaces/IFilterSettings";

export function setChromeStorage(updatedPreferences: IFilterSettings) {
  if (_isChromeExtension()) {
    chrome.storage.sync.set({ filterSettings: updatedPreferences });
  } else {
    console.log(
      "Running outside of Chrome extension. Skipping chrome.storage.sync."
    );
  }
}

const _isChromeExtension = () => {
  return (
    typeof chrome !== "undefined" &&
    typeof chrome.runtime !== "undefined" &&
    !!chrome.runtime.id
  );
}
