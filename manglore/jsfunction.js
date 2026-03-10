// Current date
var currentDate = new Date();

// Function to display previous day's timings
function showPreviousDay() {
    currentDate.setDate(currentDate.getDate() - 1);
    getPrayerTimes();
    updateDateLabel();
    updateHijriDate();
}

// Function to display next day's timings
function showNextDay() {
    currentDate.setDate(currentDate.getDate() + 1);
    getPrayerTimes();
    updateDateLabel();
    updateHijriDate();
}

// Function to update the date label
function updateDateLabel() {
    var options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };

    var dateLabel = document.getElementById('dateLabel');
    if (dateLabel) {
        dateLabel.innerText = currentDate.toLocaleDateString(undefined, options);
    }
}

function addMinutes(time, minutes) {
    let [h, m] = time.split(":").map(Number);

    let date = new Date();
    date.setHours(h);
    date.setMinutes(m + minutes);

    let hh = date.getHours();
    let mm = date.getMinutes().toString().padStart(2, '0');

    // convert to 12 hour format
    hh = hh % 12 || 12;

    return hh.toString().padStart(2,'0') + ":" + mm;
}

// Function to get prayer timings
function getPrayerTimes() {
    var currentDay = currentDate.getDate();
    var currentMonth = currentDate.toLocaleString('default', { month: 'long' });

    var currentPrayerTimings = prayerTimingsData[currentMonth].find(function(prayerTiming) {
        return prayerTiming.date === currentDay;
    });

    if (currentPrayerTimings) {
        document.getElementById('subahTime').innerText = currentPrayerTimings.subah;
        document.getElementById('luhrTime').innerText = currentPrayerTimings.luhr;
        document.getElementById('asarShafiTime').innerText = currentPrayerTimings.asarShafi;
        document.getElementById('asarHanafiTime').innerText = currentPrayerTimings.asarHanafi;
        document.getElementById('maghribTime').innerText = currentPrayerTimings.maghrib;
        document.getElementById('ishaShafiTime').innerText = currentPrayerTimings.ishaShafi;
        document.getElementById('ishaHanafiTime').innerText = currentPrayerTimings.ishaHanafi;
        document.getElementById('sunriseTime').innerText = currentPrayerTimings.sunrise;

        document.getElementById('subahJamaath').innerText = addMinutes(currentPrayerTimings.subah,15);
        document.getElementById('luhrJamaath').innerText = addMinutes(currentPrayerTimings.luhr,15);
        document.getElementById('asarShafiJamaath').innerText = addMinutes(currentPrayerTimings.asarShafi,15);
        document.getElementById('asarHanafiJamaath').innerText = addMinutes(currentPrayerTimings.asarHanafi,15);
        document.getElementById('maghribJamaath').innerText = addMinutes(currentPrayerTimings.maghrib,3);
        document.getElementById('ishaShafiJamaath').innerText = addMinutes(currentPrayerTimings.ishaShafi,15);
        document.getElementById('ishaHanafiJamaath').innerText = addMinutes(currentPrayerTimings.ishaHanafi,15);
    } else {
        console.error('Prayer timings not found for the selected day.');
    }
}

async function updateHijriDate(){

const day = currentDate.getDate();
const month = currentDate.getMonth() + 1;
const year = currentDate.getFullYear();

const url = `https://api.aladhan.com/v1/gToH/${day}-${month}-${year}`;

try{

const response = await fetch(url);
const data = await response.json();

let hijriDay = parseInt(data.data.hijri.day);
let hijriMonth = data.data.hijri.month.en;
let hijriYear = data.data.hijri.year;

/* manual adjustment */
const hijriOffset = -1; // change if needed

hijriDay = hijriDay + hijriOffset;

document.getElementById("hijriDateLabel").innerText =
`${hijriDay} ${hijriMonth} ${hijriYear} AH`;

}
catch(error){
console.log("Hijri date error", error);
}

}

// Open calendar
function openCalendar() {
document.getElementById("datePicker").showPicker();
}

// When user selects date
document.getElementById("datePicker").addEventListener("change", function () {
const selectedDate = new Date(this.value);

currentDate = selectedDate;
getPrayerTimes();
updateDateLabel();
updateHijriDate();
});

// Initialize page
getPrayerTimes();
updateDateLabel();
updateHijriDate();

(function () {
  emailjs.init("_XvJY_eZE5sYY9vhC");
})();

document.getElementById("contact-form")
.addEventListener("submit", function (event) {
  event.preventDefault();

  const form = this; // store form reference

  emailjs.sendForm(
    "service_mqst4bp",
    "template_op30nm4",
    form
  ).then(function () {

    document.getElementById("success-message").style.display = "block";

    // Clear the form
    form.reset();

  }, function (error) {
    alert("Failed to send message.");
  });
});