import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, ScrollView, Modal, Image, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from './navigation';

const successImage = require('./images/green-tick.png');

type CreateComplainScreenProp = StackNavigationProp<RootStackParamList, 'CreateComplain'>;

interface ComplainDetails {
    id: string;
    title: string;
    message: string;
}

const CreateComplain: React.FC = () => {
    const handleProfilePress = () => {
        navigation.navigate('Profile');
    };

    const handleHistoryPress = () => {
        navigation.navigate('History');
    };

    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const navigation = useNavigation<CreateComplainScreenProp>();

    const validateInputs = () => {
        if (!title.trim()) {
            Alert.alert('Invalid Input', 'Title field cannot be empty.');
            return false;
        }
        if (!message.trim()) {
            Alert.alert('Invalid Input', 'Message field cannot be empty.');
            return false;
        }
        return true;
    };

    const saveComplain = async (newComplain: ComplainDetails) => {
        try {
            const existingComplains = await AsyncStorage.getItem('complaintHistory');
            const complainsArray = existingComplains ? JSON.parse(existingComplains) : [];

            complainsArray.push(newComplain);
            await AsyncStorage.setItem('complaintHistory', JSON.stringify(complainsArray));
            console.log('Complaint saved successfully');
            return true;
        } catch (error) {
            console.error('Error saving complain', error);
            return false;
        }
    };

    const handleComplain = async () => {
        if (!validateInputs()) {return;}

        const complainDetails: ComplainDetails = {
            id: Date.now().toString(),
            title,
            message,
        };

        const isSaved = await saveComplain(complainDetails);
        if (isSaved) {
            setTitle('');
            setMessage('');
            setIsSubmitted(true);
        } else {
            Alert.alert('Error', 'Failed to save your complaint.');
        }
    };

    const handleModalClose = () => {
        setIsSubmitted(false);
        navigation.navigate('Home');
    };

    return (
        <View style={styles.mainContainer}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.container}>
                    <Text style={styles.title}>Title</Text>
                    <TextInput
                        style={styles.input}
                        value={title}
                        onChangeText={setTitle}
                    />

                    <Text style={styles.title}>Complain</Text>
                    <TextInput
                        style={[styles.input, styles.textarea]}
                        value={message}
                        onChangeText={setMessage}
                        multiline={true}
                        numberOfLines={7}
                    />

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={handleComplain} style={styles.submitButton}>
                            <Text style={styles.submitText}>SUBMIT</Text>
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
                                        Submit{'\n'}Successfully!
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </Modal>
                    )}
                </View>
            </ScrollView>

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
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#E6ECEF',
    },
    scrollContainer: {
        flexGrow: 1,
        padding: 16,
        paddingBottom: 80,
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
    textarea: {
        height: 140,
        borderRadius: 25,
        textAlignVertical: 'top',
    },
    buttonContainer: {
        marginTop: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    submitButton: {
        width: 120,
        backgroundColor: '#4B9B9B',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 50,
    },
    submitText: {
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
});

export default CreateComplain;
