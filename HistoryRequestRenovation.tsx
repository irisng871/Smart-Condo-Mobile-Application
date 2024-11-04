import React from 'react';
import { Text, TouchableOpacity, StyleSheet, ScrollView, View, Alert } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootStackParamList, RequestsDetails } from './navigation'; // Adjust the import path as necessary

type HistoryRequestRenovationNavigationProp = NativeStackNavigationProp<RootStackParamList, 'HistoryRequestRenovation'>;

interface Props {
  route: {
    params: {
      renovations: RequestsDetails[];
    };
  };
  navigation: HistoryRequestRenovationNavigationProp;
}

const HistoryRequestRenovation: React.FC<Props> = ({ route, navigation }) => {
  const { renovations } = route.params;

  const clearRenovations = async () => {
    Alert.alert(
      'Clear Renovations',
      'Are you sure you want to clear all renovation requests?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'OK',
          onPress: async () => {
            try {
              await AsyncStorage.removeItem('renovationHistory');
              Alert.alert('Success', 'All renovation requests cleared successfully!');
              navigation.goBack();
            } catch (error) {
              console.error('Failed to clear renovation history:', error);
            }
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>History</Text>
      {renovations.length === 0 ? (
        <Text style={styles.noRenovations}>No renovation requests recorded.</Text>
      ) : (
        renovations.map((renovation, index) => (
          <TouchableOpacity
            key={index}
            style={styles.renovationBox}
            onPress={() => navigation.navigate('HistoryRequestRenovationDetails', { renovation })}
          >
            <View style={styles.renovationInfo}>
              <Text style={styles.unitNumber}>{renovation.unitNumber}</Text>
              <Text style={styles.renovationDetails}>
                {renovation.selectedDate}, {renovation.duration}
              </Text>
            </View>
            <View style={[styles.statusContainer, renovation.status === 'pending' ? styles.pendingBackground : styles.completeBackground]}>
              <Text style={styles.statusText}>{renovation.status}</Text>
            </View>
          </TouchableOpacity>
        ))
      )}
      <TouchableOpacity onPress={clearRenovations} style={styles.clearButton}>
        <Text style={styles.clearText}>CLEAR ALL RENOVATIONS</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 16,
  },
  noRenovations: {
    fontSize: 18,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },
  renovationBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E6ECEF',
    padding: 10,
    borderRadius: 10,
    marginVertical: 8,
    justifyContent: 'space-between',
  },
  renovationInfo: {
    flex: 1,
  },
  unitNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  renovationDetails: {
    fontSize: 14,
    color: '#555',
  },
  statusContainer: {
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
    alignSelf: 'flex-start',
    marginTop: 30,
  },
  statusText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  pendingBackground: {
    backgroundColor: '#437ACC',
  },
  completeBackground: {
    backgroundColor: '#39CB21',
  },
  clearButton: {
    backgroundColor: 'red',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  clearText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default HistoryRequestRenovation;
