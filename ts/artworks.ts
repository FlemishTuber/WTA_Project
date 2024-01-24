import { fetchArtworks } from "./artworkFetcher.ts";
import { generateHTML } from "./htmlGenerator.ts";
import { renderHTML } from "./renderer.ts";
import { config } from "./config.ts";

(async () => {
  try {
    const artworks = await fetchArtworks(config.apiKey);
    console.log(artworks);
    const html = await renderHTML(generateHTML([]), artworks);
    console.log(html);
  } catch (error) {
    console.error("Error fetching or rendering artworks:", error);
  }
})();