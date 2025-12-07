import React, { useRef, useEffect } from 'react';

export function AudioController({ src, isPlaying, onEnded, muted }) {
    const audioRef = useRef(null);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.pause();
            const playPromise = Promise.resolve();

            if (src) {
                audioRef.current.src = src;
                audioRef.current.load();

                if (isPlaying) {
                    // Wait for animation (500ms) + buffer (100ms)
                    const timer = setTimeout(() => {
                        if (audioRef.current) {
                            audioRef.current.play().catch(e => console.error("Audio play failed", e));
                        }
                    }, 1000);
                    return () => clearTimeout(timer);
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
