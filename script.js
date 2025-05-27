var streak = window.localStorage.getItem("streak") || 0;
var maxStreak = window.localStorage.getItem("max_streak") || 0;

document.addEventListener("DOMContentLoaded", () => {
  const streakElement = document.getElementById("streak");
  const maxStreakElement = document.getElementById("max-streak");

  streakElement.textContent = `${streak}`;
  maxStreakElement.textContent = `${maxStreak}`;
});

const correctAnswer = () => {
  const streakElement = document.getElementById("streak");
  const maxStreakElement = document.getElementById("max-streak");

  streakElement.textContent = `${++streak}`;
  window.localStorage.setItem("streak", streak);

  if (streak > maxStreak) {
    maxStreak = streak;
    window.localStorage.setItem("max_streak", maxStreak);
    maxStreakElement.textContent = `${maxStreak}`;
  }

  window.location.reload();
};

const wrongAnswer = () => {
  window.localStorage.setItem("streak", 0);
  streak = 0;
  const streakElement = document.getElementById("streak");
  streakElement.textContent = `${streak}`;

  alert("Resposta incorreta! Sequência resetada.");
};

const getData = async () => {
  const response = await fetch("data.json");
  const data = await response.json();
  return data.sort(() => Math.random() - 0.5);
};

const renderData = (countriesData) => {
  const country = countriesData[0];
  const countryFlagUrl = `https://flagcdn.com/w320/${country.iso}.png`;

  const flagDisplay = document.getElementById("flag-display");
  flagDisplay.innerHTML = `<img src="${countryFlagUrl}" alt="Flag of ${country.name}" class="flag-image">`;

  const optionsContainer = document.getElementById("options-container");
  for (let i = 0; i < 5; i++) {
    const option = document.createElement("button");
    option.textContent = `[${countriesData[i].iso}] ${countriesData[i].name}`;
    option.onclick = countriesData[i].iso === country.iso ? correctAnswer : wrongAnswer;
    optionsContainer.appendChild(option);
  }

  const buttons = Array.from(optionsContainer.children);
  buttons.sort(() => Math.random() - 0.5);
  optionsContainer.innerHTML = "";
  buttons.forEach((btn) => optionsContainer.appendChild(btn));
};

getData().then(renderData);
