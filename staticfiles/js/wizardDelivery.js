document.addEventListener('DOMContentLoaded', function () {
  const stepDelivery = document.getElementById('step-delivery');
  const priceRangeEl = stepDelivery.querySelector('.price-range');
  const minusBtn = stepDelivery.querySelector('.minus');
  const plusBtn = stepDelivery.querySelector('.plus');
  const slideInput = stepDelivery.querySelector('.number-value');
  const dateCards = stepDelivery.querySelectorAll('.date-card');
  const optionalCards = stepDelivery.querySelectorAll('.delivery-card-1');
  const nextBtn = stepDelivery.querySelector('.next-btn');
  const prevBtn = stepDelivery.querySelector('.previous-btn');

  let slideCount = 1;
  let selectedDate = null;
  let selectedDateRate = null;
  let selectedOption = null;
  let selectedOptionRate = 0;

  // --- Auto-generate next 3 days
  const dateTitles = stepDelivery.querySelectorAll('.date-title');
  const today = new Date();
  dateTitles.forEach((el, i) => {
    const nextDate = new Date(today);
    nextDate.setDate(today.getDate() + i + 1);
    const day = nextDate.toLocaleString('default', { day: '2-digit' });
    const month = nextDate.toLocaleString('default', { month: 'short' });
    el.textContent = `${day} ${month}`;
  });

// --- Slide Counter Logic (+, -, and manual typing)
slideInput.value = slideCount = 1;

minusBtn.addEventListener('click', () => {
  if (slideCount > 1) {
    slideCount--;
    slideInput.value = slideCount;
    saveDeliveryData();
    updateEstimatedPrice();
  }
});

plusBtn.addEventListener('click', () => {
  slideCount++;
  slideInput.value = slideCount;
  saveDeliveryData();
  updateEstimatedPrice();
});

// --- Handle typing in the input box
slideInput.addEventListener('input', () => {
  const val = parseInt(slideInput.value);
  if (!isNaN(val) && val >= 1) {
    slideCount = val;
    saveDeliveryData();
    updateEstimatedPrice();
  }
});

// --- Prevent invalid values (like 0 or blank) on blur
slideInput.addEventListener('blur', () => {
  if (!slideInput.value || parseInt(slideInput.value) < 1) {
    slideCount = 1;
    slideInput.value = 1;
    saveDeliveryData();
    updateEstimatedPrice();
  }
});


  // --- Date card selection
  dateCards.forEach(card => {
    card.addEventListener('click', () => {
      dateCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');

      selectedDate = card.querySelector('.date-title')?.textContent.trim();
      selectedDateRate = card.querySelector('.date-subtitle')?.textContent.trim();

      saveDeliveryData();
      updateEstimatedPrice();
    });
  });

  // --- Optional service selection
  optionalCards.forEach(card => {
    card.addEventListener('click', () => {
      optionalCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');

      selectedOption = card.querySelector('.delivery-title-1')?.textContent.trim();
      const priceEl = card.querySelector('.delivery-title-4');
      selectedOptionRate = priceEl ? parseFloat(priceEl.textContent.replace('$', '').trim()) : 0;

      saveDeliveryData();
      updateEstimatedPrice();
    });
  });

  // --- Save all selections to localStorage
  function saveDeliveryData() {
  const wizardData = JSON.parse(localStorage.getItem('presentationWizard')) || {};

  // Parse baseMin and baseMax from selectedDateRate
  let baseMin = 0, baseMax = 0;
  const rateStr = selectedDateRate || "";
  const rangeMatch = rateStr.match(/\$(\d+)\s*-\s*\$(\d+)/);
  const singleMatch = rateStr.match(/\$(\d+)/);

  if (rangeMatch) {
    baseMin = parseFloat(rangeMatch[1]);
    baseMax = parseFloat(rangeMatch[2]);
  } else if (singleMatch) {
    baseMin = baseMax = parseFloat(singleMatch[1]);
  }

  wizardData.delivery = {
    slides: slideCount,
    date: selectedDate,
    rate: selectedDateRate,
    option: selectedOption,
    optionPrice: selectedOptionRate,
    baseMin: baseMin,
    baseMax: baseMax,
    estimatedText: priceRangeEl?.textContent || ''  // ✅ Add this line
  };

  localStorage.setItem('presentationWizard', JSON.stringify(wizardData));
}

  // --- Estimated price updater
  function updateEstimatedPrice() {
    const wizardData = JSON.parse(localStorage.getItem('presentationWizard')) || {};
    const treatmentPrice = parseFloat(wizardData?.treatment?.price || 0);
    const baseMin = parseFloat(selectedDateRate?.match(/\$(\d+)/)?.[1] || 0);
    const baseMaxMatch = selectedDateRate?.match(/\$(\d+)-\$(\d+)/);
    const baseMax = baseMaxMatch ? parseFloat(baseMaxMatch[2]) : baseMin;

    const optionPrice = selectedOptionRate || 0;
    const totalMin = (treatmentPrice + baseMin + optionPrice) * slideCount;
    const totalMax = (treatmentPrice + baseMax + optionPrice) * slideCount;

    if (totalMin === totalMax) {
      priceRangeEl.textContent = `$${totalMin}`;
    } else {
      priceRangeEl.textContent = `$${totalMin} - $${totalMax}`;
    }
  }

  // --- Restore on revisit
  function restoreFromStorage() {
    const wizardData = JSON.parse(localStorage.getItem('presentationWizard')) || {};
    const delivery = wizardData.delivery;
    if (delivery) {
      slideCount = delivery.slides || 1;
      slideInput.value = slideCount;

      // Date
      dateCards.forEach(card => {
        const title = card.querySelector('.date-title')?.textContent.trim();
        if (title === delivery.date) {
          card.classList.add('active');
          selectedDate = delivery.date;
          selectedDateRate = card.querySelector('.date-subtitle')?.textContent.trim();
        }
      });

      // Optional
      optionalCards.forEach(card => {
        const title = card.querySelector('.delivery-title-1')?.textContent.trim();
        if (title === delivery.option) {
          card.classList.add('active');
          selectedOption = delivery.option;
          const priceEl = card.querySelector('.delivery-title-4');
          selectedOptionRate = priceEl ? parseFloat(priceEl.textContent.replace('$', '').trim()) : 0;
        }
      });

      updateEstimatedPrice();
    }
  }

  // --- Navigation buttons
  nextBtn?.addEventListener('click', () => {
    saveDeliveryData();
    document.getElementById('step-delivery').classList.add('d-none');
    document.getElementById('step-files-details').classList.remove('d-none');
  });

  prevBtn?.addEventListener('click', () => {
    document.getElementById('step-delivery').classList.add('d-none');
    document.getElementById('step-style').classList.remove('d-none');
  });

  // --- On load
  restoreFromStorage();
});
