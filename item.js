const params = new URLSearchParams(window.location.search);
const itemId = params.get("id");

fetch("items.json")
  .then(res => res.json())
  .then(items => {
    // WhatsApp button logic
const whatsappBtn = document.getElementById("whatsapp-btn");
if (whatsappBtn) {
  whatsappBtn.addEventListener("click", () => {
    const phone = "923342024091"; // <-- replace with your actual number (no +, no spaces)
    const message = encodeURIComponent(
      `Hey! I'm interested in your item: ${item.name} (${item.price}) from your thrift shop.`
    );
    window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
  });
}
// WhatsApp link logic
const whatsappLink = document.getElementById("whatsapp-link");
if (whatsappLink) {
  const phone = "923342024091"; // replace with your number (no + sign)
  const message = encodeURIComponent(
    `Hey! I'm interested in your item: ${item.name} (${item.price}) from your thrift shop.`
  );
  whatsappLink.href = `https://wa.me/${phone}?text=${message}`;
}

    const item = items[itemId];
    if (!item) return;

    // Set Title, Price, and Description
    document.getElementById("item-title").textContent = item.name || "Unnamed Item";
    document.getElementById("item-price").textContent = item.price || "";
    document.getElementById("item-description").textContent = item.description || "No description available.";

    // Call button (add your number here)
    const callBtn = document.getElementById("call-btn");
    callBtn.onclick = () => {
      window.location.href = "tel:+1234567890"; // replace with your real number
    };

    // Image slider logic
    const images = item.images || [];
    let current = 0;
    const mainImage = document.getElementById("main-image");
    if (images.length > 0) {
      mainImage.src = images[0];
    }
    document.getElementById("prev-btn").onclick = () => {
      current = (current - 1 + images.length) % images.length;
      mainImage.src = images[current];
    };
    document.getElementById("next-btn").onclick = () => {
      current = (current + 1) % images.length;
      mainImage.src = images[current];
    };

    // Product details table (only main fields)
    const details = {
      "Name": item.name,
      "Price": item.price,
      "Condition": item.condition,
      "Color": item.color,
      "Category": item.category
    };

    const table = document.getElementById("details-table");
    for (const key in details) {
      if (details[key]) {
        const row = document.createElement("tr");
        row.innerHTML = `<td>${key}</td><td>${details[key]}</td>`;
        table.appendChild(row);
      }
    }

  })
  
  .catch(err => console.error("Error loading items:", err));
  
