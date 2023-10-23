// Function to show the success popup and overlay
function showNotRegPopup() {
    const notregPopup = document.getElementById('not-reg-popup');
    notregPopup.style.display = 'block';

    // Set a timer to hide the pop-up after 5 seconds (5000 milliseconds)
    setTimeout(function () {
        notregPopup.style.display = 'none';
        overlay.style.display = 'none';
    }, 3000);
}

function showFailPopup() {
    const failPopup = document.getElementById('fail-popup');
    failPopup.style.display = 'block';

    // Set a timer to hide the pop-up after 5 seconds (5000 milliseconds)
    setTimeout(function () {
        failPopup.style.display = 'none';
        overlay.style.display = 'none';
    }, 3000);
}

const urlParam = new URLSearchParams(window.location.search);
if (urlParam.has('notreg') && urlParam.get('notreg') === 'true') {
    showNotRegPopup();
}

const urlParams = new URLSearchParams(window.location.search);
if (urlParams.has('fail') && urlParams.get('fail') === 'true') {
    showFailPopup();
}

// Disable the back button
history.pushState(null, null, location.href);
window.onpopstate = function () {
    history.pushState(null, null, location.href); // Revert the URL to the current page
};
