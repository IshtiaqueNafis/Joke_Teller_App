const button = document.getElementById('button');
const audioElement = document.getElementById('audio');


// passing joke to voice rss api
function tellMe(joke){
    VoiceRSS.speech({
        key: 'f577a5000e5b4752b6d009e6a9c7efb7',
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0,
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

//disable or enable button

function toogleButton(){
    button.disabled = !button.disabled // if its true will be false if its false will be true

}

async function getJokes(){
    let joke = ''; // emty cause it starts as empty

    const apiUrl = 'https://v2.jokeapi.dev/joke/Programming';
    try {
    const response = await fetch(apiUrl); // get the data.
    const data = await response.json(); // this becomes the data converted to json
    if(data.setup){ // check whether is data avilable.
        joke = `${data.setup} ... ${data.delivery}`; // this whehther data has two parts
    }else {
        joke = data.joke; // get the single line of joke
    }
    // converts text to speech
    tellMe(joke)
        // disables button
      toogleButton() // button is diabled when the joke is done.
    }catch(error){
        //catch errors
        console.log('whhops',error)
    }
}

// event listenrs
button.addEventListener('click',getJokes); // pas the jokes functtion
audioElement.addEventListener('ended',toogleButton)