{
  id: "reddit-user-karma",
  authOptions: {
    loginUrl: "https://www.reddit.com/login/",
    getAccessToken: (code, doc, cookies) => {
      if (cookies["token_v2"]) {
        return cookies["token_v2"].value;
      }

      return "";
    },
  },
  proofOptions: {
    headers: {
      "User-Agent": [
        "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Mobile Safari/537.36",
      ],
      Host: ["gql.reddit.com"],
    },
    getApiUrl: () => "https://gql.reddit.com/",
    getBody: function (code, doc, cookies) {
      try {
        // Check if the page is using the old Reddit design
        const isOldReddit = !!doc.querySelector(
          "button.redesign-beta-optin#redesign-beta-optin-btn"
        );
        let userId = "";

        if (isOldReddit) {
          // Old Reddit logic
          console.log("Using old Reddit logic");

          // Check for desktop version user ID
          let userLink = doc.querySelector('span.user > a[href*="/user/"]');
          if (userLink) {
            userId = userLink
              .getAttribute("href")
              .split("/user/")[1]
              .replace("/", "");
          } else {
            // Check for mobile version user ID
            userLink = doc.querySelector('a[href*="/user/"]');
            if (userLink) {
              userId = userLink
                .getAttribute("href")
                .split("/user/")[1]
                .replace("/", "");
            }
          }
        } else {
          // New Reddit logic
          console.log("Using new Reddit logic");

          const desktopDrawer = doc.querySelector("#user-drawer-content a");
          if (desktopDrawer) {
            userId = desktopDrawer.getAttribute("href").split("/")[2];
          } else {
            const mobileDrawer = doc.querySelector("#hui-user-drawer a");
            if (mobileDrawer) {
              userId = mobileDrawer.getAttribute("href").split("/")[2];
            }
          }
        }

        // If userId is found, return it
        if (userId) {
          return JSON.stringify({
            id: "db6eb1356b13",
            variables: { name: userId },
          });
        }

        // If user ID is not found in either old or new Reddit
        return "";
      } catch (e) {
        console.error("Error in getBody:", e);
        return "";
      }
    },
  },
  mobile: {
    title: "Total Reddit Karma",
    generateProofDescription:
      "Generate a proof that you have a certain amount of karma",
  },
};
