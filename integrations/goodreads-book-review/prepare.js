function prepare(ctx, manifest) {
  const cookies = ctx.cookies;

  const ccsid = cookies["ccsid"];
  const locale = cookies["locale"];
  const sessionId = cookies["session-id"];
  const lcMain = cookies["lc-main"];
  const ubidMain = cookies["ubid-main"];
  const likelyHasAccount = cookies["likely_has_account"];
  const blockingSignInInterstitial = cookies["blocking_sign_in_interstitial"];
  const sessionIdTime = cookies["session-id-time"];
  const JSESSIONID = cookies["JSESSIONID"];
  const sessionToken = cookies["session-token"];
  const xMain = cookies["x-main"];
  const atMain = cookies["at-main"];
  const sessAtMain = cookies["sess-at-main"];
  const sessionId2 = cookies["_session_id2"];

  if (
    !ccsid ||
    !locale ||
    !sessionId ||
    !lcMain ||
    !ubidMain ||
    !likelyHasAccount ||
    !blockingSignInInterstitial ||
    !sessionIdTime ||
    !JSESSIONID ||
    !sessionToken ||
    !xMain ||
    !atMain ||
    !sessAtMain ||
    !sessionId2
  ) {
    return false;
  }

  const cookie = [
    "ccsid=" + ccsid.value,
    "locale=" + locale.value,
    "session-id=" + sessionId.value,
    "lc-main=" + lcMain.value,
    "ubid-main=" + ubidMain.value,
    "likely_has_account=" + likelyHasAccount.value,
    "blocking_sign_in_interstitial=" + blockingSignInInterstitial.value,
    "session-id-time=" + sessionIdTime.value,
    "JSESSIONID=" + JSESSIONID.value,
    "session-token=" + sessionToken.value,
    "x-main=" + xMain.value,
    "at-main=" + atMain.value,
    "sess-at-main=" + sessAtMain.value,
    "_session_id2=" + sessionId2.value,
  ].join("; ");

  manifest.request.set("Cookie", cookie);

  return true;
}
