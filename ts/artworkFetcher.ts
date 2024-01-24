// deno-lint-ignore-file
export async function fetchArtworks(apiKey: string, artworkId?: string): Promise<any[]> {
  try {
    const query = `
      PREFIX dc: <http://purl.org/dc/elements/1.1/>
      PREFIX edm: <http://www.europeana.eu/schemas/edm/>
      PREFIX ore: <http://www.openarchives.org/ore/terms/>
      SELECT DISTINCT ?title ?creator ?imageURL ?date ?description
      WHERE {
        ?CHO edm:type "IMAGE" ;
          ore:proxyIn ?proxy;
          dc:title ?title ;
          dc:creator ?creator;
          dc:date ?date .
        ?proxy edm:isShownBy ?imageURL.
        OPTIONAL {
          ?CHO dc:description ?description .
        }
      }
      ORDER BY RAND()
      LIMIT 20
    `;

    const response = await fetch("https://sparql.europeana.eu", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "wskey": `${apiKey}`,
        "Accept": "application/json",
      },
      body: new URLSearchParams({
        query: query,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch artworks from Europeana");
    }

    const data = await response.json();
    const artworks = data.results.bindings.map((binding: any) => ({
      title: binding.title.value,
      creator: binding.creator.value,
      image: binding.imageURL.value,
      date: binding.date.value,
      description: binding.description ? binding.description.value : null,
      id: binding.title.value.toLowerCase().replace(/\s+/g, "-"),
    }));

    return artworks;
  } catch (error) {
    console.error("Error fetching artworks:", error);
    throw error;
  }
}