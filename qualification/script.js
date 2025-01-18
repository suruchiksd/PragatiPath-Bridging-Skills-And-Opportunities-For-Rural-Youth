document.addEventListener("DOMContentLoaded", () => {
  const qualificationForm = document.getElementById("qualificationForm");
  const interestsSelect = document.getElementById("interests");
  const customInterestInput = document.getElementById("customInterest");
  const addCustomInterestButton = document.getElementById("addCustomInterest");

  function updateInterestsSelection() {
    const selectedOptions = Array.from(interestsSelect.selectedOptions);
    if (selectedOptions.length > 5) {
      alert("You can select up to 5 interests.");
      for (let i = 5; i < selectedOptions.length; i++) {
        selectedOptions[i].selected = false;
      }
    }
  }

  interestsSelect.addEventListener("change", updateInterestsSelection);

  addCustomInterestButton.addEventListener("click", () => {
    const customInterest = customInterestInput.value.trim();
    if (customInterest && interestsSelect.options.length < 20) {
      const option = new Option(customInterest, customInterest);
      interestsSelect.add(option);
      option.selected = true;
      customInterestInput.value = "";
      updateInterestsSelection();
    } else if (interestsSelect.options.length >= 20) {
      alert("You can't add more than 20 interests.");
    }
  });

  qualificationForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(qualificationForm);
    const userData = Object.fromEntries(formData.entries());

    // Convert interests to an array
    userData.interests = Array.from(interestsSelect.selectedOptions).map(
      (option) => option.value
    );

    // Here you would typically send this data to your backend
    console.log("User Qualification Data:", userData);

    // Store user data in localStorage (in a real app, this would be handled securely on the server)
    localStorage.setItem("userData", JSON.stringify(userData));

    // Redirect to the homepage
    window.location.href = "../home/index.html";
  });
});
