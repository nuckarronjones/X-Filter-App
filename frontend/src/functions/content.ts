import { IFilterSettings } from "../interfaces/IFilterSettings";
import { IPostInfo } from "../interfaces/IPostInfo";
import { createLabel } from "../utils/domUtils";
import { needToFilterPost } from "../utils/filters";
import { logPostInfo } from "../utils/logPostInfo";
import { getChromeStorage } from "./chromeStorage";

const allPosts = new Map<string, IPostInfo>();

const filteredPostIds = new Set<string>();

const _filterElement = (post: IPostInfo): void => {
  const container = post.element;
  const existingLabel = container.querySelector(".x-filter-label");
  const firstDiv = container.querySelector("div");

  if (firstDiv) {
    firstDiv.style.filter = "blur(30px)";

    if (!existingLabel) {
      container.style.position = "relative";
      container.appendChild(createLabel());
    }
  }
};

const _applyFiltering = async (
  userPreferences: IFilterSettings
): Promise<void> => {
  for (const post of allPosts.values()) {
    const postNotFiltered = !filteredPostIds.has(post.id);

    if (postNotFiltered) {
      const postNeedsToBeFiltered = await needToFilterPost(
        post,
        userPreferences
      );

      if (postNeedsToBeFiltered) {
        //Logging enabled by default for now
        logPostInfo(post, "post to be filtered");

        filteredPostIds.add(post.id);
      }
    }
  }

  for (const id of filteredPostIds) {
    const postToHide = allPosts.get(id);

    if (postToHide) {
      _filterElement(postToHide);
    }
  }
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
    classification: undefined,
    filtered: false
  };
};

const _gatherPosts = () => {
  const articles = document.querySelectorAll('article[data-testid="tweet"]');

  articles.forEach((article) => {
    if (article instanceof HTMLElement) {
      const post = _extractPostInfo(article);

      if (!post) return;

      allPosts.set(post.id, post);
    }
  });
};

const _observePageMutations = () => {
  let isFiltering: boolean = false; // Prevent overlapping on filtering every time page mutates

  const observer = new MutationObserver(async (mutations) => {
    const userPreferences = await _getUserPreferences();

    if (!userPreferences.enabled) return;

    if (isFiltering) return;

    const relevantMutation = mutations.some(
      (mutation) =>
        mutation.type === "childList" && mutation.addedNodes.length > 0
    );

    if (relevantMutation) {
      isFiltering = true;

      _gatherPosts();
      await _applyFiltering(userPreferences);

      isFiltering = false;
    } else {
      return;
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

async function _getUserPreferences(): Promise<IFilterSettings> {
  const userPreferences: IFilterSettings = await getChromeStorage(
    "filterSettings"
  );

  return userPreferences ?? {};
}

(() => {
  _observePageMutations();
})();
