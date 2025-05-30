const STREAK_STORAGE_KEY = "flag_country_streak";
const MAX_STREAK_STORAGE_KEY = "flag_country_max_streak";

const getCountryFlagUrl = (iso) => `https://flagcdn.com/w320/${iso}.png`;

const correctAnswer = () => {
  const streakElement = document.getElementById("streak");
  const maxStreakElement = document.getElementById("max-streak");

  streakElement.textContent = `${++streak}`;
  window.localStorage.setItem(STREAK_STORAGE_KEY, streak);

  if (streak > maxStreak) {
    maxStreak = streak;
    window.localStorage.setItem(MAX_STREAK_STORAGE_KEY, maxStreak);
    maxStreakElement.textContent = `${maxStreak}`;
  }

  loadAll();
};

const wrongAnswer = () => {
  window.localStorage.setItem(STREAK_STORAGE_KEY, 0);
  streak = 0;
  const streakElement = document.getElementById("streak");
  streakElement.textContent = `${streak}`;

  alert("Resposta incorreta! Sequência resetada.");
};

const getData = async () => {
  if (countriesData.length > 0) {
    return countriesData.sort(() => Math.random() - 0.5);
  }
  const response = await fetch("../codes.json");
  const data = await response.json();
  countriesData = Object.keys(data).map((iso) => ({
    iso: iso.toLowerCase(),
    name: data[iso],
  }));
  countriesData = countriesData.sort(() => Math.random() - 0.5);
  return countriesData;
};

const renderData = (countriesData) => {
  const country = countriesData[0];

  const flagDisplay = document.getElementById("country-display");
  flagDisplay.textContent = `[${country.iso}] ${country.name}`;

  const optionsContainer = document.getElementById("options-container");
  optionsContainer.innerHTML = "";
  const buttons = [];

  for (let i = 0; i < 4; i++) {
    const option = document.createElement("button");
    option.innerHTML = `<img src="${getCountryFlagUrl(countriesData[i].iso)}" class="flag-image">`;
    option.onclick =
      countriesData[i].iso === country.iso ? correctAnswer : wrongAnswer;
    buttons.push(option);
  }

  buttons.sort(() => Math.random() - 0.5);
  optionsContainer.innerHTML = "";
  buttons.forEach((btn) => optionsContainer.appendChild(btn));
};

const loadAll = () => getData().then(renderData);

var streak = window.localStorage.getItem(STREAK_STORAGE_KEY) || 0;
var maxStreak = window.localStorage.getItem(MAX_STREAK_STORAGE_KEY) || 0;
var countriesData = [];

document.addEventListener("DOMContentLoaded", () => {
  const streakElement = document.getElementById("streak");
  const maxStreakElement = document.getElementById("max-streak");

  streakElement.textContent = `${streak}`;
  maxStreakElement.textContent = `${maxStreak}`;

  loadAll();
});
