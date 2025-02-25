function prepare(ctx, manifest) {
  const cookies = ctx.cookies;

  try {
    // Cookie
    if (cookies["unified-session-manager-cookie"]) {
      manifest.request.set(
        "cookie",
        cookies["unified-session-manager-cookie"].value
      );
    }

    return !manifest.request.getHeader("cookie").includes("<%");
  } catch (e) {
    console.error("Error in prepare.js:", e);
    return false;
  }
}
