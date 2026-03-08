const billInput = document.getElementById("bill");
const peopleInput = document.getElementById("people");
const tipButtons = document.querySelectorAll(".tip");
const customTip = document.getElementById("customTip");

const tipPerPerson = document.getElementById("tipPerPerson");
const totalPerPerson = document.getElementById("totalPerPerson");

const resetBtn = document.getElementById("reset");

let tipPercent = 0;


tipButtons.forEach(button => {
button.addEventListener("click", () => {

tipPercent = button.dataset.tip;
calculate();

});
});


customTip.addEventListener("input", () => {

tipPercent = customTip.value;
calculate();

});


billInput.addEventListener("input", calculate);
peopleInput.addEventListener("input", calculate);


function calculate() {

let bill = parseFloat(billInput.value);
let people = parseInt(peopleInput.value);

if (!bill || !people || !tipPercent) return;

let tip = (bill * tipPercent) / 100;

let tipEach = tip / people;
let totalEach = (bill + tip) / people;

tipPerPerson.innerText = "$" + tipEach.toFixed(2);
totalPerPerson.innerText = "$" + totalEach.toFixed(2);

}


resetBtn.addEventListener("click", () => {

billInput.value = "";
peopleInput.value = "";
customTip.value = "";

tipPerPerson.innerText = "$0.00";
totalPerPerson.innerText = "$0.00";

tipPercent = 0;

});