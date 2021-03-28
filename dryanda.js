// Imports the Google Cloud client library
const {Storage} = require('@google-cloud/storage');

// Creates a client
const storage = new Storage();

const bucketName = 'dryandra-woodland';

// The origin for this CORS config to allow requests from
// const origin = 'http://example.appspot.com';

// The response header to share across origins
// const responseHeader = 'Content-Type';

// The maximum amount of time the browser can make requests before it must
// repeat preflighted requests
// const maxAgeSeconds = 3600;

// The name of the method
// See the HttpMethod documentation for other HTTP methods available:
// https://cloud.google.com/appengine/docs/standard/java/javadoc/com/google/appengine/api/urlfetch/HTTPMethod
// const method = 'GET';



// for cross browser compatibility
const AudioContext = window.AudioContext || window.webkitAudioContext;
let audioCtx = null;

// Provide a start button so demo can load tracks from an event handler for cross-browser compatibility
const startButton = document.querySelector('#startbutton');
console.log(startButton);

// function for fetching the audio file and decode the data
async function getFile(filepath) {
    const response = await fetch(filepath);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
    return audioBuffer;
}

// function to call each file and return an array of decoded files
async function loadFile(filePath) {
    const track = await getFile(filePath);
    return track;
}

let offset = 0;
// function to create a buffer, plop in data, connect and play -> modify graph here if required
function playTrack(audioBuffer) {
  const trackSource = audioCtx.createBufferSource();
  trackSource.buffer = audioBuffer;
  trackSource.connect(audioCtx.destination)

  if (offset == 0) {
    trackSource.start();
    offset = audioCtx.currentTime;
  } else {
    trackSource.start(0, audioCtx.currentTime - offset);
  }

  return trackSource;
}


startButton.addEventListener('click', () => {
    if (audioCtx != null) {
        return;
}
    audioCtx = new AudioContext();

    document.querySelector("#startbutton").hidden = true;

    console.log("started");

    const tracks = 'test.mp3'
    const cloudTracks = 'https://storage.googleapis.com/dryandra-woodland/test.mp3'

    loadFile(cloudTracks).then((track)=>{
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
          }
  
          playTrack(track);
    })
});

// const gcsUri = 'gs://dryandra-woodland/test.mp3';
// const encoding = 'Encoding of the audio file, e.g. LINEAR16';
// const sampleRateHertz = 16000;


// fetch(gcsUri)
//   .then(response => response.arrayBuffer())
//   .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer))
//   .then(audioBuffer => {
//     let sourceNode = audioContext.createBufferSource();
//     sourceNode.buffer = audioBuffer;
//     sourceNode.connect(audioContext.destination);
//     sourceNode.start();
//   })  
//   .catch(e => console.error(e));