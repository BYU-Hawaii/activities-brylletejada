document.addEventListener("DOMContentLoaded", function() {
    const feedbackForm = document.querySelector(".feedback-form");

    feedbackForm.addEventListener("submit", function(event) {
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const comments = document.getElementById("comments").value;

        if (name === "" || email === "" || comments === "") {
            alert("All fields are required!");
            event.preventDefault();
        }
    
        document.querySelector('form').addEventListener('submit', function(event) {
            event.preventDefault();
            const form = event.target;
            fetch(form.action, {
                method: form.method,
                body: new FormData(form),
                headers: {
                    'Accept': 'application/json'
                }
            }).then(response => {
                if (response.ok) {
                    alert('Thank you for your feedback!');
                    form.reset();
                } else {
                    alert('Oops! There was a problem submitting your form');
                }
            }).catch(error => {
                alert('Oops! There was a problem submitting your form');
            });
        });
    });
});