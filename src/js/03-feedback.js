import lodashThrottle from 'lodash.throttle';
import storage from './safe';

const feedbackForm = document.querySelector('.feedback-form');
let formData = {
    email: '',
    message: '',
};

if (localStorage.length > 0 && storage.load('feedback-form-state')) {
    formData.email = storage.load('feedback-form-state').email;
    formData.message = storage.load('feedback-form-state').message;
    feedbackForm.email.value = storage.load('feedback-form-state').email;
    feedbackForm.message.value = storage.load('feedback-form-state').message;
}

const onInput = e => {
    formData[e.target.name] = e.target.value;

    storage.save('feedback-form-state', formData);
};

feedbackForm.addEventListener('input', lodashThrottle(onInput, 500));

const onFormSubmit = e => {
    e.preventDefault();

    const {
        elements: { email, message },
    } = e.currentTarget;

    if (message.value !== '' && email.value !== '') {
        formData.email = email.value;
        formData.message = message.value;
        

        console.log(formData);
        e.currentTarget.reset();
        localStorage.removeItem('feedback-form-state');
        formData = {
            email: '',
            message: '',
        };
    } else {
        alert('Будь ласка, залиште свій відгук!');
    }
};

feedbackForm.addEventListener('submit', onFormSubmit);
