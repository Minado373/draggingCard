const cards = document.querySelectorAll("#card");
const cardImg = document.getElementById("card_img");

const aestheticColors = [
  // 🌸 Japanese / Sakura
  "#F2B8C6", // Sakura pink
  "#E8AEB7", // Dusty rose
  "#F5E6CC", // Warm cream
  "#B8C0D9", // Wisteria
  "#8C9A8B", // Matcha green

  // 🌿 Nature / Sage
  "#A3B18A", // Sage
  "#588157", // Forest green
  "#DAD7CD", // Soft stone
  "#C9ADA7", // Muted clay
  "#6B705C", // Olive

  // 🌌 Midnight / Dreamy
  "#22223B", // Midnight indigo
  "#4A4E69", // Dusty blue
  "#6D597A", // Muted purple
  "#9A8C98", // Lavender gray
  "#C9ADA7", // Dusty mauve

  // ☕ Dark academia
  "#3D2B1F", // Espresso
  "#795548", // Mocha
  "#A98467", // Camel
  "#DDBEA9", // Sand
  "#F5EBE0", // Antique white

  // 🫧 Cool / Minimalist
  "#D6E6F2", // Ice blue
  "#A9BCD0", // Steel blue
  "#7C9CB5", // Muted blue
  "#6C91BF", // Cornflower blue
  "#344966", // Deep navy

  // 🌷 Soft accents
  "#FFC8DD", // Cotton candy
  "#CDB4DB", // Soft lilac
  "#BDE0FE", // Baby blue
  "#A2D2FF", // Sky blue
  "#CAFFBF", // Pastel mint
];

let draggedEl = null;

function setRandomBackgroundColor() {
  const randomId = Math.floor(Math.random() * aestheticColors.length);
  document.body.style.backgroundColor = aestheticColors[randomId];
}

cardImg.addEventListener("dragstart", (event) => {
  draggedEl = cardImg;
  event.target.classList.add("dragging");
});

cardImg.addEventListener("dragend", (event) => {
  event.target.classList.remove("dragging");
});

cards.forEach((card) => {
  card.addEventListener("dragover", (e) => {
    e.preventDefault();
    e.target.classList.add("dragging_over");
  });

  card.addEventListener("dragleave", (e) => {
    e.target.classList.remove("dragging_over");
  });

  card.addEventListener("drop", (event) => {
    if (draggedEl && !event.target.contains(draggedEl)) {
      const first = draggedEl.getBoundingClientRect();

      event.target.appendChild(draggedEl);
      const last = draggedEl.getBoundingClientRect();
      const dx = first.left - last.left;
      const dy = first.top - last.top;
      event.target.classList.remove("dragging_over");

      draggedEl.animate(
        [{ transform: `translate(${dx}px, ${dy}px)` }, { transform: "none" }],
        { duration: 350, easing: "cubic-bezier(.2,.8,.2,1)" },
      );
      setRandomBackgroundColor();
      draggedEl = null;
    }
  });
});
