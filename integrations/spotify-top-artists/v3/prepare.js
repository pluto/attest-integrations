function prepare(ctx, manifest) {
  const document = ctx.doc;

  const ele = document.querySelector("script#session");
  if (!ele || !ele.innerText) return false;

  try {
    const asJSON = JSON.parse(ele.innerText);

    if (!asJSON || !asJSON.accessToken) return false;

    if (
      Date.now() > asJSON.accessTokenExpirationTimestampMs ||
      asJSON.isAnonymous
    )
      return false;

    manifest.request.set("accessToken", asJSON.accessToken);

    return true;
  } catch (e) {
    return false;
  }
}
