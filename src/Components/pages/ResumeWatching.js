import React, { useState, useRef, useEffect} from 'react'
import axios from 'axios'
import AllPodcasts from './AllPodcasts';


function ResumeWatching() {
  const handleClick = () => {
      const temp = {
        name: "Hello world",
        email: "hello@world.com"
      }
      axios.post('http://localhost:4000/favorite-api/add-to-favorites',temp)
      .then(response => {
          console.log(response)
      })
      .catch(error => alert(error))
  }
  const [podcastDetails,setPodcastDetails] = useState([]);

  useEffect(()=>{
    axios.get('http://localhost:4000/podcast-api/getpodcast')
    .then(response => {
      setPodcastDetails(response.data.payload);
    })
    .catch(error=> alert(error));
  },[podcastDetails]);

  return (
    <div>
      {/* <button onClick={handleClick}>
        Hello
      </button> */}
      {/* <audio
        ref={audioRef}
        controls
        onTimeUpdate={handleTimeUpdateAudio}
        src={audiofile}
      >
        Your browser does not support the audio tag.
      </audio>
      <p>Current time: {currentTime.toFixed(2)}</p> */}
      { podcastDetails.length > 0 && <AllPodcasts podcastDetails={podcastDetails}/>}
    </div>
  )
}

export default ResumeWatching