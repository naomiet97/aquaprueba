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
  

export const Playnow = () => {
  // CARGAR LA RUTA O COMPONENTE
  fetch("./components/PlayNow/PlayNow.html")
    .then(response => response.text())
    .then(htmlPlayNow => {
    // Insertar el contenido del archivo en el elemento con el id "header"
      document.getElementById("content").innerHTML = htmlPlayNow;

      //* * LOGICA DE EL JUEGO **//
      //* * GAME LOOP **//
      //* * ESTA CORREINDO SOBRE LA RUTA MOVER A SCRIPT INDEPENDIENTE **//
      //* * GAME LOOP **//
      let time = new Date();
      let deltaTime = 0;

      // esta funcion nos sirve para que se gargue todo el ecenario antes de comenzar el juego
      if (document.readyState === "complete" || document.readyState === "interactive") {
        setTimeout(Init, 1);
      } else {
        document.addEventListener("DOMContentLoaded", Init);
      }

      // funcion inial para cargar el start del juego y el ciclo de panpalla de movimiento
      function Init() {
        time = new Date();
        /* Start(); */
        Loop();
      }

      // crea el ciclo con delay de tiempo que simula el movimiento de la pantalla
      function Loop() {
        deltaTime = (new Date() - time) / 1000;
        time = new Date();
        Update();
        requestAnimationFrame(Loop);
      }

      //* * GAME LOGIC **//
      /*  let gameOver = document.querySelector(".game-over"); */
      const suelo = document.querySelector(".espacio");
      const contenedor = document.querySelector(".contenedor");
      /* let textoScore = document.querySelector(".score"); */
      const objeto = document.querySelector(".objeto");
      document.addEventListener("keydown", HandleKeyDown);
      const parado = false;
      const gravedad = 2500;
      let sueloX = 0;
      const velEscenario = 1280 / 3;
      const gameVel = 1;
      let velY = 0;
      let objetoMoved = 480;

      let tiempoHastaObstaculo = 2;
      const tiempoObstaculoMin = 0.7;
      const tiempoObstaculoMax = 1.8;
      /* const obstaculoPosY = 16; */
      const obstaculos = [];

      // aqui cargamos todas las funcionalidades que tiene el juego
      function Update() {
        if (parado) return;
        MoverSuelo();
        DecidirCrearObstaculos();
        MoverObstaculos();
        if (velY) velY -= gravedad * deltaTime;
      }

      function HandleKeyDown(event) {
        if (event.key === "ArrowRight") {
          // La tecla derecha ha sido presionada
          console.log("Tecla derecha presionada");
          if (objetoMoved === 750) {
            objetoMoved = 750;
          }
          if (objetoMoved === 480) {
            objetoMoved = 750;
          }
          if (objetoMoved === 250) {
            objetoMoved = 480;
          }
          objeto.style.left = objetoMoved + "px";
        } else if (event.key === "ArrowLeft") {
          // La tecla izquierda ha sido presionada
          console.log("Tecla izquierda presionada");
          if (objetoMoved === 250) {
            objetoMoved = 250;
          }
          if (objetoMoved === 480) {
            objetoMoved = 250;
          }
          if (objetoMoved === 750) {
            objetoMoved = 480;
          }

          objeto.style.left = objetoMoved + "px";
        }
      }
      // funcion para simular movimiento de las busbujas
      // la cual es solo una imagen png que se recarga varias
      // y corre en el eje y para simular movimiento
      function MoverSuelo() {
        sueloX += CalcularDesplazamiento();
        suelo.style.top = -(sueloX % contenedor.clientHeight) + "px";
      }

      // funcion calcular el desplazamiento de la pantalla o los obstaculos.
      function CalcularDesplazamiento() {
        return velEscenario * deltaTime * gameVel;
      }

      // funcionalidad para determinar cada cuanto tiempo aparecen los obstaculos es rambom
      function DecidirCrearObstaculos() {
        tiempoHastaObstaculo -= deltaTime;
        if (tiempoHastaObstaculo <= 0) {
          CrearObstaculo();
        }
      }
      // funcion para crear obstaculso radomn si nececida de estarlos creando uno por uno
      // se pueden crean tantos obstaculos como sena necesarios
      function CrearObstaculo() {
        const obstaculo = document.createElement("div");
        contenedor.appendChild(obstaculo);
        obstaculo.classList.add("cactus");
        if (Math.random() > 0.5) obstaculo.classList.add("cactus2");
        obstaculo.posY = contenedor.clientHeight;
        obstaculo.style.top = contenedor.clientHeight + "px";
        obstaculo.style.left = getRandomLeft() + "px";

        obstaculos.push(obstaculo);
        tiempoHastaObstaculo = tiempoObstaculoMin + Math.random() * (tiempoObstaculoMax - tiempoObstaculoMin) / gameVel;
      }

      // funcionalidad para que los obstaculos aparencan en distintas posisines de la pantalla es rambon
      // por ahora solo tiene tres movimientos 250px, 480px 750px se pueden cear mas.
      function getRandomLeft() {
        const randomNumber = Math.floor(Math.random() * 3); // Genera un número aleatorio entre 0 y 2

        if (randomNumber === 0) {
          return 250;
        } else if (randomNumber === 1) {
          return 500;
        } else {
          return 750;
        }
      }
      // funcionalidad que permite que los obstaculos se puevan hacia arriba simulando desplazamiento de la pantalla
      // la velocidad es paralela a la pantalla y puede ser modificable
      function MoverObstaculos() {
        for (let i = obstaculos.length - 1; i >= 0; i--) {
          if (obstaculos[i].posY < -obstaculos[i].clientHeight) {
            obstaculos[i].parentNode.removeChild(obstaculos[i]);
            obstaculos.splice(i, 1);
          /* GanarPuntos(); */
          } else {
            obstaculos[i].posY -= CalcularDesplazamiento();
            obstaculos[i].style.top = obstaculos[i].posY + "px";
          }
        }
      }
    });

  // mas javascript
  console.log("Playnow");
};

  