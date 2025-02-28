<h1 align="center">
  Attest Integrations
</h1>

<div align="center">
  <a href="https://github.com/pluto/attest-integrations/graphs/contributors">
    <img src="https://img.shields.io/github/contributors/pluto/spark?style=flat-square&logo=github&logoColor=8b949e&labelColor=282f3b&color=32c955" alt="Contributors" />
  </a>
</div>

## Overview

`attest-integrations` is a project that provides integrations for to create web proofs with Pluto.

## Repository Structure

- `integrations/`: Folder containing integrations
  - `[integration-name]`: Each integration should have a unique folder name. The files within this folder must be named appropriately
    - `[version]`: Version of the manifest
      - `manifest.json`: This file contains the main congiguration.
      - `prepare.js`: Javascript file containing a data extraction script
    - `logo.png`: Preferrably black and white, transparent, square, smaller sized image representing the integration. Used in app and in the Pluto Chrome Extension
    - `card.png`: Color, square image representing the integration. Used in app and in the Pluto Chrome Extension on provider selection screen. Optional

## Getting Started

### Prerequisites

Building integrations is an involved process. There are no tools in this reposity to do so, however we have plenty of documentation to assist in the process. Head over to [Reverse Engineering APIs](https://docs.pluto.dev/guides/reverse-engineering-apis) to get started.

## License

Licensed under the [MIT License](https://github.com/pluto/attest-integrations/blob/main/LICENSE)

## Contributing

We welcome contributions to our open-source projects. If you want to contribute or follow along with contributor discussions, join our [main Telegram channel](https://t.me/pluto_xyz/1) to chat about Pluto's development.

Our contributor guidelines can be found in [CONTRIBUTING.md](./CONTRIBUTING.md). A good starting point is issues labelled 'bounty' in our repositories.

Unless you explicitly state otherwise, any contribution intentionally submitted for inclusion in the work by you, as defined in the MIT license, shall be licensed as above, without any additional terms or conditions.
