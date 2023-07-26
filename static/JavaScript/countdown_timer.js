// js for countdown time in home page
const days = document.getElementById('days');
const hours = document.getElementById('hours');
const minutes = document.getElementById('minutes');
const seconds = document.getElementById('seconds');

const currentYear = new Date().getFullYear();

const upcomingOlympicTime = new Date('July 26 2024 00:00:00');

function updateCountdown() {
    const currentTime = new Date();
    const diff = upcomingOlympicTime - currentTime;
    // converting diff into different time intervals
    const d = Math.floor(diff / 1000 / 60 / 60 / 24);
    const h = Math.floor(diff / 1000 / 60 / 60) % 24;
    const m = Math.floor(diff / 1000 / 60) % 60;
    const s = Math.floor(diff / 1000) % 60;
    // update in html page
    days.innerHTML = d ? d: "000";
    hours.innerHTML = h < 10 ? "0" + h: h; // to make two digits
    minutes.innerHTML = m < 10 ? "0" + m: m;
    seconds.innerHTML = s < 10 ? "0" + s: s;
}
// calls updateCountdown() function in every 1 sec
setInterval(updateCountdown, 1000);