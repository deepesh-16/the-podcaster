import React,{ useState, useRef } from 'react'
import PodcastCard from './PodcastCard';

function DisplayPodcasts(props) {

  return (
    <div className='flex flex-wrap justify-center'>
        {
            props.podcastDetails.map(item => 
                <PodcastCard name={item.podname} desc={item.poddescription} thumbnail={item.thumbnail} file={item.file} type={item.type} speaker={item.speaker} views={item.views} />
            )
        }
    </div>
  )
}

export default DisplayPodcasts