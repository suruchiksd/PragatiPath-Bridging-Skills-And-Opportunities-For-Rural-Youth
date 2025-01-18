document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(loginForm);
    const userData = Object.fromEntries(formData.entries());

    // Here you would typically send this data to your backend
    console.log("User Data:", userData);

    // For now, we'll just show an alert and redirect
    alert("Login successful! Welcome, " + userData.name);

    // Redirect to the qualification page
    window.location.href = "../qualification/index.html";
  });
});
