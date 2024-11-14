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

    // getUsermedia parameters to force video but not audio.
    const constraints = {
      video: true
    };

    // Activate the webcam stream.
    navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
      video.srcObject = stream;
      video.addEventListener('loadeddata', predictWebcam);
    });
  }


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


function predictWebcam() {
  detectedCardTitle.style.display = "block"
  processedImgTitle.style.display = "block"


  var targetObj="book"
  // Ahora comencemos a clasificar un fotograma en la secuencia.
  model.detect(video).then(async function (predictions) {
// Elimina cualquier resaltado que hayamos hecho en el fotograma anterior.
    for (let i = 0; i < children.length; i++) {
      liveView.removeChild(children[i]);
    }
    children.splice(0);

    // Ahora recorramos las predicciones y las dibujemos en la vista en vivo si
    // tienen una puntuación de confianza alta.
    for (let n = 0; n < predictions.length; n++) {

      // Si estamos más del 77% seguros de que lo clasificamos correctamente, ¡dibújalo!
      if (predictions[n].score > 0.85) {
        if (predictions[n].class == targetObj){
            // console.log(predictions[n].class);

            let dx=predictions[n].bbox[0]
            let dy=predictions[n].bbox[1]
            let dw=predictions[n].bbox[2]
            let dh=predictions[n].bbox[3]

            // console.log(dx, dy, dw, dh)

            const p = document.createElement('p');
            p.innerText = 'Card detected  '  + ' - with '
                + Math.round(parseFloat(predictions[n].score) * 100)
                + '% confidence.';
            p.style = 'margin-left: ' + predictions[n].bbox[0] + 'px; margin-top: '
                + (predictions[n].bbox[1] - 10) + 'px; width: '
                + (predictions[n].bbox[2] - 10) + 'px; top: 0; left: 0;';

            const highlighter = document.createElement('div');
            highlighter.setAttribute('class', 'highlighter');
            highlighter.style = 'left: ' + predictions[n].bbox[0] + 'px; top: '
                                        + predictions[n].bbox[1] + 'px; width: '
                                        + predictions[n].bbox[2] + 'px; height: '
                                        + predictions[n].bbox[3] + 'px;'

            if (highlighter){
              liveView.appendChild(highlighter);
              liveView.appendChild(p);
              children.push(highlighter);
              children.push(p);

              let canvas = document.getElementById("canva");
              var ctx = canvas.getContext('2d')
              ctx.clearRect(0, 0, canvas.width, canvas.height);
              ctx.drawImage(video, dx, dy, dw, dh, 0, 0, dw, dh);


              var trimmedCanvas = trimCanvas(canvas);

              let image_data_url = trimmedCanvas.toDataURL('image/png');
              document.querySelector("#cardImg").src = image_data_url;

              let saveImgVar= document.querySelector("#cardImg").src

              if (saveImgVar){
                submitIdCard.style.display="block";

                submitIdCard.addEventListener('click',()=>{submitCardFunc(saveImgVar)});

                await sleep(1000);
                }

              else {
                submitIdCard.style.display="none";
                await sleep(1000);
              }
          }
        }
      }
    }

// Llame a esta función nuevamente para seguir prediciendo cuándo el navegador estará listo.
    window.requestAnimationFrame(predictWebcam);
  });
}