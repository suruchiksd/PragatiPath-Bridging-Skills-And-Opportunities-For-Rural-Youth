document.addEventListener("DOMContentLoaded", () => {
  const coursesContainer = document.getElementById("coursesContainer");
  const recommendedCoursesContainer = document.getElementById(
    "recommendedCoursesContainer"
  );

  // Fetch existing courses
  fetch("courses.json")
    .then((response) => response.json())
    .then((data) => {
      displayCourses(data, coursesContainer);
    })
    .catch((error) => {
      console.error("Error fetching courses:", error);
      coursesContainer.innerHTML =
        "<p>Failed to load courses. Please try again later.</p>";
    });

  // Fetch recommended courses
  fetch("output.json")
    .then((response) => response.json())
    .then((data) => {
      displayRecommendedCourses(data.YouTube, recommendedCoursesContainer);
    })
    .catch((error) => {
      console.error("Error fetching recommended courses:", error);
      recommendedCoursesContainer.innerHTML =
        "<p>Failed to load recommended courses. Please try again later.</p>";
    });
});

function displayCourses(courses, container) {
  container.innerHTML = courses
    .map(
      (course) => `
      <div class="course-item">
        <h2>${course.heading}</h2>
        <p><strong>Cost:</strong> ${course.cost}</p>
        <p><strong>Duration:</strong> ${course.duration}</p>
        <p><strong>For:</strong> ${course.for}</p>
        <a href="${course.link}" target="_blank" rel="noopener noreferrer">Learn More</a>
      </div>
    `
    )
    .join("");
}

function displayRecommendedCourses(courses, container) {
  container.innerHTML = courses
    .map(
      (course) => `
      <div class="course-item recommended-course">
        <img src="${course.image}" alt="${course.title}" class="course-thumbnail">
        <h2>${course.title}</h2>
        <a href="${course.link}" target="_blank" rel="noopener noreferrer">Watch on YouTube</a>
      </div>
    `
    )
    .join("");
}
