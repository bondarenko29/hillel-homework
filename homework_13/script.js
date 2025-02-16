//const form = document.forms.myform;
const form = document.getElementById('myform');
const username = document.getElementById('username');
const textarea = document.getElementById('textarea-form');
const phone = document.getElementById('userphone');
const email = document.getElementById('email');

form.addEventListener('submit', (event)=> {
    event.preventDefault();
    if (!username.value) {
        showErrorMessage(username, 'Enter Name');
      } else {
        hideErrorMessage(username);
    }

    const textareaRegex = /^.{5,}$/;
    const isValidTextarea = textareaRegex.test(textarea.value);
    if (!isValidTextarea) {
        showErrorMessage(textarea, 'Message must be at least 5 symbols');
    } else {
        hideErrorMessage(textarea);
    }

    const phoneMask = IMask(phone,{mask : '+{380}(00)000-00-00'});
    const phoneRegex = /^\+380\(\d{2}\)\d{3}-\d{2}-\d{2}$/;
    const isValidPhone = phoneRegex.test(phoneMask.value);
    if (!isValidPhone) {
        showErrorMessage(userphone, 'Phone number must start with +380');
    } else {
        hideErrorMessage(userphone);
    }
      
    const emailRegex = /^[a-zA-Z0-9.+-]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
    const isValidEmail = emailRegex.test(email.value)
    if (!isValidEmail) {
        showErrorMessage(email, 'Enter Email and contain "@" and a dot');
    } else {
        hideErrorMessage(email);
    }
   
    if (username.value && isValidTextarea && isValidPhone && isValidEmail) {
        console.log('Дані для відправки:', {
            username: username.value,
            message: textarea.value,
            phone: phone.value,
            email: email.value
          });
          form.reset();
    }
});

  function showErrorMessage(inputElement, errorMessage) {
    const errorElement = inputElement.nextElementSibling;
    if (errorElement && errorElement.classList.contains('error-message')) {
      errorElement.textContent = errorMessage;
    } else {
      const errorElement = document.createElement('span');
      errorElement.classList.add('error-message');
      errorElement.textContent = errorMessage;
      inputElement.insertAdjacentElement('afterend', errorElement);
    }
  }

  function hideErrorMessage(inputElement) {
    const errorElement = inputElement.nextElementSibling;
    if (errorElement && errorElement.classList.contains('error-message')) {
      errorElement.remove();
    }
  }


 

