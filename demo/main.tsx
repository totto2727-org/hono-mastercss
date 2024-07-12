/** @jsxImportSource @hono/hono/jsx */

import { Hono } from "jsr:@hono/hono@4.4.12";
import { logger } from "jsr:@hono/hono@4.4.12/logger";
import { masterCssMiddleware } from "jsr:@totto/hono-mastercss@0.1.0";

const app = new Hono();

app.use(logger());

// Applies only to APIs that return the entire page
// Master CSS is `<style id="master">... </style>`, so beware of duplication.
app.use("/content", masterCssMiddleware());

app.get("/content", (c) =>
  c.html(
    <html>
      <head>
        <meta charset="utf-8" />
        <title>Hello World!!!</title>
        <link href="https://cdn.master.co/normal.css" rel="stylesheet"></link>
        <script src="https://cdn.master.co/css-runtime@rc"></script>
        <script src="https://unpkg.com/htmx.org@2.0.0"></script>
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

Deno.serve(app.fetch);
