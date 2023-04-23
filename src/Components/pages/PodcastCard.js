import React, { useState, useRef } from 'react'
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import Modal from 'react-modal';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        bottom: 'auto',
        marginRight: '-40%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'black',
        backgroundRepeat: 'repeat',
        backgroundSize: 'cover',
        color: 'white',
        border: 'none',
        borderRadius: '30px'
    },
};

function PodcastCard(props) {
    const [modalIsOpen, setIsOpen] = useState(false);
    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

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
    return (
        <div className='p-2'>
            <div class="w-[300px] max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <div class="flex justify-end px-4 pt-4">
                    <button class="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5" type="button">
                        <span class="sr-only">Open dropdown</span>
                        <FaRegHeart />
                    </button>
                </div>
                <div class="flex flex-col items-center pb-10">
                    <img class="w-24 h-24 mb-3 rounded shadow-lg" src={props.thumbnail} alt={props.name}/>
                    <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">{props.name}</h5>
                    <span class="text-sm text-gray-500 dark:text-gray-400">{props.description}</span>
                    <div class="flex mt-4 space-x-3 md:mt-6">
                        <button onClick={openModal} className='bg-gray-800 text-white p-2 rounded'>Listen to this podcast!</button>
                        {/* <a href="#" class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add friend</a> */}
                        {/* <a href="#" class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700">Message</a> */}
                    </div>
                </div>
            </div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                ariaHideApp={false}
            >
                <img className="hidden sm:block w-52 rounded-full m-auto pb-2" src={props.thumbnail} alt={props.name} />
                <div className="text-center">
                    <div className="font-bold text-2xl inline mr-2">
                        {props.name}
                    </div>
                </div>
                <br />
                <p>{props.description}</p>

                {props.type==='video' &&
                        <div>
                            <video
                                ref={videoRef}
                                controls
                                onTimeUpdate={handleTimeUpdateVideo}
                                //   onLoadedMetadata={handleLoadedMetadata}
                                src={props.file}
                                type = "video/mp4"
                                >
                                Your browser does not support the video tag.
                                </video>
                            <p>Current time: {currentTime.toFixed(2)}</p>
                        </div>
                    }
                    {
                        props.type==='audio' &&
                        <div>
                            <audio
                                ref={audioRef}
                                controls
                                onTimeUpdate={handleTimeUpdateAudio}
                                src={props.file}
                            >
                                Your browser does not support the audio tag.
                            </audio>
                            <p>Current time: {currentTime.toFixed(2)}</p>
                        </div>
                    }
            </Modal>
        </div>
    )
}

export default PodcastCard