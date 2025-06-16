document.addEventListener('DOMContentLoaded', function () {
  const treatmentCards = document.querySelectorAll('.treatment-card');
  const estimatedPrice = document.querySelector('.price-range');
  const nextBtn = document.querySelector('.next-btn');

  const treatmentPrices = {
    'Let us decide': '11 – 44',
    'Fix up': '11',
    'Redesign': '28',
    'Redraw': '28',
    'Additional Design Services': '44',
  };

  // Set default active (first card)
  if (treatmentCards.length > 0) {
    treatmentCards[0].classList.add('active');
    updateEstimatedPrice(treatmentCards[0]);
    saveTreatmentSelection(treatmentCards[0]);
    nextBtn.classList.remove('previous-btn-disabled');
  }

  // Card click handler
  treatmentCards.forEach(card => {
    card.addEventListener('click', function () {
      treatmentCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      updateEstimatedPrice(card);
      saveTreatmentSelection(card);
      nextBtn.classList.remove('previous-btn-disabled');
    });
  });

  // Helper: update price UI
  function updateEstimatedPrice(card) {
    const titleEl = card.querySelector('.treat-title-1');
    if (titleEl) {
      const title = titleEl.textContent.trim();
      if (treatmentPrices[title]) {
        estimatedPrice.textContent = `$${treatmentPrices[title]}`;
      }
    }
  }

  // ✅ Save treatment selection to localStorage
  function saveTreatmentSelection(card) {
    const titleEl = card.querySelector('.treat-title-1');
    if (titleEl) {
      const title = titleEl.textContent.trim();
      const price = treatmentPrices[title] || '';

      const treatmentData = {
        name: title,
        price: price
      };

      let wizardData = JSON.parse(localStorage.getItem('presentationWizard')) || {};
      wizardData.treatment = treatmentData;
      localStorage.setItem('presentationWizard', JSON.stringify(wizardData));
    }
  }
// Handle Next button click
nextBtn.addEventListener('click', function () {
  const selectedCard = document.querySelector('.treatment-card.active');
  if (selectedCard) {
    // ✅ Hide current step
    document.getElementById('step-treatment').classList.add('d-none');

    // ✅ Show next step
    document.getElementById('step-style').classList.remove('d-none');
  }
});


});
