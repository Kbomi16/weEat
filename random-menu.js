const randomBtn = document.querySelector(".random-btn");
const foodType = document.querySelector("select");
const list = document.querySelector("#restaurant-list");
const restaurantList = document.getElementById("restaurant-list");

const fetchData = async (option) => {
  try {
    const response = await fetch("EuljiroJMT.json");
    const data = await response.json();
    let newData = [];
    if (option === "전체" || option === undefined) {
      newData = data;
    } else {
      newData = data.filter((data) => data.type === foodType.value);
    }
    newData.forEach((restaurant) => {
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
  } catch (error) {
    (error) => console.error("Error fetching JSON:", error);
  }
};

document.addEventListener("DOMContentLoaded", fetchData());

foodType.addEventListener("change", () => {
  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }
  let foodTypeValue = foodType.value;
  fetchData(foodTypeValue);
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
