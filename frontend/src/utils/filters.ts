import { adKeywords } from "../data/adKeywords";
import { IFilterSettings } from "../interfaces/IFilterSettings";
import { IPostInfo } from "../interfaces/IPostInfo";
import { logPostInfo } from "./logPostInfo";

const _checkAdwordFilter = (post: IPostInfo): boolean => {
  const adWords = adKeywords;

  return adWords.some((adWord) => {
    const regex = new RegExp(
      `\\b${adWord.trim().replace(/\s+/g, "\\s+")}\\b`,
      "i"
    );
    return regex.test(post.content);
  });
};

const _checkPoliticalFilter = async (post: IPostInfo): Promise<any> => {
  try {
    const isPoliticalPost = await chrome.runtime.sendMessage({
      type: "fetchData",
      url: "http://localhost:3000/identifyPoliticalPost",
      postData: {
        author: post.author,
        content: post.content
      },
    });
    return isPoliticalPost;
  } catch (error) {
    console.error("Error in checkPoliticalFilter:", error);
    return false;
  }
};

export const needToFilterPost = async (
  post: IPostInfo,
  userPreferences: IFilterSettings
) => {
  const { political, ads } = userPreferences;

  if (ads && _checkAdwordFilter(post)) return true;

  if (political && (await _checkPoliticalFilter(post))) return true;

  return false;
};
