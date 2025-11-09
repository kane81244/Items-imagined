// item.js
document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(location.search);
  const id = parseInt(params.get("id") || "0", 10);

  const titleEl = document.getElementById("item-title");
  const descEl = document.getElementById("item-description");
  const priceEl = document.getElementById("item-price");
  const mainImg = document.getElementById("main-image");
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");
  const counterEl = document.getElementById("img-counter");
  const callBtn = document.getElementById("call-btn");

  let images = [];
  let current = 0;

  function fetchItems(){
    return fetch("items.json").then(r=>{
      if(!r.ok) throw new Error("items.json not found");
      return r.json();
    });
  }

  function updateView(item){
    titleEl.textContent = `Item ${id+1}: ${item.name}`;
    descEl.textContent = item.description || "";
    priceEl.textContent = item.price || "";
    images = item.images && item.images.length ? item.images : ["images/placeholder.jpg"];
    current = 0;
    setImage();
  }

  function setImage(){
    mainImg.style.opacity = 0;
    setTimeout(()=> {
      mainImg.src = images[current];
      mainImg.style.opacity = 1;
    }, 120);
    counterEl.textContent = `${current+1} / ${images.length}`;
  }

  prevBtn.addEventListener("click", ()=> {
    current = (current - 1 + images.length) % images.length;
    setImage();
  });
  nextBtn.addEventListener("click", ()=> {
    current = (current + 1) % images.length;
    setImage();
  });

  // load data
  fetchItems()
    .then(items => {
      const item = items[id];
      if (!item) {
        titleEl.textContent = "Item not found";
        descEl.textContent = "";
        priceEl.textContent = "";
        return;
      }
      // Optionally replace number in call link; user will update number in code
      // callBtn.href = "tel:+923001234567";
      updateView(item);
    })
    .catch(err => {
      titleEl.textContent = "Error loading item";
      descEl.textContent = err.message;
      console.error(err);
    });
});
