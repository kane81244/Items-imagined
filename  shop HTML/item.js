fetch("items.json")
  .then(res => res.json())
  .then(items => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    const item = items[id];
    const section = document.getElementById("item-details");

    if (!item) {
      section.innerHTML = "<h2>Item not found 😢</h2>";
      return;
    }

    // Create HTML for all images
    let imagesHTML = "";
    item.images.forEach(img => {
      imagesHTML += `<img src="${img}" alt="${item.name}" style="width:250px;margin:5px;border-radius:10px;">`;
    });

    section.innerHTML = `
      <div style="text-align:center;">
        ${imagesHTML}
        <h2>${item.name}</h2>
        <p>${item.description}</p>
        <p><strong>Condition:</strong> ${item.condition}</p>
        <p><strong>Price:</strong> ${item.price}</p>
        <h3>Contact Seller</h3>
        <p>📞 <a href="tel:+92XXXXXXXXXX">+92XXXXXXXXXX</a></p>
        <p>💬 <a href="https://wa.me/92XXXXXXXXXX" target="_blank">Message on WhatsApp</a></p>
        <button onclick="window.history.back()">⬅️ Go Back</button>
      </div>
    `;
  });
