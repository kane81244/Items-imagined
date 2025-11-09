fetch("items.json")
  .then(res => res.json())
  .then(items => {
    const list = document.getElementById("items-list");
    items.forEach((item, index) => {
      list.innerHTML += `
        <div class="item-card" onclick="window.location='item.html?id=${index}'">
          <img src="${item.images[0]}" alt="${item.name}">
          <div class="item-info">
            <h2>${item.name}</h2>
            <p>${item.description}</p>
            <p class="price">${item.price}</p>
          </div>
        </div>
      `;
    });
  });
