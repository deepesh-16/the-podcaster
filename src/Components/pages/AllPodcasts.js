import React,{ useState, useRef } from 'react'
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import PodcastCard from './PodcastCard';

function DisplayPodcasts(props) {
    const [currentTime, setCurrentTime] = useState(0);
    const audioRef = useRef(0);
    const videoRef = useRef(null);

    const handleTimeUpdateAudio = () => {
        const time = audioRef.current.currentTime;
        setCurrentTime(time);
    };

    const handleTimeUpdateVideo = () => {
        const time = videoRef.current.currentTime;
        setCurrentTime(time);
    };

    // const handleLoadedMetadata = () => {
    //     if (startTime) {
    //     videoRef.current.currentTime = startTime;
    //     setCurrentTime(startTime);
    //     }
    // };

  return (
    <div className='flex flex-wrap justify-center'>
        {
            props.podcastDetails.map(item => 
                <PodcastCard name={item.podname} desc={item.poddescription} thumbnail={item.thumbnail} file={item.file} type={item.type} speaker={item.speaker} views={item.views} />
                    // {
                    //     item.type==='video' &&
                    //     <div>
                    //         <video
                    //             ref={videoRef}
                    //             controls
                    //             onTimeUpdate={handleTimeUpdateVideo}
                    //             //   onLoadedMetadata={handleLoadedMetadata}
                    //             src={item.file}
                    //             type = "video/mp4"
                    //             >
                    //             Your browser does not support the video tag.
                    //             </video>
                    //         <p>Current time: {currentTime.toFixed(2)}</p>
                    //     </div>
                    // }
                    // {
                    //     item.type==='audio' &&
                    //     <div>
                    //         <audio
                    //             ref={audioRef}
                    //             controls
                    //             onTimeUpdate={handleTimeUpdateAudio}
                    //             src={item.file}
                    //         >
                    //             Your browser does not support the audio tag.
                    //         </audio>
                    //         <p>Current time: {currentTime.toFixed(2)}</p>
                    //     </div>
                    // }
            )
        }
    </div>
  )
}

export default DisplayPodcasts