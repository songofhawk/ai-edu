import React, { useState } from 'react';
import { usePresentation } from './hooks/usePresentation';
import { SlideViewer } from './components/SlideViewer';
import { AudioController } from './components/AudioController';
import { ControlBar } from './components/ControlBar';

function App() {
  const {
    config,
    currentSlide,
    currentSlideIndex,
    isPlaying,
    togglePlay,
    nextSlide,
    prevSlide,
    onAudioEnded,
    loading,
    totalSlides
  } = usePresentation();

  const [muted, setMuted] = useState(false);

  if (loading) {
    return (
      <div className="h-screen w-screen bg-black flex items-center justify-center text-white">
        <div className="animate-pulse">Loading presentation...</div>
      </div>
    );
  }

  if (!config) {
    return (
      <div className="h-screen w-screen bg-black flex items-center justify-center text-red-500">
        Error loading configuration.
      </div>
    );
  }

  const slideImage = `${config.basePath}/${currentSlide?.image}`;
  const slideAudio = `${config.basePath}/${currentSlide?.audio}`;

  return (
    <div className="relative h-[100dvh] w-screen bg-gray-900 overflow-hidden">
      <SlideViewer
        src={slideImage}
        alt={`Slide ${currentSlideIndex + 1}`}
      />

      <AudioController
        src={slideAudio}
        isPlaying={isPlaying}
        onEnded={onAudioEnded}
        muted={muted}
      />

      <ControlBar
        current={currentSlideIndex}
        total={totalSlides}
        isPlaying={isPlaying}
        onTogglePlay={togglePlay}
        onNext={nextSlide}
        onPrev={prevSlide}
        muted={muted}
        onToggleMute={() => setMuted(!muted)}
      />
    </div>
  );
}

export default App;
