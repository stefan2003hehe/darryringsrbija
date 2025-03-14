const products = [
  {
      "image": "slike/sr1.png",
      "productName": "bb",
       "price": 4770.00,
       "url": "sr1.html?product=bb",
       "inStock": true
  },
  {
      "image": "slike/sr2.png",
      "productName": "aa",
      "price": 2990.00,
       "url": "sr1.html?product=aa",
       "inStock": false
  },
  {
      "image": "slike/sr3.png",
      "productName": "cc",
      "price": 1299.00,
       "url": "sr1.html?product=cc",
       "inStock": true
  }
 ,
  {
      "image": "slike/sr4.webp",
      "productName": "gg",
      "price": 2912.00,
       "url": "sr1.html?product=gg",
       "inStock": false
  }
  ,
  {
      "image": "slike/sr5.png",
      "productName": "ff",
      "price": 999.99,
       "url": "sr1.html?product=ff",
       "inStock": true
  }
  
  

];










/// OVAJ DEO JE POSABAN ZA SR.html STRANICE !!!!!!!!!!!!!!!!!!!!

window.onload = () => {
  updateCartCount();

  const urlParams = new URLSearchParams(window.location.search);
  const productName = urlParams.get("product");

  if (!productName) {
      console.log("Nema parametra product u URL-u.");
      return;
  }

  const selectedProduct = products.find(product => product.productName === productName);

  if (selectedProduct) {
      console.log(`Prikazujem prsten: ${selectedProduct.productName}`);

      const productContainer = document.getElementById("product-container-1");

      productContainer.innerHTML = `
          <div class="product-image">
              <img src="${selectedProduct.image}" alt="${selectedProduct.productName}">
          </div>
          <div class="product-details">
              <h2>${selectedProduct.productName}</h2>
              <p class="price">${selectedProduct.price.toFixed(2)} RSD</p>

              <div class="quantity-selector">
                  <button onclick="changeValue(-1)" class="quantity-btn">-</button>
                  <input id="numput" type="number" value="1" min="1">
                  <button onclick="changeValue(1)" class="quantity-btn">+</button>
              </div>

              <div class="ring-size-selector">
                  <p><strong>Unutrašnji Prečnik Prstena:</strong> <span id="selected-size">16mm</span></p>
                  <div class="size-options">
                      <button class="size-btn" onclick="selectSize(16)">16mm</button>
                      <button class="size-btn" onclick="selectSize(17)">17mm</button>
                      <button class="size-btn" onclick="selectSize(18)">18mm</button>
                      <button class="size-btn" onclick="selectSize(19)">19mm</button>
                  </div>
              </div>

              <button onclick="addToCartFromPage()" class="add-to-cart" ${!selectedProduct.inStock ? 'disabled' : ''}>
                  ${selectedProduct.inStock ? "Add to cart" : "Out of Stock"}
              </button>

              <ul class="product-specs">
                  <li>finoća 925</li>
                  <li>veličina kamena: 12 komada × 1.5mm, 1 komad × 7mm</li>
              </ul>
          </div>
      `;
  } else {
      console.log("Proizvod nije pronađen.");
  }
};

// Funkcija za promenu veličine prstena
function selectSize(size) {
  document.getElementById("selected-size").textContent = `${size}mm`;
}

/// OVAJ DEO JE POSEBAN ZA KATALOG DESKTOP VIEW !!!!!!!!!!!!!!!!!!!!


document.addEventListener("DOMContentLoaded", function () {
  const productContainer = document.getElementById("products-grid");
  const activeFiltersContainer = document.getElementById("active-filters1");
  const stockSelect = document.getElementById("availability");
  const sortSelect = document.getElementById("sort");
  const minPriceInput = document.getElementById("min-price1");
  const maxPriceInput = document.getElementById("max-price1");

  function renderProducts(filteredProducts) {
      productContainer.innerHTML = "";
      filteredProducts.forEach(product => {
          const productCard = document.createElement("div");
          productCard.classList.add("product-item");
          productCard.innerHTML = `
              <a class="prvia" href="${product.url}">
                  <img src="${product.image}" alt="${product.productName}">
                  <p class="drugia">${product.productName}</p>
                  <p>${product.price} RSD</p>
              </a>
          `;
          productContainer.appendChild(productCard);
      });
  }

  function updateFiltersDisplay() {
      activeFiltersContainer.innerHTML = "";

      if (stockSelect.value === "in-stock") {
          activeFiltersContainer.appendChild(createFilterTag("Availability: In stock"));
      } else if (stockSelect.value === "out-of-stock") {
          activeFiltersContainer.appendChild(createFilterTag("Availability: Out of stock"));
      }

      if (minPriceInput.value || maxPriceInput.value) {
          const priceRange = `Price: ${minPriceInput.value || "0"} - ${maxPriceInput.value || "∞"} RSD`;
          activeFiltersContainer.appendChild(createFilterTag(priceRange));
      }
  }

  function createFilterTag(text) {
      const tag = document.createElement("div");
      tag.classList.add("filter-tag");
      tag.innerHTML = `${text} <span class="remove-filter">✖</span>`;

      tag.querySelector(".remove-filter").addEventListener("click", () => {
          if (text.includes("In stock") || text.includes("Out of stock")) {
              stockSelect.value = "all";
          }
          if (text.includes("Price:")) {
              minPriceInput.value = "";
              maxPriceInput.value = "";
          }
          applyFiltersAndSorting();
      });

      return tag;
  }

  function applyFiltersAndSorting() {
      let filteredProducts = [...products];

      // Filter po ceni
      const minPrice = parseFloat(minPriceInput.value) || 0;
      const maxPrice = parseFloat(maxPriceInput.value) || Infinity;
      filteredProducts = filteredProducts.filter(p => p.price >= minPrice && p.price <= maxPrice);

      // Filter po dostupnosti
      if (stockSelect.value === "in-stock") {
          filteredProducts = filteredProducts.filter(p => p.inStock);
      } else if (stockSelect.value === "out-of-stock") {
          filteredProducts = filteredProducts.filter(p => !p.inStock);
      }

      // Sortiranje
      if (sortSelect.value === "name-asc") {
          filteredProducts.sort((a, b) => a.productName.localeCompare(b.productName));
      } else if (sortSelect.value === "name-desc") {
          filteredProducts.sort((a, b) => b.productName.localeCompare(a.productName));
      } else if (sortSelect.value === "price-asc") {
          filteredProducts.sort((a, b) => a.price - b.price);
      } else if (sortSelect.value === "price-desc") {
          filteredProducts.sort((a, b) => b.price - a.price);
      }

      updateFiltersDisplay();
      renderProducts(filteredProducts);
  }

  // Event listeneri
  stockSelect.addEventListener("change", applyFiltersAndSorting);
  sortSelect.addEventListener("change", applyFiltersAndSorting);
  minPriceInput.addEventListener("input", applyFiltersAndSorting);
  maxPriceInput.addEventListener("input", applyFiltersAndSorting);

  renderProducts(products);
});



/*!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!*/





/*!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!*/

  
document.addEventListener("DOMContentLoaded", function () {

  const productContainer = document.getElementById("products-grid");
  const filterInStock = document.getElementById("filter-in-stock");
  const filterOutStock = document.getElementById("filter-out-stock");
  const applyFiltersButton = document.getElementById("apply-filters");
  const activeFiltersContainer = document.getElementById("active-filters");
  const sortSelect = document.getElementById("sort-options");
  const minPriceInput = document.getElementById("min-price");
  const maxPriceInput = document.getElementById("max-price");
  const applyFiltersButton2 = document.getElementById("apply-btn-cena");
 

  function renderProducts(filteredProducts) {
      productContainer.innerHTML = "";
      filteredProducts.forEach(product => {
          const productCard = document.createElement("div");
          productCard.classList.add("product-item");
          productCard.innerHTML = `
               <a class="prvia" href="${product.url}">
             <img src="${product.image}" alt="${product.productName}">
          <p class="drugia" href="#">${product.productName}</p>
          <p>${product.price} RSD</p>
          </a>
          `;
          productContainer.appendChild(productCard);
      });
  }



  function updateFiltersDisplay() {
      activeFiltersContainer.innerHTML = ""; 

      if (filterInStock.checked) {
          const filterTag = createFilterTag("Availability: In stock");
          activeFiltersContainer.appendChild(filterTag);
      }
      if (filterOutStock.checked) {
          const filterTag = createFilterTag("Availability: Out of stock");
          activeFiltersContainer.appendChild(filterTag);
      }

      if (minPriceInput.value || maxPriceInput.value) {
        const priceRange = `Price: ${minPriceInput.value || "0"} - ${maxPriceInput.value || "∞"} RSD`;
        const filterTag = createFilterTag(priceRange);
        activeFiltersContainer.appendChild(filterTag);
    }
  }




  function createFilterTag(text) {
    clearBtn = document.getElementById("clear-filters");

       //kreira div koji pokazuje da li filter upaljen
      const tag = document.createElement("div");
      tag.classList.add("filter-tag");
      tag.innerHTML = `${text} <span class="remove-filter">✖</span>`;
      
      
    // omogucava x buttonu da obrise filtere
      tag.querySelector(".remove-filter").addEventListener("click", () => {
          if (text.includes("In stock")) filterInStock.checked = false;
          if (text.includes("Out of stock")) filterOutStock.checked = false;
          if (text.includes("Price:")) {
            minPriceInput.value = "";
            maxPriceInput.value = "";
        }
          applyFiltersAndSorting();
          
      });
      
    
      //Omogucava clear button da obrise filtere
      document.getElementById("clear-filters").addEventListener("click", () => {
        if (text.includes("In stock")) filterInStock.checked = false;
        if (text.includes("Out of stock")) filterOutStock.checked = false;
        if (text.includes("Price:")) {
          minPriceInput.value = "";
          maxPriceInput.value = "";
      }
      applyFiltersAndSorting();
    });

        //Omogucava clear button da obrise filtere
        document.getElementById("clear-filters2").addEventListener("click", () => {
          if (text.includes("In stock")) filterInStock.checked = false;
          if (text.includes("Out of stock")) filterOutStock.checked = false;
          applyFiltersAndSorting();
        });

          //Omogucava clear button da obrise filtere
          document.getElementById("clear-filters3").addEventListener("click", () => {
            if (text.includes("In stock")) filterInStock.checked = false;
            if (text.includes("Out of stock")) filterOutStock.checked = false;
            if (text.includes("Price:")) {
              minPriceInput.value = "";
              maxPriceInput.value = "";
          }
            applyFiltersAndSorting();
          });

            document.getElementById("filter-in-stock").addEventListener("change", function () {
              if (!this.checked) {
                  console.log("Checkbox 'In Stock' is unchecked!");
                  if (text.includes("In stock")) filterInStock.checked = false;
                  if (text.includes("Out of stock")) filterOutStock.checked = false;
                   applyFiltersAndSorting();
              }
          });
              document.getElementById("filter-out-stock").addEventListener("change", function () {
                if (!this.checked) {
                    console.log("Checkbox 'Out of Stock' is unchecked!");
                    if (text.includes("In stock")) filterInStock.checked = false;
                    if (text.includes("Out of stock")) filterOutStock.checked = false;
                     applyFiltersAndSorting();
                }
            });

      return tag;
  }






  function applyFiltersAndSorting() {
      let filteredProducts = [...products];

  // Filter po ceni
  const minPrice = parseFloat(minPriceInput.value) || 0;
  const maxPrice = parseFloat(maxPriceInput.value) || Infinity;
  filteredProducts = filteredProducts.filter(p => p.price >= minPrice && p.price <= maxPrice);



      // Filter po dostupnosti
      if (filterInStock.checked && !filterOutStock.checked) {
          filteredProducts = filteredProducts.filter(p => p.inStock);
      } else if (!filterInStock.checked && filterOutStock.checked) {
          filteredProducts = filteredProducts.filter(p => !p.inStock);
      }





      // Sortiranje
      const sortValue = sortSelect.value;
      if (sortValue === "name-asc") {
          filteredProducts.sort((a, b) => a.productName.localeCompare(b.productName));
      } else if (sortValue === "name-desc") {
          filteredProducts.sort((a, b) => b.productName.localeCompare(a.productName));
      } else if (sortValue === "price-asc") {
          filteredProducts.sort((a, b) => a.price - b.price);
      } else if (sortValue === "price-desc") {
          filteredProducts.sort((a, b) => b.price - a.price);
      }

      updateFiltersDisplay();
      renderProducts(filteredProducts);
  }


             




document.getElementById("filter-in-stock").addEventListener("change",applyFiltersAndSorting);
  document.getElementById("filter-out-stock").addEventListener("change",applyFiltersAndSorting);

  applyFiltersButton.addEventListener("click", applyFiltersAndSorting);
  sortSelect.addEventListener("change", applyFiltersAndSorting);
  applyFiltersButton2.addEventListener("click", applyFiltersAndSorting);

  renderProducts(products);
});








//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!


const slider = document.querySelector('.slider');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const card = document.querySelector('.card'); // Prva kartica

let cardWidth = 10;

if (card) {
  const cardStyle = window.getComputedStyle(card);
  const cardMargin = parseInt(cardStyle.marginRight) + parseInt(cardStyle.marginLeft);
  cardWidth = card.offsetWidth + cardMargin; // Ukupna širina kartice + margine
}

let scrollAmount = 0;

prevBtn.addEventListener('click', () => {
  scrollAmount -= cardWidth;
  if (scrollAmount < 0) {
    scrollAmount = 0; // Ne dozvoljava skrolovanje unazad kad je početak.
  }
  slider.style.transform = `translateX(-${scrollAmount}px)`;
});

nextBtn.addEventListener('click', () => {
  scrollAmount += cardWidth;
  if (scrollAmount > slider.scrollWidth - slider.offsetWidth) {
    scrollAmount = slider.scrollWidth - slider.offsetWidth; // Ne dozvoljava prelazak granice.
  }
  slider.style.transform = `translateX(-${scrollAmount}px)`;
});










function fetchSuggestions(query) {
  const suggestionsBox = document.getElementById("suggestionsBox");

  if (!query) {
    suggestionsBox.style.display = "none";
    suggestionsBox.innerHTML = "";
    return;
  }

  const filteredProducts = products.filter((product) =>
    product.productName.toLowerCase().includes(query.toLowerCase())
  );

  if (filteredProducts.length > 0) {
    suggestionsBox.style.display = "block";
    suggestionsBox.innerHTML = filteredProducts
      .map(
        (product) => `
       
        <a  href="${product.url}">
        <div class="suggestion-item" onclick="selectProduct('${product.productName}')">
          <img src="${product.image}" alt="${product.productName}" />
          <div class="product-info">
            <span class="product-name">${product.productName}</span>
            <span class="product-price">${product.price.toFixed(2)} RSD</span>
          </div>
        </div>
        </a>
      `
      )
      .join("");
  } else {
    suggestionsBox.style.display = "none";
    suggestionsBox.innerHTML = "";
  }
}

function selectProduct(productName) {
  const searchInput = document.querySelector(".search-input");
  searchInput.value = productName;

  // Sakrij predloge
  const suggestionsBox = document.getElementById("suggestionsBox");
  suggestionsBox.style.display = "none";
  suggestionsBox.innerHTML = "";
}









//11111111111111111111111111111111111111111111111111111






function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Provera da li već postoji isti proizvod u korpi
  let existingProduct = cart.find(item => item.productName === product.productName);
  let existingDiameter = cart.find(item => item.diameter === product.diameter);

  if (existingProduct && existingDiameter ) {
      existingProduct.quantity = parseInt(existingProduct.quantity) + parseInt(product.quantity); // Povećava količinu
  } else {
      cart.push(product); // Ako ne postoji, dodaje novi proizvod
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount()
}





// Funkcija koja dodaje proizvod iz stranice u korpu
function addToCartFromPage() {
  let product = {
      image: document.querySelector(".product-image img").src,
      productName: document.querySelector(".product-details h2").textContent,
      price: document.querySelector(".price").textContent.replace(" RSD", ""), // Skida RSD
      diameter: document.getElementById("selected-size").textContent,
      url: window.location.href,
      quantity: document.getElementById("numput").value,
  };

  addToCart(product);
}



function clearCart() {
  localStorage.removeItem("cart"); // Obriši korpu iz LocalStorage-a
  location.reload(); // Osveži stranicu
}




function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let totalQuantity = cart.reduce((sum, item) => sum + parseInt(item.quantity), 0);

  let cartCountElement = document.getElementById("cart-count");
  cartCountElement.textContent = totalQuantity;

  // Ako je korpa prazna, sakrij broj
  if (totalQuantity > 0) {
      cartCountElement.style.visibility = "visible";
  } else {
      cartCountElement.style.visibility = "hidden";
  }
  console.log("updateCartCount() je funkcionalan");
}

