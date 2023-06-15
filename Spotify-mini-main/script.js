console.log("welcome to spotify")

//initialize the variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let timeStamps = document.getElementsByClassName('timeStamp');

let songs=[  //key values pair will be there
    {songName: "Heat Wave - Glass Animals",filePath: "songs/1.mp3",coverPath:"covers/1.jpg"},
    {songName: "Talking to the moon - Bruno Mars",filePath: "songs/2.mp3",coverPath:"covers/2.jpg"},
    {songName: "Fasle - Aditya Rikhari",filePath: "songs/3.mp3",coverPath:"covers/3.jpg"},
    {songName: "Perfect - One Direction",filePath: "songs/4.mp3",coverPath:"covers/4.jpg"},
    {songName: "Story of my life - One Direction",filePath: "songs/5.mp3",coverPath:"covers/5.jpg"},
    {songName: "Locked Out of heaven - Bruno Mars",filePath: "songs/6.mp3",coverPath:"covers/6.jpg"},
    {songName: "Maps - Maroon 5",filePath: "songs/7.mp3",coverPath:"covers/7.jpg"},
    {songName: "Sweeter Weather - The NeighburHood",filePath: "songs/8.mp3",coverPath:"covers/8.jpg"}
]

songItems.forEach((element,i)=>{
    // console.log(element,i);
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerHTML = songs[i].songName;
})

// audioElement.play;
//handlle play pause click
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;   //to make visible the gif
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
    }
})

//Listen to events
//changing the rnage of sliding bar as the duration is increases.
audioElement.addEventListener('timeupdate',()=>{
    // console.log('timeupdate');
    //update seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100); //how much percent the song is run
    // percentTime = (currentTime/durationOfAudio)*100
    
    myProgressBar.value = progress;    //initially its value is zero
    timeStamps.innerText = `progress`;
    
})

myProgressBar.addEventListener('change',()=>{
    // currenttime = (percentTime*durationOfAudio)/100;
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

// timeStamps.addEventListener('change',()=>{
//     timeStamps.innerText = progress;
// })

const makeAllPlays= ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        // console.log(e.target);
        makeAllPlays();  //it pauses all the played song previously
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src = `songs/${songIndex}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        console.log(songIndex);
        audioElement.currentTime=0;
        audioElement.play();
        gif.style.opacity=1;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
    })
})
// Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
//     element.addEventListener('click',(e)=>{
//         // console.log(e.target);
//         makeAllPlays();  //it pauses all the played song previously
//         songIndex = parseInt(e.target.id);
//         e.target.classList.remove('fa-circle-play');
//         e.target.classList.add('fa-circle-pause');
//         audioElement.src = `songs/${songIndex}.mp3`;
//         masterSongName.innerText = songs[songIndex].songName;
//         audioElement.currentTime=0;
//         if(audioElement.pause()){
//             audioElement.play();
//             gif.style.opacity=1;
//             masterPlay.classList.remove('fa-circle-play');
//             masterPlay.classList.add('fa-circle-pause');
//         }
//         else{
//             audioElement.pause();
//         }
//     })
// })


document.getElementById('next').addEventListener('click',()=>{
    if(songIndex>7){
        songIndex = 0;
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})

document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex<=0){
        songIndex = 0;
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})