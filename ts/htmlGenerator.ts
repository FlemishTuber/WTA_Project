// deno-lint-ignore-file
export function generateHTML(artworks: any[]): string {
  return `
      <html>
        <head>
          <title>Artworks</title>
        </head>
        <body>
          <h1>Kunstwerken</h1>
          <ul>
            {artworksPlaceholder}
          </ul>
        </body>
      </html>
    `;
}

export function generateDetailsPage(): string {
  return `
    <html>
      <head>
        <title>Artwork Details</title>
      </head>
      <body>
          {artworkDetailsPlaceholder}
      </body>
    </html>
  `;
}