const EventEmitter = require("events");
const chatEmitter = new EventEmitter();

function sendMessage(user, message, emitter) {
  emitter.emit("message", { user, message });
}

chatEmitter.on("message", (data) => {
  console.log(`${data.user}: ${data.message}`);
});

sendMessage("Alice", "Привет, как дела?", chatEmitter);
sendMessage("Bob", "Привет, все хорошо! А у тебя?", chatEmitter);
sendMessage("Alice", "Тоже хорошо, спасибо!", chatEmitter);
