import React, { useRef, useEffect } from 'react';

export function AudioController({ src, isPlaying, onEnded, muted }) {
    const audioRef = useRef(null);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.pause();
            if (src) {
                audioRef.current.src = src;
                audioRef.current.load();
                if (isPlaying) {
                    audioRef.current.play().catch(e => console.error("Audio play failed", e));
                }
            }
        }
    }, [src]);

    useEffect(() => {
        if (audioRef.current && src) {
            if (isPlaying) {
                audioRef.current.play().catch(e => console.error("Audio play failed", e));
            } else {
                audioRef.current.pause();
            }
        }
    }, [isPlaying, src]);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.muted = muted;
        }
    }, [muted]);

    return (
        <audio
            ref={audioRef}
            onEnded={onEnded}
            className="hidden"
        />
    );
}
