const phoneNumber = "+923001234567"; // Your actual phone number

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

fetch("items.json")
  .then(res => res.json())
  .then(items => {
    const item = items[id];
    const container = document.getElementById("item-details");

    const itemNumber = parseInt(id) + 1;

    // Images container
    let imagesHTML = '<div class="images-container">';
    item.images.forEach(img => {
      imagesHTML += `<img src="${img}" alt="${item.name}">`;
    });
    imagesHTML += '</div>';

    container.innerHTML = `
      <h2>Item ${itemNumber}: ${item.name}</h2>
      ${imagesHTML}
      <p>${item.description}</p>
      <p class="price">${item.price}</p>
      <a href="tel:${phoneNumber}" class="contact-btn">Call to Buy: ${phoneNumber}</a>
      <br><br>
      <a href="index.html" class="back-btn">← Back to Home</a>
    `;
  });
