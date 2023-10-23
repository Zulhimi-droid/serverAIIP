function showErrorPopup() {
  const popup = document.getElementById('error-popup');
  popup.style.display = 'block';

  // Automatically close the pop-up after 3 seconds (adjust the delay as needed)
  setTimeout(function() {
    popup.style.display = 'none';
    overlay.style.display = 'none'; // Add this line to hide the overlay
  }, 3000); // 3000 milliseconds (3 seconds)
}

function showPopup() {
  const overlay = document.getElementById('success-popup');
  overlay.style.display = 'block';

  // Automatically close the pop-up after 5 seconds (adjust the delay as needed)
  setTimeout(function() {
    overlay.style.display = 'none'; // Hide the overlay
  }, 5000); // 5000 milliseconds (5 seconds)
}

const urlParams = new URLSearchParams(window.location.search);

if (urlParams.has('success') && urlParams.get('success') === 'true') {
  showPopup();
} else if (urlParams.has('error') && urlParams.get('error') === 'email-in-use') {
  showErrorPopup();
}
