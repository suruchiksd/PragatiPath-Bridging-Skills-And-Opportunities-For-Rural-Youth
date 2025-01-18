document.addEventListener("DOMContentLoaded", async () => {
  const scholarshipContainer = document.getElementById("scholarshipContainer");

  // Fetch scholarships from output.json
  await fetchScholarships();
});

async function fetchScholarships() {
  try {
    const response = await fetch("output.json");
    const data = await response.json();
    displayScholarships(data.scholarships);
  } catch (error) {
    console.error("Error fetching scholarships:", error);
    scholarshipContainer.innerHTML =
      "<p>Failed to load scholarships. Please try again later.</p>";
  }
}

function displayScholarships(scholarships) {
  scholarshipContainer.innerHTML = scholarships
    .map(
      (scholarship) => `
            <div class="scholarship-item">
                <h2>${scholarship.name}</h2>
                <p>${scholarship.description}</p>
                <p class="amount">Amount: ${scholarship.amount}</p>
                <p class="deadline">Deadline: ${scholarship.deadline}</p>
                <div class="eligibility">
                    ${scholarship.eligibility
                      .map((item) => `<span>${item}</span>`)
                      .join("")}
                </div>
            </div>
        `
    )
    .join("");
}
