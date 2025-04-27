import { IPostInfo } from '../interfaces/IPostInfo';

/**
 * Log post information to console
 */
export const logPostInfo = (postInfo: IPostInfo) => {
  console.log('======= X-FILTER: FIRST TWEET =======');
  console.log(`ID: ${postInfo.id}`);
  console.log(`Author: ${postInfo.author} (${postInfo.handle})`);
  console.log(`Posted: ${postInfo.timestamp}`);
  console.log(`Content: ${postInfo.content}`);
  console.log(`Likes: ${postInfo.likes}, Retweets: ${postInfo.retweets}`);
  console.log('====================================');
};