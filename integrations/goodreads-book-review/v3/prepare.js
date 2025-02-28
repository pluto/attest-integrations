function prepare(ctx, manifest) {
  const cookies = ctx.cookies;

  manifest.appendDebugLog(1);

  const ccsid = cookies["ccsid"];
  const locale = cookies["locale"];
  const sessionId = cookies["session-id"];
  const lcMain = cookies["lc-main"];
  const ubidMain = cookies["ubid-main"];
  const likelyHasAccount = cookies["likely_has_account"];
  const sessionIdTime = cookies["session-id-time"];
  const JSESSIONID = cookies["JSESSIONID"];
  const sessionToken = cookies["session-token"];
  const xMain = cookies["x-main"];
  const atMain = cookies["at-main"];
  const sessAtMain = cookies["sess-at-main"];
  const sessionId2 = cookies["_session_id2"];

  // manifest.appendDebugLog(2);
  // manifest.appendDebugLog("ccsid");
  // manifest.appendDebugLog(JSON.stringify(ccsid));
  // manifest.appendDebugLog("locale");
  // manifest.appendDebugLog(JSON.stringify(locale));
  // manifest.appendDebugLog("sessionId");
  // manifest.appendDebugLog(JSON.stringify(sessionId));
  // manifest.appendDebugLog("lcMain");
  // manifest.appendDebugLog(JSON.stringify(lcMain));
  // manifest.appendDebugLog("ubidMain");
  // manifest.appendDebugLog(JSON.stringify(ubidMain));
  // manifest.appendDebugLog("likelyHasAccount");
  // manifest.appendDebugLog(JSON.stringify(likelyHasAccount));
  // manifest.appendDebugLog("sessionIdTime");
  // manifest.appendDebugLog(JSON.stringify(sessionIdTime));
  // manifest.appendDebugLog("JSESSIONID");
  // manifest.appendDebugLog(JSON.stringify(JSESSIONID));
  // manifest.appendDebugLog("sessionToken");
  // manifest.appendDebugLog(JSON.stringify(sessionToken));
  // manifest.appendDebugLog("xMain");
  // manifest.appendDebugLog(JSON.stringify(xMain));
  // manifest.appendDebugLog("atMain");
  // manifest.appendDebugLog(JSON.stringify(atMain));
  // manifest.appendDebugLog("sessAtMain");
  // manifest.appendDebugLog(JSON.stringify(sessAtMain));
  // manifest.appendDebugLog("sessionId2");
  // manifest.appendDebugLog(JSON.stringify(sessionId2));

  if (
    !ccsid ||
    !locale ||
    !sessionId ||
    !lcMain ||
    !ubidMain ||
    !likelyHasAccount ||
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

  // manifest.appendDebugLog(3);

  const cookie = [
    "ccsid=" + ccsid.value,
    "locale=" + locale.value,
    "session-id=" + sessionId.value,
    "lc-main=" + lcMain.value,
    "ubid-main=" + ubidMain.value,
    "likely_has_account=" + likelyHasAccount.value,
    "session-id-time=" + sessionIdTime.value,
    "JSESSIONID=" + JSESSIONID.value,
    "session-token=" + sessionToken.value,
    "x-main=" + xMain.value,
    "at-main=" + atMain.value,
    "sess-at-main=" + sessAtMain.value,
    "_session_id2=" + sessionId2.value,
  ].join("; ");

  // manifest.appendDebugLog(4);

  manifest.request.set("Cookie", cookie);

  // manifest.appendDebugLog(5);
  return true;
}
