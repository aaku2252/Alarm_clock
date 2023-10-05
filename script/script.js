const h1 = document.querySelector(".h1");
const h2 = document.querySelector(".h2");
const m1 = document.querySelector(".m1");
const m2 = document.querySelector(".m2");
const s1 = document.querySelector(".s1");
const s2 = document.querySelector(".s2");

const alarm = document.querySelector("#time");

const list = document.querySelector("#list");

let time = new Date();

//> starting the clock ------------------------------------------------------------------------
h1.textContent = Math.floor(time.getHours() / 10);
h2.textContent = time.getHours() % 10;
m1.textContent = Math.floor(time.getMinutes() / 10);
m2.textContent = time.getMinutes() % 10;
s1.textContent = Math.floor(time.getSeconds() / 10);
s2.textContent = time.getSeconds() % 10;

//>--------------------------------------------------------------------------------------------------------
//* current time

(() => {
  setInterval(() => {
    time = new Date();

    if (time.getMinutes() == 0) {
      h1.textContent = Math.floor(time.getHours() / 10);
      h2.textContent = time.getHours() % 10;
    }

    if (time.getSeconds() == 0) {
      m1.textContent = Math.floor(time.getMinutes() / 10);
      m2.textContent = time.getMinutes() % 10;
      list.appendChild(document.createTextNode("Hello codesandbox"));
    }

    s1.textContent = Math.floor(time.getSeconds() / 10);
    s2.textContent = time.getSeconds() % 10;
    time = null;
  }, 1000);
})();
