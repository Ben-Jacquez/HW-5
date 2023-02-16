// jQuery / Variables for the page
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
// This is a function that allows us to store; user inputed text into; local storage so its their when the page is refreshed
function renderUserInput() {

  for (var i = 0; i < timeBlockEl.length; i++) {
    var key = timeBlockEl[i].getAttribute("id");
    var value = localStorage.getItem(key);
    timeBlockEl[i].children[1].innerText = value;
  }
}
// This is a function that allows us to store; user inputed text into; local storage so its their when the page is refreshed
function saveUserInput() {
  var value = $(this).siblings(".description").val();
  var key = $(this).parent().attr("id");
  localStorage.setItem(key, value);
}
// Time interval function for api to display on top of page
setInterval(function () {
  var today = dayjs().format("MMM DD, YYYY [at] hh:mm:ss a");
  $("#currentDay").text(today);
}, 1000);

// Save on click
$(".saveBtn").on("click", saveUserInput);

checkTime();
renderUserInput();
