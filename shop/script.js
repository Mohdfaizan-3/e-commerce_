const filtersContainer = document.querySelector(".filters");
const itemContainer = document.querySelector(".items");
const searchInput = document.querySelector("#searchInput");
const filterButton = document.querySelector("#filter-button");
const checkedCheckboxes = document.querySelectorAll('input[type="checkbox"]');
const saveConfirmed = document.getElementById("display");

const rangeInput = document.getElementById("range");
let newData = [];
let currentArray = [];
// fetching data
async function getData() {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    const data = await response.json();
    newData = await Promise.all(
      data.map(async (product) => {
        const color = await generateRandomArray(["red", "blue", "black"]);
        const sizes = await generateRandomArray(["s", "l", "m", "xl"]);
        return { ...product, color, sizes };
      })
    );
    // console.log(newData);
    itemContainer.textContent = "";
    updateDOM("All");
  } catch (error) {
    console.error(error);
  }
}

function generateRandomArray(arr) {
  const randomLength = Math.floor(Math.random() * arr.length);
  return arr[randomLength];
}

//displaying data

function display(newArray) {
  itemContainer.textContent = "";
  console.log("newArray", newArray);
  newArray.forEach((product) => {
    const item = document.createElement("div");
    item.setAttribute("class", "item");

    const img = document.createElement("img");
    img.setAttribute("src", `${product.image}`);

    const info = document.createElement("div");
    info.setAttribute("class", "info");
    const title = document.createElement("div");
    title.setAttribute("id", `${product.id}`);
    title.style.fontWeight = "bold";
    title.style.marginBottom = "1em";
    title.appendChild(document.createTextNode(`${product.title}`));
    const row1 = document.createElement("div");
    row1.setAttribute("class", "row");
    const price = document.createElement("div");
    price.setAttribute("class", "price");
    price.appendChild(document.createTextNode(`Price: ${product.price}`));
    const size = document.createElement("div");
    size.setAttribute("class", "sized");
    size.appendChild(document.createTextNode(`Size: ${product.sizes}`));
    row1.append(price, size);
    const colors = document.createElement("div");
    colors.setAttribute("class", "colors");
    const row = document.createElement("div");
    row.setAttribute("class", "row");
    row.innerText = "Colors: ";
    const circle = document.createElement("div");

    circle.setAttribute("class", "circle");
    circle.style.backgroundColor = `${product.color}`;
    row.append(circle);
    colors.append(row);
    const rating = document.createElement("div");
    rating.setAttribute("class", "row");
    rating.innerText = `Rating: ${product.rating.rate}`;
    info.append(title, row1, colors, rating);

    const button = document.createElement("button");
    button.setAttribute("id", "addBtn");
    button.innerText = "Add To Cart";

    item.append(img, info, button);
    itemContainer.appendChild(item);
  });
}

function addToCart(product) {
  let cartItems = JSON.parse(localStorage.getItem("productsInCart")) || {};

  if (cartItems[product.id]) {
    cartItems[product.id].quantity += 1;
  } else {
    cartItems[product.id] = { ...product, quantity: 1 };
  }

  localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

itemContainer.addEventListener("click", function (event) {
  saveConfirmed.hidden = false;
  setTimeout(() => {
    saveConfirmed.hidden = true;
  }, 2000);
  if (event.target && event.target.id === "addBtn") {
    const item = event.target.parentElement;
    console.log(item);
    const id = item.querySelector(".info div:first-child").id;

    const img = item.querySelector("img").src;
    const title = item.querySelector(".info div:first-child").textContent;
    const priceValue = item.querySelector(".price").textContent;//"Price: 109.95"
    const price = parseFloat(priceValue.split("Price: ")[1]);//109.95
    const sizeVal = item.querySelector(".sized").textContent;  // 'Size: s"
    const size = sizeVal.split(":")[1].trim(); // "s"
    const color = item.querySelector(".circle").style.backgroundColor;
    console.log(price);

    const product = { id, title, price, size, color, img };
    console.log("asf", product);
    addToCart(product);
  }
});

// displaying data

function displayData(page, newData, filteredData = []) {
  currentArray = sortDataByCategory(page, newData);

  if (filteredData.length > 0) {
    currentArray = filteredData;
  }
  console.log(currentArray);
  display(currentArray);
}

// update dom

function updateDOM(page, searchTerm = "") {
  //searchTerm is initialized to an empty string by default to allow
  //calling the function without passing
  //a searchTerm parameter
  itemContainer.textContent = "";
  const filteredData = newData.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  displayData(page, filteredData);
}

// onclick of filter container to choose mens,
// women , electronics
filtersContainer.addEventListener("click", (event) => {
  if (event.target.classList.contains("filter")) {
    // A filter button was clicked
    const filterName = event.target.textContent;
    console.log(`Filter clicked: ${filterName}`);
    if (filterName == "Mens") {
      updateDOM("Mens");
    } else if (filterName == "Womens") {
      updateDOM("Womens");
    } else if (filterName == "Jewellery") {
      updateDOM("Jewellery");
    } else if (filterName == "Electronics") {
      updateDOM("Electronics");
    } else {
      updateDOM("All");
    }
  }
});

// sort on category

function sortDataByCategory(category, data) {
  if (category === "Mens") {
    return data.filter((product) => product.category === "men's clothing");
  } else if (category === "Womens") {
    return data.filter((product) => product.category === "women's clothing");
  } else if (category === "Jewellery") {
    return data.filter((product) => product.category === "jewelery");
  } else if (category === "Electronics") {
    return data.filter((product) => product.category === "electronics");
  } else {
    return data;
  }
}

function filterProducts() {
  const selectedCheckboxes = Array.from(checkedCheckboxes).filter(
    (checkbox) => checkbox.checked
  );

  let arr;
  let arr1;
  arr = selectedCheckboxes.map((val) => {
    console.log("val", val);
    if (val.name === "sizes" || val.name === "color") {
      return val.id;
    }
  });

  arr1 = selectedCheckboxes.map((val) => {
    if (val.name !== "sizes" && val.name !== "color") {
      return val.id;
    }
  });

  let filteredProducts;
  if (!arr.some((val) => val === undefined)) {
    console.log("arr", arr);
    filteredProducts = currentArray.filter(
      (product) => arr.includes(product.color) || arr.includes(product.sizes)
    );
  }

  if (!arr1.some((val) => val === undefined)) {
    console.log("arr1", arr1);
    filteredProducts = currentArray.filter((product) => {
      let value = product.price;
      // console.log(value)
      for (let i = 0; i < arr1.length; i++) {
        const [min, max] = arr1[i].split("-");
        if (value >= parseInt(min) && value <= parseInt(max)) {
          return true;
        }
      }
      return false;
    });
  }

  console.log(filteredProducts);
  if (!filteredProducts.some((val) => val === undefined)) {
    display(filteredProducts);
  }
}

//search eventlistener
searchInput.addEventListener("input", () => {
  updateDOM("All", searchInput.value);
});

//filter items based on checkbox and range
checkedCheckboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", filterProducts);
});

// on load

getData();
