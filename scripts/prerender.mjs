import { readFile, writeFile, rm } from "node:fs/promises";
import { render, pageMeta } from "../.prerender/entry-server.js";
const template = await readFile("dist/index.html", "utf8");
const escape = (value) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;");
for (const [path, meta] of Object.entries(pageMeta)) {
  const canonical = "https://www.hyzl.ai" + (path === "/" ? "" : path);
  const html = template
    .replace(
      '<div id="root"></div>',
      '<div id="root" data-route="' + path + '">' + render(path) + "</div>",
    )
    .replace(/<title>.*?<\/title>/, "<title>" + escape(meta.title) + "</title>")
    .replace(
      /(<meta\s+(?:name|property)="(?:description|og:description|twitter:description)"\s+content=")[^"]*(")/g,
      "$1" + escape(meta.description) + "$2",
    )
    .replace(
      /(<meta\s+(?:name|property)="(?:og:title|twitter:title)"\s+content=")[^"]*(")/g,
      "$1" + escape(meta.title) + "$2",
    )
    .replace(/(<link rel="canonical" href=")[^"]*(")/, "$1" + canonical + "$2")
    .replace(
      /(<meta property="og:url" content=")[^"]*(")/,
      "$1" + canonical + "$2",
    );
  await writeFile(
    path === "/" ? "dist/index.html" : "dist" + path + ".html",
    html,
  );
}
const missing = template
  .replace(
    '<div id="root"></div>',
    '<div id="root">' + render("/404") + "</div>",
  )
  .replace(/<title>.*?<\/title>/, "<title>Page not found | hyzl</title>")
  .replace("</head>", '<meta name="robots" content="noindex" /></head>');
await writeFile("dist/404.html", missing);
await writeFile(
  "dist/sitemap.xml",
  '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' +
    Object.keys(pageMeta)
      .map(
        (p) =>
          "<url><loc>https://www.hyzl.ai" +
          (p === "/" ? "" : p) +
          "</loc></url>",
      )
      .join("") +
    "</urlset>",
);
await rm(".prerender", { recursive: true, force: true });
console.log(
  "Prerendered " +
    Object.keys(pageMeta).length +
    " public pages and a 404 page.",
);
