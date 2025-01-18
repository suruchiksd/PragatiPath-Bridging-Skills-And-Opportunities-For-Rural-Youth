document.addEventListener("DOMContentLoaded", () => {
  const jobList = document.getElementById("jobList");

  async function fetchJobLinks() {
    try {
      const response = await fetch("apply_links.json");
      return await response.json();
    } catch (error) {
      console.error("Error fetching job links:", error);
      return [];
    }
  }

  function getRandomJobs(jobs, count) {
    const shuffled = jobs.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  async function displayJobs() {
    jobList.innerHTML = '<div class="loading">Loading jobs...</div>';

    try {
      const jobLinks = await fetchJobLinks();
      const randomJobs = getRandomJobs(jobLinks, 10); // Display 10 random jobs

      if (randomJobs.length === 0) {
        jobList.innerHTML =
          "<p>No jobs available at the moment. Please try again later.</p>";
        return;
      }

      jobList.innerHTML = randomJobs
        .map((link, index) => {
          const url = new URL(link);
          const params = new URLSearchParams(url.search);
          const jobTitle = params.get("q").replace(/\+/g, " ");
          const location = params.get("l");

          return `
            <div class="job-item">
              <h2>${jobTitle}</h2>
              <p class="job-location">Location: ${location}</p>
              <a href="${link}" target="_blank" rel="noopener noreferrer" class="job-link">View Job</a>
            </div>
          `;
        })
        .join("");
    } catch (error) {
      console.error("Error displaying jobs:", error);
      jobList.innerHTML =
        "<p>Failed to load job recommendations. Please try again later.</p>";
    }
  }

  displayJobs();
});
