import { IPostInfo } from '../interfaces/IPostInfo';

/**
 * Log post information to console
 */
export const logPostInfo = (postInfo: IPostInfo, header: string) => {
  console.log(`========== ${header}===========`);
  console.log(`ID: ${postInfo.id}`);
  console.log(`Author: ${postInfo.author}`);
  console.log(`Posted: ${postInfo.timestamp}`);
  console.log(`Content: ${postInfo.content}`);
  console.log(`Likes: ${postInfo.likes}, Retweets: ${postInfo.retweets}`);
  console.log('====================================');
};