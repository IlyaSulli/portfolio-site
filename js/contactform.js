const singleLineMessage = document.getElementById('contactFormMessageInput');
const multiLineMessage = document.getElementById('contactFormMultilineMessageInput');
const contactForm = document.getElementById('contactForm');

/* Add the text from the the multiline message input to the single line message input */

multiLineMessage.addEventListener("input", function () {
  // Copy the textarea's value to the hidden input
  singleLineMessage.value = multiLineMessage.value.replace(/\n/g, " [#] ");
});


// Add an event listener for form submission
contactForm.addEventListener('submit', function (event) {
  // Redirect to your custom thank you page
  window.location.href = "contactpageredirect.html";
});