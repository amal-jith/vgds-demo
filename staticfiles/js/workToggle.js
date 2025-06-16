document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll(".work-toggle button");
  const sections = document.querySelectorAll(".work-section");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove active class from all buttons
      buttons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      const buttonId = button.id;

      // Hide all sections first
      sections.forEach((section) => {
        section.style.display = "none";
      });

      // Show the relevant section
      if (buttonId === "all") {
        document.getElementById("allWorks").style.display = "block";
      } else {
        const targetId = buttonId + "Works";
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
          targetSection.style.display = "block";
        }
      }
    });
  });

  // Show only the 'All' section initially
  sections.forEach((section) => {
    section.style.display = "none";
  });
  document.getElementById("allWorks").style.display = "block";
});
