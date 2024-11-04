import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';

type BookingDetails = {
  id: string;
  name: string;
  contact: string;
  unitNumber: string;
  facility: string;
  selectedDate: string;
  selectedTime: string;
  duration: string;
  status: string;
};

const HistoryFacilitiesBookingDetails: React.FC = () => {
  const route = useRoute<RouteProp<{ params: { booking: BookingDetails } }, 'params'>>();
  const booking = route.params.booking;

  return (
    <View style={styles.container}>
      <Text style={styles.detailText}>Name: {booking.name}</Text>
      <Text style={styles.detailText}>Contact: {booking.contact}</Text>
      <Text style={styles.detailText}>Unit Number: {booking.unitNumber}</Text>
      <Text style={styles.detailText}>Facility: {booking.facility}</Text>
      <Text style={styles.detailText}>Date: {booking.selectedDate}</Text>
      <Text style={styles.detailText}>Time: {booking.selectedTime}</Text>
      <Text style={styles.detailText}>Duration: {booking.duration}</Text>
      <Text style={styles.detailText}>Status: {booking.status}</Text>
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

export default HistoryFacilitiesBookingDetails;
