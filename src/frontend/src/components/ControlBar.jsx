import React from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from 'lucide-react';

export function ControlBar({
    current,
    total,
    isPlaying,
    onTogglePlay,
    onNext,
    onPrev,
    muted,
    onToggleMute
}) {
    return (
        <div className="fixed bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 z-50 w-[90%] md:w-auto max-w-xl bg-black/60 backdrop-blur-md border border-white/10 rounded-full px-4 py-2 md:px-6 md:py-3 flex items-center justify-between md:justify-center gap-1 md:gap-6 shadow-2xl transition-opacity hover:opacity-100 opacity-90 md:opacity-80">
            <button
                onClick={onPrev}
                className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                disabled={current === 0}
            >
                <SkipBack size={24} />
            </button>

            <button
                onClick={onTogglePlay}
                className="p-3 md:p-4 bg-white text-black rounded-full hover:scale-105 transition-transform"
            >
                {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" />}
            </button>

            <button
                onClick={onNext}
                className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                disabled={current === total - 1}
            >
                <SkipForward size={24} />
            </button>

            <div className="w-px h-6 md:h-8 bg-white/20 mx-1 md:mx-2" />

            <button
                onClick={onToggleMute}
                className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors"
            >
                {muted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>

            <div className="text-sm font-medium text-white/60 tabular-nums">
                {current + 1} / {total}
            </div>
        </div>
    );
}
