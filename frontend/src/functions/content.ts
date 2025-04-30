import { adKeywords } from "../data/adKeywords";
import { IPostInfo } from "../interfaces/IPostInfo";
import { logPostInfo } from "../utils/logPostInfo";

const allPosts = new Map<string, IPostInfo>();

const filteredPostIds = new Set<string>();

const _filterElement = (article: HTMLElement): void => {
  const firstDiv = article.querySelector('div');
  
  if (firstDiv) {
    firstDiv.style.filter = "blur(30px)";
  }
};

const _checkAdwordFilter = (post: IPostInfo): void => {
  const adWords = adKeywords;
  const postId = post.id;
  let hidePost: boolean = false;

  adWords.forEach((adWord) => {
    if (post.content.toUpperCase().includes(adWord.toUpperCase())) {
      logPostInfo(post, "filtering post");
      hidePost = true;
    }
  });

  if (hidePost) filteredPostIds.add(postId);
};

const _applyFiltering = (): void => {
  allPosts.forEach((post) => {
    _checkAdwordFilter(post);
  });

  filteredPostIds.forEach((id) => {
    const posttoHide = allPosts.get(id);
    _filterElement(posttoHide!.element);
  });
};

const _extractPostInfo = (article: HTMLElement): IPostInfo | null => {
  const postId = _getPostId(article);

  const authorName =
    article.querySelector('[data-testid="User-Name"]')?.querySelector("span")
      ?.textContent || "Unknown Author";

  const content =
    article.querySelector('[data-testid="tweetText"]')?.textContent || "";

  const timestamp =
    article.querySelector("time")?.getAttribute("datetime") || "";

  let likes = article.querySelector('[data-testid="like"]')?.textContent || "0";
  likes = likes.replace(/[^0-9]/g, "");

  let retweets =
    article.querySelector('[data-testid="retweet"]')?.textContent || "0";
  retweets = retweets.replace(/[^0-9]/g, "");

  return {
    id: postId,
    author: authorName,
    content,
    timestamp,
    likes,
    retweets,
    element: article,
  };
};

const _gatherPosts = () => {
  const articles = document.querySelectorAll('article[data-testid="tweet"]');

  articles.forEach((article) => {
    if (article instanceof HTMLElement) {
      const post = _extractPostInfo(article);

      if (post) {
        //this means we rendered the same post we have processed before, need to check if it needs to be filtered
        if (allPosts.has(post.id)) {
          if (filteredPostIds.has(post.id)) {
            _filterElement(post.element);
          }
        } else {
          allPosts.set(post.id, post);
        }
      }
    }
  });
};

const _observePageMutations = () => {
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
        mutation.addedNodes.forEach((node) => {
          if (node instanceof HTMLElement) {
            _gatherPosts();
            _applyFiltering();
          }
        });
      }
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
};

function _getPostId(article: HTMLElement) {
  const links = Array.from(article.querySelectorAll("a"));

  let articleId: string = "";

  for (const link of links) {
    const href = link.getAttribute("href") || "";
    const match = href.match(/\d{6,}/);
    if (match) {
      articleId = match[0];
      break;
    }
  }

  return articleId;
}

(() => {
  _observePageMutations();
})();
