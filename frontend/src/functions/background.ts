chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === "fetchData") {
      fetchDataFromBackend(request.url)
        .then((isPolitical) => {
          sendResponse(isPolitical);
        })
        .catch(() => {
          sendResponse("HTTP Error Could Not Process!");
        });
  
      return true; 
    }
  });
  
  function fetchDataFromBackend(url: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ someData: "example" })
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
  