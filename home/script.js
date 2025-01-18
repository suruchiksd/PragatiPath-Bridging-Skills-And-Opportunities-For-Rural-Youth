document.addEventListener("DOMContentLoaded", async () => {
  const tickerContent = document.getElementById("ticker-content");

  // Fetch keywords from JSON file
  const keywords = await fetchKeywords();

  // Fetch and display news
  await fetchNews(keywords);
});

async function fetchKeywords() {
  try {
    const response = await fetch("input.json");
    const data = await response.json();
    return data.keywords;
  } catch (error) {
    console.error("Error fetching keywords:", error);
    return [];
  }
}

async function fetchNews(keywords) {
  const apiKey = "d70dff433b4f41b5bb07912e167efc30";
  const query = keywords.join(" OR ");
  const url = `https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}&language=en&pageSize=10`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    displayNews(data.articles);
  } catch (error) {
    console.error("Error fetching news:", error);
    tickerContent.innerHTML = "Failed to load news. Please try again later.";
  }
}

function displayNews(articles) {
  const tickerContent = document.getElementById("ticker-content");
  tickerContent.innerHTML = articles
    .map(
      (article) => `
      <div class="ticker-item">
        ${article.title} |
      </div>
    `
    )
    .join("");

  // Clone the ticker content to create a seamless loop
  tickerContent.innerHTML += tickerContent.innerHTML;
}
