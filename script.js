const form = document.querySelector(".form");
const display = document.querySelector(".display");

const dayInput = document.querySelector("#day")
const monthInput = document.querySelector("#month")
const yearInput = document.querySelector("#year")

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

  if (!yearInput.value || !monthInput.value || !dayInput.value) {
    valid = false;
    [yearInput, monthInput, dayInput].forEach(input => input.style.borderColor = "red")
  } else {
    [yearInput, monthInput, dayInput].forEach(input => input.style.borderColor = "")
  }

  // check if day is valid
  if (birthDate.getDate() !== parseInt(document.querySelector("#day").value)) {
    valid = false;
    document.querySelector("#day").style.borderColor = "red";
  } else {
    document.querySelector("#day").style.borderColor = "";
  }

  // check if month is valid
  if ((birthDate.getMonth() + 1) !== parseInt(document.querySelector("#month").value)) {
    valid = false;
    document.querySelector("#month").style.borderColor = "red";
  } else {
    document.querySelector("#month").style.borderColor = "";
  }

  // check if year is in the past
  if (birthDate >= today) {
    valid = false;
    document.querySelector("#year").style.borderColor = "red";
  }

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
  display.children[2].children[0].textContent = days;
});
