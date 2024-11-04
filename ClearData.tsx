import React from 'react';
import { Text, Button, View, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNFS from 'react-native-fs';
import EncryptedStorage from 'react-native-encrypted-storage';
import CookieManager from '@react-native-cookies/cookies';
import { useDispatch } from 'react-redux';

const clearAsyncStorage = async () => {
  try {
    await AsyncStorage.clear();
    console.log('AsyncStorage cleared');
  } catch (error) {
    console.error('Failed to clear AsyncStorage:', error);
  }
};

const clearCache = async () => {
  try {
    const cacheDir = RNFS.CachesDirectoryPath;
    await RNFS.unlink(cacheDir);
    console.log('Cache cleared');
  } catch (error) {
    console.error('Failed to clear cache:', error);
  }
};

const clearEncryptedStorage = async () => {
  try {
    await EncryptedStorage.clear();
    console.log('Encrypted storage cleared');
  } catch (error) {
    console.error('Failed to clear encrypted storage:', error);
  }
};

const clearCookies = async () => {
  try {
    await CookieManager.clearAll();
    console.log('Cookies cleared');
  } catch (error) {
    console.error('Failed to clear cookies:', error);
  }
};

const clearBookings = async () => {
  try {
    await AsyncStorage.removeItem('bookings');
    console.log('Booking details cleared');
  } catch (error) {
    console.error('Failed to clear booking details:', error);
  }
};

const clearAllAppData = async (dispatch: any) => {
  try {
    console.log('Clearing AsyncStorage...');
    await clearAsyncStorage();

    console.log('Clearing Redux State...');
    dispatch({ type: 'RESET_STATE' });

    console.log('Clearing Cache...');
    await clearCache();

    console.log('Clearing Encrypted Storage...');
    await clearEncryptedStorage();

    console.log('Clearing Cookies...');
    await clearCookies();

    console.log('Clearing Booking Details...');
    await clearBookings();

    console.log('All app data cleared');
  } catch (error) {
    console.error('Failed to clear all app data:', error);
  }
};

const ClearData: React.FC = () => {
  const dispatch = useDispatch();

  const handleClearData = () => {
    clearAllAppData(dispatch);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Clear All App Data</Text>
      <Button title="Clear Data" onPress={handleClearData} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default ClearData;
