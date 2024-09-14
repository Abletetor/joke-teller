const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

// Disable / Enable button
const toggleButton = () => {
   button.disabled = !button.disabled;
};
//API KEY
const VoiceRSSApiURL = 'a25641a4026c4e1893f108e48451c61d';

// Passing Joke to VoiceRS API
const tellMe = (joke) => {
   VoiceRSS.speech({
      key: VoiceRSSApiURL,
      src: joke,
      hl: 'en-us',
      v: 'Linda',
      r: 0,
      c: 'mp3',
      f: '44khz_16bit_stereo',
      ssml: false
   });
};

// Get Joke from API
const getJokes = async () => {
   let joke = '';
   const JOKEAPI = 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=twopart';
   try {
      //recieve two jokes from the joke API
      const response = await fetch(JOKEAPI);
      const data = await response.json();
      // combining the two jokes together (setup and delivery)
      if (data.setup) {
         joke = `${data.setup} ... ${data.delivery}`;
      } else {
         joke = data.joke;
      }
      // Text-to-speech
      tellMe(joke);

      //Disable button
      toggleButton();

   } catch (error) {
      console.log("whoops", error);
   }
};

// Event handlers
button.addEventListener("click", getJokes);
audioElement.addEventListener("ended", toggleButton);