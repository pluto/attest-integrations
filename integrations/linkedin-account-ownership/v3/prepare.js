function prepare(ctx, manifest) {
  const cookies = ctx.cookies;

  try {
    if (cookies["JSESSIONID"]) {
      manifest.request.set(
        "strippedCsrfToken",
        cookies["JSESSIONID"].value.replaceAll('"', "")
      );
      manifest.request.set(
        "csrfToken",
        encodeURIComponent(cookies["JSESSIONID"].value)
      );
    }

    if (cookies["li_at"]) {
      manifest.request.set("authToken", cookies["li_at"].value);
    }

    return !manifest.request.getHeader("Cookie").includes("<%");
  } catch (e) {
    manifest.appendDebugLog("Error in prepare.js:", e.message);
    return false;
  }
}
