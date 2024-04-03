const randomBtn = document.querySelector(".random-btn");
const foodType = document.querySelector("select");
const list = document.querySelector("#restaurant-list");
const restaurantList = document.getElementById("restaurant-list");

document.addEventListener("DOMContentLoaded", function () {
  fetch("EuljiroJMT.json")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((restaurant) => {
        const restaurantEl = document.createElement("div");
        restaurantEl.classList.add("restaurant-el");
        restaurantEl.innerHTML = `
        <p class="type">${restaurant.type}</p>
              <h3>${restaurant.title}</h3>
                  <p class='famous-menu'>${restaurant["famous-menu"]}</p>
                  <p class='reference'>${restaurant.reference}</p>
                  <button class="link-btn" onclick="window.open('${restaurant.link}')">🤤</button>`;
        restaurantList.appendChild(restaurantEl);
      });
    })
    .catch((error) => console.error("Error fetching JSON:", error));
});

foodType.addEventListener("change", () => {
  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }
  let foodTypeValue = foodType.value;
  fetch("EuljiroJMT.json")
    .then((response) => response.json())
    .then((data) => {
      if (foodTypeValue === "구분") {
        data.forEach((restaurant) => {
          const restaurantEl = document.createElement("div");
          restaurantEl.classList.add("restaurant-el");
          restaurantEl.innerHTML = `
          <p class="type">${restaurant.type}</p>
                <h3>${restaurant.title}</h3>
                    <p class='famous-menu'>${restaurant["famous-menu"]}</p>
                    <p class='reference'>${restaurant.reference}</p>
                    <button class="link-btn" onclick="window.open('${restaurant.link}')">🤤</button>`;
          restaurantList.appendChild(restaurantEl);
        });
      } else {
        let filteredData = data.filter((data) => data.type === foodTypeValue);
        filteredData.forEach((restaurant) => {
          const restaurantEl = document.createElement("div");
          restaurantEl.classList.add("restaurant-el");
          restaurantEl.innerHTML = `
        <p class="type">${restaurant.type}</p>
              <h3>${restaurant.title}</h3>
                  <p class='famous-menu'>${restaurant["famous-menu"]}</p>
                  <p class='reference'>${restaurant.reference}</p>
                  <button class="link-btn" onclick="window.open('${restaurant.link}')">🤤</button>`;
          restaurantList.appendChild(restaurantEl);
        });
      }
    });
});

randomBtn.addEventListener("click", () => {
  const els = document.querySelectorAll(".restaurant-el");
  els.forEach((element) => {
    if (element.classList.contains("active")) {
      element.classList.remove("active");
    }
  });

  const randomNum = Math.floor(Math.random() * els.length);
  els[randomNum].classList.add("active");
  const activeEl = document.querySelector(".active");

  activeEl.scrollIntoView({ behavior: "smooth", block: "center" });
});
