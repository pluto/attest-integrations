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

      // There is an even newer Reddit design for certain displays that
      // removes user id from the drawer, and the only place we can now
      // find it is the shadow dom, grab it from there
      if (!userId) {
        const navTimingCollector = doc.querySelector(
          "shreddit-navtimings-collector"
        );
        if (navTimingCollector) {
          userId = navTimingCollector.nextElementSibling.shadowRoot
            .querySelector("rs-current-user")
            .getAttribute("display-name");
        }
      }
    }

    // If userId is found, return it
    if (userId) {
      manifest.request.set("userId", userId);
    }

    manifest.appendDebugLog(manifest.request.get("body").variables.name);

    return (
      !manifest.request.get("body").variables.name.includes("<%") &&
      !!manifest.request.getHeader("Authorization")
    );
  } catch (e) {
    console.error("Error in getBody:", e);
    return false;
  }
}
