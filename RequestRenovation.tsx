import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, ScrollView, Image, Alert } from 'react-native';
import { Calendar, DateData } from 'react-native-calendars';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { PayDepositNavigationProp } from './navigation';

interface RequestDetails {
    id: string;
    name: string;
    contact: string;
    unitNumber: string;
    selectedDate: string;
    duration: string | null;
    status: 'pending',
}

const RequestRenovation: React.FC = () => {
    const navigation = useNavigation<PayDepositNavigationProp>();

    const handleProfilePress = () => {
        navigation.navigate('Profile');
    };

    const handleHistoryPress = () => {
        navigation.navigate('History');
    };

    const [name, setName] = useState('');
    const [contact, setContact] = useState('');
    const [unitNumber, setUnitNumber] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [duration, setDuration] = useState<string | null>(null);
    const [calendarVisible, setCalendarVisible] = useState(false);

    const onDayPress = (day: DateData) => {
        setSelectedDate(day.dateString);
        setCalendarVisible(false);
    };

    const validateInputs = () => {
        const phoneRegex = /^(?:\d{10}|\d{11})$/;
        const unitRegex = /^[\d-]+$/;
        if (!name.trim() || !contact.trim() || !unitNumber.trim() || !selectedDate || !duration) {
            Alert.alert('Invalid Input', 'All fields must be filled out.');
            return false;
        }
        if (!phoneRegex.test(contact)) {
            Alert.alert('Invalid Input', 'Contact must be a 10 or 11 digit number.');
            return false;
        }
        if (!unitRegex.test(unitNumber)) {
            Alert.alert('Invalid Input', 'Unit number should contain only numbers and dashes.');
            return false;
        }
        return true;
    };

    const saveRenovationRequest = async (newRequest: any) => {
        try {
            const existingRequests = await AsyncStorage.getItem('renovationHistory');
            const requestsArray = existingRequests ? JSON.parse(existingRequests) : [];
            requestsArray.push(newRequest);
            await AsyncStorage.setItem('renovationHistory', JSON.stringify(requestsArray));
            return true;
        } catch (error) {
            console.error('Error saving renovation request', error);
            Alert.alert('Error', 'Failed to save your renovation request. Please try again.');
            return false;
        }
    };

    const handlePay = async () => {
        if (!validateInputs()) { return; }

        const renovationRequest: RequestDetails = {
            id: Date.now().toString(),
            name,
            contact,
            unitNumber,
            selectedDate,
            duration,
            status: 'pending',
        };

        const isSaved = await saveRenovationRequest(renovationRequest);
        if (isSaved) {
            Alert.alert('Success', 'Your renovation request has been submitted successfully.');
            // Clear the fields
            setName('');
            setContact('');
            setUnitNumber('');
            setSelectedDate('');
            setDuration(null);
            navigation.navigate('PayDeposit');

        } else {
            Alert.alert('Error', 'Failed to save your renovation request.');
        }
    };

    return (
        <View style={styles.mainContainer}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.container}>
                    {/* Input fields and Calendar */}
                    <Text style={styles.title}>Name</Text>
                    <TextInput style={styles.input} value={name} onChangeText={setName} />

                    <Text style={styles.title}>Contact</Text>
                    <TextInput style={styles.input} value={contact} onChangeText={setContact} keyboardType="phone-pad" />

                    <Text style={styles.title}>Unit Number</Text>
                    <TextInput style={styles.input} value={unitNumber} onChangeText={setUnitNumber} keyboardType="numeric" />

                    <View style={styles.dateTimeContainer}>
                        <Text style={styles.title}>Date</Text>
                        <View style={styles.dateTimeRow}>
                            <TextInput style={styles.dateTimeInput} value={selectedDate} placeholder="Select a date" editable={false} />
                            <TouchableOpacity style={styles.imageButton} onPress={() => setCalendarVisible(true)}>
                                <Image source={require('./images/calendar.png')} style={styles.image} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {calendarVisible && (
                        <Calendar onDayPress={onDayPress} hideExtraDays={true} markedDates={{ [selectedDate]: { selected: true, marked: true, selectedColor: 'blue' } }} />
                    )}

                    <Text style={styles.title}>Duration</Text>
                    <View style={styles.pickerContainer}>
                        <Picker selectedValue={duration} onValueChange={(itemValue) => setDuration(itemValue)} style={styles.picker}>
                            <Picker.Item label="1 month" value="1 month" />
                            <Picker.Item label="2 months" value="2 months" />
                            <Picker.Item label="3 months" value="3 months" />
                            <Picker.Item label="4 months" value="4 months" />
                            <Picker.Item label="5 months" value="5 months" />
                            <Picker.Item label="6 months" value="6 months" />
                            <Picker.Item label="7 months" value="7 months" />
                            <Picker.Item label="8 months" value="8 months" />
                            <Picker.Item label="9 months" value="9 months" />
                            <Picker.Item label="10 months" value="10 months" />
                            <Picker.Item label="11 months" value="11 months" />
                            <Picker.Item label="12 months" value="12 months" />
                        </Picker>
                    </View>

                    <View style={styles.priceContainer}>
                        <Image source={require('./images/price.png')} style={styles.dollarIcon} />
                        <Text style={styles.priceText}>RM 2000.00</Text>
                        <Text style={styles.deposit}>[Deposit]</Text>
                    </View>



                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={handlePay} style={styles.payButton}>
                            <Text style={styles.payText}>PAY</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>

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
        flexGrow: 1,
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
        backgroundColor: '#fff',
    },
    dateTimeContainer: {
        marginBottom: 16,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    dateTimeRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    dateTimeInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 30,
        flex: 1,
        marginRight: 8,
        backgroundColor: 'white',
        color: '#000',
    },
    imageButton: {
        padding: 8,
    },
    image: {
        width: 30,
        height: 30,
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
    buttonContainer: {
        marginTop: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    payButton: {
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
    payText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
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
      priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
        alignSelf: 'center',
      },
      dollarIcon: {
        width: 40,
        height: 40,
        marginRight: 5,
      },
      priceText: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#4a9a94',
      },
      deposit: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#4a9a94',
      },
});

export default RequestRenovation;
