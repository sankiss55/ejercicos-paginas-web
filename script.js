const video = document.getElementById('webcam');
const liveView = document.getElementById('liveView');
const demosSection = document.getElementById('demos');
const enableWebcamButton = document.getElementById('webcamButton');
const submitIdCard = document.getElementById('submitIdCard');
const cameraViewTitle = document.getElementById('cameraViewTitle');
const detectedCardTitle = document.getElementById('detectedCardTitle');
const processedImgTitle = document.getElementById('processedImgTitle');


// cameraViewTitle.style.display ="none";
detectedCardTitle.style.display ="none";
processedImgTitle.style.display = "none"
submitIdCard.style.display ="none";



// Check if webcam access is supported.
function getUserMediaSupported() {
    return !!(navigator.mediaDevices &&
      navigator.mediaDevices.getUserMedia);
  }

  // If webcam supported, add event listener to button for when user
  // wants to activate it to call enableCam function which we will
  // define in the next step.
  if (getUserMediaSupported()) {
    enableWebcamButton.addEventListener('click', enableCam);
  } else {
    console.warn('getUserMedia() is not supported by your browser');
  }


  // Enable the live webcam view and start classification.
function enableCam(event) {
    // Only continue if the COCO-SSD has finished loading.
    if (!model) {
      alert('Wait for model to load before clicking!');
      return;
    }

    // Hide the button once clicked.
    event.target.classList.add('removed');
    const selectOpciones = document.getElementById("opciones");
    const deviceIdSeleccionado = selectOpciones.value;
  
    const constraints = {
      video: {
        deviceId: deviceIdSeleccionado ? { exact: deviceIdSeleccionado } : undefined
      }
    };
  
    navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
      const video = document.getElementById("webcam"); // Asegúrate de que tengas un elemento <video> en tu HTML con id="video"
      video.srcObject = stream;
        video.addEventListener('loadeddata', predictWebcam);
      video.play();
    }).catch(function(error) {
      console.error("Error al iniciar la cámara:", error);
    });
    
  }
// getUsermedia parameters to force video but not audio.
const constraints = {
  video: true
};

// Activate the webcam stream.
navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
  // Detener los tracks para liberar la cámara después de obtener la lista de dispositivos
  stream.getTracks().forEach(track => track.stop());
  
  // Enumerar los dispositivos
  navigator.mediaDevices.enumerateDevices().then(function(respuesta) {
    const videos = respuesta.filter(dispositivo => dispositivo.kind === "videoinput");
    let selectOpciones = document.getElementById("opciones");

    for (let i = 0; i < videos.length; i++) {
      const opcionNueva = document.createElement("option");
      opcionNueva.value = videos[i].deviceId;
      opcionNueva.text = videos[i].label ;
      selectOpciones.appendChild(opcionNueva);
    }
  }).catch(function(error) {
    console.error("Error al enumerar los dispositivos:", error);
  });
}).catch(function(error) {
  console.error("Error al obtener el stream de video:", error);
});


// Pretend model has loaded so we can try out the webcam code.
var model = true;
demosSection.classList.remove('invisible');

// Store the resulting model in the global scope of our app.
var model = undefined;

// Before we can use COCO-SSD class we must wait for it to finish
// loading. Machine Learning models can be large and take a moment
// to get everything needed to run.
// Note: cocoSsd is an external object loaded from our index.html
// script tag import so ignore any warning in Glitch.
cocoSsd.load().then(function (loadedModel) {
  model = loadedModel;
  // Show demo section now model is ready to use.
  demosSection.classList.remove('invisible');
});

var children = [];
console.log(children);


function trimCanvas(c) {
  var ctx = c.getContext('2d'),
      copy = document.createElement('canvas').getContext('2d'),
      pixels = ctx.getImageData(0, 0, c.width, c.height),
      l = pixels.data.length,
      i,
      bound = {
          top: null,
          left: null,
          right: null,
          bottom: null
      },
      x, y;

  // Iterate over every pixel to find the highest
  // and where it ends on every axis ()
  for (i = 0; i < l; i += 4) {
      if (pixels.data[i + 3] !== 0) {
          x = (i / 4) % c.width;
          y = ~~((i / 4) / c.width);

          if (bound.top === null) {
              bound.top = y;
          }

          if (bound.left === null) {
              bound.left = x;
          } else if (x < bound.left) {
              bound.left = x;
          }

          if (bound.right === null) {
              bound.right = x;
          } else if (bound.right < x) {
              bound.right = x;
          }

          if (bound.bottom === null) {
              bound.bottom = y;
          } else if (bound.bottom < y) {
              bound.bottom = y;
          }
      }
  }

  // Calculate the height and width of the content
  var trimHeight = bound.bottom - bound.top,
      trimWidth = bound.right - bound.left,
      trimmed = ctx.getImageData(bound.left, bound.top, trimWidth, trimHeight);

  copy.canvas.width = trimWidth;
  copy.canvas.height = trimHeight;
  copy.putImageData(trimmed, 0, 0);

  // Return trimmed canvas
  return copy.canvas;
}


//function to wait in milliseconds
function sleep(milliseconds) {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}

//function to submit card
function submitCardFunc(dataurl) {
  if (dataurl){
  console.log(dataurl);
  console.log("ID card submitted successfully!");
  }
  else
    {
      console.log("Please try again thank you!");
    }
}



let lastDetection = null; // Almacenará la última detección válida
let captureCooldown = false; // Controlará el intervalo de captura

function predictWebcam() {
  detectedCardTitle.style.display = "block";
  processedImgTitle.style.display = "block";

  const targetObj = "book"; // Cambiar si se usa otro modelo que detecte tarjetas directamente
  const aspectRatioThreshold = 1.6; // Proporción aproximada de una INE horizontal (ancho/alto)

  model.detect(video).then(async function (predictions) {
    // Elimina cualquier resaltado que hayamos hecho en el fotograma anterior.
    for (let i = 0; i < children.length; i++) {
      liveView.removeChild(children[i]);
    }
    children.splice(0);

    // Mostrar mensaje "Escaneando"
    const scanningMessage = document.getElementById("scanningMessage");
    if (!scanningMessage) {
      const message = document.createElement("p");
      message.id = "scanningMessage";
      message.innerText = "Escaneando, por favor no mueva la INE...";
      message.style = "position: absolute; top: 10px; left: 10px; color: white; font-size: 18px;";
      liveView.appendChild(message);
    }

    // Recorremos las predicciones y procesamos solo si cumplen las condiciones.
    for (let n = 0; n < predictions.length; n++) {
      const prediction = predictions[n];

      if (
        prediction.score > 0.85 && // Confianza mínima
        prediction.class === targetObj // Objeto detectado es "book"
      ) {
        const [dx, dy, dw, dh] = prediction.bbox;

        // Verificar que sea horizontal (proporción de aspecto y orientación)
        const aspectRatio = dw / dh;
        if (aspectRatio < aspectRatioThreshold) {
          console.log("Detección ignorada: orientación no válida.");
          continue;
        }

        // Comparar con la última detección
        if (lastDetection) {
          const deltaX = Math.abs(lastDetection.dx - dx);
          const deltaY = Math.abs(lastDetection.dy - dy);
          const deltaW = Math.abs(lastDetection.dw - dw);
          const deltaH = Math.abs(lastDetection.dh - dh);

          // Si hay movimiento significativo, no procesar
          if (deltaX > 10 || deltaY > 10 || deltaW > 10 || deltaH > 10) {
            console.log("INE se movió, esperando estabilidad...");
            continue;
          }
        }

        // Si no hay cooldown, procesar la captura
        if (!captureCooldown) {
          // Activar cooldown para evitar múltiples capturas
          captureCooldown = true;
          setTimeout(() => (captureCooldown = false), 5000); // 5 segundos

          // Almacenar la detección actual
          lastDetection = { dx, dy, dw, dh };

          // Mostrar mensaje de detección
          const p = document.createElement("p");
          p.innerText =
            "INE detectada - Confianza: " +
            Math.round(parseFloat(prediction.score) * 100) +
            "%";
          p.style =
            "margin-left: " +
            dx +
            "px; margin-top: " +
            (dy - 10) +
            "px; width: " +
            (dw - 10) +
            "px; top: 0; left: 0;";

          const highlighter = document.createElement("div");
          highlighter.setAttribute("class", "highlighter");
          highlighter.style =
            "left: " +
            dx +
            "px; top: " +
            dy +
            "px; width: " +
            dw +
            "px; height: " +
            dh +
            "px;";

          // Añadir al DOM
          liveView.appendChild(highlighter);
          liveView.appendChild(p);
          children.push(highlighter);
          children.push(p);

          // Procesar la imagen detectada
          const canvas = document.getElementById("canva");
          const ctx = canvas.getContext("2d");
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(video, dx, dy, dw, dh, 0, 0, dw, dh);

          // Recortar y reescalar la tarjeta
          const trimmedCanvas = trimCanvas(canvas);
          const image_data_url = trimmedCanvas.toDataURL("image/png");
          document.querySelector("#cardImg").src = image_data_url;

          // Mostrar botón para enviar si se detecta algo
          if (image_data_url) {
            submitIdCard.style.display = "block";
            submitIdCard.onclick = () => submitCardFunc(image_data_url);
          } else {
            submitIdCard.style.display = "none";
          }

          console.log("INE capturada exitosamente.");
        }
      }
    }

    
// Llame a esta función nuevamente para seguir prediciendo cuándo el navegador estará listo.
    window.requestAnimationFrame(predictWebcam);
  });
}
