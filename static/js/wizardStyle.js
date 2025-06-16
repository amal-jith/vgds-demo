//document.addEventListener('DOMContentLoaded', function () {
//  const styleCards = document.querySelectorAll('.style-card');
//  const nextBtn = document.querySelector('#step-style .next-btn');
//  const prevBtn = document.querySelector('#step-style .previous-btn');
//  const estimatedPriceEl = document.querySelector('#step-style .price-range');
//
//  const uploadCard = document.querySelector('.upload-card');
//  let selectedStyle = 'Own Style'; // default
//
//  // Load and show estimated price from step 1
//  const wizardData = JSON.parse(localStorage.getItem('presentationWizard')) || {};
//  if (wizardData.treatment && wizardData.treatment.price) {
//    estimatedPriceEl.textContent = `$${wizardData.treatment.price}`;
//  }
//
//  // Set default active card
//  if (styleCards.length > 0) {
//    styleCards[0].classList.add('active');
//  }
//
//  // Style card click handler
//  styleCards.forEach(card => {
//    card.addEventListener('click', function () {
//      styleCards.forEach(c => c.classList.remove('active'));
//      card.classList.add('active');
//
//      const title = card.querySelector('.treat-title-1')?.textContent.trim();
//      selectedStyle = title;
//
//      if (title === 'Own Style') {
//        uploadCard.classList.remove('d-none');
//      } else {
//        uploadCard.classList.add('d-none');
//        saveStyleSelection({ name: selectedStyle, file: null });
//      }
//    });
//  });
//
//  // File upload handler
//  uploadCard?.addEventListener('click', function () {
//    const fileInput = document.createElement('input');
//    fileInput.type = 'file';
//    fileInput.accept = '.pdf,.ppt,.pptx';
//    fileInput.style.display = 'none';
//
//    fileInput.addEventListener('change', function () {
//      if (fileInput.files.length > 0) {
//        const uploadedFile = fileInput.files[0];
//        saveStyleSelection({ name: selectedStyle, file: uploadedFile.name });
//
//        // Optional: You can show uploaded file name visually somewhere.
//      }
//    });
//
//    document.body.appendChild(fileInput);
//    fileInput.click();
//  });
//
//  // Save selection to localStorage
//  function saveStyleSelection(styleData) {
//    let wizardData = JSON.parse(localStorage.getItem('presentationWizard')) || {};
//    wizardData.style = styleData;
//    localStorage.setItem('presentationWizard', JSON.stringify(wizardData));
//  }
//
//  // Navigate to next step
//  nextBtn?.addEventListener('click', function () {
//    if (selectedStyle === 'Own Style' && !wizardData.style?.file) {
//      alert('Please upload a file for Own Style.');
//      return;
//    }
//    // Already saved during selection
//    document.getElementById('step-style').classList.add('d-none');
//    document.getElementById('step-delivery').classList.remove('d-none');
//  });
//
//  // Navigate to previous step
//  prevBtn?.addEventListener('click', function () {
//    document.getElementById('step-style').classList.add('d-none');
//    document.getElementById('step-treatment').classList.remove('d-none');
//  });
//});
//
//
//

document.addEventListener('DOMContentLoaded', function () {
  const styleCards = document.querySelectorAll('.style-card');
  const nextBtn = document.querySelector('#step-style .next-btn');
  const prevBtn = document.querySelector('#step-style .previous-btn');
  const estimatedPriceEl = document.querySelector('#step-style .price-range');
  const uploadCard = document.querySelector('.upload-card');
  const stepStyle = document.getElementById('step-style');

  let selectedStyle = 'Own Style'; // default
  let selectedFile = null; // Store actual File object

  // Function to update estimated price from localStorage
  function updateEstimatedPrice() {
    const wizardData = JSON.parse(localStorage.getItem('presentationWizard')) || {};
    if (wizardData.treatment && wizardData.treatment.price) {
      estimatedPriceEl.textContent = `$${wizardData.treatment.price}`;
    } else {
      estimatedPriceEl.textContent = '$–';
    }
  }

  updateEstimatedPrice();

  // Re-check estimated price when step becomes visible
  const observer = new MutationObserver(() => {
    if (!stepStyle.classList.contains('d-none')) {
      updateEstimatedPrice();
    }
  });
  observer.observe(stepStyle, { attributes: true, attributeFilter: ['class'] });

  // Set default active card
  if (styleCards.length > 0) {
    styleCards[0].classList.add('active');
  }

  // Style card click handler
  styleCards.forEach(card => {
    card.addEventListener('click', function () {
      styleCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');

      const title = card.querySelector('.treat-title-1')?.textContent.trim();
      selectedStyle = title;

      if (title === 'Own Style') {
        uploadCard.classList.remove('d-none');
      } else {
        uploadCard.classList.add('d-none');
        selectedFile = null;
        saveStyleSelection({ name: selectedStyle, file: null });
      }
    });
  });

  // File upload handler
  uploadCard?.addEventListener('click', function () {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.pdf,.ppt,.pptx,.docx';
    fileInput.style.display = 'none';

    fileInput.addEventListener('change', function () {
      if (fileInput.files.length > 0) {
        selectedFile = fileInput.files[0];
        saveStyleSelection({ name: selectedStyle, file: selectedFile.name });

        // Attach actual File object globally
        window.presentationWizardStyleFile = selectedFile;

        // Optional: show uploaded file name
        console.log("Selected file:", selectedFile.name);
      }
    });

    document.body.appendChild(fileInput);
    fileInput.click();
  });

  // Save selection to localStorage
  function saveStyleSelection(styleData) {
    const wizardData = JSON.parse(localStorage.getItem('presentationWizard')) || {};
    wizardData.style = styleData;
    localStorage.setItem('presentationWizard', JSON.stringify(wizardData));
  }

  // Navigate to next step
  nextBtn?.addEventListener('click', function () {
    const wizardData = JSON.parse(localStorage.getItem('presentationWizard')) || {};
    if (selectedStyle === 'Own Style' && !selectedFile) {
      alert('Please upload a file for Own Style.');
      return;
    }

    // Store actual File in a global JS variable (window scoped)
    window.presentationWizardFile = selectedFile;

    document.getElementById('step-style').classList.add('d-none');
    document.getElementById('step-delivery').classList.remove('d-none');
  });

  // Navigate to previous step
  prevBtn?.addEventListener('click', function () {
    document.getElementById('step-style').classList.add('d-none');
    document.getElementById('step-treatment').classList.remove('d-none');
  });
});
