window.onload = function() {
  var contactForm = document.querySelector('#contact-form');
  contactForm.onsubmit = onSubmit;
  var comment = document.querySelector('#comment');
  comment.onclick = hideOrderNumberBox;
  var question = document.querySelector('#question');
  question.onclick = hideOrderNumberBox;
  var orderProblem = document.querySelector('#order-problem');
  orderProblem.onclick = displayOrderNumberBox;
};

function displayOrderNumberBox() {
  var orderNumberBox = document.querySelector('#order-number-box');
  orderNumberBox.required = true;
  orderNumberBox.style.display = 'block';
}

function hideOrderNumberBox() {
  var orderNumberBox = document.querySelector('#order-number-box');
  orderNumberBox.value = '';
  orderNumberBox.required = false;
  orderNumberBox.style.display = 'none';
}

function onSubmit(e) {
  var form = document.querySelector('#contact-form');
  form.classList.add('was-validated');

  if (!form.checkValidity()) {
    e.preventDefault();
  }
}
