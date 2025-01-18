const jobCategories = [
  "Front End Developer",
  "React Developer",
  "MERN Developer",
  "Fullstack Developer",
  "JavaScript Developer",
  "Angular Developer",
  "Vue Developer",
  "React Native Developer",
  "UI/UX Developer",
];

const states = [
  "AL",
  "AK",
  "AZ",
  "AR",
  "CA",
  "CO",
  "CT",
  "DE",
  "FL",
  "GA",
  "HI",
  "ID",
  "IL",
  "IN",
  "IA",
  "KS",
  "KY",
  "LA",
  "ME",
  "MD",
  "MA",
  "MI",
  "MN",
  "MS",
  "MO",
  "MT",
  "NE",
  "NV",
  "NH",
  "NJ",
  "NM",
  "NY",
  "NC",
  "ND",
  "OH",
  "OK",
  "OR",
  "PA",
  "RI",
  "SC",
  "SD",
  "TN",
  "TX",
  "UT",
  "VT",
  "VA",
  "WA",
  "WV",
  "WI",
  "WY",
];

function JobListings() {
  const [selectedCategory, setSelectedCategory] = React.useState("");
  const [selectedState, setSelectedState] = React.useState("");

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleStateChange = (event) => {
    setSelectedState(event.target.value);
  };

  const getJobLink = () => {
    if (selectedCategory && selectedState) {
      const categoryQuery = selectedCategory.toLowerCase().replace(/ /g, "+");
      return `https://www.indeed.com/jobs?q=${categoryQuery}&l=${selectedState}&sc=0kf%3Aattr%28DSQF7%29%3B&vjk=d5cb90ffe055303f`;
    }
    return "#";
  };

  return (
    <div className="container">
      <nav className="navbar">
        <div className="navbar-container">
          <a href="/home/index.html" className="navbar-logo">
            Student Skill-Up
          </a>
          <ul className="navbar-menu">
            <li>
              <a href="/home/index.html">Home</a>
            </li>
            <li>
              <a href="/news/index.html">News</a>
            </li>
            <li>
              <a href="/courses/index.html">Courses</a>
            </li>
            <li>
              <a href="/job/index.html">Jobs</a>
            </li>
            <li>
              <a href="/qualification/index.html">Update Qualification</a>
            </li>
            <li>
              <a href="/login/index.html">Logout</a>
            </li>
          </ul>
        </div>
      </nav>

      <main className="job-section">
        <h1 className="title">Find Your Dream Job</h1>
        <div className="job-search">
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="job-select"
          >
            <option value="">Select a job category</option>
            {jobCategories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
          <select
            value={selectedState}
            onChange={handleStateChange}
            className="state-select"
          >
            <option value="">Select a state</option>
            {states.map((state, index) => (
              <option key={index} value={state}>
                {state}
              </option>
            ))}
          </select>
          <a
            href={getJobLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="search-button"
          >
            Search Jobs
          </a>
        </div>
        <div className="job-description">
          <h2>Why choose a career in tech?</h2>
          <p>
            The tech industry offers exciting opportunities for growth,
            innovation, and competitive salaries. Whether you're interested in
            front-end development, full-stack engineering, or specialized
            frameworks like React or Angular, there's a place for you in this
            dynamic field.
          </p>
          <p>
            Select a job category and state above to explore current openings on
            Indeed.com. Start your journey towards a rewarding tech career
            today!
          </p>
        </div>
      </main>
    </div>
  );
}

ReactDOM.render(<JobListings />, document.getElementById("root"));
