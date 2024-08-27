{
  id: "venmo-user-balance",
  authOptions: {
    loginUrl: "https://venmo.com/account/sign-in",
    getAccessToken: (config, document, cookies) => {
      if(cookies['api_access_token']) {
        return cookies['api_access_token'].value;
      }

      return '';
    }
  },
  proofOptions: {
    getApiUrl: () => "https://api.venmo.com/graphql",
    getBody: () => JSON.stringify({
      operationName: "Identity",
      variables: {},
      query:
        "query Identity($input: ProfileInput) {  profile(input: $input) {    ... on Profile {      identity {        ... on Identity {          balance {            userBalance {              value            }          }        }      }    }  }}",
    }),
  },
  mobile: {
    "title": "Venmo Balance",
    "generateProofDescription": "Generate a proof that you have a certain balance",
  }
}
