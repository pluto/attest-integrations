function prepare(ctx, manifest) {
  const cookies = ctx.cookies;

  try {
    if (cookies["JSESSIONID"]) {
      manifest.request.set("csrfToken", cookies["JSESSIONID"].value);
    }

    if (cookies["li_at"]) {
      manifest.request.set("authToken", cookies["li_at"].value);
    }

    return !manifest.request.getHeader("Cookie").includes("<%");
  } catch (e) {
    console.error("Error in prepare.js:", e);
    return false;
  }
}
