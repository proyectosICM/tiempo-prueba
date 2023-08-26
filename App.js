import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  const horaComparar = '12:15:00'; // Hora a comparar en formato HH:mm:ss

  const [currentTime, setCurrentTime] = useState('');
  const [timeDifference, setTimeDifference] = useState('');

  useEffect(() => {
    const getCurrentTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();

      return `${hours}:${minutes}:${seconds}`;
    };

    // Actualizar la hora cada segundo
    const intervalId = setInterval(() => {
      const currentTime = getCurrentTime();
      setCurrentTime(currentTime);

      // Calcular la diferencia de tiempo
      const currentTimeArray = currentTime.split(':').map(Number);
      const compareTimeArray = horaComparar.split(':').map(Number);

      const currentTimeInSeconds =
        currentTimeArray[0] * 3600 + currentTimeArray[1] * 60 + currentTimeArray[2];
      const compareTimeInSeconds =
        compareTimeArray[0] * 3600 + compareTimeArray[1] * 60 + compareTimeArray[2];

      const timeDiffInSeconds = currentTimeInSeconds - compareTimeInSeconds;
      setTimeDifference(timeDiffInSeconds);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  // Calcular la diferencia de tiempo en minutos y segundos
  const timeDifferenceInMinutes = Math.floor(timeDifference / 60);
  const remainingSeconds = timeDifference % 60;

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Text>Hora actual: {currentTime}</Text>
      <Text>Diferencia de tiempo en minutos y segundos: {timeDifferenceInMinutes} minutos {remainingSeconds} segundos</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
