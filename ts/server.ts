// deno-lint-ignore-file ban-unused-ignore no-explicit-any
import { Application, Router, send } from "../js/deps.js";
import { generateHTML, generateDetailsPage } from "./htmlGenerator.ts";
import { fetchArtworks } from "./artworkFetcher.ts";
import { config } from "./config.ts"
import { renderHTML } from "./renderer.ts";

const app = new Application();
const router = new Router();

app.use(async (ctx, next) => {
  ctx.response.headers.set("Access-Control-Allow-Origin", "*");
  ctx.response.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  ctx.response.headers.set(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  if (ctx.request.method === "OPTIONS") {
    ctx.response.status = 200;
  } else {
    await next();
  }
});

app.use(async (ctx, next) => {
  if (ctx.request.url.pathname.endsWith(".html")) {
    console.log("Received request for artworks.html");
    ctx.response.headers.set("Content-Type", "text/html; charset=utf-8");

    const artworks = await fetchArtworks(config.apiKey);
    console.log("Artworks from server:", artworks);

    const html = await renderHTML(generateHTML([]), artworks);
    ctx.response.body = html;
  } else {
    await send(ctx, ctx.request.url.pathname, {
      root: `${Deno.cwd()}`,
      index: "index.html",
    });
  }
  await next();
});

router.get("/details.html/id", async (ctx, next) => {
  console.log("Received request for artwork details page");
  const { id } = ctx.params;

  ctx.response.headers.set("Content-Type", "text/html; charset=utf-8");

  try {
    const artworks = await fetchArtworks(config.apiKey, id);
    const html = await renderHTML(generateDetailsPage(), artworks);
    ctx.response.body = html;
  } catch (error) {
    console.error("Error fetching or rendering artworks:", error);
  }

  await next();
});

app.use(async (ctx, next) => {
  if (ctx.request.url.pathname === "/favicon.ico") {
    ctx.response.status = 204;
  } else {
    await next();
  }
});

app.use(router.routes());
app.use(router.allowedMethods());

console.log("Server is gestart op http://localhost:8000");
await app.listen({ port: 8000 });