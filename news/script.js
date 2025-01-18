document.addEventListener("DOMContentLoaded", async () => {
  const newsContainer = document.getElementById("newsContainer");
  const jobList = document.getElementById("jobList");
  const courseList = document.getElementById("courseList");

  // Fetch keywords from JSON file
  const keywords = await fetchKeywords();

  // Fetch news
  await fetchNews(keywords);

  // Generate job recommendations
  generateJobRecommendations(keywords);

  // Generate course recommendations
  generateCourseRecommendations(keywords);
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
    newsContainer.innerHTML =
      "<p>Failed to load news. Please try again later.</p>";
  }
}

function displayNews(articles) {
  newsContainer.innerHTML = articles
    .map(
      (article) => `
      <div class="news-item">
        <h3>${article.title}</h3>
        <p>${article.description}</p>
        <a href="${article.url}" target="_blank" rel="noopener noreferrer">Read more</a>
      </div>
    `
    )
    .join("");
}

function generateJobRecommendations(keywords) {
  // This is a simplified example. In a real app, this would be based on a more complex algorithm or API call.
  const jobs = [
    {
      title: "Python Developer",
      company: "Tech Co",
      description: "Develop applications using Python and related frameworks.",
    },
    {
      title: "Data Scientist",
      company: "Data Insights",
      description:
        "Apply machine learning techniques to derive meaningful insights from data.",
    },
    {
      title: "Full Stack Developer",
      company: "Web Solutions",
      description:
        "Build modern web applications using cutting-edge technologies.",
    },
  ];

  jobList.innerHTML = jobs
    .map(
      (job) => `
      <li class="job-item">
        <h3>${job.title} at ${job.company}</h3>
        <p>${job.description}</p>
      </li>
    `
    )
    .join("");
}

function generateCourseRecommendations(keywords) {
  // This is a simplified example. In a real app, this would be based on a more complex algorithm or API call.
  const courses = [
    {
      title: "Advanced Python Programming",
      platform: "Coursera",
      description:
        "Master Python programming for various applications including data science and web development.",
    },
    {
      title: "Machine Learning Fundamentals",
      platform: "edX",
      description:
        "Learn the basics of machine learning and artificial intelligence.",
    },
    {
      title: "Full Stack Web Development",
      platform: "Udemy",
      description:
        "Comprehensive course covering both front-end and back-end web development.",
    },
  ];

  courseList.innerHTML = courses
    .map(
      (course) => `
      <li class="course-item">
        <h3>${course.title} on ${course.platform}</h3>
        <p>${course.description}</p>
      </li>
    `
    )
    .join("");
}
