const container = document.querySelector(".container");
const cartContainer = document.querySelector(".Container");
const totalContainer = document.querySelector(".total");
const products = JSON.parse(localStorage.getItem("productsInCart"));
const checkoutBtn = document.querySelector(".checkout-btn");
const div = document.querySelector(".div");
checkoutBtn.addEventListener("click", () => {
  const products = JSON.parse(localStorage.getItem("productsInCart"));
  if (products !== null) {
    window.location.href = "/razorpay/index.html";
  } else {
    div.style.display = "flex";

    setTimeout(() => {
      div.style.display = "none";
    }, 1000);
  }
});
// totalContainer.textContent = 0;
// console.log(container);
display(products);
displayCartContainer(products);
calculateSum();

function displayCartContainer(products) {
  cartContainer.innerText = "";
  let arr = Object.values(products);
  console.log("d", arr);
  arr.forEach((product) => {
    let div = document.createElement("div");
    div.setAttribute("class", "cart");
    let title = document.createElement("div");
    title.setAttribute("class", "cartTitle");
    title.append(`${product.title} | `);
    //console.log(title)
    let price = document.createElement("div");
    price.append(`${product.price} | `);

    let quantity = document.createElement("div");
    quantity.append(`${product.quantity} | `);

    let total = document.createElement("div");
    total.append(`${product.quantity * product.price}`);
    div.append(title, price, quantity, total);
    cartContainer.appendChild(div);
  });
  // calculateSum();
}

function display(products) {
  // console.log("newArray", products);
  container.innerText = "";
  for (let product in products) {
    const item = document.createElement("div");
    item.setAttribute("class", "item");

    const img = document.createElement("img");
    console.log(products[product].img);
    img.setAttribute("src", `${products[product].img}`);

    const info = document.createElement("div");
    info.setAttribute("class", "info");
    const title = document.createElement("div");
    title.setAttribute("id", `${products[product].id}`);
    title.style.fontWeight = "bold";
    title.style.marginBottom = "1em";
    title.appendChild(document.createTextNode(`${products[product].title}`));
    const row1 = document.createElement("div");
    row1.setAttribute("class", "row");
    const price = document.createElement("div");
    price.setAttribute("class", "price");
    price.appendChild(
      document.createTextNode(`Price: ${products[product].price}`)
    );
    const size = document.createElement("div");
    size.setAttribute("class", "sized");
    size.appendChild(
      document.createTextNode(`Size: ${products[product].size}`)
    );
    row1.append(price, size);
    const colors = document.createElement("div");
    colors.setAttribute("class", "colors");
    const row = document.createElement("div");
    row.setAttribute("class", "row");
    row.innerText = "Colors: ";
    const circle = document.createElement("div");

    circle.setAttribute("class", "circle");
    circle.style.backgroundColor = `${products[product].color}`;
    row.append(circle);
    colors.append(row);

    const quantity = document.createElement("p");
    quantity.innerText = `${products[product].quantity}`;
    info.append(title, row1, colors, quantity);

    const divBtn = document.createElement("div");
    divBtn.style.display = "flex";
    const incrementButton = document.createElement("button");
    incrementButton.setAttribute("id", "incrementBtn");
    incrementButton.style.margin = "5px";
    incrementButton.innerText = "+";

    const decrementButton = document.createElement("button");
    decrementButton.setAttribute("id", "decrementBtn");
    decrementButton.style.margin = "5px";

    decrementButton.innerText = "-";

    divBtn.append(decrementButton, incrementButton);

    // const button = document.createElement("button");
    // button.setAttribute("id", "removeBtn");
    // button.setAttribute("data-id", `${products[product].id}`);
    // button.innerText = "Remove from cart";

    item.append(img, info, divBtn);
    container.appendChild(item);
  }
  displayCartContainer(products);
  calculateSum(products);
}

function calculateSum() {
  const products = JSON.parse(localStorage.getItem("productsInCart"));
  let arr = Object.values(products);
  //console.log(arr)
  let sum = arr.reduce((acc, val) => {
    return (acc += parseInt(val.quantity) * parseFloat(val.price));
  }, 0);
  localStorage.setItem("total", JSON.stringify(sum));
  totalContainer.innerText = "";
  totalContainer.append(sum);
  displayCartContainer(arr);
  console.log("sum", sum);
}

container.addEventListener("click", function (event) {
  const target = event.target;
  const parent = target.parentNode.parentNode;
  //   console.log("parent", parent, "target", target);

  // Check if increment button was clicked
  if (target.id === "incrementBtn") {
    const quantity = parent.querySelector("p");
    const currentQuantity = parseInt(quantity.innerText);
    quantity.innerText = currentQuantity + 1;

    // Update quantity in local storage
    const products = JSON.parse(localStorage.getItem("productsInCart"));
    // const arr = [...products]; will not work
    //const arr =Object.values(products); will work
    //console.log('ds',arr)
    const updatedProducts = Object.values(products).map((product) => {
      if (product.id === parent.querySelector(".info > div").id) {
        product.quantity = currentQuantity + 1;
      }
      return product;
    });
    localStorage.setItem("productsInCart", JSON.stringify(updatedProducts));
    display(updatedProducts);
  }

  // Check if decrement button was clicked
  if (target.id === "decrementBtn") {
    const quantity = parent.querySelector("p");
    const currentQuantity = parseInt(quantity.innerText);

    // Make sure quantity does not go below 1
    if (currentQuantity > 1) {
      quantity.innerText = currentQuantity - 1;

      // Update quantity in local storage
      const products = JSON.parse(localStorage.getItem("productsInCart"));
      const updatedProducts = Object.values(products).map((product) => {
        if (product.id === parent.querySelector(".info > div").id) {
          product.quantity = currentQuantity - 1;
        }
        return product;
      });
      localStorage.setItem("productsInCart", JSON.stringify(updatedProducts));
      display(updatedProducts);
    } else {
      // Remove item from local storage
      const products = JSON.parse(localStorage.getItem("productsInCart"));
      const updatedProducts = Object.values(products).filter(
        (product) => product.id !== parent.querySelector(".info > div").id
      );
      localStorage.setItem("productsInCart", JSON.stringify(updatedProducts));
      display(updatedProducts);
    }
  }
});


