var button = document.getElementById("button");

button.addEventListener("click", calculate);

function calculate() {
  var num1 = document.getElementById("num1").value;
  var num2 = document.getElementById("num2").value;
  var calculation = num1 * num2;
  var place = document.getElementById("result");
  place.innerHTML = "Calculation: " + num1 + " x " + num2 + " = " + calculation;
}