export enum PostClassification {
  Political = "Political",
  Advertisement = "Advertisement",
  Misc = "Misc"
} 

export interface IPostInfo {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  likes: string;
  retweets: string;
  element: HTMLElement;
  classification: PostClassification | undefined;
  filtered: boolean;
}
