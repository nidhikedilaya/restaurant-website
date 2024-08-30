$(document).ready(function ($) {
  "use strict";

  var book_table = new Swiper(".book-table-img-slider", {
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    speed: 2000,
    effect: "coverflow",
    coverflowEffect: {
      rotate: 3,
      stretch: 2,
      depth: 100,
      modifier: 5,
      slideShadows: false,
    },
    loopAdditionSlides: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });

  var team_slider = new Swiper(".team-slider", {
    slidesPerView: 3,
    spaceBetween: 30,
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    speed: 2000,

    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      0: {
        slidesPerView: 1.2,
      },
      768: {
        slidesPerView: 2,
      },
      992: {
        slidesPerView: 3,
      },
      1200: {
        slidesPerView: 3,
      },
    },
  });

  jQuery(".filters").on("click", function () {
    jQuery("#menu-dish").removeClass("bydefault_show");
  });
  $(function () {
    var filterList = {
      init: function () {
        $("#menu-dish").mixItUp({
          selectors: {
            target: ".dish-box-wp",
            filter: ".filter",
          },
          animation: {
            effects: "fade",
            easing: "ease-in-out",
          },
          load: {
            filter: ".all, .breakfast, .lunch, .dinner",
          },
        });
      },
    };
    filterList.init();
  });

  jQuery(".menu-toggle").click(function () {
    jQuery(".main-navigation").toggleClass("toggled");
  });

  jQuery(".header-menu ul li a").click(function () {
    jQuery(".main-navigation").removeClass("toggled");
  });

  gsap.registerPlugin(ScrollTrigger);

  var elementFirst = document.querySelector(".site-header");
  ScrollTrigger.create({
    trigger: "body",
    start: "30px top",
    end: "bottom bottom",

    onEnter: () => myFunction(),
    onLeaveBack: () => myFunction(),
  });

  function myFunction() {
    elementFirst.classList.toggle("sticky_head");
  }

  var scene = $(".js-parallax-scene").get(0);
  var parallaxInstance = new Parallax(scene);
});

jQuery(window).on("load", function () {
  $("body").removeClass("body-fixed");

  //activating tab of filter
  let targets = document.querySelectorAll(".filter");
  let activeTab = 0;
  let old = 0;
  let dur = 0.4;
  let animation;

  for (let i = 0; i < targets.length; i++) {
    targets[i].index = i;
    targets[i].addEventListener("click", moveBar);
  }

  // initial position on first === All
  gsap.set(".filter-active", {
    x: targets[0].offsetLeft,
    width: targets[0].offsetWidth,
  });

  function moveBar() {
    if (this.index != activeTab) {
      if (animation && animation.isActive()) {
        animation.progress(1);
      }
      animation = gsap.timeline({
        defaults: {
          duration: 0.4,
        },
      });
      old = activeTab;
      activeTab = this.index;
      animation.to(".filter-active", {
        x: targets[activeTab].offsetLeft,
        width: targets[activeTab].offsetWidth,
      });

      animation.to(
        targets[old],
        {
          color: "#0d0d25",
          ease: "none",
        },
        0
      );
      animation.to(
        targets[activeTab],
        {
          color: "#fff",
          ease: "none",
        },
        0
      );
    }
  }
});
// main.js

document.addEventListener("DOMContentLoaded", () => {
  // Expose the addToCart function globally
  window.addToCart = function (itemName, itemPrice) {
    console.log(`Adding item to cart: ${itemName}, Rs. ${itemPrice}`);
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push({ name: itemName, price: itemPrice });
    localStorage.setItem("cart", JSON.stringify(cart));
    console.log(`Cart after addition: ${JSON.stringify(cart)}`);
    updateCartCount();
  };

  // Function to update cart count in the header
  function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    document.getElementById("cart-count").textContent = cart.length;
    console.log(`Updated cart count: ${cart.length}`);
  }

  // Function to display cart items in cart.html
  function displayCartItems() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartItemsContainer = document.getElementById("cart-items");
    let cartTotal = 0;

    cartItemsContainer.innerHTML = "";
    cart.forEach((item) => {
      cartItemsContainer.innerHTML += `<p>${item.name} - Rs. ${item.price}</p>`;
      cartTotal += item.price;
    });
    document.getElementById("total-price").textContent = cartTotal;
    console.log(`Cart items displayed: ${JSON.stringify(cart)}`);
    console.log(`Total cart price: Rs. ${cartTotal}`);
  }

  // Function to display checkout items in checkout.html
  function displayCheckoutItems() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let checkoutItemsContainer = document.getElementById("checkout-items");
    let checkoutTotal = 0;

    checkoutItemsContainer.innerHTML = "";
    cart.forEach((item) => {
      checkoutItemsContainer.innerHTML += `<p>${item.name} - Rs. ${item.price}</p>`;
      checkoutTotal += item.price;
    });
    document.getElementById("checkout-total").textContent = checkoutTotal;
    console.log(`Checkout items displayed: ${JSON.stringify(cart)}`);
    console.log(`Total checkout price: Rs. ${checkoutTotal}`);
  }

  // Check the current page and call appropriate functions
  if (window.location.pathname.endsWith("cart.html")) {
    displayCartItems();
  } else if (window.location.pathname.endsWith("checkout.html")) {
    displayCheckoutItems();
  } else {
    updateCartCount();
  }
});

// FRONTEND CODE (Client-side JavaScript)
// This code will run in the browser, not on the server

// Example function to place an order (triggered when a user places an order)
async function placeOrderFromFrontend() {
  // Retrieve cart data from local storage
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Extract food item names, quantities, and calculate total price
  const foodItems = cart.map((item) => item.name);
  const quantities = cart.map((item) => 1); // Assuming each item is added individually, set quantity to 1
  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  console.log("Food Items:", foodItems); // Add this line to debug
  console.log("Quantities:", quantities); // Add this line to debug
  console.log("Total Price:", totalPrice); // Add this line to debug

  const orderData = {
    foodItems,
    quantities,
    totalPrice,
  };

  try {
    // Send the order data to the backend endpoint
    const response = await fetch("http://localhost:3000/place-order", {
      // Ensure correct URL
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    });

    const result = await response.json();
    if (response.ok) {
      console.log(result.message); // Output success message

      // Optionally clear the cart from local storage and update the UI
      localStorage.removeItem("cart");
      updateCartCount(); // Update cart count to reflect cleared cart
      alert("Order placed successfully!");
    } else {
      console.error(result.message); // Handle failure
    }
  } catch (error) {
    console.error("Error sending order:", error);
  }
}

// Example event listener for a button click to trigger order placement
document.addEventListener("DOMContentLoaded", () => {
  const orderButton = document.getElementById("placeOrderButton"); // Ensure this button exists in your HTML
  if (orderButton) {
    orderButton.addEventListener("click", placeOrderFromFrontend);
  }
});
