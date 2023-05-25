document.addEventListener("DOMContentLoaded", function() {
    const container = document.querySelector(".container");
  
    function createBubble() {
      const bubble = document.createElement("span");
      bubble.style.setProperty("--i", Math.floor(Math.random() * 50) + 10);
      container.appendChild(bubble);
  
      setTimeout(function() {
        bubble.remove();
      }, 15000); // Eliminamos la burbuja después de 15 segundos
    }
  
    function generateBubbles() {
      // Generamos una nueva burbuja cada 0.1 segundos
      setInterval(function() {
        createBubble();
      }, 50);
    }
  
    generateBubbles();
  });
  
  