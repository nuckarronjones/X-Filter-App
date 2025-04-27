import { IFilterSettings } from "../interfaces/IFilterSettings";

export function setChromeStorage(updatedPreferences: IFilterSettings) {
  if (_isChromeExtension()) {
    chrome.storage.sync.set({ filterSettings: updatedPreferences });
    console.log(
      "preferences updated. Preferences are now set to ",
      updatedPreferences
    );
  } else {
    console.log(
      "Running outside of Chrome extension. Skipping chrome.storage.sync."
    );
  }
}

export async function getChromeStorage(key: string): Promise<IFilterSettings> {
  return new Promise((resolve, reject) => {
    try{
      chrome.storage.sync.get(key, (result) => {
        if (result.filterSettings) {
          resolve(result.filterSettings as IFilterSettings);
        } else {
          resolve({} as IFilterSettings);
        }
      });
    }catch{
      reject("Failed to retrieve data from Chrome storage. Ensure the app is running within a Chrome Extension context.");
    }
  });
}

const _isChromeExtension = () => {
  return (
    typeof chrome !== "undefined" &&
    typeof chrome.runtime !== "undefined" &&
    !!chrome.runtime.id
  );
};
