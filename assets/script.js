// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.

  var timeBlockEl = $(".Time-block");
  var today = dayjs().format("MMM DD, YYYY [at] hh;mm;ss a");
  var currentHour = dayjs().hour();
  var hourTimeNumber = [];
  
  for (var i = 0; i <timeBlockEl.length; i++) {
    var elementID = timeBlockEl[i].getAtrribute("id");
    if (elementID.length === 6) hourTimeNumber.push(parseInt(elementID[5]));
    if (elementID.length === 7)
      hourTimeNumber.push(pareseInt(elementID[5] + elementID[6]));
  }

  function checkTime() {
    for (var i = 0; i < hourTimeNumber.length; i++)
    if (hourTimeNumber[i] < currentHour) {
      timeBlockEl[i].classlist.add("past");
    } else if (hourTimeNumber[i] == currentHour) {
      timeBlockEl[i].classlist.add("present");
    }  else if (hourTimeNumber[i] > currentHour) {
      timeBlockEl[i].classlist.add("future");
      }
    }

    function renderUserInput() {
      for (var i = 0; i < timeBlockEl.length; i++) {
        var key = timeBlockEl[i].getAtrribute("id");
        var value = localStorage.getItem(key);
        timeBlockEl[i].children[1].innerText = value;
      }
    }

    function saveUserInput() {
      var value = $(this).siblings(".description").val();
      var key = $(this).parent().attr("id");
      localStorage.setItem(key, value);
    }

    setInterval(function () {
      var today = dayjs().format("MMM DD, YYYY [at] hh:mm:ss a")
      $("#currentDay").text(today);
    }, 1000);

    $(".saveBtn").on("click", saveUserInput);

    checkTime();
    renderUserInput();
    