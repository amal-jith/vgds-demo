document.addEventListener('DOMContentLoaded', () => {
  const fileCard = document.querySelector('.upload-card-1');
  const checkbox = document.getElementById('checkDefault1');
  const textarea = document.getElementById('exampleFormControlTextarea12');
  const nextBtn = document.querySelector('#step-files-details .next-btn');
  const prevBtn = document.querySelector('#step-files-details .previous-btn');

  const step4Section = document.getElementById('step-files-details');
  const step3Section = document.getElementById('step-delivery');
  const step5Section = document.getElementById('step-payment');

  const priceRangeDisplay = document.querySelector('#step-files-details .price-range');


  let uploadedFile = null;

  // Create hidden file input
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = '.pdf,.ppt,.pptx,.doc,.docx';
  fileInput.style.display = 'none';
  document.body.appendChild(fileInput);

  // File upload trigger
  fileCard.addEventListener('click', () => fileInput.click());

  // File selected
  fileInput.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
      uploadedFile = e.target.files[0];

      window.presentationWizardPresentationFile = uploadedFile;

      const existing = fileCard.querySelector('.uploaded-file-name');
      if (existing) existing.remove();

      const fileNameDisplay = document.createElement('div');
      fileNameDisplay.classList.add('mt-2', 'text-muted', 'uploaded-file-name');
      fileNameDisplay.textContent = uploadedFile.name;
      fileCard.appendChild(fileNameDisplay);
    }
  });

  function isValidLink(text) {
    const regex = /(https?:\/\/)?(drive\.google\.com\/|docs\.google\.com\/presentation\/)[^\s"]+/;
    return regex.test(text.trim());
  }

  function saveStep4Data() {
    const checkboxChecked = checkbox.checked;
    const instructionText = textarea.value.trim();

    if (checkboxChecked && !isValidLink(instructionText)) {
      alert('Please enter a valid Google Slides or Drive link.');
      return false;
    }

    const wizardData = JSON.parse(localStorage.getItem('presentationWizard')) || {};
    wizardData.filesDetails = {
      fileName: uploadedFile ? uploadedFile.name : null,
      checkboxChecked: checkboxChecked,
      instructions: instructionText
    };
    localStorage.setItem('presentationWizard', JSON.stringify(wizardData));
    return true;
  }

  function restoreStep4Data() {
    const wizardData = JSON.parse(localStorage.getItem('presentationWizard')) || {};
    const data = wizardData.filesDetails;
    if (!data) return;

    if (data.checkboxChecked) checkbox.checked = true;
    if (data.instructions) textarea.value = data.instructions;

    if (data.fileName) {
      const fileNameDisplay = document.createElement('div');
      fileNameDisplay.classList.add('mt-2', 'text-muted', 'uploaded-file-name');
      fileNameDisplay.textContent = data.fileName;
      fileCard.appendChild(fileNameDisplay);
    }
  }

 function updateEstimatedPriceStep4() {
  const wizardData = JSON.parse(localStorage.getItem('presentationWizard')) || {};
  const estimated = wizardData?.delivery?.estimatedText;
  if (estimated && priceRangeDisplay) {
    priceRangeDisplay.textContent = estimated;
  }
}


  nextBtn?.addEventListener('click', () => {
    const valid = saveStep4Data();
    if (!valid) return;

    step4Section.classList.add('d-none');
    step5Section.classList.remove('d-none');
    window.scrollTo(0, 0);
  });

  prevBtn?.addEventListener('click', () => {
    step4Section.classList.add('d-none');
    step3Section.classList.remove('d-none');
    window.scrollTo(0, 0);
  });

  restoreStep4Data();
  updateEstimatedPriceStep4();

});
