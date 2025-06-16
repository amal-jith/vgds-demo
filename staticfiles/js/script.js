//Navbar//

document.addEventListener('DOMContentLoaded', function () {
  const navbar = document.querySelector('.navbar');
  const logoWhite = document.querySelector('.logo-white');
  const logoColored = document.querySelector('.logo-colored');
  const dropdown = document.querySelector('.custom-dropdown');

  // Skip script if navbar-secondary is applied
  if (navbar.classList.contains('navbar-secondary')) return;

  function updateNavbar() {
    const scrolledPastThreshold = window.scrollY > 100;
    const isDesktop = window.innerWidth >= 992;

    if (isDesktop) {
      if (scrolledPastThreshold) {
        navbar.classList.remove('transparent');
        navbar.classList.add('white-bg');
        logoWhite.classList.add('d-none');
        logoColored.classList.remove('d-none');

        dropdown?.classList.add('scrolled-dropdown');
      } else {
        navbar.classList.add('transparent');
        navbar.classList.remove('white-bg');
        logoWhite.classList.remove('d-none');
        logoColored.classList.add('d-none');

        dropdown?.classList.remove('scrolled-dropdown');
      }
    } else {
      navbar.classList.remove('transparent');
      navbar.classList.add('white-bg');
      logoWhite.classList.add('d-none');
      logoColored.classList.remove('d-none');

      dropdown?.classList.add('scrolled-dropdown');
    }
  }

  window.addEventListener('scroll', updateNavbar);
  window.addEventListener('resize', updateNavbar);
  updateNavbar(); // Initial call
});



//document.addEventListener('DOMContentLoaded', function () {
//  const navbar = document.querySelector('.navbar');
//  const whiteSections = document.querySelectorAll('.white-section');
//  const navbarHeight = navbar.offsetHeight;
//
//  function isOverlapping(section) {
//    const rect = section.getBoundingClientRect();
//    return rect.top <= navbarHeight && rect.bottom >= 0;
//  }
//
//  function updateNavbar() {
//    let isWhiteBg = false;
//
//    whiteSections.forEach(section => {
//      if (isOverlapping(section)) {
//        isWhiteBg = true;
//      }
//    });
//
//    if (isWhiteBg) {
//      navbar.classList.remove('transparent');
//      navbar.classList.add('white-bg');
//    } else {
//      navbar.classList.add('transparent');
//      navbar.classList.remove('white-bg');
//    }
//  }
//
//  window.addEventListener('scroll', updateNavbar);
//  updateNavbar(); // Run on load
//});

//document.addEventListener('DOMContentLoaded', function () {
//  const navbar = document.querySelector('.navbar');
//  const whiteSections = document.querySelectorAll('.white-section');
//  const navbarHeight = navbar.offsetHeight;
//  const logoWhite = document.querySelector('.logo-white');
//  const logoColored = document.querySelector('.logo-colored');
//
//  function isOverlapping(section) {
//    const rect = section.getBoundingClientRect();
//    return rect.top <= navbarHeight && rect.bottom >= 0;
//  }
//
//  function updateNavbar() {
//    let isWhiteBg = false;
//
//    whiteSections.forEach(section => {
//      if (isOverlapping(section)) {
//        isWhiteBg = true;
//      }
//    });
//
//    if (isWhiteBg) {
//      navbar.classList.remove('transparent');
//      navbar.classList.add('white-bg');
//
//      // Switch to colored logo
//      logoWhite.classList.add('d-none');
//      logoColored.classList.remove('d-none');
//    } else {
//      navbar.classList.add('transparent');
//      navbar.classList.remove('white-bg');
//
//      // Switch to white logo
//      logoWhite.classList.remove('d-none');
//      logoColored.classList.add('d-none');
//    }
//  }
//
//  window.addEventListener('scroll', updateNavbar);
//  updateNavbar(); // on load
//});

//Cursor follower//

  const follower = document.querySelector('.cursor-follower');
  let mouseX = 0, mouseY = 0;
  let currentX = 0, currentY = 0;
  const speed = 0.15;

  function animateFollower() {
    currentX += (mouseX - currentX) * speed;
    currentY += (mouseY - currentY) * speed;
    follower.style.transform = `translate(${currentX - follower.offsetWidth / 2}px, ${currentY - follower.offsetHeight / 2}px)`;

    // Check if cursor is over a white section
    const elemAtPoint = document.elementFromPoint(mouseX, mouseY);
    if (elemAtPoint && elemAtPoint.closest('.white-section')) {
      follower.style.backgroundColor = '#0B6BFF'; // blue on white
    } else {
      follower.style.backgroundColor = '#ffffff'; // white on dark
    }

    requestAnimationFrame(animateFollower);
  }

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  animateFollower();

  // Enlarge on interactive elements
  const hoverTargets = document.querySelectorAll('button, a, .hover-target');
  hoverTargets.forEach((el) => {
    el.addEventListener('mouseenter', () => follower.classList.add('active'));
    el.addEventListener('mouseleave', () => follower.classList.remove('active'));
  });


//script for cursor without white//
//  const follower = document.querySelector('.cursor-follower');
//  let mouseX = 0;
//  let mouseY = 0;
//  let currentX = 0;
//  let currentY = 0;
//  const speed = 0.15;
//
//  // Animate the follower position
//  function animateFollower() {
//    currentX += (mouseX - currentX) * speed;
//    currentY += (mouseY - currentY) * speed;
//    follower.style.transform = `translate(${currentX - follower.offsetWidth / 2}px, ${currentY - follower.offsetHeight / 2}px)`;
//    requestAnimationFrame(animateFollower);
//  }
//
//  window.addEventListener('mousemove', (e) => {
//    mouseX = e.clientX;
//    mouseY = e.clientY;
//  });
//
//  animateFollower();
//
//  // Add active class on hover
//  const hoverTargets = document.querySelectorAll('button, a, .hover-target'); // Add more selectors if needed
//  hoverTargets.forEach((el) => {
//    el.addEventListener('mouseenter', () => {
//      follower.classList.add('active');
//    });
//    el.addEventListener('mouseleave', () => {
//      follower.classList.remove('active');
//    });
//  });



const swiper1 = new Swiper('.mySwiper', {
  direction: 'vertical',
  loop: true,
  slidesPerView: 4,
  spaceBetween: 24,
  speed: 3000,
  autoplay: {
    delay: 0,
    disableOnInteraction: false,
  },
});

const swiper2 = new Swiper('.mySwiper2', {
  direction: 'vertical',
  loop: true,
  slidesPerView: 4,
  spaceBetween: 24,
  speed: 3000,
  autoplay: {
    delay: 0,
    disableOnInteraction: false,
    reverseDirection: true,
  }
});

const mobileSwiper = new Swiper(".mobileSwiper", {
  direction: "horizontal",
  loop: true,
  slidesPerView: 1.2,
  spaceBetween: 16,
  centeredSlides: true,
  speed: 3000,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  autoplay: {
    delay: 0,
    disableOnInteraction: false,
    reverseDirection: true,
  }
});


//timeline//

const steps = document.querySelectorAll("[data-step]");
const bubble = document.getElementById("bubble");

function updateBubblePosition() {
  let activeStep = steps[0];
  let minDist = Infinity;

  steps.forEach((step) => {
    const rect = step.getBoundingClientRect();
    const dist = Math.abs(rect.top + rect.height / 2 - window.innerHeight / 2);

    // Remove active class from all steps
    step.classList.remove("active");

    if (dist < minDist) {
      minDist = dist;
      activeStep = step;
    }
  });

  // Add active class to closest step
  activeStep.classList.add("active");

  // Move the bubble
  const wrapper = document.querySelector(".process-wrapper");
  const wrapperTop = wrapper.getBoundingClientRect().top + window.scrollY;
  const stepTop = activeStep.getBoundingClientRect().top + window.scrollY;

  const relativeTop = stepTop + activeStep.offsetHeight / 2 - wrapperTop;
  bubble.style.top = `${relativeTop}px`;
}

window.addEventListener("scroll", updateBubblePosition);
window.addEventListener("load", updateBubblePosition);


//without text scaling up///
//const steps = document.querySelectorAll("[data-step]");
//const bubble = document.getElementById("bubble");
//
//function updateBubblePosition() {
//  let activeStep = steps[0];
//  let minDist = Infinity;
//
//  steps.forEach((step) => {
//    const rect = step.getBoundingClientRect(); // position relative to viewport
//    const dist = Math.abs(rect.top + rect.height / 2 - window.innerHeight / 2);
//
//    if (dist < minDist) {
//      minDist = dist;
//      activeStep = step;
//    }
//  });
//
//  // Now calculate its position relative to the wrapper's top
//  const wrapper = document.querySelector(".process-wrapper");
//  const wrapperTop = wrapper.getBoundingClientRect().top + window.scrollY;
//  const stepTop = activeStep.getBoundingClientRect().top + window.scrollY;
//
//  const relativeTop = stepTop + activeStep.offsetHeight / 2 - wrapperTop;
//
//  bubble.style.top = `${relativeTop}px`;
//}
//
//// Attach to scroll and load events
//window.addEventListener("scroll", updateBubblePosition);
//window.addEventListener("load", updateBubblePosition);


//FAQ//

document.addEventListener("DOMContentLoaded", function () {
    const loadMoreBtn = document.getElementById("load-more");
    const faqContainer = document.getElementById("faq-container");
    const faqWrapper = document.getElementById("faqWrapper");

    let originalContent = faqContainer.innerHTML;
    let isExpanded = false;

    loadMoreBtn.addEventListener("click", function () {
        let page = parseInt(loadMoreBtn.getAttribute("data-page"));

        if (isNaN(page) || page < 1) {
            page = 2;
        }

        if (!isExpanded) {
            fetch(`/faq-list/?page=${page}`)
                .then(response => response.json())
                .then(data => {
                    if (data.faqs.length > 0) {
                        data.faqs.forEach((faq, index) => {
                            const newId = `extraFaq${page}-${index}`;
                            const faqHtml = `
                                <div class="accordion-item">
                                    <h2 class="accordion-header" id="heading${newId}">
                                        <button class="accordion-button collapsed" type="button"
                                                data-bs-toggle="collapse" data-bs-target="#collapse${newId}"
                                                aria-expanded="false">
                                            ${faq.question}
                                        </button>
                                    </h2>
                                    <div id="collapse${newId}" class="accordion-collapse collapse"
                                         data-bs-parent="#faqAccordion">
                                        <div class="accordion-body">${faq.answer}</div>
                                    </div>
                                </div>
                            `;
                            faqContainer.insertAdjacentHTML('beforeend', faqHtml);
                        });

                        faqWrapper.classList.add("expanded"); // 💡 Smoothly expand the container

                        if (data.has_next) {
                            loadMoreBtn.setAttribute("data-page", page + 1);
                        } else {
                            loadMoreBtn.innerHTML = 'Load Less <img src="/static/icons/up.svg" class="ms-2" width="20" height="20" style="filter: invert(1);" >';
                            isExpanded = true;
                        }
                    }
                });
        } else {
            // Load Less behavior
            faqContainer.innerHTML = originalContent;
            loadMoreBtn.innerHTML = 'Load More <img src="/static/icons/down.svg" class="ms-2" width="20" height="20">';
            loadMoreBtn.setAttribute("data-page", "2");
            isExpanded = false;
            faqWrapper.classList.remove("expanded"); // 💡 Smoothly collapse
        }
    });
});


// Get the button
// Show the button after scrolling down 100px
window.onscroll = function() {
  scrollFunction();
};

function scrollFunction() {
  const btn = document.getElementById("myBtn");
  if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
    btn.style.display = "block";
  } else {
    btn.style.display = "none";
  }
}

// Scroll smoothly to the top when clicked
function topFunction() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

//In about section highlighting VGDS expansion
document.addEventListener("DOMContentLoaded", function () {
const targetText = document.getElementById("highlightedText");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        targetText.classList.add("active");
      } else {
        targetText.classList.remove("active");
      }
    });
  },
  {
    threshold: 0.6 // Element should be at least 60% visible
  }
);

if (targetText) observer.observe(targetText);
});

//In Why Us, on collapse, border bottom, becomes blue
document.addEventListener("DOMContentLoaded", function () {
const accordions = document.querySelectorAll(".accordion-item-why");

accordions.forEach(item => {
  const button = item.querySelector(".accordion-button-why");

  button.addEventListener("click", function () {
    // Remove active from all
    accordions.forEach(acc => acc.classList.remove("active"));

    // Add to the clicked one if not collapsed
    if (button.classList.contains("collapsed") === false) {
      item.classList.add("active");
    }
  });
});
});


////WHY US SECTION TAB CHANGES///
 const lottieMap = {
    'flush-collapseOne': 'https://lottie.host/ecc5057f-d7f7-4469-a206-9a15ef2f5d1b/mtuqjS5ncv.lottie', // Save Time
    'flush-collapseTwo': 'https://lottie.host/c3ad558a-4186-4fdf-ba4d-09e9282a03c8/d4PRhG6t7S.lottie', // Professional Design
    'flush-collapseThree': 'https://lottie.host/fa739fe8-9141-460e-91b1-a4b9deb9c567/IQVScqgfDy.lottie', // Confidentiality
    'flush-collapseFour': 'https://lottie.host/4796b6f7-772e-40f9-8359-8eca55adf9ba/7iIKv0YPmZ.lottie', // Cost Efficiency
    'flush-collapseFive': 'https://lottie.host/1867c80c-d466-4275-a239-aeac3a304613/rVwe6OIRjV.lottie'  // Fast Delivery
  };

  const accordion = document.getElementById('accordionFlushExample');
  const lottiePlayer = document.getElementById('whyLottie');

  accordion.addEventListener('shown.bs.collapse', function (event) {
    const targetId = event.target.id;
    const newSrc = lottieMap[targetId];
    if (newSrc) {
      lottiePlayer.load(newSrc);
    }
  });


  //Solutions page//
  const solutionBgMap = {
  'solution-collapseOne': "{% static 'images/2148908922.jpg' %}",
  'solution-collapseTwo': "{% static 'images/26.jpg' %}",
  'solution-collapseThree': "{% static 'images/27.jpg' %}",
  // Add more as needed
};

const accordionSolutions = document.getElementById('accordionSolutions');
const bgBox = document.getElementById('solutionBgBox');

accordionSolutions.addEventListener('shown.bs.collapse', function (event) {
  const targetId = event.target.id;
  const newBg = solutionBgMap[targetId];
  if (newBg) {
    bgBox.style.backgroundImage = `url('${newBg}')`;
  }
});




//
//  ///Modal confirmation closing//
//
//  let targetWizardModal = null;
//
//  document.addEventListener('DOMContentLoaded', () => {
//    // Attach custom close handler to all wizard modals
//    document.querySelectorAll('.wizard-modal').forEach(modal => {
//      const closeBtn = modal.querySelector('.btn-close');
//
//      if (closeBtn) {
//        closeBtn.addEventListener('click', (e) => {
//          e.preventDefault();
//          e.stopPropagation(); // prevent Bootstrap's default close behavior
//
//          targetWizardModal = bootstrap.Modal.getInstance(modal);
//          const confirmModal = new bootstrap.Modal(document.getElementById('confirmCloseModal'));
//          confirmModal.show();
//        });
//      }
//    });
//
//    // "No, Let me Order" - just hide confirm modal
//    document.getElementById('cancelCloseWizard').addEventListener('click', () => {
//      const confirmModal = bootstrap.Modal.getInstance(document.getElementById('confirmCloseModal'));
//      confirmModal.hide();
//    });
//
//    // "Yes, Close" - hide confirm and then wizard modal
//    document.getElementById('confirmCloseWizard').addEventListener('click', () => {
//      const confirmModal = bootstrap.Modal.getInstance(document.getElementById('confirmCloseModal'));
//      confirmModal.hide();
//
//      if (targetWizardModal) {
//        targetWizardModal.hide();
//        targetWizardModal = null;
//      }
//    });
//  });
//


