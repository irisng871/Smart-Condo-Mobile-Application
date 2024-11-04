import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, ScrollView, Modal, Image } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const successImage = require('./images/green-tick.png');
const profileImage = require('./images/account.png');

interface ProfileProps {
  navigation: NavigationProp<any>;
}

const Profile: React.FC<ProfileProps> = ({ navigation }) => {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [unitNumber, setUnitNumber] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const saveProfile = async () => {
    const profile = {
      name,
      contact,
      unitNumber,
      password,
      image: selectedImage,
    };
    try {
      await AsyncStorage.setItem('userProfile', JSON.stringify(profile));
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error saving profile data', error);
    }
  };

  const loadProfile = async () => {
    try {
      const savedProfile = await AsyncStorage.getItem('userProfile');
      if (savedProfile) {
        const profileData = JSON.parse(savedProfile);
        setName(profileData.name);
        setContact(profileData.contact);
        setUnitNumber(profileData.unitNumber);
        setPassword(profileData.password);
        setSelectedImage(profileData.image || null);
      }
    } catch (error) {
      console.error('Error loading profile data', error);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  const handleModalClose = () => {
    setIsSubmitted(false);
    navigation.navigate('Home');
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={selectedImage ? { uri: selectedImage } : profileImage} style={styles.profileImage} />
          <TouchableOpacity style={styles.addPhotoButton}>
            <Text style={styles.addPhotoText}>Add Photo</Text>
          </TouchableOpacity>
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
          keyboardType="phone-pad"
        />

        <Text style={styles.title}>Unit Number</Text>
        <TextInput
          style={styles.input}
          value={unitNumber}
          onChangeText={setUnitNumber}
        />

        <Text style={styles.title}>Password</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={saveProfile} style={styles.saveButton}>
            <Text style={styles.saveText}>SAVE</Text>
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
                  Save{'\n'}Successfully!
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
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  buttonContainer: {
    marginTop: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButton: {
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
  saveText: {
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
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 160,
    height: 160,
    borderRadius: 90,
  },
  addPhotoButton: {
    marginTop: 10,
    backgroundColor: '#4B9B9B',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  addPhotoText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Profile;
