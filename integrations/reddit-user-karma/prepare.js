function prepare(ctx, manifest) {
  if (!manifest || !manifest.request) return false; 

  const cookies = ctx.cookies;
  const doc = ctx.doc;

  try {
    // Auth Token
    if (cookies["token_v2"]) {
      manifest.request.set("authToken", cookies["token_v2"].value);
    }

    // User ID
    const userLink = doc.querySelector('span.user > a[href*="/user/"]');
    if (userLink) {
      manifest.request.set(
        "userId",
        userLink.getAttribute("href").split("/user/")[1].replace("/", "")
      );
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
