import { IFilterSettings } from "../interfaces/IFilterSettings";

export let filterSettings: IFilterSettings = {
  enabled: true,
  likes: [0, 100],
  ads: true,
  political: true,
};

export const loadFilterSettings = (): Promise<IFilterSettings> => {
  return new Promise((resolve) => {
    chrome.storage.sync.get("filterSettings", (result) => {
      if (result.filterSettings) {
        resolve(result.filterSettings);
      } else {
        resolve(filterSettings);
      }
    });
  });
};
