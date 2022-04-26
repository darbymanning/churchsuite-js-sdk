![header](https://github.com/darbymanning/churchsuite-js-sdk/raw/main/.github/header.png)

<div align="center">

# ChurchSuite JavaScript SDK

⚠️ WIP, breaking changes likely ⚠️

</div>

## Overview

This is an unofficial [ChurchSuite](https://churchsuite.com) JavaScript SDK, built to make life a little easier when working with the [ChurchSuite API](https://github.com/ChurchSuite/churchsuite-api).

## Features

- [x] 👌 Simple and intuitive API
- [x] 🔑 Fully Typed
- [x] 👷 ES and UMD builds
- [ ] 🪞 Mirrors the ChurchSuite API (WIP)
- [ ] 🤷‍♂️ More cool stuff

## Usage

```bash
npm i churchsuite-js-sdk
```

```ts
import createClient from "churchsuite-js-sdk";

const options = {
  "X-Account": "demo",
  "X-Application": "Example",
  "X-Auth": "1234567890abc",
};

const client = createClient(options);

const user = await client.account.user();
```
