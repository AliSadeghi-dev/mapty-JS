"use strict";

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector(".form");
const containerWorkouts = document.querySelector(".workouts");
const inputType = document.querySelector(".form__input--type");
const inputDistance = document.querySelector(".form__input--distance");
const inputDuration = document.querySelector(".form__input--duration");
const inputCadence = document.querySelector(".form__input--cadence");
const inputElevation = document.querySelector(".form__input--elevation");
let map;
let mapEvent;

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    function () {
      const coords = [35.321468, 51.650661];
      map = L.map("map").setView(coords, 14);

      L.tileLayer("https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      map.on("click", function (mapE) {
        mapEvent = mapE;
        form.classList.remove("hidden");
        inputDistance.focus();

        // const { lat } = e.latlng;
        // const { lng } = e.latlng;

        // L.marker([lat, lng])
        //   .addTo(map)
        //   .bindPopup(
        //     L.popup({
        //       maxWidth: 250,
        //       minWidth: 100,
        //       autoClose: false,
        //       closeOnClick: false,
        //       className: "running-popup",
        //     })
        //   )
        //   .setPopupContent("Your current location")
        //   .openPopup();
      });
    },
    function () {
      alert("Could not get your current position.");
    }
  );
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  inputDistance.value =
    inputDuration.value =
    inputCadence.value =
    inputElevation.value =
      "";

  const { lat } = mapEvent.latlng;
  const { lng } = mapEvent.latlng;
  L.marker([lat, lng])
    .addTo(map)
    .bindPopup(
      L.popup({
        maxWidth: 250,
        minWidth: 100,
        autoClose: false,
        closeOnClick: false,
        className: "running-popup",
      })
    )
    .setPopupContent("Your current location")
    .openPopup();
});

inputType.addEventListener("change", function (e) {
  inputElevation.closest(".form__row").classList.toggle("form__row--hidden");
  inputCadence.closest(".form__row").classList.toggle("form__row--hidden");
});
