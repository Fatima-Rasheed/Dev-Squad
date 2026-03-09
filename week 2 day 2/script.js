function calculateAge() {
  const dayInput = document.getElementById("day");
  const monthInput = document.getElementById("month");
  const yearInput = document.getElementById("year");

  const dayError = document.getElementById("dayError");
  const monthError = document.getElementById("monthError");
  const yearError = document.getElementById("yearError");

  const day = dayInput.value;
  const month = monthInput.value;
  const year = yearInput.value;

  const today = new Date();

  let isValid = true;

  dayInput.classList.remove("border-red-500");
  monthInput.classList.remove("border-red-500");
  yearInput.classList.remove("border-red-500");
  dayError.textContent = "";
  monthError.textContent = "";
  yearError.textContent = "";

  if (day < 1 || day > 31) {
    dayInput.classList.add("border-red-500");
    dayError.textContent = "Invalid day";
    isValid = false;
  }

  if (month < 1 || month > 12) {
    monthInput.classList.add("border-red-500");
    monthError.textContent = "Invalid month";
    isValid = false;
  }

  if (year > today.getFullYear()) {
    yearInput.classList.add("border-red-500");
    yearError.textContent = "Invalid year";
    isValid = false;
  }

  if (!isValid) return; 

  const birthDate = new Date(year, month - 1, day);

  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();
  let days = today.getDate() - birthDate.getDate();

  if (days < 0) {
    months--;
    const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    days += prevMonth.getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  document.getElementById("years").textContent = years;
  document.getElementById("months").textContent = months;
  document.getElementById("days").textContent = days;
}
Collapse




