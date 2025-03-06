const timerDisplay = document.getElementById('timer');
let deadline = new Date('March 08, 2025 19:15:00').getTime();

let timerInterval = setInterval(() => {
    let toDay = new Date().getTime();
    let differenceTime = deadline - toDay;

    const second = 1000,
    minute = second * 60,
    hour = minute * 60,
    day = hour * 24;

    let days = Math.floor(differenceTime / (day));
    let hours = Math.floor((differenceTime % (day)) / (hour));
    let minutes = Math.floor((differenceTime % (hour)) / (minute));
    let seconds = Math.floor((differenceTime % (minute)) / second);
    timerDisplay.textContent = `${days} days ${String(hours).padStart(2, '0')} : ${String(minutes).padStart(2, '0')} : ${String(seconds).padStart(2, '0')}`;

    if (differenceTime < 0) {
        clearInterval(timerInterval);
        timerDisplay.textContent = 'TIME RAN OUT';

    }
}, 1000);






