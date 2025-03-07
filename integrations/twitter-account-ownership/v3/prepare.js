function prepare(ctx, manifest) {
  const cookies = ctx.cookies;

  try {
    if (cookies["ct0"]) {
      manifest.request.set("csrfToken", cookies["ct0"].value);
    }

    if (cookies["auth_token"]) {
      manifest.request.set("authToken", cookies["auth_token"].value);
    }

    return !manifest.request.getHeader("Cookie").includes("<%");
  } catch (e) {
    console.error("Error in prepare.js:", e);
    return false;
  }
}
