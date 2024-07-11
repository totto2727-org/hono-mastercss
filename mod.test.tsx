import { expect } from "jsr:@totto/lib/test";
import { Hono } from "jsr:@hono/hono";
import { html } from "jsr:@hono/hono/html";
import { masterCssMiddleware } from "./mod.ts";

Deno.test("Endpoints that return the entire HTML", async (t) => {
  const app = new Hono();

  app.use("*", masterCssMiddleware());

  app.get("/", (c) =>
    c.html(html`
<html>
<head>
  <title>Test Site</title>
</head>
<body>
<h1 class='m:50'>Hello, World!</h1>
</body>
</html>
`));

  const res = await app.fetch(
    new Request(new URL("/", "http://localhost:8000")),
  );

  await t.step("fetch is successful", () => {
    expect(res.status).toBe(200);
  });

  await t.step("content-type is text/html", () => {
    expect(res.headers.get("content-type")).toContain("text/html");
  });

  const htmlText = await res.text();

  await t.step("html has pre-rendered master css style", () => {
    expect(htmlText).toContain("m\\:50{margin:3.125rem}");
  });
});

Deno.test("Endpoints that return partial HTML", async (t) => {
  const app = new Hono();

  app.use("*", masterCssMiddleware());

  app.get("/", (c) => c.html(html`<h1 class='m:50'>Hello, World!</h1>`));

  const res = await app.fetch(
    new Request(new URL("/", "http://localhost:8000")),
  );

  await t.step("fetch is successful", () => {
    expect(res.status).toBe(200);
  });

  await t.step("content-type is text/html", () => {
    expect(res.headers.get("content-type")).toContain("text/html");
  });

  const htmlText = await res.text();

  await t.step("html has pre-rendered master css style", () => {
    expect(htmlText).toContain("m\\:50{margin:3.125rem}");
  });
});
