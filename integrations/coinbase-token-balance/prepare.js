function prepare(ctx, manifest) {
  const cookies = ctx.cookies;

  try {
    manifest.appendDebugLog("In");
    // Cookie
    if (cookies["unified-session-manager-cookie"]) {
      manifest.appendDebugLog("In2")
      manifest.request.set(
        "cookie",
        cookies["unified-session-manager-cookie"].value
      );
      manifest.appendDebugLog("In3")
    }
    manifest.appendDebugLog(manifest.request.getHeader("cookie"));
    return !manifest.request.getHeader("cookie").includes("<%");
  } catch (e) {
    manifest.appendDebugLog("error");
    manifest.appendDebugLog(e.message);
    console.error("Error in prepare.js:", e);
    return false;
  }
}
