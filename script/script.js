const h1 = document.querySelector(".h1");
const h2 = document.querySelector(".h2");
const m1 = document.querySelector(".m1");
const m2 = document.querySelector(".m2");
const s1 = document.querySelector(".s1");
const s2 = document.querySelector(".s2");
const ampm = document.querySelector(".ampm");
const btn = document.querySelector("#setButton");
const alarm = document.querySelector("#alarm");
const list = document.querySelector("#list");

const wakeup = document.querySelector(".wakeup");
const alarmTime = document.querySelector(".alarmTime");
const closeButton = document.querySelector(".closeButton");

let time = new Date();

let hour;
let minute;

let ringTime = [];

//> starting the clock ------------------------------------------------------------------------
h1.textContent = Math.floor(time.getHours() / 10);
h2.textContent = time.getHours() % 10;
m1.textContent = Math.floor(time.getMinutes() / 10);
m2.textContent = time.getMinutes() % 10;
s1.textContent = Math.floor(time.getSeconds() / 10);
s2.textContent = time.getSeconds() % 10;

//> local storage----------------------------------------------------------------
let localStorage = window.localStorage;
let alarms = [];
for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.startsWith("alarm")) {
        const value = localStorage.getItem(key);
        alarms.push(value);
    }
}
for (const x of alarms) {
    addAlarm(x);
}
console.log(alarms[0]);
delete alarms;
delete localStorage;

//>set the alarm ------------------------------------------------------------------------------------

function addAlarm(text) {
    let li = document.createElement("li");

    let delBtn = document.createElement("button");
    delBtn.innerHTML = "<img src='../icons/close.png'/>";
    li.appendChild(document.createTextNode(text));
    li.appendChild(delBtn);
    list.appendChild(li);
    ringTime.push(text);
    delBtn.addEventListener("click", () => {
        let text = li.textContent;
        window.localStorage.removeItem(`alarm-${text}`);
        list.removeChild(li);
        delete text;
    });
    delete li;
    delete delBtn;
}

function setAlarm() {
    if (alarm.value != "" && list.childElementCount < 4) {
        let val = alarm.value;
        hour = val.slice(0, 2);
        minute = val.slice(3);
        let text;
        if (hour > 12) {
            text =
                String(parseInt(hour) - 12).padStart(2, "0") +
                ":" +
                minute +
                " " +
                "PM";
        } else if (hour == 12) {
            text = 12 + " " + "PM";
        } else {
            text = val + " " + "AM";
        }
        addAlarm(text);
        window.localStorage.setItem(`alarm-${text}`, `${text}`);
        alarm.value = "";
        hour = null;
        minute = null;
    }
}
btn.addEventListener("click", setAlarm);

//>format alarm date -----------------------------------------------------------------------------

function alarmDateFormat(date) {
    // 04:23 PM
    let hour = parseInt(date.slice(0, 2));
    let minute = parseInt(date.slice(3, 5));
    let zone = date.slice(-2);

    if (zone == "PM") {
        if (hour < 12) {
            hour = hour + 12;
        }
    }
    console.log(hour);
}
alarmDateFormat("12:23 PM");

//>ring the alarm bell----------------------------------------------------------------------------------

function hideRing() {
    wakeup.style.zIndex = -10;
    wakeup.style.visibility = "hidden";
}

function showRing(time) {
    alarmTime.textContent = time;
    wakeup.style.zIndex = 10;
    wakeup.style.visibility = "visible";
}

closeButton.addEventListener("click", hideRing);
//>--------------------------------------------------------------------------------------------------------
//* current time

(() => {
    setInterval(() => {
        time = new Date();
        if (time.getHours() >= 12) {
            ampm.textContent = "P";
        }

        if (time.getMinutes() == 0) {
            h1.textContent = Math.floor(time.getHours() / 10);
            h2.textContent = time.getHours() % 10;
        }

        if (time.getSeconds() == 0) {
            m1.textContent = Math.floor(time.getMinutes() / 10);
            m2.textContent = time.getMinutes() % 10;
        }

        s1.textContent = Math.floor(time.getSeconds() / 10);
        s2.textContent = time.getSeconds() % 10;

        time = null;
    }, 1000);
})();
