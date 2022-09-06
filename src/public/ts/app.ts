const messageList = document.querySelector("ul") as HTMLUListElement;
const messageForm = document.querySelector("form") as HTMLFormElement;

const socket = new WebSocket(`ws://${window.location.host}`);

socket.addEventListener("open", () => {
  console.log("Connected to Server ✅");
});

socket.addEventListener("message", (message) => {
  console.log(`Server : ${message.data}`);

  const li = document.createElement("li");
  li.innerText = message.data;

  messageList.appendChild(li);
});

socket.addEventListener("close", () => {
  console.log("Disconnected from Server ❌");
});

messageForm?.addEventListener("submit", (e) => {
  e.preventDefault();

  const input = messageForm.querySelector("input") as HTMLInputElement;

  socket.send(input.value);
  input.value = "";
  input.focus();
});
