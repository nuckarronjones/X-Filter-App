import { adKeywords } from "../data/adKeywords";
import { IPostInfo } from "../interfaces/IPostInfo";
import { logPostInfo } from "./logPostInfo";

export const _checkAdwordFilter = (post: IPostInfo): boolean => {
  const adWords = adKeywords;
  const postId = post.id;
  let hidePost: boolean = false;

  adWords.forEach((adWord) => {
    if (post.content.toUpperCase().includes(adWord.toUpperCase())) {
      logPostInfo(post, "filtering post");
      hidePost = true;
    }
  });

  return hidePost;
};

export const _checkPoliticalFilter = (post: IPostInfo): boolean => {
  let hidePost: boolean = false;

  return hidePost;
}