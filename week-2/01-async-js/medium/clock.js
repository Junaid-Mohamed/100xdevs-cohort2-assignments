const moment = require("moment");

function getTime() {
  let hour = new Date().getHours();
  const minute = new Date().getMinutes();
  const second = new Date().getSeconds();
  //   console.log(typeof hour, typeof minute, typeof second);
  if (hour >= 0 && hour <= 11) {
    return `${hour}:${minute}:${second} AM`;
  } else if (hour >= 12 && hour <= 23) {
    hour -= 12;
    return `${hour}:${minute}:${second} PM`;
  }
}

function timeCounter() {
  const nowInHours = moment().format("hh:mm:ss");
  console.log(nowInHours);
}

// setInterval(timeCounter, 1000);

function formatTime() {
  const time = getTime();
  console.log(time);
}
setInterval(formatTime, 1000);
// formatTime();
