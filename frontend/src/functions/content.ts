import { IPostInfo } from "../interfaces/IPostInfo";
import {  needToFilterPost } from "../utils/filters";

const allPosts = new Map<string, IPostInfo>();

const filteredPostIds = new Set<string>();

const _filterElement = (article: HTMLElement): void => {
  const firstDiv = article.querySelector("div");

  if (firstDiv) {
    firstDiv.style.filter = "blur(30px)";
  }
};

const _applyFiltering = (): void => {
  allPosts.forEach(async (post) => {
    if (await needToFilterPost(post)) {
      filteredPostIds.add(post.id);
    }
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
        if (allPosts.has(post.id) && filteredPostIds.has(post.id)) {
          _filterElement(post.element);
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
