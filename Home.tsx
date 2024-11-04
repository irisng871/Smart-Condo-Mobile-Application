import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';

type HomeNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

// Define the BookingDetails type
type BookingDetails = {
  facility: string;
  selectedDate: string;
  selectedTime: string;
  duration: string;
  status: string;
};

type RequestsDetails = {
  unitNumber: string;
  selectedDate: string;
  duration: string;
  status: string;
};

const Home: React.FC = () => {
  const [newestBooking, setNewestBooking] = useState<BookingDetails | null>(null);
  const [newestRenovation, setNewestRenovation] = useState<RequestsDetails | null>(null);
  const navigation = useNavigation<HomeNavigationProp>();

  useEffect(() => {
    const fetchNewestBooking = async () => {
      try {
        const bookingsData = await AsyncStorage.getItem('bookingHistory');
        const bookings: BookingDetails[] = bookingsData ? JSON.parse(bookingsData) : [];

        if (bookings.length > 0) {
          bookings.sort((a, b) => new Date(b.selectedDate).getTime() - new Date(a.selectedDate).getTime());
          setNewestBooking(bookings[0]);
        }
      } catch (error) {
        console.error('Failed to fetch bookings:', error);
      }
    };

    fetchNewestBooking();
  }, []);

  useEffect(() => {
    const fetchNewestRenovation = async () => {
      try {
        const renovationsData = await AsyncStorage.getItem('renovationHistory');
        const renovations: RequestsDetails[] = renovationsData ? JSON.parse(renovationsData) : [];

        if (renovations.length > 0) {
          renovations.sort((a, b) => new Date(b.selectedDate).getTime() - new Date(a.selectedDate).getTime());
          setNewestRenovation(renovations[0]);
        }
      } catch (error) {
        console.error('Failed to fetch renovations:', error);
      }
    };

    fetchNewestRenovation();
  }, []);

  // Navigation handlers
  const handleProfilePress = () => {
    navigation.navigate('Profile');
  };

  const handleHistoryPress = () => {
    navigation.navigate('History');
  };

  const handleFacilitiesBookingPress = () => {
    navigation.navigate('FacilitiesBooking');
  };

  const handleVisitorPassPress = () => {
    navigation.navigate('VisitorPass');
  };

  const handleRequestRenovationPress = () => {
    navigation.navigate('RequestRenovation');
  };

  const handleCreateComplainPress = () => {
    navigation.navigate('CreateComplain');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Button Grid */}
      <View style={styles.buttonWrapper}>
        <View style={styles.buttonGrid}>
          <ActionButton
            text={'Facilities\nBooking'}
            image={require('./images/facilities-booking-black.png')}
            onPress={handleFacilitiesBookingPress}
          />
          <ActionButton
            text={'Visitor\nPass'}
            image={require('./images/visitor-pass-black.png')}
            onPress={handleVisitorPassPress}
          />
          <ActionButton
            text={'Request\nRenovation'}
            image={require('./images/request-renovation-black.png')}
            onPress={handleRequestRenovationPress}
          />
          <ActionButton
            text={'Create\nComplain'}
            image={require('./images/create-complain-black.png')}
            onPress={handleCreateComplainPress}
          />
        </View>
      </View>

      {/* Upcoming Booking Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Facilities Booking</Text>
        {newestBooking ? (
          <View style={styles.cardContainer}>
            <View style={styles.cardContent}>
              <View>
                <Text style={styles.cardTitle}>{newestBooking.facility} {newestBooking.selectedDate}</Text>
                <Text style={styles.cardSubtitle}>{newestBooking.selectedTime}, {newestBooking.duration}</Text>
              </View>
              <View style={[styles.statusContainer, styles.pendingBackground]}>
                <Text style={styles.statusText}>{newestBooking.status}</Text>
              </View>
            </View>
          </View>
        ) : (
          <Text>No upcoming bookings.</Text>
        )}
      </View>

      {/* Pending Request Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Renovation Request</Text>
        {newestRenovation ? (
          <View style={styles.cardContainer}>
            <View style={styles.cardContent}>
              <View>
                <Text style={styles.cardTitle}>{newestRenovation.unitNumber}</Text>
                <Text style={styles.cardSubtitle}>
                  {newestRenovation.selectedDate}, {newestRenovation.duration}
                </Text>
              </View>
              <View style={[styles.statusContainer, styles.pendingBackground]}>
                <Text style={styles.statusText}>{newestRenovation.status}</Text>
              </View>
            </View>
          </View>
        ) : (
          <Text>No pending renovation requests.</Text>
        )}
      </View>

      {/* Bottom Navigation */}
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
    </ScrollView>
  );
};

// Updated ActionButton Component
const ActionButton: React.FC<{ text: string; image: any; onPress: () => void }> = ({ text, image, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={image} style={styles.cardImage} />
      <Text style={styles.cardText}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fbfbfb',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 20,
  },
  greeting: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    padding: 10,
  },
  logoutIcon: {
    width: 24,
    height: 24,
  },
  buttonGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  buttonWrapper: {
    backgroundColor: '#EFEEEE',
    padding: 10,
    borderRadius: 20,
    marginVertical: 20,
    marginHorizontal: 20,
  },
  card: {
    width: '35%',
    aspectRatio: 1,
    borderRadius: 100,
    backgroundColor: '#B1D0D0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  cardImage: {
    width: 40,
    height: 40,
    marginBottom: 5,
    resizeMode: 'contain',
  },
  cardText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginLeft: 20,
  },
  cardContainer: {
    backgroundColor: '#EFEEEE', // Light background similar to your design
    padding: 15,
    marginHorizontal: 20,
    marginVertical: 8,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#6c757d',
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
});

export default Home;
