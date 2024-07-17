import { createMiddleware } from "@hono/hono/factory";
import type { MiddlewareHandler } from "@hono/hono/types";
import type { Config } from "@master/css";
import { render } from "@master/css-server";

/**
 * Master CSS Middleware function.
 *
 * This middleware pre-renders Master CSS for HTML responses.
 *
 * @param {Config} [config] - Optional configuration for Master CSS.
 * @returns {MiddlewareHandler} Middleware handler function.
 */
export const masterCssMiddleware = (config?: Config): MiddlewareHandler =>
  createMiddleware(async (c, next) => {
    await next();

    if (!c.res.headers.get("content-type")?.includes("text/html")) return;

    const html = await c.res.text();
    c.res = c.html(render(html, config).html);
  });
