function request(ctx, req) {
  const cookies = ctx.cookies;
  const doc = ctx.doc;

  req.setUrl("https://gql.reddit.com/");
  req.setMethod("POST");

  // Set all headers at once
  if (cookies["token_v2"]) {
    req.setHeader("Authorization", "Bearer " + cookies["token_v2"].value);
    req.setHeader(
      "User-Agent",
      "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Mobile Safari/537.36"
    );
    req.setHeader("Content-Type", "application/json");
  }

  try {
    // Check if the page is using the old Reddit design
    const isOldReddit = !!doc.querySelector(
      "button.redesign-beta-optin#redesign-beta-optin-btn"
    );
    let userId = "";

    if (isOldReddit) {
      // Old Reddit logic
      req.appendDebugLog("Using old Reddit logic");

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
      req.appendDebugLog("Using new Reddit logic");

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
      req.setBody({
        id: "db6eb1356b13",
        variables: { name: userId },
      });
    }

    return !!req.body && !!req.headers.Authorization;
  } catch (e) {
    console.error("Error in getBody:", e);
    return false;
  }
}
