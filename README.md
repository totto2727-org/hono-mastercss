# hono-mastercss

## Overview

Middleware for pre-rendering Master CSS in Hono.

- 0 client-side JavaScript required for initial rendering.
  - No need to wait for @master/css-runtime to be generated for the first time.
  - Of course, when used in conjunction with @master/css-runtime, it can also be
    used for Web Application using HTMX, etc!

## Installation

```bash
npx jsr add @totto/hono-mastercss
yarn dlx jsr add @totto/hono-mastercss
pnpx jsr add @totto/hono-mastercss
bux jsr add @totto/hono-mastercss
```

## Usage

[demo](./demo/main.tsx)

### Without Config

```ts
import { Hono } from "@hono/hono";
import { mastercssMiddleware } from "@totto/hono-mastercss";

const app = new Hono();

app.use(masterCssMiddleware());

app.get("/", (c) => {
  return c.html(
    "<html><body><div class='m:50'>Hello World!!!</div></body></html>",
  );
});

// ...
```

### With Config

```ts
import { Hono } from "@hono/hono";
import { masterCssMiddleware } from "@totto/hono-mastercss";

import config from "./mastercss.css.ts";

const app = new Hono();

app.use(masterCssMiddleware(config));

app.get("/", (c) => {
  return c.html(
    "<html><body><div class='m:50'>Hello World!!!</div></body></html>",
  );
});

// ...
```

## For Developers

We use Deno.

The version is [.mise.toml](./.mise.toml).

### Check

```bash
deno task precommit
```
