import React from 'react';
import { Text, TouchableOpacity, StyleSheet, ScrollView, Alert, View } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, BookingDetails } from './navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';

type HistoryFacilitiesBookingNavigationProp = NativeStackNavigationProp<RootStackParamList, 'HistoryFacilitiesBooking'>;

interface Props {
  route: {
    params: {
      bookings: BookingDetails[];
    };
  };
  navigation: HistoryFacilitiesBookingNavigationProp;
}

const HistoryFacilitiesBooking: React.FC<Props> = ({ route, navigation }) => {
  const { bookings } = route.params;

  console.log('Original Bookings:', bookings);

  const sortedBookings = [...bookings].sort((a, b) => {
    const dateA = moment(a.selectedDate, 'YYYY-MM-DD', true);
    const dateB = moment(b.selectedDate, 'YYYY-MM-DD', true);

    if (!dateA.isValid() || !dateB.isValid()) {
      console.error('Invalid date format detected:', a.selectedDate, b.selectedDate);
      return 0;
    }

    return dateB.valueOf() - dateA.valueOf();
  });

  console.log('Sorted Bookings:', sortedBookings);

  const clearBookings = async () => {
    Alert.alert(
      'Clear Bookings',
      'Are you sure you want to clear all bookings?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'OK',
          onPress: async () => {
            try {
              await AsyncStorage.removeItem('bookingHistory');
              Alert.alert('Success', 'All bookings cleared successfully!');
              navigation.goBack();
            } catch (error) {
              console.error('Failed to clear booking details:', error);
            }
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>History</Text>
      {sortedBookings.map((booking, index) => (
        <TouchableOpacity
          key={index}
          style={styles.bookingBox}
          onPress={() => navigation.navigate('HistoryFacilitiesBookingDetails', { booking })}
        >
          <View style={styles.bookingInfo}>
            <Text style={styles.bookingTitle}>
              {booking.facility} {booking.selectedDate}
            </Text>
            <Text style={styles.bookingDetails}>
              {booking.selectedTime}, {booking.duration}
            </Text>
          </View>
          <View
            style={[
              styles.statusContainer,
              booking.status === 'Pending' ? styles.pendingBackground : styles.completeBackground,
            ]}
          >
            <Text style={styles.statusText}>{booking.status}</Text>
          </View>
        </TouchableOpacity>
      ))}
      <TouchableOpacity onPress={clearBookings} style={styles.clearButton}>
        <Text style={styles.clearText}>CLEAR ALL BOOKINGS</Text>
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
  bookingBox: {
    backgroundColor: '#E6ECEF',
    padding: 15,
    borderRadius: 10,
    marginVertical: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bookingInfo: {
    flexDirection: 'column',
  },
  bookingTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  bookingDetails: {
    fontSize: 16,
    color: '#000',
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

export default HistoryFacilitiesBooking;
