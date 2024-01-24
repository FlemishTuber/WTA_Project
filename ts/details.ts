import { fetchArtworks } from "./artworkFetcher.ts";
import { renderHTMLDetails } from "./renderer.ts";
import { config } from "./config.ts";
import { generateDetailsPage } from "./htmlGenerator.ts";

(async () => {
  try {
    const artworks = await fetchArtworks(config.apiKey);
    const randomArtwork = artworks[Math.floor(Math.random() * artworks.length)];

    const artworkDetails = await fetchArtworks(config.apiKey, randomArtwork.id);

    const html = await renderHTMLDetails(generateDetailsPage(), artworkDetails);
    console.log(html);
  } catch (error) {
    console.error("Error fetching or rendering artwork details:", error);
  }
})();