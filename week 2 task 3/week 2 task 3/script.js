// Data for burgers

const burgers = [
  { name: "Royal Cheese Burger with extra Fries", description: "1 McChicken™, 1 Big Mac™, 1 Royal Cheeseburger, 3 medium sized French Fries, 3 cold drinks", price: 23.10, image: "assets/img (2).png" },
  { name: "The classics for 3", description: "1 McChicken™, 1 Big Mac™, 1 Royal Cheeseburger, 3 medium sized French Fries, 3 cold drinks", price: 23.10, image: "assets/img (2).png" },
  { name: "The classics for 3", description: "1 McChicken™, 1 Big Mac™, 1 Royal Cheeseburger, 3 medium sized French Fries, 3 cold drinks", price: 23.10, image: "assets/img (2).png" },
  { name: "The classics for 3", description: "1 McChicken™, 1 Big Mac™, 1 Royal Cheeseburger, 3 medium sized French Fries, 3 cold drinks", price: 23.10, image: "assets/img (2).png" },
  { name: "The classics for 3", description: "1 McChicken™, 1 Big Mac™, 1 Royal Cheeseburger, 3 medium sized French Fries, 3 cold drinks", price: 23.10, image: "assets/img (2).png" },
  { name: "The classics for 3", description: "1 McChicken™, 1 Big Mac™, 1 Royal Cheeseburger, 3 medium sized French Fries, 3 cold drinks", price: 23.10, image: "assets/img (2).png" }
];

// Data for fries
const fries = [
  { name: "Royal Cheese Burger with extra Fries", description: "1 McChicken™, 1 Big Mac™, 1 Royal Cheeseburger, 3 medium sized French Fries, 3 cold drinks", price: 2.99, image: "assets/img (1).png" },
  { name: "The classics for 3", description: "1 McChicken™, 1 Big Mac™, 1 Royal Cheeseburger, 3 medium sized French Fries, 3 cold drinks", price: 23.49, image: "assets/img (1).png" },
  { name: "The classics for 3", description: "1 McChicken™, 1 Big Mac™, 1 Royal Cheeseburger, 3 medium sized French Fries, 3 cold drinks", price: 23.99, image: "assets/img (1).png" },
  { name: "The classics for 3", description: "1 McChicken™, 1 Big Mac™, 1 Royal Cheeseburger, 3 medium sized French Fries, 3 cold drinks", price: 24.49, image: "assets/img (1).png" },
  { name: "The classics for 3", description: "1 McChicken™, 1 Big Mac™, 1 Royal Cheeseburger, 3 medium sized French Fries, 3 cold drinks", price: 23.49, image: "assets/img (1).png" },
  { name: "The classics for 3", description: "1 McChicken™, 1 Big Mac™, 1 Royal Cheeseburger, 3 medium sized French Fries, 3 cold drinks", price: 23.29, image: "assets/img (1).png" }
];
// Data for fries
const coldDrinks = [
  { name: "Royal Cheese Burger with extra Fries", description: "1 McChicken™, 1 Big Mac™, 1 Royal Cheeseburger, 3 medium sized French Fries, 3 cold drinks", price: 2.99, image: "assets/img (7).png" },
  { name: "The classics for 3", description: "1 McChicken™, 1 Big Mac™, 1 Royal Cheeseburger, 3 medium sized French Fries, 3 cold drinks", price: 23.49, image: "assets/img (11).png" },
  { name: "The classics for 3", description: "1 McChicken™, 1 Big Mac™, 1 Royal Cheeseburger, 3 medium sized French Fries, 3 cold drinks", price: 23.99, image: "assets/img (10).png" },
  { name: "The classics for 3", description: "1 McChicken™, 1 Big Mac™, 1 Royal Cheeseburger, 3 medium sized French Fries, 3 cold drinks", price: 23.49, image: "assets/img (9).png" },
  { name: "The classics for 3", description: "1 McChicken™, 1 Big Mac™, 1 Royal Cheeseburger, 3 medium sized French Fries, 3 cold drinks", price: 23.49, image: "assets/img (8).png" },
  { name: "The classics for 3", description: "1 McChicken™, 1 Big Mac™, 1 Royal Cheeseburger, 3 medium sized French Fries, 3 cold drinks", price: 23.29, image: "assets/img (10).png" }
];

// Call after DOM ready
document.addEventListener("DOMContentLoaded", () => {
  renderPizzas();
});
// Function to display items (burgers, fries, etc.)
function displayItems(items, containerId) {
  const container = document.getElementById(containerId);
  let html = "";

  items.forEach(item => {
    html += `
      <div class="bg-white rounded-xl shadow-md p-6 mx-2 flex flex-col md:flex-row items-center justify-between">
        <div class="flex-1">
          <h3 class="font-bold text-lg">${item.name}</h3>
          <p class="text-gray-600">${item.description}</p>
          <p class="font-bold mt-2">$${item.price.toFixed(2)}</p>
        </div>
        <div class="relative">
          <img src="${item.image}" alt="${item.name}" class="w-32 h-36 object-cover rounded-lg">
    
           <img src="assets/img (5).png" alt="icon" class="w-12 h-12 bg-white absolute bottom-0 right-0 border-8 border-white rounded-t-xl">
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

// Display both sections
displayItems(burgers, "burgerContainer");
displayItems(fries, "friesContainer");
displayItems(coldDrinks, "coldDrinksContainer");
function showSlide(slide) {
  const slider = document.getElementById("reviewSlider");

  if (slide === 1) {
    slider.style.transform = "translateX(0%)";
  }

  if (slide === 2) {
    slider.style.transform = "translateX(-100%)";
  }
}
const pizzas = [
  {
    id: 1,
    name: "Margherita",
    image: "assets/pizza (2).png",
    price: 12,
    quantity: 1
  },
  {
    id: 2,
    name: "Polo",
    image: "assets/pizza (2).png",
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
// Wrap your execution in this listener
document.addEventListener("DOMContentLoaded", () => {
  // Display all sections
  displayItems(burgers, "burgerContainer");
  displayItems(fries, "friesContainer");
  displayItems(coldDrinks, "coldDrinksContainer");
  
  // Initial pizza render
  renderPizzas();
});let cartItems = [];
let cartCount = 0;

function addToCart(name, price, image) {
  // Check if item already exists
  const existing = cartItems.find(item => item.name === name);
  if (existing) {
    existing.quantity += 1;
  } else {
    cartItems.push({ name, price, image, quantity: 1 });
  }

  // Update cart count badge
  cartCount += 1;
  document.getElementById('cartCount').textContent = cartCount;

  // Optional: log cart items
  console.log(cartItems);
}

// Function to render cart modal (optional)
function renderCartModal() {
  const container = document.getElementById('cartContainer');
  container.innerHTML = '';
  let total = 0;

  cartItems.forEach(item => {
    total += item.price * item.quantity;
    const div = document.createElement('div');
    div.className = 'flex items-center justify-between mb-2';
    div.innerHTML = `
      <div class="flex items-center gap-2">
        <img src="${item.image}" class="w-12 h-12 rounded" />
        <div>
          <h4 class="font-bold">${item.name}</h4>
          <p>${item.quantity} x £${item.price}</p>
        </div>
      </div>
    `;
    container.appendChild(div);
  });

  document.getElementById('totalPrice').textContent = '£' + total.toFixed(2);
}const cartButton = document.querySelector('button[onclick="addToCart()"]');
const cartModal = document.getElementById('cartModal');

cartButton.addEventListener('click', () => {
  cartModal.classList.toggle('hidden');
  renderCartModal();
});