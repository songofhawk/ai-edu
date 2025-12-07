import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function SlideViewer({ src, alt }) {
    if (!src) return null;

    return (
        <div className="absolute inset-0 flex items-center justify-center bg-black">
            <AnimatePresence mode="wait">
                <motion.img
                    key={src}
                    src={src}
                    alt={alt}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="w-full h-full object-contain max-h-screen"
                />
            </AnimatePresence>
        </div>
    );
}
