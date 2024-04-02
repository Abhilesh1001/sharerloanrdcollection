'use client'
function createAudio(src:string) {
    if (typeof window !== 'undefined') {
        return new Audio(src);
    } else {
        
        return null;
    }
}

// Usage example:
export const soundClick = createAudio('/2.mp3');
export const soundSsuccess = createAudio('/3.wav');
export const soundError = createAudio('/error.mp3');
