import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { HistoryNavigationProp, BookingDetails, PassDetails, ComplainDetails, RequestsDetails } from './navigation'; // Import your types here
import AsyncStorage from '@react-native-async-storage/async-storage';

const History: React.FC<{ navigation: HistoryNavigationProp }> = ({ navigation }) => {
  const handleProfilePress = () => {
    navigation.navigate('Profile');
  };

  const handleHistoryPress = () => {
    navigation.navigate('History');
  };

  const [bookingDetails, setBookingDetails] = useState<BookingDetails[] | null>(null);
  const [passDetails, setPassDetails] = useState<PassDetails[] | null>(null);
  const [complainDetails, setComplainDetails] = useState<ComplainDetails[] | null>(null);
  const [requestsDetails, setRequestDetails] = useState<RequestsDetails[] | null>(null);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const existingBookings = await AsyncStorage.getItem('bookingHistory');
        if (existingBookings) {
          const bookings = JSON.parse(existingBookings);
          setBookingDetails(bookings);
        }
      } catch (error) {
        console.error('Failed to load booking history', error);
      }
    };

    const fetchPassDetails = async () => {
      try {
        const existingPass = await AsyncStorage.getItem('visitorPassHistory');
        if (existingPass) {
          const pass = JSON.parse(existingPass);
          setPassDetails(pass);
        }
      } catch (error) {
        console.error('Failed to load pass history', error);
      }
    };

    const fetchComplainDetails = async () => {
      try {
        const existingComplains = await AsyncStorage.getItem('complaintHistory');
        if (existingComplains) {
          const complains = JSON.parse(existingComplains);
          setComplainDetails(complains);
        }
      } catch (error) {
        console.error('Failed to load complain history', error);
      }
    };

    const fetchRequestDetails = async () => {
      try {
        const existingRequests = await AsyncStorage.getItem('renovationHistory');
        if (existingRequests) {
          const requests = JSON.parse(existingRequests);
          setRequestDetails(requests);
        }
      } catch (error) {
        console.error('Failed to load request history', error);
      }
    };

    fetchBookingDetails();
    fetchPassDetails();
    fetchComplainDetails();
    fetchRequestDetails();
  }, []);

  return (
    <View style={styles.mainContainer}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <TouchableOpacity
          style={styles.historyButton}
          onPress={() => {
            if (bookingDetails) {
              navigation.navigate('HistoryFacilitiesBooking', { bookings: bookingDetails });
            }
          }}>
          <View style={styles.iconAndText}>
            <Image source={require('./images/facilities-booking-black.png')} style={styles.historyIcon} />
            <Text style={styles.buttonText}>Facilities Booking</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
  style={styles.historyButton}
  onPress={() => {
    console.log('Visitor Pass button pressed');
    console.log('Pass Details before condition check:', passDetails);
    if (passDetails) {
      console.log('Visitor Pass Details:', passDetails);
      navigation.navigate('HistoryVisitorPass', { passes: passDetails });
    }
  }}
>
  <View style={styles.iconAndText}>
    <Image source={require('./images/visitor-pass-black.png')} style={styles.historyIcon} />
    <Text style={styles.buttonText}>Visitor Pass</Text>
  </View>
</TouchableOpacity>

<TouchableOpacity
  style={styles.historyButton}
  onPress={() => {
    console.log('Request Renovation button pressed');
    console.log('Request Details before condition check:', requestsDetails);
    if (requestsDetails) {
      console.log('Request Renovation Details:', requestsDetails);
      navigation.navigate('HistoryRequestRenovation', { renovations: requestsDetails });
    }
  }}
>
  <View style={styles.iconAndText}>
    <Image source={require('./images/request-renovation-black.png')} style={styles.historyIcon} />
    <Text style={styles.buttonText}>Request Renovation</Text>
  </View>
</TouchableOpacity>


        <TouchableOpacity
          style={styles.historyButton}
          onPress={() => {
            if (complainDetails) {
              navigation.navigate('HistoryCreateComplain', { complaint: complainDetails });
            }
          }}>
          <View style={styles.iconAndText}>
            <Image source={require('./images/create-complain-black.png')} style={styles.historyIcon} />
            <Text style={styles.buttonText}>Create Complain</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>

      {/* Fixed Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navButton} onPress={handleProfilePress}>
          <Image source={require('./images/user.png')} style={styles.navIcon} />
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.circleWrapper}>
            <Image source={require('./images/logo.png')} style={styles.navIcon} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={handleHistoryPress}>
          <Image source={require('./images/history.png')} style={styles.navIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  scrollContainer: {
    padding: 16,
    paddingBottom: 80,
  },
  historyButton: {
    backgroundColor: '#E6ECEF',
    padding: 15,
    borderRadius: 25,
    marginVertical: 8,
    marginHorizontal: 10,
    alignItems: 'center',
    flexDirection: 'row',
  },
  iconAndText: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 20,
    color: '#000',
  },
  historyIcon: {
    width: 40,
    height: 40,
    marginLeft: 10,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor: '#5F5E5E',
    paddingVertical: 5,
    marginHorizontal: 20,
    borderRadius: 50,
    marginBottom: 5,
  },
  navButton: {
    padding: 10,
  },
  circleWrapper: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: '#4B9B9B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  navIcon: {
    width: 30,
    height: 30,
  },
});

export default History;
