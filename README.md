This repository serves as a container for web proof integrations through the Pluto platform. Each integration should go in the `integrations` folder, with a uniquely named folder that matches the id of the config.

For example, if you want a config for Github user badges, you may create a folder in `integrations` called `github-user-badges`, and within the `config.js` you create in the folder, you'd have a key `"id": "github-user-badges"`.

Within the created folder there are three required files.

1. `config.js`. This file contains information about proof generation, user authorization, and mobile configuration.
2. `lockfile.json`. This file is used in circuits and on chain to verify the integrity of the generated proof.
3. `logo.png`. This should contain a logo for the integration with either a transparent background, or will be visible on a black background.
