import { getChromeStorage, setChromeStorage } from "../functions/chromeStorage";
import { IFilterSettings } from "../interfaces/IFilterSettings";

type PreferencesListener = (updatedPreferences: IFilterSettings) => void;

export const defaultPreferences: IFilterSettings = {
  enabled: true,
  likes: [0, 100],
  ads: true,
  political: true,
};

export const UserPreferencesService = (() => {
  let _userPreferences: IFilterSettings = {
    ...defaultPreferences,
  };

  const _listeners: PreferencesListener[] = [];

  const getUserPreferences = (): IFilterSettings => {
    return _userPreferences;
  };

  const setUserPreferences = (updatedPreferences: IFilterSettings) => {
    _userPreferences = updatedPreferences;
    _notifySubscribers();
  };

  const _notifySubscribers = () => {
    _listeners.forEach((fn) => {
      const preferences = getUserPreferences();
      fn(preferences);
    });
  };

  (async () => {
    const savedPreferences: IFilterSettings = await getChromeStorage(
      "filterSettings"
    );

    if (savedPreferences) {
      setUserPreferences(savedPreferences);
      _notifySubscribers();
    }
  })();

  const subscribe = (callbackFn: PreferencesListener) => {
    _listeners.push(callbackFn);

    callbackFn(getUserPreferences());
  };

  return {
    getUserPreferences,
    setUserPreferences,
    subscribe,
  };
})();
