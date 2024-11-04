import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
  Home: undefined;
  Profile: undefined;
  FacilitiesBooking: undefined;
  FacilitiesDetails: {
    name: string;
    image: any;
    location: string;
    hours: string;
    specifications: string[];
  };
  Booking: undefined;
  VisitorPass: undefined;
  RequestRenovation: undefined;
  PayDeposit: undefined;
  CreateComplain: undefined;
  History: undefined;
  HistoryFacilitiesBooking: { bookings: BookingDetails[] };
  HistoryFacilitiesBookingDetails: { booking: BookingDetails };
  HistoryVisitorPass: { passes: PassDetails[] };
  HistoryVisitorPassDetails: { pass: PassDetails };
  HistoryRequestRenovation: { renovations: RequestsDetails[] };
  HistoryRequestRenovationDetails: { renovation: RequestsDetails };
  HistoryCreateComplain: { complaint: ComplainDetails[] };
  HistoryCreateComplainDetails: { complaint: ComplainDetails };
  ClearData: undefined;
};

export interface BookingDetails {
  id: string;
  name: string;
  contact: string;
  unitNumber: string;
  facility: string;
  selectedDate: string;
  selectedTime: string;
  duration: string;
  status: string;
}

export interface PassDetails {
  id: string;
  name: string;
  selectedDate: string;
  selectedTime: string;
  contact: string;
  emergencycontact: string;
  icNumber: string;
  carPlateNumber: string;
}

export interface ComplainDetails {
  id: string;
  title: string;
  message: string;
}

export interface RequestsDetails {
  id: string;
  name: string;
  unitNumber: string;
  selectedDate: string;
  duration: string;
  status: string;
}

// Type for navigation prop
export type HomeNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Home'
>;
export type BookingNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Booking'
>;
export type FacilitiesBookingNavigationProp = StackNavigationProp<
  RootStackParamList,
  'FacilitiesBooking'
>;
export type FacilitiesDetailsNavigationProp = StackNavigationProp<
  RootStackParamList,
  'FacilitiesDetails'
>;
export type PayDepositNavigationProp = StackNavigationProp<
  RootStackParamList,
  'PayDeposit'
>;
export type VisitorPassNavigationProp = StackNavigationProp<
  RootStackParamList,
  'VisitorPass'
>;
export type HistoryVisitorPassNavigationProp = StackNavigationProp<
  RootStackParamList,
  'HistoryVisitorPass'
>;
export type HistoryVisitorPassDetailsNavigationProp = StackNavigationProp<
  RootStackParamList,
  'HistoryVisitorPassDetails'
>;
export type CreateComplainNavigationProp = StackNavigationProp<
  RootStackParamList,
  'CreateComplain'
>;
export type HistoryCreateComplainNavigationProp = StackNavigationProp<
  RootStackParamList,
  'HistoryCreateComplain'
>;
export type HistoryCreateComplainDetailsNavigationProp = StackNavigationProp<
  RootStackParamList,
  'HistoryCreateComplainDetails'
>;
export type HistoryNavigationProp = StackNavigationProp<
  RootStackParamList,
  'History'
>;
export type HistoryFacilitiesBookingNavigationProp = StackNavigationProp<
  RootStackParamList,
  'HistoryFacilitiesBooking'
>;
export type HistoryFacilitiesBookingDetailsNavigationProp = StackNavigationProp<
  RootStackParamList,
  'HistoryFacilitiesBookingDetails'
>;
export type HistoryRequestRenovationNavigationProp = StackNavigationProp<
  RootStackParamList,
  'HistoryRequestRenovation'
>;
export type HistoryRequestRenovationDetailsNavigationProp = StackNavigationProp<
  RootStackParamList,
  'HistoryRequestRenovationDetails'
>;
