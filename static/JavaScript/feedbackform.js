function validateForm() {
    // Get form elements
    const fullNameInput = document.getElementsByName('full_name')[0];
    const emailInput = document.getElementsByName('email')[0];
    const suggestionInput = document.getElementsByName('suggestion')[0];

    // Validate Full Name field (Not empty)
    if (fullNameInput.value.trim() === '') {
        alert('Please enter your Full Name.');
        fullNameInput.focus();
        return false;
    }

    // Validate Email field (Valid email format)
    const emailPattern = /^\S+@\S+\.\S+$/;
    if (!emailPattern.test(emailInput.value.trim())) {
        alert('Please enter a valid Email Address.');
        emailInput.focus();
        return false;
    }

    // Validate Suggestion field (Not empty)
    if (suggestionInput.value.trim() === '') {
        alert('Please enter your Suggestion.');
        suggestionInput.focus();
        return false;
    }

    // If all validations pass, return true to submit the form
    return true;
}


function submitFeedback() {
    if (validateForm()) {
        const form = document.getElementById("feedbackForm");
        const formData = new FormData(form);

        const xhr = new XMLHttpRequest();
        xhr.open("POST", form.action, true);

        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    // Form submission successful, displaying response message
                    setTimeout(function () {
                        document.getElementsByName('full_name')[0].value = "";
                        document.getElementsByName('email')[0].value = "";
                        document.getElementsByName('suggestion')[0].value = "";
                        document.getElementById("response").style.display = "block";
                    },
                    2000);
                    
                } else {
                    document.getElementById("response").innerHTML = "Error in submitting form";
                    document.getElementById("response").style.display = "block";
                }
            }
        };

        xhr.send(formData);
    }
}