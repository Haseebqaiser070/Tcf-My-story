import React, { createContext, useContext, useState } from 'react';

const ProgressBarContext = createContext();

export const ProgressBarProvider = ({ children }) => {
    const [progress, setProgress] = useState(100);
    const [resetProgress, setResetProgress] = useState(false);
    const [totalTime, setTotalTime] = useState(0);
    const [stopTimer, setStopTimer] = useState(false);

    const resetProgressDone = () => setResetProgress(false);

    const restartProgress = () => {
        setResetProgress(true);
        setStopTimer(false);
    };

    return (
        <ProgressBarContext.Provider
            value={{
                progress,
                setProgress,
                resetProgress,
                restartProgress,
                resetProgressDone,
                totalTime,
                setTotalTime,
                stopTimer,
                setStopTimer,
            }}
        >
            {children}
        </ProgressBarContext.Provider>
    );
};

export const useProgressBar = () => {
    return useContext(ProgressBarContext);
};
