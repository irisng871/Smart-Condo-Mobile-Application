import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from './navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';

type HistoryCreateComplainNavigationProp = NativeStackNavigationProp<RootStackParamList, 'HistoryCreateComplain'>;

interface Props {
  navigation: HistoryCreateComplainNavigationProp;
}

export interface ComplainDetails {
  id: string;
  title: string;
  message: string;
}

const HistoryCreateComplain: React.FC<Props> = ({ navigation }) => {
  const [complaints, setComplaints] = useState<ComplainDetails[]>([]);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const existingComplaints = await AsyncStorage.getItem('complaintHistory');
        if (existingComplaints) {
          const parsedComplaints: ComplainDetails[] = JSON.parse(existingComplaints);
          setComplaints(parsedComplaints);
        }
      } catch (error) {
        console.error('Failed to load complaint history:', error);
      }
    };

    fetchComplaints();
  }, []);

  const clearComplaints = async () => {
    Alert.alert(
      'Clear Complaints',
      'Are you sure you want to clear all complaints?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'OK',
          onPress: async () => {
            try {
              await AsyncStorage.removeItem('complaintHistory');
              setComplaints([]);
              Alert.alert('Success', 'All complaints cleared successfully!');
            } catch (error) {
              console.error('Failed to clear complaint details:', error);
            }
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Complaint History</Text>
      {complaints.length === 0 ? (
        <Text style={styles.noComplaints}>No complaints recorded.</Text>
      ) : (
        complaints.map((complaint, index) => (
          <TouchableOpacity
            key={index}
            style={styles.complaintBox}
            onPress={() => navigation.navigate('HistoryCreateComplainDetails', { complaint })}
          >
            <Text style={styles.complaintTitle}>{complaint.title}</Text>
            <Text style={styles.complaintMessage}>{complaint.message}</Text>
          </TouchableOpacity>
        ))
      )}
      <TouchableOpacity onPress={clearComplaints} style={styles.clearButton}>
        <Text style={styles.clearText}>CLEAR ALL COMPLAINTS</Text>
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
  noComplaints: {
    fontSize: 18,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },
  complaintBox: {
    backgroundColor: '#E6ECEF',
    padding: 15,
    borderRadius: 10,
    marginVertical: 8,
  },
  complaintTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  complaintMessage: {
    fontSize: 16,
    color: '#000',
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

export default HistoryCreateComplain;
