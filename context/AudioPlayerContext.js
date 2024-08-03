// context/AudioPlayerContext.js
import React, { createContext, useState, useContext } from 'react';

const AudioPlayerContext = createContext();

export const AudioPlayerProvider = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
      <AudioPlayerContext.Provider value={{ isPlaying, setIsPlaying }}>
        {children}
      </AudioPlayerContext.Provider>
  );
};

export const useAudioPlayer = () => useContext(AudioPlayerContext);
