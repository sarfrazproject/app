// Current date
var currentDate = new Date();

// Function to display previous day's timings
function showPreviousDay() {
    currentDate.setDate(currentDate.getDate() - 1);
    getPrayerTimes();
    updateDateLabel();
}

// Function to display next day's timings
function showNextDay() {
    currentDate.setDate(currentDate.getDate() + 1);
    getPrayerTimes();
    updateDateLabel();
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
    } else {
        console.error('Prayer timings not found for the selected day.');
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
});

// Initialize page
getPrayerTimes();
updateDateLabel();

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