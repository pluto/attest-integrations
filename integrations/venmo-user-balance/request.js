function request(ctx, req) {
  const cookies = ctx.cookies;

  req.setUrl("https://api.venmo.com/graphql");
  req.setMethod("POST");
  req.setHeader("Content-Type", "application/json");
  req.setBody({
    operationName: "Identity",
    variables: {},
    query:
      "query Identity($input: ProfileInput) {  profile(input: $input) {    ... on Profile {      identity {        ... on Identity {          balance {            userBalance {              value            }          }        }      }    }  }}",
  });

  if (cookies["api_access_token"]) {
    req.setHeader(
      "Authorization",
      "Bearer " + cookies["api_access_token"].value
    );

    return true;
  }

  return false;
}
