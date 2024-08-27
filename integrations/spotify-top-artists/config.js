{
  id: "spotify-top-artists",
  authOptions: {
    loginUrl:
      "https://accounts.spotify.com/en/login?continue=https%3A%2F%2Fopen.spotify.com%2F__noul__%3Fl2l%3D1%26nd%3D1",
    getAccessToken: (config, document, cookies) => {
      const ele = document.querySelector("script#session");
      if (!ele || !ele.innerText) return "";

      try {
        const asJSON = JSON.parse(ele.innerText);

        if (!asJSON || !asJSON.accessToken) return "";

        if (
          Date.now() > asJSON.accessTokenExpirationTimestampMs ||
          asJSON.isAnonymous
        )
          return "";

        return asJSON.accessToken;
      } catch (e) {
        return "";
      }
    },
  },
  proofOptions: {
    getApiUrl: () =>
      "https://api-partner.spotify.com/pathfinder/v1/query?operationName=userTopContent&variables=%7B%22includeTopArtists%22%3Atrue%2C%22topArtistsInput%22%3A%7B%22offset%22%3A0%2C%22limit%22%3A5%2C%22sortBy%22%3A%22AFFINITY%22%2C%22timeRange%22%3A%22SHORT_TERM%22%7D%2C%22includeTopTracks%22%3Afalse%2C%22topTracksInput%22%3A%7B%22offset%22%3A0%2C%22limit%22%3A4%2C%22sortBy%22%3A%22AFFINITY%22%2C%22timeRange%22%3A%22SHORT_TERM%22%7D%7D&extensions=%7B%22persistedQuery%22%3A%7B%22version%22%3A1%2C%22sha256Hash%22%3A%22feb6d55177e2cbce2ac59214f9493f1ef2e4368eec01b3d4c3468fa1b97336e2%22%7D%7D",
  },
  mobile: {
    title: "Spotify Top Artists",
    generateProofDescription:
      "Generate a proof that you have a certain top artist on Spotify",
  },
};
