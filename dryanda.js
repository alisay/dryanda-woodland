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

    const tracks = ['a.mp3', 'b.mp3']
    const cloudTracks = ['https://storage.googleapis.com/dryandra-woodland/test%3AB%3A1%3A1.mp3', 'https://storage.googleapis.com/dryandra-woodland/test%3AA%3A1%3A1.mp3']

    cloudTracks.forEach((element) =>{
        console.log(typeof element, element)
        loadFile(element).then((track)=>{
            if (audioCtx.state === 'suspended') {
                audioCtx.resume();
              }
      
              playTrack(track);
        })    
    });
    
});