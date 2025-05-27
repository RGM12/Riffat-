const products = [
  {   
    id: "1",
    nama: "Bakso Mercon",
    image: "bakso.png",
    harga: 10000
  }
];

// Display products
const productList = document.getElementById("container");

products.forEach(product => {
  const productCard = document.createElement("div");
  productCard.className = "gambar";

  productCard.innerHTML = `
    <img src="${product.image}" alt="${product.nama}">
    <div class="isi">
      <h1>${product.nama}</h1>
      <div class="quantity-control">
        <button class="decrement">-</button>
        <span class="quantity">1</span>
        <button class="increment">+</button>
      </div>
      <p class="price">Total: Rp. ${product.harga.toLocaleString("id-ID")}</p>
      <button class="order-btn">Pesan Sekarang</button>
    </div>
  `;

  productList.appendChild(productCard);

  // Add event listeners
  const decrementBtn = productCard.querySelector(".decrement");
  const incrementBtn = productCard.querySelector(".increment");
  const quantityDisplay = productCard.querySelector(".quantity");
  const priceDisplay = productCard.querySelector(".price");
  const orderBtn = productCard.querySelector(".order-btn");

  let quantity = 1;
  let price = product.harga;

  const updatePrice = () => {
    price = product.harga * quantity;
    priceDisplay.textContent = `Total: Rp. ${price.toLocaleString("id-ID")}`;
  };

  decrementBtn.addEventListener("click", () => {
    if (quantity > 1) {
      quantity--;
      quantityDisplay.textContent = quantity;
      updatePrice();
    }
  });

  incrementBtn.addEventListener("click", () => {
    quantity++;
    quantityDisplay.textContent = quantity;
    updatePrice();
  });

  // WhatsApp order functionality
  orderBtn.addEventListener("click", () => {
    const totalPrice = product.harga * quantity;

    const pesan = `Halo Bakso Mercon Meletup! Saya ingin memesan:\n\n` +
                  `Produk: ${product.nama}\n` +
                  `Jumlah: ${quantity}\n` +
                  `Total Harga: Rp. ${totalPrice.toLocaleString("id-ID")}\n\n` +
                  `Apakah bisa diproses?`;

    const encodedPesan = encodeURIComponent(pesan);
    const whatsappUrl = `https://wa.me/62881011315831?text=${encodedPesan}`;

    window.open(whatsappUrl, "_blank");
  });
});
