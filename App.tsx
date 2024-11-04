import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Home';
import Profile from './Profile';
import FacilitiesBooking from './FacilitiesBooking';
import FacilitiesDetails from './FacilitiesDetails';
import Booking from './Booking';
import VisitorPass from './VisitorPass';
import RequestRenovation from './RequestRenovation';
import PayDeposit from './PayDeposit';
import CreateComplain from './CreateComplain';
import History from './History';
import HistoryFacilitiesBooking from './HistoryFacilitiesBooking';
import HistoryFacilitiesBookingDetails from './HistoryFacilitiesBookingDetails';
import HistoryVisitorPass from './HistoryVisitorPass';
import HistoryVisitorPassDetails from './HistoryVisitorPassDetails';
import HistoryRequestRenovation from './HistoryRequestRenovation';
import HistoryRequestRenovationDetails from './HistoryRequestRenovationDetails';
import HistoryCreateComplain from './HistoryCreateComplain';
import HistoryCreateComplainDetails from './HistoryCreateComplainDetails';
import { RootStackParamList } from './navigation';

const logoutButtonStyle = {
  width: 24,
  height: 24,
  marginRight: 10,
};

const LogoutButton = () => (
  <TouchableOpacity>
    <Image
      source={require('./images/logout.png')}
      style={logoutButtonStyle}
    />
  </TouchableOpacity>
);

const ProfileHeader = () => (
  <View style={styles.headerContainer}>
    <Image
      source={require('./images/user.png')}
      style={styles.icon}
    />
    <Text style={styles.title}>Profile</Text>
  </View>
);

const FacilitiesBookingHeader = () => (
  <View style={styles.headerContainer}>
    <Image
      source={require('./images/facilities-booking-white.png')}
      style={styles.icon}
    />
    <Text style={styles.title}>Facilities Booking</Text>
  </View>
);

const VisitorPassHeader = () => (
  <View style={styles.headerContainer}>
    <Image
      source={require('./images/visitor-pass-white.png')}
      style={styles.icon}
    />
    <Text style={styles.title}>Visitor Pass</Text>
  </View>
);

const RequestRenovationHeader = () => (
  <View style={styles.headerContainer}>
    <Image
      source={require('./images/request-renovation-white.png')}
      style={styles.icon}
    />
    <Text style={styles.title}>Request Renovation</Text>
  </View>
);

const PayDepositHeader = () => (
  <View style={styles.headerContainer}>
    <Text style={styles.title}>Pay Deposit</Text>
  </View>
);

const CreateComplainHeader = () => (
  <View style={styles.headerContainer}>
    <Image
      source={require('./images/create-complain-white.png')}
      style={styles.icon}
    />
    <Text style={styles.title}>Create Complain</Text>
  </View>
);

const HistoryHeader = () => (
  <View style={styles.headerContainer}>
    <Text style={styles.title}>History</Text>
  </View>
);

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerTitle: 'Hi, Iris Ng!',
            headerStyle: {
              backgroundColor: '#5F5E5E',
            },
            headerTintColor: '#fff',
            headerRight: LogoutButton,
          }}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{
            headerTitle: ProfileHeader,
            headerStyle: {
              backgroundColor: '#5F5E5E',
            },
            headerTintColor: '#fff',
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="FacilitiesBooking"
          component={FacilitiesBooking}
          options={{
            headerTitle: FacilitiesBookingHeader,
            headerStyle: {
              backgroundColor: '#5F5E5E',
            },
            headerTintColor: '#fff',
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="FacilitiesDetails"
          component={FacilitiesDetails}
          options={{
            headerTitle: 'Facility Details',
            headerStyle: {
              backgroundColor: '#5F5E5E',
            },
            headerTintColor: '#fff',
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="Booking"
          component={Booking}
          options={{
            headerTitle: 'Booking',
            headerStyle: { backgroundColor: '#5F5E5E' },
            headerTintColor: '#fff',
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="VisitorPass"
          component={VisitorPass}
          options={{
            headerTitle: VisitorPassHeader,
            headerStyle: {
              backgroundColor: '#5F5E5E',
            },
            headerTintColor: '#fff',
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="RequestRenovation"
          component={RequestRenovation}
          options={{
            headerTitle: RequestRenovationHeader,
            headerStyle: {
              backgroundColor: '#5F5E5E',
            },
            headerTintColor: '#fff',
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="PayDeposit"
          component={PayDeposit}
          options={{
            headerTitle: PayDepositHeader,
            headerStyle: {
              backgroundColor: '#5F5E5E',
            },
            headerTintColor: '#fff',
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="CreateComplain"
          component={CreateComplain}
          options={{
            headerTitle: CreateComplainHeader,
            headerStyle: {
              backgroundColor: '#5F5E5E',
            },
            headerTintColor: '#fff',
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="History"
          component={History}
          options={{
            headerTitle: HistoryHeader,
            headerStyle: {
              backgroundColor: '#5F5E5E',
            },
            headerTintColor: '#fff',
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="HistoryFacilitiesBooking"
          component={HistoryFacilitiesBooking}
          options={{
            headerTitle: FacilitiesBookingHeader,
            headerStyle: {
              backgroundColor: '#5F5E5E',
            },
            headerTintColor: '#fff',
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="HistoryFacilitiesBookingDetails"
          component={HistoryFacilitiesBookingDetails}
          options={{
            headerTitle: 'Booking Details',
            headerStyle: { backgroundColor: '#5F5E5E' },
            headerTintColor: '#fff',
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="HistoryVisitorPass"
          component={HistoryVisitorPass}
          options={{
            headerTitle: VisitorPassHeader,
            headerStyle: {
              backgroundColor: '#5F5E5E',
            },
            headerTintColor: '#fff',
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="HistoryVisitorPassDetails"
          component={HistoryVisitorPassDetails}
          options={{
            headerTitle: 'Visitor Pass Details',
            headerStyle: { backgroundColor: '#5F5E5E' },
            headerTintColor: '#fff',
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="HistoryCreateComplain"
          component={HistoryCreateComplain}
          options={{
            headerTitle: 'Create Complain History',
            headerStyle: {
              backgroundColor: '#5F5E5E',
            },
            headerTintColor: '#fff',
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="HistoryCreateComplainDetails"
          component={HistoryCreateComplainDetails}
          options={{
            headerTitle: 'Complain Details',
            headerStyle: { backgroundColor: '#5F5E5E' },
            headerTintColor: '#fff',
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="HistoryRequestRenovation"
          component={HistoryRequestRenovation}
          options={{
            headerTitle: 'Create Request Renovation',
            headerStyle: {
              backgroundColor: '#5F5E5E',
            },
            headerTintColor: '#fff',
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="HistoryRequestRenovationDetails"
          component={HistoryRequestRenovationDetails}
          options={{
            headerTitle: 'Request Details',
            headerStyle: { backgroundColor: '#5F5E5E' },
            headerTintColor: '#fff',
            headerTitleAlign: 'center',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 35,
    height: 35,
    marginRight: 10,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AppNavigator;
