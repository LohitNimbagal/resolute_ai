import React, { useState } from 'react'
import { useRef } from 'react';
import VideoJS from '../components/VideoJS'
import videojs from 'video.js';

const comments = [
    { time: 5, comment: "Comment at 5 seconds" },
    { time: 10, comment: "Comment at 10 seconds" },
    { time: 15, comment: "Comment at 15 seconds" },
]

export default function VideoPlayer() {
    const refPlayer = useRef(null);

    const videoJsOptions = {
        autoplay: false,
        controls: true,
        responsive: true,
        fluid: true,
        sources: [{
            src: 'https://media-files.vidstack.io/720p.mp4',
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
        });
    };

    const syncComments = (currentTime) => {
        console.log('Current Time:', currentTime);
    };

    return (
        <>
            <div>Rest of app here</div>
            <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
            <div>Rest of app here</div>
        </>
    );
}