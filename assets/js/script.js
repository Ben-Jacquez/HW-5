// jQuery
var timeBlockEl = $(".time-block");
var today = dayjs().format("MMM DD, YYYY [at] hh:mm:ss a");
var currentHour = dayjs().hour();
var hourTimeNumber = [];

for (var i = 0; i < timeBlockEl.length; i++) {
  var elementID = timeBlockEl[i].getAttribute("id");
  if (elementID.length === 6) hourTimeNumber.push(parseInt(elementID[5]));
  if (elementID.length === 7)
    hourTimeNumber.push(parseInt(elementID[5] + elementID[6]));
}


// Function to update class time-blocks to based on it being past, present, or future

function checkTime() {
  for (var i = 0; i < hourTimeNumber.length; i++)
    if (hourTimeNumber[i] < currentHour) {
      timeBlockEl[i].classList.add("past");
    } else if (hourTimeNumber[i] == currentHour) {
      timeBlockEl[i].classList.add("present");
    } else if (hourTimeNumber[i] > currentHour) {
      timeBlockEl[i].classList.add("future");
    }
}

// FUNCTION TO GET FROM LOCAL STORAGE AND DISPLAY USER INPUT ON TEXTAREA

function renderUserInput() {

  for (var i = 0; i < timeBlockEl.length; i++) {
    var key = timeBlockEl[i].getAttribute("id");
    var value = localStorage.getItem(key);
    timeBlockEl[i].children[1].innerText = value;
  }
}

// FUNCTION TO SAVE USER INPUT ON TEXTAREA

function saveUserInput() {
  var value = $(this).siblings(".description").val();
  var key = $(this).parent().attr("id");
  localStorage.setItem(key, value);
}

// TIME INTERVAL FUNCTION


setInterval(function () {
  var today = dayjs().format("MMM DD, YYYY [at] hh:mm:ss a");
  $("#currentDay").text(today);
}, 1000);

$(".saveBtn").on("click", saveUserInput);

checkTime();
renderUserInput();
