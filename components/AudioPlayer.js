import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Image, View, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';
import { useAudioPlayer } from '../context/AudioPlayerContext';
import Colors from '../colors/Color';

const AudioPlayer = () => {
  const { isPlaying, setIsPlaying } = useAudioPlayer();
  const [sound, setSound] = useState(null);
  const [isMuted, setIsMuted] = useState(false);
  const [position, setPosition] = useState(0);

  useEffect(() => {
    const loadSound = async () => {
      const { sound } = await Audio.Sound.createAsync(require('../audios/audio.mp3'));
      setSound(sound);
    };
    loadSound();

    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);

  useEffect(() => {
    if (sound) {
      const updatePosition = async () => {
        const status = await sound.getStatusAsync();
        if (status.isLoaded) {
          setPosition(status.positionMillis);
        }
      };
      const interval = setInterval(updatePosition, 1000);
      return () => clearInterval(interval);
    }
  }, [sound]);

  const toggleSound = async () => {
    if (!sound) return;

    if (isPlaying) {
      await sound.pauseAsync();
    } else {
      await sound.playAsync();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = async () => {
    if (!sound) return;

    if (isMuted) {
      await sound.setVolumeAsync(1); // Unmute
    } else {
      await sound.setVolumeAsync(0); // Mute
    }
    setIsMuted(!isMuted);
  };

  const progressPercentage = sound ? (position / sound._durationMillis) * 100 : 0;

  return (
      <View style={styles.audioPlayerContainer}>
        <TouchableOpacity onPress={toggleSound}>
          {isPlaying ? (
              <Image source={require('../img/Pause.png')} />
          ) : (
              <Image source={require('../img/play.png')} />
          )}
        </TouchableOpacity>
        <View style={styles.audioBar}>
          <View style={[styles.audioBarSub, { width: `${progressPercentage}%` }]} />
        </View>
        <TouchableOpacity onPress={toggleMute}>
          {isMuted ? (
              <Image source={require('../img/mute.png')} />
          ) : (
              <Image source={require('../img/volumeIcon.png')} />
          )}
        </TouchableOpacity>
      </View>
  );
};

const styles = StyleSheet.create({
  audioPlayerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  audioBar: {
    width: '70%',
    height: 5,
    backgroundColor: Colors.cardBf,
  },
  audioBarSub: {
    height: '100%',
    backgroundColor: Colors.primary,
  },
});

export default AudioPlayer;
