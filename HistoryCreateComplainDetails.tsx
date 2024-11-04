import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';

type ComplainDetails = {
  id: string;
  title: string;
  message: string;
};

const HistoryCreateComplainDetails: React.FC = () => {
  const route = useRoute<RouteProp<{ params: { complaint: ComplainDetails } }, 'params'>>();
  const complaint = route.params.complaint;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Complaint Details</Text>
      <Text style={styles.detailText}>Title: {complaint.title}</Text>
      <Text style={styles.detailText}>Message: {complaint.message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#E6ECEF',
    flex: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 16,
  },
  detailText: {
    fontSize: 18,
    color: '#000',
    marginBottom: 10,
  },
});

export default HistoryCreateComplainDetails;
