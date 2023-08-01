// this script for the when the user click on follow button then 'follow ' 
// text replace by 'following ' name 
document.addEventListener("DOMContentLoaded", function () {
  // Get all elements with the "followBtn" class
  const followButtons = document.querySelectorAll(".followBtn");

  // Function to update the button text and state
  function updateButtonState(button) {
    const userId = button.id.replace("followBtn_", ""); // Extract user ID from button ID

    if (localStorage.getItem(userId) === "following") {
      button.innerText = "Following";
    } else {
      button.innerText = "Follow";
    }
  }

  // Add a click event listener to each button
  followButtons.forEach(function (button) {
    // Set initial state
    updateButtonState(button);

    button.addEventListener("click", function () {
      // Extract user ID from button ID
      const userId = button.id.replace("followBtn_", "");

      // Toggle button state in localStorage
      if (localStorage.getItem(userId) === "following") {
        localStorage.removeItem(userId);
      } else {
        localStorage.setItem(userId, "following");
      }

      // Update the button text and state
      updateButtonState(button);
    });
  });
});
