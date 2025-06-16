document.addEventListener("DOMContentLoaded", () => {
    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

  const fullNameInput = document.querySelector("#paymentFullName");
  const emailInput = document.querySelector("#paymentEmail");
  const phoneInput = document.querySelector("#paymentPhone");

  const promoInput = document.querySelector(".promo-input");
  const promoApplyBtn = document.querySelector(".promo-apply-btn");

  const agreeTerms = document.querySelector("#agreeTermsCheckbox");
  const marketingConsent = document.querySelector("#marketingConsentCheckbox");

  const submitOrderBtn = document.querySelector(".submit-my-btn");
  const successOverlay = document.querySelector("#orderSuccess");

  const prevBtn = document.querySelector("#step-payment .previous-btn");

  const presentationWizard = JSON.parse(localStorage.getItem("presentationWizard")) || {};

  // ✅ Show estimated price
  const estimatedPriceElem = document.querySelector("#estimatedPrice");
  if (
    presentationWizard.delivery &&
    presentationWizard.delivery.estimatedText
  ) {
    estimatedPriceElem.textContent = presentationWizard.delivery.estimatedText;
  } else {
    estimatedPriceElem.textContent = "N/A";
  }

  // ✅ Previous button functionality
  prevBtn?.addEventListener("click", () => {
    document.querySelector("#step-payment").classList.add("d-none");
    document.querySelector("#step-files-details").classList.remove("d-none");
  });

  // ✅ Promo code apply logic
  promoApplyBtn.addEventListener("click", () => {
    const code = promoInput.value.trim();
    if (code) {
      if (!presentationWizard.payment) presentationWizard.payment = {};
      presentationWizard.payment.promoCode = code;
      localStorage.setItem("presentationWizard", JSON.stringify(presentationWizard));
      promoInput.classList.add("is-valid");
    } else {
      promoInput.classList.remove("is-valid");
    }
  });

  // ✅ Submit
  submitOrderBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const fullName = fullNameInput.value.trim();
    const email = emailInput.value.trim();
    const phone = phoneInput.value.trim();
    const agreed = agreeTerms.checked;

    if (!fullName || !email || !phone || !agreed) {
      alert("Please fill all required fields and accept the terms.");
      return;
    }

    const paymentData = {
      fullName,
      email,
      phone,
      promoCode: promoInput.value.trim(),
      agreedToTerms: agreed,
      receiveMarketingEmails: marketingConsent.checked
    };

    presentationWizard.payment = paymentData;
    localStorage.setItem("presentationWizard", JSON.stringify(presentationWizard));

    const formData = new FormData();
    formData.append("application", JSON.stringify(presentationWizard));

    if (window.presentationWizardStyleFile) {
      formData.append("style_file", window.presentationWizardStyleFile);
    }

    if (window.presentationWizardPresentationFile) {
      formData.append("presentation_file", window.presentationWizardPresentationFile);
    }

    if (
      presentationWizard.filesDetails &&
      presentationWizard.filesDetails.instructions
    ) {
      formData.append("google_link", presentationWizard.filesDetails.instructions);
    }

    fetch("/submit_order/", {
      method: "POST",
      headers: {
        "X-CSRFToken": csrfToken  // ✅ Add CSRF token here
    },
      body: formData
    })
      .then(response => {
        if (!response.ok) throw new Error("Submission failed");
        return response.json();
      })
      .then(data => {
        successOverlay.classList.remove("d-none");
        // localStorage.removeItem("presentationWizard"); // Optional
      })
      .catch(error => {
        console.error("Error:", error);
        alert("There was an error submitting your order. Please try again.");
      });
  });
});
