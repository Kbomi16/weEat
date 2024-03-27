const section = document.querySelector("main section");

document.addEventListener("DOMContentLoaded", function () {
  fetch("EuljiroJMT.json")
    .then((response) => response.json())
    .then((data) => {
      const restaurantList = document.getElementById("restaurant-list");

      data.forEach((restaurant) => {
        const restaurantEl = document.createElement("div");
        restaurantEl.classList.add("restaurant-el");
        restaurantEl.innerHTML = `
        <p class="type">${restaurant.type}</p>
              <h3>${restaurant.title}</h3>
                  <p class='famous-menu'>${restaurant["famous-menu"]}</p>
                  <p class='reference'>${restaurant.reference}</p>
                  <button class="link-btn" onclick="window.open('${restaurant.link}')">🤤</button>
              `;
        restaurantList.appendChild(restaurantEl);
      });
    })
    .catch((error) => console.error("Error fetching JSON:", error));
});
