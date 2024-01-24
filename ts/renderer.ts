// deno-lint-ignore-file
export async function renderHTML(
  template: string,
  artworks: any[]
): Promise<string> {
  const artworksHtml = artworks
    .map(
      (artwork) => `
          <li>
            <a href="../details.html/id=${encodeURIComponent(artwork.id)}">
              <strong>${artwork.title}</strong> door ${artwork.creator}
            </a>
            <br />
            <img src="${artwork.image}" alt="${artwork.title}" />
          </li>
        `
    )
    .join("");

  return template.replace("{artworksPlaceholder}", artworksHtml);
}

export async function renderHTMLDetails(
  template: string,
  artworks: any[]
): Promise<string> {
  const artworkDetailsHtml = artworks
    .map(
      (artwork) => `
        <img src="${artwork.image}" alt="${artwork.title}" />
        <h3>${artwork.title}</h3>
        <p>Artiest: ${artwork.creator}</p>
        <p>Jaartal: ${artwork.year}</p>
        <p>Beschrijving: ${artwork.description}</p>
      `
    )
    .join("");

  return template.replace("{artworkDetailsPlaceholder}", artworkDetailsHtml);
}