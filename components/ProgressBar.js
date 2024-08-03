import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useProgressBar } from '../context/ProgressBarContext';
import { useAudioPlayer } from '../context/AudioPlayerContext';
import Colors from '../colors/Color';
import Svg, { Path } from 'react-native-svg';
import { scale } from 'react-native-size-matters';

const ProgressBar = ({ questions, currentQuestionIndex, onQuestionComplete }) => {
  const {
    progress,
    setProgress,
    resetProgress,
    resetProgressDone,
    totalTime,
    setTotalTime,
    stopTimer,
  } = useProgressBar();
  const { isPlaying } = useAudioPlayer(); // Access the audio player's state

  const [timePassed, setTimePassed] = useState(0);

  useEffect(() => {
    let interval;

    if (resetProgress) {
      resetProgressHandler();
    } else if (!isPlaying && !stopTimer) { // Only start the timer if the audio is not playing
      interval = setInterval(() => {
        setTimePassed((prevTime) => {
          const newTime = prevTime + 1;
          if (newTime >= 10) {
            clearInterval(interval);
            handleQuestionComplete();
            return 0;
          }
          return newTime;
        });
        setProgress((prevProgress) => {
          if (prevProgress > 0) {
            return prevProgress - 10;
          }
          return 0;
        });
        setTotalTime((prevTotalTime) => prevTotalTime + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [resetProgress, currentQuestionIndex, stopTimer, isPlaying]); // Add isPlaying as a dependency

  useEffect(() => {
    setTimePassed(0);
    setProgress(100);
  }, [currentQuestionIndex, questions]);

  const resetProgressHandler = () => {
    setProgress(100);
    setTimePassed(0);
    resetProgressDone();
  };

  const handleQuestionComplete = () => {
    onQuestionComplete();
  };

  const formatTime = (seconds) => {
    return `${10 - seconds}s`;
  };

  return (
      <View style={styles.container}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${progress}%` }]}>
            <View style={styles.progressCenter}>
              <Svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <Path
                    d="M10.875 6.625C10.875 9.04 8.915 11 6.5 11C4.085 11 2.125 9.04 2.125 6.625C2.125 4.21 4.085 2.25 6.5 2.25C8.915 2.25 10.875 4.21 10.875 6.625Z"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <Path
                    d="M6.5 4V6.5"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <Path
                    d="M5 1H8"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
              </Svg>
              <Text style={styles.timerText}>{formatTime(timePassed)}</Text>
            </View>
          </View>
        </View>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: 'center',
  },
  progressBar: {
    backgroundColor: 'gray',
    height: 20,
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
  },
  progressFill: {
    backgroundColor: Colors.primary,
    height: '100%',
    position: 'relative',
  },
  progressCenter: {
    position: 'absolute',
    left: scale(100),
    transform: [{ translateX: -6.5 }],
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timerText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 4,
  },
});

export default ProgressBar;
