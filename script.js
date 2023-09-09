document.addEventListener("DOMContentLoaded", function () {
    const chatWindow = document.getElementById("chat-window");
    const messageInput = document.getElementById("message-input");
    const sendButton = document.getElementById("send-button");

    const scaledrone = new Scaledrone("zuuyKwSgm6cDx3be");
    const roomId = "chat";

    const randomUsername = "User" + Math.floor(Math.random() * 1000);
    const randomColor = getRandomColor();

    scaledrone.on("open", (error) => {
        if (error) {
            console.error(error);
        } else {
            console.log("Connected to Scaledrone as " + randomUsername);
        }
    });

    const room = scaledrone.subscribe(roomId);

    room.on("message", (message) => {
        const messageElement = document.createElement("div");
        messageElement.classList.add("message");

        messageElement.style.color = randomColor;

        messageElement.innerHTML = `<span class="username">${randomUsername}:</span> ${message.data}`;
        chatWindow.appendChild(messageElement);
        chatWindow.scrollTop = chatWindow.scrollHeight;
    });

    sendButton.addEventListener("click", function () {
        const message = messageInput.value.trim();
        if (message !== "") {
            scaledrone.publish({
                room: roomId,
                message: message,
            });
            messageInput.value = "";
        }
    });

    messageInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            sendButton.click();
        }
    });

    function getRandomColor() {
        const letters = "0123456789ABCDEF";
        let color = "#";
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
});
