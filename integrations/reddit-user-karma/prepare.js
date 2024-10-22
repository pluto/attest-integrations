function prepare(ctx, manifest) {
  const cookies = ctx.cookies;
  const doc = ctx.doc;

  // Set all headers at once
  if (cookies["token_v2"]) {
    manifest.request.set("authToken", cookies["token_v2"].value);
  }

  try {
    // Check if the page is using the old Reddit design
    const isOldReddit = !!doc.querySelector(
      "button.redesign-beta-optin#redesign-beta-optin-btn"
    );
    let userId = "";

    if (isOldReddit) {
      // Old Reddit logic
      manifest.appendDebugLog("Using old Reddit logic");

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
      manifest.appendDebugLog("Using new Reddit logic");

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
      manifest.request.set("userId", userId);
    }

    return (
      !manifest.request.get("body").variables.name.includes("<%") &&
      !!manifest.request.getHeader("Authorization")
    );
  } catch (e) {
    console.error("Error in getBody:", e);
    return false;
  }
}
