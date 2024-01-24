(async () => {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const artworkId = urlParams.get('id');

    if (artworkId) {
      const response = await fetch(`http://localhost:8000/details.html?id=${encodeURIComponent(artworkId)}`);
      const html = await response.text();
      document.getElementById("artworksPage").innerHTML = html;
    } else {
      console.error("Geen kunstwerk-ID gevonden in de URL.");
    }
  } catch (error) {
    console.error("Fout bij het laden van kunstwerkdetails:", error);
  }
})();