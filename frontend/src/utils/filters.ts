import { adKeywords } from "../data/adKeywords";
import { IPostInfo } from "../interfaces/IPostInfo";
import { logPostInfo } from "./logPostInfo";

const _checkAdwordFilter = (post: IPostInfo): boolean => {
  const adWords = adKeywords;
  const postId = post.id;

  adWords.forEach((adWord) => {
    if (post.content.toUpperCase().includes(adWord.toUpperCase())) {
      return true;
    }
  });

  return false;
};

const _checkPoliticalFilter = async (post: IPostInfo): Promise<any> => {
  try {
    const isPoliticalPost = await chrome.runtime.sendMessage({
      type: "fetchData",
      url: "http://localhost:3000/identifyPoliticalPost",
    });
    return isPoliticalPost;
  } catch (error) {
    console.error("Error in checkPoliticalFilter:", error);
    return false;
  }
};

export const needToFilterPost = async (post: IPostInfo) => {
    if (_checkAdwordFilter(post)) return true;
  
    const politicalCheck = await _checkPoliticalFilter(post);
    
    if (politicalCheck) return true;
  
    return false;
  };
  