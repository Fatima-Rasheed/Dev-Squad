const pizzas = [
  {
    id: 1,
    name: "Margherita",
    image: "assets/pizza (4).png",
    price: 12,
    quantity: 1
  },
  {
    id: 2,
    name: "Polo",
    image: "/assets/pizza (2).png",
    price: 14,
    quantity: 1
  },
  {
    id: 3,
    name: "Meat Feast",
    image: "assets/pizza (3).png",
    price: 16,
    quantity: 1
  },
  {
    id:4,
    name:"Hawaiin",
    image:"assets/pizza (5).png",
    price:15,
    quantity:1
  },
  {
    id:5,
    name:"Toscana",
    image:"assets/pizza (6).png",
    price:15,
    quantity:1  
  }
];
const container = document.getElementById("pizzaContainer");
const totalPrice = document.getElementById("total-price");

function renderPizzas() {
  container.innerHTML = "";
  let total = 0;

  pizzas.forEach((pizza, index) => {
    total += pizza.price * pizza.quantity;

    const card = document.createElement("div");
    card.className =
      "flex items-center justify-between bg-gray-200 rounded-xl px-4 py-3  hover:bg-[#0c1b33]";

    card.innerHTML = `
      <div class="flex items-center gap-2">
        <img src="${pizza.image}" 
             class="w-16 h-16  object-cover" />
        <div>
          <h3 class="font-bold">${pizza.name}</h3>
          <p class="text-sm text-gray-500">£${pizza.price}</p>
        </div>
      </div>

      <div class="flex items-center gap-3">
        <button onclick="decreaseQty(${index})"
          class="w-8 h-8 bg-black text-white rounded-full">
          -
        </button>

        <span class="font-bold">${pizza.quantity}</span>

        <button onclick="increaseQty(${index})"
          class="w-8 h-8 bg-black text-white rounded-full">
          +
        </button>
      </div>
    `;

    container.appendChild(card);
  });

  totalPrice.textContent = "£" + total.toFixed(2);
}

function increaseQty(index) {
  pizzas[index].quantity++;
  renderPizzas();
}

function decreaseQty(index) {
  if (pizzas[index].quantity > 0) {
    pizzas[index].quantity--;
    renderPizzas();
  }
}

function closeModal() {
  document.body.innerHTML = "<h1 class='text-center mt-20 text-2xl'>Modal Closed</h1>";
}

renderPizzas();