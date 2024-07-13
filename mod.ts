import { createMiddleware } from "@hono/hono/factory";
import type { Config } from "@master/css";
import { render } from "@master/css-server";
import type { Env, Input, MiddlewareHandler } from "@hono/hono/types";

/**
 * Type definition for the Master CSS Middleware function.
 */
export type MasterCssMiddleware<
  // deno-lint-ignore no-explicit-any
  E extends Env = any,
  P extends string = string,
  // deno-lint-ignore ban-types
  I extends Input = {},
> = (config?: Config) => MiddlewareHandler<E, P, I>;

/**
 * Master CSS Middleware function.
 *
 * This middleware pre-renders Master CSS for HTML responses.
 *
 * @param {Config} [config] - Optional configuration for Master CSS.
 * @returns {MiddlewareHandler} Middleware handler function.
 */
export const masterCssMiddleware: MasterCssMiddleware = (config) =>
  createMiddleware(async (c, next) => {
    await next();

    if (c.res.status !== 200) return;
    if (!c.res.headers.get("content-type")?.includes("text/html")) return;

    const html = await c.res.text();
    c.res = c.html(render(html, config).html);
  });
