import React from 'react'
import { useRef } from 'react';
import VideoJS from '../components/VideoJS'
import videojs from 'video.js';

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
        }],
        // breakpoints: {
        //     medium: 210
        // },
        // breakpoints: true
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
    };

    return (
        <>
            <div>Rest of app here</div>
            <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
            <div>Rest of app here</div>
        </>
    );
}