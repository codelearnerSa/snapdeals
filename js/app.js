
// api
const loadProducts = () => {
  const url = `https://raw.githubusercontent.com/ProgrammingHero1/ranga-store-api/main/ranga-api.json`
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product.image;
    //by destructuring product object
      const {rate,count}= product.rating
      
    const div = document.createElement("div");
    div.classList.add("product");
    // single product
    div.innerHTML = `<div class="single-product card">
      <div>
      <img class="product-image" src=${image}></img>
      </div>
      <h3>${product.title}</h3>
      <p>Category: ${product.category} </p>
      <h2>Price: $ ${product.price} </h2>
     
      <p class="average-raring">${customerRating(rate)}  <span class="total-raring">  ${count}  Ratings</span></p>
      <div class="card-footer">
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="add-card ">Add to cart</button>
      <button id="details-btn"  data-bs-toggle="modal" data-bs-target="#exampleModal">Details</button></div>
  
    </div>
      `;
    document.getElementById("all-products").appendChild(div);
    
  }
};

// customar rating 
function customerRating(rate) {
  const rating= parseInt(rate)
  if(rating == 5){
    const text =`
    <i class="fas rating fa-star"></i>
    <i class="fas rating fa-star"></i>
    <i class="fas rating fa-star"></i>
    <i class="fas rating fa-star"></i>
    `
    return text;
  }
  else if  (rating == 4){
    const text =`
    <i class="fas rating fa-star"></i>
    <i class="fas rating fa-star"></i>
    <i class="fas rating fa-star"></i>
    <i class="fas rating fa-star"></i>
    <i class="far no_rating fa-star"></i> 
    `
    return text;
    
  }
  else if (rating == 3){
    
    const text =`
    <i class="fas rating fa-star"></i>
    <i class="fas rating fa-star"></i>
    <i class="fas rating fa-star"></i>
    <i class="far no_rating fa-star"></i>
    <i class="far no_rating fa-star"></i>
    
    `
    return text;
  }
  else if(rating == 2){
    const text =`
    <i class="fas rating fa-star"></i>
    <i class="fas rating fa-star"></i>
    <i class="far no_rating fa-star"></i>
    <i class="far no_rating fa-star"></i>
    <i class="far no_rating fa-star"></i>
    
    `
    return text;
  }
  else if(rating == 1){
    const text =`
    <i class="fas rating fa-star"></i>
    <i class="far no_rating fa-star"></i>
    <i class="far no_rating fa-star"></i>
    <i class="far no_rating fa-star"></i>
    <i class="far no_rating fa-star"></i>
    
    `
    return text;
  }
  else {
    console.log('no star');
    const text =`
    <i class="far no_rating fa-star"></i>
    <i class="far no_rating fa-star"></i>
    <i class="far no_rating fa-star"></i>
    <i class="far no_rating fa-star"></i>
    <i class="far fa-star"></i>
    
    `
    return text;
  }

}
  
//  total rating

let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();
  document.getElementById("total-Products").innerText = count;
  updateTotal();
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
   const convertPrice = parseFloat(value);
    // const convertPrice = value;
  const total = convertedOldPrice + convertPrice;

  //  document.getElementById(id).innerText = Math.round(total);
   document.getElementById(id).innerText = total.toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = Math.round(value);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {


  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");

  document.getElementById("total").innerText = grandTotal.toFixed(2);
};
