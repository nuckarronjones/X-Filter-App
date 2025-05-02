chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "fetchData") {
    fetchDataFromBackend(request)
      .then((isPolitical) => {
        sendResponse(isPolitical);
      })
      .catch(() => {
        sendResponse("HTTP Error Could Not Process!");
      });

    return true;
  }
});

function fetchDataFromBackend(request: any): Promise<boolean> {
  const postData = request.postData;
  const url = request.url;

  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    })
      .then((response) => {
        if (!response.ok) {
          reject(`HTTP error! status: ${response.status}`);
          return;
        }
        return response.json();
      })
      .then((data) => {
        resolve(data.isPolitical);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
