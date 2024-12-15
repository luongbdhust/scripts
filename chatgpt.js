let lastElement = null;
let audioElement = null;

document.addEventListener('click', async (event) => {
  const element = event.target;
  if(wanakana.isJapanese(element.textContent)){
  	if (element != lastElement) {
	    if (lastElement) {
	      lastElement.classList.remove('click-highlight');
	    }
	
	    if (element) {
	      element.classList.add('click-highlight');
	      await speakText(element.textContent)
	    }
	
	    lastElement = element;
	  }
  }

});

async function speakText(text){
	console.log(text);
	const style = Math.floor(Math.random() * (9)) + 10000;
	const queryResponse = await fetch(
      `http://217.77.2.105:50121/audio_query?text=${encodeURIComponent(
          text
      )}&speaker=${style}`,
      {
          method: "POST",
      }
  );

  if (!queryResponse.ok) {
      const errorData = await queryResponse.text();
      console.log(`Failed to create audio query: ${errorData}`);
      return;
  }
}

document.addEventListener("DOMContentLoaded", function() {
    audioElement = document.createElement("audio");

    // audioElement.src = "your-audio-file.mp3";
    audioElement.controls = true;
    audioElement.autoplay = false;
    audioElement.loop = false;

    document.body.appendChild(audioElement);

    console.log("Audio element added!");
});
