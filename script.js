const video = document.getElementById('webcam');
const liveView = document.getElementById('liveView');
const demosSection = document.getElementById('demos');
const enableWebcamButton = document.getElementById('webcamButton');
const submitIdCard = document.getElementById('submitIdCard');
const detectedCardTitle = document.getElementById('detectedCardTitle');
const processedImgTitle = document.getElementById('processedImgTitle');
let selectedDeviceId;

// Ocultar elementos al inicio
detectedCardTitle.style.display = "none";
processedImgTitle.style.display = "none";
submitIdCard.style.display = "none";

// Verificar si getUserMedia está soportado
function getUserMediaSupported() {
  return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
}

if (getUserMediaSupported()) {
  enableWebcamButton.addEventListener('click', listCameras);
} else {
  console.warn('getUserMedia() is not supported by your browser');
}

// Listar las cámaras disponibles y permitir la selección
async function listCameras() {
  try {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const videoDevices = devices.filter(device => device.kind === 'videoinput');
    
    if (videoDevices.length > 0) {
      const cameraOptions = document.createElement('select');
      cameraOptions.id = 'cameraSelect';
      videoDevices.forEach((device, index) => {
        const option = document.createElement('option');
        option.value = device.deviceId;
        option.text = device.label || `Camera ${index + 1}`;
        cameraOptions.appendChild(option);
      });
      liveView.insertBefore(cameraOptions, enableWebcamButton);
      
      cameraOptions.addEventListener('change', (event) => {
        selectedDeviceId = event.target.value;
      });
      
      selectedDeviceId = videoDevices[0].deviceId; // Preseleccionar la primera cámara
      enableWebcamButton.addEventListener('click', enableCam);
    } else {
      console.warn('No video devices found.');
    }
  } catch (error) {
    console.error('Error accessing camera devices:', error);
  }
}

// Habilitar la cámara seleccionada
function enableCam(event) {
  if (!model) {
    alert('Wait for model to load before clicking!');
    return;
  }

  event.target.classList.add('removed');
  
  const constraints = {
    video: {
      deviceId: selectedDeviceId ? { exact: selectedDeviceId } : undefined
    }
  };

  navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
    video.srcObject = stream;
    video.addEventListener('loadeddata', predictWebcam);
  }).catch(function(error) {
    console.error('Error accessing the camera:', error);
  });
}

// Pretend model has loaded for testing
var model = true;
demosSection.classList.remove('invisible');

var model = undefined;

// Cargar modelo COCO-SSD
cocoSsd.load().then(function (loadedModel) {
  model = loadedModel;
  demosSection.classList.remove('invisible');
});

// Continuar con la lógica de predicción...
