const messageList = document.querySelector("ul") as HTMLUListElement;
const messageForm = document.querySelector("#message") as HTMLFormElement;
const nicknameForm = document.querySelector("#nickname") as HTMLFormElement;

const socket = new WebSocket(`ws://${window.location.host}`);

const makeMessage = (type: string, payload: string): string => {
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

  const input = messageForm.querySelector("input") as HTMLInputElement;

  socket.send(makeMessage("message", input.value));

  input.value = "";
  input.focus();
});

nicknameForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const input = nicknameForm.querySelector("input") as HTMLInputElement;

  socket.send(makeMessage("nickname", input.value));
  input.value = "";
});
