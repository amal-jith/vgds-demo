document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll(".pricing-toggle button");
  const sections = {
    "24hr": "24hrPricing",
    "48hr": "48hrPricing",
    "72hr": "72hrPricing"
  };

  buttons.forEach(button => {
    button.addEventListener("click", function () {
      // Remove 'active' from all buttons
      buttons.forEach(btn => btn.classList.remove("active"));

      // Hide all pricing sections
      Object.values(sections).forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = "none";
      });

      // Activate clicked button
      this.classList.add("active");

      // Show associated section
      const targetId = sections[this.id];
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        targetSection.style.display = "block";
      }
    });
  });
});



document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll(".designers-toggle button");
  const sections = {
    "monthlyPlan": "monthlyPlanSection",
    "yearlyPlan": "yearlyPlanSection",
  };

  buttons.forEach(button => {
    button.addEventListener("click", function () {
      // Remove 'active' from all buttons
      buttons.forEach(btn => btn.classList.remove("active"));

      // Hide all pricing sections
      Object.values(sections).forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = "none";
      });

      // Activate clicked button
      this.classList.add("active");

      // Show associated section
      const targetId = sections[this.id];
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        targetSection.style.display = "block";
      }
    });
  });
});
