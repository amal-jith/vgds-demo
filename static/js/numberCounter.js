document.addEventListener("DOMContentLoaded", function () {
    const counters = document.querySelectorAll(".count");

    counters.forEach(counter => {
      const target = +counter.getAttribute("data-target");
      const format = counter.getAttribute("data-format");
      const isDecimal = target % 1 !== 0;
      const speed = 200;
      const increment = target / speed;
      let count = 0;

      const updateCount = () => {
        if (count < target) {
          count += increment;
          counter.innerText = isDecimal ? count.toFixed(1) : Math.ceil(count);
          setTimeout(updateCount, 15);
        } else {
          counter.innerText = format || target; // Use final format if available
        }
      };

      updateCount();
    });
});




 document.addEventListener("DOMContentLoaded", function () {
    const showMoreBtn = document.getElementById("show-more-testimonials");
    const hiddenTestimonials = document.querySelectorAll(".testimonial-item.d-none");

    if (hiddenTestimonials.length === 0) {
      showMoreBtn.style.display = "none"; // Hide button if no extra testimonials
    }

    showMoreBtn.addEventListener("click", function () {
      hiddenTestimonials.forEach(el => el.classList.remove("d-none"));
      showMoreBtn.style.display = "none"; // Hide button after showing
    });
  });