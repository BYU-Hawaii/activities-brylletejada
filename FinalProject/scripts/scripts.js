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
    });
});