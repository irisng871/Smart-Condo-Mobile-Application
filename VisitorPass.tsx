import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, ScrollView, Image, Alert, Modal } from 'react-native';
import { Calendar, DateData } from 'react-native-calendars';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from './navigation';

const successImage = require('./images/green-tick.png');

type VisitorPassScreenProp = StackNavigationProp<RootStackParamList, 'VisitorPass'>;

interface VisitorPassDetails {
    id: string;
    type: string | null;
    name: string;
    contact: string;
    emergencycontact: string;
    icNumber: string;
    carPlateNumber: string;
    selectedDate: string;
    selectedTime: string | null;
}

const VisitorPass: React.FC = () => {
    const handleProfilePress = () => {
      navigation.navigate('Profile');
    };

    const handleHistoryPress = () => {
      navigation.navigate('History');
    };

    const [type, setType] = useState<string | null>(null);
    const [name, setName] = useState('');
    const [contact, setContact] = useState('');
    const [emergencycontact, setEmergencyContact] = useState('');
    const [icNumber, setIcNumber] = useState('');
    const [carPlateNumber, setCarPlateNumber] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [calendarVisible, setCalendarVisible] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isConfirmVisible, setIsConfirmVisible] = useState(false);

    const navigation = useNavigation<VisitorPassScreenProp>();

    const validateInputs = () => {
        const nameRegex = /^[A-Za-z\s]+$/;
        const contactRegex = /^\d{10,11}$/;
        const icNumberRegex = /^[\d]+$/;
        const carPlateRegex = /^[A-Za-z0-9\s-]+$/;

        if (!type) {
            Alert.alert('Invalid Input', 'Type field cannot be empty.');
            return false;
        }
        if (!name.trim()) {
            Alert.alert('Invalid Input', 'Name field cannot be empty.');
            return false;
        }
        if (!nameRegex.test(name)) {
            Alert.alert('Invalid Input', 'Name should contain only letters.');
            return false;
        }
        if (!contact.trim() || !emergencycontact.trim()) {
            Alert.alert('Invalid Input', 'Contact field cannot be empty.');
            return false;
        }
        if (!contactRegex.test(contact) || !contactRegex.test(emergencycontact)) {
            Alert.alert('Invalid Input', 'Contact should be a 10 or 11-digit number.');
            return false;
        }
        if (!icNumber.trim()) {
            Alert.alert('Invalid Input', 'IC Number cannot be empty.');
            return false;
        }
        if (!icNumberRegex.test(icNumber)) {
            Alert.alert('Invalid Input', 'IC Number should contain only digits.');
            return false;
        }
        if (!carPlateRegex.test(carPlateNumber)) {
            Alert.alert('Invalid Input', 'Car Plate Number should contain only letters, numbers, and hyphens.');
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
        return true;
    };

    const saveVisitorPass = async (newVisitorPass: VisitorPassDetails) => {
        try {
            const existingPasses = await AsyncStorage.getItem('visitorPassHistory');
            const passesArray = existingPasses ? JSON.parse(existingPasses) : [];

            passesArray.push(newVisitorPass);
            await AsyncStorage.setItem('visitorPassHistory', JSON.stringify(passesArray));
            console.log('Visitor Pass saved successfully');
            setIsSubmitted(true);
        } catch (error) {
            console.error('Failed to save visitor pass', error);
        }
    };

    const handleCreate = async () => {
      if (!validateInputs()) {
          return;
      }
      setIsConfirmVisible(true);
  };

  const handleConfirm = async () => {
      const visitorPassDetails: VisitorPassDetails = {
          id: Date.now().toString(),
          type: type || '',
          name,
          contact,
          emergencycontact,
          icNumber,
          carPlateNumber,
          selectedDate,
          selectedTime: selectedTime || '',
      };

      await saveVisitorPass(visitorPassDetails);
      console.log('Visitor pass saved:', visitorPassDetails);
      setIsConfirmVisible(false);
      setIsSubmitted(true);
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
        <View style={styles.mainContainer}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                <Text style={styles.title}>Type</Text>
                <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={type}
                        onValueChange={(itemValue) => setType(itemValue)}
                        style={styles.picker}
                    >
                        <Picker.Item label="Visitor" value="Visitor" />
                        <Picker.Item label="Pickup / Drop Off" value="Pickup / Drop Off" />
                        <Picker.Item label="Contractor / Vendor" value="Contractor / Vendor" />
                        <Picker.Item label="Management Visitor" value="Management Visitor" />
                        <Picker.Item label="Courier / Delivery" value="Courier / Delivery" />
                    </Picker>
                </View>

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
                />

                <Text style={styles.title}>Emergency Contact</Text>
                <TextInput
                    style={styles.input}
                    value={emergencycontact}
                    onChangeText={setEmergencyContact}
                />

                <Text style={styles.title}>IC Number / Passport Number</Text>
                <TextInput
                    style={styles.input}
                    value={icNumber}
                    onChangeText={setIcNumber}
                />

                <Text style={styles.title}>Car Plate Number</Text>
                <TextInput
                    style={styles.input}
                    value={carPlateNumber}
                    onChangeText={setCarPlateNumber}
                />

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

                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={handleCreate} style={styles.createButton}>
                        <Text style={styles.createText}>CREATE</Text>
                    </TouchableOpacity>

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
                                    Create{'\n'}Successfully!
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </Modal>
                  )}
                </View>

                <Modal
                transparent={true}
                visible={isConfirmVisible}
                animationType="fade"
                onRequestClose={() => setIsConfirmVisible(false)}
            >
                <View style={styles.confirmOverlay}>
                    <View style={styles.confirmContainer}>
                        <Text style={styles.confirmText}>Confirm Submission</Text>
                        <Text style={styles.confirmSubtext}>
                            Are you sure you want to create this visitor pass?
                        </Text>
                        <Text style={styles.confirmDetails}>
                            {'\n'}Type: {type || 'N/A'}
                            {'\n'}Name: {name}
                            {'\n'}Contact: {contact}
                            {'\n'}Emergency Contact: {emergencycontact}
                            {'\n'}IC Number / Passport Number: {icNumber}
                            {'\n'}Car Plate Number: {carPlateNumber}
                            {'\n'}Date: {selectedDate}
                            {'\n'}Time: {selectedTime || 'N/A'}
                        </Text>
                        <View style={styles.confirmButtonContainer}>
                            <TouchableOpacity onPress={() => setIsConfirmVisible(false)}>
                                <Text style={styles.cancelText}>CANCEL</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleConfirm}>
                                <Text style={styles.confirmTextButton}>CONFIRM</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
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
mainContainer: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: '#E6ECEF',
},
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
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
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
  buttonContainer: {
    marginTop: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  createButton: {
    width: 120,
    backgroundColor: '#4B9B9B',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  createText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
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
  confirmOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
},
confirmContainer: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
},
confirmText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
},
confirmSubtext: {
    color: '#000',
},
confirmDetails: {
    color: '#000',
    marginBottom: 20,
    padding: 20,
},
confirmButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 20,
},
cancelText: {
    color: '#4B9B9B',
    fontWeight: 'bold',
    marginRight: 5,
},
confirmTextButton: {
    color: '#4B9B9B',
    fontWeight: 'bold',
},

});

export default VisitorPass;
