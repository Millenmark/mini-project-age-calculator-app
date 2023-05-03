const form = document.querySelector(".form")
const display = document.querySelector(".display")

const dayInput = document.querySelector("#day")
const monthInput = document.querySelector("#month")
const yearInput = document.querySelector("#year")

const dayError = document.getElementById("dayError")
const monthError = document.getElementById("monthError")
const yearError = document.getElementById("yearError")


form.addEventListener("submit", function (event) {
  event.preventDefault(); // prevent default form submission behavior
  const today = new Date(); // get today's date
  const birthDate = new Date(
    document.querySelector("#year").value,
    document.querySelector("#month").value - 1,
    document.querySelector("#day").value
  ); // create a new Date object based on user input

  // perform form validation
  let valid = true;

  // Define an array of input fields, their validation condition and error message
  const inputs = [
    { 
      field: yearInput, 
      isValid: birthDate < today, 
      errorMessage: "This year is not valid", 
      error: yearError 
    },
    { 
      field: monthInput, 
      isValid: monthInput.value <= 12, 
      errorMessage: "This month is not valid", 
      error: monthError 
    },
    { 
      field: dayInput, 
      isValid: birthDate.getDate() === parseInt(dayInput.value), 
      errorMessage: "This day is not valid", 
      error: dayError 
    },
  ];

  // Loop through the array and check each input
  inputs.forEach(input => {
    if (!input.field.value) {
      valid = false;
      input.field.style.borderColor = "red";
      input.error.innerText = "This field is required";
    } else if (!input.isValid) {
      valid = false;
      input.field.style.borderColor = "red";
      input.error.innerText = input.errorMessage;
    } else {
      input.field.style.borderColor = "";
      input.error.innerText = "";
    }
  });



  // if form is not valid, don't calculate age
  if (!valid) {
    display.children[0].children[0].textContent = "- -";
    display.children[1].children[0].textContent = "- -";
    display.children[2].children[0].textContent = "- -";
    return;
  }

  // calculate the age
  let age = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();
  let days = today.getDate() - birthDate.getDate();

  // if birth month is later than current month, or if birth month is the current month but birth day is later than current day, subtract one from age and add 12 to months
  if (months < 0 || (months === 0 && days < 0)) {
    age--;
    months += 12;
  }

  // update the display with the calculated age
  display.children[0].children[0].textContent = age;
  display.children[1].children[0].textContent = months;
  display.children[2].children[0].textContent = Math.abs(days);
});
