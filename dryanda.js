console.log("hi")
let audioContext = new AudioContext();


// const gcsUri = 'gs://my-bucket/audio.raw';
// const encoding = 'Encoding of the audio file, e.g. LINEAR16';
// const sampleRateHertz = 16000;

const randomSelector = () => {


}

fetch('test.mp3')
  .then(response => response.arrayBuffer())
  .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer))
  .then(audioBuffer => {
    let sourceNode = audioContext.createBufferSource();
    sourceNode.buffer = audioBuffer;
    sourceNode.connect(audioContext.destination);
    sourceNode.start();
  })  
  .catch(e => console.error(e));