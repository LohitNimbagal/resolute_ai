import React from 'react'
import { useRef } from 'react';
import VideoJS from '../components/VideoJS'
import videojs from 'video.js';

const comments = [
    { time: 5.1, comment: "Comment at 5.1 seconds" },
    { time: 5.4, comment: "Comment at 5.4 seconds" },
    { time: 5.7, comment: "Comment at 5.7 seconds" },
    { time: 10.2, comment: "Comment at 10.2 seconds" },
    { time: 10.7, comment: "Comment at 10.7 seconds" },
    { time: 10.4, comment: "Comment at 10.4 seconds" },
    { time: 15.1, comment: "Comment at 15.1 seconds" },
    { time: 15.9, comment: "Comment at 15.9 seconds" },
    { time: 15.4, comment: "Comment at 15.3 seconds" },
]

export default function Home() {
    const refPlayer = useRef(null)
    const timeRef = useRef(null)

    const videoJsOptions = {
        autoplay: false,
        controls: true,
        responsive: true,
        fluid: true,
        sources: [{
            src: '/videoOne.mp4',
            type: 'video/mp4'
        }]
    };

    const handlePlayerReady = (player) => {
        refPlayer.current = player;

        // You can handle player events here, for example:
        player.on('waiting', () => {
            videojs.log('player is waiting');
        });

        player.on('dispose', () => {
            videojs.log('player will dispose');
        });

        player.on('timeupdate', () => {
            const currentTime = player.currentTime(); // Get current time
            syncComments(currentTime);
            // timeRef.current = currentTime
            // console.log(timeRef.current);
        });
    };

    const syncComments = (currentTime) => {
        console.log('Current Time:', currentTime.toFixed(1));

        const tolerance = 0.15;

        const matchedComments = comments
            .filter(comment => Math.abs(comment.time - currentTime.toFixed(1)) <= tolerance)
            .map(comment => comment.comment);

        if (matchedComments.length > 0) {
            console.log(matchedComments);
            const commentsContainer = document.getElementById("comments-container")
            const p = document.createElement('p');
            p.textContent = matchedComments;
            commentsContainer.appendChild(p);
        }
    };

    return (
        <>
            <div className='w-full min-h-screen p-5'>
                <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
                <div id='comments-container' className='text-black dark:text-white'>
                    <h2 className='font-bold text-xl'>Comments</h2>
                </div>
            </div>
        </>
    );
}