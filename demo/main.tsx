/** @jsxImportSource jsr:@hono/hono@4.5.0/jsx */

import { Hono } from "jsr:@hono/hono@4.5.0";
import { logger } from "jsr:@hono/hono@4.5.0/logger";
import { serveStatic } from "jsr:@hono/hono@4.5.0/deno";
import { cache } from "jsr:@hono/hono@4.5.0/cache";
import * as path from "jsr:@std/path@1.0.0";

import { masterCssMiddleware } from "jsr:@totto/hono-mastercss@0.2.0";

const app = new Hono();

app.use(logger());

app.use("*", masterCssMiddleware());

app.get("/content", (c) =>
  c.html(
    <html>
      <head>
        <meta charset="utf-8" />
        <title>Hello World!!!</title>
        <link
          rel="preload"
          as="script"
          href="https://unpkg.com/htmx.org@2.0.0"
        />
        <script src="https://unpkg.com/htmx.org@2.0.0"></script>
        <link
          rel="preload"
          as="style"
          href="https://esm.sh/@master/normal.css@rc?css"
        />
        <link
          rel="stylesheet"
          href="https://esm.sh/@master/normal.css@rc?css"
        />
        <link
          rel="modulepreload"
          href="https://esm.sh/@master/css-runtime@rc"
        />
        <link rel="modulepreload" href="./static/js/init-mastercss.js" />
        <script type="module" src="./static/js/init-mastercss.js"></script>
      </head>
      <body>
        <div class="flex flex-direction:column align-items:center">
          <div>Hello World!!!</div>
          <button hx-get="/api/content">
            Put To Messages
          </button>
        </div>
      </body>
    </html>,
  ));

app.get(
  "/api/content",
  (c) => c.html(<div class="fg:red">Dynamic Style!!!</div>),
);

app.use(
  "/static/*",
  cache({
    cacheName: "static",
    cacheControl: "max-age=86400",
    wait: true,
  }),
);

app.use("/static/*", serveStatic({ root: path.relative(".", import.meta.dirname ?? ".") }));

Deno.serve(app.fetch);
