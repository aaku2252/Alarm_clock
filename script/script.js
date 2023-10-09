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
//>remove from the local array----------------------------------------------------------------
function removeRingTime(time) {
    ringTime.splice(ringTime.indexOf(time), 1);
}

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
    alarmDateFormat(text);
    delBtn.addEventListener("click", () => {
        let text = li.textContent;
        removeRingTime(text);
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
    let hour = parseInt(date.slice(0, 2));
    let minute = parseInt(date.slice(3, 5));
    let zone = date.slice(-2);

    if (zone == "PM") {
        if (hour < 12) {
            hour = hour + 12;
        }
    }
    ringTime.push(
        String(hour).padStart(2, "0") + ":" + String(minute).padStart(2, "0")
    );
}

function alarmDateRemove(date) {
    let hour = parseInt(date.slice(0, 2));
    let minute = parseInt(date.slice(3, 5));
    let text;

    if (hour > 12) {
        text = String(hour - 12).padStart(2, "0") + ":" + minute + " " + "PM";
    } else if (hour == 12) {
        text = 12 + " " + "PM";
    } else {
        text = date + " " + "AM";
    }
    delete hour;
    delete minute;
    return text;
}

//>ring the alarm bell----------------------------------------------------------------------------------

function hideRing() {
    wakeup.style.zIndex = -10;
    wakeup.style.visibility = "hidden";
    console.log(`alarm-${alarmDateRemove(alarmTime.textContent)}`);
    removeRingTime(alarmTime.textContent);
    window.localStorage.removeItem(
        `alarm-${alarmDateRemove(alarmTime.textContent)}`
    );
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
        switch (time.getHours() + ":" + time.getMinutes()) {
            case ringTime[0]:
                showRing(ringTime[0]);
                removeRingTime(ringTime[0]);
                localStorage.removeItem(ringTime[0]);
                break;

            case ringTime[1]:
                showRing(ringTime[1]);
                removeRingTime(ringTime[1]);
                localStorage.removeItem(ringTime[1]);
                break;

            case ringTime[2]:
                showRing(ringTime[2]);
                removeRingTime(ringTime[2]);
                localStorage.removeItem(ringTime[2]);
                break;
            case ringTime[3]:
                showRing(ringTime[3]);
                removeRingTime(ringTime[3]);
                localStorage.removeItem(ringTime[3]);
                break;
        }

        time = null;
    }, 1000);
})();
