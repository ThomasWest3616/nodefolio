function sendContactMessage() {
    fetch("/api/contact", {
        method: "POST",
        headers: { "Content-type": "application/json; charset=UTF-8" },
        body: JSON.stringify({
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            phone: document.getElementById("phone").value,
            subject: document.getElementById("subject").value,
            name: document.getElementById("message").value,
        })  
    }).then(response => {
        if (response.status === 200) {
            console.log("Everything went well");
            // redirect after showing a notification
        } else {
            console.log("Error sending the contact message", response.status);
        }
    });
}

document.getElementById("contact-button").addEventListener("click", sendContactMessage);