"use strict";
const messageList = document.querySelector("ul");
const messageForm = document.querySelector("#message");
const nicknameForm = document.querySelector("#nickname");
const socket = new WebSocket(`ws://${window.location.host}`);
const makeMessage = (type, payload) => {
    return JSON.stringify({
        type,
        payload,
    });
};
socket.addEventListener("open", () => {
    console.log("Connected to Server ✅");
});
socket.addEventListener("message", (message) => {
    const li = document.createElement("li");
    li.innerText = message.data;
    messageList.appendChild(li);
});
socket.addEventListener("close", () => {
    console.log("Disconnected from Server ❌");
});
messageForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const input = messageForm.querySelector("input");
    socket.send(makeMessage("message", input.value));
    input.value = "";
    input.focus();
});
nicknameForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const input = nicknameForm.querySelector("input");
    socket.send(makeMessage("nickname", input.value));
});
