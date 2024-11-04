import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, ScrollView, Image, Modal, Alert } from 'react-native';
import { Calendar, DateData } from 'react-native-calendars';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from './navigation';

const successImage = require('./images/green-tick.png');

type BookingScreenProp = StackNavigationProp<RootStackParamList, 'Booking'>;

interface BookingDetails {
    id: string;
    name: string;
    contact: string;
    unitNumber: string;
    facility: string | null;
    selectedDate: string;
    selectedTime: string | null;
    duration: string | null;
    status: 'Pending',
}

const Booking: React.FC = () => {
    const [name, setName] = useState('');
    const [contact, setContact] = useState('');
    const [unitNumber, setUnitNumber] = useState('');
    const [facility, setFacility] = useState<string | null>(null);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [duration, setDuration] = useState<string | null>(null);
    const [calendarVisible, setCalendarVisible] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const navigation = useNavigation<BookingScreenProp>();

    const validateInputs = () => {
        const nameRegex = /^[A-Za-z\s]+$/;
        const contactRegex = /^\d{10,11}$/;
        const unitRegex = /^[\d-]+$/;

        if (!name.trim()) {
            Alert.alert('Invalid Input', 'Name field cannot be empty.');
            return false;
        }
        if (!nameRegex.test(name)) {
            Alert.alert('Invalid Input', 'Name should contain only letters.');
            return false;
        }
        if (!contact.trim()) {
            Alert.alert('Invalid Input', 'Contact field cannot be empty.');
            return false;
        }
        if (!contactRegex.test(contact)) {
            Alert.alert('Invalid Input', 'Contact should be a 10 or 11-digit number.');
            return false;
        }
        if (!unitNumber.trim()) {
            Alert.alert('Invalid Input', 'Unit Number field cannot be empty.');
            return false;
        }
        if (!unitRegex.test(unitNumber)) {
            Alert.alert('Invalid Input', 'Unit number should contain only numbers and dashes.');
            return false;
        }
        if (!facility) {
            Alert.alert('Incomplete Booking', 'Please select a facility.');
            return false;
        }
        if (!selectedDate) {
            Alert.alert('Incomplete Booking', 'Please select a date.');
            return false;
        }
        if (!selectedTime) {
            Alert.alert('Incomplete Booking', 'Please select a time.');
            return false;
        }
        if (!duration) {
            Alert.alert('Incomplete Booking', 'Please select a duration.');
            return false;
        }
        return true;
    };

    const saveBooking = async (newBooking: BookingDetails) => {
        try {
            const existingBookings = await AsyncStorage.getItem('bookingHistory');
            const bookingsArray = existingBookings ? JSON.parse(existingBookings) : [];

            bookingsArray.push(newBooking);
            await AsyncStorage.setItem('bookingHistory', JSON.stringify(bookingsArray));
            console.log('Booking saved successfully');
            setIsSubmitted(true);
        } catch (error) {
            console.error('Failed to save booking', error);
        }
    };

    const handleBooking = async () => {
        if (!validateInputs()) {return;}

        const bookingDetails: BookingDetails = {
            id: Date.now().toString(),
            name,
            contact,
            unitNumber,
            facility: facility || '',
            selectedDate,
            selectedTime: selectedTime || '',
            duration: duration || '',
            status: 'Pending',
        };

        await saveBooking(bookingDetails);
    };

    const onDayPress = (day: DateData) => {
        setSelectedDate(day.dateString);
        setCalendarVisible(false);
    };

    const handleModalClose = () => {
        setIsSubmitted(false);
        navigation.navigate('Home');
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                <Text style={styles.title}>Name</Text>
                <TextInput
                    style={styles.input}
                    value={name}
                    onChangeText={setName}
                />

                <Text style={styles.title}>Contact</Text>
                <TextInput
                    style={styles.input}
                    value={contact}
                    onChangeText={setContact}
                    keyboardType="numeric"
                />

                <Text style={styles.title}>Unit Number</Text>
                <TextInput
                    style={styles.input}
                    value={unitNumber}
                    onChangeText={setUnitNumber}
                />

                <Text style={styles.title}>Facility</Text>
                <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={facility}
                        onValueChange={(itemValue) => setFacility(itemValue)}
                        style={styles.picker}
                    >
                        <Picker.Item label="Select a facility" value={null} />
                        <Picker.Item label="Badminton Court" value="Badminton Court" />
                        <Picker.Item label="BBQ Pits" value="BBQ Pits" />
                        <Picker.Item label="Multipurpose Room" value="Multipurpose Room" />
                        <Picker.Item label="Mini Cinema" value="Mini Cinema" />
                        <Picker.Item label="Tennis Court" value="Tennis Court" />
                        <Picker.Item label="Yoga Room" value="Yoga Room" />
                    </Picker>
                </View>

                <View style={styles.dateTimeContainer}>
                    <Text style={styles.title}>Date</Text>
                    <View style={styles.dateTimeRow}>
                        <TextInput
                            style={styles.dateTimeInput}
                            value={selectedDate}
                            placeholder="Select a date"
                            editable={false}
                        />
                        <TouchableOpacity
                            style={styles.imageButton}
                            onPress={() => setCalendarVisible(true)}
                        >
                            <Image source={require('./images/calendar.png')} style={styles.image} />
                        </TouchableOpacity>
                    </View>
                </View>

                {calendarVisible && (
                    <Calendar
                        onDayPress={onDayPress}
                        hideExtraDays={true}
                        markedDates={{
                            [selectedDate]: { selected: true, marked: true, selectedColor: 'blue' },
                        }}
                    />
                )}

                <Text style={styles.title}>Time</Text>
                <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={selectedTime}
                        onValueChange={(itemValue) => setSelectedTime(itemValue)}
                        style={styles.picker}
                    >
                        <Picker.Item label="Select a time" value={null} />
                        <Picker.Item label="09:00 AM" value="09:00 AM" />
                        <Picker.Item label="10:00 AM" value="10:00 AM" />
                        <Picker.Item label="11:00 AM" value="11:00 AM" />
                        <Picker.Item label="12:00 PM" value="12:00 PM" />
                        <Picker.Item label="01:00 PM" value="01:00 PM" />
                        <Picker.Item label="02:00 PM" value="02:00 PM" />
                        <Picker.Item label="03:00 PM" value="03:00 PM" />
                        <Picker.Item label="04:00 PM" value="04:00 PM" />
                        <Picker.Item label="05:00 PM" value="05:00 PM" />
                        <Picker.Item label="06:00 PM" value="06:00 PM" />
                        <Picker.Item label="07:00 PM" value="07:00 PM" />
                        <Picker.Item label="08:00 PM" value="08:00 PM" />
                        <Picker.Item label="09:00 PM" value="09:00 PM" />
                        <Picker.Item label="10:00 PM" value="10:00 PM" />
                    </Picker>
                </View>

                <Text style={styles.title}>Duration</Text>
                <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={duration}
                        onValueChange={(itemValue) => setDuration(itemValue)}
                        style={styles.picker}
                    >
                        <Picker.Item label="Select duration" value={null} />
                        <Picker.Item label="1 hour" value="1 hour" />
                        <Picker.Item label="2 hours" value="2 hours" />
                        <Picker.Item label="3 hours" value="3 hours" />
                        <Picker.Item label="4 hours" value="4 hours" />
                        <Picker.Item label="5 hours" value="5 hours" />
                    </Picker>
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={handleBooking} style={styles.bookNowButton}>
                        <Text style={styles.bookNowText}>BOOK</Text>
                    </TouchableOpacity>
                </View>

                {isSubmitted && (
                    <Modal
                        transparent={true}
                        animationType="fade"
                        visible={isSubmitted}
                        onRequestClose={handleModalClose}
                    >
                        <TouchableOpacity style={styles.successOverlay} onPress={handleModalClose}>
                            <View style={styles.successContainer}>
                                <Image source={successImage} style={styles.successImage} />
                                <Text style={styles.successText}>
                                    Booking{'\n'}Successfully!
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </Modal>
                )}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: 16,
        backgroundColor: '#E6ECEF',
    },
    container: {
        flex: 1,
        marginHorizontal: 30,
    },
    title: {
        fontSize: 16,
        marginBottom: 8,
        fontWeight: 'bold',
        color: '#000',
    },
    input: {
        height: 46,
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 50,
        marginBottom: 20,
        backgroundColor: '#FAF8F8',
    },
    pickerContainer: {
        height: 46,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: '#ccc',
        marginBottom: 16,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
        justifyContent: 'center',
        padding: 0,
    },
    picker: {
        width: '100%',
        height: '100%',
        borderRadius: 50,
        backgroundColor: 'transparent',
    },
    dateTimeContainer: {
        marginBottom: 20,
    },
    dateTimeRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    dateTimeInput: {
        flex: 1,
        height: 46,
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 50,
        backgroundColor: '#FAF8F8',
        color: '#000',
    },
    imageButton: {
        padding: 10,
    },
    image: {
        width: 20,
        height: 20,
    },
    buttonContainer: {
        marginTop: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bookNowButton: {
        width: 120,
        backgroundColor: '#4B9B9B',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 50,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 4,
    },
    bookNowText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    successOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
    },
      successContainer: {
        width: 250,
        height: 270,
        backgroundColor: '#000',
        padding: 40,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
      successImage: {
        width: 70,
        height: 70,
        marginBottom: 15,
    },
      successText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
    },
});

export default Booking;
