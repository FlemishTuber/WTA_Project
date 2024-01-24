(async () => {
  try {
    const response = await fetch("http://localhost:8000/artworks.html");
    const html = await response.text();
    document.getElementById("artworks").innerHTML = html;
  } catch (error) {
    console.error("Error loading artworks:", error);
  }
})();