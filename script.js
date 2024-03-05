function sendData(event) {
    event.preventDefault();

    const email = document.querySelector('.theform input[type="email"]').value;

    const apiUrl = 'https://woohumore.onrender.com/subscribers/add/';
    const data = { "email": email };

    const button = document.querySelector('.theform button');
    const loader = document.querySelector('.loader');

    // Show loader
    loader.style.display = 'flex';
    button.style.display = 'none';
    button.setAttribute('disabled', true);

    axios.post(apiUrl, data)
        .then(response => {
            handleSuccess(loader, button);
        })
        .catch(error => {
            errorResponse = error.response.data.errors
            console.error('Error sending data:', errorResponse);
            handleError(loader, button, errorResponse.email);
        });
}

function handleError(loader, button, errorMessage) {
    const error = document.querySelector('.error-message');
    error.textContent = errorMessage;
    loader.style.display = 'none';
    button.style.display = 'initial';
    button.removeAttribute('disabled');
}

function handleSuccess(loader, button) {
    loader.style.display = 'none';
    button.classList.remove('btn-primary');
    button.classList.add('btn-success');
    button.style.display = 'initial';
    button.textContent = "You've been added! 🥳";
    button.setAttribute('disabled', true);

    setTimeout(() => {
        button.textContent = "✔";
    }, 3000);
}