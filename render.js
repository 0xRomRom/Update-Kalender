let month = "Januari";

let currentDates = {};

window.addEventListener("DOMContentLoaded", async () => {
  const fetcher = await fetch(
    `https://prompt-maker-default-rtdb.europe-west1.firebasedatabase.app/calendar.json`
  );
  const data = await fetcher.json();
  currentDates = await data;
  renderCalendar(month);
});

const maandDropdown = document.querySelector(".maand-select");
maandDropdown.addEventListener("change", (e) => {
  month = e.target.value;
  renderCalendar(month);
});

const submitButton = document.querySelector(".submit");
submitButton.addEventListener("click", () => {
  fetch(
    `https://prompt-maker-default-rtdb.europe-west1.firebasedatabase.app/calendar.json`,
    {
      method: "PUT",
      body: JSON.stringify(currentDates),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  alert("Data bijgewerkt");
});

const calendarGrid = document.querySelector(".calendar-grid");
const buttonGrid = document.querySelector(".button-grid");

const renderCalendar = (index) => {
  let monthLength = Object.keys(currentDates[index]).length;
  calendarGrid.innerHTML = "";
  buttonGrid.innerHTML = "";

  for (let i = 1; i < monthLength; i++) {
    //Date
    let date = document.createElement("div");
    date.classList.add("date-item");
    date.dataset.datum = i + " " + index;

    if (currentDates[index][i] === false) {
      date.classList.add("vrij");
    } else {
      date.classList.add("bezet");
    }
    date.textContent = i;
    calendarGrid.append(date);

    //Button

    let button = document.createElement("button");
    button.dataset.btn = i;
    button.classList.add("toggle-btn");
    button.textContent = "Wijzig";
    buttonGrid.append(button);
  }
};

buttonGrid.addEventListener("click", (e) => {
  if (currentDates[month][+e.target.dataset.btn] === false) {
    currentDates[month][+e.target.dataset.btn] = true;
    renderCalendar(month);
    return;
  }
  if (currentDates[month][+e.target.dataset.btn] === true) {
    currentDates[month][+e.target.dataset.btn] = false;
    renderCalendar(month);
  }
});
