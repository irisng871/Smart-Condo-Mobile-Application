import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';

type RenovationDetails = {
  id: string;
  name: string;
  contact: string;
  unitNumber: string;
  selectedDate: string;
  duration: string | null;
  status: string;
};

const HistoryRequestRenovationDetails: React.FC = () => {
  const route = useRoute<RouteProp<{ params: { renovation: RenovationDetails } }, 'params'>>();
  const renovation = route.params.renovation;

  return (
    <View style={styles.container}>
      <Text style={styles.detailText}>Name: {renovation.name}</Text>
      <Text style={styles.detailText}>Contact: {renovation.contact}</Text>
      <Text style={styles.detailText}>Unit Number: {renovation.unitNumber}</Text>
      <Text style={styles.detailText}>Date: {renovation.selectedDate}</Text>
      <Text style={styles.detailText}>Duration: {renovation.duration}</Text>
      <Text style={styles.detailText}>Status: {renovation.status}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 30,
    paddingHorizontal: 24,
    backgroundColor: '#E6ECEF',
    flex: 1,
  },
  detailText: {
    fontSize: 20,
    lineHeight: 28,
    marginBottom: 14,
    color: '#333',
  },
});

export default HistoryRequestRenovationDetails;
