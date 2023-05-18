window.addEventListener('DOMContentLoaded', () => {
    const fishContainer = document.getElementById('fish-container');
    const fishImages = ['fish1.png', 'fish2.png', 'fish3.png', 'fish4.png']; // Agrega aquí las rutas de tus imágenes de peces
  
    const numFish = 10; // Número de peces que deseas mostrar
  
    for (let i = 0; i < numFish; i++) {
      const fish = document.createElement('img');
      fish.src = fishImages[Math.floor(Math.random() * fishImages.length)];
      fish.classList.add('fish');
      fish.style.left = `${Math.random()
      }
    }