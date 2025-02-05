function sendMessage() {
    let inputField = document.getElementById("message-input");
    let messageText = inputField.value.trim();

    if (messageText === "") return;

    let chatBox = document.getElementById("chat-box");

    let messageDiv = document.createElement("div");
    messageDiv.classList.add("message", "user");
    messageDiv.innerHTML = `<strong>You:</strong> ${messageText} <span class="time">${getTime()}</span>`;

    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight; 
    inputField.value = "";
}

function getTime() {
    let now = new Date();
    return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}
