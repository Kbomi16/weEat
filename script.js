document.addEventListener("DOMContentLoaded", function () {
  fetch("EuljiroJMT.json")
    .then((response) => response.json())
    .then((data) => {
      const restaurantList = document.getElementById("restaurant-list");

      data.forEach((restaurant) => {
        const restaurantEl = document.createElement("div");
        restaurantEl.classList.add("restaurant-el");
        restaurantEl.innerHTML = `
        <p>${restaurant.type}</p>
              <h3>${restaurant.title}</h3>
                  <p class='famous-menu'>${restaurant["famous-menu"]}</p>
                  <p class='reference'>${restaurant.reference}</p>
                  <button onclick="${restaurant.link}" target="_blank">링크</button>
              `;
        restaurantList.appendChild(restaurantEl);
      });
    })
    .catch((error) => console.error("Error fetching JSON:", error));
});
