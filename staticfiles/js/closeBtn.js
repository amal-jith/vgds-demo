document.addEventListener('DOMContentLoaded', function () {
  const closeBtns = document.querySelectorAll('.btn-close'); // handles all close buttons
  const overlay = document.getElementById('confirmCloseOverlay');
  const confirmBtn = document.getElementById('confirmCloseWizard');
  const cancelBtn = document.getElementById('cancelCloseWizard');

  // Loop over all close buttons
  closeBtns.forEach(closeBtn => {
    closeBtn.addEventListener('click', () => {
      overlay.classList.remove('d-none');
      overlay.classList.add('fade-in');
    });
  });

  // Confirm: Close and redirect
  confirmBtn?.addEventListener('click', () => {
    window.location.href = '/';
  });

  // Cancel closing
  cancelBtn?.addEventListener('click', () => {
    overlay.classList.add('d-none');
    overlay.classList.remove('fade-in');
  });
});
