function prepare(ctx, manifest) {
  const cookies = ctx.cookies;

  manifest.appendDebugLog("Cookies: " + JSON.stringify(cookies));
  try {
    if (cookies["JSESSIONID"]) {
      manifest.appendDebugLog("JSESSIONID: " + cookies["JSESSIONID"].value);
      manifest.request.set("csrfToken", cookies["JSESSIONID"].value);
    }

    if (cookies["li_at"]) {
      manifest.appendDebugLog("li_at: " + cookies["li_at"].value);
      manifest.request.set("authToken", cookies["li_at"].value);
    }

    manifest.appendDebugLog("Cookie: " + manifest.request.getHeader("Cookie"));
    return !manifest.request.getHeader("Cookie").includes("<%");
  } catch (e) {
    manifest.appendDebugLog("Error in prepare.js:", JSON.stringify(e));
    return false;
  }
}
