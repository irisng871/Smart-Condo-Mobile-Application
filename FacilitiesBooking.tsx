import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { FacilitiesBookingNavigationProp } from './navigation';

const FacilitiesBooking: React.FC<{ navigation: FacilitiesBookingNavigationProp }> = ({ navigation }) => {
  // Navigation handlers
  const handleProfilePress = () => {
    navigation.navigate('Profile');
  };

  const handleHistoryPress = () => {
    navigation.navigate('History');
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Facilities List</Text>

        {/* Badminton Court Button */}
        <TouchableOpacity
          style={styles.facilityButton}
          onPress={() => navigation.navigate('FacilitiesDetails', {
            name: 'Badminton Court',
            image: require('./images/badminton_court.png'),
            location: 'Level 3',
            hours: '\nMonday to Sunday: 7:00 AM – 10:00 PM',
            specifications: [
              'Professional-grade wooden flooring with anti-slip surface',
              'LED floodlights for even court illumination',
              'Standard-height net setup as per badminton regulations',
              'Rackets and shuttlecocks are not provided. Residents required to bring their own.',
            ],
          })}
        >
          <View style={styles.iconAndText}>
            <Image source={require('./images/badminton_icon.png')} style={styles.facilityIcon} />
            <Text style={styles.buttonText}>Badminton Court</Text>
          </View>
        </TouchableOpacity>

        {/* BBQ Pits Button */}
        <TouchableOpacity
          style={styles.facilityButton}
          onPress={() => navigation.navigate('FacilitiesDetails', {
            name: 'BBQ Pits',
            image: require('./images/bbq_pits.jpg'),
            location: 'Level 2',
            hours: '\nMonday to Sunday: 10:00 AM – 10:00 PM',
            specifications: [
              'Tables with benches',
              'Trash bins and recycling stations',
              'Nearby sink for washing up',
              'Electrical outlets for additional cooking equipment',
              'No loud music or disturbances to other residents',
              'No cooking of prohibited items as per condo regulations (e.g., large animals, non-food items).',
            ],
          })}
        >
          <View style={styles.iconAndText}>
            <Image source={require('./images/bbq_icon.png')} style={styles.facilityIcon} />
            <Text style={styles.buttonText}>BBQ Pits</Text>
          </View>
        </TouchableOpacity>

        {/* Multipurpose Room Button */}
        <TouchableOpacity
          style={styles.facilityButton}
          onPress={() => navigation.navigate('FacilitiesDetails', {
            name: 'Multipurpose Room',
            image: require('./images/multipurpose_room.jpg'),
            location: 'Level 2',
            hours: '\nMonday to Sunday: 9:00 AM – 10:00 PM',
            specifications: [
              'Projector and screen',
              'Whiteboard and markers',
              'Sound system with microphones',
              'Wi-Fi access',
              'Air conditioning',
              'Decorations are allowed but must be removed after the event',
              'All electrical equipment and lights must be turned off after use',
            ],
          })}
        >
          <View style={styles.iconAndText}>
            <Image source={require('./images/room_icon.png')} style={styles.facilityIcon} />
            <Text style={styles.buttonText}>Multipurpose Room</Text>
          </View>
        </TouchableOpacity>

        {/* Mini Cinema Button */}
        <TouchableOpacity
          style={styles.facilityButton}
          onPress={() => navigation.navigate('FacilitiesDetails', {
            name: 'Mini Cinema',
            image: require('./images/mini_cinema.jpg'),
            location: 'Level 3',
            hours: '\nMonday to Sunday: 12:00 PM – 10:00 PM',
            specifications: [
              '9 luxurious recliner seats with cup holders',
              '100-inch HD projector screen',
              'Dolby Surround Sound with immersive audio experience',
              'Full HD 4K projector with HDMI, USB, and Blu-ray compatibility',
              'Access to streaming services like Netflix and YouTube (via personal accounts)',
            ],
          })}
        >
          <View style={styles.iconAndText}>
            <Image source={require('./images/cinema_icon.png')} style={styles.facilityIcon} />
            <Text style={styles.buttonText}>Mini Cinema</Text>
          </View>
        </TouchableOpacity>

        {/* Tennis Court Button */}
        <TouchableOpacity
          style={styles.facilityButton}
          onPress={() => navigation.navigate('FacilitiesDetails', {
            name: 'Tennis Court',
            image: require('./images/tennis_court.jpg'),
            location: 'Level 1',
            hours: '\nMonday to Sunday: 12:00 PM – 10:00 PM',
            specifications: [
              'Hard court with professional-grade acrylic surface',
              'Only non-marking tennis shoes are allowed on the court',
              'Proper sports attire is required',
              'Players are responsible for bringing their own rackets and balls',
              'Residents are expected to leave the court clean and dispose of any waste',
            ],
          })}
        >
          <View style={styles.iconAndText}>
            <Image source={require('./images/tennis_icon.png')} style={styles.facilityIcon} />
            <Text style={styles.buttonText}>Tennis Court</Text>
          </View>
        </TouchableOpacity>

        {/* Yoga Room Button */}
        <TouchableOpacity
          style={styles.facilityButton}
          onPress={() => navigation.navigate('FacilitiesDetails', {
            name: 'Yoga Room',
            image: require('./images/yoga_room.png'),
            location: 'Level 3',
            hours: '\nMonday to Sunday: 6:00 AM – 9:00 PM',
            specifications: [
              'Cushioned wooden flooring with anti-slip mats',
              'Dimmable LED lights for a relaxing ambiance',
              'Air-conditioned',
              'Full-length mirrors on one wall',
              'Bluetooth sound system for personal playlists',
              'No loud music or disruptive behavior is allowed',
              'Proper yoga attire is required',
            ],
          })}
        >
          <View style={styles.iconAndText}>
            <Image source={require('./images/yoga_icon.png')} style={styles.facilityIcon} />
            <Text style={styles.buttonText}>Yoga Room</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('Booking')}>
            <LinearGradient
              colors={['#8ACDCD', '#266F6F']}
              start={{ x: 0, y: 0 }}  // From left
              end={{ x: 1, y: 0 }}    // To right
              style={styles.bookNowButton}
            >
              <Text style={styles.bookNowText}>BOOK NOW !</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom Navigation (Example Icons) */}
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
  container: {
    flex: 1,
  },
  scrollContainer: {
    padding: 16,
    flexGrow: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
    marginLeft: 20,
  },
  facilityButton: {
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
  facilityIcon: {
    width: 40,
    height: 40,
    marginLeft: 10,
  },
  bookNowButton: {
    width: 160,
    height: 46,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    marginBottom: 30,
  },
  bookNowText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
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

export default FacilitiesBooking;
