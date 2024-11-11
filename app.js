const calcBtn = document.getElementById("calc_btn");
// Outputs
let dayAnswer = document.getElementById("day_answer");
let monthAnswer = document.getElementById("month_answer");
let yearAnswer = document.getElementById("year_answer");
// Inputs
let day = document.getElementById("Day");
let month = document.getElementById("Month");
let year = document.getElementById("Year");
// Labels and Errors
let dayError = document.getElementById("day_error");
let monthError = document.getElementById("month_error");
let yearError = document.getElementById("year_error");
let label = document.getElementsByClassName("input_label_red");

//  function to set error message and styles
function setError(input, errorElement, message) {
  errorElement.innerText = message;
  input.style.borderColor = "red";
  input.previousElementSibling.classList.add("input_label_red");
}

//  function to clear error message and styles
function clearError(input, errorElement) {
  errorElement.innerText = "";
  input.style.borderColor = "";
  input.previousElementSibling.classList.remove("input_label_red");
}

// Validation to allow only numbers
function onlyNumbers(input) {
  input.addEventListener("input", () => {
    input.value = input.value.replace(/\D/g, ""); // Removes any non-numeric characters
  });
}
onlyNumbers(day);
onlyNumbers(month);
onlyNumbers(year);

// Age calculation function
function calculateAge(dobDay, dobMonth, dobYear) {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  const currentDay = currentDate.getDate();

  let years = currentYear - dobYear;
  let months = currentMonth - dobMonth;
  let days = currentDay - dobDay;

  if (days < 0) {
    months--;
    days += new Date(currentYear, currentMonth - 1, 0).getDate();
  }
  if (months < 0) {
    years--;
    months += 12;
  }
  return { years, months, days };
}

// Animation function for incrementing numbers
function animateCount(element, endValue) {
  let startValue = 0;
  let duration = 1100;
  let increment = endValue / (duration / 10);

  let interval = setInterval(() => {
    startValue += increment;
    if (startValue >= endValue) {
      clearInterval(interval);
      element.textContent = endValue;
    } else {
      element.textContent = Math.floor(startValue);
    }
  }, 10);
}

// Event listener for button click
calcBtn.addEventListener("click", function () {
  let dayInput = Number(day.value);
  let monthInput = Number(month.value);
  let yearInput = Number(year.value);

  let isValid = true;
  const currentDate = new Date();
  const inputDate = new Date(yearInput, monthInput - 1, dayInput);

  // Reset errors
  clearError(day, dayError);
  clearError(month, monthError);
  clearError(year, yearError);

  // Validations
  if (!day.value) {
    setError(day, dayError, "This field is required");
    isValid = false;
  } else if (dayInput < 1 || dayInput > 31) {
    setError(day, dayError, "Must be a valid day");
    isValid = false;
  }

  if (!month.value) {
    setError(month, monthError, "This field is required");
    isValid = false;
  } else if (monthInput < 1 || monthInput > 12) {
    setError(month, monthError, "Must be a valid month");
    isValid = false;
  }

  if (!year.value) {
    setError(year, yearError, "This field is required");
    isValid = false;
  } else if (yearInput < 1000 || yearInput > currentDate.getFullYear()) {
    setError(year, yearError, "Must be a valid year");
    isValid = false;
  } else if (inputDate > currentDate) {
    setError(year, yearError, "Must be a valid date");
    isValid = false;
  } else if (dayInput > new Date(yearInput, monthInput, 0).getDate()) {
    setError(day, dayError, "Must be a valid date");
    isValid = false;
  }

  // If validation passes, calculate and animate age display
  if (isValid) {
    let age = calculateAge(dayInput, monthInput, yearInput);
    animateCount(yearAnswer, age.years);
    animateCount(monthAnswer, age.months);
    animateCount(dayAnswer, age.days);
  }
});
