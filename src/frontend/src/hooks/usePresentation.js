import { useState, useEffect, useRef, useCallback } from 'react';

export function usePresentation(configUrl = '/config.json') {
    const [config, setConfig] = useState(null);
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [loading, setLoading] = useState(true);
    const [audioEnded, setAudioEnded] = useState(false);
    // We use this state to trigger auto-advance when audio ends

    const totalSlides = config?.slides?.length || 0;
    const currentSlide = config?.slides?.[currentSlideIndex];

    useEffect(() => {
        fetch(configUrl)
            .then(res => res.json())
            .then(data => {
                setConfig(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to load config", err);
                setLoading(false);
            });
    }, [configUrl]);

    const goToSlide = useCallback((index) => {
        if (!config) return;
        if (index >= 0 && index < config.slides.length) {
            setCurrentSlideIndex(index);
            setAudioEnded(false);
        }
    }, [config]);

    const nextSlide = useCallback(() => {
        if (!config) return;
        if (currentSlideIndex < config.slides.length - 1) {
            goToSlide(currentSlideIndex + 1);
        } else {
            setIsPlaying(false); // Stop at end
        }
    }, [config, currentSlideIndex, goToSlide]);

    const prevSlide = useCallback(() => {
        if (currentSlideIndex > 0) {
            goToSlide(currentSlideIndex - 1);
        }
    }, [currentSlideIndex, goToSlide]);

    const togglePlay = useCallback(() => {
        setIsPlaying(prev => !prev);
    }, []);

    // Auto-advance logic
    useEffect(() => {
        if (isPlaying && audioEnded) {
            const currentDelay = currentSlide?.delay ?? config?.defaultDelay ?? 2500;
            const timer = setTimeout(() => {
                nextSlide();
            }, currentDelay);
            return () => clearTimeout(timer);
        }
    }, [isPlaying, audioEnded, nextSlide, currentSlide, config]);

    return {
        config,
        currentSlideIndex,
        currentSlide,
        isPlaying,
        setIsPlaying,
        nextSlide,
        prevSlide,
        goToSlide,
        togglePlay,
        loading,
        totalSlides,
        onAudioEnded: () => setAudioEnded(true)
    };
}
