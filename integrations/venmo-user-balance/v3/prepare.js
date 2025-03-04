function prepare(ctx, manifest) {
  const cookies = ctx.cookies;

  if (cookies["api_access_token"]) {
    manifest.request.set("authToken", cookies["api_access_token"].value);
    return true;
  }

  return false;
}
